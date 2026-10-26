import { GirihPattern } from '@/components/decor/GirihPattern';
import { Icon } from '@/components/ui';
import { anchors } from '@/config/site';
import type { Course } from '../data';

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="lift border-line flex flex-col gap-3.5 rounded-3xl border bg-white p-6.5">
      <div className="bg-night relative flex h-32 items-center justify-center overflow-hidden rounded-[18px]">
        <GirihPattern tone="dark" />
        <span lang="ar" className="font-naskh text-gold relative text-[44px] leading-snug font-bold">
          {course.arabic}
        </span>
        <span className="absolute top-2.5 right-2.5 rounded-full bg-white/12 px-2.5 py-1 text-[11px] font-extrabold tracking-[0.06em] text-white uppercase">
          {course.level}
        </span>
      </div>
      <h3 className="text-[21px] font-extrabold tracking-[-0.02em]">{course.title}</h3>
      <p className="text-muted text-[15px]">{course.description}</p>
      <div className="text-muted flex flex-wrap gap-2 text-[13px] font-bold">
        <span className="bg-cream inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1">
          <Icon name="clock" size={14} strokeWidth={2} />
          30 min
        </span>
        <span className="bg-cream rounded-lg px-2.5 py-1">{course.age}</span>
      </div>
      <a
        href={anchors.book}
        className="text-brand mt-auto inline-flex min-h-10 items-center gap-1.5 border-t border-[#f0eadd] pt-2 text-[15px] font-bold no-underline"
      >
        Free trial class <span aria-hidden>→</span>
        <span className="sr-only">for {course.title}</span>
      </a>
    </article>
  );
}
