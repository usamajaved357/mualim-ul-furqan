import type { Programme } from '../data';

/** The step-by-step plan for one programme, from the free class onwards. */
export function Roadmap({ programme }: { programme: Programme }) {
  const { label, planIntro, plan } = programme;
  return (
    <div className="border-line flex flex-col gap-6 rounded-[28px] border bg-white p-6 sm:p-9">
      <div className="flex flex-col gap-1.5">
        <h4 className="font-display text-[clamp(22px,2.2vw,28px)] leading-tight font-bold tracking-[-0.02em]">
          The {label} plan, step by step
        </h4>
        <p className="text-muted text-[15px]">{planIntro}</p>
      </div>
      <ol className="flex flex-col">
        {plan.map((stage, i) => (
          <li key={stage.title} className="relative flex gap-4 pb-6 last:pb-0">
            {i < plan.length - 1 && (
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
    </div>
  );
}
