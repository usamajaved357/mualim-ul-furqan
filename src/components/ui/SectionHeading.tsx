import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
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
        'flex flex-col gap-3.5',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow
          tone={tone === 'dark' ? 'dark' : 'mint'}
          className={align === 'center' ? 'self-center' : undefined}
        >
          {eyebrow}
        </Eyebrow>
      )}
      <Tag className="max-w-[780px] text-[clamp(32px,3.8vw,52px)] leading-[1.08] font-extrabold tracking-[-0.035em]">
        {title}
      </Tag>
      {description && (
        <p className={cn('max-w-[620px]', tone === 'dark' ? 'text-mist' : 'text-muted')}>{description}</p>
      )}
    </Reveal>
  );
}
