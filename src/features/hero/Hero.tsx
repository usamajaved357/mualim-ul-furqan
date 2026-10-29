import { Glow } from '@/components/decor/Glow';
import { Container, Eyebrow, Icon } from '@/components/ui';
import { site } from '@/config/site';
import { HeroVisual } from './components/HeroVisual';
import { RatingBadge } from './components/RatingBadge';
import { TrialFinder } from './components/TrialFinder';

const promises = ['First class free', 'No card needed', 'Parents can watch every lesson'];

export function Hero() {
  return (
    <section className="relative -mt-[76px] overflow-hidden pt-[76px]">
      <Glow color="mint" className="-top-40 -right-40 size-[760px]" />
      <Glow color="saffron" className="top-[45%] -left-60 size-[620px]" />
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(rgb(15_31_26/0.07)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] [background-size:22px_22px]"
      />

      <Container className="relative grid items-center gap-12 pt-12 pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10 lg:pt-16 lg:pb-24">
        <div className="flex min-w-0 flex-col gap-6">
          <div className="animate-fade-up flex flex-wrap items-center gap-3">
            <Eyebrow>Live 1-on-1 classes on Google Meet</Eyebrow>
            <p lang="ar" dir="rtl" className="font-quran text-bronze text-[22px] leading-[1.9]">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
          </div>
          <h1 className="animate-fade-up text-[clamp(44px,6.2vw,84px)] leading-[0.98] [animation-delay:100ms]">
            Quran lessons your child will <em className="text-brand">look forward&nbsp;to</em>
          </h1>
          <p className="animate-fade-up text-muted max-w-[560px] text-[19px] text-pretty [animation-delay:200ms]">
            Gentle, one-on-one classes with {site.teacher.name}, from the very first letter to beautiful
            Tajweed. After-school and weekend times for families in the UK, US and Europe.
          </p>
          <div className="animate-fade-up [animation-delay:300ms]">
            <TrialFinder />
          </div>
          <div className="animate-fade-up flex flex-wrap items-center gap-x-6 gap-y-3 [animation-delay:400ms]">
            <RatingBadge />
            <ul className="text-muted flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {promises.map((p) => (
                <li key={p} className="inline-flex items-center gap-1.5">
                  <Icon name="check" size={16} strokeWidth={2.6} className="text-brand" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="animate-fade-up min-w-0 [animation-delay:250ms]">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
