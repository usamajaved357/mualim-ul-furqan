import { GirihPattern } from '@/components/decor/GirihPattern';
import { Rosette } from '@/components/decor/Rosette';
import { ButtonLink, Container, Reveal } from '@/components/ui';
import { site } from '@/config/site';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import { CalEmbed } from './components/CalEmbed';

export function BookingSection() {
  return (
    <section id="book" aria-labelledby="book-title">
      <Container className="pb-26">
        <Reveal className="bg-night text-cream relative flex flex-wrap items-center gap-10 overflow-hidden rounded-[34px] p-7 sm:p-14">
          <GirihPattern tone="dark" />
          <Rosette className="-bottom-50 -left-40 w-[520px]" />
          <div className="relative flex min-w-0 flex-[999_1_380px] flex-col gap-4.5">
            <span
              lang="ar"
              dir="rtl"
              className="font-diwani text-gold self-start text-[46px] leading-[1.6] font-bold"
            >
              {site.arabicName}
            </span>
            <h2
              id="book-title"
              className="text-[clamp(34px,4vw,54px)] leading-[1.05] font-extrabold tracking-[-0.035em]"
            >
              Start with one free class
            </h2>
            <p className="text-mist max-w-[460px] text-lg">
              Meet the teacher, get a short assessment, and decide afterwards. No payment needed to book.
            </p>
            <ButtonLink
              href={buildWhatsAppLink(whatsappMessages.trial)}
              variant="ghostDark"
              iconLeft="whatsapp"
              trackAs="Contact"
              className="self-start"
            >
              Prefer to chat first? WhatsApp us
            </ButtonLink>
          </div>
          <div className="text-ink relative flex min-h-80 min-w-0 flex-[1_1_380px] flex-col gap-3.5 rounded-[22px] bg-white p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]">
            <div className="flex items-center justify-between">
              <p className="font-extrabold">Book your free class</p>
              <span className="text-muted text-[13px] font-semibold">30 min · Zoom</span>
            </div>
            <CalEmbed />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
