/**
 * Today's date in the Islamic (Hijri) calendar, for the hero. Uses the Umm al-Qura calendar built into the
 * browser (Intl), so it needs no data or network; it can differ by a day from local moon sighting.
 */

const MONTHS: [english: string, arabic: string][] = [
  ['Muharram', 'محرم'],
  ['Safar', 'صفر'],
  ['Rabi al-Awwal', 'ربيع الأول'],
  ['Rabi al-Thani', 'ربيع الآخر'],
  ['Jumada al-Ula', 'جمادى الأولى'],
  ['Jumada al-Akhirah', 'جمادى الآخرة'],
  ['Rajab', 'رجب'],
  ["Sha'ban", 'شعبان'],
  ['Ramadan', 'رمضان'],
  ['Shawwal', 'شوال'],
  ["Dhu al-Qa'dah", 'ذو القعدة'],
  ['Dhu al-Hijjah', 'ذو الحجة'],
];

export interface HijriDate {
  day: number;
  /** 1 = Muharram … 12 = Dhu al-Hijjah */
  month: number;
  year: number;
  monthName: string;
  monthArabic: string;
}

/** The Hijri date of an instant in a time zone, or null if the browser has no Islamic calendar. */
export function hijriDate(at: Date, timeZone: string): HijriDate | null {
  try {
    const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
      timeZone,
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).formatToParts(at);
    const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
    const day = get('day');
    const month = get('month');
    const year = get('year');
    const names = MONTHS[month - 1];
    if (!names || !day || !year) return null;
    return { day, month, year, monthName: names[0], monthArabic: names[1] };
  } catch {
    return null;
  }
}
