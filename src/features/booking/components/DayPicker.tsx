import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';
import { formatDayShort, formatMonthSpan, type CalendarDay } from '../lib/calendar';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface DayPickerProps {
  weeks: CalendarDay[][];
  selected: string | null;
  onSelect: (key: string) => void;
}

/** Weeks grid of upcoming days; days with open slots are selectable. */
export function DayPicker({ weeks, selected, onSelect }: DayPickerProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-display flex items-center gap-2.5 text-[17px] font-bold tracking-[-0.02em]">
        <span className="bg-mint text-brand flex size-8 items-center justify-center rounded-lg">
          <Icon name="calendar" size={16} strokeWidth={2.2} />
        </span>
        {formatMonthSpan(weeks)}
      </p>
      <div role="grid" aria-label="Choose a day" className="flex flex-col gap-1.5">
        <div role="row" className="grid grid-cols-7 gap-1.5">
          {WEEKDAYS.map((d) => (
            <span
              key={d}
              role="columnheader"
              className="text-muted pb-1 text-center text-[11px] font-bold tracking-[0.08em] uppercase"
            >
              {d.slice(0, 2)}
            </span>
          ))}
        </div>
        {weeks.map((week) => (
          <div role="row" key={week[0]!.key} className="grid grid-cols-7 gap-1.5">
            {week.map((day) => {
              const open = day.slots.length > 0;
              const isSelected = day.key === selected;
              return (
                <span role="gridcell" key={day.key}>
                  <button
                    type="button"
                    disabled={!open}
                    aria-pressed={isSelected}
                    aria-label={`${formatDayShort(day.key)}${open ? `, ${day.slots.length} times available` : ', unavailable'}`}
                    onClick={() => onSelect(day.key)}
                    className={cn(
                      'font-display relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-xl text-[15px] font-bold transition duration-200',
                      isSelected
                        ? 'scale-105 bg-[linear-gradient(180deg,#14916c,#0a6a4f)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_10px_20px_-10px_rgb(11_93_75/0.9)]'
                        : open
                          ? 'text-ink border-line hover:border-brand/50 hover:text-brand border bg-white hover:-translate-y-0.5'
                          : 'cursor-default text-[#c3c9c6]',
                    )}
                  >
                    {day.date.getUTCDate()}
                    {open && !isSelected && (
                      <span aria-hidden className="bg-brand-light absolute bottom-1.5 size-1 rounded-full" />
                    )}
                    {day.isToday && (
                      <span
                        aria-hidden
                        className={cn(
                          'absolute top-1 right-1 size-1.5 rounded-full',
                          isSelected ? 'bg-gold' : 'bg-gold-deep',
                        )}
                      />
                    )}
                  </button>
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <p className="text-muted flex items-center gap-4 text-[12px] font-semibold">
        <span className="inline-flex items-center gap-1.5">
          <span className="bg-brand-light size-1.5 rounded-full" /> Times available
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="bg-gold-deep size-1.5 rounded-full" /> Today
        </span>
      </p>
    </div>
  );
}
