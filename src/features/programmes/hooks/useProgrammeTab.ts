import { useCallback, useEffect, useState } from 'react';
import type { CourseId } from '@/types/domain';
import { programmeFromHash } from '../lib/programmeFromHash';

/**
 * Selected programme tab, kept in step with the URL hash: links such as /#tajweed (header menu, footer)
 * open that tab, and choosing a tab updates the hash without scrolling.
 */
export function useProgrammeTab(ids: readonly CourseId[], fallback: CourseId) {
  const [active, setActive] = useState<CourseId>(
    () => programmeFromHash(window.location.hash, ids) ?? fallback,
  );

  useEffect(() => {
    const onHashChange = () => {
      const id = programmeFromHash(window.location.hash, ids);
      if (id) setActive(id);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [ids]);

  const select = useCallback((id: CourseId) => {
    setActive(id);
    window.history.replaceState(null, '', `#${id}`);
  }, []);

  return [active, select] as const;
}
