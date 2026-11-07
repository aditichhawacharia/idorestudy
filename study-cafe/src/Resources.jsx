import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  Coffee,
  Search,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap');

  * {
    box-sizing: border-box;
  }

  .resources-page {
    min-height: 100vh;
    background: #fffafb;
    color: #29242b;
    font-family: 'DM Sans', sans-serif;
  }

  .resources-wrap {
    width: min(1180px, calc(100% - 48px));
    margin: 0 auto;
  }

  .resources-serif {
    font-family: 'Playfair Display', serif;
  }

  .resources-search {
    width: 100%;
    border: 1px solid #e9dfe5;
    background: white;
    border-radius: 12px;
    padding: 13px 16px 13px 42px;
    outline: none;
    font: inherit;
    font-size: 14px;
    color: #302a31;
  }

  .resources-search:focus {
    border-color: #d66a9b;
    box-shadow: 0 0 0 3px rgba(214,106,155,.08);
  }

  .resource-filter {
    border: 1px solid #eadfe5;
    background: white;
    color: #80777e;
    border-radius: 999px;
    padding: 9px 14px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .resource-filter.active {
    background: #f9e8f0;
    border-color: #e4b3ca;
    color: #b24f7d;
  }

  .article-card {
    border: 1px solid #ebe2e7;
    background: white;
    border-radius: 18px;
    overflow: hidden;
    padding: 0;
    text-align: left;
    width: 100%;
    cursor: pointer;
    font: inherit;
    color: inherit;

    transition:
      transform .18s ease,
      box-shadow .18s ease,
      border-color .18s ease;
  }

  .article-card:hover {
    transform: translateY(-4px);
    border-color: #dec1cf;
    box-shadow: 0 16px 40px rgba(65,44,55,.08);
  }

  .article-image {
    width: 100%;
    display: block;
    object-fit: cover;
  }

  .article-card .article-image {
    height: 205px;
    transition: transform .45s ease;
  }

  .article-card:hover .article-image {
    transform: scale(1.025);
  }

  .image-wrap {
    overflow: hidden;
    background: #eee;
  }

  .read-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #b44f80;
    font-size: 12px;
    font-weight: 600;
    margin-top: auto;
  }

  .faq-row {
    border-bottom: 1px solid #eee5ea;
  }

  .faq-row summary {
    cursor: pointer;
    padding: 20px 0;
    list-style: none;
    font-size: 14px;
    font-weight: 600;
    color: #373138;
  }

  .faq-row summary::-webkit-details-marker {
    display: none;
  }

  .faq-row p {
    margin: -3px 0 21px;
    max-width: 720px;
    color: #817981;
    font-size: 14px;
    line-height: 1.75;
  }

  .guide-body h2 {
    font-family: 'Playfair Display', serif;
    font-size: 27px;
    line-height: 1.25;
    font-weight: 600;
    letter-spacing: -.02em;
    margin: 48px 0 14px;
  }

  .guide-body h3 {
    font-size: 16px;
    font-weight: 650;
    margin: 30px 0 9px;
  }

  .guide-body p,
  .guide-body li {
    font-size: 15px;
    line-height: 1.9;
    color: #686168;
  }

  .guide-body p {
    margin: 0 0 20px;
  }

  .guide-body ul,
  .guide-body ol {
    padding-left: 22px;
    margin: 0 0 24px;
  }

  .guide-body li {
    margin-bottom: 8px;
  }

  .guide-callout {
    margin: 34px 0;
    padding: 22px 24px;
    border-left: 3px solid #d66b9c;
    background: #fdf5f8;
  }

  .guide-callout p {
    margin: 0;
    color: #5f555d;
  }

  .back-button {
    border: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
    color: #817780;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
  }

  .back-button:hover {
    color: #b54f80;
  }

  @media (max-width: 900px) {
    .featured-grid {
      grid-template-columns: 1fr !important;
    }

    .resources-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    .article-layout,
    .faq-layout {
      grid-template-columns: 1fr !important;
    }
  }

  @media (max-width: 620px) {
    .resources-wrap {
      width: min(100% - 32px, 1180px);
    }

    .resources-grid {
      grid-template-columns: 1fr !important;
    }

    .resource-main-title {
      font-size: 45px !important;
    }

    .article-title {
      font-size: 40px !important;
    }

    .article-cover {
      height: 270px !important;
    }
  }
