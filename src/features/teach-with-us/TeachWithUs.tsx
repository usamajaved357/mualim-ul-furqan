import { ButtonLink, Container, Eyebrow, Reveal } from '@/components/ui';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';

const steps = [
  { title: 'Send a recitation', body: 'A short audio on WhatsApp.' },
  { title: 'Interview & trial lesson', body: '30 minutes online.' },
  { title: 'Start teaching', body: 'On a schedule that suits you.' },
];

export function TeachWithUs() {
  return (
    <section aria-labelledby="teach-title">
      <Container className="py-24">
        <Reveal className="border-line flex flex-col gap-7 rounded-[30px] border bg-white p-7 shadow-[0_40px_80px_-60px_rgb(10_42_36/0.5)] sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="flex max-w-[620px] flex-col gap-2.5">
              <Eyebrow tone="sand" className="self-start">
                Teach with us
              </Eyebrow>
              <h2
                id="teach-title"
                className="text-[clamp(28px,3vw,40px)] leading-[1.1] font-extrabold tracking-[-0.03em]"
              >
                Are you a Qariah or Hafizah?
              </h2>
              <p className="text-muted">
                We're looking for female teachers with strong Tajweed and good English to teach sisters and
                girls online.
              </p>
            </div>
            <ButtonLink
              href={buildWhatsAppLink(whatsappMessages.applyTeacher)}
              variant="dark"
              trackAs="Contact"
            >
              Apply to teach
            </ButtonLink>
          </div>
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-parchment flex flex-col gap-1.5 rounded-[18px] p-5">
                <span className="text-bronze text-[13px] font-extrabold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-extrabold">{s.title}</h3>
                <p className="text-muted text-[15px]">{s.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
