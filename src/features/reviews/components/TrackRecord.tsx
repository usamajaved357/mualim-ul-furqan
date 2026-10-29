import { ButtonLink, Icon, Reveal, SectionHeading } from '@/components/ui';
import { anchors, site } from '@/config/site';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import { trackRecord, trialChecks } from '../data';

/** Honest social proof until real reviews exist: real numbers plus an invitation to see the teaching first-hand. */
export function TrackRecord() {
  return (
    <>
      <SectionHeading
        eyebrow="Track record"
        title={
          <>
            Don't take our word for it. <em>Try a class.</em>
          </>
        }
        description={`${site.teacher.name} has taught the Quran for ${site.teacher.yearsTeaching} years. The best way to see the difference is to watch one lesson yourself.`}
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <Reveal as="ul" className="grid grid-cols-2 gap-4">
          {trackRecord.map((item, i) => (
            <li
              key={item.label}
              className={`flex flex-col justify-end gap-1 rounded-[28px] p-6 sm:p-7 ${['bg-mint', 'bg-sand', 'bg-sky', 'bg-lilac'][i]}`}
            >
              <span className="font-display text-[clamp(34px,4vw,52px)] leading-none font-bold tracking-[-0.04em]">
                {item.value}
              </span>
              <span className="text-muted text-sm font-semibold sm:text-[15px]">{item.label}</span>
            </li>
          ))}
        </Reveal>

        <Reveal className="border-line shadow-card flex flex-col gap-5 rounded-[28px] border bg-white p-7 sm:p-9">
          <h3 className="text-[clamp(26px,2.8vw,34px)] leading-tight">
            In your free 30-minute class, <em className="text-brand">you'll see:</em>
          </h3>
          <ul className="flex flex-col gap-3">
            {trialChecks.map((check) => (
              <li key={check} className="flex items-start gap-3">
                <span className="bg-brand mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-white">
                  <Icon name="check" size={13} strokeWidth={3} />
                </span>
                {check}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-2.5 pt-2">
            <ButtonLink href={anchors.book} trackAs="Lead" size="lg" iconRight="arrow-right">
              Book a free class
            </ButtonLink>
            <ButtonLink
              href={buildWhatsAppLink(whatsappMessages.trial)}
              variant="soft"
              iconLeft="whatsapp"
              trackAs="Contact"
              size="lg"
            >
              Ask a question
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </>
  );
}
