import { cn } from '@/lib/cn';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

const styles = {
  /** Separate pill buttons (course chips, review filters). */
  chips: {
    group: 'flex flex-wrap gap-2',
    item: 'min-h-10 rounded-full border px-4 text-sm',
    on: 'border-transparent bg-[linear-gradient(180deg,#14916c,#0a6a4f)] text-white font-bold shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_8px_16px_-8px_rgb(12_122_91/0.85)]',
    off: 'border-line-strong bg-white text-ink font-semibold hover:border-brand/40 hover:text-brand',
  },
  /** Joined track (learner / region): light tray, the selected option lifts out as a white tile. */
  track: {
    group: 'flex gap-1 rounded-2xl border border-line bg-parchment p-1',
    item: 'min-h-10 flex-1 rounded-xl px-3 text-sm',
    on: 'bg-white text-brand font-bold shadow-[inset_0_1px_0_white,0_0_0_1px_rgb(15_31_26/0.06),0_6px_16px_-10px_rgb(15_31_26/0.35)]',
    off: 'text-muted font-semibold hover:text-ink',
  },
  /** Joined track on a dark background: the selected option is a light tile. */
  trackDark: {
    group: 'flex gap-1 rounded-2xl border border-white/10 bg-black/20 p-1',
    item: 'min-h-10 flex-1 rounded-xl px-3 text-sm',
    on: 'bg-[linear-gradient(180deg,#fff,#f3ead7)] text-abyss font-bold shadow-[inset_0_1px_0_white,0_6px_16px_-8px_rgb(0_0_0/0.6)]',
    off: 'text-mist font-semibold hover:text-white',
  },
  /** Track with a solid selected state. */
  solid: {
    group: 'glass inline-flex gap-1 rounded-full p-1',
    item: 'min-h-10 rounded-full px-3.5 text-[14px] sm:px-5 sm:text-[15px]',
    on: 'bg-[linear-gradient(180deg,#14916c,#0a6a4f)] text-white font-bold shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_8px_18px_-10px_rgb(12_122_91/0.9)]',
    off: 'text-ink font-semibold hover:bg-white/70',
  },
  /** Vertical list on dark background. */
  sidebar: {
    group: 'flex gap-1.5 overflow-x-auto lg:flex-col lg:overflow-visible',
    item: 'min-h-11 shrink-0 rounded-[10px] px-3 text-left text-sm whitespace-nowrap',
    on: 'bg-gold/15 text-gold font-bold',
    off: 'text-mist font-semibold hover:bg-white/5',
  },
} as const;

interface SegmentedControlProps<T extends string> {
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  variant?: keyof typeof styles;
  className?: string;
}

/** Accessible single-select group of toggle buttons. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  variant = 'chips',
  className,
}: SegmentedControlProps<T>) {
  const s = styles[variant];
  return (
    <div role="group" aria-label={label} className={cn(s.group, className)}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              'cursor-pointer transition-[color,background-color,box-shadow] duration-300',
              s.item,
              selected ? s.on : s.off,
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
