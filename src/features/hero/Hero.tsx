import type { CSSProperties } from 'react';
import { GirihPattern } from '@/components/decor/GirihPattern';
import { Rosette } from '@/components/decor/Rosette';
import { Container, Eyebrow, SplitWords, StarGlyph } from '@/components/ui';
import { site } from '@/config/site';
import { HeroVisual } from './components/HeroVisual';
import { RatingBadge } from './components/RatingBadge';
import { TrialFinder } from './components/TrialFinder';

const promises = ['First class free', 'No card needed', 'Parents can watch every lesson'];

/** Fixed positions for the twinkling stars, so the sky looks the same on every render. */
const stars = [
  [8, 18, 0],
  [18, 62, 1.2],
  [31, 9, 2.1],
  [44, 78, 0.6],
  [57, 22, 1.8],
  [66, 88, 2.6],
  [74, 12, 0.9],
  [86, 54, 1.5],
  [93, 30, 2.9],
  [38, 46, 3.3],
] as const;

/**
 * Night-sky hero in deep emerald: drifting aurora light, a faint girih lattice, a slowly turning rosette behind
 * the live-lesson mockup, and a headline that rises in word by word. Marked `data-dark` so the header switches
 * to its dark glass while it sits over this band.
 */
export function Hero() {
  return (
    <section data-dark className="bg-abyss grain relative -mt-[76px] overflow-hidden pt-[76px] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="animate-aurora absolute -top-1/3 -left-1/4 size-[900px] rounded-full bg-[radial-gradient(circle,rgb(25_162_122/0.42),transparent_62%)]" />
        <span className="animate-aurora absolute -right-1/4 -bottom-1/2 size-[1000px] rounded-full bg-[radial-gradient(circle,rgb(229_154_31/0.22),transparent_60%)] [animation-delay:-9s]" />
        <span className="absolute top-1/4 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(12_122_91/0.25),transparent_65%)]" />
        <GirihPattern
          tone="dark"
          className="[mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black,transparent)] opacity-70"
        />
        <Rosette
          opacity={0.2}
          className="top-1/2 right-[-12%] size-[820px] -translate-y-1/2 lg:right-[-6%]"
        />
        <Rosette
          opacity={0.12}
          reverse
          className="top-1/2 right-[2%] hidden size-[520px] -translate-y-1/2 lg:block"
        />
        {stars.map(([x, y, delay]) => (
          <StarGlyph
            key={`${x}-${y}`}
            className="animate-twinkle text-gold absolute size-2"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }}
          />
        ))}
        <div className="from-abyss absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
      </div>

      <Container className="relative grid items-center gap-14 pt-14 pb-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-12 lg:pt-20 lg:pb-24">
        <div className="flex min-w-0 flex-col gap-7">
          <div className="animate-fade-up flex flex-col gap-3">
            <p
              lang="ar"
              dir="rtl"
              className="font-quran text-gold-leaf w-fit text-[clamp(26px,2.6vw,34px)] leading-[1.9]"
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <Eyebrow tone="dark">Live 1-on-1 classes on Google Meet</Eyebrow>
          </div>

          <h1
            className="split-play [&_em]:text-gold text-[clamp(44px,6vw,86px)] leading-[1] font-[600] tracking-[-0.045em] text-white"
            style={{ '--split-delay': '120ms' } as CSSProperties}
          >
            <SplitWords>
              Quran lessons your child will <em>look forward&nbsp;to</em>
            </SplitWords>
          </h1>

          <p className="animate-fade-up text-mist max-w-[540px] text-[19px] text-pretty [animation-delay:500ms]">
            Gentle, one-on-one classes with {site.teacher.name}, from the very first letter to beautiful
            Tajweed and Hifz. Classes every day for families in the UK, US and Europe, in your own time zone.
          </p>

          <div className="animate-fade-up [animation-delay:650ms]">
            <TrialFinder />
          </div>

          <div className="animate-fade-up flex flex-col gap-4 [animation-delay:800ms] sm:flex-row sm:items-center sm:gap-6">
            <RatingBadge tone="dark" />
            <ul className="text-mist flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px] font-semibold">
              {promises.map((p, i) => (
                <li key={p} className="inline-flex items-center gap-3">
                  {i > 0 && <StarGlyph className="text-gold/60 size-2" />}
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="animate-scale-in min-w-0 [animation-delay:350ms]">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
