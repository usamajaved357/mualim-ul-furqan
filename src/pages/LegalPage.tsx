import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { Glow } from '@/components/decor/Glow';
import { ButtonLink, Container, Icon } from '@/components/ui';
import { anchors, site } from '@/config/site';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';

const legalLinks = [
  { to: '/privacy', label: 'Privacy policy' },
  { to: '/terms', label: 'Terms of service' },
];

/** Shared layout for simple text pages (privacy, terms). */
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: ReactNode;
}) {
  const { pathname } = useLocation();
  return (
    <>
      <title>{`${title} · ${site.name}`}</title>
      <meta name="robots" content="noindex" />

      <section className="relative -mt-[76px] overflow-hidden pt-[76px]">
        <Glow color="mint" className="-top-40 -right-40 size-[620px]" />
        <Glow color="saffron" className="-bottom-60 -left-40 size-[520px]" />
        <Container className="relative flex flex-col items-start gap-5 pt-16 pb-20">
          <nav aria-label="Breadcrumb" className="text-muted text-sm font-semibold">
            <Link to="/" className="text-muted hover:text-ink no-underline">
              Home
            </Link>{' '}
            <span aria-hidden>/</span> <span className="text-brand">{title}</span>
          </nav>
          <h1 className="text-[clamp(40px,5.6vw,72px)] leading-[1.02]">{title}</h1>
          {intro && <p className="text-muted max-w-[620px] text-lg">{intro}</p>}
          <span className="border-line inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-1.5 text-sm font-semibold">
            <Icon name="calendar" size={15} className="text-brand" />
            Last updated: {updated}
          </span>
        </Container>
      </section>

      <Container className="relative grid gap-6 pb-24 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="border-line shadow-card rounded-[32px] border bg-white p-7 sm:p-12">
          <div className="[&_h2]:text-ink [&_h2]:border-line flex flex-col gap-4 text-[17px] text-[#36423e] [&_h2]:mt-5 [&_h2]:border-t [&_h2]:pt-6 [&_h2]:text-[26px] [&_h2:first-of-type]:mt-2">
            {children}
          </div>
        </article>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <div className="bg-mint flex flex-col gap-3 rounded-[28px] p-6">
            <p className="font-display text-lg font-semibold">Questions about this page?</p>
            <p className="text-muted text-[15px]">
              We're happy to explain anything. Email{' '}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
            <ButtonLink
              href={buildWhatsAppLink(whatsappMessages.general)}
              variant="whatsapp"
              iconLeft="whatsapp"
              size="sm"
              trackAs="Contact"
            >
              Ask on WhatsApp
            </ButtonLink>
          </div>
          <nav aria-label="Legal" className="border-line flex flex-col rounded-[28px] border bg-white p-2">
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
          <ButtonLink href={anchors.book} variant="dark" trackAs="Lead">
            Book a free class
          </ButtonLink>
        </aside>
      </Container>
    </>
  );
}
