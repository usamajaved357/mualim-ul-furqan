import { cn } from '@/lib/cn';

const colors = {
  mint: 'rgb(25 162 122 / 0.28)',
  saffron: 'rgb(242 169 59 / 0.3)',
  sky: 'rgb(36 87 166 / 0.16)',
  lilac: 'rgb(91 63 176 / 0.16)',
} as const;

/** Soft blurred colour blob for backgrounds. Position it with className. */
export function Glow({ color = 'mint', className }: { color?: keyof typeof colors; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('pointer-events-none absolute rounded-full blur-3xl', className)}
      style={{ background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)` }}
    />
  );
}
