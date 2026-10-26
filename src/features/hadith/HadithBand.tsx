import { Reveal, Section } from '@/components/ui';

export function HadithBand() {
  return (
    <Section tone="sand" pattern containerClassName="py-20 sm:py-22">
      <Reveal
        as="figure"
        className="m-0 mx-auto flex max-w-[880px] flex-col items-center gap-4.5 text-center"
      >
        <p lang="ar" className="font-quran text-brand text-[clamp(30px,4vw,50px)] leading-[1.7]">
          خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
        </p>
        <blockquote className="m-0 text-[clamp(21px,2.4vw,28px)] leading-snug font-bold tracking-[-0.015em]">
          “The best of you are those who learn the Quran and teach it.”
        </blockquote>
        <figcaption className="text-bronze text-[13px] font-extrabold tracking-[0.14em] uppercase">
          Sahih al-Bukhari
        </figcaption>
      </Reveal>
    </Section>
  );
}
