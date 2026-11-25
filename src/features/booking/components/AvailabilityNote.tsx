import { Icon } from '@/components/ui';
import { openingHours } from '@/config/hours';
import { describeHours, sameClock, timeZoneLabel } from '@/lib/timezone';

/** Glues "9 AM – 9 PM" together (no-break spaces, plus a word joiner since lines may break after a dash). */
const keepRanges = (text: string) =>
  text.replace(/ (?=[AP]M)/g, '\u00a0').replace(/ – /g, '\u00a0–\u2060\u00a0');

/** The teacher's hours in the visitor's own time, and the time zone the slots below are shown in. */
export function AvailabilityNote({ timeZone }: { timeZone: string }) {
  const now = new Date();
  const local = keepRanges(describeHours(openingHours, timeZone, now));
  const teacher = keepRanges(describeHours(openingHours, openingHours.timeZone, now));
  const { place } = openingHours;

  return (
    <div className="grid gap-3 rounded-2xl bg-[linear-gradient(110deg,#f1faf5,#fff8ea)] p-3 shadow-[inset_0_0_0_1px_rgb(15_31_26/0.06)] sm:grid-cols-[1.25fr_1fr] sm:gap-0">
      <p className="flex items-center gap-3 sm:pr-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#14916c,#0a6a4f)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3)]">
          <Icon name="clock" size={18} strokeWidth={2.2} />
        </span>
        <span className="flex min-w-0 flex-col leading-snug">
          <span className="text-[15px] font-bold">Available {local}</span>
          <span className="text-muted text-[13px] font-semibold">
            {sameClock(timeZone, openingHours.timeZone, now)
              ? `${place} time, the same as yours`
              : `In your time. In ${place}: ${teacher}`}
          </span>
        </span>
      </p>
      <p className="border-line flex items-center gap-3 sm:border-l sm:pl-4">
        <span className="text-bronze flex size-10 shrink-0 items-center justify-center rounded-full bg-[#fdf0d5]">
          <Icon name="globe" size={18} strokeWidth={2.2} />
        </span>
        <span className="flex min-w-0 flex-col leading-snug">
          <span className="truncate text-[15px] font-bold">{timeZoneLabel(timeZone, now)}</span>
          <span className="text-muted text-[13px] font-semibold">Your time zone, for all times below</span>
        </span>
      </p>
    </div>
  );
}
