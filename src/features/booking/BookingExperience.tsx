import { GirihPattern } from '@/components/decor/GirihPattern';
import { Rosette } from '@/components/decor/Rosette';
import { Container, Eyebrow, SplitWords } from '@/components/ui';
import { site } from '@/config/site';
import { BookingSummary } from './components/BookingSummary';
import { BookingWidget } from './components/BookingWidget';
import { useBooking } from './hooks/useBooking';
import { withoutVowels } from '@/lib/arabic';

/**
 * The /book page: a short dark header band, then the three-step booking widget beside a live summary of the
 * class. One `useBooking` state feeds both, so the summary follows every choice.
 */
export function BookingExperience() {
  const booking = useBooking();
  return (
    <>
      <section
        data-dark
        aria-labelledby="book-title"
        className="bg-abyss grain relative -mt-[76px] overflow-hidden pt-[76px] text-white"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="animate-aurora absolute -top-1/2 -left-1/4 size-[800px] rounded-full bg-[radial-gradient(circle,rgb(25_162_122/0.42),transparent_62%)]" />
          <span className="animate-aurora absolute -right-1/4 -bottom-1/2 size-[760px] rounded-full bg-[radial-gradient(circle,rgb(229_154_31/0.2),transparent_60%)] [animation-delay:-9s]" />
          <GirihPattern
            tone="dark"
            className="[mask-image:radial-gradient(ellipse_70%_80%_at_50%_20%,black,transparent)] opacity-70"
          />
          <Rosette opacity={0.18} className="top-1/2 right-[-8%] size-[620px] -translate-y-1/2" />
        </div>
        <Container className="relative flex flex-col items-center gap-5 pt-14 pb-40 text-center sm:pt-16 sm:pb-44">
          <p
            lang="ar"
            dir="rtl"
            className="font-logo text-gold-leaf animate-fade-up text-[40px] leading-[1.5] font-bold"
          >
            {withoutVowels(site.arabicNameFull)}
          </p>
          <Eyebrow tone="dark" className="animate-fade-up [animation-delay:100ms]">
            Free 30-minute trial class
          </Eyebrow>
          <h1
            id="book-title"
            className="split-play [&_em]:text-gold max-w-[820px] text-[clamp(40px,5.4vw,72px)] leading-[1.02] font-[600] tracking-[-0.045em] text-white"
          >
            <SplitWords>
              Book your <em>free class</em>
            </SplitWords>
          </h1>
          <p className="animate-fade-up text-mist max-w-[560px] text-[18px] text-pretty [animation-delay:300ms]">
            Pick a time that suits you, meet {site.teacher.name} on Google Meet, and decide afterwards. No
            payment, no card, no pressure.
          </p>
        </Container>
      </section>

      <section className="bg-parchment relative pb-24">
        <Container className="relative -mt-28 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <div className="card animate-scale-in text-ink min-w-0 rounded-[32px] p-5 [animation-delay:250ms] sm:p-8">
            <h2 className="sr-only">Choose a time and book</h2>
            <BookingWidget booking={booking} />
          </div>
          <div className="animate-fade-up [animation-delay:400ms] lg:sticky lg:top-24">
            <BookingSummary booking={booking} />
          </div>
        </Container>
      </section>
    </>
  );
}
