import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  Coffee,
  Headphones,
  ListChecks,
  LockKeyhole,
  Sparkles,
  TimerReset,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdSlot from '../components/AdSlot.jsx';
import Seo from '../components/Seo.jsx';
import SessionPlanner from '../components/SessionPlanner.jsx';
import { guides } from '../data/guides.js';

const homeAdSlot = import.meta.env.VITE_ADSENSE_HOME_SLOT;

const faq = [
  {
    question: 'Do I need an account to use IdoréStudy?',
    answer: 'No. The focus timer, session planner, and study-room to-do list work without registration. Preferences are stored locally in the browser you are using.',
  },
  {
    question: 'Is the study room free?',
    answer: 'Yes. The study room and the original study guides are free to use. Clearly labeled advertising may support the informational pages, while the study room itself is intentionally ad-free.',
  },
  {
    question: 'Does IdoréStudy own the K-pop videos or music?',
    answer: 'No. Optional media in the study room is embedded from its original third-party platform. IdoréStudy is independent, fan-made, and not affiliated with any artist, label, or entertainment company.',
  },
  {
    question: 'What should I do if music makes it harder to concentrate?',
    answer: 'Mute it, pause it, or use a quieter setup. The timer, task list, and session plan are the core tools; ambience is optional and should serve the work rather than compete with it.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function Home() {
  const featuredGuides = guides.slice(0, 3);

  return (
    <>
      <Seo
        title="Free Focus Timer, Study Planner and K-pop Study Room"
        description="Plan a focused study session, learn evidence-aware study methods, and open a free K-pop-inspired study room with a timer and local to-do list."
        path="/"
        structuredData={faqSchema}
      />

      <section className="hero">
        <div className="page-wrap hero-grid">
          <div>
            <p className="eyebrow"><Sparkles size={16} aria-hidden="true" /> A calmer way to begin</p>
            <h1 className="display-title">
              Make the next study block <span className="gradient-text">specific, focused, and easier to start.</span>
            </h1>
            <p className="hero-lead">
              IdoréStudy combines an original session planner and practical study guides with an optional,
              K-pop-inspired focus room. Choose one outcome, set a realistic timer, and keep the tools visible
              while the ambience stays in the background.
            </p>
            <div className="button-row">
              <Link className="primary-button" to="/study">
                Open the study room <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="secondary-button" to="/resources">
                Read the study guides <BookOpenCheck size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="trust-line" aria-label="Site highlights">
              <span><CheckCircle2 size={16} aria-hidden="true" /> No account required</span>
              <span><LockKeyhole size={16} aria-hidden="true" /> Tasks stay in this browser</span>
              <span><Coffee size={16} aria-hidden="true" /> Study room stays ad-free</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Preview of a focused study session">
            <div className="visual-card">
              <div className="timer-preview">
                <div><strong>25:00</strong><span>one clear outcome</span></div>
              </div>
              <div className="mini-task-list">
                <div className="mini-task"><span className="mini-check" /> Answer six practice questions</div>
                <div className="mini-task"><span className="mini-check" /> Mark the mistakes</div>
                <div className="mini-task"><span className="mini-check" /> Write the next action</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="page-wrap">
          <div className="section-heading centered">
            <p className="eyebrow"><TimerReset size={16} aria-hidden="true" /> Built around the work</p>
            <h2>More than a background video</h2>
            <p>
              The room is the atmosphere. The original planning, timing, task, and review tools are what turn
              that atmosphere into a usable study routine.
            </p>
          </div>
          <div className="card-grid">
            <article className="info-card">
              <span className="icon-tile"><ListChecks size={22} aria-hidden="true" /></span>
              <h3>Define a finish line</h3>
              <p>Replace “study chemistry” with a visible result such as “solve ten questions and classify every error.”</p>
            </article>
            <article className="info-card">
              <span className="icon-tile"><Clock3 size={22} aria-hidden="true" /></span>
              <h3>Use a realistic interval</h3>
              <p>Choose a focus length that fits the task and your energy instead of treating one timer length as a rule.</p>
            </article>
            <article className="info-card">
              <span className="icon-tile"><Headphones size={22} aria-hidden="true" /></span>
              <h3>Keep ambience optional</h3>
              <p>Pick a study buddy and sound once, minimize the controls, and pause them whenever they compete with the work.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="eyebrow">A four-step routine</p>
            <h2>Know what happens before, during, and after the timer.</h2>
          </div>
          <div className="steps-grid">
            {[
              ['Choose', 'Write one outcome you can inspect at the end of the session.'],
              ['Prepare', 'Open only the materials required and remove the most obvious distraction.'],
              ['Focus', 'Work until the interval ends; record distracting thoughts instead of following them.'],
              ['Review', 'Note what was completed, what remains unclear, and the exact next action.'],
            ].map(([title, text], index) => (
              <article className="info-card step-card" key={title}>
                <span className="step-number">{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="page-wrap">
          <SessionPlanner />
        </div>
      </section>

      <AdSlot slot={homeAdSlot} />

      <section className="section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="eyebrow"><BookOpenCheck size={16} aria-hidden="true" /> Original study guidance</p>
            <h2>Use a method you can explain—not a productivity slogan.</h2>
            <p>
              Each guide turns a broad recommendation into concrete prompts, examples, stopping rules, and
              session plans you can adapt to your own subject.
            </p>
          </div>
          <div className="card-grid">
            {featuredGuides.map((guide) => (
              <article className="guide-card" key={guide.slug}>
                <div className="guide-meta"><span>{guide.category}</span><span>{guide.readTime}</span></div>
                <h2>{guide.shortTitle}</h2>
                <p>{guide.description}</p>
                <Link className="guide-link" to={`/resources/${guide.slug}`}>
                  Read the guide <ArrowRight size={15} style={{ display: 'inline', verticalAlign: '-2px' }} />
                </Link>
              </article>
            ))}
          </div>
          <div className="button-row" style={{ justifyContent: 'center' }}>
            <Link className="secondary-button" to="/resources">Browse all study guides</Link>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="narrow-wrap">
          <div className="section-heading centered">
            <p className="eyebrow">Frequently asked questions</p>
            <h2>What to expect from IdoréStudy</h2>
          </div>
          <div className="faq-list">
            {faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
