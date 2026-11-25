import { cn } from '@/lib/cn';
import { Icon, type IconName } from './Icon';

const tones = {
  /** Emerald disc on a soft mint star: for light cards. */
  emerald: {
    star: 'text-[#dcf2e7]',
    disc: 'bg-[linear-gradient(180deg,#14916c,#0a6a4f)] text-white ring-white',
  },
  /** Gold disc on a cream star: for light cards, as an accent. */
  gold: {
    star: 'text-[#fbe8c4]',
    disc: 'bg-[linear-gradient(180deg,#fbe2a6,#e3a94a)] text-abyss ring-white',
  },
  /** Gold disc on a faint star: for dark cards. */
  night: {
    star: 'text-white/[0.09]',
    disc: 'bg-[linear-gradient(180deg,#fbe2a6,#e3a94a)] text-abyss ring-[#0b2a21]',
  },
} as const;

/**
 * Icon set in a small seal: a disc on an eight-pointed star, the site's Rub el Hizb motif. Replaces plain
 * coloured circles so feature icons share one recognisable shape.
 */
export function IconSeal({
  icon,
  tone = 'emerald',
  className,
}: {
  icon: IconName;
  tone?: keyof typeof tones;
  className?: string;
}) {
  const t = tones[tone];
  return (
    <span aria-hidden className={cn('relative flex size-14 shrink-0 items-center justify-center', className)}>
      <svg viewBox="0 0 24 24" className={cn('absolute inset-0 size-full fill-current', t.star)}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
        <rect x="3.5" y="3.5" width="17" height="17" rx="2" transform="rotate(45 12 12)" />
      </svg>
      <span
        className={cn(
          'relative flex size-9 items-center justify-center rounded-full shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_6px_14px_-6px_rgb(4_21_15/0.6)] ring-2',
          t.disc,
        )}
      >
        <Icon name={icon} size={17} strokeWidth={2.1} />
      </span>
    </span>
  );
}
