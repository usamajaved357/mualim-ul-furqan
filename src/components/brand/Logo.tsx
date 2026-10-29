import { cn } from '@/lib/cn';
import { site } from '@/config/site';
import { LogoMark } from './LogoMark';

interface LogoProps {
  tone?: 'light' | 'dark';
  size?: 'md' | 'lg';
  className?: string;
}

/** Horizontal lockup: mark + Arabic wordmark over the Latin name, both set to the same width. */
export function Logo({ tone = 'light', size = 'md', className }: LogoProps) {
  const dark = tone === 'dark';
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <LogoMark size={size === 'lg' ? 52 : 46} />
      <span className="flex flex-col items-stretch">
        <span
          lang="ar"
          dir="rtl"
          className={cn(
            'font-logo -mb-1 text-center leading-[1.45] font-bold',
            size === 'lg' ? 'text-[29px]' : 'text-[26px]',
            dark ? 'text-gold' : 'text-brand',
          )}
        >
          {site.arabicName}
        </span>
        <span
          className={cn(
            'border-t pt-1 text-center text-[10.5px] leading-none font-extrabold tracking-[0.2em] whitespace-nowrap uppercase',
            dark ? 'text-cream border-gold/30' : 'text-bronze border-gold-deep/40',
          )}
        >
          {site.name}
        </span>
      </span>
    </span>
  );
}
