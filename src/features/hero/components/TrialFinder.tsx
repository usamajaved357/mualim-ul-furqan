import { anchors } from '@/config/site';
import { ButtonLink, SegmentedControl } from '@/components/ui';
import { setBookingIntent } from '@/lib/bookingIntent';
import { courseOptions, learnerOptions, regionOptions } from '../data';
import { useTrialFinder } from '../hooks/useTrialFinder';

/** Three quick choices that personalise the free-trial call to action. */
export function TrialFinder() {
  const finder = useTrialFinder();
  return (
    <div className="border-line shadow-float flex max-w-[620px] flex-col gap-4 rounded-[28px] border bg-white/90 p-4 backdrop-blur sm:p-5">
      <div className="flex flex-col gap-2">
        <p className="text-muted text-[13px] font-bold">What would you like to learn?</p>
        <SegmentedControl
          label="Course"
          options={courseOptions}
          value={finder.selection.course}
          onChange={finder.setCourse}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-muted text-[13px] font-bold">Who is learning?</p>
          <SegmentedControl
            label="Learner"
            variant="track"
            options={learnerOptions}
            value={finder.selection.learner}
            onChange={finder.setLearner}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-muted text-[13px] font-bold">Where are you?</p>
          <SegmentedControl
            label="Region"
            variant="track"
            options={regionOptions}
            value={finder.selection.region}
            onChange={finder.setRegion}
          />
        </div>
      </div>
      <div className="bg-mint flex flex-wrap items-center justify-between gap-3 rounded-[20px] p-2 pl-4">
        <div className="flex min-w-0 flex-col leading-snug" aria-live="polite">
          <span className="text-brand text-[15px] font-bold">{finder.summary}</span>
          <span className="text-muted text-[13px]">{finder.slots}</span>
        </div>
        <div className="flex gap-1.5">
          <ButtonLink
            href={finder.whatsappHref}
            variant="outline"
            iconLeft="whatsapp"
            trackAs="Contact"
            aria-label="Ask on WhatsApp"
            className="px-4"
          >
            <span className="sr-only">Ask</span>
          </ButtonLink>
          <ButtonLink
            href={anchors.book}
            iconRight="arrow-right"
            trackAs="Lead"
            onClick={() => setBookingIntent(finder.selection)}
          >
            Book free trial
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
