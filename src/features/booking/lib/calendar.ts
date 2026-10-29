/** Pure helpers that turn slot instants into the visitor's local calendar. */

export interface CalendarDay {
  key: string;
  date: Date;
  slots: Date[];
  isToday: boolean;
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

/**
 * Whole weeks (Monday first) from the current week to the last day with slots. Days outside the range
 * or without slots come back with an empty `slots` list so the grid stays aligned.
 */
export function buildCalendar(slots: Date[], timeZone: string, now: Date, minDays = 14): CalendarDay[][] {
  const byDay = new Map<string, Date[]>();
  for (const s of slots) {
    const k = dayKey(s, timeZone);
    byDay.set(k, [...(byDay.get(k) ?? []), s]);
  }
  const today = dayKey(now, timeZone);
  const lastSlotDay = [...byDay.keys()].sort().at(-1);
  const minLast = addDays(today, minDays - 1);
  const last = lastSlotDay && lastSlotDay > minLast ? lastSlotDay : minLast;

  const mondayOffset = (keyToDate(today).getUTCDay() + 6) % 7;
  let cursor = addDays(today, -mondayOffset);
  const weeks: CalendarDay[][] = [];
  while (cursor <= last) {
    const week: CalendarDay[] = [];
    for (let i = 0; i < 7; i++) {
      week.push({
        key: cursor,
        date: keyToDate(cursor),
        slots: cursor >= today ? (byDay.get(cursor) ?? []) : [],
        isToday: cursor === today,
      });
      cursor = addDays(cursor, 1);
    }
    weeks.push(week);
  }
  return weeks;
}

export function formatTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-GB', { timeZone, hour: 'numeric', minute: '2-digit', hour12: true })
    .format(date)
    .replace(/\s?([ap])\.?m\.?/i, (_, p: string) => ` ${p.toLowerCase()}m`);
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

/** "October – November 2026" for the span of the calendar. */
export function formatMonthSpan(weeks: CalendarDay[][]): string {
  const first = weeks[0]?.[0]?.date;
  const last = weeks.at(-1)?.at(-1)?.date;
  if (!first || !last) return '';
  const month = (d: Date) => new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', month: 'long' }).format(d);
  const year = last.getUTCFullYear();
  return month(first) === month(last)
    ? `${month(first)} ${year}`
    : `${month(first)} – ${month(last)} ${year}`;
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

/** Friendly name of a time zone, e.g. "London" from "Europe/London". */
export function timeZoneCity(timeZone: string): string {
  return (timeZone.split('/').at(-1) ?? timeZone).replace(/_/g, ' ');
}
