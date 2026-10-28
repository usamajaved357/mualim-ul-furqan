import { Reveal, Section, SectionHeading } from '@/components/ui';
import { TeacherCard } from './components/TeacherCard';
import { leadTeacher } from './data';

export function TeachersSection() {
  return (
    <Section id="teachers" containerClassName="flex flex-col gap-12">
      <SectionHeading eyebrow="Your teacher" title="Meet your teacher before you pay" />
      <Reveal className="mx-auto flex w-full max-w-[560px] flex-col">
        <TeacherCard teacher={leadTeacher} />
      </Reveal>
    </Section>
  );
}
