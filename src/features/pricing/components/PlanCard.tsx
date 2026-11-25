import { ButtonLink, Icon } from '@/components/ui';
import { anchors } from '@/config/site';
import { cn } from '@/lib/cn';
import type { CurrencyCode } from '@/types/domain';
import type { Plan } from '../data';
import { formatPrice, planPrice, pricePerClass } from '../lib/pricing';

export function PlanCard({ plan, currency }: { plan: Plan; currency: CurrencyCode }) {
  const featured = Boolean(plan.featured);
  return (
    <article
      className={cn(
        'lift spotlight relative flex flex-1 flex-col gap-6 overflow-hidden rounded-[32px] p-8 [&>*]:z-10',
        featured
          ? 'bg-abyss grain border-glow text-white shadow-[0_40px_80px_-30px_rgb(4_21_15/0.75)] [--spotlight-color:rgb(247_213_139/0.14)] lg:-my-4 lg:py-12'
          : 'border-line border bg-white',
      )}
    >
      {featured && (
        <span
          aria-hidden
          className="animate-aurora absolute! -top-24 -right-20 z-0! size-72 rounded-full bg-[radial-gradient(circle,rgb(25_162_122/0.6),transparent_65%)]"
        />
      )}
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[28px] leading-tight font-[460]">{plan.name}</h3>
          <p className={cn('text-[15px] font-semibold', featured ? 'text-sage' : 'text-muted')}>
            {plan.classesPerWeek} classes a week · {plan.minutes} min
          </p>
        </div>
        {featured && (
          <span className="bg-gold text-abyss rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap">
            Most popular
          </span>
        )}
      </div>
      <div className="relative">
        <p className="font-display flex items-baseline gap-1.5 leading-none">
          <span className="text-[62px] font-[340] tracking-[-0.045em]">
            {formatPrice(planPrice(plan, currency), currency)}
          </span>
          <span className={cn('text-base font-semibold', featured ? 'text-sage' : 'text-muted')}>
            / month
          </span>
        </p>
        <p
          className={cn(
            'mt-3 inline-flex rounded-full px-3 py-1 text-[13px] font-bold',
            featured ? 'bg-white/15 text-white' : 'bg-mint text-brand',
          )}
        >
          {plan.classesPerMonth} classes · about {pricePerClass(plan, currency)} each
        </p>
      </div>
      <ul className="relative flex flex-col gap-3 text-[15px]">
        {plan.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2.5">
            <span
              className={cn(
                'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full',
                featured ? 'bg-white/20 text-white' : 'bg-mint text-brand',
              )}
            >
              <Icon name="check" size={12} strokeWidth={3} />
            </span>
            {perk}
          </li>
        ))}
      </ul>
      <ButtonLink
        href={anchors.book}
        trackAs="Lead"
        variant={featured ? 'gold' : 'outline'}
        size="lg"
        className="relative mt-auto"
        aria-label={`Start a free trial, then choose the ${plan.name} plan`}
      >
        Start with a free class
      </ButtonLink>
    </article>
  );
}
