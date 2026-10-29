import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';

interface VideoTileProps {
  label: string;
  /** Camera feed stand-in. Without it the tile shows a call-style initial avatar (camera off). */
  photo?: string;
  avatarClassName?: string;
  speaking?: boolean;
  muted?: boolean;
  ratio?: 'wide' | 'standard';
  className?: string;
}

/** A participant tile in the video-call mockups. */
export function VideoTile({
  label,
  photo,
  avatarClassName = 'bg-[#5f8f7e]',
  speaking = false,
  muted = false,
  ratio = 'wide',
  className,
}: VideoTileProps) {
  return (
    <div
      className={cn(
        'bg-call-3 relative flex items-center justify-center overflow-hidden rounded-[12px]',
        ratio === 'wide' ? 'aspect-[16/10]' : 'aspect-[4/3]',
        speaking && 'ring-call-blue ring-[2.5px] ring-inset',
        className,
      )}
    >
      {photo ? (
        <img src={photo} alt="" className="absolute inset-0 size-full object-cover object-[50%_25%]" />
      ) : (
        <span
          className={cn(
            'flex aspect-square w-[30%] max-w-16 min-w-9 items-center justify-center rounded-full text-[clamp(14px,2vw,24px)] font-semibold text-white',
            avatarClassName,
          )}
        >
          {label.charAt(0)}
        </span>
      )}
      <span className="absolute top-1.5 right-1.5 flex size-5.5 items-center justify-center rounded-full bg-black/45 text-white">
        {muted ? (
          <Icon name="mic-off" size={12} strokeWidth={2.2} />
        ) : (
          <span className="flex h-2.5 items-end gap-[2px]" aria-hidden>
            {[0.5, 1, 0.7].map((h, i) => (
              <span
                key={i}
                className={cn('bg-call-blue w-[2.5px] rounded-full', speaking && 'animate-blink')}
                style={{ height: `${speaking ? h * 100 : 30}%`, animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </span>
        )}
      </span>
      <span className="absolute bottom-1.5 left-2 max-w-[85%] truncate text-[11px] font-semibold text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.8)]">
        {label}
      </span>
    </div>
  );
}
