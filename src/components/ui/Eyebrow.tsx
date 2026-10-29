import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

const tones = {
  mint: 'border-sage bg-white text-brand',
  sand: 'border-[#f6dfb3] bg-white text-bronze',
  dark: 'border-white/20 bg-white/10 text-gold',
} as const;

const dots = { mint: 'bg-brand-light', sand: 'bg-gold-deep', dark: 'bg-gold' } as const;

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
        'inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-bold',
        tones[tone],
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', dots[tone])} aria-hidden />
      {children}
    </span>
  );
}
