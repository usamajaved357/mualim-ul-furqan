import { trialMessage, trialSlots, trialSummary } from './trialSummary';

describe('trial finder helpers', () => {
  it('summarises a child selection', () => {
    expect(trialSummary({ course: 'nazra', learner: 'child', region: 'uk' })).toBe(
      'Free 30-min Nazra trial for your child',
    );
  });

  it('summarises an adult selection', () => {
    expect(trialSummary({ course: 'tajweed', learner: 'adult', region: 'us' })).toBe(
      'Free 30-min Tajweed trial for you',
    );
  });

  it('returns region-specific slots', () => {
    expect(trialSlots({ course: 'qaida', learner: 'child', region: 'eu' })).toMatch(/CET/);
  });

  it('builds a WhatsApp message', () => {
    expect(trialMessage({ course: 'duas', learner: 'adult', region: 'uk' })).toContain(
      'Duas trial class for myself (UK)',
    );
  });
});
