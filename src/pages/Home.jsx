import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Headphones,
  ListChecks,
  Search,
  ShieldCheck,
  TimerReset,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdSlot from '../components/AdSlot.jsx';
import BuddyArtwork from '../components/BuddyArtwork.jsx';
import Seo from '../components/Seo.jsx';
import { EDITORIAL_NAME, SITE_URL } from '../config/site.js';
import { guideIndex } from '../data/guideIndex.js';
import { buddyGroups, studyBuddies } from '../data/studyBuddies.js';

const homeAdSlot = import.meta.env.VITE_ADSENSE_HOME_SLOT;

const faq = [
  {
    question: 'What is the IdoréStudy K-pop study room?',
    answer: 'It is a free focus workspace where you choose a K-pop study buddy, set a study and break timer, manage a local task list, and optionally play third-party YouTube ambience. The room does not require an account.',
  },
  {
    question: 'Can I choose an idol directly from the homepage?',
    answer: 'Yes. Select any study buddy on this page and IdoréStudy opens that room immediately. You can switch to another buddy from the room sidebar at any time.',
  },
  {
    question: 'Is the study room free and ad-free?',
    answer: 'Yes. The interactive study room is free and intentionally has no display-ad placements. Clearly labeled advertising may appear on original informational pages such as the homepage and study guides.',
  },
  {
    question: 'Does IdoréStudy own or represent the artists shown?',
    answer: 'No. IdoréStudy is an independent fan-made productivity project and is not affiliated with any artist, group, label, agency, or entertainment company. Optional media is embedded from its original third-party platform.',
  },
  {
    question: 'Where are my timer settings and tasks saved?',
    answer: 'They are stored in local browser storage on the device you are using. IdoréStudy does not provide account-based syncing, and clearing browser storage may remove saved preferences and tasks.',
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

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    faqSchema,
    {
      '@type': 'WebApplication',
      name: 'IdoréStudy K-pop Study Room',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      isAccessibleForFree: true,
      url: `${SITE_URL}/study`,
      featureList: [
        'K-pop study buddy selection',
        'Custom study and break timer',
        'Local task list',
        'Optional YouTube ambience',
        'No account required',
      ],
    },
    {
      '@type': 'ItemList',
      name: 'IdoréStudy K-pop study buddies',
      numberOfItems: studyBuddies.length,
      itemListElement: studyBuddies.map((buddy, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${buddy.name} — ${buddy.group}`,
        url: `${SITE_URL}/study?buddy=${buddy.id}`, 
      })),
    },
  ],
};

const featuredBuddyIds = [1, 5, 18];

export default function Home() {
  const [group, setGroup] = useState('All');
  const [query, setQuery] = useState('');
  const [showAllGroups, setShowAllGroups] = useState(false);

  const featuredBuddies = featuredBuddyIds
    .map((id) => studyBuddies.find((buddy) => buddy.id === id))
    .filter(Boolean);

  const filteredBuddies = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return studyBuddies.filter((buddy) => {
      const matchesGroup = group === 'All' || buddy.group === group;
      const matchesQuery = !normalized
        || buddy.name.toLowerCase().includes(normalized)
        || buddy.group.toLowerCase().includes(normalized);
      return matchesGroup && matchesQuery;
    });
  }, [group, query]);

  const visibleGroupFilters = showAllGroups ? buddyGroups : buddyGroups.slice(0, 8);
  const featuredGuides = guideIndex.slice(0, 6);

  return (
    <>
      <Seo
        title="K-pop Study Room & Focus Timer"
        description="Choose a K-pop study buddy, open an ad-free focus room, and use a Pomodoro timer, local task list, optional music, and practical study guides."
        path="/"
        author={EDITORIAL_NAME}
        structuredData={homeSchema}
      />

      <header className="home-hero">
        <div className="page-wrap home-hero-grid">
          <div className="home-hero-copy">
            <p className="eyebrow">K-pop study room · focus timer · task list</p>
            <h1>Your K-pop study room, built for real focus.</h1>
            <p className="hero-lead">
              Pick your bias, open the room, and start a focused session in seconds. IdoréStudy keeps the
              familiar K-pop experience at the center while giving you a configurable timer, a local to-do list,
              optional music, and practical study guidance when you need it.
            </p>
            <div className="button-row">
              <a className="primary-button" href="#choose-buddy">
                Choose a study buddy <ArrowRight size={17} aria-hidden="true" />
              </a>
              <Link className="secondary-button" to="/study">
                Open the full study room
              </Link>
            </div>
            <ul className="hero-proof" aria-label="Study room highlights">
              <li><Check size={16} aria-hidden="true" /> No account required</li>
              <li><Check size={16} aria-hidden="true" /> Study room has no display ads</li>
              <li><Check size={16} aria-hidden="true" /> Tasks stay in your browser</li>
            </ul>
            <p className="page-byline">
              Published and maintained by <Link to="/about#publisher">{EDITORIAL_NAME}</Link> · Updated August 20, 2026
            </p>
          </div>

          <aside className="hero-quick-start" aria-labelledby="quick-start-title">
            <div className="quick-start-heading">
              <div>
                <p className="section-kicker">Quick start</p>
                <h2 id="quick-start-title">Choose now</h2>
              </div>
              <span className="quick-start-count">29 rooms</span>
            </div>
            <div className="quick-buddy-list">
              {featuredBuddies.map((buddy) => (
                <Link className="quick-buddy" to={`/study?buddy=${buddy.id}`} key={buddy.id}>
                  <BuddyArtwork buddy={buddy} compact />
                  <span className="quick-buddy-copy">
                    <strong>{buddy.name}</strong>
                    <span>{buddy.group}</span>
                  </span>
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <a className="quick-start-link" href="#choose-buddy">
              View every study buddy <ArrowRight size={15} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </header>

      <section id="choose-buddy" className="buddy-picker-section" aria-labelledby="buddy-picker-title">
        <div className="page-wrap">
          <div className="picker-heading-row">
            <div className="section-heading">
              <p className="eyebrow">Start your session</p>
              <h2 id="buddy-picker-title">Choose a K-pop study buddy</h2>
              <p>
                Select an artist to enter the matching focus room immediately. You can change the timer,
                switch the background, add tasks, or return to this list from inside the room.
              </p>
            </div>
            <div className="picker-stat" aria-label={`${studyBuddies.length} study buddies across ${buddyGroups.length - 1} groups`}>
              <strong>{studyBuddies.length}</strong>
              <span>study buddies</span>
            </div>
          </div>

          <div className="buddy-picker-controls">
            <label className="buddy-search">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Search by idol or group</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search an idol or group"
              />
            </label>
            <div className="group-filter" aria-label="Filter study buddies by group">
              {visibleGroupFilters.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={group === item ? 'active' : ''}
                  onClick={() => setGroup(item)}
                  aria-pressed={group === item}
                >
                  {item}
                </button>
              ))}
              {!showAllGroups && (
                <button type="button" className="more-groups" onClick={() => setShowAllGroups(true)}>
                  More groups <ChevronDown size={15} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <p className="result-count" aria-live="polite">
            Showing {filteredBuddies.length} {filteredBuddies.length === 1 ? 'study buddy' : 'study buddies'}
            {group !== 'All' ? ` from ${group}` : ''}.
          </p>

          {filteredBuddies.length > 0 ? (
            <div className="buddy-grid">
              {filteredBuddies.map((buddy) => (
                <Link
                  className="buddy-card"
                  to={`/study?buddy=${buddy.id}`}
                  key={buddy.id}
                  aria-label={`Open a study room with ${buddy.name} from ${buddy.group}`}
                >
                  <BuddyArtwork buddy={buddy} />
                  <span className="buddy-card-copy">
                    <span>
                      <strong>{buddy.name}</strong>
                      <small>{buddy.group}</small>
                    </span>
                    <span className="buddy-card-action">Enter room <ArrowRight size={15} aria-hidden="true" /></span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No study buddies match that search.</h3>
              <p>Clear the search or choose another group.</p>
              <button type="button" className="secondary-button" onClick={() => { setQuery(''); setGroup('All'); }}>
                Reset filters
              </button>
            </div>
          )}

          <p className="media-note">
            Artist and group names identify optional third-party study videos. IdoréStudy is independent and
            does not claim ownership of artist media, names, or trademarks.
          </p>
        </div>
      </section>

      <section className="section section-muted" aria-labelledby="room-tools-title">
        <div className="page-wrap">
          <div className="section-heading centered">
            <p className="eyebrow">Inside every room</p>
            <h2 id="room-tools-title">The ambience is optional. The study tools are the point.</h2>
            <p>
              Choose the room once, then let the interface get out of the way. The core controls are designed
              to keep one task and one time boundary visible without requiring an account.
            </p>
          </div>
          <div className="feature-row">
            <article className="feature-panel">
              <TimerReset size={22} aria-hidden="true" />
              <h3>Flexible timer</h3>
              <p>Use a 25/5 preset or set your own study and break lengths. Preferences stay on the device.</p>
            </article>
            <article className="feature-panel">
              <ListChecks size={22} aria-hidden="true" />
              <h3>Local task list</h3>
              <p>Keep the current session visible, mark tasks complete, and return without creating an account.</p>
            </article>
            <article className="feature-panel">
              <Headphones size={22} aria-hidden="true" />
              <h3>Optional K-pop ambience</h3>
              <p>Use the selected video or music as background, pause it at any time, or study in silence.</p>
            </article>
            <article className="feature-panel">
              <ShieldCheck size={22} aria-hidden="true" />
              <h3>Ad-free workspace</h3>
              <p>Display ads are kept out of the immersive room and away from timer, player, and task controls.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="routine-title">
        <div className="page-wrap editorial-grid">
          <div className="section-heading">
            <p className="eyebrow">A simple focus routine</p>
            <h2 id="routine-title">Open the room with a finish line, not just a mood.</h2>
            <p>
              The study room works best when the visual setup supports a specific outcome. Before choosing a
              buddy, decide what should be completed by the end of the timer.
            </p>
            <Link className="text-link" to="/resources/pomodoro-study-session">
              Read the complete session-planning guide <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <ol className="professional-steps">
            <li><span>01</span><div><h3>Choose one outcome</h3><p>Write an observable result such as “solve eight questions and mark every error.”</p></div></li>
            <li><span>02</span><div><h3>Set the room once</h3><p>Select your buddy, timer, and sound before the focus block begins.</p></div></li>
            <li><span>03</span><div><h3>Keep one task visible</h3><p>Use the local list for the current block rather than carrying an entire semester into the room.</p></div></li>
            <li><span>04</span><div><h3>Leave the next action</h3><p>Before closing, record the first step that will make the next session easier to begin.</p></div></li>
          </ol>
        </div>
      </section>

      <AdSlot slot={homeAdSlot} />

      <section className="section section-muted" aria-labelledby="guides-title">
        <div className="page-wrap">
          <div className="section-heading-row">
            <div className="section-heading">
              <p className="eyebrow"><BookOpen size={16} aria-hidden="true" /> Original study guides</p>
              <h2 id="guides-title">Practical help for the problem behind the timer</h2>
              <p>
                The resource library covers planning, retrieval practice, exam preparation, distraction control,
                study environments, and review systems with concrete examples and linked references.
              </p>
            </div>
            <Link className="secondary-button" to="/resources">Browse all {guideIndex.length} guides</Link>
          </div>
          <div className="guide-grid professional-guide-grid">
            {featuredGuides.map((guide) => (
              <article className="guide-card" key={guide.slug}>
                <div className="guide-meta"><span>{guide.category}</span><span>{guide.readTime}</span></div>
                <h3>{guide.shortTitle}</h3>
                <p>{guide.description}</p>
                <Link className="guide-link" to={`/resources/${guide.slug}`}>
                  Read guide <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="publisher-title">
        <div className="narrow-wrap publisher-panel">
          <p className="section-kicker">Published and maintained by IdoréStudy</p>
          <h2 id="publisher-title">An independent K-pop study-tool publisher</h2>
          <p>
            IdoréStudy is created and maintained by the independent creator behind Idoré Collections. The
            original guides, interface copy, planning prompts, and productivity tools are published by
            IdoréStudy. Research references are linked where they support a learning principle, and correction
            requests are reviewed through the public contact address.
          </p>
          <div className="publisher-links">
            <Link to="/about">About the project</Link>
            <Link to="/editorial-policy">Editorial and corrections policy</Link>
            <Link to="/contact">Contact the publisher</Link>
          </div>
        </div>
      </section>

      <section className="section section-muted" aria-labelledby="faq-title">
        <div className="narrow-wrap">
          <div className="section-heading centered">
            <p className="eyebrow">Frequently asked questions</p>
            <h2 id="faq-title">Before you enter the study room</h2>
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
