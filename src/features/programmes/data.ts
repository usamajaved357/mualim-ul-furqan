import type { IconName } from '@/components/ui';
import { COURSE_LABELS, type CourseId } from '@/types/domain';

export interface ProgrammePart {
  /** Arabic term for this part of the lesson. */
  arabic: string;
  name: string;
  tag: string;
  body: string;
}

export interface Programme {
  id: CourseId;
  label: string;
  /** Short line above the title, e.g. "Start here". */
  eyebrow: string;
  /** Title is followed by the highlighted accent words. */
  title: string;
  accent: string;
  description: string;
  /** Large Arabic name beside the title. */
  arabic: string;
  facts: { icon: IconName; label: string }[];
  /** The three parts of every lesson. */
  method: ProgrammePart[];
  planIntro: string;
  plan: { title: string; detail: string }[];
  includes: string[];
  pace: string;
  /** Booking button label. */
  cta: string;
}

/** Order of the tabs. */
export const programmeOrder: CourseId[] = ['qaida', 'nazra', 'tajweed', 'hifz', 'duas'];

const weekly = (ages: string): Programme['facts'] => [
  { icon: 'calendar', label: '2–5 lessons a week' },
  { icon: 'clock', label: '30 minutes each' },
  { icon: 'users', label: ages },
];

const includes = (lessons: string): string[] => [
  lessons,
  'The same teacher for every lesson',
  'A monthly progress report',
  'Short practice tasks for home',
  'Parents are welcome to sit in on any lesson',
];

const pace =
  'How long does it take? Every learner moves at their own pace. After the free class you get a realistic plan and weekly target.';

