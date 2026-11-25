import { useEffect, useState, type CSSProperties } from 'react';
import { TeacherAvatar } from '@/components/brand/TeacherAvatar';
import { AL_FATIHA } from '@/components/mockups';
import { Icon, StarGlyph } from '@/components/ui';
import { site } from '@/config/site';
import { useTilt } from '@/hooks/usePointerEffects';
import { cn } from '@/lib/cn';

const AYAT = AL_FATIHA.slice(0, 4);
const READ_MS = 3400;

/** What the teacher says after each ayah, in step with the line being read. */
const feedback = [
  { title: 'Bismillah, beautiful start', note: 'Clear and steady.' },
  { title: 'Ayah 2, well done', note: 'Makharij correct.' },
  { title: 'Lovely madd on ayah 3', note: 'Two counts, just right.' },
  { title: 'Ayah 4, masha Allah', note: 'Ready for the next page.' },
];

/** Steps through the ayat like a student reading, one every few seconds (stays put with reduced motion). */
function useReadingLine(count: number) {
  const [line, setLine] = useState(1);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setLine((l) => (l + 1) % count), READ_MS);
    return () => window.clearInterval(id);
  }, [count]);
  return line;
}

/** Three bars that bounce while someone is speaking. */
function SpeakingBars({ className }: { className?: string }) {
  return (
    <span className={cn('flex h-3.5 items-end gap-[3px]', className)}>
      {[0.5, 1, 0.7, 0.9].map((h, i) => (
        <span
          key={i}
          className="animate-blink w-[3px] rounded-full bg-current"
          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </span>
  );
}

const corners = ['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'];

/**
 * The hero's picture of a lesson, drawn as an illuminated mushaf page rather than an app window: a parchment
 * page in a double gold frame, the surah title in a cartouche, and a gold band that sweeps along each ayah as it
 * is read (right to left, like the script). Around it: the teacher teaching live, the teacher's feedback for
 * the current ayah, and a parent watching. Decorative, so hidden from assistive tech.
 */
export function HeroVisual() {
  const tilt = useTilt<HTMLDivElement>(4);
  const line = useReadingLine(AYAT.length);
  const said = feedback[line] ?? feedback[0]!;

  return (
    <div ref={tilt} className="tilt relative mx-auto max-w-[580px] px-1 pt-16 pb-20 sm:px-8" aria-hidden>
      <div className="absolute inset-x-0 top-10 bottom-6 rounded-full bg-[radial-gradient(closest-side,rgb(247_213_139/0.28),transparent)]" />

      {/* The page */}
      <div className="relative rounded-[34px] bg-[linear-gradient(180deg,#fdf7e7,#f6e8c8)] p-2.5 shadow-[inset_0_1px_0_white,0_0_0_1px_#e6cf95,0_70px_120px_-50px_rgb(0_0_0/0.95)] sm:p-3">
        <div className="rounded-[27px] border border-[#cfa955] p-1.5">
          <div className="relative rounded-[22px] border border-[#e3c886] px-4 pt-7 pb-8 sm:px-8">
            {corners.map((c) => (
              <StarGlyph key={c} className={cn('absolute size-3 text-[#c99a45]', c)} />
            ))}

            <div className="mx-auto mb-4 flex w-fit items-center gap-3 rounded-full border border-[#d9b871] bg-[linear-gradient(180deg,#fff7e2,#f8e6bb)] px-5 shadow-[inset_0_1px_0_white]">
              <StarGlyph className="size-2.5 text-[#c99a45]" />
              {/* The surah title is a heading, so it takes the calligraphy font; the ayat stay in Amiri Quran. */}
              <p lang="ar" dir="rtl" className="font-calligraphy text-bronze text-[22px] leading-[1.9]">
                سورة الفاتحة
              </p>
              <StarGlyph className="size-2.5 text-[#c99a45]" />
            </div>

            <ol lang="ar" dir="rtl" className="flex flex-col gap-1.5 text-center">
              {AYAT.map((ayah, i) => {
                const active = i === line;
                return (
                  <li
                    key={ayah.number}
                    className={cn(
                      'font-calligraphy relative mx-auto w-fit rounded-2xl px-4 text-[27px] leading-[2.2] transition-colors duration-700 sm:text-[31px]',
                      active ? 'text-[#13251f]' : 'text-[#13251f]/75',
                    )}
                  >
                    {/* The reading band: grows from the right edge across the ayah while it is read. */}
                    <span
                      key={active ? `on-${line}` : 'off'}
                      className={cn(
                        'absolute inset-0 origin-right rounded-2xl bg-[linear-gradient(270deg,#f3d98f,#f8e7b8_70%,#fbefd0)] shadow-[inset_0_0_0_1px_#e2c071]',
                        active
                          ? 'animate-[grow-x_3.2s_cubic-bezier(0.4,0,0.2,1)_both]'
                          : 'scale-x-0 opacity-0',
                      )}
                      style={{ transformOrigin: 'right center' } as CSSProperties}
                    />
                    <span className="relative">
                      {ayah.text}
                      <span className="ayah-mark">{`۝${ayah.number}`}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* Teacher, live */}
      <div className="card-night absolute top-0 left-0 flex items-center gap-3 rounded-[22px] py-3 pr-4 pl-3 sm:-left-2">
        <TeacherAvatar className="h-[68px] w-[55px] rounded-t-full rounded-b-xl ring-2 ring-[#e9c77a] ring-offset-2 ring-offset-[#072a20]" />
        <span className="flex flex-col leading-tight">
          <span className="text-[14px] font-bold">{site.teacher.name}</span>
          <span className="text-live inline-flex items-center gap-2 text-[12px] font-semibold">
            <SpeakingBars />
            Teaching live · Google Meet
          </span>
        </span>
      </div>

      {/* Parent watching */}
      <div className="card-night absolute top-[38%] -right-2 hidden items-center gap-2.5 rounded-full py-2 pr-4 pl-2 sm:flex">
        <span className="bg-gold/15 text-gold flex size-8 items-center justify-center rounded-full">
          <Icon name="eye" size={16} strokeWidth={2.2} />
        </span>
        <span className="text-[12.5px] leading-tight font-semibold">
          Mum is watching
          <span className="text-mist block text-[11px] font-medium">from work</span>
        </span>
      </div>

      {/* Feedback for the current ayah */}
      <div className="card absolute right-0 bottom-0 flex w-[260px] items-center gap-3 rounded-[22px] p-3 sm:right-2">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#14916c,#0a6a4f)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3)]">
          <Icon name="check" size={18} strokeWidth={2.8} />
        </span>
        <p key={line} className="animate-fade-up text-ink text-[13px] leading-snug [animation-duration:0.6s]">
          <span className="block font-bold">{said.title}</span>
          <span className="text-muted">{said.note}</span>
        </p>
      </div>
    </div>
  );
}
