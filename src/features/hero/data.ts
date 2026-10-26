import type { SegmentOption } from '@/components/ui';
import { COURSE_LABELS, type CourseId, type Learner, type Region } from '@/types/domain';

export const courseOptions: SegmentOption<CourseId>[] = (Object.keys(COURSE_LABELS) as CourseId[]).map(
  (id) => ({
    value: id,
    label: COURSE_LABELS[id],
  }),
);

export const learnerOptions: SegmentOption<Learner>[] = [
  { value: 'child', label: 'My child' },
  { value: 'adult', label: 'Myself' },
];

export const regionOptions: SegmentOption<Region>[] = [
  { value: 'uk', label: 'UK' },
  { value: 'us', label: 'USA' },
  { value: 'eu', label: 'Europe' },
];

/** Typical teaching hours by region. Replace with your real availability. */
export const popularSlots: Record<Region, string> = {
  uk: 'Popular slots: weekdays 4–8 PM, weekends 10 AM–6 PM (UK time)',
  us: 'Popular slots: weekdays 4–8 PM Eastern, weekend mornings',
  eu: 'Popular slots: weekdays 5–9 PM CET, weekends 11 AM–7 PM',
};
