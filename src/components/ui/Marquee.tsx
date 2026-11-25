import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  'aria-label'?: string;
}

/**
 * Endless horizontal ribbon. The content is rendered twice and the track slides by exactly one copy, so the
 * loop is seamless. Pauses on hover; stands still with reduced motion. The copy is hidden from screen readers.
 */
export function Marquee({ children, duration = 40, reverse, className, ...rest }: MarqueeProps) {
  return (
    <div
      className={cn(
        'group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
      {...rest}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1 || undefined}
          className={cn(
            'animate-marquee flex shrink-0 items-center group-hover:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]',
          )}
          style={{ animationDuration: `${duration}s` }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
