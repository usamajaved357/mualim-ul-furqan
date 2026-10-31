import type { ReactNode } from 'react';
import { Icon, type IconName } from '@/components/ui';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

const card =
  'relative w-full max-w-[290px] rounded-[20px] bg-white p-3.5 ring-1 ring-black/5 shadow-[0_22px_44px_-24px_rgb(15_31_26/0.45)]';

/** App-style icon tile with a colour gradient. */
function AppIcon({ icon, tint, size = 'md' }: { icon: IconName; tint: string; size?: 'sm' | 'md' }) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center bg-gradient-to-br text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]',
        size === 'sm' ? 'size-6 rounded-[8px]' : 'size-8 rounded-[10px]',
        tint,
      )}
    >
      <Icon name={icon} size={size === 'sm' ? 13 : 16} strokeWidth={2.3} />
    </span>
  );
}

/** Small frosted badge that sits on a corner of the illustration card. */
function Badge({ className, children }: { className: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        'absolute flex items-center gap-2 rounded-full bg-white/90 py-1.5 pr-3 pl-1.5 text-[11px] font-bold whitespace-nowrap shadow-[0_14px_30px_-14px_rgb(15_31_26/0.5)] ring-1 ring-black/5 backdrop-blur',
        className,
      )}
    >
      {children}
    </span>
  );
}

function CardHeader({
  icon,
  tint,
  title,
  meta,
}: {
  icon: IconName;
  tint: string;
  title: string;
  meta: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 pb-3">
      <AppIcon icon={icon} tint={tint} />
      <span className="min-w-0 flex-1 truncate text-[13px] font-bold">{title}</span>
      <span className="text-muted inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold">
        {meta}
      </span>
    </div>
  );
}

const days = [
  { d: 'Mon', n: 2 },
  { d: 'Tue', n: 3 },
  { d: 'Wed', n: 4, selected: true },
  { d: 'Thu', n: 5 },
  { d: 'Fri', n: 6 },
];

const slots = [
  { t: '4:30' },
  { t: '5:00' },
  { t: '5:30', selected: true },
  { t: '6:00' },
  { t: '6:30', taken: true },
  { t: '7:00' },
];

/** Step 1: a booking calendar in the visitor's own time zone. */
export function SlotsIllustration() {
  return (
    <div className={cn(card, 'pb-7')}>
      <CardHeader
        icon="calendar"
        tint="from-brand-light to-brand"
        title="Free class · 30 min"
        meta={
          <>
            <Icon name="globe" size={12} strokeWidth={2.2} />
            London
          </>
        }
      />
      <div className="grid grid-cols-5 gap-1 pb-2.5 text-center">
        {days.map((day) => (
          <span
            key={day.n}
            className={cn(
              'flex flex-col rounded-xl py-1 leading-tight',
              day.selected ? 'bg-brand text-white' : 'bg-parchment text-ink',
            )}
          >
            <span className={cn('text-[10px] font-semibold', day.selected ? 'text-white/80' : 'text-muted')}>
              {day.d}
            </span>
            <span className="text-[13px] font-bold">{day.n}</span>
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5 text-center text-[11px] font-bold">
        {slots.map((slot) => (
          <span
            key={slot.t}
            className={cn(
              'rounded-full border py-1.5',
              slot.selected ? 'border-brand bg-mint text-brand' : 'border-line bg-white',
              slot.taken && 'text-muted/60 line-through',
            )}
          >
            {slot.t} PM
          </span>
        ))}
      </div>
      <Badge className="-right-3 -bottom-4">
        <span className="bg-brand flex size-5 items-center justify-center rounded-full text-white">
          <Icon name="check" size={11} strokeWidth={3} />
        </span>
        Booked · Wed 5:30 PM
      </Badge>
    </div>
  );
}

/** Step 2: the free class on Google Meet, with the teacher listening and a starting point found. */
export function CallIllustration() {
  return (
    <div className={card}>
      <CardHeader
        icon="video"
        tint="from-call-blue to-sky-ink"
        title="Free class · Google Meet"
        meta={
          <span className="text-rose-ink inline-flex items-center gap-1 font-bold">
            <span className="bg-rec animate-blink size-1.5 rounded-full" />
            Live
          </span>
        }
      />
      <div className="bg-parchment flex items-center gap-3 rounded-2xl p-2.5">
        <span className="bg-brand ring-brand-light flex size-10 shrink-0 items-center justify-center rounded-full text-[15px] font-bold text-white ring-2 ring-offset-2 ring-offset-white">
          {site.teacher.name.charAt(0)}
        </span>
        <span className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="truncate text-[12px] font-bold">{site.teacher.name}</span>
          <span className="text-muted text-[11px]">Listening…</span>
        </span>
        <span className="flex h-4 items-end gap-[3px]">
          {[0.45, 0.9, 0.6, 1, 0.5].map((h, i) => (
            <span
              key={i}
              className="bg-brand animate-blink w-[3px] rounded-full"
              style={{ height: `${h * 100}%`, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      </div>
      <div className="bg-mint text-brand mt-2.5 flex items-center gap-2 rounded-xl px-2.5 py-2 text-[11px] font-bold">
        <Icon name="check" size={13} strokeWidth={3} />
        Starting point found: Nazra
      </div>
      <Badge className="-top-4 -right-3">
        <AppIcon icon="mail" tint="from-amber to-gold-deep" size="sm" />
        Meet link emailed
      </Badge>
    </div>
  );
}

const report = [
  { label: 'Noorani Qaida', value: 1, note: 'Complete' },
  { label: 'Nazra', value: 0.4, note: 'Juz 12 / 30' },
  { label: 'Tajweed rules', value: 0.6, note: '6 / 10' },
];

/** Step 3: the monthly progress report families receive. */
export function ProgressIllustration() {
  return (
    <div className={cn(card, 'pb-7')}>
      <CardHeader icon="award" tint="from-amber to-gold-deep" title="Monthly report" meta="This month" />
      <ul className="flex flex-col gap-2.5">
        {report.map((row) => (
          <li key={row.label} className="flex flex-col gap-1">
            <span className="flex items-baseline justify-between gap-2 text-[11px]">
              <span className="font-bold">{row.label}</span>
              <span className={cn('font-semibold', row.value === 1 ? 'text-brand' : 'text-muted')}>
                {row.note}
              </span>
            </span>
            <span className="bg-parchment h-1.5 overflow-hidden rounded-full">
              <span
                className="from-brand-light to-brand block h-full rounded-full bg-gradient-to-r"
                style={{ width: `${row.value * 100}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
      <Badge className="-right-3 -bottom-4">
        <AppIcon icon="award" tint="from-amber to-gold-deep" size="sm" />
        Certificate earned
      </Badge>
    </div>
  );
}
