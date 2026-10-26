import { Icon, Reveal } from '@/components/ui';
import { milestones } from '../data';

export function Milestones() {
  return (
    <Reveal className="border-line bg-parchment flex flex-col gap-4 rounded-3xl border p-6.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[21px] font-extrabold">Student milestones</h3>
        <span className="text-muted text-sm font-semibold">Celebrating our students' achievements</span>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-3.5">
        {milestones.map((m, i) => (
          <li key={i} className="border-line flex items-center gap-3 rounded-2xl border bg-white p-4">
            <span className="bg-gold text-night flex size-11 shrink-0 items-center justify-center rounded-xl">
              <Icon name="award" size={22} strokeWidth={2} />
            </span>
            <span className="flex flex-col leading-snug">
              <span className="text-[15px] font-extrabold">{m.name}</span>
              <span className="text-muted text-[13px]">{m.milestone}</span>
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
