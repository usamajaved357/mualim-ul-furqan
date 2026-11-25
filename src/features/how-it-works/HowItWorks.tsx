import type { ComponentType } from 'react';
import { GirihPattern } from '@/components/decor/GirihPattern';
import { ButtonLink, Reveal, Section, SectionHeading } from '@/components/ui';
import { anchors, site } from '@/config/site';
import { CallIllustration, ProgressIllustration, SlotsIllustration } from './illustrations';

const steps: { title: string; body: string; Illustration: ComponentType }[] = [
  {
    title: 'Pick a time',
    body: 'Choose a free 30-minute slot in the calendar. Times are shown in your own time zone.',
    Illustration: SlotsIllustration,
  },
  {
    title: 'Meet your teacher',
    body: `Join on Google Meet. ${site.teacher.name} listens, gently assesses and finds the right starting point.`,
    Illustration: CallIllustration,
  },
  {
    title: 'Continue only if you love it',
    body: 'Pick a monthly plan if you are happy. Same teacher, fixed weekly times, a report every month.',
    Illustration: ProgressIllustration,
  },
];

export function HowItWorks() {
  return (
    <Section id="how" tone="parchment" containerClassName="flex flex-col gap-14">
      <SectionHeading
        eyebrow="How it works"
        title={
          <>
            Your first lesson, <em>in three easy steps</em>
          </>
        }
        description="No forms to wait on and no sales calls. Book a time, get your Google Meet link by email, and join."
      />
      <Reveal as="ol" className="relative grid gap-5 lg:grid-cols-3">
        {/* A gold thread that draws across the three steps as they come into view. */}
        <span
          aria-hidden
          className="via-gold-deep/70 [.is-visible_&]:animate-grow-x origin-left-bar absolute top-[142px] right-[12%] left-[12%] hidden h-[2px] [transform:scaleX(0)] bg-gradient-to-r from-transparent to-transparent lg:block"
        />
        {steps.map(({ title, body, Illustration }, i) => (
          <Reveal
            as="li"
            key={title}
            delay={i * 100}
            className="card lift spotlight flex flex-col overflow-hidden rounded-[30px] p-3 md:max-lg:grid md:max-lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:max-lg:items-center md:max-lg:gap-2"
          >
            {/* Night-emerald stage with a faint lattice: the white mockups float on it. */}
            <div
              className={`bg-abyss relative z-10 flex h-[260px] items-center justify-center overflow-hidden rounded-[22px] px-7 py-8`}
              aria-hidden
            >
              <span className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgb(25_162_122/0.45),transparent_70%)]" />
              <GirihPattern tone="dark" className="opacity-60" />
              <span className="font-display absolute -right-2 -bottom-8 text-[150px] leading-none font-[800] tracking-[-0.06em] text-white/[0.05]">
                {i + 1}
              </span>
              <span className="relative">
                <Illustration />
              </span>
            </div>
            <div className="relative z-10 flex flex-col gap-2 px-4 pt-5 pb-4 md:max-lg:px-6 md:max-lg:py-4">
              <span className="flex items-baseline gap-3">
                <span className="text-brand text-[12px] font-bold tracking-[0.16em] uppercase">
                  Step {i + 1}
                </span>
              </span>
              <h3 className="text-[25px] leading-tight font-[700]">{title}</h3>
              <p className="text-muted text-[15px]">{body}</p>
            </div>
          </Reveal>
        ))}
      </Reveal>
      <div className="flex justify-center">
        <ButtonLink href={anchors.book} size="lg" iconRight="arrow-right" trackAs="Lead">
          Book your free class
        </ButtonLink>
      </div>
    </Section>
  );
}
