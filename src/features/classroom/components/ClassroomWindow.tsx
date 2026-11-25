import { AL_FATIHA, CallParticipant, MushafPanel } from '@/components/mockups';
import { Icon, type IconName } from '@/components/ui';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';
import { classroomCall, tajweedTags } from '../data';

const controls: { icon: IconName; on?: boolean }[] = [
  { icon: 'mic' },
  { icon: 'video' },
  { icon: 'captions', on: true },
  { icon: 'hand' },
  { icon: 'present' },
];

/** Example Google Meet class: the teacher presents the mushaf while the student reads and a parent watches. */
export function ClassroomWindow() {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#0e2a22,#081a15)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_60px_100px_-40px_rgb(0_0_0/0.85)] outline outline-1 -outline-offset-[7px] outline-[rgb(247_213_139/0.16)]">
        <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3 sm:px-5">
          <span className="bg-gold/15 text-gold flex size-9 shrink-0 items-center justify-center rounded-xl">
            <Icon name="video" size={18} strokeWidth={2} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col leading-tight">
            <span className="truncate text-[14px] font-bold">{classroomCall.lesson}</span>
            <span className="text-mist truncate text-xs">
              Google Meet · meet.google.com/{classroomCall.code}
            </span>
          </span>
          <span className="bg-rec/15 inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-[#ff9a94]">
            <span className="bg-rec animate-blink size-1.5 rounded-full" />
            REC
          </span>
        </div>

        <div className="grid gap-3 p-3 sm:p-4 md:grid-cols-[minmax(0,1fr)_224px]">
          <div className="flex min-w-0 flex-col gap-3">
            <p className="text-mist inline-flex items-center gap-1.5 px-1 text-xs font-semibold">
              <Icon name="present" size={14} className="text-gold" />
              {site.teacher.name} is presenting
            </p>
            <MushafPanel
              ayat={AL_FATIHA.slice(4)}
              activeIndex={1}
              footer={
                <ul
                  className="flex flex-wrap justify-center gap-1.5 px-1 pt-2.5 pb-1 text-xs font-bold"
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
            <div className="flex items-start gap-2.5 rounded-2xl border border-white/8 bg-black/25 px-3 py-2.5">
              <span className="bg-gold text-abyss flex size-7 shrink-0 items-center justify-center rounded-full">
                <Icon name="captions" size={14} strokeWidth={2.2} />
              </span>
              <p className="text-[13px] leading-snug">
                <span className="text-gold font-bold">{site.teacher.name}: </span>
                {classroomCall.caption}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-mist hidden px-1 text-xs font-semibold md:block">In this class · 3</p>
            <div className="grid gap-2.5 sm:grid-cols-3 md:grid-cols-1">
              <CallParticipant
                initial="Q"
                name={site.teacher.name}
                duty="Teacher"
                avatar="bg-brand"
                speaking
                tone="dark"
              />
              <CallParticipant
                initial={classroomCall.student.charAt(0)}
                name={classroomCall.student}
                duty="Student"
                avatar="bg-gold-deep"
                tone="dark"
              />
              <CallParticipant
                initial={classroomCall.parent.charAt(0)}
                name={classroomCall.parent}
                duty="Watching"
                avatar="bg-[#7a5a1e]"
                tone="dark"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-white/8 px-4 py-3 sm:justify-between">
          <span className="text-mist hidden text-xs font-semibold sm:block">{classroomCall.time}</span>
          <span className="flex items-center gap-2">
            {controls.map(({ icon, on }) => (
              <span
                key={icon}
                className={cn(
                  'flex size-9 items-center justify-center rounded-full',
                  on ? 'bg-gold text-abyss' : 'bg-white/10 text-white',
                )}
              >
                <Icon name={icon} size={17} />
              </span>
            ))}
            <span className="bg-hangup ml-1 flex h-9 w-14 items-center justify-center rounded-full text-white">
              <Icon name="hangup" size={18} />
            </span>
          </span>
          <span className="text-mist hidden items-center gap-1 text-xs font-semibold sm:inline-flex">
            <Icon name="users" size={15} />3
          </span>
        </div>
      </div>
      <figcaption className="sr-only">
        Example class on Google Meet: the teacher shares the mushaf with the current ayah highlighted and live
        captions, while the student and a parent are on the call.
      </figcaption>
    </figure>
  );
}
