import { ProgressBar } from '@/components/mockups';
import { progress, teacherNote } from '../data';

export function ProgressPanel() {
  return (
    <div className="flex flex-col gap-4">
      {progress.map((p) => (
        <div key={p.label} className="flex flex-col gap-1.5">
          <div className="flex justify-between text-sm font-bold">
            <span>{p.label}</span>
            <span className={p.value >= 1 ? 'text-brand' : 'text-muted'}>{p.detail}</span>
          </div>
          <ProgressBar value={p.value} tone={p.value >= 1 ? 'brand' : 'gold'} />
        </div>
      ))}
      <p className="bg-parchment text-muted rounded-[14px] px-4 py-3.5 text-[15px]">
        <strong className="text-ink">Teacher's note:</strong> {teacherNote}
      </p>
    </div>
  );
}
