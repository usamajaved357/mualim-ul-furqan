import { ButtonLink, Icon } from '@/components/ui';
import { anchors } from '@/config/site';
import { setBookingIntent } from '@/lib/bookingIntent';
import type { Plan } from '../data';
import { cn } from '@/lib/cn';
import {
  BASE_CURRENCY,
  formatPrice,
  planPrice,
  priceLength,
  pricePerClass,
  type LocalCurrency,
} from '../lib/pricing';

const priceSize = {
  short: 'text-[54px] max-sm:text-[48px]',
  long: 'text-[48px] max-sm:text-[42px]',
  longer: 'text-[40px] max-sm:text-[34px]',
};

/** Wide card under the regular plans: Hifz is its own programme with longer daily lessons. */
export function HifzPlanCard({ plan, currency }: { plan: Plan; currency: LocalCurrency }) {
  const price = formatPrice(planPrice(plan, currency), currency.code);
  return (
    <article className="card lift spotlight grid gap-7 overflow-hidden rounded-[32px] p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] lg:items-center lg:gap-10 [&>*]:relative [&>*]:z-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-[28px] leading-tight font-[600]">{plan.name}</h3>
          <span
            lang="ar"
            dir="rtl"
            className="text-bronze font-calligraphy rounded-full bg-[#fdf0d5] px-3.5 py-0 text-[21px] leading-[1.9] font-bold"
          >
            حفظ
          </span>
        </div>
        <p className="text-muted text-[15px] font-semibold">
          {plan.classesPerWeek} lessons a week · {plan.minutes} min each
        </p>
        <p className="font-display flex flex-wrap items-baseline gap-x-1.5 gap-y-1 leading-none">
          <span className={cn('font-[500] tracking-[-0.045em]', priceSize[priceLength(price)])}>{price}</span>
          <span className="text-muted text-base font-semibold">/ month</span>
        </p>
        <p className="text-bronze inline-flex w-fit rounded-full bg-[#fdf0d5] px-3 py-1 text-[13px] font-bold">
          {plan.classesPerMonth} lessons · about {pricePerClass(plan, currency)} each
        </p>
        {currency.code !== BASE_CURRENCY && (
          <p className="text-muted text-[13px] font-semibold">
            Guide price · billed as {formatPrice(plan.usd, BASE_CURRENCY)} USD
          </p>
        )}
      </div>
      <ul className="grid gap-3 text-[15px] sm:grid-cols-2">
        {plan.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2.5">
            <span className="bg-mint text-brand mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
              <Icon name="check" size={12} strokeWidth={3} />
            </span>
            {perk}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2.5">
        <ButtonLink
          href={anchors.book}
          trackAs="Lead"
          size="lg"
          onClick={() => setBookingIntent({ course: 'hifz', learner: 'child' })}
          aria-label="Book a free Hifz assessment, then choose the Hifz programme"
        >
          Free Hifz assessment
        </ButtonLink>
        <a href={anchors.hifz} className="text-brand self-center text-[15px] font-bold">
          How the programme works
        </a>
      </div>
    </article>
  );
}
