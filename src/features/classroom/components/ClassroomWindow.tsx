import {
  AL_FATIHA,
  BrowserFrame,
  CallControls,
  MushafPanel,
  RecIndicator,
  VideoTile,
} from '@/components/mockups';
import { Icon } from '@/components/ui';
import { site } from '@/config/site';
import { classroomCall, tajweedTags } from '../data';

/** Example Google Meet class: the teacher presents the mushaf while the student reads and a parent watches. */
export function ClassroomWindow() {
  return (
    <figure className="m-0">
      <BrowserFrame url={`meet.google.com/${classroomCall.code}`} tabTitle={`Meet – ${classroomCall.code}`}>
        <div className="bg-call flex flex-col gap-3 p-3 sm:p-3.5">
          <div className="flex flex-wrap gap-3">
            <div className="bg-call-2 relative flex min-w-0 flex-[999_1_340px] flex-col gap-2.5 rounded-[14px] p-2.5">
              <div className="flex items-center justify-between gap-2 px-1 text-xs font-medium text-[#e8eaed]">
                <span className="inline-flex min-w-0 items-center gap-1.5">
                  <Icon name="present" size={14} className="text-call-blue shrink-0" />
                  <span className="truncate">{site.teacher.name} is presenting</span>
                </span>
                <RecIndicator />
              </div>
              <MushafPanel
                ayat={AL_FATIHA.slice(4)}
                activeIndex={1}
                footer={
                  <ul
                    className="flex flex-wrap gap-1.5 px-1 pt-2.5 pb-1 text-xs font-bold"
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
              <p className="mx-auto max-w-[92%] rounded-lg bg-black/70 px-3 py-1.5 text-center text-[13px] text-white">
                <span className="text-call-blue font-semibold">{site.teacher.name}: </span>
                {classroomCall.caption}
              </p>
            </div>
            <div className="grid min-w-0 flex-[1_1_170px] grid-cols-3 content-start gap-2.5 sm:grid-cols-1">
              <VideoTile label={site.teacher.name} photo={site.teacher.photo} ratio="standard" speaking />
              <VideoTile label={classroomCall.student} ratio="standard" avatarClassName="bg-[#c58af9]" />
              <VideoTile label={classroomCall.parent} ratio="standard" avatarClassName="bg-[#e37400]" muted />
            </div>
          </div>
          <CallControls time={classroomCall.time} meetingCode={classroomCall.code} participants={3} />
        </div>
      </BrowserFrame>
      <figcaption className="sr-only">
        Example class on Google Meet: the teacher shares the mushaf with the current ayah highlighted and live
        captions, while the student and a parent are on the call.
      </figcaption>
    </figure>
  );
}
