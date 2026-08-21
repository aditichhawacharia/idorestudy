import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Analytics from './Analytics.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return undefined;
    }

    let frame;
    let attempts = 0;
    let cancelled = false;
    const targetId = decodeURIComponent(hash.slice(1));

    const scrollWhenReady = () => {
      if (cancelled) return;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'auto' });
        return;
      }
      attempts += 1;
      if (attempts < 90) frame = window.requestAnimationFrame(scrollWhenReady);
    };

    frame = window.requestAnimationFrame(scrollWhenReady);
    return () => {
      cancelled = true;
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname, hash]);

  return null;
}

export default function SiteLayout({ children }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollToTop />
      <Analytics />
      <Navbar />
      <main id="main-content" className="site-main">{children}</main>
      <Footer />
    </div>
  );
}
