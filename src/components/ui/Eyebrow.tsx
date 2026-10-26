import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

const tones = {
  mint: 'bg-mint text-brand',
  sand: 'bg-sand text-earth',
  dark: 'bg-gold/15 text-gold',
} as const;

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
        'inline-flex w-fit rounded-full px-3.5 py-1.5 text-[13px] font-extrabold tracking-[0.1em] uppercase',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
