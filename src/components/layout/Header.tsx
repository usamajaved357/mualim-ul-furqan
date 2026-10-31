import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/cn';
import { anchors, courseLinks, navLinks, site } from '@/config/site';
import { useHideOnScroll } from '@/hooks/useHideOnScroll';
import { Logo } from '@/components/brand/Logo';
import { ButtonLink, Icon } from '@/components/ui';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import { CourseMenuLink, CoursesMenu } from './CoursesMenu';

/** Floating header: slides away while scrolling down, comes back as soon as you scroll up. */
export function Header() {
  const [open, setOpen] = useState(false);
  const { hidden, scrolled } = useHideOnScroll();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 px-3 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] sm:px-5',
        // Keyboard users tabbing into a hidden header get it back.
        hidden && !open && '-translate-y-[calc(100%+12px)] focus-within:translate-y-0!',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-[1260px] items-center justify-between gap-4 rounded-full border py-2 pr-2 pl-4 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 sm:pl-5',
          scrolled || open ? 'border-line shadow-card bg-white/85' : 'border-transparent bg-white/50',
        )}
      >
        <Link to="/" aria-label={`${site.name} home`} className="no-underline">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 text-[15px] font-semibold xl:flex">
          {navLinks.map((link) =>
            link.label === 'Courses' ? (
              <CoursesMenu key={link.href} />
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-ink/80 hover:text-ink hover:bg-cream rounded-full px-3.5 py-2 whitespace-nowrap no-underline transition-colors"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex xl:ml-0">
          <a
            href={buildWhatsAppLink(whatsappMessages.general)}
            aria-label="Chat on WhatsApp"
            className="text-whatsapp hover:bg-mint flex size-11 items-center justify-center rounded-full transition-colors"
          >
            <Icon name="whatsapp" size={21} />
          </a>
          <ButtonLink href={anchors.book} trackAs="Lead" iconRight="arrow-right">
            Book a free class
          </ButtonLink>
        </div>

        <button
          type="button"
          className="bg-ink inline-flex size-11 shrink-0 items-center justify-center rounded-full text-white xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={20} />
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-line shadow-float mx-auto mt-2 max-w-[1260px] rounded-[28px] border bg-white p-3 xl:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            <p className="text-muted px-4 pt-2 pb-1 text-xs font-bold tracking-wide uppercase">Courses</p>
            {courseLinks.map((link) => (
              <CourseMenuLink key={link.id} link={link} onNavigate={() => setOpen(false)} />
            ))}
            <span aria-hidden className="bg-line mx-4 my-2 h-px" />
            {navLinks
              .filter((link) => link.label !== 'Courses')
              .map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-ink hover:bg-cream flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold no-underline"
                >
                  {link.label}
                  <Icon name="chevron-right" size={18} className="text-muted" />
                </a>
              ))}
          </nav>
          <div className="mt-2 grid gap-2 p-1">
            <ButtonLink href={anchors.book} trackAs="Lead" size="lg" onClick={() => setOpen(false)}>
              Book a free class
            </ButtonLink>
            <ButtonLink
              href={buildWhatsAppLink(whatsappMessages.general)}
              variant="soft"
              size="lg"
              iconLeft="whatsapp"
              trackAs="Contact"
            >
              Chat on WhatsApp
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
