import { Fragment, type ReactNode } from 'react';
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
  size?: 'sm' | 'md';
  className?: string;
}

/** End-of-ayah ornament (۝ + number), drawn by Amiri Quran as a single enclosed mark. */
export function AyahMark({ number }: { number: string }) {
  return <span className="ayah-mark">{`۝${number}`}</span>;
}

/** A page of the mushaf as shown on the shared classroom screen. */
export function MushafPanel({ title, ayat, activeIndex, footer, size = 'md', className }: MushafPanelProps) {
  return (
    <div className={cn('bg-page rounded-[18px] p-1.5 shadow-[inset_0_0_0_1px_#e6d6ae]', className)}>
      <div
        lang="ar"
        dir="rtl"
        className={cn(
          'border-gold-deep/80 relative rounded-xl border-[1.5px] px-5 pt-3 pb-2.5 text-center text-[#1e2a26] outline outline-1 outline-offset-[3px] outline-[#d9bf7f]',
          size === 'sm' ? 'text-[19px]' : 'text-[22px]',
        )}
      >
        {title && (
          <p className="font-naskh mx-auto mb-1 w-fit rounded-full border border-[#d9bf7f] bg-[#f7ecd0] px-5 text-[15px] leading-[1.9] text-[#6b4510]">
            {title}
          </p>
        )}
        <p className="text-quran">
          {ayat.map((ayah, i) => (
            <Fragment key={ayah.number}>
              {i === activeIndex ? (
                <mark className="rounded-md bg-[#f3dc9f] [box-decoration-break:clone] px-1 text-inherit shadow-[0_0_0_1.5px_var(--color-gold-deep)]">
                  {ayah.text}
                  <AyahMark number={ayah.number} />
                </mark>
              ) : (
                <span>
                  {ayah.text}
                  <AyahMark number={ayah.number} />
                </span>
              )}{' '}
            </Fragment>
          ))}
        </p>
      </div>
      {footer}
    </div>
  );
}
