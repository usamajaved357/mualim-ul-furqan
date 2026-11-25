import { anchors } from '@/config/site';
import { ButtonLink, Icon, SegmentedControl, StarGlyph } from '@/components/ui';
import { setBookingIntent } from '@/lib/bookingIntent';
import { cn } from '@/lib/cn';
import { COURSE_ARABIC, type CourseId } from '@/types/domain';
import { courseOptions, learnerOptions } from '../data';
import { useTrialFinder } from '../hooks/useTrialFinder';
import { withoutVowels } from '@/lib/arabic';

const label = 'text-mist text-[12px] font-bold tracking-[0.12em] uppercase';

/**
 * Course tiles: the Arabic name in gold calligraphy over the English one. The selected tile lights up in
 * emerald with a gold rim. The Arabic is decorative, so each button's name stays English.
 */
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
              'group relative col-span-2 flex min-h-[92px] cursor-pointer flex-col items-center justify-center gap-0 overflow-hidden rounded-2xl border px-1.5 py-2 text-center transition duration-300 sm:col-span-1',
              i === 3 && 'col-start-2 sm:col-start-auto',
              selected
                ? 'border-gold/70 bg-[linear-gradient(180deg,rgb(25_162_122/0.42),rgb(12_122_91/0.12))] shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_14px_30px_-14px_rgb(25_162_122/0.9)]'
                : 'border-white/10 bg-white/[0.04] hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08]',
            )}
          >
            <span
              aria-hidden
              lang="ar"
              dir="rtl"
              className={cn(
                'font-calligraphy text-[26px] leading-[1.95] font-bold transition-colors',
                selected ? 'text-gold' : 'text-gold/60 group-hover:text-gold/85',
              )}
            >
              {withoutVowels(COURSE_ARABIC[option.value])}
            </span>
            <span
              className={cn(
                'text-[12.5px] leading-tight font-bold',
                selected ? 'text-white' : 'text-white/75',
              )}
            >
              {option.label}
            </span>
            {selected && <StarGlyph className="text-gold absolute top-2 right-2 size-2.5" />}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Three quick choices that personalise the free-class call to action. A translucent "veil" card with a gold
 * hairline frame, so it belongs to the night-sky hero instead of sitting on it like a white box.
 */
export function TrialFinder() {
  const finder = useTrialFinder();
  return (
    <div className="card-veil max-w-[620px] overflow-hidden rounded-[30px]">
      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="font-display text-[22px] leading-tight font-bold tracking-[-0.03em] text-white">
              Plan your free class
            </p>
            <p className="text-mist text-[13.5px]">Three quick choices. No card, no commitment.</p>
          </div>
          <span className="border-gold/30 text-gold inline-flex shrink-0 items-center gap-1.5 rounded-full border bg-black/20 px-3 py-1.5 text-xs font-bold">
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
              variant="trackDark"
              options={learnerOptions}
              value={finder.selection.learner}
              onChange={finder.setLearner}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <p className={label}>Your time zone</p>
            <p className="flex min-h-12 items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3.5 text-sm font-bold text-white">
              <Icon name="globe" size={16} strokeWidth={2.2} className="text-gold shrink-0" />
              <span className="truncate">{finder.zone}</span>
              <span className="text-mist ml-auto shrink-0 text-[11px] font-semibold">Auto</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 bg-black/25 p-5 sm:p-6">
        <div className="flex flex-col gap-1" aria-live="polite">
          <p className="font-display text-[18px] leading-snug font-bold tracking-[-0.02em] text-white">
            {finder.summary}
          </p>
          <p className="text-mist flex items-start gap-1.5 text-[13px]">
            <Icon name="clock" size={15} strokeWidth={2} className="text-gold mt-px shrink-0" />
            {finder.slots}
          </p>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-[1fr_auto]">
          <ButtonLink
            href={anchors.book}
            size="lg"
            variant="gold"
            iconRight="arrow-right"
            trackAs="Lead"
            onClick={() => setBookingIntent(finder.selection)}
          >
            Book my free class
          </ButtonLink>
          <ButtonLink
            href={finder.whatsappHref}
            size="lg"
            variant="ghostDark"
            iconLeft="whatsapp"
            trackAs="Contact"
            className="[&>svg]:text-live"
          >
            Ask on WhatsApp
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
