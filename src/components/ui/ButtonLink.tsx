import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { track, type TrackedEvent } from '@/lib/analytics';
import { Icon, type IconName } from './Icon';

const variants = {
  primary:
    'bg-brand text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_10px_24px_-12px_rgb(12_122_91/0.7)] hover:bg-brand-dark',
  dark: 'bg-ink text-white shadow-[0_10px_24px_-12px_rgb(15_31_26/0.6)] hover:bg-night',
  gold: 'bg-gold-deep text-white shadow-[0_10px_24px_-12px_rgb(229_154_31/0.8)] hover:bg-[#d48a12]',
  outline: 'border border-ink/15 bg-white text-ink hover:border-ink/30',
  soft: 'bg-mint text-brand hover:bg-sage',
  ghostDark: 'border border-white/25 text-white hover:bg-white/10',
  whatsapp: 'bg-whatsapp text-white shadow-[0_10px_24px_-12px_rgb(31_143_95/0.7)] hover:brightness-110',
} as const;

const sizes = {
  sm: 'min-h-10 px-4.5 text-sm',
  md: 'min-h-12 px-5.5 text-[15px]',
  lg: 'min-h-14 px-7 text-base',
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
        'inline-flex items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap no-underline transition duration-200 hover:-translate-y-0.5',
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
