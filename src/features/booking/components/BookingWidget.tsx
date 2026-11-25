import { useEffect, useRef, useState } from 'react';
import { ButtonLink, Icon } from '@/components/ui';
import { cn } from '@/lib/cn';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import type { BookingState } from '../hooks/useBooking';
import { AvailabilityNote } from './AvailabilityNote';
import { BookingConfirmed } from './BookingConfirmed';
import { DayPicker } from './DayPicker';
import { DetailsForm } from './DetailsForm';
import { TimeSlots } from './TimeSlots';

const steps = ['Pick a time', 'Your details', 'Confirmed'];

/** Three-step progress: numbered dots joined by a line that fills as the visitor moves on. */
function Steps({ current }: { current: number }) {
  return (
    <ol className="flex items-center text-[13px] font-bold" aria-label="Booking steps">
      {steps.map((label, i) => (
        <li
          key={label}
          aria-current={i === current ? 'step' : undefined}
          className="flex items-center gap-2.5"
        >
          <span
            className={cn(
              'flex size-7 shrink-0 items-center justify-center rounded-full transition-all duration-500',
              i < current && 'bg-brand text-white',
              i === current &&
                'bg-abyss text-gold shadow-[0_0_0_4px_rgb(247_213_139/0.25),0_8px_16px_-8px_rgb(4_21_15/0.8)]',
              i > current && 'bg-cream text-muted',
            )}
          >
            {i < current ? <Icon name="check" size={14} strokeWidth={3} /> : i + 1}
          </span>
          <span className={cn(i === current ? 'text-ink' : 'text-muted', i !== current && 'max-sm:hidden')}>
            {label}
          </span>
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="bg-line-strong relative mx-3 h-[2px] w-6 overflow-hidden rounded-full sm:w-10"
            >
              <span
                className={cn(
                  'bg-brand absolute inset-0 origin-left transition-transform duration-700',
                  i < current ? 'scale-x-100' : 'scale-x-0',
                )}
              />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Google Meet booking: open slots from the teacher's calendar, details, then a confirmed invitation. */
export function BookingWidget({ booking }: { booking: BookingState }) {
  const { availability, result, slot } = booking;
  const step = result ? 2 : slot ? 1 : 0;
  // Clock format for the time list; lives here so it survives switching days.
  const [hour24, setHour24] = useState(false);

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
    <div ref={root} className="flex scroll-mt-28 flex-col gap-6">
      <div className="border-line flex flex-wrap items-center justify-between gap-3 border-b pb-5">
        <Steps current={step} />
        <span className="bg-mint text-brand inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-bold">
          <Icon name="video" size={15} />
          30 min · Google Meet
        </span>
      </div>

      {/* key: each step fades in fresh. */}
      <div key={step} className="animate-fade-up [animation-duration:0.6s]">
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
          <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading available times">
            <div className="bg-cream h-16 animate-pulse rounded-2xl" />
            <div className="grid gap-6 sm:grid-cols-[1.1fr_1fr]">
              <div className="bg-cream h-72 animate-pulse rounded-2xl" />
              <div className="bg-cream h-72 animate-pulse rounded-2xl" />
            </div>
          </div>
        ) : availability.status === 'error' ? (
          <div className="border-line-strong flex flex-col items-center gap-3 rounded-[24px] border border-dashed p-10 text-center">
            <span className="bg-mint text-brand flex size-14 items-center justify-center rounded-full">
              <Icon name="calendar" size={26} strokeWidth={1.8} />
            </span>
            <p className="text-muted max-w-[380px]">{availability.message}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={booking.retry}
                className="shine min-h-11 cursor-pointer rounded-full bg-[linear-gradient(180deg,#14916c,#0a6a4f)] px-5 font-bold text-white"
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
          <div className="flex flex-col gap-6">
            {booking.formError && (
              <p
                role="alert"
                className="rounded-xl bg-[#fbe7e5] px-4 py-3 text-sm font-semibold text-[#8e2f2b]"
              >
                {booking.formError}
              </p>
            )}
            <AvailabilityNote timeZone={booking.timeZone} />
            <div className="grid gap-8 md:grid-cols-[1fr_1.05fr] md:gap-0">
              <div className="md:pr-8">
                <DayPicker
                  weeks={booking.weeks}
                  selected={booking.activeDay?.key ?? null}
                  onSelect={booking.selectDay}
                />
              </div>
              <div className="md:border-line flex flex-col md:border-l md:pl-8">
                <TimeSlots
                  key={booking.activeDay?.key}
                  day={booking.activeDay}
                  timeZone={booking.timeZone}
                  hour24={hour24}
                  onHour24Change={setHour24}
                  onSelect={booking.selectSlot}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
