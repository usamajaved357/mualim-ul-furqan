import { useEffect, useRef, type KeyboardEvent } from 'react';
import { cn } from '@/lib/cn';
import { COURSE_ARABIC, COURSE_LABELS, type CourseId } from '@/types/domain';
import { PANEL_ID, tabId } from '../lib/ids';

interface ProgrammeTabsProps {
  ids: readonly CourseId[];
  active: CourseId;
  onSelect: (id: CourseId) => void;
}

/** Accessible tab list (arrow keys, Home/End) of the five programmes. */
export function ProgrammeTabs({ ids, active, onSelect }: ProgrammeTabsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // On narrow screens the list scrolls sideways: keep the active tab centred (e.g. after opening /#hifz).
  useEffect(() => {
    const tab = refs.current[ids.indexOf(active)];
    const list = tab?.parentElement;
    if (!tab || !list || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' });
  }, [active, ids]);

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const last = ids.length - 1;
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % ids.length
        : event.key === 'ArrowLeft'
          ? (index - 1 + ids.length) % ids.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    onSelect(ids[next]!);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Programmes"
      className="relative -mx-4 flex snap-x scroll-px-4 [scrollbar-width:none] gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
    >
      {ids.map((id, i) => {
        const selected = id === active;
        return (
          <button
            key={id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={tabId(id)}
            aria-selected={selected}
            aria-controls={PANEL_ID}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              'flex min-h-12 shrink-0 cursor-pointer snap-start items-center gap-2.5 rounded-full border py-2 pr-5 pl-4 text-[15px] font-bold whitespace-nowrap transition duration-200',
              selected
                ? 'border-ink bg-ink text-white shadow-[0_12px_24px_-14px_rgb(15_31_26/0.8)]'
                : 'border-line text-ink hover:border-brand/40 bg-white',
            )}
          >
            <span
              aria-hidden
              lang="ar"
              dir="rtl"
              className={cn('font-naskh text-[18px] leading-none', selected ? 'text-gold' : 'text-bronze')}
            >
              {COURSE_ARABIC[id]}
            </span>
            {COURSE_LABELS[id]}
          </button>
        );
      })}
    </div>
  );
}
