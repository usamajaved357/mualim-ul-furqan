import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

/** Splits "2,000+" into its number (2000) and the text around it, so only the digits animate. */
function parseCount(
  value: string,
): { prefix: string; number: number; suffix: string; grouped: boolean } | null {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  if (!match) return null;
  const [, prefix = '', digits = '', suffix = ''] = match;
  return { prefix, number: Number(digits.replace(/,/g, '')), suffix, grouped: digits.includes(',') };
}

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Counts a number up from zero the first time it scrolls into view ("2,000+", "7+", "100+").
 * Values without digits (e.g. "1:1" is two numbers) are shown as they are.
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const parsed = parseCount(value);
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    if (!parsed || !inView || reducedMotion()) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setCurrent(Math.round(parsed.number * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // parsed is derived from value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration]);

  if (!parsed || value.includes(':')) return <span ref={ref}>{value}</span>;
  const shown = current ?? (inView || reducedMotion() ? parsed.number : 0);
  const text = parsed.grouped ? shown.toLocaleString('en-US') : String(shown);
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>
        {parsed.prefix}
        {text}
        {parsed.suffix}
      </span>
    </span>
  );
}
