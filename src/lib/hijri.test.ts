import { hijriDate } from './hijri';

describe('hijriDate', () => {
  it('gives the Umm al-Qura date with English and Arabic month names', () => {
    // 1 Ramadan 1447 AH = 18 February 2026 (Umm al-Qura).
    const d = hijriDate(new Date('2026-02-18T12:00:00Z'), 'Asia/Karachi');
    expect(d).toMatchObject({ day: 1, month: 9, year: 1447, monthName: 'Ramadan', monthArabic: 'رمضان' });
  });

  it('follows the visitor’s own date across midnight', () => {
    // 23:30 UTC on 17 February is already the 18th in Karachi but still the 17th in London.
    const at = new Date('2026-02-17T23:30:00Z');
    expect(hijriDate(at, 'Asia/Karachi')!.day).toBe(1);
    expect(hijriDate(at, 'Europe/London')!.month).toBe(8);
  });
});
