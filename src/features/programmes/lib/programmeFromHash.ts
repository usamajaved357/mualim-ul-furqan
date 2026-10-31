import type { CourseId } from '@/types/domain';

/** The programme named in a URL hash ("#tajweed" → "tajweed"), or null if the hash is not a programme. */
export function programmeFromHash(hash: string, ids: readonly CourseId[]): CourseId | null {
  const id = decodeURIComponent(hash.replace(/^#/, '')).trim().toLowerCase();
  return (ids as readonly string[]).includes(id) ? (id as CourseId) : null;
}
