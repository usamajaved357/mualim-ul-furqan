import { site } from '@/config/site';

/**
 * REVIEWS: only real reviews from real families, in their own words and with their permission.
 * While this list is empty the section shows the track record below instead. Example entry:
 *
 *   { id: 'r1', type: 'parent', course: 'Nazra', text: '<their words>', name: '<first name>',
 *     detail: 'Parent of <child>, age <X>', region: 'UK' }
 */
export type ReviewerType = 'parent' | 'adult';

export interface Review {
  id: string;
  type: ReviewerType;
  course: string;
  text: string;
  name: string;
  detail: string;
  region: string;
}

export const reviews: Review[] = [];

export const reviewFilters = [
  { value: 'all', label: 'All' },
  { value: 'parent', label: 'Parents' },
  { value: 'adult', label: 'Adult students' },
] as const;

export type ReviewFilter = (typeof reviewFilters)[number]['value'];

/** Star distribution for the rating summary (fractions of total), from your real reviews. */
export const ratingDistribution: { stars: number; share: number }[] = [];

export interface Milestone {
  name: string;
  milestone: string;
}

/** Real student achievements, e.g. { name: 'Yusuf, age 8', milestone: 'Completed Noorani Qaida' }. Hidden while empty. */
export const milestones: Milestone[] = [];

/** Shown instead of review cards until real reviews are added. Numbers live in config/site.ts. */
export const trackRecord = [
  { value: `${site.teacher.yearsTeaching} years`, label: 'teaching the Quran' },
  { value: site.teacher.studentsTaught, label: 'students taught' },
  { value: site.teacher.lecturesDelivered, label: 'lectures delivered' },
  { value: site.families, label: 'families who trust us' },
];

/** What a parent can check for themselves in the free trial. Only promises the site already makes. */
export const trialChecks = [
  'One-on-one and live on Google Meet: just your child and the teacher',
  'Patient correction of pronunciation (makharij) from the first lesson',
  'Parents are welcome to sit in and watch',
  'No card needed. You only pay if you choose a plan',
];
