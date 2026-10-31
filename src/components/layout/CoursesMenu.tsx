import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { courseLinks } from '@/config/site';
import { COURSE_ARABIC } from '@/types/domain';
import { Icon } from '@/components/ui';

/** One course row: Arabic tile, name and a one-line description. */
export function CourseMenuLink({
  link,
  onNavigate,
}: {
  link: (typeof courseLinks)[number];
  onNavigate?: () => void;
}) {
  return (
    <a
      href={link.href}
      onClick={onNavigate}
      className="text-ink hover:text-ink hover:bg-parchment flex items-center gap-3 rounded-2xl p-2 no-underline transition-colors"
    >
      <span
        aria-hidden
        lang="ar"
        dir="rtl"
        className="bg-sand text-bronze font-naskh flex size-11 shrink-0 items-center justify-center rounded-xl text-[17px] font-bold"
      >
        {COURSE_ARABIC[link.id]}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[15px] font-bold">{link.label}</span>
        <span className="text-muted text-[13px] font-medium">{link.note}</span>
      </span>
    </a>
  );
}

/** "Courses" in the desktop nav: opens on hover or click, closes on Escape, outside click or navigation. */
export function CoursesMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="courses-menu"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'text-ink/80 hover:text-ink hover:bg-cream inline-flex cursor-pointer items-center gap-1 rounded-full px-3.5 py-2 whitespace-nowrap transition-colors',
          open && 'bg-cream text-ink',
        )}
      >
        Courses
        <Icon
          name="chevron-right"
          size={15}
          strokeWidth={2.4}
          className={cn('transition-transform duration-200', open ? '-rotate-90' : 'rotate-90')}
        />
      </button>
      {open && (
        <div id="courses-menu" className="absolute top-full left-1/2 z-50 w-[340px] -translate-x-1/2 pt-3">
          <div className="border-line shadow-float rounded-[26px] border bg-white p-2">
            {courseLinks.map((link) => (
              <CourseMenuLink key={link.id} link={link} onNavigate={() => setOpen(false)} />
            ))}
            <a
              href="/#courses"
              onClick={() => setOpen(false)}
              className="text-brand bg-mint mt-1 flex items-center justify-center gap-1.5 rounded-2xl py-2.5 text-[14px] font-bold no-underline"
            >
              See all courses
              <Icon name="arrow-right" size={15} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
