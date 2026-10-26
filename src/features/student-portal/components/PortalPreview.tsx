import { useState, type ComponentType } from 'react';
import { LogoMark } from '@/components/brand/LogoMark';
import { SegmentedControl } from '@/components/ui';
import { portalTabs, sampleStudent, type PortalTab } from '../data';
import { CertificatesPanel } from '../panels/CertificatesPanel';
import { HomeworkPanel } from '../panels/HomeworkPanel';
import { OverviewPanel } from '../panels/OverviewPanel';
import { ProgressPanel } from '../panels/ProgressPanel';
import { SchedulePanel } from '../panels/SchedulePanel';

const panels: Record<PortalTab, ComponentType> = {
  overview: OverviewPanel,
  schedule: SchedulePanel,
  progress: ProgressPanel,
  homework: HomeworkPanel,
  certificates: CertificatesPanel,
};

/** Interactive preview of the student & parent portal (sample data). */
export function PortalPreview() {
  const [tab, setTab] = useState<PortalTab>('overview');
  const Panel = panels[tab];
  const title = portalTabs.find((t) => t.value === tab)?.label.toLowerCase();

  return (
    <div className="border-line bg-parchment rounded-[30px] border p-3 shadow-[0_50px_90px_-60px_rgb(10_42_36/0.55)] sm:p-4.5">
      <div className="border-line flex flex-wrap overflow-hidden rounded-[22px] border bg-white">
        <aside className="bg-night flex w-full min-w-0 flex-col gap-1.5 px-4 py-4 text-[#e8e2d2] lg:w-auto lg:flex-[1_1_200px] lg:py-5.5">
          <div className="flex items-center gap-2.5 px-2 pb-2 lg:pb-4.5">
            <LogoMark size={32} />
            <span className="text-sm font-extrabold">Student portal</span>
          </div>
          <SegmentedControl
            label="Portal sections"
            variant="sidebar"
            options={portalTabs}
            value={tab}
            onChange={setTab}
          />
        </aside>
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-5 p-6.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-muted text-sm">Assalamu alaikum,</p>
              <p className="text-[22px] font-extrabold tracking-[-0.02em]" aria-live="polite">
                {sampleStudent.name}'s {title}
              </p>
            </div>
            <span className="bg-sand text-earth rounded-full px-3 py-1.5 text-xs font-extrabold tracking-[0.06em] uppercase">
              Sample view
            </span>
          </div>
          <Panel />
        </div>
      </div>
    </div>
  );
}
