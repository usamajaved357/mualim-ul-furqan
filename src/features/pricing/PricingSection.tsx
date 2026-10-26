import { Icon, Reveal, Section, SectionHeading, SegmentedControl } from '@/components/ui';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import { PlanCard } from './components/PlanCard';
import { currencies, plans, pricingPerks } from './data';
import { useCurrency } from './hooks/useCurrency';

export function PricingSection() {
  const [currency, setCurrency] = useCurrency();
  return (
    <Section id="pricing" tone="parchment" containerClassName="flex flex-col gap-11">
      <div className="flex flex-col items-center gap-5">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, honest monthly plans"
          description="Every class is 30 minutes, live and one-on-one. The first class is always free."
        />
        <SegmentedControl
          label="Currency"
          variant="solid"
          options={currencies}
          value={currency}
          onChange={setCurrency}
        />
      </div>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] items-center gap-5.5">
        {plans.map((plan, i) => (
          <Reveal as="li" key={plan.id} delay={i * 100} className="flex flex-col">
            <PlanCard plan={plan} currency={currency} />
          </Reveal>
        ))}
      </ul>

      <Reveal as="ul" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3.5">
        {pricingPerks.map((perk) => (
          <li
            key={perk.text}
            className="border-line flex items-center gap-3 rounded-2xl border bg-white px-4.5 py-4 text-[15px] font-semibold"
          >
            <Icon name={perk.icon} size={22} strokeWidth={2} className="text-brand" />
            {perk.text}
          </li>
        ))}
        <li className="border-line flex items-center gap-3 rounded-2xl border bg-white px-4.5 py-4 text-[15px] font-semibold">
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
