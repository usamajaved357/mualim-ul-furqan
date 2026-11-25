import { cn } from '@/lib/cn';
import { formatDayShort, formatMonthShort, formatMonthSpan, type CalendarDay } from '../lib/calendar';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface DayPickerProps {
  weeks: CalendarDay[][];
  selected: string | null;
  onSelect: (key: string) => void;
}

/**
 * Weeks grid of upcoming days, scheduling-app style: days with open times are filled in soft emerald, days
 * without are faded, today has a gold ring, and the first day of a new month carries its month name.
 */
export function DayPicker({ weeks, selected, onSelect }: DayPickerProps) {
  const openDays = weeks.flat().filter((d) => d.slots.length).length;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1.5">
        <div className="flex min-w-0 flex-col">
          <span className="text-muted text-[11px] font-bold tracking-[0.16em] uppercase">Choose a day</span>
          <span className="font-display text-[17px] font-bold tracking-[-0.02em] sm:text-[19px] sm:whitespace-nowrap">
            {formatMonthSpan(weeks)}
          </span>
        </div>
        <span className="text-brand bg-mint shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-bold whitespace-nowrap">
          {openDays} days open
        </span>
      </div>

      <div role="grid" aria-label="Choose a day" className="flex flex-col gap-1">
        <div role="row" className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((d) => (
            <span
              key={d}
              role="columnheader"
              aria-label={d}
              className="text-muted pb-2 text-center text-[11px] font-bold tracking-[0.1em] uppercase"
            >
              {d.slice(0, 2)}
            </span>
          ))}
        </div>
        {weeks.map((week) => (
          <div role="row" key={week[0]!.key} className="grid grid-cols-7 gap-1">
            {week.map((day) => {
              const open = day.slots.length > 0;
              const isSelected = day.key === selected;
              const date = day.date.getUTCDate();
              return (
                <span role="gridcell" key={day.key} className="flex justify-center">
                  <button
                    type="button"
                    disabled={!open}
                    aria-pressed={isSelected}
                    aria-label={`${formatDayShort(day.key)}${open ? `, ${day.slots.length} times available` : ', unavailable'}`}
                    onClick={() => onSelect(day.key)}
                    className={cn(
                      'font-display relative flex aspect-square w-full max-w-12 cursor-pointer flex-col items-center justify-center rounded-full text-[15px] transition duration-200',
                      isSelected &&
                        'bg-[linear-gradient(180deg,#14916c,#0a6a4f)] font-bold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_10px_20px_-10px_rgb(11_93_75/0.9)]',
                      !isSelected && open && 'bg-mint text-brand-dark hover:bg-sage font-bold',
                      !open && 'cursor-default text-[#b9c1bd]',
                      day.isToday && !isSelected && 'ring-gold-deep ring-2 ring-inset',
                    )}
                  >
                    {date === 1 && (
                      <span
                        className={cn(
                          'absolute -top-1 text-[9px] leading-none font-bold tracking-[0.06em] uppercase',
                          isSelected ? 'text-gold' : 'text-bronze',
                        )}
                      >
                        {formatMonthShort(day.key)}
                      </span>
                    )}
                    {date}
                  </button>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
