import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Compass,
  FileCheck2,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdSlot from '../components/AdSlot.jsx';
import Seo from '../components/Seo.jsx';
import { EDITORIAL_NAME, SITE_URL } from '../config/site.js';
import { guideIndex } from '../data/guideIndex.js';

const resourcesAdSlot = import.meta.env.VITE_ADSENSE_RESOURCES_SLOT;
const categories = ['All', ...new Set(guideIndex.map((guide) => guide.category))];

export default function Resources() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filteredGuides = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return guideIndex.filter((guide) => {
      const categoryMatch = category === 'All' || guide.category === category;
      const queryMatch = !normalized || [guide.title, guide.description, guide.category, ...guide.keywords]
        .join(' ')
        .toLowerCase()
        .includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  return (
    <>
      <Seo
        title="Practical Study Guides"
        description={`${guideIndex.length} original, practical guides for focus planning, active recall, spaced review, exam preparation, reading, problem solving, and study routines.`}
        path="/resources"
        author={EDITORIAL_NAME}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'IdoréStudy practical study guides',
          description: 'Original, source-supported study guides with concrete routines, examples, and review prompts.',
          url: `${SITE_URL}/resources`,
          author: { '@type': 'Organization', name: EDITORIAL_NAME, url: `${SITE_URL}/about` },
          hasPart: guideIndex.map((guide) => ({
            '@type': 'Article',
            headline: guide.title,
            url: `${SITE_URL}/resources/${guide.slug}`,
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
          })),
        }}
      />

      <header className="resource-hero professional-hero">
        <div className="page-wrap resource-hero-layout">
          <div>
            <p className="eyebrow"><BookOpen size={16} aria-hidden="true" /> Original study guidance</p>
            <h1 className="content-title">Study methods explained as actions you can use today.</h1>
            <p className="content-lead">
              Browse {guideIndex.length} detailed guides on planning, retrieval practice, reading, problem solving,
              exam preparation, study environments, and sustainable routines. Each article includes concrete
              prompts, examples, publication details, and supporting references where relevant.
            </p>
            <p className="page-byline">Written and maintained by <Link to="/about#publisher">{EDITORIAL_NAME}</Link> · Updated August 20, 2026</p>
          </div>
          <aside className="resource-summary" aria-label="Guide library summary">
            <strong>{guideIndex.length}</strong>
            <span>in-depth guides</span>
            <p>Every guide contains at least 600 words, practical examples, and a visible source section.</p>
          </aside>
        </div>
      </header>

      <section className="section resource-library" aria-labelledby="guide-library-title">
        <div className="page-wrap">
          <div className="library-heading-row">
            <div className="section-heading">
              <p className="eyebrow"><SlidersHorizontal size={16} aria-hidden="true" /> Find the right guide</p>
              <h2 id="guide-library-title">Browse the full study-guide library</h2>
              <p>Search by topic or use a category filter. The article opens on its own indexable page.</p>
            </div>
            <p className="library-result-count" aria-live="polite">{filteredGuides.length} of {guideIndex.length} guides</p>
          </div>

          <div className="guide-library-controls">
            <label className="guide-search">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Search study guides</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search active recall, exams, notes, focus…"
              />
            </label>
            <div className="guide-category-filter" aria-label="Filter study guides by category">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={category === item ? 'active' : ''}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {filteredGuides.length > 0 ? (
            <div className="guide-library-grid">
              {filteredGuides.map((guide) => (
                <article className="guide-card professional-guide-card" key={guide.slug}>
                  <div className="guide-meta"><span>{guide.category}</span><span>{guide.readTime}</span></div>
                  <h2>{guide.title}</h2>
                  <p>{guide.description}</p>
                  <div className="guide-card-footer">
                    <span>Published {new Date(`${guide.datePublished}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <Link className="guide-link" to={`/resources/${guide.slug}`}>
                      Read guide <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No guide matches that search.</h3>
              <p>Clear the search or choose another category to see the full library.</p>
              <button type="button" className="secondary-button" onClick={() => { setQuery(''); setCategory('All'); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <AdSlot slot={resourcesAdSlot} />

      <section className="section section-soft">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="eyebrow"><Compass size={16} aria-hidden="true" /> Choose by the problem you can see</p>
            <h2>Three reliable starting points</h2>
          </div>
          <div className="card-grid">
            <article className="info-card">
              <span className="icon-tile"><Clock3 size={21} aria-hidden="true" /></span>
              <h3>I cannot get started</h3>
              <p>Reduce the task to one visible outcome and choose a focus interval that fits today’s energy.</p>
              <Link className="guide-link" to="/resources/start-studying-when-overwhelmed">Start when overwhelmed</Link>
            </article>
            <article className="info-card">
              <span className="icon-tile"><RotateCcw size={21} aria-hidden="true" /></span>
              <h3>I recognize my notes but cannot answer questions</h3>
              <p>Turn headings into prompts, retrieve without looking, and use feedback to repair only the gaps.</p>
              <Link className="guide-link" to="/resources/active-recall-guide">Use active recall</Link>
            </article>
            <article className="info-card">
              <span className="icon-tile"><CheckCircle2 size={21} aria-hidden="true" /></span>
              <h3>I am falling behind</h3>
              <p>Protect current deadlines, identify prerequisite gaps, and build short catch-up blocks with real outputs.</p>
              <Link className="guide-link" to="/resources/catch-up-study-plan">Build a catch-up plan</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-wrap editorial-trust-panel">
          <div>
            <p className="eyebrow"><FileCheck2 size={16} aria-hidden="true" /> Editorial standards</p>
            <h2>How these guides are written and maintained</h2>
            <p>
              IdoréStudy articles are written for practical use rather than search-volume padding. Guidance is
              organized around observable decisions and examples. Research links are included when an established
              learning principle supports the article, and correction requests are reviewed through a published process.
            </p>
          </div>
          <div className="editorial-trust-links">
            <Link to="/about#publisher">Publisher information</Link>
            <Link to="/editorial-policy">Editorial and corrections policy</Link>
            <Link to="/disclaimer">Educational disclaimer</Link>
          </div>
        </div>
      </section>
    </>
  );
}
