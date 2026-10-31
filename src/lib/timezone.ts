/** Time zone helpers for showing the teacher's hours and booking slots in each visitor's own time. */

/** The visitor's time zone from the browser, falling back to London. */
export function visitorTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/London';
}

/** Friendly name of a time zone, e.g. "London" from "Europe/London". */
export function timeZoneCity(timeZone: string): string {
  return (timeZone.split('/').at(-1) ?? timeZone).replace(/_/g, ' ');
}

/** UTC offset label at a moment, e.g. "GMT+5" or "GMT". */
export function timeZoneOffset(timeZone: string, at: Date): string {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone, timeZoneName: 'shortOffset' }).formatToParts(at);
  return parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
}

/** "Karachi (GMT+5)": city plus current offset. */
export function timeZoneLabel(timeZone: string, at: Date): string {
  return `${timeZoneCity(timeZone)} (${timeZoneOffset(timeZone, at)})`;
}

/** Calendar date in a time zone as "YYYY-MM-DD". */
export function dateKeyIn(at: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(at);
}

/** Milliseconds a time zone is ahead of UTC at an instant. */
function offsetMs(instant: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(instant));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return (
    Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second')) - instant
  );
}

/** The instant of a wall-clock time ("16:00") on a date ("2026-11-02") in a time zone. */
export function wallTimeToDate(date: string, time: string, timeZone: string): Date {
  const [y = 0, m = 1, d = 1] = date.split('-').map(Number);
  const [h = 0, min = 0] = time.split(':').map(Number);
  const guess = Date.UTC(y, m - 1, d, h, min);
  const first = guess - offsetMs(guess, timeZone);
  return new Date(guess - offsetMs(first, timeZone));
}

/** "9 PM" or "9:30 PM" in a time zone. */
export function formatClock(at: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit' })
    .format(at)
    .replace(':00', '');
}

/** "4 – 9 PM" when both ends share AM/PM, otherwise "9 PM – 2 AM". */
export function formatClockRange(start: Date, end: Date, timeZone: string): string {
  const [a, b] = [formatClock(start, timeZone), formatClock(end, timeZone)];
  const [aTime, aHalf] = a.split(' ');
  const [, bHalf] = b.split(' ');
  return aHalf === bHalf ? `${aTime} – ${b}` : `${a} – ${b}`;
}

interface Hours {
  timeZone: string;
  weekdays: readonly [string, string];
  weekends: readonly [string, string];
}

/** The teacher's weekday and weekend hours, shown in another time zone (offsets as of `now`). */
export function hoursIn(hours: Hours, timeZone: string, now: Date): { weekdays: string; weekends: string } {
  const day = dateKeyIn(now, hours.timeZone);
  const range = ([open, close]: readonly [string, string]) =>
    formatClockRange(
      wallTimeToDate(day, open, hours.timeZone),
      wallTimeToDate(day, close, hours.timeZone),
      timeZone,
    );
  return { weekdays: range(hours.weekdays), weekends: range(hours.weekends) };
}
