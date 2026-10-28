import { Stars } from '@/components/ui';
import { site } from '@/config/site';

export function RatingBadge() {
  return (
    <a
      href="/#reviews"
      className="border-line text-ink hover:text-ink inline-flex items-center gap-2.5 self-start rounded-full border bg-white py-1.5 pr-3.5 pl-2 text-sm no-underline shadow-[0_6px_18px_-12px_rgb(10_42_36/0.4)]"
    >
      <span className="flex" aria-hidden>
        {['bg-brand', 'bg-gold-deep', 'bg-earth'].map((bg, i) => (
          <span
            key={bg}
            className={`size-6.5 rounded-full border-2 border-white ${bg} ${i ? '-ml-2.5' : ''}`}
          />
        ))}
      </span>
      {site.rating && <Stars size={14} />}
      <span>
        Loved by <strong>{site.families} families</strong>
        {site.rating && <> · {site.rating.score}</>}
      </span>
    </a>
  );
}
