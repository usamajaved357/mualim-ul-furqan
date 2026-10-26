import { GirihPattern } from '@/components/decor/GirihPattern';
import { PlayGlyph, Reveal } from '@/components/ui';
import { cn } from '@/lib/cn';
import { videoTestimonials } from '../data';

/** Video review slots. Swap each tile for a <video> or YouTube embed when recorded. */
export function VideoTestimonials() {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
      {videoTestimonials.map((v, i) => (
        <Reveal as="li" key={v.id} delay={i * 80}>
          <div
            className={cn(
              'lift relative flex aspect-video items-end overflow-hidden rounded-[22px] p-5',
              v.tone,
            )}
          >
            <GirihPattern tone="dark" />
            <button
              type="button"
              aria-label={`Play: ${v.title}`}
              className="bg-gold text-night absolute top-1/2 left-1/2 flex size-15 -translate-1/2 cursor-pointer items-center justify-center rounded-full transition hover:scale-105"
            >
              <PlayGlyph />
            </button>
            <span className="relative text-[15px] font-bold text-white">
              {v.title}
              {v.meta && <span className="text-sage font-semibold"> · {v.meta}</span>}
            </span>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
