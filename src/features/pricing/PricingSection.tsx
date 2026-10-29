import { Icon, Reveal, Section, SectionHeading, SegmentedControl } from '@/components/ui';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import { HifzPlanCard } from './components/HifzPlanCard';
import { PlanCard } from './components/PlanCard';
import { currencies, hifzPlan, plans, pricingPerks } from './data';
import { useCurrency } from './hooks/useCurrency';

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

      <Reveal as="ul" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3.5">
        {pricingPerks.map((perk) => (
          <li
            key={perk.text}
            className="bg-parchment flex items-center gap-3 rounded-full px-5 py-3.5 text-[15px] font-semibold"
          >
            <Icon name={perk.icon} size={22} strokeWidth={2} className="text-brand" />
            {perk.text}
          </li>
        ))}
        <li className="bg-parchment flex items-center gap-3 rounded-full px-5 py-3.5 text-[15px] font-semibold">
          <Icon name="whatsapp" size={22} strokeWidth={2} className="text-brand" />
          <span>
            Need 1 class a week?{' '}
            <a href={buildWhatsAppLink(whatsappMessages.customPlan)} className="font-extrabold">
              Ask us
            </a>
          </span>
        </li>
      </Reveal>
    </Section>
  );
}
