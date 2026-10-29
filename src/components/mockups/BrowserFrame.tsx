import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';

interface BrowserFrameProps {
  /** Shown in the address bar, without the protocol. */
  url: string;
  tabTitle: string;
  children: ReactNode;
  className?: string;
}

/** Desktop browser window (tab strip + address bar) around a mockup. */
export function BrowserFrame({ url, tabTitle, children, className }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[18px] border border-white/10 bg-[#35363a] shadow-[0_50px_90px_-40px_rgb(0_0_0/0.85)]',
        className,
      )}
    >
      <div className="flex items-end gap-3 px-3.5 pt-2.5">
        <span className="flex gap-1.5 pb-3" aria-hidden>
          {['bg-[#ff5f57]', 'bg-[#febc2e]', 'bg-[#28c840]'].map((c) => (
            <span key={c} className={cn('size-3 rounded-full', c)} />
          ))}
        </span>
        <span className="bg-call-2 flex min-w-0 items-center gap-2 rounded-t-[10px] px-3.5 py-2 text-xs font-medium text-[#e8eaed]">
          <span className="bg-brand flex size-3.5 shrink-0 items-center justify-center rounded-[4px]">
            <Icon name="video" size={9} strokeWidth={2.6} className="text-white" />
          </span>
          <span className="truncate">{tabTitle}</span>
          <Icon name="close" size={11} strokeWidth={2.4} className="shrink-0 text-[#9aa0a6]" />
        </span>
      </div>
      <div className="bg-call-2 flex items-center gap-2.5 px-3 py-2">
        <span className="flex gap-2.5 text-[#9aa0a6]" aria-hidden>
          <Icon name="chevron-left" size={14} strokeWidth={2.2} />
          <Icon name="chevron-right" size={14} strokeWidth={2.2} />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#202124] px-3.5 py-1.5 text-xs text-[#bdc1c6]">
          <Icon name="lock" size={11} strokeWidth={2.4} className="shrink-0 text-[#9aa0a6]" />
          <span className="truncate">{url}</span>
        </span>
      </div>
      {children}
    </div>
  );
}
