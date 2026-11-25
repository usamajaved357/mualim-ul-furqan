import { Container, CountUp, Marquee, Reveal, StarGlyph } from '@/components/ui';
import { courseLinks, site } from '@/config/site';
import { COURSE_ARABIC } from '@/types/domain';

/** Numbers come from `site.teacher` in config/site.ts. */
const stats = [
  { value: `${site.teacher.yearsTeaching}+`, label: 'years of teaching' },
  { value: site.teacher.studentsTaught, label: 'students taught' },
  { value: site.teacher.lecturesDelivered, label: 'lessons delivered' },
  { value: '1:1', label: 'every class, always live' },
];

/** One pass of the ribbon: each course in Arabic and English, with a star between them. */
function RibbonItems() {
  return (
    <>
      {courseLinks.map((c) => (
        <span key={c.id} className="flex items-center gap-5 pr-5">
          <span lang="ar" dir="rtl" className="font-naskh text-gold text-[26px] leading-none font-bold">
            {COURSE_ARABIC[c.id]}
          </span>
          <span className="font-display text-[22px] font-[420] tracking-[-0.01em] text-white italic">
            {c.label}
          </span>
          <StarGlyph className="text-gold/50 size-3.5" />
        </span>
      ))}
    </>
  );
}

export function StatsBar() {
  return (
    <section aria-label="At a glance" className="relative z-10 overflow-x-clip">
      {/* A tilted ribbon of the five courses, overlapping the bottom of the hero. */}
      <div className="bg-forest relative -mx-10 -mt-7 -rotate-[1.2deg] border-y border-white/10 py-4 shadow-[0_20px_50px_-20px_rgb(4_21_15/0.7)]">
        <Marquee duration={38} aria-label="Courses">
          <RibbonItems />
        </Marquee>
      </div>

      <Container className="pt-20 pb-6 sm:pt-24">
        <Reveal as="ul" className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <li
              key={s.label}
              className={`flex flex-col items-center gap-2 px-4 text-center ${i % 2 ? 'border-line-strong border-l' : ''} ${i === 2 ? 'lg:border-line-strong lg:border-l' : ''}`}
            >
              <span className="font-display text-ink text-[clamp(44px,5vw,68px)] leading-none font-[340] tracking-[-0.04em]">
                <CountUp value={s.value} />
              </span>
              <span className="text-muted text-[14px] font-semibold tracking-[0.12em] uppercase">
                {s.label}
              </span>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
