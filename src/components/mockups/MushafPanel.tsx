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
  /** "flow": ayat run on like a printed page. "lines": one ayah per line, the active one shown as a band. */
  layout?: 'flow' | 'lines';
  className?: string;
}

/** End-of-ayah ornament (۝ + number), drawn by Amiri Quran as a single enclosed mark. */
export function AyahMark({ number }: { number: string }) {
  return <span className="ayah-mark">{`۝${number}`}</span>;
}

/** Surah name between two fading gold rules. */
function SurahTitle({ title }: { title: string }) {
  return (
    <div className="mb-1.5 flex items-center gap-3">
      <span className="h-px flex-1 bg-gradient-to-l from-[#d9bf7f] to-transparent" />
      <p className="font-naskh text-bronze text-[16px] leading-[1.9] font-bold">{title}</p>
      <span className="h-px flex-1 bg-gradient-to-r from-[#d9bf7f] to-transparent" />
    </div>
  );
}

/** One ayah per line; the ayah being read is a single soft band, so it never splits across lines. */
function MushafLines({ title, ayat, activeIndex, footer, className }: MushafPanelProps) {
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
                  'font-quran relative rounded-xl px-3 text-[18px] leading-[2.05] sm:text-[20px]',
                  active
                    ? 'bg-[#f7e7bd] text-[#1e2a26] shadow-[inset_0_0_0_1px_#ebcd83]'
                    : 'text-[#1e2a26]/75',
                )}
              >
                {active && (
                  <span
                    aria-hidden
                    className="bg-gold-deep absolute inset-y-2 right-0 w-[3px] rounded-full"
                  />
                )}
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

/** A page of the mushaf as shown on the shared classroom screen. */
export function MushafPanel(props: MushafPanelProps) {
  if (props.layout === 'lines') return <MushafLines {...props} />;
  const { title, ayat, activeIndex, footer, size = 'md', className } = props;
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
