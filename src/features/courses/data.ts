import type { Audience, CourseId } from '@/types/domain';

export interface Course {
  id: CourseId;
  arabic: string;
  level: string;
  title: string;
  description: string;
  /** What the learner can do by the end. */
  outcome: string;
  age: string;
}

/** Card colour per course: soft tint for the Arabic panel, plus its ink colour. */
export const courseTints: Record<CourseId, { panel: string; ink: string }> = {
  qaida: { panel: 'bg-mint', ink: 'text-brand' },
  nazra: { panel: 'bg-sand', ink: 'text-bronze' },
  tajweed: { panel: 'bg-sky', ink: 'text-sky-ink' },
  duas: { panel: 'bg-lilac', ink: 'text-lilac-ink' },
};

export const courses: Record<Audience, Course[]> = {
  kids: [
    {
      id: 'qaida',
      arabic: 'القاعدة النورانية',
      level: 'Start here',
      title: 'Noorani Qaida',
      description: 'Letters, sounds and joining, taught step by step with lots of praise along the way.',
      outcome: 'Reads joined Arabic words with confidence',
      age: 'Ages 5+',
    },
    {
      id: 'nazra',
      arabic: 'ناظرة',
      level: 'Reading',
      title: 'Nazra',
      description: 'Reading the Quran fluently and correctly, page by page, at a pace that suits your child.',
      outcome: 'Reads directly from the mushaf, unaided',
      age: 'Ages 6+',
    },
    {
      id: 'tajweed',
      arabic: 'تجويد',
      level: 'Recitation',
      title: 'Tajweed',
      description: 'Makharij and the rules of recitation, practised ayah by ayah until they become natural.',
      outcome: 'Recites beautifully, with the rules applied',
      age: 'Ages 8+',
    },
    {
      id: 'duas',
      arabic: 'دُعَاء',
      level: 'Everyday',
      title: 'Duas',
      description:
        'The masnoon duas for every part of the day, memorised with their meaning in simple English.',
      outcome: 'Knows the daily duas by heart, with meaning',
      age: 'Ages 5+',
    },
  ],
  adults: [
    {
      id: 'qaida',
      arabic: 'القاعدة النورانية',
      level: 'Start here',
      title: 'Read from zero',
      description:
        'Never learned, or forgotten over the years? Start from the letters, privately and without judgement.',
      outcome: 'Reads Arabic script on your own',
      age: 'Adults',
    },
    {
      id: 'nazra',
      arabic: 'ناظرة',
      level: 'Fluency',
      title: 'Nazra for adults',
      description: 'Build smooth, confident reading in short lessons that fit around work and family.',
      outcome: 'Reads the Quran fluently, at your own pace',
      age: 'Adults',
    },
    {
      id: 'tajweed',
      arabic: 'تجويد',
      level: 'Recitation',
      title: 'Tajweed for adults',
      description:
        'Fix long-held mistakes and recite with the correct makharij and rules, one ayah at a time.',
      outcome: 'Recites with confidence in salah',
      age: 'Adults',
    },
    {
      id: 'duas',
      arabic: 'دُعَاء',
      level: 'Everyday',
      title: 'Duas & meaning',
      description: 'Learn the duas of the Sunnah with their meaning, for daily life and for salah.',
      outcome: 'Makes dua with understanding',
      age: 'Adults',
    },
  ],
};
