import { Section, SectionHeading } from '@/components/ui';
import { ProgrammePanel } from './components/ProgrammePanel';
import { ProgrammeTabs } from './components/ProgrammeTabs';
import { programmeOrder, programmes } from './data';
import { useProgrammeTab } from './hooks/useProgrammeTab';

/** All courses in one place: a tab per programme, each with its full lesson method and plan. */
export function ProgrammesSection() {
  const [active, select] = useProgrammeTab(programmeOrder, 'nazra');
  return (
    <Section id="courses" tone="sand" pattern containerClassName="flex flex-col gap-10">
      {/* Targets for /#qaida, /#nazra … links: they land here and open that tab. */}
      <div aria-hidden className="absolute inset-x-0 top-0">
        {programmeOrder.map((id) => (
          <span key={id} id={id} className="block" />
        ))}
      </div>
      <SectionHeading
        eyebrow="Courses"
        title={
          <>
            From the first letter <em>to the whole Quran</em>
          </>
        }
        description="Five programmes for children and adults. Choose one to see what every lesson covers and the plan, step by step."
      />
      <ProgrammeTabs ids={programmeOrder} active={active} onSelect={select} />
      <ProgrammePanel key={active} programme={programmes[active]} />
    </Section>
  );
}
