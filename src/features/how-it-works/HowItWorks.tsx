import type { ComponentType } from 'react';
import { Reveal, Section, SectionHeading } from '@/components/ui';
import { CallIllustration, ProgressIllustration, SlotsIllustration } from './illustrations';

const steps: { title: string; body: string; Illustration: ComponentType }[] = [
  {
    title: 'Book a free trial',
    body: 'Choose a time that suits you. The calendar shows open slots in your own time zone.',
    Illustration: SlotsIllustration,
  },
  {
    title: 'Meet your teacher',
    body: 'A relaxed 30-minute class on Zoom. We hear your child read and find the right starting point.',
    Illustration: CallIllustration,
  },
  {
    title: 'Learn & track progress',
    body: "Choose a monthly plan only if you're happy. Same teacher, fixed weekly times, a report every month.",
    Illustration: ProgressIllustration,
  },
];

export function HowItWorks() {
  return (
    <Section id="how" containerClassName="flex flex-col gap-13">
      <SectionHeading eyebrow="How it works" title="Start learning in three simple steps" />
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6.5">
        {steps.map(({ title, body, Illustration }, i) => (
          <Reveal
            as="li"
            key={title}
            delay={i * 100}
            className="lift border-line flex flex-col overflow-hidden rounded-[26px] border bg-white"
          >
            <div className="bg-parchment flex h-[210px] items-center justify-center p-6.5" aria-hidden>
              <Illustration />
            </div>
            <div className="flex flex-col gap-2.5 p-7">
              <span className="text-bronze text-[13px] font-extrabold tracking-[0.1em]">
                STEP {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">{title}</h3>
              <p className="text-muted">{body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
