import { Link } from 'react-router';
import { site } from '@/config/site';
import { Logo } from '@/components/brand/Logo';
import { Container } from '@/components/ui';

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
      { label: 'Teachers', href: '/#teachers' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Reviews', href: '/#reviews' },
      { label: 'Student login', href: '/#portal' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-deep text-mist text-[15px]">
      <Container className="flex flex-wrap justify-between gap-9 pt-16 pb-7">
        <div className="flex max-w-80 flex-col gap-3">
          <Logo tone="dark" size="lg" />
          <p>Live one-on-one Quran classes for kids &amp; adults in the UK, US and Europe.</p>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-2.5">
            <h2 className="text-gold text-[13px] font-extrabold tracking-[0.12em] uppercase">{col.title}</h2>
            {col.links.map((link) => (
              <a key={link.label} href={link.href} className="text-mist hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        ))}
        <div className="flex flex-col gap-2.5">
          <h2 className="text-gold text-[13px] font-extrabold tracking-[0.12em] uppercase">Contact</h2>
          <span>WhatsApp: {site.contact.whatsappDisplay}</span>
          <span>Email: {site.contact.email}</span>
        </div>
      </Container>
      <Container className="border-gold/15 flex flex-wrap justify-between gap-3 border-t pt-5 pb-8">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span className="flex gap-5">
          <Link to="/privacy" className="text-mist hover:text-white">
            Privacy policy
          </Link>
          <Link to="/terms" className="text-mist hover:text-white">
            Terms
          </Link>
        </span>
      </Container>
    </footer>
  );
}
