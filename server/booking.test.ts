import { parseBookingRequest } from './booking';
import { bookingEmails } from './email';

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
