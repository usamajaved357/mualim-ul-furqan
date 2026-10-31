import { Icon } from '@/components/ui';
import { openingHours } from '@/config/hours';
import { describeHours, sameClock, timeZoneLabel } from '@/lib/timezone';

/** The teacher's hours in the visitor's own time, and the time zone the slots below are shown in. */
export function AvailabilityNote({ timeZone }: { timeZone: string }) {
  const now = new Date();
  const local = describeHours(openingHours, timeZone, now);
  const teacher = describeHours(openingHours, openingHours.timeZone, now);
  const { place } = openingHours;

  return (
    <div className="border-line bg-parchment grid gap-3 rounded-2xl border p-3 sm:grid-cols-[1.25fr_1fr] sm:gap-0">
      <p className="flex items-center gap-3 sm:pr-4">
        <span className="bg-brand flex size-10 shrink-0 items-center justify-center rounded-full text-white">
          <Icon name="clock" size={18} strokeWidth={2.2} />
        </span>
        <span className="flex min-w-0 flex-col leading-snug">
          <span className="text-[15px] font-extrabold">Available {local}</span>
          <span className="text-muted text-[13px] font-semibold">
            {sameClock(timeZone, openingHours.timeZone, now)
              ? `${place} time, the same as yours`
              : `In your time. In ${place}: ${teacher}`}
          </span>
        </span>
      </p>
      <p className="border-line flex items-center gap-3 sm:border-l sm:pl-4">
        <span className="bg-mint text-brand flex size-10 shrink-0 items-center justify-center rounded-full">
          <Icon name="globe" size={18} strokeWidth={2.2} />
        </span>
        <span className="flex min-w-0 flex-col leading-snug">
          <span className="truncate text-[15px] font-extrabold">{timeZoneLabel(timeZone, now)}</span>
          <span className="text-muted text-[13px] font-semibold">Your time zone, for all times below</span>
        </span>
      </p>
    </div>
  );
}
