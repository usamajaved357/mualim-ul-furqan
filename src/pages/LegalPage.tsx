import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { GirihPattern } from '@/components/decor/GirihPattern';
import { Ornament } from '@/components/decor/Ornament';
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

      <section className="bg-night text-cream relative overflow-hidden">
        <GirihPattern tone="dark" />
        <Container className="relative flex flex-col items-start gap-4 pt-16 pb-28">
          <nav aria-label="Breadcrumb" className="text-mist text-sm font-semibold">
            <Link to="/" className="text-mist no-underline hover:text-white">
              Home
            </Link>{' '}
            <span aria-hidden>/</span> <span className="text-gold">{title}</span>
          </nav>
          <h1 className="text-[clamp(36px,5vw,60px)] leading-[1.05] font-extrabold tracking-[-0.035em]">
            {title}
          </h1>
          <Ornament tone="dark" />
          {intro && <p className="text-mist max-w-[620px] text-lg">{intro}</p>}
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold">
            <Icon name="calendar" size={15} className="text-gold" />
            Last updated: {updated}
          </span>
        </Container>
      </section>

      <Container className="relative -mt-16 grid gap-6 pb-24 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="border-line rounded-[28px] border bg-white p-7 shadow-[0_40px_80px_-60px_rgb(10_42_36/0.6)] sm:p-12">
          <div className="[&_h2]:text-ink [&_h2]:border-line flex flex-col gap-4 text-[17px] text-[#36423e] [&_h2]:mt-5 [&_h2]:border-t [&_h2]:pt-6 [&_h2]:text-[22px] [&_h2]:font-extrabold [&_h2]:tracking-[-0.02em] [&_h2:first-of-type]:mt-2">
            {children}
          </div>
        </article>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <div className="border-line bg-parchment flex flex-col gap-3 rounded-[22px] border p-6">
            <p className="font-extrabold">Questions about this page?</p>
            <p className="text-muted text-[15px]">
              We're happy to explain anything. Email {site.contact.email}.
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
          <nav aria-label="Legal" className="border-line flex flex-col rounded-[22px] border bg-white p-2">
            {legalLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                aria-current={pathname === l.to ? 'page' : undefined}
                className="text-ink aria-[current=page]:bg-mint aria-[current=page]:text-brand hover:bg-cream flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-bold no-underline"
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
