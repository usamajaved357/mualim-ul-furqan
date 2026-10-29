import { Icon } from '@/components/ui';
import { anchors } from '@/config/site';
import { cn } from '@/lib/cn';
import { courseTints, type Course } from '../data';

export function CourseCard({ course }: { course: Course }) {
  const tint = courseTints[course.id];
  return (
    <article className="lift border-line group flex flex-1 flex-col gap-4 rounded-[28px] border bg-white p-3 pb-6">
      <div
        className={cn(
          'relative flex h-40 items-center justify-center overflow-hidden rounded-[22px]',
          tint.panel,
        )}
      >
        <span
          lang="ar"
          dir="rtl"
          className={cn(
            'font-naskh relative px-4 text-center text-[clamp(32px,3vw,42px)] leading-[1.7] font-bold transition-transform duration-500 group-hover:scale-105',
            tint.ink,
          )}
        >
          {course.arabic}
        </span>
        <span className="text-ink absolute top-3 left-3 rounded-full bg-white/85 px-3 py-1 text-xs font-bold">
          {course.level}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-[24px] leading-tight">{course.title}</h3>
          <span className="text-muted text-[13px] font-semibold whitespace-nowrap">{course.age}</span>
        </div>
        <p className="text-muted text-[15px]">{course.description}</p>
        <p className="flex items-start gap-2 text-[14px] font-semibold">
          <Icon name="sparkle" size={16} className={cn('mt-0.5 shrink-0', tint.ink)} />
          {course.outcome}
        </p>
        <a
          href={anchors.book}
          className="text-ink hover:text-brand mt-auto inline-flex items-center gap-1.5 pt-2 text-[15px] font-bold no-underline"
        >
          Try a free class
          <Icon
            name="arrow-right"
            size={16}
            strokeWidth={2.2}
            className="transition-transform group-hover:translate-x-1"
          />
          <span className="sr-only">for {course.title}</span>
        </a>
      </div>
    </article>
  );
}
