/** Pure helpers that turn slot instants into the visitor's local calendar. */

export interface CalendarDay {
  key: string;
  date: Date;
  slots: Date[];
  isToday: boolean;
  /** False for the leading/trailing days of the neighbouring months in a month grid. */
  inMonth: boolean;
}

const keyFormatter = (timeZone: string) =>
  new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' });

/** YYYY-MM-DD of an instant in a time zone. */
export function dayKey(date: Date, timeZone: string): string {
  return keyFormatter(timeZone).format(date);
}

/** Midday UTC of a day key: a safe Date to format the day's name with in any time zone. */
const keyToDate = (key: string) => new Date(`${key}T12:00:00Z`);

const addDays = (key: string, n: number) => {
  const d = keyToDate(key);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

export interface CalendarMonth {
  /** "2026-11" */
  key: string;
  /** "November 2026" */
  label: string;
  /** Monday-first weeks covering the whole month; days of the neighbouring months have `inMonth: false`. */
  weeks: CalendarDay[][];
}

/**
 * One grid per month, from the current month to the last month with an open slot. Each grid is a full
 * Monday-first calendar page; days before today, outside the month or without slots have no `slots`.
 */
export function buildMonths(slots: Date[], timeZone: string, now: Date): CalendarMonth[] {
  const byDay = new Map<string, Date[]>();
  for (const s of slots) {
    const k = dayKey(s, timeZone);
    byDay.set(k, [...(byDay.get(k) ?? []), s]);
  }
  const today = dayKey(now, timeZone);
  const lastSlotDay = [...byDay.keys()].sort().at(-1) ?? today;
  const lastMonth = (lastSlotDay > today ? lastSlotDay : today).slice(0, 7);

  const months: CalendarMonth[] = [];
  for (let month = today.slice(0, 7); month <= lastMonth; month = addDays(`${month}-28`, 7).slice(0, 7)) {
    const first = `${month}-01`;
    const lastDay = addDays(addDays(`${month}-28`, 7).slice(0, 7) + '-01', -1);
    let cursor = addDays(first, -((keyToDate(first).getUTCDay() + 6) % 7));
    const weeks: CalendarDay[][] = [];
    while (cursor <= lastDay) {
      const week: CalendarDay[] = [];
      for (let i = 0; i < 7; i++) {
        const inMonth = cursor.startsWith(month);
        week.push({
          key: cursor,
          date: keyToDate(cursor),
          slots: inMonth && cursor >= today ? (byDay.get(cursor) ?? []) : [],
          isToday: cursor === today,
          inMonth,
        });
        cursor = addDays(cursor, 1);
      }
      weeks.push(week);
    }
    const label = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'UTC',
      month: 'long',
      year: 'numeric',
    }).format(keyToDate(first));
    months.push({ key: month, label, weeks });
  }
  return months;
}

/** "5:30 pm", or "17:30" with the 24-hour clock. */
export function formatTime(date: Date, timeZone: string, hour12 = true): string {
  if (!hour12) {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).format(date);
  }
  return new Intl.DateTimeFormat('en-GB', { timeZone, hour: 'numeric', minute: '2-digit', hour12: true })
    .format(date)
    .replace(/\s?([ap])\.?m\.?/i, (_, p: string) => ` ${p.toLowerCase()}m`);
}

/** "Friday 27 November" for a day key. */
export function formatDayHeading(key: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(keyToDate(key));
}

/** "Nov", "Dec": short month of a day key. */
export function formatMonthShort(key: string): string {
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', month: 'short' }).format(keyToDate(key));
}

/** "Thu 15 Jan" for a day key. */
export function formatDayShort(key: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(keyToDate(key));
}

/** "Thursday 15 January 2026" for an instant in a time zone. */
export function formatDayLong(date: Date, timeZone: string): string {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
      .formatToParts(date)
      .map((x) => [x.type, x.value]),
  ) as Record<string, string>;
  return `${p.weekday} ${p.day} ${p.month} ${p.year}`;
}

/** Splits a day's slots into readable groups. */
export function groupByPartOfDay(slots: Date[], timeZone: string) {
  const hour = (d: Date) =>
    Number(new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', hourCycle: 'h23' }).format(d));
  const groups = [
    { label: 'Morning', slots: slots.filter((s) => hour(s) < 12) },
    { label: 'Afternoon', slots: slots.filter((s) => hour(s) >= 12 && hour(s) < 17) },
    { label: 'Evening', slots: slots.filter((s) => hour(s) >= 17) },
  ];
  return groups.filter((g) => g.slots.length);
}

export { timeZoneCity } from '@/lib/timezone';
