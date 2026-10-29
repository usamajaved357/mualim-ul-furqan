import { ButtonLink, Icon, Reveal } from '@/components/ui';
import { anchors } from '@/config/site';
import { setBookingIntent } from '@/lib/bookingIntent';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import { hifzIncludes, hifzPace } from '../data';

/** What a Hifz family gets, the honest answer on pace, and the calls to action. */
export function HifzIncluded() {
  return (
    <Reveal className="bg-night text-cream relative flex flex-col gap-6 overflow-hidden rounded-[28px] p-6 sm:p-9">
      <span
        aria-hidden
        className="bg-brand-light/30 pointer-events-none absolute -top-24 -right-20 size-64 rounded-full blur-3xl"
      />
      <h3 className="relative text-[clamp(24px,2.4vw,30px)] leading-tight text-white">What's included</h3>
      <ul className="relative flex flex-col gap-3">
        {hifzIncludes.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="bg-gold text-night mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full">
              <Icon name="check" size={13} strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p className="text-mist relative rounded-[18px] border border-white/10 bg-white/[0.06] p-4 text-[15px]">
        {hifzPace}
      </p>
      <div className="relative mt-auto flex flex-col gap-2.5 pt-1">
        <ButtonLink
          href={anchors.book}
          trackAs="Lead"
          variant="gold"
          size="lg"
          iconRight="arrow-right"
          onClick={() => setBookingIntent({ course: 'hifz', learner: 'child' })}
        >
          Book a free Hifz assessment
        </ButtonLink>
        <ButtonLink
          href={buildWhatsAppLink(whatsappMessages.hifz)}
          variant="ghostDark"
          size="lg"
          iconLeft="whatsapp"
          trackAs="Contact"
        >
          Ask about Hifz
        </ButtonLink>
        <a
          href={anchors.pricing}
          className="text-gold self-center pt-1 text-[15px] font-bold hover:text-white"
        >
          See Hifz pricing
        </a>
      </div>
    </Reveal>
  );
}
