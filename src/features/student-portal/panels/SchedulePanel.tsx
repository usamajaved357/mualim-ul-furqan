import { week } from '../data';

export function SchedulePanel() {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5">
      {week.map((w) => (
        <li key={w.day} className="border-line flex flex-col gap-1.5 rounded-[14px] border p-3.5">
          <span className="text-muted text-xs font-extrabold tracking-[0.06em] uppercase">{w.day}</span>
          <span className="font-extrabold">{w.time}</span>
          <span className="text-brand text-[13px] font-bold">{w.what}</span>
        </li>
      ))}
    </ul>
  );
}
