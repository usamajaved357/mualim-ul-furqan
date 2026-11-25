import { GirihPattern } from '@/components/decor/GirihPattern';
import { Container, Reveal, SectionHeading } from '@/components/ui';
import { ClassroomWindow } from './components/ClassroomWindow';
import { FeatureTile } from './components/FeatureTile';
import { SetupCheck } from './components/SetupCheck';
import { leftFeatures, rightFeatures } from './data';

export function ClassroomSection() {
  return (
    <section id="classroom" className="bg-white py-6 sm:py-10">
      <Container>
        <div
          data-dark
          className="bg-abyss text-cream grain relative flex flex-col gap-14 overflow-hidden rounded-[40px] px-5 py-16 sm:px-10 sm:py-24"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(25_162_122/0.4),transparent_60%)]"
          />
          <span
            aria-hidden
            className="animate-aurora pointer-events-none absolute -bottom-1/3 -left-1/4 size-[800px] rounded-full bg-[radial-gradient(circle,rgb(229_154_31/0.16),transparent_62%)]"
          />
          <GirihPattern
            tone="dark"
            className="[mask-image:linear-gradient(to_bottom,black,transparent_60%)] opacity-50"
          />
          <SectionHeading
            tone="dark"
            eyebrow="Inside a lesson"
            title={
              <>
                A real classroom, <em>right on Google Meet</em>
              </>
            }
            description="The mushaf is shared on screen, each ayah is highlighted as it's read, and every correction happens live: gently, clearly, and in front of you."
            className="relative"
          />
          <div className="relative grid items-center gap-5 lg:grid-cols-[1fr_2.6fr_1fr]">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {leftFeatures.map((f, i) => (
                <FeatureTile key={f.title} feature={f} delay={i * 100} />
              ))}
            </div>
            <Reveal className="order-first min-w-0 lg:order-none">
              <ClassroomWindow />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {rightFeatures.map((f, i) => (
                <FeatureTile key={f.title} feature={f} delay={i * 100} />
              ))}
            </div>
          </div>
          <SetupCheck />
        </div>
      </Container>
    </section>
  );
}
