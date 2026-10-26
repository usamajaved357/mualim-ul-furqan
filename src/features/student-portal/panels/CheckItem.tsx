import { cn } from '@/lib/cn';

export function CheckItem({
  done,
  label,
  meta,
  compact = false,
}: {
  done: boolean;
  label: string;
  meta?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 text-sm font-semibold',
        !compact && 'border-line rounded-[14px] border px-4 py-3.5 text-[15px]',
      )}
    >
      <span
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-md text-xs',
          done ? 'bg-brand text-white' : 'border-[1.5px] border-[#cdbe9c]',
        )}
      >
        {done && '✓'}
        <span className="sr-only">{done ? 'Done:' : 'To do:'}</span>
      </span>
      <span className="flex-1">{label}</span>
      {meta && <span className="text-muted text-[13px] font-normal">{meta}</span>}
    </div>
  );
}
