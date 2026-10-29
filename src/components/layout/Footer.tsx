import { Link } from 'react-router';
import { anchors, site } from '@/config/site';
import { Logo } from '@/components/brand/Logo';
import { GirihPattern } from '@/components/decor/GirihPattern';
import { ButtonLink, Container, Icon } from '@/components/ui';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';

const columns = [
  {
    title: 'Courses',
    links: [
      { label: 'Noorani Qaida', href: '/#courses' },
      { label: 'Nazra', href: '/#courses' },
      { label: 'Tajweed', href: '/#courses' },
      { label: 'Daily Duas', href: '/#courses' },
    ],
  },
  {
    title: 'Academy',
    links: [
      { label: 'How it works', href: '/#how' },
      { label: 'Classroom', href: '/#classroom' },
      { label: 'Teachers', href: '/#teachers' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Track record', href: '/#reviews' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-deep text-mist relative overflow-hidden text-[15px]">
      <GirihPattern tone="dark" className="opacity-60" />
      <Container className="relative pt-16">
        <div className="border-gold/20 flex flex-wrap items-center justify-between gap-6 rounded-[26px] border bg-white/[0.04] px-7 py-6">
          <div className="flex flex-col gap-1">
            <p className="text-cream text-[22px] font-extrabold tracking-[-0.02em]">
              Your first class is on us
            </p>
            <p>30 minutes on Google Meet, one-on-one. The link arrives by email as soon as you book.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <ButtonLink href={anchors.book} variant="gold" iconRight="arrow-right" trackAs="Lead">
              Book a free class
            </ButtonLink>
            <ButtonLink
              href={buildWhatsAppLink(whatsappMessages.general)}
              variant="ghostDark"
              iconLeft="whatsapp"
              trackAs="Contact"
            >
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </Container>

      <Container className="relative grid gap-10 pt-14 pb-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
        <div className="flex max-w-80 flex-col gap-4">
          <Logo tone="dark" size="lg" />
          <p>Live one-on-one Quran classes for kids &amp; adults in the UK, US and Europe.</p>
          <p lang="ar" dir="rtl" className="font-naskh text-gold/80 self-start text-xl leading-[1.9]">
            {site.arabicNameFull}
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-2.5">
            <h2 className="text-gold text-[13px] font-extrabold tracking-[0.12em] uppercase">{col.title}</h2>
            {col.links.map((link) => (
              <a key={link.label} href={link.href} className="text-mist w-fit no-underline hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        ))}
        <div className="flex flex-col gap-3">
          <h2 className="text-gold text-[13px] font-extrabold tracking-[0.12em] uppercase">Contact</h2>
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

      <Container className="border-gold/15 relative flex flex-wrap justify-between gap-3 border-t pt-5 pb-8 text-sm">
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
    </footer>
  );
}
