import { ButtonLink, Reveal } from '@/components/ui';
import { site } from '@/config/site';
import { setupChecklist } from '../data';

export function SetupCheck() {
  return (
    <Reveal className="border-gold/30 bg-gold/[0.06] flex flex-wrap items-center justify-between gap-5 rounded-[20px] border px-6.5 py-5.5">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-extrabold">Ready for your first class?</h3>
        <p className="text-mist text-[15px]">
          A camera, a microphone or headset and steady internet is all you need.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <ul className="flex flex-wrap gap-2.5">
          {setupChecklist.map((item) => (
            <li key={item} className="rounded-full bg-white/[0.07] px-3.5 py-2 text-sm font-bold">
              ✓ {item}
            </li>
          ))}
        </ul>
        <ButtonLink href={site.links.zoomTest} variant="gold" size="sm" className="min-h-11">
          Test your setup
        </ButtonLink>
      </div>
    </Reveal>
  );
}
