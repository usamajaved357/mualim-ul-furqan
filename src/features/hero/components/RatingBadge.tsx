import { Icon, Stars } from '@/components/ui';
import { site } from '@/config/site';

/** Family count; stars appear only once there is a real rating. */
export function RatingBadge() {
  return (
    <a
      href="/#reviews"
      className="text-ink hover:text-ink inline-flex items-center gap-3 text-sm no-underline"
    >
      <span className="flex" aria-hidden>
        <span className="bg-mint text-brand flex size-10 items-center justify-center rounded-full border-2 border-white shadow-[0_4px_10px_-4px_rgb(15_31_26/0.35)]">
          <Icon name="users" size={18} strokeWidth={2} />
        </span>
        <span className="bg-brand -ml-2.5 flex size-10 items-center justify-center rounded-full border-2 border-white text-[12px] font-bold text-white shadow-[0_4px_10px_-4px_rgb(15_31_26/0.35)]">
          {site.families}
        </span>
      </span>
      <span className="flex flex-col leading-tight">
        {site.rating && <Stars size={13} />}
        <span className="font-bold">
          Trusted by {site.families} families
          {site.rating && <> · {site.rating.score}</>}
        </span>
        <span className="text-muted text-[13px]">Taught by {site.teacher.name}</span>
      </span>
    </a>
  );
}
