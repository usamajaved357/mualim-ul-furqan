import type { CSSProperties } from 'react';
import { formatDayShort, formatTime, groupByPartOfDay, type CalendarDay } from '../lib/calendar';

interface TimeSlotsProps {
  day: CalendarDay | null;
  timeZone: string;
  onSelect: (slot: Date) => void;
}

/** The chosen day's open times, grouped into morning / afternoon / evening. Picking one moves to step 2. */
export function TimeSlots({ day, timeZone, onSelect }: TimeSlotsProps) {
  if (!day || !day.slots.length) {
    return <p className="text-muted text-[15px]">No open times in the next few weeks. Please message us.</p>;
  }
  let index = 0;
  return (
    <div className="flex flex-col gap-5">
      <p className="flex items-baseline justify-between gap-3">
        <span className="font-display text-[17px] font-bold tracking-[-0.02em]">
          {formatDayShort(day.key)}
        </span>
        <span className="text-brand bg-mint rounded-full px-2.5 py-0.5 text-[12px] font-bold">
          {day.slots.length} times open
        </span>
      </p>
      <div className="flex flex-col gap-5 md:max-h-[440px] md:[scrollbar-width:thin] md:overflow-y-auto md:pr-1">
        {groupByPartOfDay(day.slots, timeZone).map((group) => (
          <div key={group.label} className="flex flex-col gap-2.5">
            <p className="text-muted flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase">
              {group.label}
              <span aria-hidden className="bg-line h-px flex-1" />
            </p>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
              {group.slots.map((s) => (
                <li
                  key={s.toISOString()}
                  className="animate-fade-up [animation-duration:0.5s]"
                  style={{ animationDelay: `${Math.min(index++, 14) * 25}ms` } as CSSProperties}
                >
                  <button
                    type="button"
                    onClick={() => onSelect(s)}
                    className="text-ink border-line hover:border-brand hover:text-brand min-h-11 w-full cursor-pointer rounded-xl border bg-white px-2 text-[15px] font-bold shadow-[0_1px_0_rgb(15_31_26/0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-12px_rgb(12_122_91/0.6)]"
                  >
                    {formatTime(s, timeZone)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
