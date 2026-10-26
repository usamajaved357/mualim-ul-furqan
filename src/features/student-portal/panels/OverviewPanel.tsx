import { ProgressRing } from '@/components/mockups';
import { attendance, homework, nextClass } from '../data';
import { CheckItem } from './CheckItem';

export function OverviewPanel() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
      <div className="bg-brand flex flex-col gap-2.5 rounded-[18px] p-5 text-white">
        <span className="text-sage text-xs font-extrabold tracking-[0.08em] uppercase">Next class</span>
        <p className="text-xl leading-tight font-extrabold">
          {nextClass.when}
          <br />
          {nextClass.what}
        </p>
        <span className="bg-gold text-night inline-flex min-h-10 items-center self-start rounded-[10px] px-3.5 text-sm font-extrabold">
          Join class
        </span>
      </div>
      <div className="border-line flex flex-col gap-3 rounded-[18px] border p-5">
        <span className="text-muted text-xs font-extrabold tracking-[0.08em] uppercase">Homework</span>
        {homework.map((h) => (
          <CheckItem key={h.task} done={h.done} label={h.task} compact />
        ))}
      </div>
      <div className="border-line flex items-center gap-3.5 rounded-[18px] border p-5">
        <ProgressRing
          size={88}
          value={attendance.attended / attendance.scheduled}
          label={`${attendance.attended}/${attendance.scheduled}`}
          color="var(--color-gold-deep)"
        />
        <span className="flex flex-col leading-snug">
          <span className="font-extrabold">Attendance</span>
          <span className="text-muted text-[13px]">This month</span>
        </span>
      </div>
    </div>
  );
}
