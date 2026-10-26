import { Reveal, Section, SectionHeading } from '@/components/ui';
import { ClassroomWindow } from './components/ClassroomWindow';
import { FeatureTile } from './components/FeatureTile';
import { SetupCheck } from './components/SetupCheck';
import { leftFeatures, rightFeatures } from './data';

export function ClassroomSection() {
  return (
    <Section id="classroom" tone="night" pattern containerClassName="flex flex-col gap-14">
      <SectionHeading
        tone="dark"
        eyebrow="The classroom"
        title="Like sitting right next to your teacher"
        description="The mushaf is shared on screen, every word is followed and corrected live, and you can watch it all."
      />
      <div className="flex flex-wrap items-center gap-5">
        <div className="flex min-w-0 flex-[1_1_230px] flex-col gap-5">
          {leftFeatures.map((f, i) => (
            <FeatureTile key={f.title} feature={f} delay={i * 100} />
          ))}
        </div>
        <Reveal className="min-w-0 flex-[999_1_520px]">
          <ClassroomWindow />
        </Reveal>
        <div className="flex min-w-0 flex-[1_1_230px] flex-col gap-5">
          {rightFeatures.map((f, i) => (
            <FeatureTile key={f.title} feature={f} delay={i * 100} />
          ))}
        </div>
      </div>
      <SetupCheck />
    </Section>
  );
}
