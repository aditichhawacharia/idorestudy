import { CalendarDays, CheckCircle2, FileCheck2, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { CONTACT_EMAIL, EDITORIAL_NAME, SITE_URL } from '../config/site.js';

export default function EditorialPolicy() {
  return (
    <>
      <Seo
        title="Editorial & Corrections Policy"
        description="How IdoréStudy plans, writes, sources, reviews, updates, and corrects its original study guides and public information pages."
        path="/editorial-policy"
        author={EDITORIAL_NAME}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'IdoréStudy Editorial and Corrections Policy',
          url: `${SITE_URL}/editorial-policy`,
          dateModified: '2026-08-20',
          publisher: { '@type': 'Organization', name: 'IdoréStudy', url: SITE_URL },
        }}
      />

      <header className="content-hero professional-hero">
        <div className="narrow-wrap">
          <p className="eyebrow"><FileCheck2 size={16} aria-hidden="true" /> Editorial policy</p>
          <h1 className="content-title">How IdoréStudy creates, reviews, and corrects its public content.</h1>
          <p className="content-lead">
            This policy explains the standards used for original study guides, product information, source links,
            update dates, corrections, and the separation between editorial material and advertising.
          </p>
          <p className="page-byline"><CalendarDays size={14} aria-hidden="true" /> Effective August 20, 2026 · Maintained by {EDITORIAL_NAME}</p>
        </div>
      </header>

      <section className="section">
        <div className="narrow-wrap content-stack">
          <section className="content-card">
            <h2>Scope and publisher responsibility</h2>
            <p>
              IdoréStudy publishes original study guides, interface copy, FAQs, legal and trust pages, and
              documentation for its K-pop study room. The independent creator behind Idoré Collections is
              responsible for the site’s editorial decisions, product maintenance, and correction process.
            </p>
            <p>
              IdoréStudy does not present its publisher as a teacher, researcher, clinician, lawyer, financial
              adviser, or representative of an artist or entertainment company. Study articles provide general
              educational information and practical planning ideas rather than individualized professional advice.
            </p>
          </section>

          <section className="content-card">
            <h2>Standards for original study guides</h2>
            <ul className="check-list">
              <li><CheckCircle2 size={18} aria-hidden="true" /><span>Each guide must address a defined study problem and provide observable actions, examples, prompts, or decision rules.</span></li>
              <li><CheckCircle2 size={18} aria-hidden="true" /><span>Articles are written for IdoréStudy rather than copied, lightly rewritten, or assembled from third-party pages.</span></li>
              <li><CheckCircle2 size={18} aria-hidden="true" /><span>Broad claims are kept proportionate to the available evidence, and the article avoids guaranteed outcomes or misleading academic promises.</span></li>
              <li><CheckCircle2 size={18} aria-hidden="true" /><span>Research references are linked when they support a learning principle discussed in the article. Practical templates and examples are identified as IdoréStudy guidance.</span></li>
              <li><CheckCircle2 size={18} aria-hidden="true" /><span>Body text is reviewed for clarity, useful headings, descriptive link text, accessible language, and a concrete next action.</span></li>
            </ul>
          </section>

          <section className="content-card">
            <h2>Source selection and external links</h2>
            <p>
              When an article relies on a research finding, IdoréStudy prefers primary research papers, scholarly
              reviews, official documentation, or recognized institutional material. Source links are provided for
              readers who want to inspect the underlying work. External links open with security attributes and do
              not imply endorsement of every statement on the destination site.
            </p>
            <p>
              A source may support a general learning principle without validating every practical example in an
              article. IdoréStudy therefore separates cited principles from its own examples, schedules, prompts,
              and product-specific recommendations.
            </p>
          </section>

          <section className="content-card">
            <h2>Review, dates, and material updates</h2>
            <p>
              Guide pages display a publication date and, when different, a material update date. A material update
              includes a substantive correction, revised explanation, added source, changed recommendation, or
              significant structural improvement. Minor formatting and accessibility repairs may not change the
              displayed update date.
            </p>
            <p>
              Pages are reviewed when a reader reports an issue, a source becomes unavailable, a product feature
              changes, or the publisher identifies wording that is inaccurate or unclear. Time-sensitive product and
              privacy claims are checked against the site’s actual configuration before publication.
            </p>
          </section>

          <section className="content-card">
            <h2>Corrections process</h2>
            <p>
              Correction requests should include the page URL, the disputed sentence or feature, a clear explanation,
              and a supporting source when applicable. The publisher reviews the request, checks the relevant source
              or code, and may correct, clarify, remove, or leave the material unchanged with an explanation.
            </p>
            <p>
              Significant corrections are incorporated into the article and reflected in its modified date. Routine
              spelling, formatting, and broken-link repairs may be made without a public correction note. Content and
              copyright concerns involving third-party media follow the separate content and takedown policy.
            </p>
            <div className="content-note">
              <Mail size={20} aria-hidden="true" />
              <div><strong>Submit a correction</strong><p>Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the <Link to="/contact">contact page</Link>.</p></div>
            </div>
          </section>

          <section className="content-card">
            <h2>Advertising and editorial independence</h2>
            <p>
              Advertising does not determine which study topics are covered, how articles are evaluated, or which
              sources are cited. Display-ad placements are clearly labeled, are excluded from the immersive study
              room and legal pages, and are kept away from playback, timer, task, and navigation controls.
            </p>
            <p>
              IdoréStudy does not accept payment to create a favorable editorial conclusion without disclosure.
              Affiliate links are not currently part of the guide library. If that changes, the relevant page and
              site-level policies will be updated before publication.
            </p>
          </section>

          <aside className="notice-card">
            <ShieldCheck size={20} aria-hidden="true" />
            <p>For privacy questions, use the <Link to="/privacy">Privacy Policy</Link>. For embedded-media or rights concerns, use the <Link to="/content-policy">Content and Takedown Policy</Link>.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
