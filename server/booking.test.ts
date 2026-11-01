import { parseBookingRequest } from './booking';
import { bookingEmails, mimeMessage } from './email';

const valid = {
  start: '2026-01-15T17:30:00.000Z',
  timeZone: 'America/New_York',
  name: 'Fatima Khan',
  email: 'Fatima@example.com ',
  phone: '+1 555 010 0100',
  learner: 'child',
  studentName: 'Aisha',
  course: 'Tajweed',
  notes: '',
};

describe('parseBookingRequest', () => {
  it('accepts and normalises a valid request', () => {
    const r = parseBookingRequest(valid);
    expect(r.ok && r.value.email).toBe('fatima@example.com');
  });

  it('reports each invalid field', () => {
    const r = parseBookingRequest({ ...valid, email: 'nope', studentName: '', timeZone: 'Mars/Base' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(['email', 'studentName', 'timeZone']);
  });

  it('does not need a child name for adult learners', () => {
    expect(parseBookingRequest({ ...valid, learner: 'adult', studentName: '' }).ok).toBe(true);
  });
});

describe('bookingEmails', () => {
  const r = parseBookingRequest({ ...valid, name: 'Fatima <b>Khan</b>' });
  if (!r.ok) throw new Error('fixture invalid');
  const booking = { ...r.value, start: new Date(valid.start), end: new Date('2026-01-15T18:00:00.000Z') };
  const emails = bookingEmails(booking, {
    meetLink: 'https://meet.google.com/abc-defg-hij',
    ownerEmail: 'owner@example.com',
    ownerTimeZone: 'Europe/London',
    siteName: 'Mualim Ul Furqan',
  });

  it('tells each reader the date and time in their own time zone', () => {
    expect(emails.family.subject).toBe('Your free class is set for Thursday 15 January 2026 at 12:30 pm');
    expect(emails.owner.subject).toBe('New booking: Thursday 15 January 2026 at 5:30 pm');
    expect(emails.family.text).toContain('https://meet.google.com/abc-defg-hij');
  });

  it('escapes visitor input in HTML', () => {
    expect(emails.owner.html).not.toContain('<b>Khan</b>');
    expect(emails.owner.html).toContain('&lt;b&gt;Khan&lt;/b&gt;');
  });
});

describe('mimeMessage', () => {
  const raw = mimeMessage(
    {
      to: 'family@example.com',
      replyTo: 'owner@example.com',
      subject: 'Class · Monday',
      text: 'Hello',
      html: '<p>Hello</p>',
    },
    'Mualim Ul Furqan <owner@example.com>',
  );
  const decode = (b64: string) =>
    new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));

  it('addresses the message and encodes a non-ASCII subject', () => {
    expect(raw).toContain('From: Mualim Ul Furqan <owner@example.com>\r\n');
    expect(raw).toContain('To: family@example.com\r\n');
    expect(raw).toContain('Reply-To: owner@example.com\r\n');
    const subject = raw.match(/^Subject: =\?UTF-8\?B\?(.+)\?=$/m)?.[1];
    expect(decode(subject!)).toBe('Class · Monday');
  });

  it('carries both a text and an HTML part', () => {
    const parts = [
      ...raw.matchAll(
        /Content-Type: (text\/\w+); charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n(\S+)/g,
      ),
    ];
    expect(parts.map(([, type, body]) => [type, decode(body!)])).toEqual([
      ['text/plain', 'Hello'],
      ['text/html', '<p>Hello</p>'],
    ]);
  });
});
