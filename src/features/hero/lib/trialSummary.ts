import { COURSE_LABELS, type CourseId, type Learner, type Region } from '@/types/domain';
import { popularSlots } from '../data';

export interface TrialSelection {
  course: CourseId;
  learner: Learner;
  region: Region;
}

export function trialSummary({ course, learner }: TrialSelection): string {
  const who = learner === 'child' ? 'for your child' : 'for you';
  return `Free 30-min ${COURSE_LABELS[course]} trial ${who}`;
}

export function trialSlots({ region }: TrialSelection): string {
  return popularSlots[region];
}

/** Pre-filled WhatsApp message so the teacher knows what the family chose. */
export function trialMessage({ course, learner, region }: TrialSelection): string {
  const who = learner === 'child' ? 'my child' : 'myself';
  return `Assalamu alaikum, I'd like a free ${COURSE_LABELS[course]} trial class for ${who} (${region.toUpperCase()}).`;
}
