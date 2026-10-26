import { Stars } from '@/components/ui';
import type { Review } from '../data';
import { initialOf } from '../lib/filterReviews';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="lift border-line m-0 flex h-full flex-col gap-3.5 rounded-[22px] border bg-white p-6.5">
      <div className="flex items-center justify-between gap-2.5">
        <Stars label="5 out of 5 stars" />
        <span className="bg-mint text-brand rounded-lg px-2.5 py-1 text-xs font-extrabold">
          {review.course}
        </span>
      </div>
      <blockquote className="m-0 text-base leading-relaxed text-[#36423e]">{review.text}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-[#f0eadd] pt-3.5">
        <span
          aria-hidden
          className="bg-sand text-earth flex size-10 items-center justify-center rounded-xl text-sm font-extrabold"
        >
          {initialOf(review.name)}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[15px] font-extrabold">{review.name}</span>
          <span className="text-muted text-[13px]">{review.detail}</span>
        </span>
        <span className="bg-cream text-muted ml-auto rounded-lg px-2 py-1 text-xs font-extrabold">
          {review.region}
        </span>
      </figcaption>
    </figure>
  );
}
