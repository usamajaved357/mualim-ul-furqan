import { useEffect, useState } from 'react';

/**
 * True while the page is being scrolled down (past `offset`), false when scrolling up or near the top.
 * Small movements under `threshold` px are ignored so the header doesn't flicker.
 */
export function useHideOnScroll({ offset = 120, threshold = 8 } = {}) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < offset) setHidden(false);
      else if (Math.abs(y - last) >= threshold) setHidden(y > last);
      if (Math.abs(y - last) >= threshold || y < offset) last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [offset, threshold]);

  return { hidden, scrolled };
}
