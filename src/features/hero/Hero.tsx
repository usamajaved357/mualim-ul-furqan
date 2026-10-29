import { GirihPattern } from '@/components/decor/GirihPattern';
import { Container, Icon } from '@/components/ui';
import { site } from '@/config/site';
import { HeroVisual } from './components/HeroVisual';
import { RatingBadge } from './components/RatingBadge';
import { TrialFinder } from './components/TrialFinder';

const promises = ['No card required', 'Same teacher every week', 'Parents can sit in'];

export function Hero() {
  return (
    <section className="from-parchment relative overflow-hidden bg-gradient-to-b to-white">
      <div className="absolute inset-y-0 right-0 w-[55%]">
        <GirihPattern />
      </div>
      <div
        aria-hidden
        className="absolute top-[6%] -right-[10%] size-[720px] rounded-full bg-[radial-gradient(circle,rgb(11_93_75/0.14)_0%,transparent_65%)]"
      />

      <Container className="relative flex flex-wrap items-center gap-14 pt-14 pb-20 lg:pt-16 lg:pb-24">
        <div className="flex min-w-0 flex-[1.15_1_540px] flex-col gap-5.5">
          <p
            lang="ar"
            dir="rtl"
            className="animate-fade-up font-quran text-bronze self-start text-[30px] leading-[1.9]"
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <div className="animate-fade-up [animation-delay:80ms]">
            <RatingBadge />
          </div>
          <h1 className="animate-fade-up text-[clamp(40px,5.2vw,70px)] leading-[1.04] font-extrabold tracking-[-0.04em] [animation-delay:200ms]">
            Learn the Quran online with a teacher who{' '}
            <span className="text-gold-shimmer">knows your child</span>.
          </h1>
          <p className="animate-fade-up text-muted max-w-[560px] text-[19px] [animation-delay:320ms]">
            Live one-on-one Noorani Qaida, Nazra, Tajweed and Duas classes with a Qari who has taught children
            for {site.teacher.yearsTeaching} years. Your time zone, your pace.
          </p>
          <div className="animate-fade-up [animation-delay:440ms]">
            <TrialFinder />
          </div>
          <ul className="animate-fade-up text-muted flex flex-wrap gap-5.5 text-sm font-semibold [animation-delay:560ms]">
            {promises.map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <Icon name="check" size={18} strokeWidth={2.4} className="text-brand" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up min-w-0 flex-[1_1_440px] [animation-delay:320ms]">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
