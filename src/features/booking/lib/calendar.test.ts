import {
  buildMonths,
  dayKey,
  formatDayHeading,
  formatMonthShort,
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

  it('builds Monday-first month grids and groups slots by local day', () => {
    const months = buildMonths(slots, tz, now);
    expect(months.map((m) => m.label)).toEqual(['January 2026']);
    const days = months[0]!.weeks.flat();
    // January 2026 starts on a Thursday: the grid opens on Monday 29 December.
    expect(days[0]!.key).toBe('2025-12-29');
    expect(days[0]!.inMonth).toBe(false);
    expect(days.find((d) => d.key === '2026-01-15')!.slots).toHaveLength(2);
    expect(days.find((d) => d.isToday)!.key).toBe('2026-01-14');
    expect(months[0]!.weeks.every((w) => w.length === 7)).toBe(true);
  });

  it('adds a month page for every month up to the last open slot', () => {
    const later = [...slots, new Date('2026-03-02T10:00:00Z')];
    const months = buildMonths(later, tz, now);
    expect(months.map((m) => m.key)).toEqual(['2026-01', '2026-02', '2026-03']);
    expect(months[2]!.weeks.flat().find((d) => d.key === '2026-03-02')!.slots).toHaveLength(1);
  });

  it('never offers days before today', () => {
    const past = buildMonths([new Date('2026-01-10T10:00:00Z'), ...slots], tz, now);
    expect(past[0]!.weeks.flat().find((d) => d.key === '2026-01-10')!.slots).toHaveLength(0);
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
});
