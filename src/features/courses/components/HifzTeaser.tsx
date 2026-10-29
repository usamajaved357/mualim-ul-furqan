import { Icon } from '@/components/ui';
import { anchors } from '@/config/site';
import { cn } from '@/lib/cn';
import { courseTints, hifzTeaser } from '../data';

/** Full-width card after the course grid: Hifz is a programme of its own, explained in its own section. */
export function HifzTeaser() {
  const tint = courseTints.hifz;
  return (
    <a
      href={anchors.hifz}
      className="lift border-line group text-ink hover:text-ink grid gap-6 rounded-[28px] border bg-white p-3 no-underline sm:grid-cols-[minmax(0,260px)_1fr] sm:items-center"
    >
      <span
        lang="ar"
        dir="rtl"
        className={cn(
          'font-naskh flex h-40 items-center justify-center rounded-[22px] px-4 text-center text-[clamp(32px,3vw,40px)] leading-[1.7] font-bold',
          tint.panel,
          tint.ink,
        )}
      >
        {hifzTeaser.arabic}
      </span>
      <span className="flex flex-col gap-3 px-3 pb-3 sm:py-3 sm:pr-6">
        <span className="text-muted text-[13px] font-bold tracking-wide uppercase">{hifzTeaser.eyebrow}</span>
        <span className="font-display text-[clamp(24px,2.4vw,30px)] leading-tight font-bold tracking-[-0.025em]">
          {hifzTeaser.title}
        </span>
        <span className="text-muted max-w-[620px] text-[15px]">{hifzTeaser.description}</span>
        <span className="flex flex-wrap gap-2">
          {hifzTeaser.facts.map((fact) => (
            <span
              key={fact}
              className={cn('rounded-full px-3 py-1 text-[13px] font-bold', tint.panel, tint.ink)}
            >
              {fact}
            </span>
          ))}
        </span>
        <span className="hover:text-brand inline-flex items-center gap-1.5 pt-1 text-[15px] font-bold">
          {hifzTeaser.cta}
          <Icon
            name="arrow-right"
            size={16}
            strokeWidth={2.2}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </span>
    </a>
  );
}
