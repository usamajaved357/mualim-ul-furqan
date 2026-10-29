import { cn } from '@/lib/cn';
import { Icon, type IconName } from '@/components/ui';

function RoundButton({ icon, active, className }: { icon: IconName; active?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-full sm:size-9',
        active ? 'bg-[#a8c7fa] text-[#062e6f]' : 'bg-call-3 text-[#e8eaed]',
        className,
      )}
    >
      <Icon name={icon} size={16} strokeWidth={2} />
    </span>
  );
}

interface CallControlsProps {
  time: string;
  meetingCode: string;
  participants: number;
  /** Compact bar for small frames: hides the side groups. */
  compact?: boolean;
}

/** Bottom toolbar of a video call: clock and code, centre controls, side panels. */
export function CallControls({ time, meetingCode, participants, compact = false }: CallControlsProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-3.5 pt-1 pb-3 text-[#e8eaed]" aria-hidden>
      {!compact && (
        <span className="hidden min-w-0 truncate text-[13px] font-medium md:block">
          {time} <span className="text-[#9aa0a6]">|</span> {meetingCode}
        </span>
      )}
      <span className={cn('flex items-center gap-1.5 sm:gap-2', compact && 'mx-auto')}>
        <RoundButton icon="mic" />
        <RoundButton icon="video" />
        {!compact && <RoundButton icon="captions" className="max-sm:hidden" />}
        <RoundButton icon="hand" />
        <RoundButton icon="present" active />
        <RoundButton icon="more" />
        <span className="bg-hangup flex h-8 w-12 items-center justify-center rounded-full text-white sm:h-9 sm:w-14">
          <Icon name="hangup" size={18} strokeWidth={0} fill="currentColor" />
        </span>
      </span>
      {!compact && (
        <span className="hidden items-center gap-3.5 text-[#e8eaed] md:flex">
          <Icon name="info" size={17} />
          <span className="relative">
            <Icon name="users" size={17} />
            <span className="bg-call-blue text-call absolute -top-1.5 -right-2 rounded-full px-1 text-[9px] font-bold">
              {participants}
            </span>
          </span>
          <Icon name="chat" size={17} />
          <Icon name="grid" size={17} />
        </span>
      )}
    </div>
  );
}

export function RecIndicator({ label = 'REC' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-bold text-[#f2a7a3]">
      <span className="animate-blink bg-rec size-2 rounded-full" />
      {label}
    </span>
  );
}
