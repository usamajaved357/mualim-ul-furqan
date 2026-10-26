/** Shared domain types used across features. */
export type CourseId = 'qaida' | 'nazra' | 'tajweed' | 'duas';
export type Learner = 'child' | 'adult';
export type Audience = 'kids' | 'adults';
export type Region = 'uk' | 'us' | 'eu';
export type CurrencyCode = 'USD' | 'GBP' | 'EUR';

export const COURSE_LABELS: Record<CourseId, string> = {
  qaida: 'Noorani Qaida',
  nazra: 'Nazra',
  tajweed: 'Tajweed',
  duas: 'Duas',
};
