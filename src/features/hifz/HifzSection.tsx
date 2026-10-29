import { Icon, Reveal, Section, SectionHeading } from '@/components/ui';
import { site } from '@/config/site';
import { HifzIncluded } from './components/HifzIncluded';
import { HifzMethod } from './components/HifzMethod';
import { HifzRoadmap } from './components/HifzRoadmap';
import { hifzFacts } from './data';

export function HifzSection() {
  return (
    <Section id="hifz" tone="sand" pattern containerClassName="flex flex-col gap-14">
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <SectionHeading
          align="left"
          eyebrow="Hifz programme"
          title={
            <>
              Memorise the Quran, <em>and keep it for life</em>
            </>
          }
          description={`Daily one-on-one Hifz lessons with ${site.teacher.name}. New memorisation and revision happen in every class, so what your child learns stays learned.`}
        />
        <Reveal className="flex flex-col gap-4 lg:items-end">
          <p
            lang="ar"
            dir="rtl"
            className="font-naskh text-bronze text-[clamp(40px,5vw,60px)] leading-[1.6] font-bold"
          >
            حِفْظُ الْقُرْآنِ
          </p>
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {hifzFacts.map((fact) => (
              <li
                key={fact.label}
                className="text-ink inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[14px] font-bold"
              >
                <Icon name={fact.icon} size={17} strokeWidth={2} className="text-brand" />
                {fact.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <HifzMethod />

      <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <HifzRoadmap />
        <HifzIncluded />
      </div>
    </Section>
  );
}
