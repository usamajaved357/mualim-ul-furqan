import { ProgressRing } from '@/components/mockups';
import { cn } from '@/lib/cn';

const slots = [
  { t: '4:30 PM' },
  { t: '5:00 PM' },
  { t: '5:30 PM', selected: true },
  { t: '6:00 PM' },
  { t: '6:30 PM', taken: true },
  { t: '7:00 PM' },
];

export function SlotsIllustration() {
  return (
    <div className="shadow-card w-full max-w-[280px] rounded-[20px] bg-white p-3.5">
      <div className="flex justify-between pb-2.5 text-xs font-bold">
        <span>Pick a time</span>
        <span className="text-muted">London (GMT)</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-bold">
        {slots.map((s) => (
          <span
            key={s.t}
            className={cn(
              'rounded-full py-1.5',
              s.selected ? 'bg-brand text-white' : 'bg-parchment',
              s.taken && 'text-[#a6ada9] line-through',
            )}
          >
            {s.t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CallIllustration() {
  return (
    <div className="bg-call grid w-full max-w-[280px] grid-cols-[2fr_1fr] gap-2 rounded-[20px] p-2.5 shadow-[0_20px_40px_-20px_rgb(15_31_26/0.6)]">
      <div className="bg-call-3 ring-call-blue flex aspect-[4/3] items-center justify-center rounded-[10px] ring-2 ring-inset">
        <span className="bg-brand flex size-11 items-center justify-center rounded-full text-lg font-semibold text-white">
          Q
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-call-3 flex-1 rounded-lg" />
        <div className="bg-call-3 flex-1 rounded-lg" />
      </div>
      <div className="col-span-2 flex justify-center gap-1.5">
        <span className="bg-call-3 size-6 rounded-full" />
        <span className="bg-call-3 size-6 rounded-full" />
        <span className="bg-hangup h-6 w-10 rounded-full" />
      </div>
    </div>
  );
}

export function ProgressIllustration() {
  return (
    <div className="flex items-center gap-4.5">
      <ProgressRing value={0.68} label="68%" />
      <div className="flex flex-col gap-2 text-xs font-bold">
        <span className="shadow-card rounded-full bg-white px-3.5 py-2">Qaida ✓</span>
        <span className="shadow-card rounded-full bg-white px-3.5 py-2">Juz 4 / 30</span>
        <span className="bg-gold-deep rounded-full px-3.5 py-2 text-white">Certificate</span>
      </div>
    </div>
  );
}
