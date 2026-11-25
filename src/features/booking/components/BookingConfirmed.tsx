import { Rosette } from '@/components/decor/Rosette';
import { ButtonLink, Icon } from '@/components/ui';
import type { BookingResult } from '../lib/api';
import { formatDayLong, formatTime, timeZoneCity } from '../lib/calendar';

interface BookingConfirmedProps {
  result: BookingResult;
  email: string;
  timeZone: string;
  onReset: () => void;
}

export function BookingConfirmed({ result, email, timeZone, onReset }: BookingConfirmedProps) {
  const start = new Date(result.start);
  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center" role="status">
      <span className="relative flex size-28 items-center justify-center">
        <Rosette opacity={0.9} className="inset-0 size-full [&_g]:stroke-[#e2c07a]" />
        <span className="animate-scale-in relative flex size-16 items-center justify-center rounded-full bg-[linear-gradient(180deg,#14916c,#0a6a4f)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_16px_30px_-12px_rgb(12_122_91/0.9)]">
          <Icon name="check" size={32} strokeWidth={2.6} />
        </span>
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[30px] font-bold">Your free class is booked!</h3>
        <p className="text-muted">
          Your meeting is set on <strong className="text-ink">{formatDayLong(start, timeZone)}</strong> at{' '}
          <strong className="text-ink">
            {formatTime(start, timeZone)} ({timeZoneCity(timeZone)} time)
          </strong>
          .
        </p>
      </div>

      <div className="bg-parchment border-line flex w-full flex-col gap-3 rounded-2xl border p-4 text-left text-[15px]">
        <p className="flex items-start gap-3">
          <Icon name="mail" size={20} className="text-brand mt-0.5 shrink-0" />
          <span>
            {result.emailed ? 'A confirmation has been sent to ' : 'Confirmation for '}
            <strong>{email}</strong>
            {result.emailed ? '. Check your spam folder if it is not there in a few minutes.' : '.'}
          </span>
        </p>
        <p className="flex items-start gap-3">
          <Icon name="video" size={20} className="text-brand mt-0.5 shrink-0" />
          <span>
            {result.meetLink ? (
              <>
                Google Meet link: <span className="font-bold break-all">{result.meetLink}</span>. It is also
                in your Google Calendar invitation.
              </>
            ) : (
              'The Google Meet link will be sent to your email before the class.'
            )}
          </span>
        </p>
      </div>

      {result.demo && (
        <p className="rounded-xl bg-[#fff6e0] px-4 py-2.5 text-[13px] font-semibold text-[#6b4510]">
          Demo mode: no calendar event was created. Connect Google Calendar to go live (see README).
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-2.5">
        {result.meetLink && (
          <ButtonLink href={result.meetLink} iconLeft="video" size="lg">
            Open Google Meet
          </ButtonLink>
        )}
        <button
          type="button"
          onClick={onReset}
          className="glass text-ink min-h-13 cursor-pointer rounded-full px-6 font-semibold transition hover:-translate-y-0.5"
        >
          Book another time
        </button>
      </div>
    </div>
  );
}
