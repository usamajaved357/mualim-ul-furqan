import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';

interface VideoTileProps {
  label: string;
  speaking?: boolean;
  kind?: 'teacher' | 'student';
  ratio?: 'wide' | 'standard';
  className?: string;
}

/** Placeholder participant tile for the classroom mockups. */
export function VideoTile({
  label,
  speaking = false,
  kind = 'student',
  ratio = 'wide',
  className,
}: VideoTileProps) {
  return (
    <div
      className={cn(
        'from-night-3 relative flex items-center justify-center rounded-[14px] bg-gradient-to-br to-[#12362f]',
        ratio === 'wide' ? 'aspect-[16/10]' : 'aspect-[4/3]',
        speaking && 'outline-live outline-2',
        className,
      )}
    >
      <Icon
        name="user"
        size={kind === 'teacher' ? 40 : 32}
        strokeWidth={1.4}
        className={kind === 'teacher' ? 'text-gold' : 'text-mist'}
      />
      <span className="absolute bottom-1.5 left-2 rounded-md bg-black/45 px-2 py-0.5 text-[11px] font-bold text-white">
        {label}
      </span>
    </div>
  );
}
