import { AccordionItem, ButtonLink, Reveal, Section, SectionHeading } from '@/components/ui';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import { faqs } from './data';

export function FaqSection() {
  return (
    <Section
      id="faq"
      tone="white"
      containerClassName="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
    >
      <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title={
            <>
              Questions? <em>We've got answers.</em>
            </>
          }
          description="Can't find what you're looking for? Message us on WhatsApp. We usually reply within the hour."
        />
        <ButtonLink
          href={buildWhatsAppLink(whatsappMessages.general)}
          variant="whatsapp"
          iconLeft="whatsapp"
          trackAs="Contact"
          size="lg"
          className="self-start"
        >
          Ask on WhatsApp
        </ButtonLink>
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 50}>
            <AccordionItem question={f.q}>{f.a}</AccordionItem>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
