import { Icon } from '@/components/ui';
import type { Programme } from '../data';
import { PANEL_ID, tabId } from '../lib/ids';
import { Included } from './Included';
import { MethodCards } from './MethodCards';
import { Roadmap } from './Roadmap';

/** Full detail for the selected programme: intro, lesson method, plan and what's included. */
export function ProgrammePanel({ programme }: { programme: Programme }) {
  return (
    <div
      role="tabpanel"
      id={PANEL_ID}
      aria-labelledby={tabId(programme.id)}
      tabIndex={0}
      className="animate-fade-up flex flex-col gap-12 [animation-duration:0.5s] focus-visible:rounded-[28px]"
    >
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3">
          <span className="text-brand text-[13px] font-bold tracking-wide uppercase">
            {programme.label} · {programme.eyebrow}
          </span>
          <h3 className="max-w-[720px] text-[clamp(30px,3.6vw,46px)] leading-[1.06] text-balance">
            {programme.title} <em>{programme.accent}</em>
          </h3>
          <p className="text-muted max-w-[640px] text-[18px] text-pretty">{programme.description}</p>
        </div>
        <div className="flex flex-col gap-4 lg:items-end">
          <p
            lang="ar"
            dir="rtl"
            className="font-naskh text-bronze text-[clamp(40px,5vw,58px)] leading-[1.6] font-bold"
          >
            {programme.arabic}
          </p>
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {programme.facts.map((fact) => (
              <li
                key={fact.label}
                className="text-ink inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[14px] font-bold"
              >
                <Icon name={fact.icon} size={17} strokeWidth={2} className="text-brand" />
                {fact.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <MethodCards parts={programme.method} />

      <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <Roadmap programme={programme} />
        <Included programme={programme} />
      </div>
    </div>
  );
}
