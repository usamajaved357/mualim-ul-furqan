import type { IconName } from '@/components/ui';

export const hifzFacts: { icon: IconName; label: string }[] = [
  { icon: 'calendar', label: '5 lessons a week' },
  { icon: 'clock', label: '45 minutes each' },
  { icon: 'users', label: 'Ages 7+ and adults' },
];

export interface HifzPart {
  /** Madrasa term in Arabic script. */
  arabic: string;
  name: string;
  tag: string;
  body: string;
  tint: { panel: string; ink: string };
}

/** The three parts of every Hifz lesson, using the sabaq / sabqi / manzil method common in UK madrasas. */
export const hifzMethod: HifzPart[] = [
  {
    arabic: 'سَبَق',
    name: 'Sabaq',
    tag: 'New lesson',
    body: 'A few new lines each day, recited to the teacher until they are word-perfect.',
    tint: { panel: 'bg-mint', ink: 'text-brand' },
  },
  {
    arabic: 'سَبْقِي',
    name: 'Sabqi',
    tag: 'Recent revision',
    body: 'The last few days of lessons, repeated so the new memorisation settles in.',
    tint: { panel: 'bg-sky', ink: 'text-sky-ink' },
  },
  {
    arabic: 'مَنْزِل',
    name: 'Manzil',
    tag: 'Long-term revision',
    body: 'A rotating portion of everything memorised so far, so nothing is forgotten.',
    tint: { panel: 'bg-lilac', ink: 'text-lilac-ink' },
  },
];

/** The route through the Quran, from the free assessment to completion. */
export const hifzPlan = [
  {
    title: 'Free assessment',
    detail: 'Your child reads to the teacher, and together you agree a realistic daily target.',
  },
  {
    title: 'Ready to memorise',
    detail:
      'Fluent Nazra and core Tajweed come first. Children who already read well start Hifz straight away.',
  },
  {
    title: 'Juz Amma (Juz 30)',
    detail: 'The short surahs, from An-Nas back to An-Naba, to build the daily habit and confidence.',
  },
  {
    title: 'Juz 29 and 28',
    detail: 'Longer surahs, starting with Al-Mulk, while the manzil grows alongside.',
  },
  {
    title: 'Al-Baqarah onwards',
    detail: 'Juz 1 to 27 at a steady pace, with each portion revised before moving on.',
  },
  {
    title: 'Completion and dawr',
    detail: 'Full revision cycles of the whole Quran until it is firm, in sha Allah.',
  },
];

export const hifzIncludes = [
  'Five live one-on-one lessons a week, 45 minutes each',
  'The same teacher for every lesson',
  'A monthly progress report: pages memorised and how firm the revision is',
  'A short daily home-revision routine for parents to follow',
  'Parents are welcome to sit in on any lesson',
];

export const hifzPace =
  'How long does it take? That depends on age, daily time and revision at home. There is no race: after the free assessment you get a realistic pace for your child.';
