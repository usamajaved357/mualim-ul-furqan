import { cn } from '@/lib/cn';

/** Slowly rotating eight-fold star rosette, used as a decorative accent. */
export function Rosette({
  className,
  opacity = 0.18,
  reverse = false,
}: {
  className?: string;
  opacity?: number;
  /** Turn the other way (for a second, nested rosette). */
  reverse?: boolean;
}) {
  return (
    <svg
      viewBox="-120 -120 240 240"
      aria-hidden
      className={cn(
        'pointer-events-none absolute',
        reverse ? 'animate-spin-reverse' : 'animate-spin-slow',
        className,
      )}
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
