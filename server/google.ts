import type { GoogleConfig } from './env';
import type { Interval } from './slots';

const CALENDAR_API = 'https://www.googleapis.com/calendar/v3';

export class GoogleApiError extends Error {}

async function accessToken(config: GoogleConfig): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  if (!res.ok) throw new GoogleApiError(`Google token refresh failed (${res.status}): ${await res.text()}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

async function call<T>(config: GoogleConfig, path: string, body: unknown): Promise<T> {
  const token = await accessToken(config);
  const res = await fetch(`${CALENDAR_API}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok)
    throw new GoogleApiError(`Google Calendar ${path} failed (${res.status}): ${await res.text()}`);
  return (await res.json()) as T;
}

/** Busy intervals in the owner's calendar between two instants. */
export async function busyIntervals(config: GoogleConfig, from: Date, to: Date): Promise<Interval[]> {
  const data = await call<{ calendars: Record<string, { busy?: { start: string; end: string }[] }> }>(
    config,
    '/freeBusy',
    { timeMin: from.toISOString(), timeMax: to.toISOString(), items: [{ id: config.calendarId }] },
  );
  const busy = Object.values(data.calendars)[0]?.busy ?? [];
  return busy.map((b) => ({ start: new Date(b.start), end: new Date(b.end) }));
}

export interface CalendarEventInput {
  summary: string;
  description: string;
  start: Date;
  end: Date;
  attendee: { email: string; name: string };
  timeZone: string;
}

export interface CreatedEvent {
  id: string;
  meetLink: string | null;
  htmlLink: string;
}

/**
 * Creates the event with a Google Meet link and invites the attendee. Google then sends the attendee its
 * own calendar invitation, and the event appears in the owner's calendar.
 */
export async function createMeetEvent(
  config: GoogleConfig,
  input: CalendarEventInput,
): Promise<CreatedEvent> {
  const event = await call<{
    id: string;
    htmlLink: string;
    hangoutLink?: string;
    conferenceData?: { entryPoints?: { entryPointType: string; uri: string }[] };
  }>(
    config,
    `/calendars/${encodeURIComponent(config.calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`,
    {
      summary: input.summary,
      description: input.description,
      start: { dateTime: input.start.toISOString(), timeZone: input.timeZone },
      end: { dateTime: input.end.toISOString(), timeZone: input.timeZone },
      attendees: [{ email: input.attendee.email, displayName: input.attendee.name }],
      conferenceData: {
        createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: 'hangoutsMeet' } },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 15 },
        ],
      },
    },
  );
  const video = event.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video')?.uri;
  return { id: event.id, meetLink: event.hangoutLink ?? video ?? null, htmlLink: event.htmlLink };
}
