import { useState } from 'react';
import { Reveal, SectionHeading, SegmentedControl } from '@/components/ui';
import { site } from '@/config/site';
import { reviewFilters, reviews, type ReviewFilter } from '../data';
import { filterReviews } from '../lib/filterReviews';
import { RatingSummary } from './RatingSummary';
import { ReviewCard } from './ReviewCard';

export function ReviewList() {
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const visible = filterReviews(reviews, filter);

  return (
    <>
      <div className="flex flex-wrap items-stretch gap-7">
        <div className="flex min-w-0 flex-[999_1_440px] flex-col justify-center gap-4">
          <SectionHeading align="left" eyebrow="Reviews" title="What parents & students say" />
          <SegmentedControl
            label="Filter reviews"
            options={reviewFilters}
            value={filter}
            onChange={setFilter}
          />
        </div>
        {site.rating && (
          <Reveal className="min-w-0 flex-[1_1_340px]">
            <RatingSummary rating={site.rating} />
          </Reveal>
        )}
      </div>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5" aria-live="polite">
        {visible.map((review) => (
          <li key={review.id}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </>
  );
}
