import type { Ayah } from './MushafPanel';

/**
 * Surah Al-Fatiha for the lesson mockups, fully vowelled, in the standard (imla'i) spelling rather than the
 * Uthmani script: long vowels are written with a full alif (مَالِكِ، الْعَالَمِينَ، الصِّرَاطَ).
 *
 * Why: the site sets it in its calligraphy font, A Thuluth, which has no glyph for the Uthmani small alif
 * (U+0670) and draws a fatha in its place. In the Uthmani text that would turn مَٰلِكِ (maaliki) into مَلِكِ
 * (maliki) and change the recitation. The imla'i spelling reads the same as Hafs and every mark in it renders
 * correctly in this font. Each ayah is NFC-normalised so a vowel mark always precedes the shadda, the only
 * order in which A Thuluth draws the shadda.
 */
const ayat: [text: string, number: string][] = [
  ['بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', '١'],
  ['الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', '٢'],
  ['الرَّحْمَنِ الرَّحِيمِ', '٣'],
  ['مَالِكِ يَوْمِ الدِّينِ', '٤'],
  ['إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', '٥'],
  ['اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', '٦'],
  ['صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', '٧'],
];

export const AL_FATIHA: readonly Ayah[] = ayat.map(([text, number]) => ({
  text: text.normalize('NFC'),
  number,
}));

/** The Bismillah, in the same spelling and font as the ayat. */
export const BISMILLAH = AL_FATIHA[0]!.text;
