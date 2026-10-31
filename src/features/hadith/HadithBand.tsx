import { GirihPattern } from '@/components/decor/GirihPattern';
import { Container, Reveal } from '@/components/ui';
import { cn } from '@/lib/cn';

/** Eight-pointed star (two overlapping squares), the classic Islamic ornament. */
function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={cn('fill-current', className)}>
      <rect x="5" y="5" width="14" height="14" rx="1" />
      <rect x="5" y="5" width="14" height="14" rx="1" transform="rotate(45 12 12)" />
      <circle cx="12" cy="12" r="2.6" className="fill-[#fffaf0]" />
    </svg>
  );
}

const corners = ['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'];

/** Hadith on teaching the Quran, set like a framed manuscript page. */
export function HadithBand() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <Reveal
          as="figure"
          className="relative m-0 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#fff3dc] via-[#fffaf0] to-[#e9f7f0] px-7 py-16 text-center sm:px-16 sm:py-20"
        >
          <GirihPattern className="[mask-image:radial-gradient(ellipse_at_center,transparent_40%,black_85%)]" />
          <span
            aria-hidden
            className="border-gold-deep/30 absolute inset-3 rounded-[30px] border sm:inset-4"
          />
          <span
            aria-hidden
            className="border-gold-deep/15 absolute inset-[18px] rounded-[25px] border sm:inset-[22px]"
          />
          {corners.map((position) => (
            <Star key={position} className={cn('text-gold-deep/60 absolute size-4 sm:size-5', position)} />
          ))}

          <div className="relative mx-auto flex max-w-[860px] flex-col items-center gap-6">
            <Star className="text-gold-deep size-9" />
            <p
              lang="ar"
              dir="rtl"
              className="font-naskh text-brand text-[clamp(32px,4.4vw,54px)] leading-[1.9] text-balance"
            >
              خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
            </p>
            <span aria-hidden className="flex items-center gap-3">
              <span className="to-gold-deep/50 h-px w-14 bg-gradient-to-r from-transparent sm:w-20" />
              <Star className="text-gold-deep size-3.5" />
              <span className="to-gold-deep/50 h-px w-14 bg-gradient-to-l from-transparent sm:w-20" />
            </span>
            <blockquote className="font-display m-0 max-w-[760px] text-[clamp(24px,2.8vw,36px)] leading-[1.25] font-semibold tracking-[-0.02em] text-balance">
              “The best of you are those who learn the Quran <em className="text-brand">and teach it.</em>”
            </blockquote>
            <figcaption className="flex flex-col items-center gap-1">
              <span className="text-ink text-[15px] font-bold">Prophet Muhammad, peace be upon him</span>
              <span className="text-bronze text-[13px] font-semibold text-balance">
                Narrated by ʿUthman ibn ʿAffan · Sahih al-Bukhari 5027
              </span>
            </figcaption>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
