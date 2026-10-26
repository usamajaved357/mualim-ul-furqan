import { ProgressRing } from '@/components/mockups';
import { Icon } from '@/components/ui';
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
    <div className="border-line w-full max-w-[280px] rounded-2xl border bg-white p-3.5 shadow-[0_16px_30px_-22px_rgb(10_42_36/0.5)]">
      <div className="flex justify-between pb-2.5 text-xs font-bold">
        <span>Pick a time</span>
        <span className="text-muted">London (GMT)</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-bold">
        {slots.map((s) => (
          <span
            key={s.t}
            className={cn(
              'rounded-lg py-1.5',
              s.selected ? 'bg-brand text-white' : 'border-line-strong border',
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
    <div className="bg-night grid w-full max-w-[280px] grid-cols-[2fr_1fr] gap-2 rounded-2xl p-2.5 shadow-[0_16px_30px_-18px_rgb(10_42_36/0.6)]">
      <div className="from-night-3 outline-live flex aspect-[4/3] items-center justify-center rounded-[10px] bg-gradient-to-br to-[#12362f] outline-2">
        <Icon name="user" size={34} strokeWidth={1.4} className="text-gold" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-night-3 flex-1 rounded-lg" />
        <div className="bg-night-3 flex-1 rounded-lg" />
      </div>
      <div className="col-span-2 flex justify-center gap-1.5">
        <span className="bg-night-3 size-6 rounded-full" />
        <span className="bg-night-3 size-6 rounded-full" />
        <span className="h-6 w-10 rounded-full bg-[#b0413e]" />
      </div>
    </div>
  );
}

export function ProgressIllustration() {
  return (
    <div className="flex items-center gap-4.5">
      <ProgressRing value={0.68} label="68%" />
      <div className="flex flex-col gap-2 text-xs font-bold">
        <span className="border-line rounded-[10px] border bg-white px-3 py-2">Qaida ✓</span>
        <span className="border-line rounded-[10px] border bg-white px-3 py-2">Juz 4 / 30</span>
        <span className="bg-gold rounded-[10px] px-3 py-2">Certificate</span>
      </div>
    </div>
  );
}
