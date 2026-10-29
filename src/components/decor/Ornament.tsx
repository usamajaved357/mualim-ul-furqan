import { cn } from '@/lib/cn';

/** Small divider: two fading rules either side of an eight-point star. */
export function Ornament({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const color = tone === 'dark' ? 'var(--color-gold)' : 'var(--color-gold-deep)';
  return (
    <span aria-hidden className={cn('flex items-center gap-2.5', className)}>
      <span className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${color})` }} />
      <svg viewBox="-12 -12 24 24" width="16" height="16">
        <g fill={color}>
          <rect x="-6" y="-6" width="12" height="12" />
          <rect x="-6" y="-6" width="12" height="12" transform="rotate(45)" />
        </g>
        <circle r="2.6" fill={tone === 'dark' ? 'var(--color-night)' : '#fff'} />
      </svg>
      <span className="h-px w-12" style={{ background: `linear-gradient(270deg, transparent, ${color})` }} />
    </span>
  );
}
