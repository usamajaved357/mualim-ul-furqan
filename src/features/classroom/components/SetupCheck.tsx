import { ButtonLink, Icon, Reveal } from '@/components/ui';
import { site } from '@/config/site';
import { setupChecklist } from '../data';

export function SetupCheck() {
  return (
    <Reveal className="text-ink relative flex flex-wrap items-center justify-between gap-5 rounded-[28px] bg-white p-5 pl-6 sm:p-6 sm:pl-8">
      <div className="flex flex-col gap-1">
        <h3 className="text-[22px] leading-tight">Ready for your first class?</h3>
        <p className="text-muted text-[15px]">A camera, a microphone and steady internet is all you need.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <ul className="flex flex-wrap gap-2">
          {setupChecklist.map((item) => (
            <li
              key={item}
              className="bg-mint text-brand inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold"
            >
              <Icon name="check" size={15} strokeWidth={2.6} />
              {item}
            </li>
          ))}
        </ul>
        <ButtonLink href={site.links.meetTest} variant="dark">
          Test your setup
        </ButtonLink>
      </div>
    </Reveal>
  );
}
