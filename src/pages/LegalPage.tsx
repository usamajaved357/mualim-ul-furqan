import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { GirihPattern } from '@/components/decor/GirihPattern';
import { Rosette } from '@/components/decor/Rosette';
import { ButtonLink, Container, Eyebrow, Icon } from '@/components/ui';
import { anchors, site } from '@/config/site';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';

export interface LegalSection {
  /** Anchor id, used by the contents list. */
  id: string;
  title: string;
  body: ReactNode;
}

const legalLinks = [
  { to: '/privacy', label: 'Privacy policy' },
  { to: '/terms', label: 'Terms of service' },
];

/**
 * Shared layout for the privacy policy and terms: a short night-emerald header band, then the text in a framed
 * card beside a sticky "On this page" list and a contact card.
 */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  const { pathname } = useLocation();
  return (
    <>
      <title>{`${title} · ${site.name}`}</title>
      <meta name="description" content={intro} />

      <section
        data-dark
        className="bg-abyss grain relative -mt-[76px] overflow-hidden pt-[76px] text-white"
        aria-labelledby="legal-title"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute -top-1/2 -left-1/4 size-[760px] rounded-full bg-[radial-gradient(circle,rgb(25_162_122/0.4),transparent_62%)]" />
          <GirihPattern
            tone="dark"
            className="[mask-image:radial-gradient(ellipse_70%_80%_at_30%_20%,black,transparent)] opacity-60"
          />
          <Rosette opacity={0.16} className="top-1/2 right-[-10%] size-[560px] -translate-y-1/2" />
        </div>
        <Container className="relative flex flex-col items-start gap-5 pt-14 pb-32 sm:pt-16">
          <nav aria-label="Breadcrumb" className="text-mist text-sm font-semibold">
            <Link to="/" className="text-mist no-underline hover:text-white">
              Home
            </Link>{' '}
            <span aria-hidden>/</span> <span className="text-gold">{title}</span>
          </nav>
          <Eyebrow tone="dark">{site.name}</Eyebrow>
          <h1
            id="legal-title"
            className="text-[clamp(40px,5.4vw,68px)] leading-[1.02] font-[600] tracking-[-0.045em] text-white"
          >
            {title}
          </h1>
          <p className="text-mist max-w-[640px] text-lg text-pretty">{intro}</p>
          <span className="text-mist inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold">
            <Icon name="calendar" size={15} className="text-gold" />
            Last updated {updated}
          </span>
        </Container>
      </section>

      <Container className="relative -mt-20 grid items-start gap-6 pb-24 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
        <article className="card text-ink min-w-0 rounded-[32px] p-6 sm:p-12">
          <div className="[&_strong]:text-ink [&_ul]:marker:text-gold-deep flex flex-col gap-4 text-[16.5px] leading-[1.75] text-[#36423e] [&_a]:font-semibold [&_li]:pl-1 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="flex scroll-mt-28 flex-col gap-3">
                <h2
                  className={
                    i === 0
                      ? 'text-ink text-[24px] leading-tight font-[700]'
                      : 'text-ink border-line mt-4 border-t pt-8 text-[24px] leading-tight font-[700]'
                  }
                >
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </div>
        </article>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
          <nav aria-label="On this page" className="card rounded-[28px] p-5">
            <p className="text-muted mb-2 px-2 text-[12px] font-bold tracking-[0.14em] uppercase">
              On this page
            </p>
            <ol className="flex flex-col">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-ink hover:bg-mint hover:text-brand block rounded-xl px-2 py-1.5 text-[14px] font-semibold no-underline transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="card-night grain flex flex-col gap-3 overflow-hidden rounded-[28px] p-6">
            <p className="font-display relative text-lg font-[700] text-white">Questions about this page?</p>
            <p className="text-mist relative text-[15px]">
              We're happy to explain anything. Email{' '}
              <a href={`mailto:${site.contact.email}`} className="text-gold break-all hover:text-white">
                {site.contact.email}
              </a>
              .
            </p>
            <ButtonLink
              href={buildWhatsAppLink(whatsappMessages.general)}
              variant="whatsapp"
              iconLeft="whatsapp"
              size="sm"
              trackAs="Contact"
              className="relative"
            >
              Ask on WhatsApp
            </ButtonLink>
          </div>

          <nav aria-label="Legal" className="card flex flex-col rounded-[28px] p-2">
            {legalLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                aria-current={pathname === l.to ? 'page' : undefined}
                className="text-ink aria-[current=page]:bg-mint aria-[current=page]:text-brand hover:bg-cream flex items-center justify-between rounded-full px-4 py-3 text-[15px] font-bold no-underline"
              >
                {l.label}
                <Icon name="chevron-right" size={16} strokeWidth={2.2} />
              </Link>
            ))}
          </nav>
          <ButtonLink href={anchors.book} trackAs="Lead" iconRight="arrow-right">
            Book a free class
          </ButtonLink>
        </aside>
      </Container>
    </>
  );
}
