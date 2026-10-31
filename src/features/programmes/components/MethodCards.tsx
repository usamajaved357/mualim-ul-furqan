import { cn } from '@/lib/cn';
import type { ProgrammePart } from '../data';

/** One soft tint per lesson part, in order. */
const tints = [
  { panel: 'bg-mint', ink: 'text-brand' },
  { panel: 'bg-sky', ink: 'text-sky-ink' },
  { panel: 'bg-lilac', ink: 'text-lilac-ink' },
];

/** The three parts of every lesson, each with its Arabic term. */
export function MethodCards({ parts }: { parts: ProgrammePart[] }) {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="font-display text-[clamp(22px,2.2vw,28px)] leading-tight font-bold tracking-[-0.02em]">
        Every lesson has three parts
      </h4>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
        {parts.map((part, i) => {
          const tint = tints[i % tints.length]!;
          return (
            <li
              key={part.name}
              className="border-line flex flex-col gap-4 rounded-[28px] border bg-white p-3 pb-6"
            >
              <span
                lang="ar"
                dir="rtl"
                className={cn(
                  'font-naskh flex h-28 items-center justify-center rounded-[22px] text-[40px] leading-[1.7] font-bold',
                  tint.panel,
                  tint.ink,
                )}
              >
                {part.arabic}
              </span>
              <div className="flex flex-col gap-2 px-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-display text-[22px] leading-tight font-bold tracking-[-0.02em]">
                    {part.name}
                  </span>
                  <span className={cn('rounded-full px-2.5 py-1 text-xs font-bold', tint.panel, tint.ink)}>
                    {part.tag}
                  </span>
                </div>
                <p className="text-muted text-[15px]">{part.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
