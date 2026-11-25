import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';

const tones = {
  mint: 'text-brand',
  sand: 'text-bronze',
  dark: 'text-gold',
} as const;

/** Small eight-pointed star, the Rub el Hizb ornament used across the site. */
export function StarGlyph({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className={cn('fill-current', className)}
      style={style}
    >
      <rect x="6" y="6" width="12" height="12" />
      <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
    </svg>
  );
}

/**
 * Section kicker: small-caps label between two hairlines with a star, like a manuscript rubric.
 * Lighter than a pill badge, so headings stay calm.
 */
export function Eyebrow({
  children,
  tone = 'mint',
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-2.5 text-[11.5px] font-bold tracking-[0.12em] uppercase sm:text-[12.5px] sm:tracking-[0.18em]',
        tones[tone],
        className,
      )}
    >
      <StarGlyph className="size-3 opacity-80" />
      {children}
      <span aria-hidden className="hidden h-px w-8 shrink-0 bg-current opacity-40 sm:block" />
    </span>
  );
}