`;

const articles = [
  {
    id: 'pomodoro',
    category: 'Focus',
    readTime: '4 min read',
    title: 'How to actually use the Pomodoro method',
    excerpt:
      'A timer only works when the task is clear. Here’s how to use focus intervals without turning studying into timer management.',

    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=85',

    intro:
      'The Pomodoro method is simple: work for a set amount of time, take a break, and repeat. The timer is useful, but the timer itself is not what makes you productive.',

    sections: [
      {
        title: 'Start with a task, not a subject',
        paragraphs: [
          '“Study biology” gives your brain very little direction. “Answer questions 1–12 from the cellular respiration practice set” tells you exactly what starting looks like.',
          'Before you press the timer, decide what you are trying to complete during that interval.',
        ],
      },
      {
        title: 'Remove decisions before the timer starts',
        paragraphs: [
          'Open the document, textbook, notes, or problem set you need. Put your phone somewhere inconvenient. Close tabs that do not belong to the task.',
          'The less negotiating you have to do during the session, the easier it becomes to keep working.',
        ],
      },
      {
        title: 'What to do when you get distracted',
        paragraphs: [
          'You do not need to become perfectly focused. If you suddenly remember that you need to reply to someone, order something, or look something up, write it down somewhere and return to the task.',
          'You can deal with it when the interval ends.',
        ],
      },
      {
        title: 'Take an actual break',
        paragraphs: [
          'Stand up. Drink water. Stretch. Look out a window. Walk around for a few minutes.',
          'Scrolling an endless feed can make your break feel longer while leaving your attention more fragmented when you return.',
        ],
      },
    ],

    callout:
      'Try 25 minutes if starting feels difficult. If you are already deeply focused, 45–60 minute intervals may fit the work better.',
  },

  {
    id: 'active-recall',
    category: 'Learning',
    readTime: '5 min read',
    title: 'Active recall beats rereading',
    excerpt:
      'If everything looks familiar in your notes but disappears during an exam, retrieval practice is probably the missing step.',

    image:
      'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1400&q=85',

    intro:
      'Rereading can create a strong feeling of familiarity. Unfortunately, recognizing an answer on a page is different from producing that answer without help.',

    sections: [
      {
        title: 'Close the notes',
        paragraphs: [
          'After reviewing a section, physically close or hide the material. Ask yourself what you remember.',
          'Write an explanation, draw the process, list the important terms, or explain the topic aloud as though you are teaching it.',
        ],
      },
      {
        title: 'Turn headings into questions',
        paragraphs: [
          'A heading such as “Causes of the French Revolution” can become a question: “What were the major causes of the French Revolution, and how were they connected?”',
          'Questions force your brain to retrieve information instead of simply recognize it.',
        ],
      },
      {
        title: 'Check after you answer',
        paragraphs: [
          'Retrieval practice does not mean guessing forever. Once you attempt the answer, check your notes and compare.',
          'The gaps you find tell you exactly what to review next.',
        ],
      },
      {
        title: 'Repeat the difficult parts',
        paragraphs: [
          'Do not spend equal time on everything. The questions you miss or answer vaguely deserve more repetitions than the ones you already know well.',
        ],
      },
    ],

    callout:
      'If you cannot explain an idea without looking at the page, that is useful information—not failure. You just found what to study next.',
  },

  {
    id: 'study-list',
    category: 'Planning',
    readTime: '4 min read',
    title: 'Build a study list you can actually finish',
    excerpt:
      '“Study chemistry” is not really a task. A visible next action is much easier to begin than a vague academic goal.',

    image:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1400&q=85',

    intro:
      'A long to-do list can look productive while quietly making it harder to decide what to do first. A useful study list should reduce decisions, not create more of them.',

    sections: [
      {
        title: 'Use actions instead of categories',
        paragraphs: [
          'Replace “study calculus” with “redo the five integration problems I missed on Quiz 3.”',
          'Replace “work on essay” with “write the first draft of the introduction.”',
        ],
      },
      {
        title: 'Choose one must-finish task',
        paragraphs: [
          'If you complete only one thing today, which task matters most? Put that first.',
          'Then add one or two useful tasks underneath it.',
        ],
      },
      {
        title: 'Keep optional work optional',
        paragraphs: [
          'Extra tasks can live in a separate section. That prevents an ambitious list from making a successful day feel like failure.',
        ],
      },
      {
        title: 'Write tomorrow’s first action',
        paragraphs: [
          'At the end of the session, leave yourself a clear starting point for next time. This makes it much easier to begin your next study session.',
        ],
      },
    ],

    callout:
      'A short list you complete is more useful than a beautiful fifteen-item list you avoid all day.',
  },

  {
    id: 'breaks',
    category: 'Focus',
    readTime: '3 min read',
    title: 'Your break should actually feel like a break',
    excerpt:
      'Opening TikTok for five minutes usually does not reset your brain. A useful break changes your physical or mental state.',

    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85',

    intro:
      'The purpose of a study break is not simply to stop working. It is to return to the next interval with more usable attention than you had before.',

    sections: [
      {
        title: 'Leave the screen for a minute',
        paragraphs: [
          'Looking at another screen keeps your attention in roughly the same state. Standing up or looking at something farther away creates a clearer shift.',
        ],
      },
      {
        title: 'Do something finite',
        paragraphs: [
          'Get water. Make tea. Stretch. Walk to another room and back.',
          'Finite activities naturally end. Infinite feeds are specifically designed not to.',
        ],
      },
      {
        title: 'Make returning easy',
        paragraphs: [
          'Before your break, leave your study materials ready. When you return, you should be able to continue without rebuilding your entire setup.',
        ],
      },
    ],

    callout:
      'If a five-minute break routinely becomes forty minutes, change what you do during the break—not necessarily the timer.',
  },

  {
    id: 'session-setup',
    category: 'Study habits',
    readTime: '4 min read',
    title: 'Set up your session before you start the timer',
    excerpt:
      'Most procrastination happens before the work begins. A two-minute setup can remove a surprising amount of friction.',

    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85',

    intro:
      'If every study session begins with searching for notes, choosing music, finding the assignment, checking messages, and deciding what to do, you are spending attention before the real work even starts.',

    sections: [
      {
        title: 'Define “done”',
        paragraphs: [
          'What should exist at the end of this session that does not exist now? A finished problem set? Five pages of notes? A memorized list of terms?',
        ],
      },
      {
        title: 'Put everything within reach',
        paragraphs: [
          'Get the charger, water, calculator, textbook, scratch paper, and anything else you need before you begin.',
        ],
      },
      {
        title: 'Choose the environment once',
        paragraphs: [
          'Pick your IdoréStudy room, music, study partner, and timer before starting. Then stop adjusting the setup and begin.',
        ],
      },
      {
        title: 'Start smaller than you think',
        paragraphs: [
          'If you are avoiding the work, choose the smallest useful action. Open the document. Solve one problem. Read one page. Momentum can come after starting.',
        ],
      },
    ],

    callout:
      'The best study setup is not the prettiest one. It is the setup that helps you begin quickly and forget about the setup afterward.',
  },

  {
    id: 'reset-focus',
    category: 'Study habits',
    readTime: '3 min read',
    title: 'What to do when you completely lose focus',
    excerpt:
      'A bad twenty minutes does not have to become a wasted afternoon. Reset the environment instead of waiting for motivation.',

    image:
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1400&q=85',

    intro:
      'Sometimes focus disappears. You start switching tabs, rereading the same sentence, checking your phone, and suddenly the session feels unsalvageable. It usually is not.',

    sections: [
      {
        title: 'Stop instead of fake-working',
        paragraphs: [
          'If you know you are no longer working, pause. Continuing to stare at the assignment while doing something else usually creates frustration without progress.',
        ],
      },
      {
        title: 'Identify the problem',
        paragraphs: [
          'Are you tired? Confused? Hungry? Distracted by a notification? Avoiding a difficult step? The solution depends on what is actually wrong.',
        ],
      },
      {
        title: 'Choose one tiny restart action',
        paragraphs: [
          'Instead of restarting the whole plan, pick one action you can complete in five or ten minutes.',
          'A short successful restart is often enough to rebuild momentum.',
        ],
      },
    ],

    callout:
      'You do not need to rescue the entire day. Rescue the next ten minutes.',
  },
];

const faq = [
  [
    'Does IdoréStudy require an account?',
    'No. The timer and to-do list work without registration. Preferences are stored in your browser on the device you are using.',
  ],
  [
    'Is IdoréStudy affiliated with any artist or entertainment company?',
    'No. IdoréStudy is an independent fan-made productivity project and is not endorsed by, sponsored by, or affiliated with any artist, label, or entertainment company.',
  ],
  [
    'Where do the videos and music come from?',
    'Media is embedded from third-party platforms such as YouTube and remains subject to the original platform and rights-holder terms.',
  ],
  [
    'What happens if a video disappears?',
    'Choose another study partner or music option. Third-party uploads may be removed, restricted, or made unavailable by their owners.',
  ],
  [
    'How is my to-do list stored?',
    'Your task list is stored locally in your browser. Clearing browser storage may remove it.',
  ],
];

export default function Resources() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = [
    'All',
    'Focus',
    'Learning',
    'Planning',
    'Study habits',
  ];

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles.filter((article) => {
      const categoryMatches =
        category === 'All' || article.category === category;

      const searchMatches =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);

      return categoryMatches && searchMatches;
    });
  }, [category, search]);

  const openArticle = (article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ========================================================
     FULL ARTICLE VIEW
     ======================================================== */

  if (selectedArticle) {
    const related = articles
      .filter((a) => a.id !== selectedArticle.id)
      .filter(
        (a) =>
          a.category === selectedArticle.category ||
          relatedFallback(a, selectedArticle)
      )
      .slice(0, 3);

    function relatedFallback() {
      return true;
    }

    return (
      <>
        <style>{styles}</style>

        <main className="resources-page">
          <section
            style={{
              padding: '46px 0 34px',
              borderBottom: '1px solid #eee5ea',
              background: '#fff',
            }}
          >
            <div className="resources-wrap">
              <button className="back-button" onClick={closeArticle}>
                <ArrowLeft size={15} />
                All study guides
              </button>
            </div>
          </section>

          <article>
            <header style={{ padding: '64px 0 48px' }}>
              <div
                className="resources-wrap"
                style={{
                  maxWidth: 900,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: 9,
                    alignItems: 'center',
                    color: '#9a8f96',
                    fontSize: 12,
                    marginBottom: 19,
                  }}
                >
                  <span style={{ color: '#b65583', fontWeight: 600 }}>
                    {selectedArticle.category}
                  </span>

                  <span>·</span>

                  <span>{selectedArticle.readTime}</span>
                </div>

                <h1
                  className="resources-serif article-title"
                  style={{
                    margin: '0 0 22px',
                    maxWidth: 850,
                    fontSize: 'clamp(46px,6vw,68px)',
                    lineHeight: 1.06,
                    letterSpacing: '-.04em',
                    fontWeight: 600,
                  }}
                >
                  {selectedArticle.title}
                </h1>

                <p
                  style={{
                    margin: 0,
                    maxWidth: 690,
                    fontSize: 17,
                    lineHeight: 1.75,
                    color: '#797178',
                  }}
                >
                  {selectedArticle.excerpt}
                </p>
              </div>
            </header>

            <div
              className="resources-wrap"
              style={{ maxWidth: 1050 }}
            >
              <img
                className="article-cover"
                src={selectedArticle.image}
                alt=""
                style={{
                  width: '100%',
                  height: 520,
                  objectFit: 'cover',
                  borderRadius: 20,
                  display: 'block',
                }}
              />
            </div>

            <section style={{ padding: '62px 0 90px' }}>
              <div
                className="resources-wrap article-layout"
                style={{
                  maxWidth: 1000,
                  display: 'grid',
                  gridTemplateColumns: '160px minmax(0,680px)',
                  gap: 60,
                }}
              >
                <aside>
                  <div
                    style={{
                      position: 'sticky',
                      top: 100,
                      paddingTop: 7,
                    }}
                  >
                    <p
                      style={{
                        margin: '0 0 8px',
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '.12em',
                        color: '#aaa0a6',
                        textTransform: 'uppercase',
                      }}
                    >
                      Guide
                    </p>

                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        lineHeight: 1.6,
                        color: '#847b82',
                      }}
                    >
                      {selectedArticle.readTime}
                    </p>
                  </div>
                </aside>

                <div className="guide-body">
                  <p
                    className="resources-serif"
                    style={{
                      fontSize: 23,
                      lineHeight: 1.6,
                      color: '#423a41',
                    }}
                  >
                    {selectedArticle.intro}
                  </p>

                  {selectedArticle.sections.map((section) => (
                    <section key={section.title}>
                      <h2>{section.title}</h2>

                      {section.paragraphs.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </section>
                  ))}

                  <div className="guide-callout">
                    <p>{selectedArticle.callout}</p>
                  </div>

                  <p>
                    You do not have to follow any study method perfectly.
                    Keep what helps you work and change what does not.
                  </p>
                </div>
              </div>
            </section>
          </article>

          {/* Related */}
          <section
            style={{
              background: '#fff',
              borderTop: '1px solid #eee5ea',
              padding: '76px 0 96px',
            }}
          >
            <div className="resources-wrap">
              <h2
                className="resources-serif"
                style={{
                  margin: '0 0 27px',
                  fontSize: 31,
                  fontWeight: 600,
                }}
              >
                Keep reading
              </h2>

              <div
                className="resources-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  gap: 18,
                }}
              >
                {related.map((article) => (
                  <GuideCard
                    key={article.id}
                    article={article}
                    onOpen={openArticle}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  /* ========================================================
     RESOURCE LIBRARY
     ======================================================== */

  const featured = articles[0];

  return (
    <>
      <style>{styles}</style>

      <main className="resources-page">
        {/* HERO */}
        <section
          style={{
            padding: '80px 0 56px',
            borderBottom: '1px solid #eee5ea',
          }}
        >
          <div className="resources-wrap">
            <div style={{ maxWidth: 760 }}>
              <p
                style={{
                  margin: '0 0 14px',
                  color: '#bc5887',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                }}
              >
                Study better
              </p>

              <h1
                className="resources-serif resource-main-title"
                style={{
                  margin: '0 0 20px',
                  fontSize: 'clamp(50px,6vw,72px)',
                  lineHeight: 1.04,
                  letterSpacing: '-.045em',
                  fontWeight: 600,
                }}
              >
                Guides for when you
                <br />
                actually need to study.
              </h1>

              <p
                style={{
                  maxWidth: 620,
                  margin: 0,
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: '#797179',
                }}
              >
                Short guides about focus, studying, remembering things,
                planning your work, and getting yourself to start.
              </p>
            </div>

            <div
              style={{
                marginTop: 40,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 18,
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  width: 310,
                  maxWidth: '100%',
                  position: 'relative',
                }}
              >
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: 15,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#a49aa1',
                  }}
                />

                <input
                  className="resources-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search guides"
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`resource-filter ${
                      item === category ? 'active' : ''
                    }`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section style={{ padding: '62px 0 72px' }}>
          <div className="resources-wrap">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 22,
              }}
            >
              <h2
                className="resources-serif"
                style={{
                  margin: 0,
                  fontSize: 27,
                  fontWeight: 600,
                }}
              >
                Start here
              </h2>

              <span
                style={{
                  fontSize: 12,
                  color: '#a49ba1',
                }}
              >
                Featured
              </span>
            </div>

            <button
              type="button"
              onClick={() => openArticle(featured)}
              className="article-card featured-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.15fr .85fr',
              }}
            >
              <div className="image-wrap">
                <img
                  src={featured.image}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 410,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              <div
                style={{
                  padding: '44px 44px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: '#a08794',
                    marginBottom: 16,
                  }}
                >
                  {featured.category} · {featured.readTime}
                </div>

                <h2
                  className="resources-serif"
                  style={{
                    margin: '0 0 16px',
                    fontSize: 34,
                    lineHeight: 1.15,
                    fontWeight: 600,
                  }}
                >
                  {featured.title}
                </h2>

                <p
                  style={{
                    margin: '0 0 25px',
                    color: '#7b737a',
                    fontSize: 14,
                    lineHeight: 1.8,
                  }}
                >
                  {featured.excerpt}
                </p>

                <span className="read-link">
                  Read guide
                  <ArrowRight size={14} />
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* ALL ARTICLES */}
        <section style={{ paddingBottom: 90 }}>
          <div className="resources-wrap">
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: 25,
              }}
            >
              <h2
                className="resources-serif"
                style={{
                  margin: 0,
                  fontSize: 30,
                  fontWeight: 600,
                }}
              >
                Study guides
              </h2>

              <span
                style={{
                  fontSize: 12,
                  color: '#aaa0a6',
                }}
              >
                {filteredArticles.length} guides
              </span>
            </div>

            <div
              className="resources-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)',
                gap: 18,
              }}
            >
              {filteredArticles.map((article) => (
                <GuideCard
                  key={article.id}
                  article={article}
                  onOpen={openArticle}
                />
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div
                style={{
                  padding: '60px 0',
                  textAlign: 'center',
                  color: '#938a91',
                  fontSize: 14,
                }}
              >
                No guides match that search.
              </div>
            )}
          </div>
        </section>

        {/* STUDY SESSION */}
        <section
          style={{
            padding: '86px 0',
            background: '#fff',
            borderTop: '1px solid #eee5ea',
          }}
        >
          <div
            className="resources-wrap article-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: '.7fr 1.3fr',
              gap: 80,
            }}
          >
            <div>
              <TimerReset
                size={25}
                color="#be5a87"
                style={{ marginBottom: 18 }}
              />

              <h2
                className="resources-serif"
                style={{
                  margin: 0,
                  fontSize: 36,
                  lineHeight: 1.2,
                  fontWeight: 600,
                }}
              >
                Don't know where to start?
              </h2>
            </div>

            <div>
              {[
                [
                  '01',
                  'Pick one outcome',
                  'Decide what you want finished by the end of the session.',
                ],
                [
                  '02',
                  'Start the timer',
                  'Work only on that next action until the interval ends.',
                ],
                [
                  '03',
                  'Recall',
                  'Spend a minute explaining what you learned without looking.',
                ],
                [
                  '04',
                  'Take a real break',
                  'Move, get water, stretch, then decide what comes next.',
                ],
              ].map(([number, title, text]) => (
                <div
                  key={number}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 180px 1fr',
                    gap: 18,
                    padding: '23px 0',
                    borderTop: '1px solid #eee5ea',
                  }}
                >
                  <span
                    className="resources-serif"
                    style={{
                      fontSize: 14,
                      color: '#c66d96',
                    }}
                  >
                    {number}
                  </span>

                  <strong
                    style={{
                      fontSize: 14,
                      color: '#3c353c',
                    }}
                  >
                    {title}
                  </strong>

                  <span
                    style={{
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: '#847b82',
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '82px 0 100px' }}>
          <div
            className="resources-wrap faq-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: '.7fr 1.3fr',
              gap: 80,
            }}
          >
            <div>
              <ShieldCheck
                size={21}
                color="#b85b87"
                style={{ marginBottom: 15 }}
              />

              <h2
                className="resources-serif"
                style={{
                  margin: 0,
                  fontSize: 33,
                  fontWeight: 600,
                }}
              >
                A few common questions.
              </h2>
            </div>

            <div style={{ borderTop: '1px solid #eee5ea' }}>
              {faq.map(([q, a]) => (
                <details className="faq-row" key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function GuideCard({ article, onOpen }) {
  return (
    <button
      type="button"
      className="article-card"
      onClick={() => onOpen(article)}
    >
      <div className="image-wrap">
        <img
          src={article.image}
          alt=""
          className="article-image"
        />
      </div>

      <div
        style={{
          minHeight: 250,
          padding: '21px 21px 23px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 7,
            marginBottom: 11,
            color: '#9f959c',
            fontSize: 10,
          }}
        >
          <span>{article.category}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>

        <h3
          className="resources-serif"
          style={{
            margin: '0 0 10px',
            fontSize: 21,
            lineHeight: 1.28,
            fontWeight: 600,
          }}
        >
          {article.title}
        </h3>

        <p
          style={{
            margin: '0 0 18px',
            fontSize: 13,
            lineHeight: 1.7,
            color: '#817981',
          }}
        >
          {article.excerpt}
        </p>

        <span className="read-link">
          Read guide
          <ArrowRight size={14} />
        </span>
      </div>
    </button>
  );
}