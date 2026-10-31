import type { SegmentOption } from '@/components/ui';
import { COURSE_LABELS, type CourseId, type Learner, type Region } from '@/types/domain';

export const courseOptions: SegmentOption<CourseId>[] = (Object.keys(COURSE_LABELS) as CourseId[]).map(
  (id) => ({
    value: id,
    label: COURSE_LABELS[id],
  }),
);

/** Short Arabic name shown on each course tile. */
export const courseArabic: Record<CourseId, string> = {
  qaida: 'قَاعِدَة',
  nazra: 'نَاظِرَة',
  tajweed: 'تَجْوِيد',
  hifz: 'حِفْظ',
  duas: 'دُعَاء',
};

export const learnerOptions: SegmentOption<Learner>[] = [
  { value: 'child', label: 'My child' },
  { value: 'adult', label: 'Myself' },
];

export const regionOptions: SegmentOption<Region>[] = [
  { value: 'uk', label: 'UK' },
  { value: 'us', label: 'US' },
  { value: 'eu', label: 'Europe' },
];

/** Open teaching hours by region, matching server/schedule.ts (UK 4–9 PM weekdays, 10 AM–6 PM weekends). */
export const popularSlots: Record<Region, string> = {
  uk: 'Open: weekdays 4–9 PM, weekends 10 AM–6 PM (UK time)',
  us: 'Open: weekdays 11 AM–4 PM, weekends 5 AM–1 PM (Eastern)',
  eu: 'Open: weekdays 5–10 PM, weekends 11 AM–7 PM (CET)',
};
