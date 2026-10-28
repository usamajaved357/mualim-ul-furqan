import { Section } from '@/components/ui';
import { Milestones } from './components/Milestones';
import { ReviewList } from './components/ReviewList';
import { TrackRecord } from './components/TrackRecord';
import { milestones, reviews } from './data';

/** Real reviews once there are any; until then, the track record and the free-trial offer. */
export function ReviewsSection() {
  return (
    <Section id="reviews" containerClassName="flex flex-col gap-10">
      {reviews.length > 0 ? <ReviewList /> : <TrackRecord />}
      {milestones.length > 0 && <Milestones />}
    </Section>
  );
}
