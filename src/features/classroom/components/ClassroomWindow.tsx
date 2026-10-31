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
      <div className="text-ink overflow-hidden rounded-[30px] bg-white shadow-[0_50px_90px_-40px_rgb(0_0_0/0.7)] ring-1 ring-white/10">
        <div className="border-line flex items-center gap-3 border-b px-4 py-3 sm:px-5">
          <span className="bg-mint text-brand flex size-9 shrink-0 items-center justify-center rounded-xl">
            <Icon name="video" size={18} strokeWidth={2} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col leading-tight">
            <span className="truncate text-[14px] font-bold">{classroomCall.lesson}</span>
            <span className="text-muted truncate text-xs">
              Google Meet · meet.google.com/{classroomCall.code}
            </span>
          </span>
          <span className="bg-rose text-rose-ink inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold">
            <span className="bg-rec animate-blink size-1.5 rounded-full" />
            REC
          </span>
        </div>

        <div className="grid gap-3 p-3 sm:p-4 md:grid-cols-[minmax(0,1fr)_224px]">
          <div className="flex min-w-0 flex-col gap-3">
            <p className="text-muted inline-flex items-center gap-1.5 px-1 text-xs font-semibold">
              <Icon name="present" size={14} className="text-brand" />
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
            <div className="bg-mint flex items-start gap-2.5 rounded-2xl px-3 py-2.5">
              <span className="bg-brand flex size-7 shrink-0 items-center justify-center rounded-full text-white">
                <Icon name="captions" size={14} strokeWidth={2.2} />
              </span>
              <p className="text-[13px] leading-snug">
                <span className="text-brand font-bold">{site.teacher.name}: </span>
                {classroomCall.caption}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-muted hidden px-1 text-xs font-semibold md:block">In this class · 3</p>
            <div className="grid gap-2.5 sm:grid-cols-3 md:grid-cols-1">
              <CallParticipant
                initial="Q"
                name={site.teacher.name}
                duty="Teacher"
                avatar="bg-brand"
                speaking
              />
              <CallParticipant
                initial={classroomCall.student.charAt(0)}
                name={classroomCall.student}
                duty="Student"
                avatar="bg-lilac-ink"
              />
              <CallParticipant
                initial={classroomCall.parent.charAt(0)}
                name={classroomCall.parent}
                duty="Watching"
                avatar="bg-gold-deep"
              />
            </div>
          </div>
        </div>

        <div className="border-line flex items-center justify-center gap-2 border-t px-4 py-3 sm:justify-between">
          <span className="text-muted hidden text-xs font-semibold sm:block">{classroomCall.time}</span>
          <span className="flex items-center gap-2">
            {controls.map(({ icon, on }) => (
              <span
                key={icon}
                className={cn(
                  'flex size-9 items-center justify-center rounded-full',
                  on ? 'bg-brand text-white' : 'bg-cream text-ink',
                )}
              >
                <Icon name={icon} size={17} />
              </span>
            ))}
            <span className="bg-hangup ml-1 flex h-9 w-14 items-center justify-center rounded-full text-white">
              <Icon name="hangup" size={18} />
            </span>
          </span>
          <span className="text-muted hidden items-center gap-1 text-xs font-semibold sm:inline-flex">
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
