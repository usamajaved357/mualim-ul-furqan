import { useEffect, useRef } from 'react';
import { ButtonLink, Icon } from '@/components/ui';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import { useBooking } from '../hooks/useBooking';
import { timeZoneLabel } from '@/lib/timezone';
import { BookingConfirmed } from './BookingConfirmed';
import { DayPicker } from './DayPicker';
import { DetailsForm } from './DetailsForm';
import { TimeSlots } from './TimeSlots';

const steps = ['Pick a time', 'Your details', 'Confirmed'];

function Steps({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2 text-[13px] font-bold" aria-label="Booking steps">
      {steps.map((label, i) => (
        <li key={label} aria-current={i === current ? 'step' : undefined} className="flex items-center gap-2">
          <span
            className={
              i < current
                ? 'bg-brand flex size-6 items-center justify-center rounded-full text-white'
                : i === current
                  ? 'bg-night text-gold flex size-6 items-center justify-center rounded-full'
                  : 'bg-cream text-muted flex size-6 items-center justify-center rounded-full'
            }
          >
            {i < current ? <Icon name="check" size={13} strokeWidth={3} /> : i + 1}
          </span>
          <span className={i === current ? 'text-ink' : 'text-muted max-sm:hidden'}>{label}</span>
          {i < steps.length - 1 && <span className="bg-line-strong h-px w-5" aria-hidden />}
        </li>
      ))}
    </ol>
  );
}

/** Google Meet booking: open slots from the teacher's calendar, details, then a confirmed invitation. */
export function BookingWidget() {
  const booking = useBooking();
  const { availability, result, slot } = booking;
  const step = result ? 2 : slot ? 1 : 0;

  // Each step has a different height: keep the top of the widget in view when moving between them.
  const root = useRef<HTMLDivElement>(null);
  const previousStep = useRef(step);
  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    const top = root.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) root.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  return (
    <div ref={root} className="flex scroll-mt-28 flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Steps current={step} />
        <span className="bg-cream text-muted inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-bold">
          <Icon name="video" size={15} className="text-brand" />
          30 min · Google Meet
        </span>
      </div>

      {result ? (
        <BookingConfirmed
          result={result}
          email={booking.form.email}
          timeZone={booking.timeZone}
          onReset={booking.reset}
        />
      ) : slot ? (
        <DetailsForm booking={booking} />
      ) : availability.status === 'loading' ? (
        <div
          className="grid gap-6 sm:grid-cols-[1.1fr_1fr]"
          aria-busy="true"
          aria-label="Loading available times"
        >
          <div className="bg-cream h-72 animate-pulse rounded-2xl" />
          <div className="bg-cream h-72 animate-pulse rounded-2xl" />
        </div>
      ) : availability.status === 'error' ? (
        <div className="border-line-strong flex flex-col items-center gap-3 rounded-2xl border border-dashed p-8 text-center">
          <Icon name="calendar" size={34} strokeWidth={1.5} className="text-brand" />
          <p className="text-muted">{availability.message}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={booking.retry}
              className="bg-brand min-h-11 cursor-pointer rounded-xl px-4 font-bold text-white"
            >
              Try again
            </button>
            <ButtonLink
              href={buildWhatsAppLink(whatsappMessages.trial)}
              variant="soft"
              iconLeft="whatsapp"
              size="sm"
            >
              Book on WhatsApp
            </ButtonLink>
          </div>
        </div>
      ) : (
        <>
          {booking.formError && (
            <p
              role="alert"
              className="rounded-xl bg-[#fbe7e5] px-4 py-3 text-sm font-semibold text-[#8e2f2b]"
            >
              {booking.formError}
            </p>
          )}
          <p className="bg-mint text-brand inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-bold">
            <Icon name="globe" size={15} strokeWidth={2.2} />
            Times shown in your time zone: {timeZoneLabel(booking.timeZone, new Date())}
          </p>
          <div className="grid gap-7 sm:grid-cols-[1.1fr_1fr]">
            <DayPicker
              weeks={booking.weeks}
              selected={booking.activeDay?.key ?? null}
              onSelect={booking.selectDay}
            />
            <TimeSlots day={booking.activeDay} timeZone={booking.timeZone} onSelect={booking.selectSlot} />
          </div>
        </>
      )}
    </div>
  );
}
