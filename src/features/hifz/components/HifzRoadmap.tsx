import { Reveal } from '@/components/ui';
import { hifzPlan } from '../data';

/** Step-by-step route from the free assessment to completing the Quran. */
export function HifzRoadmap() {
  return (
    <Reveal className="border-line flex flex-col gap-6 rounded-[28px] border bg-white p-6 sm:p-9">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[clamp(24px,2.4vw,30px)] leading-tight">The Hifz plan, step by step</h3>
        <p className="text-muted text-[15px]">
          The order most students follow. Your teacher adjusts the daily target as your child grows.
        </p>
      </div>
      <ol className="flex flex-col">
        {hifzPlan.map((stage, i) => (
          <li key={stage.title} className="relative flex gap-4 pb-6 last:pb-0">
            {i < hifzPlan.length - 1 && (
              <span aria-hidden className="bg-line absolute top-10 bottom-0 left-[19px] w-0.5" />
            )}
            <span className="bg-brand font-display relative flex size-10 shrink-0 items-center justify-center rounded-full text-[15px] font-bold text-white">
              {i + 1}
            </span>
            <div className="flex flex-col gap-0.5 pt-1.5">
              <span className="font-display text-[18px] leading-snug font-bold tracking-[-0.01em]">
                {stage.title}
              </span>
              <span className="text-muted text-[15px]">{stage.detail}</span>
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
