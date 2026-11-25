import { useState, type CSSProperties } from 'react';
import { Icon, type IconName } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatDayHeading, formatTime, groupByPartOfDay, type CalendarDay } from '../lib/calendar';

const partIcons: Record<string, IconName> = { Morning: 'sun', Afternoon: 'sunset', Evening: 'moon' };

interface TimeSlotsProps {
  day: CalendarDay | null;
  timeZone: string;
  /** 24-hour clock instead of am/pm. */
  hour24: boolean;
  onHour24Change: (value: boolean) => void;
  /** Called with the chosen time when the visitor presses Continue. */
  onSelect: (slot: Date) => void;
}

/**
 * The chosen day's open times. Morning / afternoon / evening tabs keep the list short; picking a time
 * highlights it and shows a Continue bar (scheduling-app style), so nobody jumps ahead by accident.
 * Remounted per day (keyed by the parent), which resets the tab and the picked time.
 */
export function TimeSlots({ day, timeZone, hour24, onHour24Change, onSelect }: TimeSlotsProps) {
  const groups = day ? groupByPartOfDay(day.slots, timeZone) : [];
  const [tab, setTab] = useState(groups[0]?.label ?? '');
  const [picked, setPicked] = useState<Date | null>(null);

  if (!day || !groups.length) {
    return (
      <p className="text-muted flex h-full items-center justify-center rounded-2xl border border-dashed border-[#e3d6bd] p-8 text-center text-[15px]">
        No open times in the next few weeks. Please message us on WhatsApp.
      </p>
    );
  }
  const active = groups.find((g) => g.label === tab) ?? groups[0]!;
  const shortDay = formatDayHeading(day.key).replace(/^(\w{3})\w*/, '$1');

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
        <div className="flex min-w-0 flex-col">
          <span className="text-muted text-[11px] font-bold tracking-[0.16em] uppercase">Choose a time</span>
          <span className="font-display text-[19px] font-bold tracking-[-0.02em]">
            {formatDayHeading(day.key)}
          </span>
        </div>
        <div
          role="group"
          aria-label="Clock format"
          className="bg-cream flex rounded-full p-0.5 text-[12px] font-bold"
        >
          {[
            { label: '12h', value: false },
            { label: '24h', value: true },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              aria-pressed={hour24 === o.value}
              onClick={() => onHour24Change(o.value)}
              className={cn(
                'cursor-pointer rounded-full px-2.5 py-1 transition-colors',
                hour24 === o.value ? 'text-ink bg-white shadow-[0_1px_3px_rgb(15_31_26/0.15)]' : 'text-muted',
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Part-of-day tabs, with how many times each has. */}
      <div
        role="tablist"
        aria-label="Part of day"
        className="border-line grid auto-cols-fr grid-flow-col gap-1 rounded-2xl border bg-[#fbf8f1] p-1"
      >
        {groups.map((g) => {
          const on = g.label === active.label;
          return (
            <button
              key={g.label}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setTab(g.label)}
              className={cn(
                'flex min-w-0 cursor-pointer items-center justify-center gap-1 rounded-xl px-1 py-2 text-[12.5px] font-bold transition sm:gap-1.5 sm:px-2 sm:text-[13px]',
                on
                  ? 'text-brand bg-white shadow-[0_1px_0_white_inset,0_4px_12px_-6px_rgb(15_31_26/0.35)]'
                  : 'text-muted hover:text-ink',
              )}
            >
              <Icon
                name={partIcons[g.label] ?? 'clock'}
                size={15}
                strokeWidth={2.1}
                className="max-sm:hidden"
              />
              {g.label}
              <span className={cn('rounded-full px-1.5 text-[11px]', on ? 'bg-mint' : 'bg-white')}>
                {g.slots.length}
              </span>
            </button>
          );
        })}
      </div>

      <ul
        role="tabpanel"
        aria-label={`${active.label} times`}
        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
      >
        {active.slots.map((s, i) => {
          const on = picked?.getTime() === s.getTime();
          return (
            <li
              key={s.toISOString()}
              className="animate-fade-up [animation-duration:0.4s]"
              style={{ animationDelay: `${Math.min(i, 12) * 20}ms` } as CSSProperties}
            >
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setPicked(s)}
                className={cn(
                  'font-display flex min-h-12 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border text-[15px] font-bold tabular-nums transition duration-200',
                  on
                    ? 'bg-abyss border-transparent text-white shadow-[0_10px_20px_-10px_rgb(4_21_15/0.9)]'
                    : 'border-line text-ink hover:border-brand/60 hover:text-brand bg-white hover:-translate-y-0.5 hover:shadow-[0_8px_16px_-10px_rgb(12_122_91/0.6)]',
                )}
              >
                {on && <Icon name="check" size={14} strokeWidth={3} className="text-gold" />}
                {formatTime(s, timeZone, !hour24)}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Continue bar: appears once a time is picked. */}
      <div className="mt-auto pt-1">
        {picked ? (
          <div className="animate-fade-up flex items-center justify-between gap-3 rounded-2xl bg-[linear-gradient(110deg,#f1faf5,#fff8ea)] p-3 pl-4 shadow-[inset_0_0_0_1px_rgb(15_31_26/0.06)] [animation-duration:0.35s]">
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-muted text-[12px] font-semibold">Your free class</span>
              <span className="truncate text-[14.5px] font-bold">
                {shortDay} · {formatTime(picked, timeZone, !hour24)}
              </span>
            </span>
            <button
              type="button"
              onClick={() => onSelect(picked)}
              className="shine inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-[linear-gradient(180deg,#14916c,#0a6a4f)] px-5 text-[14.5px] font-bold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_10px_22px_-12px_rgb(12_122_91/0.9)] transition hover:-translate-y-0.5"
            >
              Continue
              <Icon name="arrow-right" size={16} strokeWidth={2.4} />
            </button>
          </div>
        ) : (
          <p className="text-muted flex items-center gap-2 text-[13px]">
            <Icon name="clock" size={15} className="text-brand" />
            Classes are 30 minutes. Times are in your time zone.
          </p>
        )}
      </div>
    </div>
  );
}
