/**
 * Teaching hours and booking rules. Edit these to change what the booking calendar offers.
 * Times are wall-clock times in `timeZone`; slots are shown to visitors in their own time zone.
 */
export const schedule = {
  timeZone: 'Europe/London',
  slotMinutes: 30,
  /** Earliest bookable slot, counted from now. */
  minNoticeHours: 12,
  daysAhead: 21,
  /** 0 = Sunday … 6 = Saturday. Each entry is a [start, end) window. */
  weekly: {
    0: [['10:00', '18:00']],
    1: [['16:00', '21:00']],
    2: [['16:00', '21:00']],
    3: [['16:00', '21:00']],
    4: [['16:00', '21:00']],
    5: [['16:00', '21:00']],
    6: [['10:00', '18:00']],
  } as Record<number, [string, string][]>,
} as const;

export type Schedule = typeof schedule;
