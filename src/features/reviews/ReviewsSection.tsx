import { useState } from 'react';
import { Reveal, Section, SectionHeading, SegmentedControl } from '@/components/ui';
import { Milestones } from './components/Milestones';
import { RatingSummary } from './components/RatingSummary';
import { ReviewCard } from './components/ReviewCard';
import { VideoTestimonials } from './components/VideoTestimonials';
import { reviewFilters, reviews, type ReviewFilter } from './data';
import { filterReviews } from './lib/filterReviews';

export function ReviewsSection() {
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const visible = filterReviews(reviews, filter);

  return (
    <Section id="reviews" containerClassName="flex flex-col gap-10">
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
        <Reveal className="min-w-0 flex-[1_1_340px]">
          <RatingSummary />
        </Reveal>
      </div>

      <VideoTestimonials />

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5" aria-live="polite">
        {visible.map((review) => (
          <li key={review.id}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>

      <Milestones />
    </Section>
  );
}
