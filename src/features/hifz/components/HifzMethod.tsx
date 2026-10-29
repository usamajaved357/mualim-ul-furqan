import { Reveal } from '@/components/ui';
import { cn } from '@/lib/cn';
import { hifzMethod } from '../data';

/** Sabaq, sabqi and manzil: the three parts of every lesson. */
export function HifzMethod() {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-[clamp(24px,2.4vw,30px)] leading-tight">Every lesson has three parts</h3>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
        {hifzMethod.map((part, i) => (
          <Reveal
            as="li"
            key={part.name}
            delay={i * 90}
            className="border-line flex flex-col gap-4 rounded-[28px] border bg-white p-3 pb-6"
          >
            <span
              lang="ar"
              dir="rtl"
              className={cn(
                'font-naskh flex h-28 items-center justify-center rounded-[22px] text-[40px] leading-[1.7] font-bold',
                part.tint.panel,
                part.tint.ink,
              )}
            >
              {part.arabic}
            </span>
            <div className="flex flex-col gap-2 px-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-display text-[22px] leading-tight font-bold tracking-[-0.02em]">
                  {part.name}
                </span>
                <span
                  className={cn('rounded-full px-2.5 py-1 text-xs font-bold', part.tint.panel, part.tint.ink)}
                >
                  {part.tag}
                </span>
              </div>
              <p className="text-muted text-[15px]">{part.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
