import type { ReactNode } from 'react';
import { AL_FATIHA, MushafPanel } from '@/components/mockups';
import { Icon, type IconName } from '@/components/ui';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

const controls: IconName[] = ['mic', 'video', 'hand', 'present'];

/** Bars that pulse while a participant is speaking. */
function SpeakingBars() {
  return (
    <span className="flex h-3 items-end gap-[2px]">
      {[0.55, 1, 0.7].map((h, i) => (
        <span
          key={i}
          className="animate-blink w-[3px] rounded-full bg-white"
          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  );
}

interface ParticipantProps {
  initial: string;
  name: string;
  /** Teacher or student, shown under the name. */
  duty: string;
  avatar: string;
  speaking?: boolean;
}

/** A person in the call: initial avatar, name and duty, and whether they are speaking. */
function Participant({ initial, name, duty, avatar, speaking = false }: ParticipantProps) {
  return (
    <div className="bg-parchment flex min-w-0 items-center gap-2.5 rounded-2xl px-2.5 py-2">
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white',
          avatar,
          speaking && 'ring-brand-light ring-2 ring-offset-2 ring-offset-white',
        )}
      >
        {initial}
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-[13px] font-bold">{name}</span>
        <span className="text-muted text-[11px] font-semibold">{duty}</span>
      </span>
      {speaking ? (
        <span className="bg-brand ml-auto flex size-6 shrink-0 items-center justify-center rounded-full">
          <SpeakingBars />
        </span>
      ) : (
        <Icon name="mic-off" size={15} strokeWidth={2} className="text-muted ml-auto shrink-0" />
      )}
    </div>
  );
}

function FloatingCard({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'border-line shadow-float absolute flex items-center gap-3 rounded-2xl border bg-white/95 py-2 pr-4 pl-2 backdrop-blur',
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * A live one-to-one lesson drawn as a light Google Meet window: the shared mushaf with the ayah being read,
 * in-call feedback and the two people in the class. Decorative, so hidden from assistive tech.
 */
export function HeroVisual() {
  return (
    <div className="relative pt-9 pb-11 sm:px-5" aria-hidden>
      <div className="from-brand-light/35 via-gold/30 to-sky absolute inset-x-6 top-16 bottom-8 rounded-[48px] bg-gradient-to-br blur-3xl" />

      <div className="border-line shadow-float relative overflow-hidden rounded-[30px] border bg-white">
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
          <MushafPanel
            layout="lines"
            title="سُورَةُ ٱلْفَاتِحَةِ"
            ayat={AL_FATIHA.slice(0, 4)}
            activeIndex={1}
          />
          <div className="bg-mint flex items-center gap-2.5 rounded-2xl px-3 py-2.5">
            <span className="bg-brand flex size-7 shrink-0 items-center justify-center rounded-full text-white">
              <Icon name="check" size={14} strokeWidth={2.8} />
            </span>
            <p className="text-[13px] leading-snug">
              <span className="font-bold">Ayah 2, well done!</span>{' '}
              <span className="text-muted">Makharij correct.</span>
            </p>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Participant initial="Q" name={site.teacher.name} duty="Teacher" avatar="bg-brand" speaking />
            <Participant initial="A" name="Aisha" duty="Student" avatar="bg-lilac-ink" />
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

      <FloatingCard className="animate-float top-0 right-0">
        <span className="bg-sky text-sky-ink flex size-10 items-center justify-center rounded-xl">
          <Icon name="eye" size={20} strokeWidth={2} />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-muted text-xs font-semibold">Parents welcome</span>
          <span className="text-[15px] font-bold">Watch any lesson</span>
        </span>
      </FloatingCard>

      <FloatingCard className="animate-float-alt bottom-0 left-0 [animation-delay:1.2s]">
        <span className="bg-sand text-bronze flex size-10 items-center justify-center rounded-xl">
          <Icon name="calendar" size={20} strokeWidth={2} />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-muted text-xs font-semibold">Next class</span>
          <span className="text-[15px] font-bold">Today · 5:30 PM</span>
        </span>
      </FloatingCard>
    </div>
  );
}
