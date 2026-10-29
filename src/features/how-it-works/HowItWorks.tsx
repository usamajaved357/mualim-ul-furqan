import type { ComponentType } from 'react';
import { ButtonLink, Reveal, Section, SectionHeading } from '@/components/ui';
import { anchors, site } from '@/config/site';
import { CallIllustration, ProgressIllustration, SlotsIllustration } from './illustrations';

const steps: { title: string; body: string; Illustration: ComponentType; tint: string }[] = [
  {
    title: 'Pick a time',
    body: 'Choose a free 30-minute slot in the calendar. Times are shown in your own time zone.',
    Illustration: SlotsIllustration,
    tint: 'bg-mint',
  },
  {
    title: 'Meet your teacher',
    body: `Join on Google Meet. ${site.teacher.name} listens, gently assesses and finds the right starting point.`,
    Illustration: CallIllustration,
    tint: 'bg-sky',
  },
  {
    title: 'Continue only if you love it',
    body: 'Pick a monthly plan if you are happy. Same teacher, fixed weekly times, a report every month.',
    Illustration: ProgressIllustration,
    tint: 'bg-sand',
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
      <ol className="relative grid gap-5 md:grid-cols-3">
        <span
          aria-hidden
          className="border-line-strong absolute top-[118px] right-[16%] left-[16%] hidden border-t-2 border-dashed md:block"
        />
        {steps.map(({ title, body, Illustration, tint }, i) => (
          <Reveal
            as="li"
            key={title}
            delay={i * 100}
            className="lift border-line relative flex flex-col overflow-hidden rounded-[28px] border bg-white p-3"
          >
            <div
              className={`flex h-[220px] items-center justify-center rounded-[22px] p-6 ${tint}`}
              aria-hidden
            >
              <Illustration />
            </div>
            <div className="flex flex-col gap-2.5 px-4 pt-5 pb-4">
              <span className="bg-ink font-display flex size-9 items-center justify-center rounded-full text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="text-[24px] leading-tight">{title}</h3>
              <p className="text-muted text-[15px]">{body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      <div className="flex justify-center">
        <ButtonLink href={anchors.book} size="lg" iconRight="arrow-right" trackAs="Lead">
          Book your free class
        </ButtonLink>
      </div>
    </Section>
  );
}
