import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/cn';
import { anchors, navLinks, site } from '@/config/site';
import { Logo } from '@/components/brand/Logo';
import { ButtonLink, Icon } from '@/components/ui';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-shadow',
        scrolled ? 'border-line shadow-[0_10px_30px_-24px_rgb(10_42_36/0.5)]' : 'border-transparent',
      )}
    >
      <div className="mx-auto flex max-w-[1260px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" aria-label={`${site.name} home`} className="no-underline">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] font-semibold lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ink after:bg-gold-deep hover:text-ink relative no-underline after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:scale-x-0 after:transition-transform hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href={anchors.book} trackAs="Lead">
            Book free trial
          </ButtonLink>
        </div>

        <button
          type="button"
          className="border-line text-ink inline-flex size-11 items-center justify-center rounded-xl border lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-line border-t bg-white px-4 pt-2 pb-5 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-line text-ink border-b py-3.5 text-base font-semibold no-underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <ButtonLink href={anchors.book} trackAs="Lead" size="lg" onClick={() => setOpen(false)}>
              Book free trial
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
