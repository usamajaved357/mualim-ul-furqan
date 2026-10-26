import { useState } from 'react';
import { Reveal, Section, SectionHeading, SegmentedControl } from '@/components/ui';
import type { Audience } from '@/types/domain';
import { CourseCard } from './components/CourseCard';
import { courses } from './data';

const audienceOptions = [
  { value: 'kids', label: 'Kids' },
  { value: 'adults', label: 'Adults' },
] as const;

export function CoursesSection() {
  const [audience, setAudience] = useState<Audience>('kids');
  return (
    <Section id="courses" tone="parchment" containerClassName="flex flex-col gap-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          align="left"
          eyebrow="Courses"
          title="A clear path from the first letter to beautiful recitation"
        />
        <SegmentedControl
          label="Show courses for"
          variant="solid"
          options={audienceOptions}
          value={audience}
          onChange={setAudience}
        />
      </div>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5.5">
        {courses[audience].map((course, i) => (
          <Reveal as="li" key={`${audience}-${course.id}`} delay={i * 80} className="flex">
            <CourseCard course={course} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
