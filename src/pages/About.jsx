import { BookOpenCheck, Coffee, Heart, LockKeyhole, ShieldCheck, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function About() {
  return (
    <>
      <Seo
        title="About IdoréStudy"
        description="Learn why IdoréStudy combines original study guidance and productivity tools with an optional, independent K-pop-inspired study room."
        path="/about"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About IdoréStudy',
          url: 'https://idorestudy.com/about',
          mainEntity: {
            '@type': 'Organization',
            name: 'IdoréStudy',
            url: 'https://idorestudy.com',
            email: 'idore.collections@gmail.com',
          },
        }}
      />

      <header className="content-hero">
        <div className="narrow-wrap">
          <p className="eyebrow"><Heart size={16} aria-hidden="true" /> Independent and fan-made</p>
          <h1 className="content-title">A study tool first, with a room that feels personal.</h1>
          <p className="content-lead">
            IdoréStudy was built for learners who find it easier to begin when the environment feels inviting,
            but who still need a clear task, a timer, and a way to review what happened.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="page-wrap content-stack">
          <div className="content-card" style={{ padding: 'clamp(26px, 5vw, 48px)' }}>
            <p className="eyebrow"><Coffee size={16} aria-hidden="true" /> What the site is</p>
            <h2 style={{ marginTop: 0, fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              An original focus planner, a practical study library, and an optional study-room interface.
            </h2>
            <p>
              The informational side of IdoréStudy explains how to define a study outcome, use retrieval
              practice, space reviews, prepare for exams, choose breaks, and test whether music is helping.
              The interactive room then provides a configurable timer, local to-do list, and optional ambience
              for carrying out that plan.
            </p>
            <p>
              The room does not require an account. Timer preferences, session outcomes, and task-list data are
              stored in your own browser. Clearing that browser storage can remove them, and they do not sync
              automatically between devices.
            </p>
          </div>

          <div className="card-grid">
            <article className="info-card">
              <span className="icon-tile"><BookOpenCheck size={22} aria-hidden="true" /></span>
              <h3>Original editorial content</h3>
              <p>Guides are written to provide concrete prompts, examples, and decision rules rather than thin summaries.</p>
            </article>
            <article className="info-card">
              <span className="icon-tile"><Timer size={22} aria-hidden="true" /></span>
              <h3>Useful without the media</h3>
              <p>The planner, timer, and task list remain the core experience; music and videos are optional atmosphere.</p>
            </article>
            <article className="info-card">
              <span className="icon-tile"><LockKeyhole size={22} aria-hidden="true" /></span>
              <h3>Low-friction privacy</h3>
              <p>No registration is required. The site clearly explains local storage, third-party embeds, analytics, and advertising.</p>
            </article>
          </div>

          <div className="content-card" style={{ padding: 'clamp(26px, 5vw, 48px)' }}>
            <p className="eyebrow"><ShieldCheck size={16} aria-hidden="true" /> Independence and media</p>
            <h2 style={{ marginTop: 0, fontFamily: 'Playfair Display, Georgia, serif' }}>No artist or company affiliation</h2>
            <p>
              IdoréStudy is not endorsed by, sponsored by, or affiliated with any artist, group, label, agency,
              or entertainment company. Artist and group names are used descriptively to identify optional
              third-party videos selected by the user.
            </p>
            <p>
              Embedded media is streamed by its original platform and may become unavailable, restricted, or
              removed by the uploader or rights holder. IdoréStudy does not host those videos or audio files.
              A dedicated content and takedown policy explains how to report a concern.
            </p>
            <div className="button-row">
              <Link className="secondary-button" to="/content-policy">Read the content policy</Link>
              <Link className="primary-button" to="/contact">Contact the publisher</Link>
            </div>
          </div>

          <div className="content-card" style={{ padding: 'clamp(26px, 5vw, 48px)' }}>
            <p className="eyebrow"><BookOpenCheck size={16} aria-hidden="true" /> Publisher and corrections</p>
            <h2 style={{ marginTop: 0, fontFamily: 'Playfair Display, Georgia, serif' }}>Maintained by an independent creator</h2>
            <p>
              IdoréStudy is maintained by the creator behind Idoré Collections. The publisher is responsible for
              the original guides, examples, interface copy, and study tools on this site. Research references are
              linked where they support a learning principle, while the practical prompts and session templates are
              IdoréStudy editorial material.
            </p>
            <p>
              Questions, accessibility feedback, and correction requests can be sent to
              {' '}<a href="mailto:idore.collections@gmail.com">idore.collections@gmail.com</a>. Include the page URL
              and enough detail to review the issue.
            </p>
          </div>

          <div className="notice-card" style={{ padding: '26px' }}>
            <h2 style={{ marginTop: 0 }}>Advertising approach</h2>
            <p>
              IdoréStudy may use clearly labeled ads to support the original informational content.
              Ads are not placed inside the immersive study room, on legal pages, or next to controls where they
              could be mistaken for part of the tool. Editorial recommendations are not sold placements.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
