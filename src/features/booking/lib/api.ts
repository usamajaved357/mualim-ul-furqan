/** Client for the booking API in functions/api (served by Cloudflare Pages, or the Vite dev middleware). */

export interface Availability {
  /** True while no Google Calendar is connected: slots come from the schedule only. */
  demo: boolean;
  slotMinutes: number;
  /** Slot start times, ISO 8601. */
  slots: string[];
}

export interface BookingPayload {
  start: string;
  timeZone: string;
  name: string;
  email: string;
  phone: string;
  learner: 'child' | 'adult';
  studentName: string;
  course: string;
  notes: string;
  company: string;
}

export interface BookingResult {
  ok: true;
  demo: boolean;
  start: string;
  end: string;
  meetLink: string | null;
  emailed: boolean;
}

export class BookingError extends Error {
  constructor(
    message: string,
    readonly fields: Record<string, string> = {},
    readonly code?: string,
  ) {
    super(message);
  }
}

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(input, init);
  } catch {
    throw new BookingError('No connection. Please check your internet and try again.');
  }
  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
    fields?: Record<string, string>;
    code?: string;
  };
  if (!res.ok)
    throw new BookingError(data.error ?? 'Something went wrong. Please try again.', data.fields, data.code);
  return data as T;
}

export function fetchAvailability(from: Date, to: Date, signal?: AbortSignal): Promise<Availability> {
  const q = new URLSearchParams({ from: from.toISOString(), to: to.toISOString() });
  return request<Availability>(`/api/availability?${q}`, { signal });
}

export function createBooking(payload: BookingPayload): Promise<BookingResult> {
  return request<BookingResult>('/api/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
