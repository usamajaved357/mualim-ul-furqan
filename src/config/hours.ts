/**
 * Teaching hours, as wall-clock times in the teacher's time zone. The booking server builds its slots from
 * these and the site shows them to each visitor in their own time zone. No imports: the server uses it too.
 */
export const openingHours = {
  timeZone: 'Europe/London',
  /** Monday to Friday. */
  weekdays: ['16:00', '21:00'],
  /** Saturday and Sunday. */
  weekends: ['10:00', '18:00'],
} as const satisfies {
  timeZone: string;
  weekdays: readonly [string, string];
  weekends: readonly [string, string];
};

export type OpeningHours = typeof openingHours;
