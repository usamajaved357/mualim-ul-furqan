import { AL_FATIHA, MushafPanel, VideoTile, WindowChrome } from '@/components/mockups';
import { Icon } from '@/components/ui';
import { site } from '@/config/site';
import { tajweedTags } from '../data';

/** Mock Zoom classroom showing a Tajweed lesson in progress. */
export function ClassroomWindow() {
  return (
    <figure className="border-gold/30 bg-night-2 m-0 overflow-hidden rounded-3xl border shadow-[0_50px_90px_-40px_rgb(0_0_0/0.85)]">
      <WindowChrome title="Tajweed · Lesson [8] · Noon sakinah" />
      <div className="flex flex-wrap gap-3.5 p-4">
        <MushafPanel
          className="min-w-0 flex-[999_1_320px]"
          ayat={AL_FATIHA.slice(4)}
          activeIndex={1}
          footer={
            <ul
              className="flex flex-wrap gap-1.5 px-1 pt-2.5 pb-0.5 text-xs font-bold"
              aria-label="Tajweed rules in this ayah"
            >
              {tajweedTags.map((tag) => (
                <li key={tag.label} className={`rounded-full px-2.5 py-1 ${tag.className}`}>
                  {tag.label}
                </li>
              ))}
            </ul>
          }
        />
        <div className="flex min-w-0 flex-[1_1_160px] flex-col gap-2.5">
          <VideoTile label={site.teacher.name} kind="teacher" ratio="standard" speaking />
          <VideoTile label="Student" ratio="standard" />
          <div className="bg-night-3 text-mist flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold">
            <Icon name="eye" size={16} strokeWidth={1.8} className="text-gold" />
            Parent watching
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        Example classroom: the mushaf is shared on screen with the current ayah highlighted, while the
        teacher, student and a parent are on the call.
      </figcaption>
    </figure>
  );
}
