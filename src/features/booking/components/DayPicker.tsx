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
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-2 font-extrabold">
        <Icon name="calendar" size={18} className="text-brand" />
        {formatMonthSpan(weeks)}
      </p>
      <div role="grid" aria-label="Choose a day" className="flex flex-col gap-1.5">
        <div role="row" className="grid grid-cols-7 gap-1.5">
          {WEEKDAYS.map((d) => (
            <span
              key={d}
              role="columnheader"
              className="text-muted text-center text-[11px] font-extrabold tracking-[0.06em] uppercase"
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
                      'relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-xl text-[15px] font-bold transition-colors',
                      isSelected
                        ? 'bg-brand text-white shadow-[0_10px_20px_-10px_rgb(11_93_75/0.8)]'
                        : open
                          ? 'bg-mint text-brand hover:bg-sage'
                          : 'cursor-default text-[#b5bdb9]',
                    )}
                  >
                    {day.date.getUTCDate()}
                    {day.isToday && (
                      <span
                        className={cn(
                          'absolute bottom-1.5 size-1 rounded-full',
                          isSelected ? 'bg-white' : 'bg-gold-deep',
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
    </div>
  );
}
