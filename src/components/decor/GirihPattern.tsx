import { useId } from 'react';
import { cn } from '@/lib/cn';

/** Repeating Islamic geometric (girih) background. Fills its positioned parent. */
export function GirihPattern({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const id = useId();
  const stroke = tone === 'dark' ? '#E8CF94' : '#C9A24B';
  const opacity = tone === 'dark' ? 0.12 : 0.16;
  return (
    <svg aria-hidden className={cn('pointer-events-none absolute inset-0 size-full', className)}>
      <defs>
        <pattern id={id} width="80" height="80" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={stroke} strokeOpacity={opacity} strokeWidth="1">
            <rect x="22" y="22" width="36" height="36" />
            <polygon points="40,14.5 65.5,40 40,65.5 14.5,40" />
            <path d="M0 0L14.5 14.5M80 0L65.5 14.5M0 80L14.5 65.5M80 80L65.5 65.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
