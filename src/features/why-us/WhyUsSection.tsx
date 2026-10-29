import { GirihPattern } from '@/components/decor/GirihPattern';
import { Icon, Reveal, Section, SectionHeading, type IconName } from '@/components/ui';
import { site } from '@/config/site';

const tiles: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'eye',
    title: 'Parents can sit in',
    body: 'Join or watch any class, any time. Nothing behind closed doors.',
  },
  {
    icon: 'message',
    title: 'Taught in your language',
    body: `Lessons explained in ${site.teacher.languages}, so nothing gets lost.`,
  },
  {
    icon: 'shield',
    title: 'Safe & private',
    body: 'Private Google Meet links for each family, no public chat, recordings only if you ask.',
  },
  {
    icon: 'award',
    title: 'Monthly progress report',
    body: "What was covered, what's improving and what to practise at home.",
  },
  {
    icon: 'phone',
    title: 'Any device',
    body: 'Phone, tablet or laptop. Google Meet runs in the browser or the free app.',
  },
];

/** Example class time shown in three cities (illustrative). */
const clocks = [
  { city: 'London', time: '5:30 PM' },
  { city: 'New York', time: '12:30 PM' },
  { city: 'Berlin', time: '6:30 PM' },
];

const tileClass = 'lift flex flex-col gap-2.5 rounded-[26px] border border-line bg-white p-7';

export function WhyUsSection() {
  return (
    <Section containerClassName="flex flex-col gap-12">
      <SectionHeading eyebrow="Why families choose us" title="Personal, safe and built around your family" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
        <Reveal className="bg-brand relative col-span-full flex flex-wrap items-center gap-6 overflow-hidden rounded-[26px] p-8 text-white">
          <GirihPattern tone="dark" />
          <div className="relative flex flex-[999_1_280px] flex-col gap-2.5">
            <h3 className="text-[26px] font-extrabold tracking-[-0.02em]">
              The same teacher, every single week
            </h3>
            <p className="text-sage">
              No rotating tutors or call-centre academies. One Qari who knows your child's level, strengths
              and what they find hard.
            </p>
          </div>
          <div className="border-gold/35 relative flex flex-[1_1_200px] items-center gap-3 rounded-[18px] border bg-white/10 p-3.5">
            <span className="bg-gold flex size-14 shrink-0 items-center justify-center rounded-full p-0.5">
              <img
                src={site.teacher.photo}
                alt=""
                className="size-full rounded-full object-cover object-top"
              />
            </span>
            <span className="flex flex-col leading-snug">
              <span className="font-extrabold">{site.teacher.name}</span>
              <span className="text-sage text-[13px]">Your teacher · {site.teacher.yearsTeaching} yrs</span>
            </span>
          </div>
        </Reveal>

        <Reveal className={tileClass}>
          <h3 className="text-[19px] font-extrabold">Times that fit school</h3>
          <ul className="flex flex-col gap-2 text-sm" aria-label="Example class time in three cities">
            {clocks.map((c) => (
              <li key={c.city} className="bg-parchment flex justify-between rounded-[10px] px-3 py-2">
                <span className="font-semibold">{c.city}</span>
                <span className="font-extrabold">{c.time}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted text-sm">After school &amp; weekends, in your local time.</p>
        </Reveal>

        {tiles.map((t, i) => (
          <Reveal key={t.title} delay={(i % 3) * 80} className={tileClass}>
            <span className="bg-sand text-bronze flex size-12 items-center justify-center rounded-[14px]">
              <Icon name={t.icon} size={24} strokeWidth={1.8} />
            </span>
            <h3 className="text-[19px] font-extrabold">{t.title}</h3>
            <p className="text-muted text-[15px]">{t.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
