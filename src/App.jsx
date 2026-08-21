import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const StudyCafe = lazy(() => import('./pages/StudyCafe.jsx'));
const Resources = lazy(() => import('./pages/Resources.jsx'));
const GuideArticle = lazy(() => import('./pages/GuideArticle.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const ContentPolicy = lazy(() => import('./pages/ContentPolicy.jsx'));
const EditorialPolicy = lazy(() => import('./pages/EditorialPolicy.jsx'));
const Disclaimer = lazy(() => import('./pages/Disclaimer.jsx'));
const SitemapPage = lazy(() => import('./pages/SitemapPage.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function RouteLoader({ immersive = false }) {
  return (
    <div className={immersive ? 'route-loader immersive-loader' : 'route-loader'} role="status" aria-live="polite">
      <span className="route-loader-dot" aria-hidden="true" />
      <span>{immersive ? 'Opening the study room…' : 'Loading page…'}</span>
    </div>
  );
}

function PublicPage({ children }) {
  return (
    <SiteLayout>
      <Suspense fallback={<RouteLoader />}>{children}</Suspense>
    </SiteLayout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/study" element={<Suspense fallback={<RouteLoader immersive />}><StudyCafe /></Suspense>} />
      <Route path="/" element={<PublicPage><Home /></PublicPage>} />
      <Route path="/resources" element={<PublicPage><Resources /></PublicPage>} />
      <Route path="/resources/:slug" element={<PublicPage><GuideArticle /></PublicPage>} />
      <Route path="/about" element={<PublicPage><About /></PublicPage>} />
      <Route path="/contact" element={<PublicPage><Contact /></PublicPage>} />
      <Route path="/privacy" element={<PublicPage><PrivacyPolicy /></PublicPage>} />
      <Route path="/terms" element={<PublicPage><Terms /></PublicPage>} />
      <Route path="/content-policy" element={<PublicPage><ContentPolicy /></PublicPage>} />
      <Route path="/editorial-policy" element={<PublicPage><EditorialPolicy /></PublicPage>} />
      <Route path="/disclaimer" element={<PublicPage><Disclaimer /></PublicPage>} />
      <Route path="/sitemap" element={<PublicPage><SitemapPage /></PublicPage>} />
      <Route path="*" element={<PublicPage><NotFound /></PublicPage>} />
    </Routes>
  );
}
