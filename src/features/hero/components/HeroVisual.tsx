import { useEffect, useState } from 'react';
import { AL_FATIHA, CallParticipant, MushafPanel } from '@/components/mockups';
import { Icon, type IconName } from '@/components/ui';
import { site } from '@/config/site';
import { useTilt } from '@/hooks/usePointerEffects';
import { cn } from '@/lib/cn';

const AYAT = AL_FATIHA.slice(0, 4);
/** What the teacher says after each ayah, in step with the highlighted line. */
const feedback = [
  { title: 'Bismillah, beautiful start!', note: 'Clear and steady.' },
  { title: 'Ayah 2, well done!', note: 'Makharij correct.' },
  { title: 'Ayah 3, lovely madd.', note: 'Two counts, just right.' },
  { title: 'Ayah 4, masha Allah!', note: 'Ready for the next page.' },
];

/** Steps through the ayat like a student reading, one every few seconds (stays put with reduced motion). */
function useReadingLine(count: number, ms = 3200) {
  const [line, setLine] = useState(1);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setLine((l) => (l + 1) % count), ms);
    return () => window.clearInterval(id);
  }, [count, ms]);
  return line;
}

const controls: IconName[] = ['mic', 'video', 'hand', 'present'];

interface NotificationProps {
  icon: IconName;
  /** Gradient for the app-style icon tile. */
  iconTint: string;
  title: string;
  time: string;
  message: string;
  className: string;
}

/** Phone-style notification: gradient app icon, title with a timestamp, and a one-line message. */
function Notification({ icon, iconTint, title, time, message, className }: NotificationProps) {
  return (
    <div
      className={cn(
        'absolute z-10 flex w-[230px] items-start gap-3 rounded-[22px] bg-white/[0.93] p-3 shadow-[inset_0_1px_0_white,0_30px_60px_-24px_rgb(0_0_0/0.7)] backdrop-blur-xl sm:w-[250px]',
        className,
      )}
    >
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-[13px] bg-gradient-to-br text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]',
          iconTint,
        )}
      >
        <Icon name={icon} size={19} strokeWidth={2.2} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[13px] font-bold">{title}</span>
          <span className="text-muted shrink-0 text-[11px] font-medium">{time}</span>
        </span>
        <span className="text-muted text-[12.5px] leading-snug">{message}</span>
      </span>
    </div>
  );
}

/**
 * A live one-to-one lesson drawn as a light Google Meet window: the shared mushaf with the ayah being read,
 * in-call feedback and the two people in the class. Decorative, so hidden from assistive tech.
 */
export function HeroVisual() {
  const tilt = useTilt<HTMLDivElement>(5);
  const line = useReadingLine(AYAT.length);
  const said = feedback[line] ?? feedback[0]!;
  return (
    <div ref={tilt} className="tilt text-ink relative pt-16 pb-16 sm:px-5 sm:pt-10 sm:pb-12" aria-hidden>
      <div className="from-brand-light/50 via-gold/25 absolute inset-x-6 top-16 bottom-8 rounded-[48px] bg-gradient-to-br to-transparent blur-3xl" />

      <div className="border-glow relative overflow-hidden rounded-[30px] bg-white shadow-[0_50px_100px_-40px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_255_255/0.08)]">
        <div className="border-line flex items-center gap-3 border-b px-4 py-3 sm:px-5">
          <span className="bg-mint text-brand flex size-9 shrink-0 items-center justify-center rounded-xl">
            <Icon name="video" size={18} strokeWidth={2} />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[14px] font-bold">Nazra lesson</span>
            <span className="text-muted inline-flex items-center gap-1.5 text-xs">
              Google Meet ·
              <span className="text-rose-ink inline-flex items-center gap-1 font-bold">
                <span className="bg-rec animate-blink size-1.5 rounded-full" />
                Live 12:40
              </span>
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-3 p-3 sm:p-4">
          <MushafPanel title="سُورَةُ ٱلْفَاتِحَةِ" ayat={AYAT} activeIndex={line} />
          <div className="bg-mint flex items-center gap-2.5 overflow-hidden rounded-2xl px-3 py-2.5">
            <span className="bg-brand flex size-7 shrink-0 items-center justify-center rounded-full text-white">
              <Icon name="check" size={14} strokeWidth={2.8} />
            </span>
            <p key={line} className="animate-fade-up text-[13px] leading-snug [animation-duration:0.6s]">
              <span className="font-bold">{said.title}</span> <span className="text-muted">{said.note}</span>
            </p>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <CallParticipant initial="Q" name={site.teacher.name} duty="Teacher" avatar="bg-brand" speaking />
            <CallParticipant initial="A" name="Aisha" duty="Student" avatar="bg-gold-deep" />
          </div>
        </div>

        <div className="border-line flex items-center justify-center gap-2 border-t px-4 py-3">
          {controls.map((icon) => (
            <span
              key={icon}
              className="bg-cream text-ink flex size-9 items-center justify-center rounded-full"
            >
              <Icon name={icon} size={17} />
            </span>
          ))}
          <span className="bg-hangup ml-1 flex h-9 w-14 items-center justify-center rounded-full text-white">
            <Icon name="hangup" size={18} />
          </span>
        </div>
      </div>

      <Notification
        className="animate-float top-0 right-0"
        icon="eye"
        iconTint="from-brand-light to-brand"
        title="Parents welcome"
        time="now"
        message="Join from anywhere and watch the lesson live."
      />

      <Notification
        className="animate-float-alt bottom-0 left-0 [animation-delay:1.2s]"
        icon="calendar"
        iconTint="from-amber to-gold-deep"
        title="Next class"
        time="in 2h"
        message="Nazra · today at 5:30 PM"
      />
    </div>
  );
}
