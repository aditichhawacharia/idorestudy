import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The requested IdoréStudy page could not be found." path="/404" noIndex />
      <section className="not-found">
        <div className="not-found-card">
          <p className="eyebrow">404</p>
          <h1>That page is not in this study plan.</h1>
          <p>The address may be incorrect, or the page may have moved.</p>
          <div className="button-row" style={{ justifyContent: 'center' }}>
            <Link className="primary-button" to="/"><ArrowLeft size={17} aria-hidden="true" /> Return home</Link>
            <Link className="secondary-button" to="/study">Open the study room</Link>
          </div>
        </div>
      </section>
    </>
  );
}
