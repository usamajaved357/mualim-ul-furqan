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
    expect(trialSlots('Asia/Karachi', winter)).toBe('Open every day, 9 AM – 9 PM (your time)');
    expect(trialSlots('Europe/London', winter)).toBe('Open every day, 4 AM – 4 PM (your time)');
  });

  it('builds a WhatsApp message with the time zone', () => {
    expect(trialMessage({ course: 'duas', learner: 'adult' }, 'Europe/London')).toContain(
      'Duas trial class for myself (London time)',
    );
  });
});
