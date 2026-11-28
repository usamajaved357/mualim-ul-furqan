import { Icon, Reveal, Section, SectionHeading, type IconName } from '@/components/ui';
import { track } from '@/lib/analytics';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import { HifzPlanCard } from './components/HifzPlanCard';
import { PlanCard } from './components/PlanCard';
import { CurrencyMenu } from './components/CurrencyMenu';
import { hifzPlan, plans, pricingPerks } from './data';
import { useLocalCurrency } from './hooks/useLocalCurrency';
import { BASE_CURRENCY } from './lib/pricing';

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
  const { country, currency, rates, setCountry, auto } = useLocalCurrency();
  return (
    <Section id="pricing" tone="white" containerClassName="flex flex-col gap-14">
      <div className="relative z-20 flex flex-col items-center gap-5">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Simple monthly plans. <em>First class free.</em>
            </>
          }
          description="Lessons are 30 minutes (45 for Hifz), live and one-on-one. You only choose a plan after your free class."
        />
        <div className="flex flex-col items-center gap-2.5">
          <CurrencyMenu country={country} currency={currency.code} rates={rates} onSelect={setCountry} />
          <p
            className="text-muted max-w-[460px] text-center text-[13px] font-semibold text-balance"
            aria-live="polite"
          >
            {auto && country ? 'Shown for your location. ' : ''}
            {currency.code === BASE_CURRENCY ? (
              'Prices in US dollars, billed monthly.'
            ) : (
              <>
                {currency.code} prices are a guide at today&rsquo;s rate; you&rsquo;re billed in US dollars.{' '}
                <a
                  href="https://www.exchangerate-api.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-brand underline decoration-dotted underline-offset-2"
                >
                  Rates by Exchange Rate API
                </a>
              </>
            )}
          </p>
        </div>
      </div>

      <ul className="grid items-stretch gap-4 md:grid-cols-3 lg:gap-5">
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
        className="card divide-line grid divide-y overflow-hidden rounded-[28px] md:grid-cols-3 md:divide-x md:divide-y-0"
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
