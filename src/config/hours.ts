/**
 * Teaching hours, as wall-clock times in the teacher's time zone. The booking server builds its slots from
 * these and the site shows them to each visitor in their own time zone. No imports: the server uses it too.
 * Until there is an admin panel, change the hours here.
 */
export const openingHours = {
  timeZone: 'Asia/Karachi',
  /** Where the teacher's clock is, as in "9 AM – 9 PM Pakistan time". */
  place: 'Pakistan',
  /** Monday to Friday. */
  weekdays: ['09:00', '21:00'],
  /** Saturday and Sunday. */
  weekends: ['09:00', '21:00'],
} as const satisfies {
  timeZone: string;
  place: string;
  weekdays: readonly [string, string];
  weekends: readonly [string, string];
};

export type OpeningHours = typeof openingHours;
