import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';
import { SplitWords } from './SplitWords';

interface SectionHeadingProps {
  eyebrow?: string;
  /** Wrap the accent words in <em> to colour them (brand green, or gold on dark). */
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
  /** Use an <h2> by default; pass "h1" only for page titles. */
  as?: 'h1' | 'h2';
  className?: string;
}

/** Kicker, a heading that rises in word by word, and a short lead paragraph. */
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
        'flex flex-col gap-5',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone === 'dark' ? 'dark' : 'mint'}>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          'max-w-[860px] text-[clamp(36px,4.6vw,62px)] leading-[1.02] font-[480] text-balance',
          tone === 'dark' ? '[&_em]:text-gold text-white' : '[&_em]:text-brand',
        )}
      >
        <SplitWords>{title}</SplitWords>
      </Tag>
      {description && (
        <p
          className={cn(
            'max-w-[620px] text-[18px] text-pretty',
            tone === 'dark' ? 'text-mist' : 'text-muted',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
