import { learnerLabel, type Booking } from './booking';
import { formatInZone } from './time';

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function layout(
  title: string,
  rows: [string, string][],
  body: string,
  cta?: { href: string; label: string },
) {
  const rowHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 0;color:#4a5752;font-size:14px;width:140px;vertical-align:top">${escapeHtml(k)}</td>` +
        `<td style="padding:8px 0;color:#0f1f1b;font-size:15px;font-weight:600">${escapeHtml(v)}</td></tr>`,
    )
    .join('');
  const button = cta
    ? `<p style="margin:28px 0 8px"><a href="${escapeHtml(cta.href)}" style="background:#0b5d4b;color:#fff;text-decoration:none;padding:14px 22px;border-radius:12px;font-weight:700;display:inline-block">${escapeHtml(cta.label)}</a></p>`
    : '';
  return `<!doctype html><html><body style="margin:0;background:#fbf8f1;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fbf8f1;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #eee7d8;border-radius:20px;overflow:hidden">
<tr><td style="background:#0a2a24;padding:22px 28px;color:#e8cf94;font-weight:800;letter-spacing:2px;font-size:13px">MUALIM UL FURQAN</td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0 0 12px;font-size:22px;color:#0f1f1b">${escapeHtml(title)}</h1>
<p style="margin:0 0 18px;color:#4a5752;font-size:15px;line-height:1.6">${body}</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #eee7d8">${rowHtml}</table>
${button}
</td></tr></table></td></tr></table></body></html>`;
}

const textBody = (title: string, intro: string, rows: [string, string][], link?: string) =>
  [title, '', intro, '', ...rows.map(([k, v]) => `${k}: ${v}`), ...(link ? ['', `Join: ${link}`] : [])].join(
    '\n',
  );

/** Confirmation for the family and notification for the owner, each in the reader's own time zone. */
export function bookingEmails(
  booking: Booking,
  {
    meetLink,
    ownerEmail,
    ownerTimeZone,
    siteName,
  }: {
    meetLink: string | null;
    ownerEmail: string;
    ownerTimeZone: string;
    siteName: string;
  },
): { family: EmailMessage; owner: EmailMessage } {
  const local = formatInZone(booking.start, booking.timeZone);
  const owner = formatInZone(booking.start, ownerTimeZone);
  const join = meetLink ?? 'The Google Meet link will follow in your calendar invitation.';

  const familyTitle = `Your free class is set for ${local.date} at ${local.time}`;
  const familyIntro = `Assalamu alaikum ${booking.name}, your meeting is set on ${local.date} at ${local.time} (${booking.timeZone}). Join from any phone, tablet or laptop using the Google Meet link below. No account needed.`;
  const familyRows: [string, string][] = [
    ['Date', local.date],
    ['Time', `${local.time} (${booking.timeZone})`],
    ['Length', '30 minutes'],
    ['Course', booking.course],
    ['Learner', learnerLabel(booking)],
    ['Google Meet', join],
  ];

  const ownerTitle = `New booking: ${owner.date} at ${owner.time}`;
  const ownerIntro = `${booking.name} booked a free ${booking.course} class. The meeting is set on ${owner.date} at ${owner.time} (${ownerTimeZone}); that is ${local.time} for them in ${booking.timeZone}.`;
  const ownerRows: [string, string][] = [
    ['Date', owner.date],
    ['Time', `${owner.time} (${ownerTimeZone})`],
    ['Their time', `${local.date}, ${local.time} (${booking.timeZone})`],
    ['Name', booking.name],
    ['Email', booking.email],
    ['WhatsApp', booking.phone || '—'],
    ['Learner', learnerLabel(booking)],
    ['Course', booking.course],
    ['Notes', booking.notes || '—'],
    ['Google Meet', join],
  ];

  return {
    family: {
      to: booking.email,
      replyTo: ownerEmail,
      subject: familyTitle,
      html: layout(
        familyTitle,
        familyRows,
        escapeHtml(familyIntro),
        meetLink ? { href: meetLink, label: 'Join on Google Meet' } : undefined,
      ),
      text: textBody(familyTitle, `${familyIntro}\n\n${siteName}`, familyRows, meetLink ?? undefined),
    },
    owner: {
      to: ownerEmail,
      replyTo: booking.email,
      subject: ownerTitle,
      html: layout(
        ownerTitle,
        ownerRows,
        escapeHtml(ownerIntro),
        meetLink ? { href: meetLink, label: 'Open Google Meet' } : undefined,
      ),
      text: textBody(ownerTitle, ownerIntro, ownerRows, meetLink ?? undefined),
    },
  };
}

/** Sends through Resend. Without an API key the message is logged instead (local development). */
export async function sendEmail(
  message: EmailMessage,
  { apiKey, from }: { apiKey?: string; from?: string },
): Promise<'sent' | 'logged'> {
  if (!apiKey || !from) {
    console.log(
      `[email not sent: RESEND_API_KEY/EMAIL_FROM unset]\nTo: ${message.to}\nSubject: ${message.subject}\n\n${message.text}\n`,
    );
    return 'logged';
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [message.to],
      subject: message.subject,
      html: message.html,
      text: message.text,
      reply_to: message.replyTo,
    }),
  });
  if (!res.ok) throw new Error(`Resend failed (${res.status}): ${await res.text()}`);
  return 'sent';
}
