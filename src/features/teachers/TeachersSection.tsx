import { Reveal, Section, SectionHeading } from '@/components/ui';
import { TeacherCard } from './components/TeacherCard';
import { leadTeacher } from './data';

export function TeachersSection() {
  return (
    <Section id="teachers" containerClassName="flex flex-col gap-12">
      <SectionHeading
        eyebrow="Your teacher"
        title="Meet your teacher before you pay"
        description="One teacher, every week. Your free trial is with the same Qari who will teach you."
      />
      <Reveal className="mx-auto w-full max-w-[1080px]">
        <TeacherCard teacher={leadTeacher} />
      </Reveal>
    </Section>
  );
}
