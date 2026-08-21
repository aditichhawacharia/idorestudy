import { ArrowLeft, ArrowRight, CalendarDays, Clock3, ExternalLink, FileCheck2, UserRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import AdSlot from '../components/AdSlot.jsx';
import Seo from '../components/Seo.jsx';
import { EDITORIAL_NAME, SITE_URL } from '../config/site.js';
import { getGuide, guides } from '../data/guides.js';
import NotFound from './NotFound.jsx';

const guideAdSlot = import.meta.env.VITE_ADSENSE_GUIDE_SLOT;

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    .format(new Date(`${date}T12:00:00`));
}

function sectionId(heading) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function GuideArticle() {
  const { slug } = useParams();
  const guide = getGuide(slug);
  if (!guide) return <NotFound />;

  const sameCategory = guides.filter((item) => item.slug !== guide.slug && item.category === guide.category);
  const fallback = guides.filter((item) => item.slug !== guide.slug && !sameCategory.includes(item));
  const related = [...sameCategory, ...fallback].slice(0, 3);
  const canonicalUrl = `${SITE_URL}/resources/${guide.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    author: {
      '@type': 'Organization',
      name: EDITORIAL_NAME,
      url: `${SITE_URL}/about#publisher`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'IdoréStudy',
      url: SITE_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'editorial corrections',
        email: 'idore.collections@gmail.com',
      },
    },
    keywords: guide.keywords.join(', '),
    citation: guide.sources.map((source) => source.url),
  };

  return (
    <>
      <Seo
        title={guide.shortTitle}
        description={guide.description}
        path={`/resources/${guide.slug}`}
        type="article"
        structuredData={articleSchema}
        publishedTime={guide.datePublished}
        modifiedTime={guide.dateModified}
        author={EDITORIAL_NAME}
      />

      <article className="article-wrap">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/"><ArrowLeft size={14} aria-hidden="true" /> Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/resources">Study guides</Link>
          <span aria-hidden="true">/</span>
          <span>{guide.category}</span>
        </nav>

        <header className="article-header">
          <p className="eyebrow">{guide.category}</p>
          <h1>{guide.title}</h1>
          <p className="article-deck">{guide.description}</p>
          <div className="article-meta">
            <span><Clock3 size={15} aria-hidden="true" /> {guide.readTime}</span>
            <span>By <Link to="/about#publisher">{EDITORIAL_NAME}</Link></span>
            <span><CalendarDays size={15} aria-hidden="true" /> Published {formatDate(guide.datePublished)}</span>
            {guide.dateModified !== guide.datePublished && <span>Updated {formatDate(guide.dateModified)}</span>}
          </div>
        </header>

        <nav className="article-toc" aria-labelledby="article-toc-title">
          <strong id="article-toc-title">On this page</strong>
          <ol>
            {guide.sections.map((section) => (
              <li key={section.heading}><a href={`#${sectionId(section.heading)}`}>{section.heading.replace(/^\d+\.\s*/, '')}</a></li>
            ))}
            {guide.sources.length > 0 && <li><a href="#sources-and-reading">Sources and further reading</a></li>}
          </ol>
        </nav>

        <div className="article-body">
          {guide.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

          {guide.sections.map((section, index) => (
            <section key={section.heading} id={sectionId(section.heading)}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.list && <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
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
            <section className="article-sources" id="sources-and-reading" aria-labelledby="sources-title">
              <h2 id="sources-title">Sources and further reading</h2>
              <p>
                The references below support learning principles discussed in this article. The practical
                examples, prompts, and session templates are original IdoréStudy editorial guidance.
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

          <aside className="article-author-box" aria-label="About the publisher">
            <span className="publisher-avatar" aria-hidden="true"><UserRound size={24} /></span>
            <div>
              <p className="eyebrow">About the publisher</p>
              <h2>{EDITORIAL_NAME}</h2>
              <p>
                IdoréStudy is independently designed, written, and maintained by the creator behind Idoré
                Collections. The site publishes general educational information and practical study tools; it
                does not claim academic, clinical, legal, or financial credentials.
              </p>
              <div className="inline-actions">
                <Link className="text-link" to="/about#publisher">Publisher details</Link>
                <Link className="text-link" to="/editorial-policy"><FileCheck2 size={15} aria-hidden="true" /> Editorial policy</Link>
              </div>
            </div>
          </aside>
        </div>

        <section className="related-guides" aria-labelledby="related-title">
          <div className="section-heading">
            <p className="eyebrow">Continue building the routine</p>
            <h2 id="related-title">Related study guides</h2>
          </div>
          <div className="card-grid">
            {related.map((item) => (
              <article className="guide-card" key={item.slug}>
                <div className="guide-meta"><span>{item.category}</span><span>{item.readTime}</span></div>
                <h3>{item.shortTitle}</h3>
                <p>{item.description}</p>
                <Link className="guide-link" to={`/resources/${item.slug}`}>
                  Read next <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
