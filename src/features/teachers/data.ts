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
}

export const leadTeacher: Teacher = {
  name: site.teacher.name,
  role: site.teacher.role,
  bio: `Teaches children at ${site.teacher.mosque}. Patient with young beginners and focused on correct makharij from day one.`,
  rating: site.rating,
  years: site.teacher.yearsTeaching,
  students: site.teacher.studentsTaught,
  subjects: ['Tajweed', 'Nazra', 'Noorani Qaida', 'Duas'],
  languages: site.teacher.languages,
  availability: ['Mon–Fri · 4–9 PM', 'Sat–Sun · 10 AM–6 PM'],
  acceptingStudents: true,
};
