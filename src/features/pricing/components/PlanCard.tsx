import { GirihPattern } from '@/components/decor/GirihPattern';
import { ButtonLink } from '@/components/ui';
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
        'lift relative flex flex-col gap-5 overflow-hidden rounded-[26px] p-8.5',
        featured
          ? 'border-gold-deep bg-night text-cream border-2 py-10.5 shadow-[0_40px_70px_-34px_rgb(10_42_36/0.7)]'
          : 'border-line border bg-white',
      )}
    >
      {featured && <GirihPattern tone="dark" />}
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[22px] font-extrabold">{plan.name}</h3>
          <p className={cn('text-[15px]', featured ? 'text-mist' : 'text-muted')}>
            {plan.classesPerWeek} classes a week
          </p>
        </div>
        {featured && (
          <span className="bg-gold text-night rounded-full px-3 py-1.5 text-xs font-extrabold tracking-[0.06em] uppercase">
            Most popular
          </span>
        )}
      </div>
      <div className="relative">
        <p
          className={cn(
            'text-[52px] leading-none font-extrabold tracking-[-0.035em]',
            featured && 'text-gold',
          )}
        >
          {formatPrice(plan.price[currency], currency)}
          <span
            className={cn('text-base font-semibold tracking-normal', featured ? 'text-mist' : 'text-muted')}
          >
            {' '}
            /month
          </span>
        </p>
        <p className={cn('pt-2.5 text-sm', featured ? 'text-mist' : 'text-muted')}>
          {plan.classesPerMonth} classes · about {pricePerClass(plan, currency)} each
        </p>
      </div>
      <ul
        className={cn(
          'relative flex flex-col gap-3 border-t pt-5 text-[15px]',
          featured ? 'border-gold/25' : 'border-[#f0eadd]',
        )}
      >
        {plan.perks.map((perk) => (
          <li key={perk} className="flex gap-2.5">
            <span aria-hidden className={cn('font-extrabold', featured ? 'text-gold' : 'text-brand')}>
              ✓
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
        Start free trial
      </ButtonLink>
    </article>
  );
}
