import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { GirihPattern } from '@/components/decor/GirihPattern';
import { Container } from './Container';

const tones = {
  white: 'bg-white text-ink',
  parchment: 'bg-parchment text-ink',
  sand: 'bg-sand text-ink',
  night: 'bg-night text-cream',
} as const;

interface SectionProps {
  id?: string;
  tone?: keyof typeof tones;
  pattern?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  'aria-label'?: string;
}

/** Page section with consistent vertical rhythm, background tone and optional Islamic pattern. */
export function Section({
  id,
  tone = 'parchment',
  pattern = false,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section id={id} className={cn('relative overflow-hidden', tones[tone], className)} {...rest}>
      {pattern && <GirihPattern tone={tone === 'night' ? 'dark' : 'light'} />}
      <Container className={cn('relative py-20 sm:py-28', containerClassName)}>{children}</Container>
    </section>
  );
}
