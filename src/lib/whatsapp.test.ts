import { buildWhatsAppLink } from './whatsapp';

describe('buildWhatsAppLink', () => {
  it('strips non-digits from the number', () => {
    expect(buildWhatsAppLink(undefined, '+44 7700-900 123')).toBe('https://wa.me/447700900123');
  });

  it('encodes the pre-filled message', () => {
    expect(buildWhatsAppLink('Salam & hi', '447700900123')).toBe(
      'https://wa.me/447700900123?text=Salam%20%26%20hi',
    );
  });

  it('falls back to the booking anchor without a number', () => {
    expect(buildWhatsAppLink('hello', '')).toBe('/#book');
  });
});
