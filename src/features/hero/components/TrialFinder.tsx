import { anchors } from '@/config/site';
import { ButtonLink, Icon, SegmentedControl } from '@/components/ui';
import { setBookingIntent } from '@/lib/bookingIntent';
import { cn } from '@/lib/cn';
import { COURSE_ARABIC, type CourseId } from '@/types/domain';
import { courseOptions, learnerOptions, regionOptions } from '../data';
import { useTrialFinder } from '../hooks/useTrialFinder';

const label = 'text-muted text-[13px] font-bold';

/** Course tiles: Arabic name over the English one. The Arabic is decorative, so the button name stays English. */
function CoursePicker({ value, onChange }: { value: CourseId; onChange: (course: CourseId) => void }) {
  return (
    <div role="group" aria-label="Course" className="grid grid-cols-6 gap-2 sm:grid-cols-5">
      {courseOptions.map((option, i) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative col-span-2 flex min-h-[78px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl border px-1.5 py-2 text-center transition duration-200 sm:col-span-1',
              i === 3 && 'col-start-2 sm:col-start-auto',
              selected
                ? 'border-brand bg-mint shadow-[0_10px_22px_-14px_rgb(12_122_91/0.9)]'
                : 'border-line hover:border-brand/40 hover:bg-parchment bg-white',
            )}
          >
            <span
              aria-hidden
              lang="ar"
              dir="rtl"
              className={cn(
                'font-naskh text-[19px] leading-[1.5] font-bold',
                selected ? 'text-brand' : 'text-bronze',
              )}
            >
              {COURSE_ARABIC[option.value]}
            </span>
            <span className={cn('text-[13px] leading-tight font-bold', selected ? 'text-brand' : 'text-ink')}>
              {option.label}
            </span>
            {selected && (
              <span
                aria-hidden
                className="bg-brand absolute top-1.5 right-1.5 flex size-4.5 items-center justify-center rounded-full text-white"
              >
                <Icon name="check" size={10} strokeWidth={3.2} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Three quick choices that personalise the free-class call to action. */
export function TrialFinder() {
  const finder = useTrialFinder();
  return (
    <div className="border-line shadow-float max-w-[620px] overflow-hidden rounded-[30px] border bg-white">
      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <p className="font-display text-[21px] leading-tight font-bold tracking-[-0.02em]">
              Plan your free class
            </p>
            <p className="text-muted text-[13px]">Three quick choices. No card, no commitment.</p>
          </div>
          <span className="bg-mint text-brand inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold">
            <Icon name="video" size={14} strokeWidth={2.2} />
            30 min
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className={label}>What would you like to learn?</p>
          <CoursePicker value={finder.selection.course} onChange={finder.setCourse} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2.5">
            <p className={label}>Who is learning?</p>
            <SegmentedControl
              label="Learner"
              variant="track"
              options={learnerOptions}
              value={finder.selection.learner}
              onChange={finder.setLearner}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <p className={label}>Where are you?</p>
            <SegmentedControl
              label="Region"
              variant="track"
              options={regionOptions}
              value={finder.selection.region}
              onChange={finder.setRegion}
            />
          </div>
        </div>
      </div>

      <div className="border-line bg-parchment flex flex-col gap-4 border-t p-5 sm:p-6">
        <div className="flex flex-col gap-1" aria-live="polite">
          <p className="font-display text-[18px] leading-snug font-bold tracking-[-0.01em]">
            {finder.summary}
          </p>
          <p className="text-muted flex items-start gap-1.5 text-[13px]">
            <Icon name="clock" size={15} strokeWidth={2} className="text-brand mt-px shrink-0" />
            {finder.slots}
          </p>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-[1fr_auto]">
          <ButtonLink
            href={anchors.book}
            size="lg"
            iconRight="arrow-right"
            trackAs="Lead"
            onClick={() => setBookingIntent(finder.selection)}
          >
            Book my free class
          </ButtonLink>
          <ButtonLink
            href={finder.whatsappHref}
            size="lg"
            variant="outline"
            iconLeft="whatsapp"
            trackAs="Contact"
            className="[&>svg]:text-whatsapp"
          >
            Ask on WhatsApp
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
