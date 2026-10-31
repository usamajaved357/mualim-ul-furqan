import { trialMessage, trialSlots, trialSummary } from './trialSummary';

const winter = new Date('2026-11-02T12:00:00Z');

describe('trial finder helpers', () => {
  it('summarises a child selection', () => {
    expect(trialSummary({ course: 'nazra', learner: 'child' })).toBe(
      'Free 30-min Nazra trial for your child',
    );
  });

  it('summarises an adult selection', () => {
    expect(trialSummary({ course: 'tajweed', learner: 'adult' })).toBe('Free 30-min Tajweed trial for you');
  });

  it("shows opening hours in the visitor's time zone", () => {
    expect(trialSlots('Europe/London', winter)).toBe(
      'Open in your time: weekdays 4 – 9 PM, weekends 10 AM – 6 PM',
    );
    expect(trialSlots('Asia/Karachi', winter)).toBe(
      'Open in your time: weekdays 9 PM – 2 AM, weekends 3 – 11 PM',
    );
  });

  it('builds a WhatsApp message with the time zone', () => {
    expect(trialMessage({ course: 'duas', learner: 'adult' }, 'Europe/London')).toContain(
      'Duas trial class for myself (London time)',
    );
  });
});
