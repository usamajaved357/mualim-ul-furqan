import { cn } from '@/lib/cn';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

const styles = {
  /** Separate pill buttons (course chips, review filters). */
  chips: {
    group: 'flex flex-wrap gap-2',
    item: 'min-h-11 rounded-[10px] border-[1.5px] px-3.5 text-sm',
    on: 'border-brand bg-brand text-white font-bold',
    off: 'border-line-strong bg-white text-ink font-semibold hover:border-brand/50',
  },
  /** Joined track (learner / region / currency). */
  track: {
    group: 'flex gap-1.5 rounded-xl bg-cream p-1',
    item: 'min-h-10 flex-1 rounded-[9px] px-3 text-sm',
    on: 'bg-white text-ink font-bold shadow-[0_2px_6px_rgb(10_42_36/0.12)]',
    off: 'text-muted font-semibold hover:text-ink',
  },
  /** Track with a solid selected state. */
  solid: {
    group: 'inline-flex gap-1 rounded-[14px] border border-line bg-white p-1',
    item: 'min-h-11 rounded-[10px] px-5 text-[15px]',
    on: 'bg-brand text-white font-bold',
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
