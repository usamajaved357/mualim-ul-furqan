import {
  buildCalendar,
  dayKey,
  formatDayHeading,
  formatMonthShort,
  formatMonthSpan,
  formatTime,
  groupByPartOfDay,
} from './calendar';

const tz = 'Europe/London';

describe('booking calendar', () => {
  const now = new Date('2026-01-14T10:00:00Z'); // Wednesday
  const slots = [
    new Date('2026-01-15T16:00:00Z'),
    new Date('2026-01-15T16:30:00Z'),
    new Date('2026-01-17T10:00:00Z'),
  ];

  it('builds Monday-first weeks and groups slots by local day', () => {
    const weeks = buildCalendar(slots, tz, now);
    expect(weeks[0]![0]!.key).toBe('2026-01-12');
    expect(weeks.flat().find((d) => d.key === '2026-01-15')!.slots).toHaveLength(2);
    expect(weeks.flat().find((d) => d.isToday)!.key).toBe('2026-01-14');
    expect(weeks.length).toBeGreaterThanOrEqual(2);
  });

  it('moves a slot to the visitor’s own date', () => {
    // 00:30 in London on the 16th is still the 15th in New York.
    expect(dayKey(new Date('2026-01-16T00:30:00Z'), 'America/New_York')).toBe('2026-01-15');
  });

  it('formats times and parts of day', () => {
    expect(formatTime(new Date('2026-01-15T16:30:00Z'), tz)).toBe('4:30 pm');
    expect(formatTime(new Date('2026-01-15T16:30:00Z'), tz, false)).toBe('16:30');
    expect(formatTime(new Date('2026-01-15T09:00:00Z'), tz, false)).toBe('09:00');
    expect(groupByPartOfDay(slots, tz).map((g) => g.label)).toEqual(['Morning', 'Afternoon']);
  });

  it('labels days for the time list and new months in the grid', () => {
    expect(formatDayHeading('2026-11-27')).toBe('Friday 27 November');
    expect(formatMonthShort('2026-12-01')).toBe('Dec');
  });

  it('labels the month span', () => {
    expect(formatMonthSpan(buildCalendar(slots, tz, now))).toBe('January – February 2026');
  });
});
