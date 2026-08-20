import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import ContentPolicy from './pages/ContentPolicy.jsx';
import GuideArticle from './pages/GuideArticle.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Resources from './pages/Resources.jsx';
import StudyCafe from './pages/StudyCafe.jsx';
import Terms from './pages/Terms.jsx';

function PublicPage({ children }) {
  return <SiteLayout>{children}</SiteLayout>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/study" element={<StudyCafe />} />
      <Route path="/" element={<PublicPage><Home /></PublicPage>} />
      <Route path="/resources" element={<PublicPage><Resources /></PublicPage>} />
      <Route path="/resources/:slug" element={<PublicPage><GuideArticle /></PublicPage>} />
      <Route path="/about" element={<PublicPage><About /></PublicPage>} />
      <Route path="/contact" element={<PublicPage><Contact /></PublicPage>} />
      <Route path="/privacy" element={<PublicPage><PrivacyPolicy /></PublicPage>} />
      <Route path="/terms" element={<PublicPage><Terms /></PublicPage>} />
      <Route path="/content-policy" element={<PublicPage><ContentPolicy /></PublicPage>} />
      <Route path="*" element={<PublicPage><NotFound /></PublicPage>} />
    </Routes>
  );
}
