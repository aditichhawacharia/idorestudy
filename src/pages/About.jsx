import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Headphones,
  ListChecks,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { CONTACT_EMAIL, EDITORIAL_NAME, SITE_URL } from '../config/site.js';

const lastUpdated = 'August 20, 2026';

export default function About() {
  return (
    <>
      <Seo
        title="About the K-pop Study Room"
        description="Learn who publishes IdoréStudy, why the K-pop study room exists, how its tools and editorial content are maintained, and how third-party media is handled."
        path="/about"
        author={EDITORIAL_NAME}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'AboutPage',
              name: 'About IdoréStudy',
              url: `${SITE_URL}/about`,
              description: 'Publisher, purpose, editorial standards, and media information for IdoréStudy.',
            },
            {
              '@type': 'Organization',
              '@id': `${SITE_URL}/#publisher`,
              name: 'IdoréStudy',
              url: `${SITE_URL}/`,
              email: CONTACT_EMAIL,
              description: 'An independent publisher of a K-pop study room and practical study guides.',
            },
          ],
        }}
      />

      <header className="content-hero professional-hero">
        <div className="narrow-wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">/</span><span>About</span>
          </nav>
          <p className="eyebrow">About IdoréStudy</p>
          <h1 className="content-title">A K-pop study room with a clear purpose: help people begin and stay with the work.</h1>
          <p className="content-lead">
            IdoréStudy combines an immediate “pick your bias and start” experience with practical focus tools
            and original study guidance. It is independent, fan-made, free to use, and built so the K-pop
            atmosphere supports the session rather than replacing it.
          </p>
          <p className="page-byline">Published by IdoréStudy Editorial · Updated {lastUpdated}</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 28 }}>
        <div className="page-wrap about-layout">
          <aside className="about-summary" aria-label="IdoréStudy at a glance">
            <p className="section-kicker">At a glance</p>
            <dl>
              <div><dt>What it is</dt><dd>A free K-pop focus room and study-guide library</dd></div>
              <div><dt>Account required</dt><dd>No</dd></div>
              <div><dt>Study room ads</dt><dd>None</dd></div>
              <div><dt>Publisher</dt><dd>IdoréStudy / Idoré Collections</dd></div>
              <div><dt>Affiliation</dt><dd>Independent; no artist or label affiliation</dd></div>
              <div><dt>Contact</dt><dd><a href="mailto:idore.collections@gmail.com">idore.collections@gmail.com</a></dd></div>
            </dl>
          </aside>

          <div className="article-body about-article">
            <section>
              <p className="eyebrow">What the product does</p>
              <h2>A direct route from choosing a study buddy to starting a session</h2>
              <p>
                The central experience is intentionally simple. A visitor chooses a K-pop study buddy on the
                homepage or in the study-room lobby, then enters a full-screen focus workspace. The room includes
                a configurable study and break timer, a local task list, optional YouTube ambience, and controls
                that can be minimized once the session begins.
              </p>
              <p>
                No account is required. Timer preferences, the current session outcome, and task-list data are
                stored in the browser on the device being used. This keeps the setup fast, but it also means the
                information does not automatically sync between devices and may disappear if browser storage is
                cleared.
              </p>
              <div className="inline-actions">
                <Link className="primary-button" to="/#choose-buddy">Choose a study buddy <ArrowRight size={16} /></Link>
                <Link className="secondary-button" to="/study">Open the room lobby</Link>
              </div>
            </section>

            <section>
              <p className="eyebrow">Why K-pop</p>
              <h2>Familiar motivation can make the first minute easier</h2>
              <p>
                Starting is often the hardest part of a study session. For many K-pop fans, choosing a favorite
                artist creates a familiar, personal transition into work. IdoréStudy keeps that choice visible and
                immediate instead of hiding the core experience behind a generic productivity landing page.
              </p>
              <p>
                The room is not presented as a learning method by itself. The background and optional music are
                atmosphere. The outcome, timer, task list, retrieval practice, and review habits are the parts that
                organize the work. Users are encouraged to pause the media or study in silence whenever sound or
                video makes a task harder.
              </p>
            </section>

            <section>
              <p className="eyebrow">What is original</p>
              <h2>The tools, planning prompts, interface, and study articles are IdoréStudy material</h2>
              <div className="about-feature-list">
                <article><Clock3 size={20} /><div><h3>Session structure</h3><p>Configurable timer presets, focus and break states, completion prompts, and a visible session outcome.</p></div></article>
                <article><ListChecks size={20} /><div><h3>Task workflow</h3><p>A local to-do list with completion tracking and a lightweight setup designed for one session at a time.</p></div></article>
                <article><BookOpen size={20} /><div><h3>Editorial library</h3><p>Original long-form guides with concrete examples, decision rules, linked references, dates, and bylines.</p></div></article>
                <article><Headphones size={20} /><div><h3>Media controls</h3><p>Optional third-party embeds, source links, no-music defaults, and an ad-free immersive workspace.</p></div></article>
              </div>
            </section>

            <section id="publisher">
              <p className="eyebrow">Publisher information</p>
              <h2>Maintained by the independent creator behind Idoré Collections</h2>
              <p>
                IdoréStudy is published and maintained by the creator behind Idoré Collections, an independent
                K-pop fan and digital-product creator. The publisher develops the interface, maintains the study
                tools, writes and updates the site copy, reviews correction requests, and manages the resource
                library. IdoréStudy does not claim academic, medical, legal, or mental-health credentials.
              </p>
              <p>
                The study articles provide general educational information and practical planning ideas. They are
                not a substitute for instruction from a teacher, disability-services office, clinician, counselor,
                or another qualified professional who understands an individual situation.
              </p>
              <div className="publisher-identity-card">
                <span className="publisher-avatar" aria-hidden="true"><UserRound size={24} /></span>
                <div>
                  <strong>IdoréStudy Editorial</strong>
                  <span>Independent publisher, product creator, and site maintainer</span>
                  <a href="mailto:idore.collections@gmail.com">idore.collections@gmail.com</a>
                </div>
              </div>
            </section>

            <section>
              <p className="eyebrow">Editorial standards</p>
              <h2>Useful, specific, transparent, and open to correction</h2>
              <ul className="check-list">
                <li><CheckCircle2 size={18} aria-hidden="true" /><span>Articles must give readers a concrete action, example, prompt, or decision rule rather than repeating broad slogans.</span></li>
                <li><CheckCircle2 size={18} aria-hidden="true" /><span>Sources are linked when a research finding or established learning principle supports the guidance.</span></li>
                <li><CheckCircle2 size={18} aria-hidden="true" /><span>Publication and update dates are shown, and material is revised when an error or unclear explanation is identified.</span></li>
                <li><CheckCircle2 size={18} aria-hidden="true" /><span>Commercial placements are kept separate from editorial recommendations and away from interactive study controls.</span></li>
              </ul>
              <Link className="text-link" to="/editorial-policy">Read the editorial and corrections policy <ArrowRight size={15} /></Link>
            </section>

            <section>
              <p className="eyebrow">Third-party media and independence</p>
              <h2>Artist media is optional, externally hosted, and not owned by IdoréStudy</h2>
              <p>
                Study backgrounds and music choices are embedded from third-party platforms, primarily YouTube.
                IdoréStudy does not host those video or audio files. Availability, regional access, advertising on
                the original platform, and removal decisions are controlled by the platform, uploader, or rights
                holder.
              </p>
              <p>
                Artist names and group names are used descriptively so visitors can identify a room. IdoréStudy is
                not endorsed by, sponsored by, or affiliated with any artist, group, agency, label, or entertainment
                company. A content concern can be reported through the contact page or the content and takedown
                policy.
              </p>
              <div className="inline-actions">
                <Link className="secondary-button" to="/content-policy">Content and takedown policy</Link>
                <Link className="secondary-button" to="/contact">Report a content concern</Link>
              </div>
            </section>

            <section>
              <p className="eyebrow">Advertising</p>
              <h2>Ads support informational pages, not the study-room controls</h2>
              <p>
                IdoréStudy may use clearly labeled advertising on substantive public pages after the site is
                approved by the relevant advertising provider. Display ads are not placed inside the immersive
                room, beside playback or timer controls, on legal pages, or in a way that could be confused with a
                navigation button. Editorial coverage is not sold to advertisers.
              </p>
              <p>
                Privacy, cookie, and advertising disclosures are maintained on the privacy page. Visitors can use
                the footer link to revisit available privacy choices after the applicable consent tools are enabled.
              </p>
            </section>

            <aside className="content-note">
              <ShieldCheck size={20} aria-hidden="true" />
              <div><strong>Questions or corrections?</strong><p>Send the page URL and a clear description to <a href="mailto:idore.collections@gmail.com">idore.collections@gmail.com</a>.</p></div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
