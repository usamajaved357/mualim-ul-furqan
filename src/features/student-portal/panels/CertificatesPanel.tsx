import { LogoMark } from '@/components/brand/LogoMark';
import { certificates, sampleStudent } from '../data';

export function CertificatesPanel() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
      {certificates.map((c) =>
        c.earned ? (
          <div
            key={c.course}
            className="border-gold-deep flex flex-col items-center gap-2 rounded-2xl border-2 bg-[#fffdf7] p-5.5 text-center"
          >
            <LogoMark size={44} />
            <span className="text-bronze text-xs font-extrabold tracking-[0.12em] uppercase">
              Certificate of completion
            </span>
            <span className="text-lg font-extrabold">{c.course}</span>
            <span className="text-muted text-[13px]">
              Awarded to {sampleStudent.name} · {c.awardedOn}
            </span>
          </div>
        ) : (
          <div
            key={c.course}
            className="border-line-strong text-muted flex flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed p-5.5 text-center"
          >
            <span className="text-ink font-extrabold">{c.course}</span>
            <span className="text-[13px]">{c.note}</span>
          </div>
        ),
      )}
    </div>
  );
}
