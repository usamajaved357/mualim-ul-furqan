import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Marks each page section and the footer `data-offscreen` while it is out of view; globals.css pauses every
 * animation inside, so looping decoration (aurora, rosettes, marquee) only runs where the visitor is looking.
 */
export function usePauseOffscreen() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.toggleAttribute('data-offscreen', !e.isIntersecting);
      },
      { rootMargin: '200px 0px' },
    );
    // After the route's content has rendered.
    const frame = requestAnimationFrame(() =>
      document.querySelectorAll('main > section, footer').forEach((el) => observer.observe(el)),
    );
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);
}
