import { BookingExperience } from '@/features/booking';
import { site } from '@/config/site';

/** /book: the free-class booking flow on its own page, reached from every "Book" button. */
export function BookingPage() {
  return (
    <>
      <title>{`Book a free class · ${site.name}`}</title>
      <meta
        name="description"
        content={`Book a free 30-minute Quran class on Google Meet with ${site.teacher.name}. Pick a time in your own time zone. No payment or card needed.`}
      />
      <link rel="canonical" href={`${site.url.replace(/\/+$/, '')}/book`} />
      <BookingExperience />
    </>
  );
}
