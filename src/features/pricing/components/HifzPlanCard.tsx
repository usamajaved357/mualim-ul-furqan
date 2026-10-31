import { ButtonLink, Icon } from '@/components/ui';
import { anchors } from '@/config/site';
import { setBookingIntent } from '@/lib/bookingIntent';
import type { CurrencyCode } from '@/types/domain';
import type { Plan } from '../data';
import { formatPrice, planPrice, pricePerClass } from '../lib/pricing';

/** Wide card under the regular plans: Hifz is its own programme with longer daily lessons. */
export function HifzPlanCard({ plan, currency }: { plan: Plan; currency: CurrencyCode }) {
  return (
    <article className="lift border-line relative grid gap-7 overflow-hidden rounded-[32px] border bg-white p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] lg:items-center lg:gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-[26px] leading-tight">{plan.name}</h3>
          <span
            lang="ar"
            dir="rtl"
            className="bg-rose text-rose-ink font-naskh rounded-full px-3 py-0.5 text-[17px] font-bold"
          >
            حِفْظ
          </span>
        </div>
        <p className="text-muted text-[15px] font-semibold">
          {plan.classesPerWeek} lessons a week · {plan.minutes} min each
        </p>
        <p className="font-display flex items-baseline gap-1.5 leading-none">
          <span className="text-[52px] font-bold tracking-[-0.045em]">
            {formatPrice(planPrice(plan, currency), currency)}
          </span>
          <span className="text-muted text-base font-semibold">/ month</span>
        </p>
        <p className="bg-rose text-rose-ink inline-flex w-fit rounded-full px-3 py-1 text-[13px] font-bold">
          {plan.classesPerMonth} lessons · about {pricePerClass(plan, currency)} each
        </p>
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
