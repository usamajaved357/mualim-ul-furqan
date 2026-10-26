import type { ReactNode } from 'react';
import { AL_FATIHA, MushafPanel, VideoTile } from '@/components/mockups';
import { Icon } from '@/components/ui';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

function FloatingCard({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'border-line absolute flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-[0_24px_44px_-22px_rgb(10_42_36/0.5)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Live-class preview with floating status cards. Decorative, so hidden from assistive tech. */
export function HeroVisual() {
  return (
    <div className="relative px-2.5 py-8" aria-hidden>
      <div className="bg-night rounded-[28px] p-3.5 shadow-[0_50px_90px_-40px_rgb(10_42_36/0.7)]">
        <div className="text-mist flex items-center justify-between px-2 pt-1 pb-3 text-xs font-semibold">
          <span className="inline-flex items-center gap-2">
            <span className="animate-blink bg-rec size-2 rounded-full" />
            Live · Nazra lesson
          </span>
          <span>30:00</span>
        </div>
        <MushafPanel title="سُورَةُ ٱلْفَاتِحَةِ" ayat={AL_FATIHA.slice(0, 4)} activeIndex={1} />
        <div className="grid grid-cols-2 gap-2.5 pt-2.5">
          <VideoTile label={site.teacher.name} kind="teacher" speaking />
          <VideoTile label="Student" />
        </div>
      </div>

      <FloatingCard className="animate-float top-0 -left-4">
        <span className="bg-mint text-brand flex size-10 items-center justify-center rounded-xl">
          <Icon name="calendar" size={20} strokeWidth={2} />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-muted text-xs font-semibold">Next class</span>
          <span className="text-[15px] font-extrabold">Today · 5:30 PM London</span>
        </span>
      </FloatingCard>

      <FloatingCard className="animate-float-alt top-[42%] -right-2.5">
        <span className="bg-brand flex size-9 items-center justify-center rounded-full text-white">
          <Icon name="check" size={18} strokeWidth={2.6} />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-extrabold">Ayah 2 · well done!</span>
          <span className="text-muted text-xs">Makharij correct</span>
        </span>
      </FloatingCard>

      <FloatingCard className="animate-float bottom-0 left-[6%] rounded-full py-2.5 [animation-delay:1.2s]">
        <Icon name="eye" size={20} strokeWidth={2} className="text-bronze" />
        <span className="text-sm font-bold">Parent watching</span>
      </FloatingCard>
    </div>
  );
}
