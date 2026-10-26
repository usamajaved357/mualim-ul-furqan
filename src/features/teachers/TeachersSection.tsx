import { Reveal, Section, SectionHeading } from '@/components/ui';
import { ComingSoonCard } from './components/ComingSoonCard';
import { TeacherCard } from './components/TeacherCard';
import { leadTeacher } from './data';

export function TeachersSection() {
  return (
    <Section id="teachers" containerClassName="flex flex-col gap-12">
      <SectionHeading eyebrow="Our teachers" title="Meet your teacher before you pay" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-6">
        <Reveal className="flex flex-col">
          <TeacherCard teacher={leadTeacher} />
        </Reveal>
        <Reveal delay={100} className="flex flex-col">
          <ComingSoonCard />
        </Reveal>
      </div>
    </Section>
  );
}
