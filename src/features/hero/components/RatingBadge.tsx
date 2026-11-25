import { Icon, Stars } from '@/components/ui';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

/** Family count; stars appear only once there is a real rating. */
export function RatingBadge({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  const ring = dark ? 'border-abyss' : 'border-white';
  return (
    <a
      href="/#reviews"
      className={cn(
        'inline-flex shrink-0 items-center gap-3 text-sm no-underline',
        dark ? 'text-white hover:text-white' : 'text-ink hover:text-ink',
      )}
    >
      <span className="flex" aria-hidden>
        <span
          className={cn(
            'flex size-10 items-center justify-center rounded-full border-2',
            ring,
            dark ? 'bg-forest text-gold' : 'bg-mint text-brand',
          )}
        >
          <Icon name="users" size={18} strokeWidth={2} />
        </span>
        <span
          className={cn(
            '-ml-2.5 flex size-10 items-center justify-center rounded-full border-2 text-[12px] font-bold',
            ring,
            dark ? 'bg-gold text-abyss' : 'bg-brand text-white',
          )}
        >
          {site.families}
        </span>
      </span>
      <span className="flex flex-col leading-tight">
        {site.rating && <Stars size={13} />}
        <span className="font-bold">
          Trusted by {site.families} families
          {site.rating && <> · {site.rating.score}</>}
        </span>
        <span className={cn('text-[13px]', dark ? 'text-mist' : 'text-muted')}>
          Taught by {site.teacher.name}
        </span>
      </span>
    </a>
  );
}
