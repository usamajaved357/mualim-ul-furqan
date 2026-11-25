import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { getBookingIntent, subscribeBookingIntent } from '@/lib/bookingIntent';
import { track } from '@/lib/analytics';
import { visitorTimeZone } from '@/lib/timezone';
import { COURSE_LABELS } from '@/types/domain';
import {
  BookingError,
  createBooking,
  fetchAvailability,
  type Availability,
  type BookingPayload,
  type BookingResult,
} from '../lib/api';
import { buildMonths } from '../lib/calendar';

export type BookingForm = Omit<BookingPayload, 'start' | 'timeZone'>;

/** One day more than the server offers (server/schedule.ts `daysAhead`), so no open slot is cut off. */
const DAYS_AHEAD = 61;

const emptyForm: BookingForm = {
  name: '',
  email: '',
  phone: '',
  learner: 'child',
  studentName: '',
  course: COURSE_LABELS.nazra,
  notes: '',
  company: '',
};

type AvailabilityState =
  { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; data: Availability };

/** State for the three-step booking flow: pick a time → your details → confirmed. */
export function useBooking() {
  const timeZone = useMemo(() => visitorTimeZone(), []);
  const [availability, setAvailability] = useState<AvailabilityState>({ status: 'loading' });
  const [reload, setReload] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<Date | null>(null);
  // Pre-fill course and learner from choices made elsewhere (the hero trial finder, the Hifz plan), both when
  // the visitor arrives from those buttons and if they change them while this page is open.
  const intent = useSyncExternalStore(subscribeBookingIntent, getBookingIntent, () => null);
  const [appliedIntent, setAppliedIntent] = useState(intent);
  const [form, setForm] = useState<BookingForm>(() =>
    intent ? { ...emptyForm, course: COURSE_LABELS[intent.course], learner: intent.learner } : emptyForm,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const now = new Date();
    fetchAvailability(now, new Date(now.getTime() + DAYS_AHEAD * 86_400_000), controller.signal)
      .then((data) => setAvailability({ status: 'ready', data }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setAvailability({
          status: 'error',
          message: error instanceof Error ? error.message : 'Could not load available times.',
        });
      });
    return () => controller.abort();
  }, [reload]);

  if (intent !== appliedIntent) {
    setAppliedIntent(intent);
    if (intent) setForm((f) => ({ ...f, course: COURSE_LABELS[intent.course], learner: intent.learner }));
  }

  const months = useMemo(
    () =>
      availability.status === 'ready'
        ? buildMonths(
            availability.data.slots.map((s) => new Date(s)),
            timeZone,
            new Date(),
          )
        : [],
    [availability, timeZone],
  );
  const days = months.flatMap((m) => m.weeks.flat()).filter((d) => d.inMonth);
  const activeDay = days.find((d) => d.key === selectedDay) ?? days.find((d) => d.slots.length) ?? null;

  const refresh = () => {
    setAvailability({ status: 'loading' });
    setReload((n) => n + 1);
  };

  const updateForm = useCallback(<K extends keyof BookingForm>(key: K, value: BookingForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  }, []);

  async function submit() {
    if (!slot) return;
    setSubmitting(true);
    setFormError(null);
    try {
      const booked = await createBooking({ ...form, start: slot.toISOString(), timeZone });
      setResult(booked);
      track('Schedule');
    } catch (error) {
      if (error instanceof BookingError) {
        setErrors(error.fields);
        setFormError(error.message);
        if (error.code === 'slot_taken') {
          setSlot(null);
          refresh();
        }
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setResult(null);
    setSlot(null);
    setFormError(null);
    refresh();
  }

  return {
    timeZone,
    availability,
    months,
    activeDay,
    selectDay: setSelectedDay,
    slot,
    selectSlot: (s: Date | null) => {
      setSlot(s);
      setFormError(null);
    },
    form,
    updateForm,
    errors,
    formError,
    submitting,
    submit,
    result,
    reset,
    retry: refresh,
  };
}

export type BookingState = ReturnType<typeof useBooking>;
