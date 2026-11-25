import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { ButtonLink } from '@/components/ui';
import { anchors } from '@/config/site';
import { cn } from '@/lib/cn';

/**
 * Phones only: a slim bar pinned to the bottom with the free-class call to action. It slides in once the hero
 * is scrolled past, and slides away near the footer (which has its own call to action) and on the booking
 * page itself. While it shows, `data-bookbar="on"` on <body> lifts the floating WhatsApp button above it.
 */
export function MobileBookBar() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const enabled = pathname !== anchors.book;

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let footerVisible = false;
    const update = () => {
      frame = 0;
      setShow(window.scrollY > window.innerHeight * 0.9 && !footerVisible);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const footer = document.querySelector('footer');
    const observer =
      footer && typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            footerVisible = Boolean(entry?.isIntersecting);
            onScroll();
          })
        : null;
    if (footer) observer?.observe(footer);
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  const visible = enabled && show;
  useEffect(() => {
    document.body.dataset.bookbar = visible ? 'on' : 'off';
  }, [visible]);

  if (!enabled) return null;
  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed inset-x-3 bottom-3 z-40 transition duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] md:hidden',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[140%] opacity-0',
      )}
    >
      <div className="flex items-center justify-between gap-3 rounded-full bg-[linear-gradient(180deg,#0e3a2e,#04150f)] py-2 pr-2 pl-5 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_0_0_1px_rgb(247_213_139/0.18),0_18px_40px_-16px_rgb(4_21_15/0.8)]">
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-[14px] font-bold">Free 30-min trial</span>
          <span className="text-mist truncate text-[12px]">Live on Google Meet</span>
        </span>
        <ButtonLink
          href={anchors.book}
          variant="gold"
          iconRight="arrow-right"
          trackAs="Lead"
          tabIndex={visible ? undefined : -1}
          className="shrink-0"
        >
          Book a free class
        </ButtonLink>
      </div>
    </div>
  );
}
