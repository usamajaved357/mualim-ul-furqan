/**
 * Arabic text helpers.
 *
 * The calligraphy font (A Thuluth) has no mark-positioning table, so it places vowel marks below the letters
 * (kasra, kasratan) far from the letter they belong to. Decorative words set in it are therefore written the way
 * calligraphic display lettering usually is: without vowel marks. The shadda stays, since it changes the word
 * and the font draws it correctly. Quranic text, the Bismillah and the hadith keep full harakat (Amiri fonts).
 */

/** Fathatan…sukun except shadda (U+064B–U+0650, U+0652), plus the extended Quranic marks (U+0653–U+065F). */
const VOWEL_MARKS = /[ً-ِْ-ٟ]/g;

/** "حِفْظ" → "حفظ", "مُعَلِّمُ الْفُرْقَان" → "معلّم الفرقان". */
export function withoutVowels(text: string): string {
  return text.replace(VOWEL_MARKS, '');
}
