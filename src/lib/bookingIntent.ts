import type { CourseId, Learner } from '@/types/domain';

/**
 * What the visitor picked elsewhere on the page (e.g. the hero trial finder), so the booking form can
 * start pre-filled. A tiny external store: features share it through lib/ without importing each other.
 */
export interface BookingIntent {
  course: CourseId;
  learner: Learner;
}

let intent: BookingIntent | null = null;
const listeners = new Set<() => void>();

export function setBookingIntent(next: BookingIntent): void {
  intent = next;
  listeners.forEach((l) => l());
}

export function getBookingIntent(): BookingIntent | null {
  return intent;
}

export function subscribeBookingIntent(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
