import type { ReactNode } from 'react';

/** Top bar of the classroom window: traffic lights, lesson title and a REC indicator. */
export function WindowChrome({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="border-gold/20 flex items-center justify-between gap-3 border-b bg-[#0d2b25] px-4 py-3">
      <span className="flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2.5 rounded-full bg-[#4e6a60]" />
        ))}
      </span>
      <span className="text-mist truncate text-[13px] font-semibold">{title}</span>
      {children ?? <RecIndicator />}
    </div>
  );
}

export function RecIndicator({ label = 'REC' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#f2a7a3]">
      <span className="animate-blink bg-rec size-2 rounded-full" />
      {label}
    </span>
  );
}
