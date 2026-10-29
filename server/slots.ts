import type { Schedule } from './schedule';
import { addDays, weekday, zonedDateKey, zonedTimeToUtc } from './time';

export interface Interval {
  start: Date;
  end: Date;
}

const overlaps = (a: Interval, b: Interval) => a.start < b.end && b.start < a.end;

/**
 * Every bookable slot between `from` and `to`: teaching hours from the schedule, minus the notice period
 * and anything already in the calendar (`busy`).
 */
export function availableSlots(
  schedule: Schedule,
  { from, to, now, busy = [] }: { from: Date; to: Date; now: Date; busy?: Interval[] },
): Interval[] {
  const earliest = new Date(now.getTime() + schedule.minNoticeHours * 3_600_000);
  const latest = new Date(now.getTime() + schedule.daysAhead * 86_400_000);
  const rangeStart = from > earliest ? from : earliest;
  const rangeEnd = to < latest ? to : latest;
  if (rangeStart >= rangeEnd) return [];

  const slotMs = schedule.slotMinutes * 60_000;
  const slots: Interval[] = [];
  // Walk owner-local days covering the range (one extra day each side for time-zone spill-over).
  const firstDay = addDays(zonedDateKey(rangeStart, schedule.timeZone), -1);
  const lastDay = addDays(zonedDateKey(rangeEnd, schedule.timeZone), 1);

  for (let day = firstDay; day <= lastDay; day = addDays(day, 1)) {
    for (const [open, close] of schedule.weekly[weekday(day)] ?? []) {
      const windowEnd = zonedTimeToUtc(day, close, schedule.timeZone).getTime();
      for (
        let t = zonedTimeToUtc(day, open, schedule.timeZone).getTime();
        t + slotMs <= windowEnd;
        t += slotMs
      ) {
        const slot = { start: new Date(t), end: new Date(t + slotMs) };
        if (slot.start < rangeStart || slot.start >= rangeEnd) continue;
        if (busy.some((b) => overlaps(slot, b))) continue;
        slots.push(slot);
      }
    }
  }
  return slots.sort((a, b) => a.start.getTime() - b.start.getTime());
}

/** True when `start` is exactly one of the slots the schedule offers right now. */
export function isBookable(
  schedule: Schedule,
  start: Date,
  { now, busy = [] }: { now: Date; busy?: Interval[] },
): boolean {
  const end = new Date(start.getTime() + schedule.slotMinutes * 60_000);
  return availableSlots(schedule, { from: start, to: end, now, busy }).some(
    (s) => s.start.getTime() === start.getTime(),
  );
}
