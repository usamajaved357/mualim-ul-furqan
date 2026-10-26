import { BookingSection } from '@/features/booking';
import { ClassroomSection } from '@/features/classroom';
import { CoursesSection } from '@/features/courses';
import { FaqSection, faqs } from '@/features/faq';
import { HadithBand } from '@/features/hadith';
import { Hero } from '@/features/hero';
import { HowItWorks } from '@/features/how-it-works';
import { PricingSection } from '@/features/pricing';
import { ReviewsSection } from '@/features/reviews';
import { StatsBar } from '@/features/stats';
import { PortalSection } from '@/features/student-portal';
import { TeachWithUs } from '@/features/teach-with-us';
import { TeachersSection } from '@/features/teachers';
import { WhyUsSection } from '@/features/why-us';
import { site } from '@/config/site';

/** FAQ structured data for Google rich results. */
const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export function HomePage() {
  return (
    <>
      <title>{`${site.name} · Live One-on-One Online Quran Classes`}</title>
      <meta name="description" content={site.description} />
      <link rel="canonical" href={site.url} />
      <script type="application/ld+json">{faqJsonLd}</script>

      <Hero />
      <StatsBar />
      <HowItWorks />
      <CoursesSection />
      <WhyUsSection />
      <ClassroomSection />
      <PortalSection />
      <HadithBand />
      <TeachersSection />
      <PricingSection />
      <ReviewsSection />
      <FaqSection />
      <TeachWithUs />
      <BookingSection />
    </>
  );
}
