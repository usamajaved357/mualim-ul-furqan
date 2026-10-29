import { parseBookingRequest, learnerLabel, type Booking } from './booking';
import { bookingEmails, sendEmail } from './email';
import { googleConfig, type Env } from './env';
import { busyIntervals, createMeetEvent } from './google';
import { schedule } from './schedule';
import { availableSlots, isBookable } from './slots';

const SITE_NAME = 'Mualim Ul Furqan';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export interface Context {
  request: Request;
  env: Env;
}

/** GET /api/availability?from=ISO&to=ISO → open slots in that range. */
export async function handleAvailability({ request, env }: Context): Promise<Response> {
  const url = new URL(request.url);
  const now = new Date();
  const from = new Date(url.searchParams.get('from') ?? now.toISOString());
  const to = new Date(
    url.searchParams.get('to') ?? new Date(now.getTime() + schedule.daysAhead * 86_400_000),
  );
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || from >= to) {
    return json({ error: 'Invalid range.' }, 400);
  }

  const google = googleConfig(env);
  try {
    const busy = google ? await busyIntervals(google, from, to) : [];
    const slots = availableSlots(schedule, { from, to, now, busy });
    return json({
      demo: !google,
      slotMinutes: schedule.slotMinutes,
      slots: slots.map((s) => s.start.toISOString()),
    });
  } catch (error) {
    console.error(error);
    return json({ error: 'Could not load the calendar. Please try again or message us on WhatsApp.' }, 502);
  }
}

/** POST /api/book → creates the Google Meet event and emails the family and the owner. */
export async function handleBook({ request, env }: Context): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }
  const parsed = parseBookingRequest(body);
  if (!parsed.ok) return json({ error: 'Please check the highlighted fields.', fields: parsed.errors }, 422);
  const req = parsed.value;
  // Bots fill every field; pretend success so they learn nothing.
  if (req.company) return json({ ok: true, demo: true, meetLink: null, start: req.start });

  const start = new Date(req.start);
  const end = new Date(start.getTime() + schedule.slotMinutes * 60_000);
  const google = googleConfig(env);
  const mail = { apiKey: env.RESEND_API_KEY?.trim(), from: env.EMAIL_FROM?.trim() };
  if (!google && !mail.apiKey && env.BOOKING_DEMO !== 'true') {
    return json(
      {
        error: 'Online booking is not switched on yet. Please message us on WhatsApp to book.',
        code: 'not_configured',
      },
      503,
    );
  }

  try {
    const busy = google ? await busyIntervals(google, start, end) : [];
    if (!isBookable(schedule, start, { now: new Date(), busy })) {
      return json(
        { error: 'Sorry, that time was just taken. Please pick another slot.', code: 'slot_taken' },
        409,
      );
    }

    const booking: Booking = { ...req, start, end };
    const event = google
      ? await createMeetEvent(google, {
          summary: `Free ${booking.course} trial · ${learnerLabel(booking)}`,
          description: [
            `Free 30-minute ${booking.course} trial class with ${SITE_NAME}.`,
            '',
            `Learner: ${learnerLabel(booking)}`,
            `Contact: ${booking.name} · ${booking.email}${booking.phone ? ` · ${booking.phone}` : ''}`,
            booking.notes ? `Notes: ${booking.notes}` : '',
            '',
            'Join with the Google Meet link in this invitation.',
          ]
            .filter((line, i, all) => line || all[i - 1])
            .join('\n'),
          start,
          end,
          attendee: { email: booking.email, name: booking.name },
          timeZone: schedule.timeZone,
        })
      : null;

    const ownerEmail = env.OWNER_EMAIL?.trim();
    const emails = bookingEmails(booking, {
      meetLink: event?.meetLink ?? null,
      ownerEmail: ownerEmail ?? '',
      ownerTimeZone: schedule.timeZone,
      siteName: SITE_NAME,
    });
    // The booking already exists; an email failure is logged but must not report the booking as failed.
    const results = await Promise.allSettled([
      sendEmail(emails.family, mail),
      ownerEmail ? sendEmail(emails.owner, mail) : Promise.resolve('skipped' as const),
    ]);
    for (const r of results) if (r.status === 'rejected') console.error(r.reason);

    return json({
      ok: true,
      demo: !google,
      start: start.toISOString(),
      end: end.toISOString(),
      meetLink: event?.meetLink ?? null,
      emailed: results[0].status === 'fulfilled' && results[0].value === 'sent',
    });
  } catch (error) {
    console.error(error);
    return json(
      { error: 'We could not complete the booking. Please try again or message us on WhatsApp.' },
      502,
    );
  }
}
