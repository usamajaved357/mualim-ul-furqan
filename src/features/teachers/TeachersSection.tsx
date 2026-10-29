import { Reveal, Section, SectionHeading } from '@/components/ui';
import { TeacherCard } from './components/TeacherCard';
import { leadTeacher } from './data';

export function TeachersSection() {
  return (
    <Section id="teachers" tone="parchment" containerClassName="flex flex-col gap-12">
      <SectionHeading
        eyebrow="Your teacher"
        title={
          <>
            Learn with <em>{leadTeacher.name}</em>
          </>
        }
        description="The teacher in your free class is the teacher you keep. No hand-offs, no surprises."
      />
      <Reveal className="mx-auto w-full max-w-[1080px]">
        <TeacherCard teacher={leadTeacher} />
      </Reveal>
    </Section>
  );
}
