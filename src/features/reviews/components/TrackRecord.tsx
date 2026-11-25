import { Rosette } from '@/components/decor/Rosette';
import { ButtonLink, CountUp, Icon, Reveal, SectionHeading } from '@/components/ui';
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
        description={`${site.teacher.name} brings ${site.teacher.yearsTeaching} years of teaching experience. The best way to see the difference is to watch one lesson yourself.`}
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        {/* The numbers sit together in one night-emerald panel instead of four separate tiles. */}
        <Reveal className="card-night grain flex flex-col justify-between gap-8 overflow-hidden rounded-[30px] p-7 sm:p-9">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-40 -left-28 size-[520px] rounded-full bg-[radial-gradient(circle,rgb(25_162_122/0.5),transparent_62%)]"
          />
          <Rosette opacity={0.2} className="-right-28 -bottom-28 size-[420px]" />
          <p className="text-gold relative text-[12.5px] font-bold tracking-[0.18em] uppercase">
            {site.teacher.name} · at a glance
          </p>
          <ul className="relative grid grid-cols-2 gap-x-6 gap-y-7">
            {trackRecord.map((item) => (
              <li key={item.label} className="flex flex-col gap-1.5 border-l border-white/15 pl-4">
                <span className="font-display text-[clamp(30px,3.2vw,42px)] leading-none font-[600] tracking-[-0.045em]">
                  <CountUp value={item.value} />
                </span>
                <span className="text-mist text-[14px] font-semibold">{item.label}</span>
              </li>
            ))}
          </ul>
          <p className="text-mist relative flex items-center gap-2.5 text-[14px]">
            <span className="bg-live size-2 shrink-0 rounded-full" />
            Every class live and one-on-one, never pre-recorded.
          </p>
        </Reveal>

        <Reveal className="card flex flex-col gap-5 rounded-[30px] p-7 sm:p-9">
          <h3 className="text-[clamp(26px,2.8vw,34px)] leading-tight">
            In your free 30-minute class, <em className="text-brand">you'll see:</em>
          </h3>
          <ul className="flex flex-col gap-3">
            {trialChecks.map((check) => (
              <li key={check} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#14916c,#0a6a4f)] text-white">
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
