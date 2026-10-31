import { Icon, Reveal, Section, SectionHeading, SegmentedControl, type IconName } from '@/components/ui';
import { track } from '@/lib/analytics';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import { HifzPlanCard } from './components/HifzPlanCard';
import { PlanCard } from './components/PlanCard';
import { currencies, hifzPlan, plans, pricingPerks } from './data';
import { useCurrency } from './hooks/useCurrency';

/** App-style icon tile with a colour gradient. */
function PerkIcon({ icon, tint }: { icon: IconName; tint: string }) {
  return (
    <span
      className={`flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] ${tint}`}
    >
      <Icon name={icon} size={20} strokeWidth={2.1} />
    </span>
  );
}

export function PricingSection() {
  const [currency, setCurrency] = useCurrency();
  return (
    <Section id="pricing" tone="white" containerClassName="flex flex-col gap-14">
      <div className="flex flex-col items-center gap-5">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Simple monthly plans. <em>First class free.</em>
            </>
          }
          description="Lessons are 30 minutes (45 for Hifz), live and one-on-one. You only choose a plan after your free class."
        />
        <SegmentedControl
          label="Currency"
          variant="solid"
          options={currencies}
          value={currency}
          onChange={setCurrency}
        />
      </div>

      <ul className="grid items-stretch gap-5 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal as="li" key={plan.id} delay={i * 100} className="flex flex-col">
            <PlanCard plan={plan} currency={currency} />
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <HifzPlanCard plan={hifzPlan} currency={currency} />
      </Reveal>

      <Reveal
        as="ul"
        className="border-line shadow-card divide-line grid divide-y overflow-hidden rounded-[28px] border bg-white md:grid-cols-3 md:divide-x md:divide-y-0"
      >
        {pricingPerks.map((perk) => (
          <li key={perk.title} className="flex items-center gap-4 p-5 sm:px-6">
            <PerkIcon icon={perk.icon} tint={perk.tint} />
            <span className="flex flex-col leading-snug">
              <span className="text-[15px] font-bold">{perk.title}</span>
              <span className="text-muted text-[14px]">{perk.body}</span>
            </span>
          </li>
        ))}
        <li>
          <a
            href={buildWhatsAppLink(whatsappMessages.customPlan)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('Contact')}
            className="group text-ink hover:text-ink hover:bg-parchment flex h-full items-center gap-4 p-5 no-underline transition-colors sm:px-6"
          >
            <PerkIcon icon="whatsapp" tint="from-live to-whatsapp" />
            <span className="flex flex-col leading-snug">
              <span className="text-[15px] font-bold">Fewer classes?</span>
              <span className="text-muted text-[14px]">1 class a week? Ask us on WhatsApp</span>
            </span>
            <Icon
              name="arrow-right"
              size={18}
              strokeWidth={2.2}
              className="text-brand ml-auto shrink-0 transition-transform group-hover:translate-x-1"
            />
          </a>
        </li>
      </Reveal>
    </Section>
  );
}
