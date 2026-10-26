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
  className?: string;
}

/** A page of the mushaf as shown on the shared classroom screen. */
export function MushafPanel({ title, ayat, activeIndex, footer, className }: MushafPanelProps) {
  return (
    <div className={cn('bg-page rounded-[18px] p-2', className)}>
      <div
        lang="ar"
        dir="rtl"
        className="border-gold-deep font-quran rounded-xl border-2 px-5 pt-4 pb-3 text-center text-[21px] leading-[2.2] text-[#1e2a26]"
      >
        {title && <p className="text-bronze text-base leading-relaxed">{title}</p>}
        <p>
          {ayat.map((ayah, i) => (
            <Fragment key={ayah.number}>
              {i === activeIndex ? (
                <mark className="bg-gold/70 rounded-md px-1.5 text-inherit shadow-[0_0_0_2px_var(--color-gold-deep)]">
                  {ayah.text} ﴿{ayah.number}﴾
                </mark>
              ) : (
                <span>
                  {ayah.text} ﴿{ayah.number}﴾
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
