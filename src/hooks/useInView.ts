import { useEffect, useRef, useState } from 'react';

const DEFAULT_OPTIONS: IntersectionObserverInit = { rootMargin: '0px 0px -10% 0px' };

/**
 * Returns a ref and whether the element has entered the viewport.
 * Once visible it stays visible (one-shot reveal).
 */
export function useInView<T extends Element>(options: IntersectionObserverInit = DEFAULT_OPTIONS) {
  const ref = useRef<T | null>(null);
  // Without IntersectionObserver (old browsers, tests) show content immediately.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, options]);

  return { ref, inView };
}
