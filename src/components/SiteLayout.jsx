import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
      });
      return () => window.cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    return undefined;
  }, [pathname, hash]);
  return null;
}

export default function SiteLayout({ children }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="site-main">{children}</main>
      <Footer />
    </div>
  );
}
