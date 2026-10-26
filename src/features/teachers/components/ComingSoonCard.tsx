import { LogoMark } from '@/components/brand/LogoMark';
import { GirihPattern } from '@/components/decor/GirihPattern';
import { ButtonLink } from '@/components/ui';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';

const subjects = ['Tajweed', 'Nazra', 'Duas'];

export function ComingSoonCard() {
  return (
    <article className="lift bg-parchment flex flex-1 flex-col overflow-hidden rounded-[28px] border-[1.5px] border-dashed border-[#d9ccae]">
      <div className="bg-sand relative flex h-[210px] items-center justify-center overflow-hidden">
        <GirihPattern />
        <span className="text-earth relative rounded-full border border-[#eadfc5] bg-white px-4 py-2 text-[13px] font-extrabold tracking-[0.1em] uppercase">
          Coming soon
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3.5 px-7 pb-7">
        <div className="relative -mt-12 flex items-end gap-4">
          <span className="border-parchment flex size-26 shrink-0 items-center justify-center rounded-[26px] border-4 bg-white shadow-[0_10px_24px_-14px_rgb(10_42_36/0.4)]">
            <LogoMark size={54} />
          </span>
          <div className="pb-1.5">
            <h3 className="text-[23px] font-extrabold tracking-[-0.02em]">Female teacher</h3>
            <p className="text-muted text-sm">For sisters &amp; girls</p>
          </div>
        </div>
        <p className="text-muted text-[15px]">
          For families who prefer an Ustadha. Join the waiting list and we'll message you the moment classes
          open, in sha Allah.
        </p>
        <ul className="flex flex-wrap gap-2">
          {subjects.map((s) => (
            <li
              key={s}
              className="text-earth rounded-lg border border-[#eadfc5] bg-white px-2.5 py-1 text-[13px] font-bold"
            >
              {s}
            </li>
          ))}
        </ul>
        <ButtonLink
          href={buildWhatsAppLink(whatsappMessages.femaleWaitlist)}
          variant="dark"
          trackAs="Contact"
          className="mt-auto"
        >
          Join the waiting list
        </ButtonLink>
      </div>
    </article>
  );
}
