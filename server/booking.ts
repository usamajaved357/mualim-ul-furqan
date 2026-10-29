import { isValidTimeZone } from './time';

export const COURSES = ['Noorani Qaida', 'Nazra', 'Tajweed', 'Hifz', 'Duas'] as const;
export const LEARNERS = ['child', 'adult'] as const;

export interface BookingRequest {
  start: string;
  timeZone: string;
  name: string;
  email: string;
  phone: string;
  learner: (typeof LEARNERS)[number];
  studentName: string;
  course: (typeof COURSES)[number];
  notes: string;
  /** Honeypot: real visitors never fill this in. */
  company?: string;
}

export interface Booking extends Omit<BookingRequest, 'start' | 'company'> {
  start: Date;
  end: Date;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Parses and validates a booking request body. Returns field errors, or the clean request. */
export function parseBookingRequest(
  body: unknown,
): { ok: true; value: BookingRequest } | { ok: false; errors: Record<string, string> } {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  const value: BookingRequest = {
    start: text(b.start, 40),
    timeZone: text(b.timeZone, 64),
    name: text(b.name, 80),
    email: text(b.email, 120).toLowerCase(),
    phone: text(b.phone, 30),
    learner: (LEARNERS as readonly string[]).includes(b.learner as string)
      ? (b.learner as BookingRequest['learner'])
      : 'child',
    studentName: text(b.studentName, 80),
    course: (COURSES as readonly string[]).includes(b.course as string)
      ? (b.course as BookingRequest['course'])
      : 'Noorani Qaida',
    notes: text(b.notes, 600),
    company: text(b.company, 80),
  };

  const errors: Record<string, string> = {};
  if (Number.isNaN(Date.parse(value.start))) errors.start = 'Please choose a time.';
  if (!isValidTimeZone(value.timeZone)) errors.timeZone = 'Unknown time zone.';
  if (value.name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL.test(value.email)) errors.email = 'Please enter a valid email address.';
  if (value.phone && !/^[+\d][\d\s()-]{6,}$/.test(value.phone)) errors.phone = 'Please check this number.';
  if (value.learner === 'child' && value.studentName.length < 2) {
    errors.studentName = "Please enter your child's first name.";
  }
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}

export function learnerLabel(booking: Pick<Booking, 'learner' | 'studentName' | 'name'>): string {
  return booking.learner === 'child' ? `${booking.studentName} (child of ${booking.name})` : booking.name;
}
