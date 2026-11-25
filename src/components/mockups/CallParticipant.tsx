import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';

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

interface CallParticipantProps {
  initial: string;
  name: string;
  /** Shown under the name, e.g. "Teacher" or "Watching". */
  duty: string;
  /** Avatar background colour class. */
  avatar: string;
  speaking?: boolean;
  /** "dark" for the night-mode call window. */
  tone?: 'light' | 'dark';
  className?: string;
}

/** A person in a light call mockup: initial avatar, name and duty, and whether they are speaking. */
export function CallParticipant({
  initial,
  name,
  duty,
  avatar,
  speaking = false,
  tone = 'light',
  className,
}: CallParticipantProps) {
  const dark = tone === 'dark';
  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-2.5 rounded-2xl px-2.5 py-2',
        dark ? 'border border-white/8 bg-white/[0.05]' : 'bg-parchment',
        className,
      )}
    >
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white',
          avatar,
          speaking && 'ring-brand-light ring-2 ring-offset-2',
          speaking && (dark ? 'ring-offset-[#0b221b]' : 'ring-offset-white'),
        )}
      >
        {initial}
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className={cn('truncate text-[13px] font-bold', dark ? 'text-white' : 'text-ink')}>{name}</span>
        <span className={cn('text-[11px] font-semibold', dark ? 'text-mist' : 'text-muted')}>{duty}</span>
      </span>
      {speaking ? (
        <span className="bg-brand ml-auto flex size-6 shrink-0 items-center justify-center rounded-full">
          <SpeakingBars />
        </span>
      ) : (
        <Icon
          name="mic-off"
          size={15}
          strokeWidth={2}
          className={cn('ml-auto shrink-0', dark ? 'text-mist' : 'text-muted')}
        />
      )}
    </div>
  );
}
