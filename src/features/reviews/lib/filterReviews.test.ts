import { reviews } from '../data';
import { filterReviews, initialOf } from './filterReviews';

describe('filterReviews', () => {
  it('returns everything for "all"', () => {
    expect(filterReviews(reviews, 'all')).toHaveLength(reviews.length);
  });

  it('filters by reviewer type', () => {
    const adults = filterReviews(reviews, 'adult');
    expect(adults.length).toBeGreaterThan(0);
    expect(adults.every((r) => r.type === 'adult')).toBe(true);
  });

  it('derives an initial', () => {
    expect(initialOf('Aisha Khan')).toBe('A');
    expect(initialOf('[Parent name]')).toBe('P');
    expect(initialOf('')).toBe('?');
  });
});
