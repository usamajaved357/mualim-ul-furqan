import { Glow } from '@/components/decor/Glow';
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
    <section id="book" aria-labelledby="book-title" className="bg-parchment">
      <Container className="pt-6 pb-24">
        <Reveal className="relative flex flex-wrap gap-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#dff3ea] via-[#f3f9f4] to-[#fff0d6] p-5 sm:p-12 lg:gap-14">
          <Glow color="mint" className="-top-40 -left-40 size-[520px]" />
          <Glow color="saffron" className="-right-40 -bottom-40 size-[520px]" />
          <div className="relative flex min-w-0 flex-[1_1_300px] flex-col gap-5 px-2 pt-4 lg:py-4">
            <span
              lang="ar"
              dir="rtl"
              className="font-logo text-brand self-start text-[42px] leading-[1.6] font-bold"
            >
              {site.arabicNameFull}
            </span>
            <h2 id="book-title" className="text-[clamp(38px,4.6vw,60px)] leading-[1.02]">
              Book your <em className="text-brand">free class</em> today
            </h2>
            <p className="text-muted max-w-[440px] text-lg">
              Meet {site.teacher.name}, get a gentle assessment, and decide afterwards. No payment, no card,
              no pressure.
            </p>
            <ol className="flex flex-col gap-3">
              {nextSteps.map((s, i) => (
                <li
                  key={s.title}
                  className="flex items-start gap-3.5 rounded-[22px] bg-white/70 p-3.5 backdrop-blur"
                >
                  <span className="bg-brand relative flex size-11 shrink-0 items-center justify-center rounded-full text-white">
                    <Icon name={s.icon} size={19} />
                    <span className="bg-gold-deep absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-[11px] font-bold text-white ring-2 ring-white">
                      {i + 1}
                    </span>
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display font-semibold">{s.title}</span>
                    <span className="text-muted text-[14px]">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <ButtonLink
              href={buildWhatsAppLink(whatsappMessages.trial)}
              variant="outline"
              iconLeft="whatsapp"
              trackAs="Contact"
              className="self-start"
            >
              Prefer to chat first? WhatsApp us
            </ButtonLink>
          </div>
          <div className="text-ink shadow-float relative min-w-0 flex-[999_1_560px] rounded-[30px] bg-white p-5 sm:p-7">
            <h3 className="sr-only">Book your free class</h3>
            <BookingWidget />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
