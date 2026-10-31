import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { AnnouncementBar } from './AnnouncementBar';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { Footer } from './Footer';
import { Header } from './Header';

/**
 * Scroll to top on route change. When a page opens with a hash (e.g. /#pricing from an ad or another page), scroll
 * to that section once it has rendered: the browser's own jump happens before the app has drawn the page.
 */
function useScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const frame = requestAnimationFrame(() =>
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(),
    );
    return () => cancelAnimationFrame(frame);
    // Only on page change: in-page hash links already scroll natively.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
}

export function SiteLayout() {
  useScrollToTopOnNavigate();
  return (
    <>
      <a
        href="#main"
        className="bg-night sr-only z-[60] rounded-lg px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
