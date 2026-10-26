import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { AnnouncementBar } from './AnnouncementBar';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { Footer } from './Footer';
import { Header } from './Header';

/** Scroll to top on route change (but let in-page hash links scroll themselves). */
function useScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0 });
  }, [pathname, hash]);
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
