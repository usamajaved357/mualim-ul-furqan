import { openingHours } from '@/config/hours';
import { describeHours, timeZoneCity } from '@/lib/timezone';
import { COURSE_LABELS, type CourseId, type Learner } from '@/types/domain';

export interface TrialSelection {
  course: CourseId;
  learner: Learner;
}

export function trialSummary({ course, learner }: TrialSelection): string {
  const who = learner === 'child' ? 'for your child' : 'for you';
  return `Free 30-min ${COURSE_LABELS[course]} trial ${who}`;
}

/** The teacher's opening hours converted to the visitor's own time zone. */
export function trialSlots(timeZone: string, now: Date): string {
  return `Open ${describeHours(openingHours, timeZone, now)} (your time)`;
}

/** Pre-filled WhatsApp message so the teacher knows what the family chose and their time zone. */
export function trialMessage({ course, learner }: TrialSelection, timeZone: string): string {
  const who = learner === 'child' ? 'my child' : 'myself';
  return `Assalamu alaikum, I'd like a free ${COURSE_LABELS[course]} trial class for ${who} (${timeZoneCity(timeZone)} time).`;
}
