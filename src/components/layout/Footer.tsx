import { Link, useLocation } from 'react-router';
import { anchors, courseLinks, site } from '@/config/site';
import { Logo } from '@/components/brand/Logo';
import { Rosette } from '@/components/decor/Rosette';
import { ButtonLink, Container, Icon } from '@/components/ui';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';

const columns = [
  {
    title: 'Courses',
    links: courseLinks.map(({ label, href }) => ({ label, href })),
  },
  {
    title: 'Academy',
    links: [
      { label: 'How it works', href: '/#how' },
      { label: 'Classroom', href: '/#classroom' },
      { label: 'Your teacher', href: '/#teachers' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
];

export function Footer() {
  // The booking page is the call to action, so the footer skips its own "Book a free class" banner there.
  const onBookingPage = useLocation().pathname === anchors.book;
  return (
    <footer className="bg-parchment px-3 pb-3 sm:px-5 sm:pb-5">
      <div data-dark className="bg-abyss text-mist grain relative overflow-hidden rounded-[40px] text-[15px]">
        <span
          aria-hidden
          className="animate-aurora absolute -top-60 left-1/2 size-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(25_162_122/0.4),transparent_62%)]"
        />
        <span
          aria-hidden
          className="animate-aurora absolute top-20 -right-60 size-[600px] rounded-full bg-[radial-gradient(circle,rgb(229_154_31/0.18),transparent_62%)] [animation-delay:-8s]"
        />
        <Rosette opacity={0.16} className="-top-64 left-1/2 size-[760px] -translate-x-1/2" />
        {!onBookingPage && (
          <Container className="relative flex flex-col items-center gap-6 pt-20 pb-16 text-center">
            <h2 className="max-w-[820px] text-[clamp(40px,5.6vw,76px)] leading-[1] font-[600] text-white">
              Start your child's Quran journey <em className="text-gold-leaf pr-1">this week</em>
            </h2>
            <p className="max-w-[520px] text-lg">
              30 minutes on Google Meet, one-on-one with {site.teacher.name}. Free, and the link arrives by
              email as soon as you book.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              <ButtonLink href={anchors.book} variant="gold" size="lg" iconRight="arrow-right" trackAs="Lead">
                Book a free class
              </ButtonLink>
              <ButtonLink
                href={buildWhatsAppLink(whatsappMessages.general)}
                variant="ghostDark"
                size="lg"
                iconLeft="whatsapp"
                trackAs="Contact"
              >
                WhatsApp us
              </ButtonLink>
            </div>
          </Container>
        )}

        <Container className="relative grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-14 pb-10 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          {/* Phones and tablets: brand and contact span the row, the two link lists sit side by side. */}
          <div className="col-span-2 flex max-w-80 flex-col gap-4 lg:col-span-1">
            <Logo tone="dark" size="lg" />
            <p>Live one-on-one Quran classes for kids &amp; adults in the UK, US and Europe.</p>
          </div>
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-2.5">
              <h2 className="font-sans text-sm font-bold tracking-normal text-white">{col.title}</h2>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-mist w-fit no-underline hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
          <div className="col-span-2 flex flex-col gap-3 lg:col-span-1">
            <h2 className="font-sans text-sm font-bold tracking-normal text-white">Contact</h2>
            <a
              href={buildWhatsAppLink(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mist inline-flex items-center gap-2.5 hover:text-white"
            >
              <Icon name="whatsapp" size={18} className="text-gold shrink-0" />
              {site.contact.whatsappDisplay}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="text-mist inline-flex items-center gap-2.5 hover:text-white"
            >
              <Icon name="mail" size={18} className="text-gold shrink-0" />
              {site.contact.email}
            </a>
            <span className="inline-flex items-center gap-2.5">
              <Icon name="video" size={18} className="text-gold shrink-0" />
              Classes on Google Meet
            </span>
          </div>
        </Container>

        <Container className="relative flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 pb-8 text-sm">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="flex gap-5">
            <Link to="/privacy" className="text-mist no-underline hover:text-white">
              Privacy policy
            </Link>
            <Link to="/terms" className="text-mist no-underline hover:text-white">
              Terms
            </Link>
          </span>
        </Container>
      </div>
    </footer>
  );
}
