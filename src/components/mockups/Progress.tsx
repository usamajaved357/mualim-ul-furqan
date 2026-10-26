import { cn } from '@/lib/cn';

const CIRCUMFERENCE = 2 * Math.PI * 35;

/** Circular progress ring (0–1). */
export function ProgressRing({
  value,
  label,
  size = 120,
  color = 'var(--color-brand)',
}: {
  value: number;
  label: string;
  size?: number;
  color?: string;
}) {
  const offset = CIRCUMFERENCE * (1 - Math.min(Math.max(value, 0), 1));
  return (
    <svg viewBox="0 0 90 90" width={size} height={size} role="img" aria-label={label}>
      <circle cx="45" cy="45" r="35" fill="none" stroke="var(--color-line)" strokeWidth="10" />
      <circle
        cx="45"
        cy="45"
        r="35"
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform="rotate(-90 45 45)"
      />
      <text x="45" y="51" textAnchor="middle" fontWeight="800" fontSize="18" fill="var(--color-ink)">
        {label}
      </text>
    </svg>
  );
}

/** Horizontal progress bar (0–1) with an animated fill. */
export function ProgressBar({
  value,
  tone = 'gold',
  className,
}: {
  value: number;
  tone?: 'gold' | 'brand' | 'amber';
  className?: string;
}) {
  const fill = { gold: 'bg-gold-deep', brand: 'bg-brand', amber: 'bg-amber' }[tone];
  return (
    <div className={cn('h-3 overflow-hidden rounded-full bg-[#f3ecdd]', className)}>
      <div
        className={cn('origin-left-bar animate-grow-x h-full rounded-full', fill)}
        style={{ width: `${Math.round(Math.min(Math.max(value, 0), 1) * 100)}%` }}
      />
    </div>
  );
}
