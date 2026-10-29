import { Stars } from '@/components/ui';
import { site } from '@/config/site';

const avatars = ['bg-brand', 'bg-gold-deep', 'bg-sky-ink', 'bg-lilac-ink'];

export function RatingBadge() {
  return (
    <a
      href="/#reviews"
      className="text-ink hover:text-ink inline-flex items-center gap-3 text-sm no-underline"
    >
      <span className="flex" aria-hidden>
        {avatars.map((bg, i) => (
          <span
            key={bg}
            className={`size-8 rounded-full border-[2.5px] border-white ${bg} ${i ? '-ml-2.5' : ''}`}
          />
        ))}
      </span>
      <span className="flex flex-col leading-tight">
        {site.rating && <Stars size={13} />}
        <span>
          Trusted by <strong>{site.families} families</strong>
          {site.rating && <> · {site.rating.score}</>}
        </span>
      </span>
    </a>
  );
}
