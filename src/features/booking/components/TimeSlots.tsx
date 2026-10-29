import { formatDayShort, formatTime, groupByPartOfDay, type CalendarDay } from '../lib/calendar';

interface TimeSlotsProps {
  day: CalendarDay | null;
  timeZone: string;
  onSelect: (slot: Date) => void;
}

export function TimeSlots({ day, timeZone, onSelect }: TimeSlotsProps) {
  if (!day || !day.slots.length) {
    return <p className="text-muted text-[15px]">No open times in the next few weeks. Please message us.</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="font-extrabold">{formatDayShort(day.key)}</p>
      <div className="flex max-h-[340px] flex-col gap-4 overflow-y-auto pr-1">
        {groupByPartOfDay(day.slots, timeZone).map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <p className="text-muted text-[11px] font-extrabold tracking-[0.1em] uppercase">{group.label}</p>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
              {group.slots.map((s) => (
                <li key={s.toISOString()}>
                  <button
                    type="button"
                    onClick={() => onSelect(s)}
                    className="border-line-strong text-ink hover:border-brand hover:bg-mint hover:text-brand min-h-11 w-full cursor-pointer rounded-full border-[1.5px] bg-white px-2 text-[15px] font-bold transition-colors"
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
