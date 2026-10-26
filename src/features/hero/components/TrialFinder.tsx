import { anchors } from '@/config/site';
import { ButtonLink, SegmentedControl } from '@/components/ui';
import { courseOptions, learnerOptions, regionOptions } from '../data';
import { useTrialFinder } from '../hooks/useTrialFinder';

function StepLabel({ n, children }: { n: number; children: string }) {
  return (
    <p className="text-muted text-[13px] font-bold tracking-[0.08em] uppercase">
      {n} · {children}
    </p>
  );
}

/** Three quick choices that personalise the free-trial call to action. */
export function TrialFinder() {
  const finder = useTrialFinder();
  return (
    <div className="border-line flex max-w-[640px] flex-col gap-4 rounded-[22px] border bg-white p-5 shadow-[0_30px_60px_-36px_rgb(10_42_36/0.45)]">
      <div className="flex flex-col gap-2">
        <StepLabel n={1}>Choose a course</StepLabel>
        <SegmentedControl
          label="Course"
          options={courseOptions}
          value={finder.selection.course}
          onChange={finder.setCourse}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex min-w-[200px] flex-1 flex-col gap-2">
          <StepLabel n={2}>Who is learning?</StepLabel>
          <SegmentedControl
            label="Learner"
            variant="track"
            options={learnerOptions}
            value={finder.selection.learner}
            onChange={finder.setLearner}
          />
        </div>
        <div className="flex min-w-[220px] flex-1 flex-col gap-2">
          <StepLabel n={3}>Where are you?</StepLabel>
          <SegmentedControl
            label="Region"
            variant="track"
            options={regionOptions}
            value={finder.selection.region}
            onChange={finder.setRegion}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3.5 border-t border-[#f0eadd] pt-4">
        <div className="flex flex-col leading-snug" aria-live="polite">
          <span className="text-[15px] font-bold">{finder.summary}</span>
          <span className="text-muted text-[13px]">{finder.slots}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <ButtonLink
            href={finder.whatsappHref}
            variant="soft"
            iconLeft="whatsapp"
            trackAs="Contact"
            aria-label="Ask on WhatsApp"
          >
            Ask
          </ButtonLink>
          <ButtonLink href={anchors.book} size="lg" iconRight="arrow-right" trackAs="Lead">
            Book free trial
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
