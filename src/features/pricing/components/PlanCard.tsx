import { ButtonLink, Icon } from '@/components/ui';
import { anchors } from '@/config/site';
import { cn } from '@/lib/cn';
import type { CurrencyCode } from '@/types/domain';
import type { Plan } from '../data';
import { formatPrice, pricePerClass } from '../lib/pricing';

export function PlanCard({ plan, currency }: { plan: Plan; currency: CurrencyCode }) {
  const featured = Boolean(plan.featured);
  return (
    <article
      className={cn(
        'lift relative flex flex-1 flex-col gap-6 overflow-hidden rounded-[32px] p-8',
        featured
          ? 'from-brand to-brand-dark bg-gradient-to-br text-white shadow-[0_40px_80px_-30px_rgb(12_122_91/0.6)] lg:-my-4 lg:py-12'
          : 'border-line border bg-white',
      )}
    >
      {featured && (
        <span
          aria-hidden
          className="bg-brand-light/50 absolute -top-20 -right-16 size-60 rounded-full blur-3xl"
        />
      )}
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[26px] leading-tight">{plan.name}</h3>
          <p className={cn('text-[15px] font-semibold', featured ? 'text-sage' : 'text-muted')}>
            {plan.classesPerWeek} classes a week · {plan.minutes} min
          </p>
        </div>
        {featured && (
          <span className="bg-gold-deep rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white">
            Most popular
          </span>
        )}
      </div>
      <div className="relative">
        <p className="font-display flex items-baseline gap-1.5 leading-none">
          <span className="text-[60px] font-bold tracking-[-0.045em]">
            {formatPrice(plan.price[currency], currency)}
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
