import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/cn';
import { track, type TrackedEvent } from '@/lib/analytics';
import { Icon, type IconName } from './Icon';

/** Every solid button has a soft top rim and a light sweep on hover (`shine`), like Apple's glossy controls. */
const variants = {
  primary:
    'shine bg-[linear-gradient(180deg,#14916c,#0a6a4f)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.28),inset_0_-1px_0_rgb(0_0_0/0.12),0_12px_28px_-14px_rgb(12_122_91/0.85)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.32),0_18px_36px_-14px_rgb(12_122_91/0.9)]',
  dark: 'shine bg-ink text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_10px_24px_-12px_rgb(15_31_26/0.6)] hover:bg-night',
  gold: 'shine bg-[linear-gradient(180deg,#fbe2a6,#e9b45a)] text-abyss shadow-[inset_0_1px_0_rgb(255_255_255/0.7),inset_0_-1px_0_rgb(154_91_7/0.25),0_14px_32px_-14px_rgb(229_154_31/0.85)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.8),0_20px_40px_-14px_rgb(229_154_31/0.95)]',
  outline: 'glass text-ink hover:bg-white',
  soft: 'bg-mint text-brand hover:bg-sage',
  ghostDark: 'glass-dark text-white hover:bg-white/15',
  whatsapp:
    'shine bg-whatsapp text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_10px_24px_-12px_rgb(31_143_95/0.7)] hover:brightness-110',
} as const;

const sizes = {
  sm: 'min-h-10 px-4.5 text-sm',
  md: 'min-h-11 px-5 text-[15px]',
  lg: 'min-h-13 px-6.5 text-[15.5px]',
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
  // Routes inside the app (e.g. /book) navigate client-side, so in-page state such as the course picked in the
  // hero carries over. Section links (/#pricing) stay plain anchors so the browser scrolls to them.
  const route = href.startsWith('/') && !href.includes('#');
  const props = {
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      if (trackAs) track(trackAs);
      onClick?.(event);
    },
    className: cn(
      'group/button inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap no-underline transition duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
      variants[variant],
      sizes[size],
      className,
    ),
    ...rest,
  };
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={19} />}
      {children}
      {iconRight && (
        <Icon
          name={iconRight}
          size={17}
          strokeWidth={2.2}
          className="transition-transform duration-300 group-hover/button:translate-x-1"
        />
      )}
    </>
  );
  if (route) {
    return (
      <Link to={href} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {content}
    </a>
  );
}
