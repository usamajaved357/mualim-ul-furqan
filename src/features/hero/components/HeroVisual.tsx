import type { ReactNode } from 'react';
import { AL_FATIHA, CallControls, MushafPanel, RecIndicator, VideoTile } from '@/components/mockups';
import { Icon } from '@/components/ui';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

function FloatingCard({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'border-line shadow-float absolute z-10 flex items-center gap-3 rounded-[20px] border bg-white/95 px-4 py-3 backdrop-blur',
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
        aria-hidden
        className="from-brand-light/40 to-gold-deep/30 absolute inset-x-6 top-14 bottom-2 rounded-[48px] bg-gradient-to-br blur-3xl"
      />
      <div className="relative rotate-[1.5deg] rounded-[36px] bg-[#0c0d0f] p-2.5 shadow-[0_60px_100px_-40px_rgb(15_31_26/0.6),inset_0_0_0_1.5px_#2b2d31] transition-transform duration-700 hover:rotate-0">
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
              <VideoTile label={site.teacher.name} ratio="standard" avatarClassName="bg-brand" speaking />
              <VideoTile label="Student" ratio="standard" avatarClassName="bg-[#c58af9]" />
            </div>
          </div>
          <div className="pt-3">
            <CallControls time="5:30 PM" meetingCode="" participants={2} compact />
          </div>
        </div>
      </div>

      <FloatingCard className="animate-float top-0 -left-4">
        <span className="bg-sky text-sky-ink flex size-10 items-center justify-center rounded-full">
          <Icon name="user" size={20} strokeWidth={1.8} />
        </span>
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
        <span className="bg-sand text-bronze flex size-10 items-center justify-center rounded-full">
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
