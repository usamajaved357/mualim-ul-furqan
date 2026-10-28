import type { Review } from '../data';
import { filterReviews, initialOf } from './filterReviews';

const review = (id: string, type: Review['type']): Review => ({
  id,
  type,
  course: 'Nazra',
  text: 'Test review',
  name: 'Test name',
  detail: 'Test detail',
  region: 'UK',
});

const fixtures = [review('a', 'parent'), review('b', 'adult'), review('c', 'parent')];

describe('filterReviews', () => {
  it('returns everything for "all"', () => {
    expect(filterReviews(fixtures, 'all')).toHaveLength(3);
  });

  it('filters by reviewer type', () => {
    expect(filterReviews(fixtures, 'adult').map((r) => r.id)).toEqual(['b']);
    expect(filterReviews(fixtures, 'parent').map((r) => r.id)).toEqual(['a', 'c']);
  });

  it('derives an initial', () => {
    expect(initialOf('Aisha Khan')).toBe('A');
    expect(initialOf('[Parent name]')).toBe('P');
    expect(initialOf('')).toBe('?');
  });
});
