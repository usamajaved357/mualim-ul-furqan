import { GirihPattern } from '@/components/decor/GirihPattern';
import { Rosette } from '@/components/decor/Rosette';
import { ButtonLink, Container, Icon, Reveal, type IconName } from '@/components/ui';
import { site } from '@/config/site';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import { BookingWidget } from './components/BookingWidget';

const nextSteps: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'calendar',
    title: 'Pick a time',
    body: 'Open slots from the teacher’s calendar, in your time zone.',
  },
  { icon: 'mail', title: 'Get your Meet link', body: 'You and the teacher both get an email right away.' },
  { icon: 'video', title: 'Join the class', body: 'Tap the link at class time. No account or download.' },
];

export function BookingSection() {
  return (
    <section id="book" aria-labelledby="book-title">
      <Container className="pt-6 pb-26">
        <Reveal className="bg-night text-cream relative flex flex-wrap gap-10 overflow-hidden rounded-[34px] p-6 sm:p-12 lg:gap-14">
          <GirihPattern tone="dark" />
          <Rosette className="-bottom-50 -left-40 w-[520px]" />
          <div className="relative flex min-w-0 flex-[1_1_300px] flex-col gap-5 lg:py-4">
            <span
              lang="ar"
              dir="rtl"
              className="font-diwani text-gold self-start text-[44px] leading-[1.6] font-bold"
            >
              {site.arabicNameFull}
            </span>
            <h2
              id="book-title"
              className="text-[clamp(34px,4vw,52px)] leading-[1.05] font-extrabold tracking-[-0.035em]"
            >
              Start with one free class
            </h2>
            <p className="text-mist max-w-[440px] text-lg">
              Meet {site.teacher.name}, get a short assessment, and decide afterwards. No payment needed to
              book.
            </p>
            <ol className="flex flex-col gap-3.5">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-3.5">
                  <span className="border-gold/40 text-gold relative flex size-11 shrink-0 items-center justify-center rounded-2xl border bg-white/5">
                    <Icon name={s.icon} size={20} />
                    <span className="bg-gold text-night absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full text-[11px] font-extrabold">
                      {i + 1}
                    </span>
                  </span>
                  <span className="flex flex-col">
                    <span className="font-extrabold">{s.title}</span>
                    <span className="text-mist text-[15px]">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <ButtonLink
              href={buildWhatsAppLink(whatsappMessages.trial)}
              variant="ghostDark"
              iconLeft="whatsapp"
              trackAs="Contact"
              className="mt-2 self-start"
            >
              Prefer to chat first? WhatsApp us
            </ButtonLink>
          </div>
          <div className="text-ink relative min-w-0 flex-[999_1_560px] rounded-[26px] bg-white p-5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:p-7">
            <h3 className="sr-only">Book your free class</h3>
            <BookingWidget />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
