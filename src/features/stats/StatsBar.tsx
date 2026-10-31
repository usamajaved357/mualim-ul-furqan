import { Container, Reveal } from '@/components/ui';
import { site } from '@/config/site';

/** Numbers come from `site.teacher` in config/site.ts. */
const stats = [
  { value: `${site.teacher.yearsTeaching}+`, label: 'years of teaching experience' },
  { value: site.teacher.studentsTaught, label: 'students taught' },
  { value: site.teacher.lecturesDelivered, label: 'lessons delivered' },
  { value: '1:1', label: 'every class, always live' },
];

export function StatsBar() {
  return (
    <section aria-label="At a glance" className="relative z-10">
      <Container>
        <Reveal
          as="ul"
          className="border-line shadow-card grid grid-cols-2 overflow-hidden rounded-[28px] border bg-white lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <li
              key={s.label}
              className={`border-line flex flex-col gap-1 p-6 sm:p-8 ${i % 2 ? 'border-l' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
            >
              <span className="font-display text-brand text-[clamp(34px,4vw,52px)] leading-none font-bold tracking-[-0.04em]">
                {s.value}
              </span>
              <span className="text-muted text-[15px] font-semibold">{s.label}</span>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
