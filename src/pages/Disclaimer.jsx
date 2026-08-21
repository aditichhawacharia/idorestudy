import { AlertCircle, CalendarDays, ExternalLink, GraduationCap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { EDITORIAL_NAME, SITE_URL } from '../config/site.js';

export default function Disclaimer() {
  return (
    <>
      <Seo
        title="Educational Disclaimer"
        description="Important limits on IdoréStudy's general study guidance, productivity tools, third-party media, external links, and advertising."
        path="/disclaimer"
        author={EDITORIAL_NAME}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'IdoréStudy Educational Disclaimer',
          url: `${SITE_URL}/disclaimer`,
          dateModified: '2026-08-20',
        }}
      />

      <header className="content-hero professional-hero">
        <div className="narrow-wrap">
          <p className="eyebrow"><AlertCircle size={16} aria-hidden="true" /> Educational disclaimer</p>
          <h1 className="content-title">General study guidance, not a guarantee or professional service.</h1>
          <p className="content-lead">
            IdoréStudy offers practical educational information and productivity tools. This page explains the
            limits of that information and the responsibilities that remain with each visitor.
          </p>
          <p className="page-byline"><CalendarDays size={14} aria-hidden="true" /> Last updated August 20, 2026</p>
        </div>
      </header>

      <section className="section">
        <div className="narrow-wrap content-stack">
          <section className="content-card">
            <h2>Educational information only</h2>
            <p>
              Study guides, examples, planning templates, timer suggestions, and productivity prompts are provided
              for general informational purposes. They are not individualized teaching, tutoring, disability,
              medical, mental-health, legal, financial, or other professional advice.
            </p>
            <p>
              Learning needs, course rules, accessibility requirements, health conditions, and personal circumstances
              differ. Visitors should follow their institution’s instructions and consult an appropriate qualified
              professional or support service when individual guidance is needed.
            </p>
          </section>

          <section className="content-card">
            <h2>No guarantee of academic results</h2>
            <p>
              IdoréStudy does not guarantee grades, exam performance, admission, certification, employment, or any
              other outcome. A method that is useful for one task or learner may need adjustment for another.
              Results depend on many factors outside the site’s control, including instruction, assessment design,
              prior knowledge, available time, health, and the quality of practice.
            </p>
          </section>

          <section className="content-card">
            <h2>Use of the study room and local data</h2>
            <p>
              The timer, task list, planner handoff, and interface preferences are convenience tools. Visitors are
              responsible for saving essential work elsewhere and for checking official deadlines. Local browser
              data can be removed by clearing site storage, changing devices, using private browsing, or browser
              maintenance. IdoréStudy does not provide account-based backup or cloud synchronization.
            </p>
          </section>

          <section className="content-card">
            <h2>Third-party media and external services</h2>
            <p>
              Optional K-pop study backgrounds and music are delivered by third-party platforms after a visitor
              selects them. IdoréStudy does not host those media files, control their availability, or guarantee
              that they are suitable for every location, age, device, or circumstance. Platform terms, privacy
              practices, regional restrictions, and rights-holder decisions continue to apply.
            </p>
            <p>
              External research and policy links are provided for reference. IdoréStudy is not responsible for
              changes, errors, availability, or content on an external destination. A link does not create an
              affiliation or endorse every statement on that site.
            </p>
          </section>

          <section className="content-card">
            <h2>Independent fan-made project</h2>
            <p>
              IdoréStudy is independent and fan-made. It is not endorsed by, sponsored by, or affiliated with any
              K-pop artist, group, label, agency, broadcaster, platform, or entertainment company. Artist and group
              names identify optional study-room choices and remain the property of their respective owners.
            </p>
          </section>

          <section className="content-card">
            <h2>Advertising and third-party offers</h2>
            <p>
              Informational pages may display clearly labeled advertising after advertising has been properly
              configured. IdoréStudy does not control every advertisement selected by an advertising provider and
              does not guarantee an advertiser’s claims, products, services, availability, or suitability. Visitors
              should evaluate third-party offers independently and never click an ad merely to support the site.
            </p>
          </section>

          <aside className="content-note">
            <GraduationCap size={20} aria-hidden="true" />
            <div><strong>Need support beyond a general guide?</strong><p>Contact a teacher, academic adviser, disability-services office, healthcare professional, counselor, or another appropriate qualified service.</p></div>
          </aside>

          <div className="inline-actions">
            <Link className="secondary-button" to="/editorial-policy"><ShieldCheck size={16} aria-hidden="true" /> Editorial policy</Link>
            <Link className="secondary-button" to="/content-policy">Content policy <ExternalLink size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
