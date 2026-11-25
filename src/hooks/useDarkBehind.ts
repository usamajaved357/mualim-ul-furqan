import { useEffect, useState } from 'react';

/**
 * True while the part of the page behind a fixed/sticky bar at height `y` is a dark band
 * (any element marked `data-dark`), so the bar can switch to light text and dark glass.
 */
export function useDarkBehind(y = 40) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Not available in jsdom (tests); the bar simply stays light there.
    if (typeof document.elementsFromPoint !== 'function') return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const below = document.elementsFromPoint(window.innerWidth / 2, y).find((el) => !el.closest('header'));
      setDark(Boolean(below?.closest('[data-dark]')));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [y]);

  return dark;
}
