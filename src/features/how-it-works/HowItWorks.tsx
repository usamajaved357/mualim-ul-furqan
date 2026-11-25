import type { ComponentType } from 'react';
import { ButtonLink, Reveal, Section, SectionHeading } from '@/components/ui';
import { anchors, site } from '@/config/site';
import { CallIllustration, ProgressIllustration, SlotsIllustration } from './illustrations';

const steps: { title: string; body: string; Illustration: ComponentType; tint: string }[] = [
  {
    title: 'Pick a time',
    body: 'Choose a free 30-minute slot in the calendar. Times are shown in your own time zone.',
    Illustration: SlotsIllustration,
    tint: 'bg-[linear-gradient(160deg,#eefaf4,#d5f0e3)]',
  },
  {
    title: 'Meet your teacher',
    body: `Join on Google Meet. ${site.teacher.name} listens, gently assesses and finds the right starting point.`,
    Illustration: CallIllustration,
    tint: 'bg-[linear-gradient(160deg,#fff6e3,#fde9c2)]',
  },
  {
    title: 'Continue only if you love it',
    body: 'Pick a monthly plan if you are happy. Same teacher, fixed weekly times, a report every month.',
    Illustration: ProgressIllustration,
    tint: 'bg-[linear-gradient(160deg,#eefaf4,#d5f0e3)]',
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
      <Reveal as="ol" className="relative grid gap-5 md:grid-cols-3">
        {/* A gold thread that draws across the three steps as they come into view. */}
        <span
          aria-hidden
          className="via-gold-deep/70 [.is-visible_&]:animate-grow-x origin-left-bar absolute top-[142px] right-[12%] left-[12%] hidden h-[2px] [transform:scaleX(0)] bg-gradient-to-r from-transparent to-transparent md:block"
        />
        {steps.map(({ title, body, Illustration, tint }, i) => (
          <Reveal
            as="li"
            key={title}
            delay={i * 100}
            className="lift spotlight border-line relative flex flex-col overflow-hidden rounded-[28px] border bg-white p-3"
          >
            <div
              className={`flex h-[260px] items-center justify-center rounded-[22px] px-7 py-8 ${tint}`}
              aria-hidden
            >
              <Illustration />
            </div>
            <div className="relative z-10 flex flex-col gap-2 px-4 pt-5 pb-4">
              <span className="flex items-baseline gap-3">
                <span className="font-display text-gold-deep text-[34px] leading-none font-[400] italic">
                  0{i + 1}
                </span>
                <span className="text-brand text-[12px] font-bold tracking-[0.16em] uppercase">
                  Step {i + 1}
                </span>
              </span>
              <h3 className="text-[25px] leading-tight font-[500]">{title}</h3>
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
