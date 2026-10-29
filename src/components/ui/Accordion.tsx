import type { ReactNode } from 'react';

interface AccordionItemProps {
  question: string;
  children: ReactNode;
}

/** Native <details> accordion: keyboard and screen-reader friendly with no JS. */
export function AccordionItem({ question, children }: AccordionItemProps) {
  return (
    <details className="group border-line open:shadow-card rounded-[22px] border bg-white px-6 py-5 transition-shadow">
      <summary className="font-display flex min-h-7 cursor-pointer items-center justify-between gap-4 text-[18px] font-semibold tracking-[-0.01em]">
        {question}
        <span
          aria-hidden
          className="bg-mint text-brand group-open:bg-brand flex size-9 shrink-0 items-center justify-center rounded-full text-[22px] font-medium transition duration-300 group-open:rotate-45 group-open:text-white"
        >
          +
        </span>
      </summary>
      <div className="text-muted pt-3 pr-12">{children}</div>
    </details>
  );
}
