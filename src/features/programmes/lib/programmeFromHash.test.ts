import { programmeOrder } from '../data';
import { programmeFromHash } from './programmeFromHash';

describe('programmeFromHash', () => {
  it('reads a programme from the hash', () => {
    expect(programmeFromHash('#tajweed', programmeOrder)).toBe('tajweed');
    expect(programmeFromHash('hifz', programmeOrder)).toBe('hifz');
    expect(programmeFromHash('#Qaida', programmeOrder)).toBe('qaida');
  });

  it('ignores hashes that are not programmes', () => {
    expect(programmeFromHash('', programmeOrder)).toBeNull();
    expect(programmeFromHash('#pricing', programmeOrder)).toBeNull();
    expect(programmeFromHash('#courses', programmeOrder)).toBeNull();
  });
});
