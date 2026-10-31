import { openingHours } from '@/config/hours';
import {
  formatClockRange,
  hoursIn,
  timeZoneCity,
  timeZoneLabel,
  timeZoneOffset,
  wallTimeToDate,
} from './timezone';

// A Monday after UK clocks go back (GMT), and one in summer (BST).
const winter = new Date('2026-11-02T12:00:00Z');
const summer = new Date('2026-07-06T12:00:00Z');

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
    expect(hoursIn(openingHours, 'Europe/London', winter)).toEqual({
      weekdays: '4 – 9 PM',
      weekends: '10 AM – 6 PM',
    });
    expect(hoursIn(openingHours, 'Asia/Karachi', winter)).toEqual({
      weekdays: '9 PM – 2 AM',
      weekends: '3 – 11 PM',
    });
    expect(hoursIn(openingHours, 'America/New_York', winter)).toEqual({
      weekdays: '11 AM – 4 PM',
      weekends: '5 AM – 1 PM',
    });
    // Summer: London is GMT+1, so Karachi is only four hours ahead.
    expect(hoursIn(openingHours, 'Asia/Karachi', summer).weekdays).toBe('8 PM – 1 AM');
  });
});
