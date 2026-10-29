import { Link } from 'react-router';
import { anchors, site } from '@/config/site';
import { Logo } from '@/components/brand/Logo';
import { ButtonLink, Container, Icon } from '@/components/ui';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';

const columns = [
  {
    title: 'Courses',
    links: [
      { label: 'Noorani Qaida', href: '/#courses' },
      { label: 'Nazra', href: '/#courses' },
      { label: 'Tajweed', href: '/#courses' },
      { label: 'Hifz', href: '/#hifz' },
      { label: 'Daily Duas', href: '/#courses' },
    ],
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
  return (
    <footer className="bg-parchment px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="bg-deep text-mist relative overflow-hidden rounded-[40px] text-[15px]">
        <span
          aria-hidden
          className="absolute -top-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(25_162_122/0.28),transparent_65%)]"
        />
        <Container className="relative flex flex-col items-center gap-6 pt-20 pb-16 text-center">
          <h2 className="max-w-[760px] text-[clamp(36px,5vw,64px)] leading-[1.02] text-white">
            Start your child's Quran journey <em className="text-gold">this week</em>
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

        <Container className="relative grid gap-10 border-t border-white/10 pt-14 pb-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div className="flex max-w-80 flex-col gap-4">
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
          <div className="flex flex-col gap-3">
            <h2 className="font-sans text-sm font-bold tracking-normal text-white">Contact</h2>
            <span className="inline-flex items-center gap-2.5">
              <Icon name="whatsapp" size={18} className="text-gold shrink-0" />
              {site.contact.whatsappDisplay}
            </span>
            <span className="inline-flex items-center gap-2.5">
              <Icon name="mail" size={18} className="text-gold shrink-0" />
              {site.contact.email}
            </span>
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
