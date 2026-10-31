import { schedule as liveSchedule, type Schedule } from './schedule';
import { availableSlots, isBookable } from './slots';
import { formatInZone, zonedTimeToUtc } from './time';

const day = (iso: string) => ({ from: new Date(`${iso}T00:00:00Z`), to: new Date(`${iso}T23:59:59Z`) });

/** Fixed hours in a zone with summer time, so these tests don't change when the real hours do. */
const weekday: [string, string][] = [['16:00', '21:00']];
const weekend: [string, string][] = [['10:00', '18:00']];
const schedule: Schedule = {
  ...liveSchedule,
  timeZone: 'Europe/London',
  weekly: { 0: weekend, 1: weekday, 2: weekday, 3: weekday, 4: weekday, 5: weekday, 6: weekend },
};

describe('zonedTimeToUtc', () => {
  it('handles GMT and BST', () => {
    expect(zonedTimeToUtc('2026-01-15', '16:00', 'Europe/London').toISOString()).toBe(
      '2026-01-15T16:00:00.000Z',
    );
    expect(zonedTimeToUtc('2026-07-15', '16:00', 'Europe/London').toISOString()).toBe(
      '2026-07-15T15:00:00.000Z',
    );
  });
  it('handles zones west of UTC', () => {
    expect(zonedTimeToUtc('2026-07-15', '09:30', 'America/New_York').toISOString()).toBe(
      '2026-07-15T13:30:00.000Z',
    );
  });
});

describe('availableSlots', () => {
  const now = new Date('2026-01-01T00:00:00Z');

  it('offers 30-minute slots inside weekday teaching hours (London)', () => {
    // Thursday 15 January 2026, GMT: 16:00–21:00 → 10 slots.
    const slots = availableSlots(schedule, { ...day('2026-01-15'), now });
    expect(slots).toHaveLength(10);
    expect(slots[0]!.start.toISOString()).toBe('2026-01-15T16:00:00.000Z');
    expect(slots.at(-1)!.end.toISOString()).toBe('2026-01-15T21:00:00.000Z');
  });

  it('follows British Summer Time', () => {
    const slots = availableSlots(schedule, { ...day('2026-07-16'), now: new Date('2026-07-01T00:00:00Z') });
    expect(slots[0]!.start.toISOString()).toBe('2026-07-16T15:00:00.000Z');
  });

  it('removes busy times and slots inside the notice period', () => {
    const busy = [{ start: new Date('2026-01-15T16:15:00Z'), end: new Date('2026-01-15T17:00:00Z') }];
    const slots = availableSlots(schedule, { ...day('2026-01-15'), now, busy });
    expect(slots.map((s) => s.start.toISOString().slice(11, 16))).not.toContain('16:00');
    expect(slots.map((s) => s.start.toISOString().slice(11, 16))).not.toContain('16:30');

    const soon = availableSlots(schedule, { ...day('2026-01-15'), now: new Date('2026-01-15T06:00:00Z') });
    expect(soon[0]!.start.toISOString()).toBe('2026-01-15T18:00:00.000Z');
  });

  it('never offers more than daysAhead into the future', () => {
    expect(availableSlots(schedule, { ...day('2026-03-01'), now })).toEqual([]);
  });

  it('offers the live hours: 9 AM to 9 PM Pakistan time, every day', () => {
    // Pakistan is GMT+5 all year: 09:00–21:00 → 04:00–16:00 UTC, 24 slots.
    for (const date of ['2026-01-15', '2026-01-17']) {
      const slots = availableSlots(liveSchedule, { ...day(date), now });
      expect(slots).toHaveLength(24);
      expect(slots[0]!.start.toISOString()).toBe(`${date}T04:00:00.000Z`);
      expect(slots.at(-1)!.end.toISOString()).toBe(`${date}T16:00:00.000Z`);
    }
  });
});

describe('isBookable', () => {
  const now = new Date('2026-01-01T00:00:00Z');
  it('accepts exact slots only', () => {
    expect(isBookable(schedule, new Date('2026-01-15T16:30:00Z'), { now })).toBe(true);
    expect(isBookable(schedule, new Date('2026-01-15T16:10:00Z'), { now })).toBe(false);
    expect(isBookable(schedule, new Date('2026-01-15T12:00:00Z'), { now })).toBe(false);
  });
});

describe('formatInZone', () => {
  it('formats the same instant for each reader', () => {
    const start = new Date('2026-01-15T17:30:00Z');
    expect(formatInZone(start, 'Europe/London')).toEqual({
      date: 'Thursday 15 January 2026',
      time: '5:30 pm',
    });
    expect(formatInZone(start, 'America/New_York').time).toBe('12:30 pm');
  });
});
