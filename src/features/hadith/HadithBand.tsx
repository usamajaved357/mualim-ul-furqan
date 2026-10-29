import { Container, Reveal } from '@/components/ui';

export function HadithBand() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <Reveal
          as="figure"
          className="relative m-0 flex flex-col items-center gap-5 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#fff3dc] via-[#fffaf0] to-[#e9f7f0] px-6 py-16 text-center sm:py-20"
        >
          <span
            aria-hidden
            className="text-gold-deep/25 absolute -top-10 left-6 font-serif text-[220px] leading-none select-none sm:left-14"
          >
            “
          </span>
          <p
            lang="ar"
            dir="rtl"
            className="font-naskh text-brand relative text-[clamp(32px,4.6vw,58px)] leading-[1.8] font-bold"
          >
            خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
          </p>
          <blockquote className="font-display relative m-0 max-w-[720px] text-[clamp(24px,2.8vw,36px)] leading-[1.2] font-semibold tracking-[-0.02em] text-balance">
            “The best of you are those who learn the Quran <em className="text-brand">and teach it.</em>”
          </blockquote>
          <figcaption className="text-bronze relative rounded-full bg-white px-4 py-1.5 text-[13px] font-bold">
            Prophet Muhammad, peace be upon him · Sahih al-Bukhari
          </figcaption>
        </Reveal>
      </Container>
    </section>
  );
}
