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
    on: 'border-brand bg-brand text-white font-bold shadow-[0_6px_14px_-8px_rgb(12_122_91/0.8)]',
    off: 'border-line-strong bg-white text-ink font-semibold hover:border-brand/40',
  },
  /** Joined track (learner / region): light tray, the selected option lifts out as a white tile. */
  track: {
    group: 'flex gap-1 rounded-2xl border border-line bg-parchment p-1',
    item: 'min-h-10 flex-1 rounded-xl px-3 text-sm',
    on: 'bg-white text-brand font-bold ring-1 ring-line shadow-[0_6px_16px_-10px_rgb(15_31_26/0.35)]',
    off: 'text-muted font-semibold hover:text-ink',
  },
  /** Track with a solid selected state. */
  solid: {
    group: 'inline-flex gap-1 rounded-full border border-line bg-white p-1 shadow-card',
    item: 'min-h-10 rounded-full px-5 text-[15px]',
    on: 'bg-ink text-white font-bold',
    off: 'text-ink font-semibold hover:bg-cream',
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
            className={cn('cursor-pointer transition-colors duration-200', s.item, selected ? s.on : s.off)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
