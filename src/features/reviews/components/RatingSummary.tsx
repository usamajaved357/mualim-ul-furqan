import { Stars } from '@/components/ui';
import { site } from '@/config/site';
import { ratingDistribution } from '../data';

export function RatingSummary() {
  return (
    <div className="border-line bg-parchment flex items-center gap-5.5 rounded-3xl border p-6.5">
      <div className="border-line flex flex-col items-center gap-1.5 border-r pr-5.5">
        <p className="text-[54px] leading-none font-extrabold tracking-[-0.04em]">{site.rating.score}</p>
        <Stars label={`Rated ${site.rating.score} out of 5`} />
        <p className="text-muted text-[13px] font-semibold">{site.rating.count} reviews</p>
      </div>
      <div className="text-muted flex flex-1 flex-col gap-2 text-[13px] font-bold">
        {ratingDistribution.map((row) => (
          <div key={row.stars} className="flex items-center gap-2">
            <span className="w-3">{row.stars}</span>
            <span className="bg-line h-[7px] flex-1 overflow-hidden rounded-full">
              <span
                className="origin-left-bar animate-grow-x bg-amber block h-full"
                style={{ width: `${Math.round(row.share * 100)}%` }}
              />
            </span>
          </div>
        ))}
        <div className="flex gap-2 pt-1.5">
          <a href={site.links.googleReviews} className="font-extrabold">
            Google
          </a>
          <span aria-hidden>·</span>
          <a href={site.links.trustpilot} className="font-extrabold">
            Trustpilot
          </a>
        </div>
      </div>
    </div>
  );
}
