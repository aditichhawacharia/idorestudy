import { ArrowRight, BookOpen, CheckCircle2, Clock3, Compass, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdSlot from '../components/AdSlot.jsx';
import Seo from '../components/Seo.jsx';
import { guides } from '../data/guides.js';

const resourcesAdSlot = import.meta.env.VITE_ADSENSE_RESOURCES_SLOT;

export default function Resources() {
  return (
    <>
      <Seo
        title="Practical Study Guides"
        description="Original, practical guides to Pomodoro sessions, active recall, spaced practice, exam planning, study music, breaks, and distraction-light study spaces."
        path="/resources"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'IdoréStudy practical study guides',
          description: 'Original study guides for planning, retrieval practice, exam preparation, and focus environments.',
          url: 'https://idorestudy.com/resources',
          hasPart: guides.map((guide) => ({
            '@type': 'Article',
            headline: guide.title,
            url: `https://idorestudy.com/resources/${guide.slug}`,
          })),
        }}
      />

      <header className="resource-hero">
        <div className="narrow-wrap">
          <p className="eyebrow"><BookOpen size={16} aria-hidden="true" /> Original study resources</p>
          <h1 className="content-title">Practical methods for the part after you press “start.”</h1>
          <p className="content-lead">
            These guides focus on decisions you can observe: what to finish, how to retrieve information,
            when to schedule another attempt, and how to tell whether your environment is helping.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 28 }}>
        <div className="page-wrap">
          <div className="card-grid">
            {guides.map((guide) => (
              <article className="guide-card" key={guide.slug}>
                <div className="guide-meta"><span>{guide.category}</span><span>{guide.readTime}</span></div>
                <h2>{guide.title}</h2>
                <p>{guide.description}</p>
                <Link className="guide-link" to={`/resources/${guide.slug}`}>
                  Read the full guide <ArrowRight size={15} style={{ display: 'inline', verticalAlign: '-2px' }} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AdSlot slot={resourcesAdSlot} />

      <section className="section section-soft">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="eyebrow"><Compass size={16} aria-hidden="true" /> A simple way to choose</p>
            <h2>Start with the problem you can see.</h2>
          </div>
          <div className="card-grid">
            <article className="info-card">
              <span className="icon-tile"><Clock3 size={21} aria-hidden="true" /></span>
              <h3>I cannot get started</h3>
              <p>Use the Pomodoro guide to shrink the next action and choose an interval with low enough resistance.</p>
              <Link className="guide-link" to="/resources/pomodoro-study-session">Open the Pomodoro guide</Link>
            </article>
            <article className="info-card">
              <span className="icon-tile"><RotateCcw size={21} aria-hidden="true" /></span>
              <h3>I recognize the notes but cannot answer questions</h3>
              <p>Use active recall to turn headings into prompts, attempt answers closed-book, and revisit only the gaps.</p>
              <Link className="guide-link" to="/resources/active-recall-guide">Open the active recall guide</Link>
            </article>
            <article className="info-card">
              <span className="icon-tile"><CheckCircle2 size={21} aria-hidden="true" /></span>
              <h3>Everything feels urgent</h3>
              <p>Use the exam-week plan to rank topics by likely importance and current weakness before building the schedule.</p>
              <Link className="guide-link" to="/resources/exam-week-study-plan">Open the exam-week guide</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="narrow-wrap">
          <div className="content-card" style={{ padding: 'clamp(24px, 5vw, 42px)' }}>
            <h2 style={{ marginTop: 0, fontFamily: 'Playfair Display, Georgia, serif' }}>A five-minute reset before any study session</h2>
            <ol className="steps">
              <li><strong>Write one output:</strong> state what will exist when the block is finished.</li>
              <li><strong>Open the minimum:</strong> keep only the materials required for that output.</li>
              <li><strong>Choose a timer:</strong> use a length you can sustain today, not your ideal-day maximum.</li>
              <li><strong>Plan the break:</strong> select a stopping activity before the focus block begins.</li>
              <li><strong>Leave a next action:</strong> make tomorrow’s starting point visible before you close.</li>
            </ol>
            <p className="note">The timer supplies a boundary. The output and review are what make the boundary useful.</p>
          </div>
        </div>
      </section>
    </>
  );
}
