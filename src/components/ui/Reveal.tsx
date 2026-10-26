import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';

interface RevealProps {
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** Fades content up the first time it scrolls into view. */
export function Reveal({ as: Tag = 'div', delay = 0, className, style, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={cn('reveal', inView && 'is-visible', className)}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
