import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  /** Wrap the accent words in <em> to set them in the italic serif. */
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
  /** Use an <h2> by default; pass "h1" only for page titles. */
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
  as: Tag = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone === 'dark' ? 'dark' : 'mint'}>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          'max-w-[820px] text-[clamp(34px,4.4vw,58px)] leading-[1.04] text-balance',
          tone === 'dark' ? '[&_em]:text-gold' : '[&_em]:text-brand',
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            'max-w-[640px] text-[18px] text-pretty',
            tone === 'dark' ? 'text-mist' : 'text-muted',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
