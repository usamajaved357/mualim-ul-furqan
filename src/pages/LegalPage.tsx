import type { ReactNode } from 'react';
import { Container } from '@/components/ui';
import { site } from '@/config/site';

/** Shared layout for simple text pages (privacy, terms). */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <title>{`${title} · ${site.name}`}</title>
      <meta name="robots" content="noindex" />
      <Container className="max-w-[820px] py-20">
        <h1 className="text-[clamp(32px,4vw,48px)] font-extrabold tracking-[-0.03em]">{title}</h1>
        <p className="text-muted mt-2 text-sm">Last updated: {updated}</p>
        <div className="[&_h2]:text-ink mt-10 flex flex-col gap-5 text-[17px] text-[#36423e] [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-extrabold">
          {children}
        </div>
      </Container>
    </>
  );
}
