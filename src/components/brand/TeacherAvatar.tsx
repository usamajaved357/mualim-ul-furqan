import { site } from '@/config/site';
import { cn } from '@/lib/cn';

/**
 * The teacher's photo as a small framed portrait: the whole head-and-shoulders cut-out (1000×1236), uncropped,
 * on parchment (which hides the cut-out's light edges), with the shoulders fading out at the bottom.
 *
 * Give it a frame with the photo's own 4:5 proportions and an arched top, plus a ring, through `className`:
 * e.g. "h-24 w-[78px] rounded-t-full rounded-b-2xl ring-2 ring-[#e9c77a]".
 */
export function TeacherAvatar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative block shrink-0 overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,#fffbf2,#ecdcb2)]',
        className,
      )}
    >
      <img
        src={site.teacher.photo}
        alt=""
        width={1000}
        height={1236}
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />
      {/* The shoulders fade into the frame, so the photo's straight bottom edge never shows. */}
      <span className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#0b3a2d]/70 to-transparent" />
    </span>
  );
}
