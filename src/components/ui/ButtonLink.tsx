import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { track, type TrackedEvent } from '@/lib/analytics';
import { Icon, type IconName } from './Icon';

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-dark hover:shadow-[0_14px_26px_-12px_rgb(11_93_75/0.55)]',
  gold: 'bg-gold text-night hover:shadow-[0_14px_26px_-12px_rgb(201_162_75/0.7)]',
  dark: 'bg-night text-gold hover:shadow-[0_14px_26px_-12px_rgb(10_42_36/0.6)]',
  outline: 'border-[1.5px] border-brand text-brand hover:bg-mint',
  soft: 'border-[1.5px] border-sage text-brand hover:bg-mint',
  ghostDark: 'border-[1.5px] border-white/35 text-cream hover:bg-white/5',
  whatsapp: 'bg-whatsapp text-white hover:shadow-[0_14px_26px_-12px_rgb(31_143_95/0.6)]',
} as const;

const sizes = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-12 px-5 text-[15px]',
  lg: 'min-h-[52px] px-6 text-base',
} as const;

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  iconLeft?: IconName;
  iconRight?: IconName;
  /** Meta Pixel event to fire on click. */
  trackAs?: TrackedEvent;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  trackAs,
  className,
  children,
  onClick,
  ...rest
}: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={(event) => {
        if (trackAs) track(trackAs);
        onClick?.(event);
      }}
      className={cn(
        'inline-flex items-center justify-center gap-2.5 rounded-xl font-bold no-underline transition duration-200 hover:-translate-y-0.5',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size={20} />}
      {children}
      {iconRight && <Icon name={iconRight} size={18} strokeWidth={2.2} />}
    </a>
  );
}
