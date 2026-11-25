import { useState } from 'react';
import { Icon } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatDayShort, type CalendarMonth } from '../lib/calendar';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface DayPickerProps {
  months: CalendarMonth[];
  selected: string | null;
  onSelect: (key: string) => void;
}

/**
 * Month calendar, scheduling-app style: previous / next month arrows, days with open times filled in soft
 * emerald, days without faded, today ringed in gold. Moving to another month selects its first open day so
 * the time list follows.
 */
export function DayPicker({ months, selected, onSelect }: DayPickerProps) {
  const [index, setIndex] = useState(() => {
    const i = months.findIndex((m) => selected?.startsWith(m.key));
    return i >= 0 ? i : 0;
  });
  const month = months[Math.min(index, months.length - 1)];
  if (!month) return null;

  const openDays = month.weeks.flat().filter((d) => d.inMonth && d.slots.length).length;
  const go = (next: number) => {
    setIndex(next);
    const firstOpen = months[next]?.weeks.flat().find((d) => d.inMonth && d.slots.length);
    if (firstOpen) onSelect(firstOpen.key);
  };

  const navButton = (dir: -1 | 1) => {
    const target = index + dir;
    const disabled = target < 0 || target >= months.length;
    return (
      <button
        type="button"
        onClick={() => go(target)}
        disabled={disabled}
        aria-label={dir < 0 ? 'Previous month' : 'Next month'}
        className={cn(
          'border-line flex size-9 items-center justify-center rounded-full border bg-white transition',
          disabled
            ? 'text-muted cursor-default opacity-40'
            : 'text-ink hover:border-brand/50 hover:text-brand cursor-pointer hover:-translate-y-0.5',
        )}
      >
        <Icon name={dir < 0 ? 'chevron-left' : 'chevron-right'} size={17} strokeWidth={2.3} />
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end justify-between gap-3">
        <div className="flex min-w-0 flex-col">
          <span className="text-muted text-[11px] font-bold tracking-[0.16em] uppercase">Choose a day</span>
          <span className="font-display text-[19px] font-bold tracking-[-0.02em]" aria-live="polite">
            {month.label}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {navButton(-1)}
          {navButton(1)}
        </div>
      </div>

      <div role="grid" aria-label={`Choose a day in ${month.label}`} className="flex flex-col gap-1">
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
        {month.weeks.map((week) => (
          <div role="row" key={week[0]!.key} className="grid grid-cols-7 gap-1">
            {week.map((day) => {
              const open = day.slots.length > 0;
              const isSelected = day.key === selected;
              if (!day.inMonth) {
                return (
                  <span role="gridcell" key={day.key} className="flex justify-center">
                    <span className="font-display flex aspect-square w-full max-w-12 items-center justify-center text-[14px] text-[#d6dbd8]">
                      {day.date.getUTCDate()}
                    </span>
                  </span>
                );
              }
              return (
                <span role="gridcell" key={day.key} className="flex justify-center">
                  <button
                    type="button"
                    disabled={!open}
                    aria-pressed={isSelected}
                    aria-label={`${formatDayShort(day.key)}${day.isToday ? ' (today)' : ''}${open ? `, ${day.slots.length} times available` : ', unavailable'}`}
                    onClick={() => onSelect(day.key)}
                    className={cn(
                      'font-display relative flex aspect-square w-full max-w-12 cursor-pointer items-center justify-center rounded-full text-[15px] transition duration-200',
                      isSelected &&
                        'bg-[linear-gradient(180deg,#14916c,#0a6a4f)] font-bold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_10px_20px_-10px_rgb(11_93_75/0.9)]',
                      !isSelected && open && 'bg-mint text-brand-dark hover:bg-sage font-bold',
                      !open && 'cursor-default text-[#b9c1bd]',
                      day.isToday && !isSelected && 'ring-gold-deep ring-2 ring-inset',
                    )}
                  >
                    {day.date.getUTCDate()}
                  </button>
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div className="text-muted flex flex-wrap items-center justify-between gap-2 text-[12.5px] font-semibold">
        <span className="inline-flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="bg-mint size-3 rounded-full" /> Open
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="ring-gold-deep size-3 rounded-full ring-2 ring-inset" /> Today
          </span>
        </span>
        <span>
          {openDays} {openDays === 1 ? 'day' : 'days'} open in {month.label.split(' ')[0]}
        </span>
      </div>
    </div>
  );
}
