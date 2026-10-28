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
        title="Don't just take our word for it"
        description={`${site.teacher.name} has been teaching the Quran for ${site.teacher.yearsTeaching} years. Here is what that looks like, and how you can see it for yourself.`}
      />

      <Reveal as="ul" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {trackRecord.map((item) => (
          <li key={item.label} className="bg-night flex flex-col gap-1 rounded-[22px] p-5 sm:p-7">
            <span className="text-gold text-[30px] leading-tight font-extrabold tracking-[-0.03em] sm:text-[44px]">
              {item.value}
            </span>
            <span className="text-mist text-sm font-semibold sm:text-[15px]">{item.label}</span>
          </li>
        ))}
      </Reveal>

      <Reveal className="border-line bg-parchment flex flex-wrap items-center justify-between gap-7 rounded-3xl border p-6.5 sm:p-9">
        <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-4">
          <h3 className="text-[clamp(24px,2.6vw,32px)] leading-tight font-extrabold tracking-[-0.025em]">
            Your first class is free. Judge for yourself.
          </h3>
          <p className="text-muted">In the 30-minute trial you'll see:</p>
          <ul className="flex flex-col gap-2.5">
            {trialChecks.map((check) => (
              <li key={check} className="flex items-start gap-2.5">
                <Icon name="check" size={20} strokeWidth={2.4} className="text-brand mt-0.5 shrink-0" />
                {check}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-3">
          <ButtonLink href={anchors.book} trackAs="Lead" size="lg">
            Book a free trial
          </ButtonLink>
          <ButtonLink
            href={buildWhatsAppLink(whatsappMessages.trial)}
            variant="whatsapp"
            iconLeft="whatsapp"
            trackAs="Contact"
            size="lg"
          >
            Ask on WhatsApp
          </ButtonLink>
        </div>
      </Reveal>
    </>
  );
}