export const programmes: Record<CourseId, Programme> = {
  qaida: {
    id: 'qaida',
    label: COURSE_LABELS.qaida,
    eyebrow: 'Start here',
    title: 'Learn to read Arabic,',
    accent: 'letter by letter',
    description:
      'The Noorani Qaida takes complete beginners from the alphabet to reading words from the Quran, step by step and with lots of encouragement.',
    arabic: 'الْقَاعِدَة النُّورَانِيَّة',
    facts: weekly('Ages 5+ and adults'),
    method: [
      {
        arabic: 'حُرُوف',
        name: 'Sounds',
        tag: 'New letters',
        body: "Each letter's sound from its correct point in the mouth, heard and repeated.",
      },
      {
        arabic: 'قِرَاءَة',
        name: 'Reading',
        tag: 'Read aloud',
        body: 'Joined letters and short words read to the teacher until they flow.',
      },
      {
        arabic: 'مُرَاجَعَة',
        name: 'Revision',
        tag: 'Recap',
        body: 'A quick recap of earlier lessons, so nothing slips.',
      },
    ],
    planIntro: 'The order of the Qaida. Your teacher sets the pace for each child.',
    plan: [
      { title: 'Free assessment', detail: 'We see what your child already knows and where to begin.' },
      { title: 'Single letters', detail: 'The Arabic letters, their shapes and their correct sounds.' },
      { title: 'Joined letters', detail: 'How letters change shape at the start, middle and end of a word.' },
      {
        title: 'Harakat and tanween',
        detail: 'Fatha, kasra and damma, tanween, then the long vowels (madd).',
      },
      {
        title: 'Sukoon and shaddah',
        detail: 'Stopping and doubling sounds: the last building blocks of reading.',
      },
      { title: 'Words from the Quran', detail: 'Reading real Quranic words, ready to move on to Nazra.' },
    ],
    includes: includes('Live one-on-one lessons, 30 minutes each'),
    pace,
    cta: 'Book a free Qaida class',
  },
  nazra: {
    id: 'nazra',
    label: COURSE_LABELS.nazra,
    eyebrow: 'Reading the Quran',
    title: 'Read the Quran',
    accent: 'fluently and correctly',
    description:
      'Reading directly from the mushaf, page by page, with correct pronunciation and the basic rules applied as you go.',
    arabic: 'نَاظِرَة',
    facts: weekly('Ages 6+ and adults'),
    method: [
      {
        arabic: 'قِرَاءَة',
        name: 'Read',
        tag: 'New page',
        body: 'New lines read aloud from the mushaf, with the teacher following every word.',
      },
      {
        arabic: 'تَصْحِيح',
        name: 'Correct',
        tag: 'On the spot',
        body: 'Mistakes in letters, vowels and lengths gently fixed straight away.',
      },
      {
        arabic: 'مُرَاجَعَة',
        name: 'Revise',
        tag: 'Fluency',
        body: 'Earlier pages re-read for speed, rhythm and confidence.',
      },
    ],
    planIntro: 'The route most readers follow. The weekly target fits your child.',
    plan: [
      {
        title: 'Free assessment',
        detail: 'Your child reads to the teacher, who notes what to work on first.',
      },
      { title: 'Short surahs', detail: 'Familiar surahs from Juz Amma to build confident reading.' },
      {
        title: 'Basic Tajweed while reading',
        detail: 'Madd, ghunnah and the stopping signs, applied as you read.',
      },
      { title: 'Al-Baqarah onwards', detail: 'Steady progress through the mushaf, page by page.' },
      { title: 'Fluency', detail: 'Smooth, accurate reading at a natural pace.' },
      {
        title: 'Completing the Quran',
        detail: 'A full reading of the Quran from cover to cover, in sha Allah.',
      },
    ],
    includes: includes('Live one-on-one lessons, 30 minutes each'),
    pace,
    cta: 'Book a free Nazra class',
  },
  tajweed: {
    id: 'tajweed',
    label: COURSE_LABELS.tajweed,
    eyebrow: 'Recitation',
    title: 'Recite beautifully,',
    accent: 'with the rules applied',
    description:
      'Makharij and the rules of recitation, practised ayah by ayah until they become natural. For learners who can already read the Quran.',
    arabic: 'تَجْوِيد',
    facts: weekly('Ages 8+ and adults'),
    method: [
      {
        arabic: 'مَخَارِج',
        name: 'Makharij',
        tag: 'Articulation',
        body: 'Where each letter is pronounced from, so every sound is exact.',
      },
      {
        arabic: 'أَحْكَام',
        name: 'Rules',
        tag: 'One at a time',
        body: 'One rule per step: what it is and how it sounds.',
      },
      {
        arabic: 'تَطْبِيق',
        name: 'Practice',
        tag: 'In real ayat',
        body: 'The rule applied in real ayat until it becomes automatic.',
      },
    ],
    planIntro: 'The rules in the order they are usually taught.',
    plan: [
      { title: 'Free assessment', detail: 'We listen to your recitation and note what to fix first.' },
      { title: 'Makharij and sifaat', detail: 'The articulation points and characteristics of the letters.' },
      { title: 'Noon sakinah and tanween', detail: 'Izhar, idgham, iqlab and ikhfa.' },
      { title: 'Meem sakinah and qalqalah', detail: 'Ghunnah, the meem rules and the echoing letters.' },
      { title: 'Madd', detail: 'The kinds of lengthening and how long to hold each one.' },
      { title: 'Stopping and starting', detail: 'The waqf signs, so recitation flows with the meaning.' },
    ],
    includes: includes('Live one-on-one lessons, 30 minutes each'),
    pace,
    cta: 'Book a free Tajweed class',
  },
  hifz: {
    id: 'hifz',
    label: COURSE_LABELS.hifz,
    eyebrow: 'Memorisation',
    title: 'Memorise the Quran,',
    accent: 'and keep it for life',
    description:
      'Daily one-on-one Hifz lessons. New memorisation and revision happen in every class, so what your child learns stays learned.',
    arabic: 'حِفْظُ الْقُرْآن',
    facts: [
      { icon: 'calendar', label: '5 lessons a week' },
      { icon: 'clock', label: '45 minutes each' },
      { icon: 'users', label: 'Ages 7+ and adults' },
    ],
    method: [
      {
        arabic: 'سَبَق',
        name: 'Sabaq',
        tag: 'New lesson',
        body: 'A few new lines each day, recited to the teacher until they are word-perfect.',
      },
      {
        arabic: 'سَبْقِي',
        name: 'Sabqi',
        tag: 'Recent revision',
        body: 'The last few days of lessons, repeated so the new memorisation settles in.',
      },
      {
        arabic: 'مَنْزِل',
        name: 'Manzil',
        tag: 'Long-term revision',
        body: 'A rotating portion of everything memorised so far, so nothing is forgotten.',
      },
    ],
    planIntro: 'The order most students follow. Your teacher adjusts the daily target as your child grows.',
    plan: [
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
    ],
    includes: [
      'Five live one-on-one lessons a week, 45 minutes each',
      'The same teacher for every lesson',
      'A monthly progress report: pages memorised and how firm the revision is',
      'A short daily home-revision routine for parents to follow',
      'Parents are welcome to sit in on any lesson',
    ],
    pace: 'How long does it take? That depends on age, daily time and revision at home. There is no race: after the free assessment you get a realistic pace for your child.',
    cta: 'Book a free Hifz assessment',
  },
  duas: {
    id: 'duas',
    label: COURSE_LABELS.duas,
    eyebrow: 'Everyday',
    title: 'Everyday duas,',
    accent: 'learned with meaning',
    description:
      'The masnoon duas for every part of the day, memorised with their meaning in simple English, so children understand what they say.',
    arabic: 'دُعَاء',
    facts: weekly('Ages 5+ and adults'),
    method: [
      {
        arabic: 'حِفْظ',
        name: 'Memorise',
        tag: 'By heart',
        body: 'One short dua at a time, repeated until it is known by heart.',
      },
      {
        arabic: 'مَعْنَى',
        name: 'Understand',
        tag: 'Meaning',
        body: 'What it means, explained in simple English.',
      },
      {
        arabic: 'عَمَل',
        name: 'Practise',
        tag: 'Daily habit',
        body: 'When to say it, so it becomes part of everyday life.',
      },
    ],
    planIntro: 'Duas grouped by the moments of the day, starting with the ones used most.',
    plan: [
      { title: 'Free assessment', detail: 'We check which duas your child already knows.' },
      { title: 'Morning and home', detail: 'Waking up, getting dressed, leaving and entering the home.' },
      { title: 'Eating and drinking', detail: 'Before and after meals.' },
      { title: 'Out and about', detail: 'Travelling, entering and leaving the masjid, and the toilet.' },
      { title: 'Before sleeping', detail: 'The bedtime duas and short surahs.' },
      { title: 'Duas in salah', detail: 'The duas said in and after the prayer, with their meaning.' },
    ],
    includes: includes('Live one-on-one lessons, 30 minutes each'),
    pace,
    cta: 'Book a free Duas class',
  },
};
