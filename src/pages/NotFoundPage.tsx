import { LogoMark } from '@/components/brand/LogoMark';
import { GirihPattern } from '@/components/decor/GirihPattern';
import { Rosette } from '@/components/decor/Rosette';
import { ButtonLink, Container, Icon, type IconName } from '@/components/ui';
import { anchors, site } from '@/config/site';

const shortcuts: { label: string; note: string; href: string; icon: IconName }[] = [
  { label: 'Courses', note: 'Qaida to Hifz', href: '/#courses', icon: 'book' },
  { label: 'How it works', note: 'Three easy steps', href: '/#how', icon: 'sparkle' },
  { label: 'Pricing', note: 'Simple monthly plans', href: '/#pricing', icon: 'calendar' },
  { label: 'Questions', note: 'Answers to common ones', href: '/#faq', icon: 'message' },
];

/** 404: a night-emerald page with the number in Arabic numerals, the way back, and shortcuts. */
export function NotFoundPage() {
  return (
    <>
      <title>{`Page not found · ${site.name}`}</title>
      <meta name="robots" content="noindex" />
      <section
        data-dark
        className="bg-abyss grain relative -mt-[76px] overflow-hidden pt-[76px] text-white"
        aria-labelledby="not-found-title"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="animate-aurora absolute -top-1/3 left-1/2 size-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(25_162_122/0.42),transparent_62%)]" />
          <GirihPattern
            tone="dark"
            className="[mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)] opacity-60"
          />
          <Rosette
            opacity={0.2}
            className="top-[38%] left-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <Container className="relative flex flex-col items-center gap-6 pt-16 pb-24 text-center sm:pt-20">
          <LogoMark size={64} className="animate-fade-up" />
          <p
            lang="ar"
            dir="rtl"
            aria-hidden
            className="font-calligraphy text-gold-leaf animate-scale-in text-[clamp(110px,18vw,180px)] leading-[1.1]"
          >
            ٤٠٤
          </p>
          <h1
            id="not-found-title"
            className="animate-fade-up [&_em]:text-gold max-w-[680px] text-[clamp(34px,4.6vw,56px)] leading-[1.05] font-[600] tracking-[-0.04em] text-white [animation-delay:150ms]"
          >
            This page has <em>wandered off</em>
          </h1>
          <p className="animate-fade-up text-mist max-w-[480px] text-lg [animation-delay:250ms]">
            The page you're looking for doesn't exist or has moved. Let's get you back on track.
          </p>
          <div className="animate-fade-up flex flex-wrap justify-center gap-2.5 [animation-delay:350ms]">
            <ButtonLink href="/" variant="gold" size="lg" iconRight="arrow-right">
              Back to home
            </ButtonLink>
            <ButtonLink href={anchors.book} variant="ghostDark" size="lg" trackAs="Lead">
              Book a free class
            </ButtonLink>
          </div>

          <ul className="animate-fade-up mt-6 grid w-full max-w-[860px] grid-cols-2 gap-3 [animation-delay:450ms] md:grid-cols-4">
            {shortcuts.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  className="card-veil group flex h-full flex-col items-start gap-2 rounded-[22px] p-4 text-left text-white no-underline transition hover:-translate-y-1"
                >
                  <span className="bg-gold/15 text-gold flex size-9 items-center justify-center rounded-full">
                    <Icon name={s.icon} size={17} strokeWidth={2.1} />
                  </span>
                  <span className="flex items-center gap-1.5 text-[15px] font-bold">
                    {s.label}
                    <Icon
                      name="arrow-right"
                      size={14}
                      strokeWidth={2.4}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                  <span className="text-mist text-[13px]">{s.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
