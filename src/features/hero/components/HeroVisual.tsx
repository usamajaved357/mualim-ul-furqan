import type { ReactNode } from 'react';
import { AL_FATIHA, CallControls, MushafPanel, RecIndicator, VideoTile } from '@/components/mockups';
import { Icon } from '@/components/ui';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

function FloatingCard({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'border-line absolute z-10 flex items-center gap-3 rounded-2xl border bg-white/95 px-4 py-3 shadow-[0_24px_44px_-22px_rgb(10_42_36/0.5)] backdrop-blur',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Live Google Meet class on a tablet, with floating status cards. Decorative, so hidden from assistive tech. */
export function HeroVisual() {
  return (
    <div className="relative px-2.5 py-10" aria-hidden>
      <div
        className="from-gold/50 via-gold-deep/20 absolute inset-x-8 top-16 bottom-4 -z-0 rounded-[40px] bg-gradient-to-br to-transparent blur-2xl"
        aria-hidden
      />
      <div className="relative rounded-[34px] bg-[#0c0d0f] p-2.5 shadow-[0_50px_90px_-40px_rgb(10_42_36/0.8),inset_0_0_0_1.5px_#2b2d31]">
        <div className="bg-call overflow-hidden rounded-[26px]">
          <div className="flex items-center justify-between px-4 pt-3 pb-2 text-xs font-medium text-[#e8eaed]">
            <span className="inline-flex items-center gap-2">
              <Icon name="lock" size={12} strokeWidth={2.4} className="text-[#9aa0a6]" />
              Nazra lesson · Google Meet
            </span>
            <RecIndicator label="Live" />
          </div>
          <div className="flex gap-2.5 px-2.5">
            <MushafPanel
              className="min-w-0 flex-1"
              size="sm"
              title="سُورَةُ ٱلْفَاتِحَةِ"
              ayat={AL_FATIHA.slice(0, 4)}
              activeIndex={1}
            />
            <div className="flex w-[30%] shrink-0 flex-col gap-2.5">
              <VideoTile label={site.teacher.name} photo={site.teacher.photo} ratio="standard" speaking />
              <VideoTile label="Student" ratio="standard" avatarClassName="bg-[#c58af9]" />
            </div>
          </div>
          <div className="pt-3">
            <CallControls time="5:30 PM" meetingCode="" participants={2} compact />
          </div>
        </div>
      </div>

      <FloatingCard className="animate-float top-0 -left-4">
        <img
          src={site.teacher.photo}
          alt=""
          className="size-11 rounded-xl object-cover object-top ring-2 ring-white"
        />
        <span className="flex flex-col leading-tight">
          <span className="text-muted text-xs font-semibold">Your teacher</span>
          <span className="text-[15px] font-extrabold">{site.teacher.name}</span>
        </span>
      </FloatingCard>

      <FloatingCard className="animate-float-alt top-[44%] -right-3">
        <span className="bg-brand flex size-9 items-center justify-center rounded-full text-white">
          <Icon name="check" size={18} strokeWidth={2.6} />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-extrabold">Ayah 2 · well done!</span>
          <span className="text-muted text-xs">Makharij correct</span>
        </span>
      </FloatingCard>

      <FloatingCard className="animate-float bottom-0 left-[6%] [animation-delay:1.2s]">
        <span className="bg-mint text-brand flex size-10 items-center justify-center rounded-xl">
          <Icon name="calendar" size={20} strokeWidth={2} />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-muted text-xs font-semibold">Next class · Google Meet</span>
          <span className="text-[15px] font-extrabold">Today · 5:30 PM London</span>
        </span>
      </FloatingCard>
    </div>
  );
}
