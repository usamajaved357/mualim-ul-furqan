import { cn } from '@/lib/cn';
import type { ProgrammePart } from '../data';

/** One soft tint per lesson part, in order. */
const tints = [
  { panel: 'bg-mint', ink: 'text-brand' },
  { panel: 'bg-[linear-gradient(160deg,#fff6e3,#fde9c2)]', ink: 'text-bronze' },
  { panel: 'bg-[linear-gradient(160deg,#e3f5ec,#c4e8d6)]', ink: 'text-brand-dark' },
];

/** The three parts of every lesson, each with its Arabic term in calligraphy with full harakat. */
export function MethodCards({ parts }: { parts: ProgrammePart[] }) {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="font-display text-[clamp(22px,2.2vw,28px)] leading-tight font-[700] tracking-[-0.02em]">
        Every lesson has three parts
      </h4>
      <ul className="grid gap-5 md:grid-cols-3">
        {parts.map((part, i) => {
          const tint = tints[i % tints.length]!;
          return (
            <li
              key={part.name}
              className="card lift spotlight flex flex-col gap-4 rounded-[30px] p-3 pb-6 [&>*]:relative [&>*]:z-10"
            >
              <span
                lang="ar"
                dir="rtl"
                className={cn(
                  'font-calligraphy flex h-28 items-center justify-center rounded-[22px] text-[48px] leading-[1.6] font-bold',
                  tint.panel,
                  tint.ink,
                )}
              >
                {part.arabic.normalize('NFC')}
              </span>
              <div className="flex flex-col gap-2 px-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-display text-[22px] leading-tight font-[700] tracking-[-0.02em]">
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
