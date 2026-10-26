import { Reveal, Section, SectionHeading } from '@/components/ui';
import { PortalPreview } from './components/PortalPreview';

export function PortalSection() {
  return (
    <Section id="portal" containerClassName="flex flex-col gap-12">
      <SectionHeading
        eyebrow="Student & parent portal"
        title="Classes, homework and progress, all in one place"
        description="Log in to see your next class, today's homework, your child's progress through each stage and the certificates they've earned."
      />
      <Reveal>
        <PortalPreview />
      </Reveal>
    </Section>
  );
}
