import { BookOpen, Home, Library, Map, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { SITE_URL } from '../config/site.js';
import { guideIndex } from '../data/guideIndex.js';

const groupedGuides = guideIndex.reduce((groups, guide) => {
  if (!groups[guide.category]) groups[guide.category] = [];
  groups[guide.category].push(guide);
  return groups;
}, {});

export default function SitemapPage() {
  return (
    <>
      <Seo
        title="Sitemap"
        description="Browse every public IdoréStudy page, K-pop study-room entry point, practical study guide, trust page, and legal policy."
        path="/sitemap"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'IdoréStudy HTML sitemap',
          url: `${SITE_URL}/sitemap`,
          hasPart: guideIndex.map((guide) => ({ '@type': 'Article', name: guide.title, url: `${SITE_URL}/resources/${guide.slug}` })),
        }}
      />

      <header className="content-hero professional-hero">
        <div className="narrow-wrap">
          <p className="eyebrow"><Map size={16} aria-hidden="true" /> HTML sitemap</p>
          <h1 className="content-title">Every public page in one place.</h1>
          <p className="content-lead">Use this directory to reach the K-pop study room, all {guideIndex.length} study guides, publisher information, contact routes, and site policies.</p>
        </div>
      </header>

      <section className="section">
        <div className="page-wrap sitemap-grid">
          <section className="sitemap-panel">
            <h2><Home size={20} aria-hidden="true" /> Start here</h2>
            <ul>
              <li><Link to="/">Homepage and K-pop buddy selector</Link></li>
              <li><Link to="/study">Full K-pop study room</Link></li>
              <li><Link to="/#choose-buddy">Choose a study buddy</Link></li>
              <li><Link to="/resources">All study guides</Link></li>
            </ul>
          </section>

          <section className="sitemap-panel">
            <h2><Users size={20} aria-hidden="true" /> Publisher and support</h2>
            <ul>
              <li><Link to="/about">About IdoréStudy</Link></li>
              <li><Link to="/editorial-policy">Editorial and corrections policy</Link></li>
              <li><Link to="/contact">Contact and corrections</Link></li>
              <li><Link to="/content-policy">Content, copyright, and takedown policy</Link></li>
            </ul>
          </section>

          <section className="sitemap-panel">
            <h2><ShieldCheck size={20} aria-hidden="true" /> Legal and privacy</h2>
            <ul>
              <li><Link to="/privacy">Privacy policy</Link></li>
              <li><Link to="/terms">Terms of use</Link></li>
              <li><Link to="/disclaimer">Educational disclaimer</Link></li>
            </ul>
          </section>

          <section className="sitemap-panel sitemap-guides-panel">
            <h2><Library size={20} aria-hidden="true" /> Study-guide library</h2>
            <p>{guideIndex.length} original guides grouped by topic.</p>
            <div className="sitemap-guide-groups">
              {Object.entries(groupedGuides).map(([category, items]) => (
                <div key={category}>
                  <h3>{category}</h3>
                  <ul>
                    {items.map((guide) => <li key={guide.slug}><Link to={`/resources/${guide.slug}`}>{guide.title}</Link></li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <aside className="sitemap-note">
            <BookOpen size={20} aria-hidden="true" />
            <p>The machine-readable XML sitemap is available at <a href="/sitemap.xml">/sitemap.xml</a>. Broken-page reports can be sent through the <Link to="/contact">contact page</Link>.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
