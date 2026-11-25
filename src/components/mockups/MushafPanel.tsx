import type { ReactNode } from 'react';
import { withoutVowels } from '@/lib/arabic';
import { cn } from '@/lib/cn';

export interface Ayah {
  text: string;
  number: string;
}

interface MushafPanelProps {
  title?: string;
  ayat: readonly Ayah[];
  /** Index of the ayah currently being read (highlighted). */
  activeIndex?: number;
  footer?: ReactNode;
  className?: string;
}

/** End-of-ayah ornament (۝ + number), drawn by Amiri Quran as a single enclosed mark. */
function AyahMark({ number }: { number: string }) {
  return <span className="ayah-mark">{`۝${number}`}</span>;
}

/** Surah name between two fading gold rules. */
function SurahTitle({ title }: { title: string }) {
  return (
    <div className="mb-1.5 flex items-center gap-3">
      <span className="h-px flex-1 bg-gradient-to-l from-[#d9bf7f] to-transparent" />
      <p className="font-calligraphy text-bronze text-[20px] leading-[1.9]">{withoutVowels(title)}</p>
      <span className="h-px flex-1 bg-gradient-to-r from-[#d9bf7f] to-transparent" />
    </div>
  );
}

/**
 * A page of the mushaf as shown on the shared lesson screen: one ayah per line, the ayah being read shown as a
 * single soft band so the highlight never splits across lines.
 */
export function MushafPanel({ title, ayat, activeIndex, footer, className }: MushafPanelProps) {
  return (
    <div className={cn('bg-page rounded-[22px] p-1.5 shadow-[inset_0_0_0_1px_#ecdcb4]', className)}>
      <div
        lang="ar"
        dir="rtl"
        className="rounded-[17px] border border-[#e6d3a3] px-2.5 pt-2 pb-2.5 text-center sm:px-3"
      >
        {title && <SurahTitle title={title} />}
        <ol className="flex flex-col gap-1">
          {ayat.map((ayah, i) => {
            const active = i === activeIndex;
            return (
              <li
                key={ayah.number}
                className={cn(
                  'font-calligraphy relative rounded-xl px-3 text-[24px] leading-[2.2] transition-[background-color,box-shadow,color] duration-700 sm:text-[27px]',
                  active
                    ? 'bg-[#f7e7bd] text-[#1e2a26] shadow-[inset_0_0_0_1px_#ebcd83]'
                    : 'text-[#1e2a26]/75 shadow-[inset_0_0_0_1px_transparent]',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'bg-gold-deep absolute inset-y-2 right-0 w-[3px] origin-top rounded-full transition-transform duration-700',
                    active ? 'scale-y-100' : 'scale-y-0',
                  )}
                />
                {ayah.text}
                <AyahMark number={ayah.number} />
              </li>
            );
          })}
        </ol>
      </div>
      {footer}
    </div>
  );
}
