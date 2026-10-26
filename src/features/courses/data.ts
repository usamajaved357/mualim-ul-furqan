import type { Audience, CourseId } from '@/types/domain';

export interface Course {
  id: CourseId;
  arabic: string;
  level: string;
  title: string;
  description: string;
  age: string;
}

export const courses: Record<Audience, Course[]> = {
  kids: [
    {
      id: 'qaida',
      arabic: 'القاعدة النورانية',
      level: 'Beginner',
      title: 'Noorani Qaida',
      description: 'Arabic letters, sounds, harakat and joining: the foundation for reading.',
      age: 'Ages 5+',
    },
    {
      id: 'nazra',
      arabic: 'ناظرة',
      level: 'Reading',
      title: 'Nazra',
      description: "Reading the Quran fluently and correctly, juz by juz, at your child's pace.",
      age: 'Ages 6+',
    },
    {
      id: 'tajweed',
      arabic: 'تجويد',
      level: 'Recitation',
      title: 'Tajweed',
      description: 'Makharij and the rules of recitation, practised ayah by ayah.',
      age: 'Ages 8+',
    },
    {
      id: 'duas',
      arabic: 'دُعَاء',
      level: 'Daily',
      title: 'Duas',
      description: 'Everyday masnoon duas memorised with their meaning in simple English.',
      age: 'Ages 5+',
    },
  ],
  adults: [
    {
      id: 'qaida',
      arabic: 'القاعدة النورانية',
      level: 'Start here',
      title: 'Read from zero',
      description: 'Never learned, or forgotten? Start from the letters, with no judgement.',
      age: 'Adults',
    },
    {
      id: 'nazra',
      arabic: 'ناظرة',
      level: 'Fluency',
      title: 'Nazra for adults',
      description: 'Build smooth, confident reading at a pace that fits work and family.',
      age: 'Adults',
    },
    {
      id: 'tajweed',
      arabic: 'تجويد',
      level: 'Recitation',
      title: 'Tajweed for adults',
      description: 'Fix long-held mistakes and recite with correct makharij and rules.',
      age: 'Adults',
    },
    {
      id: 'duas',
      arabic: 'دُعَاء',
      level: 'Daily',
      title: 'Duas & meaning',
      description: 'Learn the duas of the Sunnah with meaning, for daily life and salah.',
      age: 'Adults',
    },
  ],
};
