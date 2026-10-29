import { Container, Reveal } from '@/components/ui';

export function HadithBand() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <Reveal
          as="figure"
          className="relative m-0 flex flex-col items-center gap-6 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#fff3dc] via-[#fffaf0] to-[#e9f7f0] px-6 py-14 text-center sm:py-20"
        >
          <span
            aria-hidden
            className="text-gold-deep shadow-card font-display flex size-14 items-center justify-center rounded-full bg-white pt-4 text-[48px] leading-none font-bold select-none"
          >
            “
          </span>
          <p
            lang="ar"
            dir="rtl"
            className="font-naskh text-brand max-w-[900px] text-[clamp(30px,4.2vw,50px)] leading-[1.9] font-normal"
          >
            خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
          </p>
          <span aria-hidden className="bg-gold-deep/40 h-px w-16" />
          <blockquote className="font-display m-0 max-w-[760px] text-[clamp(24px,2.8vw,36px)] leading-[1.25] font-semibold tracking-[-0.02em] text-balance">
            “The best of you are those who learn the Quran{' '}
            <em className="text-brand not-italic">and teach it.</em>”
          </blockquote>
          <figcaption className="text-bronze rounded-full bg-white px-4 py-1.5 text-[13px] font-bold">
            Prophet Muhammad, peace be upon him · Sahih al-Bukhari
          </figcaption>
        </Reveal>
      </Container>
    </section>
  );
}
