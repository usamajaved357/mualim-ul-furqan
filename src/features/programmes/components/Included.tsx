import { Rosette } from '@/components/decor/Rosette';
import { ButtonLink, Icon } from '@/components/ui';
import { anchors } from '@/config/site';
import { setBookingIntent } from '@/lib/bookingIntent';
import { buildWhatsAppLink, courseEnquiry } from '@/lib/whatsapp';
import type { Programme } from '../data';

/** What a family gets, the honest answer on pace, and the calls to action for one programme. */
export function Included({ programme }: { programme: Programme }) {
  return (
    <div className="card-night text-cream grain flex flex-col gap-6 overflow-hidden rounded-[30px] p-6 sm:p-9">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-36 -right-28 size-[440px] rounded-full bg-[radial-gradient(circle,rgb(25_162_122/0.55),transparent_62%)]"
      />
      <Rosette opacity={0.16} className="-bottom-32 -left-32 size-[380px]" />
      <h4 className="font-display relative text-[clamp(22px,2.2vw,28px)] leading-tight font-[700] tracking-[-0.02em] text-white">
        What's included
      </h4>
      <ul className="relative flex flex-col gap-3">
        {programme.includes.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="text-abyss mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#fbe2a6,#e9b45a)]">
              <Icon name="check" size={13} strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p className="text-mist relative rounded-[18px] border border-white/10 bg-black/20 p-4 text-[15px]">
        {programme.pace}
      </p>
      <div className="relative mt-auto flex flex-col gap-2.5 pt-1">
        <ButtonLink
          href={anchors.book}
          trackAs="Lead"
          variant="gold"
          size="lg"
          iconRight="arrow-right"
          onClick={() => setBookingIntent({ course: programme.id, learner: 'child' })}
        >
          {programme.cta}
        </ButtonLink>
        <ButtonLink
          href={buildWhatsAppLink(courseEnquiry(programme.label))}
          variant="ghostDark"
          size="lg"
          iconLeft="whatsapp"
          trackAs="Contact"
        >
          Ask about {programme.label}
        </ButtonLink>
        <a
          href={anchors.pricing}
          className="text-gold self-center pt-1 text-[15px] font-bold hover:text-white"
        >
          See pricing
        </a>
      </div>
    </div>
  );
}
