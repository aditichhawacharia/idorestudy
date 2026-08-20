import { ArrowLeft, ArrowRight, CalendarDays, Clock3, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import AdSlot from '../components/AdSlot.jsx';
import Seo from '../components/Seo.jsx';
import { getGuide, guides } from '../data/guides.js';
import NotFound from './NotFound.jsx';

const guideAdSlot = import.meta.env.VITE_ADSENSE_GUIDE_SLOT;

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(`${date}T12:00:00`));
}

export default function GuideArticle() {
  const { slug } = useParams();
  const guide = getGuide(slug);
  if (!guide) return <NotFound />;

  const currentIndex = guides.findIndex((item) => item.slug === guide.slug);
  const related = guides.filter((item) => item.slug !== guide.slug).slice(currentIndex % 2, (currentIndex % 2) + 2);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    mainEntityOfPage: `https://idorestudy.com/resources/${guide.slug}`,
    author: { '@type': 'Organization', name: 'IdoréStudy' },
    publisher: { '@type': 'Organization', name: 'IdoréStudy', url: 'https://idorestudy.com' },
    keywords: guide.keywords.join(', '),
  };

  return (
    <>
      <Seo
        title={guide.title}
        description={guide.description}
        path={`/resources/${guide.slug}`}
        type="article"
        structuredData={articleSchema}
        publishedTime={guide.datePublished}
        modifiedTime={guide.dateModified}
        author="IdoréStudy Editorial"
      />

      <article className="article-wrap">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/resources"><ArrowLeft size={14} aria-hidden="true" /> Study guides</Link>
          <span aria-hidden="true">/</span>
          <span>{guide.category}</span>
        </nav>

        <header className="article-header">
          <p className="eyebrow">{guide.category}</p>
          <h1>{guide.title}</h1>
          <p className="article-deck">{guide.description}</p>
          <div className="article-meta">
            <span><Clock3 size={15} aria-hidden="true" /> {guide.readTime}</span>
            <span>By <Link to="/about">IdoréStudy Editorial</Link></span>
            <span><CalendarDays size={15} aria-hidden="true" /> Published {formatDate(guide.datePublished)}</span>
            {guide.dateModified !== guide.datePublished && (
              <span>Updated {formatDate(guide.dateModified)}</span>
            )}
          </div>
        </header>

        <div className="article-body">
          {guide.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

          {guide.sections.map((section, index) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.list && (
                <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>
              )}
              {section.callout && (
                <aside className="callout">
                  <h3>{section.callout.title}</h3>
                  <p>{section.callout.text}</p>
                </aside>
              )}
              {index === 2 && <AdSlot slot={guideAdSlot} />}
            </section>
          ))}

          {guide.sources.length > 0 && (
            <section className="article-sources" aria-labelledby="sources-title">
              <h2 id="sources-title">Sources and further reading</h2>
              <p>
                These references support the learning principles discussed above. The practical examples and
                session templates on this page are original IdoréStudy editorial guidance.
              </p>
              <ul>
                {guide.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.title} <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <section className="section" style={{ paddingBottom: 0 }} aria-labelledby="related-title">
          <div className="section-heading">
            <p className="eyebrow">Continue building the routine</p>
            <h2 id="related-title">Related guides</h2>
          </div>
          <div className="two-column-grid">
            {related.map((item) => (
              <article className="guide-card" key={item.slug}>
                <div className="guide-meta"><span>{item.category}</span><span>{item.readTime}</span></div>
                <h3>{item.shortTitle}</h3>
                <p>{item.description}</p>
                <Link className="guide-link" to={`/resources/${item.slug}`}>
                  Read next <ArrowRight size={14} style={{ display: 'inline', verticalAlign: '-2px' }} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
