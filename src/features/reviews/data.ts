/**
 * REVIEWS — publish only real, verifiable reviews from real families.
 * Every entry below is a placeholder to be replaced.
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

export const reviews: Review[] = [
  {
    id: 'r1',
    type: 'parent',
    course: 'Nazra',
    text: "[Real review from a parent: how their child's reading has improved]",
    name: '[Parent name]',
    detail: 'Parent of [child], age [X]',
    region: '[UK]',
  },
  {
    id: 'r2',
    type: 'parent',
    course: 'Tajweed',
    text: "[Real review: the timings, the teacher and the progress they've seen]",
    name: '[Parent name]',
    detail: 'Parent of two',
    region: '[USA]',
  },
  {
    id: 'r3',
    type: 'adult',
    course: 'Tajweed',
    text: '[Real review from an adult who started Tajweed later in life]',
    name: '[Student name]',
    detail: 'Adult student',
    region: '[CA]',
  },
  {
    id: 'r4',
    type: 'parent',
    course: 'Duas',
    text: '[Real review about the duas their child now recites at home]',
    name: '[Parent name]',
    detail: 'Parent of [child], age [X]',
    region: '[DE]',
  },
  {
    id: 'r5',
    type: 'adult',
    course: 'Nazra',
    text: '[Real review from a revert or adult beginner learning to read]',
    name: '[Student name]',
    detail: 'Adult beginner',
    region: '[UK]',
  },
  {
    id: 'r6',
    type: 'parent',
    course: 'Nazra',
    text: '[Real review about the progress report and parent sit-in]',
    name: '[Parent name]',
    detail: 'Parent of [child], age [X]',
    region: '[USA]',
  },
];

export const reviewFilters = [
  { value: 'all', label: 'All' },
  { value: 'parent', label: 'Parents' },
  { value: 'adult', label: 'Adult students' },
] as const;

export type ReviewFilter = (typeof reviewFilters)[number]['value'];

/** Star distribution for the rating summary (fractions of total). Update from your real reviews. */
export const ratingDistribution = [
  { stars: 5, share: 0.92 },
  { stars: 4, share: 0.06 },
  { stars: 3, share: 0.02 },
];

export const videoTestimonials = [
  { id: 'v1', title: '[Video review from a parent]', meta: '[City]', tone: 'bg-night' },
  { id: 'v2', title: '[Student recitation: before & after]', meta: '[Age]', tone: 'bg-brand' },
  { id: 'v3', title: '[Video review from an adult student]', meta: '', tone: 'bg-earth' },
];

export const milestones = [
  { name: '[Student], age [X]', milestone: '[Completed Noorani Qaida]' },
  { name: '[Student], age [X]', milestone: '[Finished first juz]' },
  { name: '[Student], age [X]', milestone: '[Memorised 20 duas]' },
  { name: '[Adult student]', milestone: '[Reading with Tajweed]' },
];
