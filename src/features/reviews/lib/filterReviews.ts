import type { Review, ReviewFilter } from '../data';

export function filterReviews(list: readonly Review[], filter: ReviewFilter): Review[] {
  return filter === 'all' ? [...list] : list.filter((r) => r.type === filter);
}

/** First letter of a name for the avatar; brackets are ignored for placeholders. */
export function initialOf(name: string): string {
  return name.replace(/[[\]]/g, '').trim().charAt(0).toUpperCase() || '?';
}
