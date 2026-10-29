import { Icon, SegmentedControl } from '@/components/ui';
import { COURSE_LABELS } from '@/types/domain';
import type { BookingState } from '../hooks/useBooking';
import { formatDayLong, formatTime, timeZoneCity } from '../lib/calendar';
import { TextAreaField, TextField } from './Field';

const courseOptions = Object.values(COURSE_LABELS).map((c) => ({ value: c, label: c }));
const learnerOptions = [
  { value: 'child', label: 'My child' },
  { value: 'adult', label: 'Myself' },
] as const;

export function DetailsForm({ booking }: { booking: BookingState }) {
  const { slot, timeZone, form, updateForm, errors, formError, submitting } = booking;
  if (!slot) return null;
  const child = form.learner === 'child';

  return (
    <form
      noValidate
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        void booking.submit();
      }}
    >
      <div className="bg-mint flex flex-wrap items-center justify-between gap-3 rounded-[22px] px-4 py-3.5">
        <span className="flex items-center gap-3">
          <span className="bg-brand flex size-10 items-center justify-center rounded-full text-white">
            <Icon name="calendar" size={20} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-brand font-extrabold">{formatDayLong(slot, timeZone)}</span>
            <span className="text-muted text-sm font-semibold">
              {formatTime(slot, timeZone)} ({timeZoneCity(timeZone)} time) · 30 min · Google Meet
            </span>
          </span>
        </span>
        <button
          type="button"
          onClick={() => booking.selectSlot(null)}
          className="text-brand cursor-pointer rounded-lg px-2 py-1 text-sm font-bold underline-offset-2 hover:underline"
        >
          Change
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[13px] font-bold">Who is learning?</p>
        <SegmentedControl
          label="Who is learning"
          variant="track"
          options={learnerOptions}
          value={form.learner}
          onChange={(v) => updateForm('learner', v)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[13px] font-bold">Course</p>
        <SegmentedControl
          label="Course for the trial"
          options={courseOptions}
          value={form.course}
          onChange={(v) => updateForm('course', v)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="book-name"
          label={child ? 'Parent’s name' : 'Your name'}
          autoComplete="name"
          value={form.name}
          onChange={(e) => updateForm('name', e.target.value)}
          error={errors.name}
          required
        />
        {child && (
          <TextField
            id="book-student"
            label="Child’s first name"
            autoComplete="off"
            value={form.studentName}
            onChange={(e) => updateForm('studentName', e.target.value)}
            error={errors.studentName}
            required
          />
        )}
        <TextField
          id="book-email"
          label="Email"
          hint="the Meet link goes here"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => updateForm('email', e.target.value)}
          error={errors.email}
          required
        />
        <TextField
          id="book-phone"
          label="WhatsApp"
          hint="optional"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+44 7700 900123"
          value={form.phone}
          onChange={(e) => updateForm('phone', e.target.value)}
          error={errors.phone}
        />
      </div>
      <TextAreaField
        id="book-notes"
        label="Anything we should know?"
        hint="optional"
        placeholder="Age, current level, what you'd like to focus on…"
        value={form.notes}
        onChange={(e) => updateForm('notes', e.target.value)}
      />
      {/* Honeypot for bots: hidden from people and assistive tech. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        value={form.company}
        onChange={(e) => updateForm('company', e.target.value)}
      />

      {formError && (
        <p role="alert" className="rounded-xl bg-[#fbe7e5] px-4 py-3 text-sm font-semibold text-[#8e2f2b]">
          {formError}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted max-w-[300px] text-[13px]">
          Free, no card needed. You and the teacher both get an email with the Google Meet link.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="bg-brand hover:bg-brand-dark inline-flex min-h-14 cursor-pointer items-center justify-center gap-2.5 rounded-full px-7 font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Booking…
            </>
          ) : (
            <>
              Confirm free class
              <Icon name="arrow-right" size={18} strokeWidth={2.2} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
