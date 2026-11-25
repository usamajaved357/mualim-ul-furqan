import { Rosette } from '@/components/decor/Rosette';
import { Icon, Reveal, Section, SectionHeading, type IconName } from '@/components/ui';
import { openingHours } from '@/config/hours';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';
import { dateKeyIn, formatClock, wallTimeToDate } from '@/lib/timezone';

const tiles: { icon: IconName; title: string; body: string; tint: string }[] = [
  {
    icon: 'eye',
    title: 'Watch any lesson',
    body: 'Join the call from work or the next room. Nothing ever happens behind closed doors.',
    tint: 'bg-mint text-brand',
  },
  {
    icon: 'award',
    title: 'A progress report every month',
    body: "What was covered, what's improving, and exactly what to practise at home.",
    tint: 'bg-[#fdf0d5] text-bronze',
  },
  {
    icon: 'shield',
    title: 'Safe and private',
    body: 'A private Google Meet link for your family only. No public chat, no strangers, recordings only if you ask.',
    tint: 'bg-mint text-brand',
  },
  {
    icon: 'message',
    title: 'Explained in your language',
    body: `Lessons explained in ${site.teacher.languages}, so your child understands, not just repeats.`,
    tint: 'bg-[#fdf0d5] text-bronze',
  },
];

/** One example class, 8:30 PM for the teacher, shown in three cities (today's offsets, so summer time is right). */
const exampleClass = wallTimeToDate(
  dateKeyIn(new Date(), openingHours.timeZone),
  '20:30',
  openingHours.timeZone,
);
const clocks = [
  { city: 'London', zone: 'Europe/London', code: 'UK' },
  { city: 'Berlin', zone: 'Europe/Berlin', code: 'EU' },
  { city: 'New York', zone: 'America/New_York', code: 'US' },
].map((c) => ({ ...c, time: formatClock(exampleClass, c.zone) }));

const card =
  'lift spotlight border-line flex flex-col rounded-[28px] border bg-white p-7 [&>*]:relative [&>*]:z-10';

export function WhyUsSection() {
  return (
    <Section tone="parchment" containerClassName="flex flex-col gap-14">
      <SectionHeading
        eyebrow="Why families choose us"
        title={
          <>
            Everything you wish your local Quran class <em>already did</em>
          </>
        }
        description="Busy families need more than a teacher on a screen. Here is what comes with every single lesson."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Reveal className="bg-abyss grain relative flex flex-col justify-between gap-8 overflow-hidden rounded-[28px] p-8 text-white md:col-span-2 lg:row-span-2 lg:p-10">
          <span
            aria-hidden
            className="animate-aurora absolute -top-40 -right-32 size-[520px] rounded-full bg-[radial-gradient(circle,rgb(25_162_122/0.55),transparent_62%)]"
          />
          <span
            aria-hidden
            className="animate-aurora absolute -bottom-48 -left-24 size-[420px] rounded-full bg-[radial-gradient(circle,rgb(229_154_31/0.25),transparent_62%)] [animation-delay:-7s]"
          />
          <Rosette opacity={0.22} className="-right-24 -bottom-24 size-[420px]" />
          <div className="relative flex flex-col gap-4">
            <span className="glass-dark text-gold flex size-13 items-center justify-center rounded-full">
              <Icon name="user" size={26} strokeWidth={1.7} />
            </span>
            <h3 className="max-w-[460px] text-[clamp(32px,3.6vw,48px)] leading-[1.04] font-[420]">
              One teacher who <em className="text-gold">really knows</em> your child
            </h3>
            <p className="text-sage max-w-[480px] text-[17px]">
              No rotating tutors and no call-centre academy. The same Qari every week, who remembers exactly
              where your child left off, what they find tricky, and how to keep them motivated.
            </p>
          </div>
          <div className="relative flex flex-wrap items-center gap-3">
            <span className="glass-dark inline-flex items-center gap-3 rounded-full py-2 pr-4 pl-2">
              <span className="bg-gold text-night flex size-9 items-center justify-center rounded-full font-bold">
                {site.teacher.name.charAt(0)}
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-bold">{site.teacher.name}</span>
                <span className="text-sage">{site.teacher.yearsTeaching} years teaching</span>
              </span>
            </span>
            <span className="glass-dark rounded-full px-4 py-2 text-sm font-semibold">
              Same time every week
            </span>
          </div>
        </Reveal>

        <Reveal className={cn(card, 'gap-4 md:col-span-2 lg:col-span-1')}>
          <span className="bg-sand text-bronze flex size-12 items-center justify-center rounded-full">
            <Icon name="globe" size={22} strokeWidth={1.9} />
          </span>
          <h3 className="text-[23px] leading-tight font-[500]">One class time, wherever you live</h3>
          <ul className="flex flex-col gap-1.5 text-sm" aria-label="Example class time in three cities">
            {clocks.map((c) => (
              <li
                key={c.city}
                className="bg-parchment flex items-center justify-between rounded-full px-4 py-2"
              >
                <span className="flex items-center gap-2.5 font-semibold">
                  <span
                    aria-hidden
                    className="text-brand bg-mint flex h-6 w-8 items-center justify-center rounded-md text-[10.5px] font-extrabold tracking-wider"
                  >
                    {c.code}
                  </span>
                  {c.city}
                </span>
                <span className="font-display text-[17px] font-[500]">{c.time}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {tiles.map((t, i) => (
          <Reveal key={t.title} delay={(i % 3) * 80} className={cn(card, 'gap-3')}>
            <span className={cn('flex size-12 items-center justify-center rounded-full', t.tint)}>
              <Icon name={t.icon} size={22} strokeWidth={1.9} />
            </span>
            <h3 className="mt-1 text-[23px] leading-tight font-[500]">{t.title}</h3>
            <p className="text-muted text-[15px]">{t.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
