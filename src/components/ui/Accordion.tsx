import type { ReactNode } from 'react';

interface AccordionItemProps {
  question: string;
  children: ReactNode;
}

/** Native <details> accordion: keyboard and screen-reader friendly with no JS. */
export function AccordionItem({ question, children }: AccordionItemProps) {
  return (
    <details className="group border-line rounded-2xl border bg-white px-6 py-5">
      <summary className="flex min-h-7 cursor-pointer items-center justify-between gap-4 text-[17px] font-bold">
        {question}
        <span
          aria-hidden
          className="bg-cream text-brand group-open:bg-brand flex size-8 shrink-0 items-center justify-center rounded-[10px] text-[22px] font-medium transition duration-300 group-open:rotate-45 group-open:text-white"
        >
          +
        </span>
      </summary>
      <div className="text-muted pt-3">{children}</div>
    </details>
  );
}
