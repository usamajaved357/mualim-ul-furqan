import { cn } from '@/lib/cn';
import { site } from '@/config/site';
import { LogoMark } from './LogoMark';

interface LogoProps {
  tone?: 'light' | 'dark';
  size?: 'md' | 'lg';
  className?: string;
}

/** Horizontal lockup: mark + Diwani Arabic name + Latin name. */
export function Logo({ tone = 'light', size = 'md', className }: LogoProps) {
  const dark = tone === 'dark';
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <LogoMark size={size === 'lg' ? 52 : 46} />
      <span className="flex flex-col leading-none">
        <span
          lang="ar"
          dir="rtl"
          className={cn(
            'font-diwani self-start leading-[1.55] font-bold',
            size === 'lg' ? 'text-[28px]' : 'text-[25px]',
            dark ? 'text-gold' : 'text-brand',
          )}
        >
          {site.arabicName}
        </span>
        <span
          className={cn(
            'text-[11px] font-extrabold tracking-[0.22em] uppercase',
            dark ? 'text-cream' : 'text-bronze',
          )}
        >
          {site.name}
        </span>
      </span>
    </span>
  );
}
