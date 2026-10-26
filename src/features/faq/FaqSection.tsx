import { AccordionItem, ButtonLink, Reveal, Section, SectionHeading } from '@/components/ui';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import { faqs } from './data';

export function FaqSection() {
  return (
    <Section id="faq" tone="parchment" containerClassName="flex flex-wrap gap-12">
      <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
        <SectionHeading align="left" eyebrow="FAQ" title="Questions parents ask" />
        <p className="text-muted">Can't find your answer? We usually reply on WhatsApp within the hour.</p>
        <ButtonLink
          href={buildWhatsAppLink(whatsappMessages.general)}
          variant="whatsapp"
          iconLeft="whatsapp"
          trackAs="Contact"
          className="self-start"
        >
          Ask on WhatsApp
        </ButtonLink>
      </div>
      <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 50}>
            <AccordionItem question={f.q}>{f.a}</AccordionItem>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
