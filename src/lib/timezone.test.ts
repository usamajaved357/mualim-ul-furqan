import { openingHours } from '@/config/hours';
import {
  describeHours,
  formatClockRange,
  hoursIn,
  hoursList,
  sameClock,
  timeZoneCity,
  timeZoneLabel,
  timeZoneOffset,
  wallTimeToDate,
} from './timezone';

// A Monday after UK clocks go back (GMT), and one in summer (BST).
const winter = new Date('2026-11-02T12:00:00Z');
const summer = new Date('2026-07-06T12:00:00Z');

/** Fixed hours with different weekday and weekend times, in a zone with summer time. */
const london = {
  timeZone: 'Europe/London',
  weekdays: ['16:00', '21:00'],
  weekends: ['10:00', '18:00'],
} as const;

describe('timezone', () => {
  it('names time zones', () => {
    expect(timeZoneCity('Europe/London')).toBe('London');
    expect(timeZoneCity('America/New_York')).toBe('New York');
    expect(timeZoneOffset('Asia/Karachi', winter)).toBe('GMT+5');
    expect(timeZoneLabel('Europe/London', winter)).toBe('London (GMT)');
    expect(timeZoneLabel('Europe/London', summer)).toBe('London (GMT+1)');
  });

  it('finds the instant of a local wall-clock time', () => {
    expect(wallTimeToDate('2026-11-02', '16:00', 'Europe/London').toISOString()).toBe(
      '2026-11-02T16:00:00.000Z',
    );
    expect(wallTimeToDate('2026-07-06', '16:00', 'Europe/London').toISOString()).toBe(
      '2026-07-06T15:00:00.000Z',
    );
    expect(wallTimeToDate('2026-11-02', '09:30', 'Asia/Karachi').toISOString()).toBe(
      '2026-11-02T04:30:00.000Z',
    );
  });

  it('shares AM/PM in a range when both ends match', () => {
    const tz = 'Europe/London';
    const at = (t: string) => wallTimeToDate('2026-11-02', t, tz);
    expect(formatClockRange(at('16:00'), at('21:00'), tz)).toBe('4 – 9 PM');
    expect(formatClockRange(at('10:00'), at('18:30'), tz)).toBe('10 AM – 6:30 PM');
  });

  it("shows the teacher's hours in the visitor's time zone", () => {
    expect(hoursIn(london, 'Europe/London', winter)).toEqual({
      weekdays: '4 – 9 PM',
      weekends: '10 AM – 6 PM',
    });
    expect(hoursIn(london, 'Asia/Karachi', winter)).toEqual({
      weekdays: '9 PM – 2 AM',
      weekends: '3 – 11 PM',
    });
    expect(hoursIn(london, 'America/New_York', winter)).toEqual({
      weekdays: '11 AM – 4 PM',
      weekends: '5 AM – 1 PM',
    });
    // Summer: London is GMT+1, so Karachi is only four hours ahead.
    expect(hoursIn(london, 'Asia/Karachi', summer).weekdays).toBe('8 PM – 1 AM');
  });

  it('collapses matching weekday and weekend hours into "every day"', () => {
    expect(describeHours(london, 'Europe/London', winter)).toBe('weekdays 4 – 9 PM, weekends 10 AM – 6 PM');
    expect(hoursList(london, 'Europe/London', winter)).toEqual([
      { days: 'Mon–Fri', time: '4 – 9 PM' },
      { days: 'Sat–Sun', time: '10 AM – 6 PM' },
    ]);
    expect(describeHours(openingHours, 'Asia/Karachi', winter)).toBe('every day, 9 AM – 9 PM');
    expect(hoursList(openingHours, 'Europe/London', winter)).toEqual([
      { days: 'Every day', time: '4 AM – 4 PM' },
    ]);
    expect(describeHours(openingHours, 'Europe/London', summer)).toBe('every day, 5 AM – 5 PM');
  });

  it('knows when two zones share a clock', () => {
    expect(sameClock('Asia/Karachi', 'Asia/Karachi', winter)).toBe(true);
    expect(sameClock('Europe/London', 'Africa/Accra', winter)).toBe(true);
    expect(sameClock('Europe/London', 'Africa/Accra', summer)).toBe(false);
  });
});
