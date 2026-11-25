import { useEffect, useRef } from 'react';

// matchMedia is missing in some environments (jsdom in tests): no pointer effects there.
const finePointer = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * One listener for the whole page: any element with the `spotlight` class gets `--mx`/`--my` set to the
 * pointer position inside it, which its CSS turns into a soft glow that follows the cursor.
 */
export function useSpotlight() {
  useEffect(() => {
    if (!finePointer()) return;
    let frame = 0;
    let event: PointerEvent | null = null;
    const update = () => {
      frame = 0;
      const target = (event?.target as Element | null)?.closest<HTMLElement>('.spotlight');
      if (!event || !target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      target.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      event = e;
      if (!frame) frame = requestAnimationFrame(update);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
}

/**
 * Gentle 3D tilt towards the pointer. Sets `--rx`/`--ry` (degrees) on the element; pair it with the `tilt`
 * utility. Does nothing on touch screens or with reduced motion.
 */
export function useTilt<T extends HTMLElement>(max = 6) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || !finePointer()) return;
    let frame = 0;
    const set = (rx: number, ry: number) => {
      node.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      node.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
    };
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = node.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        set(-y * max, x * max);
      });
    };
    const onLeave = () => set(0, 0);
    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [max]);
  return ref;
}
