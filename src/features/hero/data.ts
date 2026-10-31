import type { SegmentOption } from '@/components/ui';
import { COURSE_LABELS, type CourseId, type Learner } from '@/types/domain';

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
