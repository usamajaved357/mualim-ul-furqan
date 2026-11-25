import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

/**
 * True while a dark band (any element marked `data-dark`) sits behind the top `y` pixels of the window, so a
 * sticky header can switch to light text and dark glass. Uses an IntersectionObserver on a thin strip at that
 * height instead of hit-testing on every scroll frame. Re-scans when the route changes.
 */
export function useDarkBehind(y = 40) {
  const [dark, setDark] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // Not available in jsdom (tests); the bar simply stays light there.
    if (typeof IntersectionObserver === 'undefined') return;
    const visible = new Set<Element>();
    let observer: IntersectionObserver | null = null;
    let frame = 0;

    const observe = () => {
      observer?.disconnect();
      visible.clear();
      // A 2px strip at height `y`: everything above and below it is cut off by the negative margins.
      const bottom = Math.max(window.innerHeight - y - 2, 0);
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) visible.add(e.target);
            else visible.delete(e.target);
          }
          setDark(visible.size > 0);
        },
        { rootMargin: `-${y}px 0px -${bottom}px 0px` },
      );
      document.querySelectorAll('[data-dark]').forEach((el) => observer!.observe(el));
    };

    // After the route's content has rendered.
    frame = requestAnimationFrame(observe);
    window.addEventListener('resize', observe);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', observe);
      observer?.disconnect();
    };
  }, [y, pathname]);

  return dark;
}
