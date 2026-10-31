import { openingHours } from '../src/config/hours';

const { weekdays, weekends } = openingHours;

export interface Schedule {
  /** The teacher's time zone: `weekly` windows are wall-clock times here. */
  timeZone: string;
  slotMinutes: number;
  /** Earliest bookable slot, counted from now. */
  minNoticeHours: number;
  daysAhead: number;
  /** 0 = Sunday … 6 = Saturday. Each entry is a [start, end) window. */
  weekly: Record<number, [string, string][]>;
}

/**
 * Booking rules. The teaching hours themselves live in src/config/hours.ts, shared with the site, so the
 * hours visitors see always match the slots on offer. Slots are shown to visitors in their own time zone.
 */
export const schedule: Schedule = {
  timeZone: openingHours.timeZone,
  slotMinutes: 30,
  minNoticeHours: 12,
  daysAhead: 21,
  weekly: {
    0: [[...weekends]],
    1: [[...weekdays]],
    2: [[...weekdays]],
    3: [[...weekdays]],
    4: [[...weekdays]],
    5: [[...weekdays]],
    6: [[...weekends]],
  },
};
