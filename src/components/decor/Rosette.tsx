import { cn } from '@/lib/cn';

/** Slowly rotating eight-fold star rosette, used as a decorative accent. */
export function Rosette({ className, opacity = 0.18 }: { className?: string; opacity?: number }) {
  return (
    <svg
      viewBox="-120 -120 240 240"
      aria-hidden
      className={cn('animate-spin-slow pointer-events-none absolute', className)}
    >
      <g fill="none" stroke="#E8CF94" strokeOpacity={opacity} strokeWidth="0.7">
        <circle r="113" />
        {[0, 22.5, 45, 67.5].map((deg) => (
          <rect key={deg} x="-80" y="-80" width="160" height="160" transform={`rotate(${deg})`} />
        ))}
        <circle r="56" />
      </g>
    </svg>
  );
}
