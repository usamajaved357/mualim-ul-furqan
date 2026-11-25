import { site } from '@/config/site';
import { cn } from '@/lib/cn';

/**
 * The teacher's head-and-shoulders cut-out, framed for a small avatar. The photo (1000×1236) is sized so the
 * complete head (hair to beard) shows, centred, with a little headroom. It sits on parchment, which hides the
 * cut-out's light edges.
 * Size, shape and ring come from `className` (e.g. "size-12 rounded-full ring-2 ring-gold").
 */
export function TeacherAvatar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative block shrink-0 overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#fffbf2,#ecdcb2)]',
        className,
      )}
    >
      {/* Just wider than the frame: the whole head, from the top of the hair to the end of the beard, fits
          inside with a little headroom, and the shoulders run out at the bottom edge. */}
      <img
        src={site.teacher.photo}
        alt=""
        width={1000}
        height={1236}
        className="absolute top-[2%] left-[-2%] w-[104%] max-w-none"
      />
    </span>
  );
}
