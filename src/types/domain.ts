/** Shared domain types used across features. */
export type CourseId = 'qaida' | 'nazra' | 'tajweed' | 'hifz' | 'duas';
export type Learner = 'child' | 'adult';
export type Audience = 'kids' | 'adults';
export type Region = 'uk' | 'us' | 'eu';
export type CurrencyCode = 'USD' | 'GBP' | 'EUR';

/** Average rating from a real review source (e.g. Google), shown as stars + "N reviews". */
export interface Rating {
  score: string;
  count: string;
}

export const COURSE_LABELS: Record<CourseId, string> = {
  qaida: 'Noorani Qaida',
  nazra: 'Nazra',
  tajweed: 'Tajweed',
  hifz: 'Hifz',
  duas: 'Duas',
};

/** Short Arabic name for each course (course tiles, menus, tabs). */
export const COURSE_ARABIC: Record<CourseId, string> = {
  qaida: 'قَاعِدَة',
  nazra: 'نَاظِرَة',
  tajweed: 'تَجْوِيد',
  hifz: 'حِفْظ',
  duas: 'دُعَاء',
};
