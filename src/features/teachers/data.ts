import { site } from '@/config/site';
import type { Rating } from '@/types/domain';

export interface Teacher {
  name: string;
  role: string;
  bio: string;
  /** Hidden on the card while null. */
  rating: Rating | null;
  years: number;
  students: string;
  subjects: string[];
  languages: string;
  availability: string[];
  acceptingStudents: boolean;
  /** Path to a photo in /public, e.g. "/teachers/qari.jpg". */
  photo?: string;
  /** Recitation sample (audio/video URL). The play button stays hidden until this is set. */
  recitation?: string;
}

export const leadTeacher: Teacher = {
  name: site.teacher.name,
  role: site.teacher.role,
  bio: `${site.teacher.name} brings ${site.teacher.yearsTeaching} years of teaching experience with children and adults, and also teaches at ${site.teacher.mosque}. Families love his calm, patient style: he never rushes, celebrates every small win, and makes sure each letter is pronounced correctly from day one.`,
  rating: site.rating,
  years: site.teacher.yearsTeaching,
  students: site.teacher.studentsTaught,
  subjects: ['Tajweed', 'Nazra', 'Hifz', 'Noorani Qaida', 'Duas'],
  languages: site.teacher.languages,
  availability: ['Mon–Fri · 4–9 PM', 'Sat–Sun · 10 AM–6 PM'],
  acceptingStudents: true,
  photo: site.teacher.photo,
};
