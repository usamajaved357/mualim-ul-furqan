import { useState } from 'react';
import { Reveal, Section, SectionHeading, SegmentedControl } from '@/components/ui';
import type { Audience } from '@/types/domain';
import { CourseCard } from './components/CourseCard';
import { HifzTeaser } from './components/HifzTeaser';
import { courses } from './data';

const audienceOptions = [
  { value: 'kids', label: 'Kids' },
  { value: 'adults', label: 'Adults' },
] as const;

export function CoursesSection() {
  const [audience, setAudience] = useState<Audience>('kids');
  return (
    <Section id="courses" tone="white" containerClassName="flex flex-col gap-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          align="left"
          eyebrow="Courses"
          title={
            <>
              From the first letter to <em>beautiful recitation</em>
            </>
          }
          description="Four core courses, plus a full Hifz programme. In the free class your teacher listens, then recommends exactly where to start."
        />
        <SegmentedControl
          label="Show courses for"
          variant="solid"
          options={audienceOptions}
          value={audience}
          onChange={setAudience}
        />
      </div>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
        {courses[audience].map((course, i) => (
          <Reveal as="li" key={`${audience}-${course.id}`} delay={i * 80} className="flex">
            <CourseCard course={course} />
          </Reveal>
        ))}
      </ul>
      <Reveal>
        <HifzTeaser />
      </Reveal>
    </Section>
  );
}
