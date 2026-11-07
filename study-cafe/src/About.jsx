import React from 'react';
import {
  ArrowUpRight,
  Coffee,
  Heart,
  Music2,
  Timer,
  ListTodo,
  Sparkles,
} from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');

  * {
    box-sizing: border-box;
  }

  .about-page {
    min-height: 100vh;
    background: #fffafb;
    color: #252229;
    font-family: 'DM Sans', sans-serif;
  }

  .about-serif {
    font-family: 'Playfair Display', serif;
  }

  .about-wrap {
    width: min(1120px, calc(100% - 48px));
    margin: 0 auto;
  }

  .about-rule {
    width: 100%;
    height: 1px;
    background: #eadfe5;
  }

  .feature-row {
    display: grid;
    grid-template-columns: 54px 180px 1fr;
    gap: 22px;
    align-items: start;
    padding: 26px 0;
    border-bottom: 1px solid #eee4e9;
  }

  .feature-icon {
    width: 44px;
    height: 44px;
    border: 1px solid #eadce4;
    border-radius: 13px;
    display: grid;
    place-items: center;
    background: #fff;
  }

  .about-link {
    color: #d94f95;
    text-decoration: none;
  }

  .about-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 800px) {
    .about-intro {
      grid-template-columns: 1fr !important;
      gap: 34px !important;
    }

    .about-story {
      grid-template-columns: 1fr !important;
    }

    .about-note-grid {
      grid-template-columns: 1fr !important;
    }

    .feature-row {
      grid-template-columns: 44px 1fr;
      gap: 16px;
    }

    .feature-row > div:nth-child(3) {
      grid-column: 2;
    }
  }

  @media (max-width: 520px) {
    .about-wrap {
      width: min(100% - 32px, 1120px);
    }
  }
`;

const features = [
  {
    icon: Heart,
    title: 'Study with your bias',
    text:
      'Pick an idol and open a study room with their video playing in the background while you work.',
  },
  {
    icon: Timer,
    title: 'Focus timer',
    text:
      'Use the built-in Pomodoro timer or customize your own study and break lengths.',
  },
  {
    icon: Music2,
    title: 'Study music',
    text:
      'Choose from lo-fi, piano, rain, and K-pop-inspired mixes without leaving your study screen.',
  },
  {
    icon: ListTodo,
    title: 'Tiny to-do list',
    text:
      'Keep the things you actually need to finish visible while you study instead of opening another app.',
  },
  {
    icon: Coffee,
    title: 'Focus rooms',
    text:
      'Study in cozy cafés, libraries, rainy bedrooms, and late-night city rooms depending on your mood.',
  },
];

export default function About() {
  return (
    <>
      <style>{styles}</style>

      <main className="about-page">
        {/* intro */}
        <section style={{ padding: '88px 0 72px' }}>
          <div
            className="about-wrap about-intro"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr .85fr',
              gap: 90,
              alignItems: 'end',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 22,
                  color: '#d75b99',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <Sparkles size={15} />
                About IdoréStudy
              </div>

              <h1
                className="about-serif"
                style={{
                  margin: 0,
                  maxWidth: 720,
                  fontSize: 'clamp(46px, 6vw, 76px)',
                  lineHeight: 1.03,
                  letterSpacing: '-0.045em',
                  fontWeight: 600,
                }}
              >
                Studying is already hard.
                <br />
                Your study space
                <span style={{ color: '#dc5b9f' }}> shouldn’t be.</span>
              </h1>
            </div>

            <div style={{ paddingBottom: 8 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: '#777079',
                  maxWidth: 390,
                }}
              >
                IdoréStudy is a small study website made for people who focus
                better when their workspace feels a little more personal.
              </p>
            </div>
          </div>
        </section>

        <div className="about-wrap">
          <div className="about-rule" />
        </div>

        {/* story */}
        <section style={{ padding: '74px 0 86px' }}>
          <div
            className="about-wrap about-story"
            style={{
              display: 'grid',
              gridTemplateColumns: '0.65fr 1.35fr',
              gap: 90,
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  color: '#aaa0a7',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                }}
              >
                Why I made it
              </p>
            </div>

            <div style={{ maxWidth: 720 }}>
              <p
                className="about-serif"
                style={{
                  margin: '0 0 28px',
                  fontSize: 30,
                  lineHeight: 1.48,
                  fontWeight: 500,
                  color: '#302b31',
                }}
              >
                I wanted a study site that didn’t feel like another productivity
                dashboard.
              </p>

              <p
                style={{
                  margin: '0 0 20px',
                  fontSize: 16,
                  lineHeight: 1.9,
                  color: '#736d74',
                }}
              >
                A lot of study tools are useful, but they can feel sterile.
                They’re timers, charts, streaks, and task lists — and sometimes
                that’s exactly what you need. But sometimes the hardest part is
                simply wanting to sit down and start.
              </p>

              <p
                style={{
                  margin: '0 0 20px',
                  fontSize: 16,
                  lineHeight: 1.9,
                  color: '#736d74',
                }}
              >
                IdoréStudy came from wanting something softer: pick someone you
                like, put on music, open a cute room, start a timer, and get your
                work done.
              </p>

              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  lineHeight: 1.9,
                  color: '#736d74',
                }}
              >
                It isn’t supposed to replace your planner, Notion, calendar, or
                school portal. It’s just meant to make the actual studying part
                feel a little nicer.
              </p>
            </div>
          </div>
        </section>

        {/* handmade note */}
        <section style={{ paddingBottom: 86 }}>
          <div
            className="about-wrap about-note-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 18,
            }}
          >
            <div
              style={{
                background: '#f8dce8',
                minHeight: 340,
                borderRadius: 6,
                padding: '42px 40px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 120,
                  height: 26,
                  background: 'rgba(255,255,255,.48)',
                  top: 8,
                  left: '50%',
                  transform: 'translateX(-50%) rotate(-2deg)',
                }}
              />

              <p
                className="about-serif"
                style={{
                  margin: '46px 0 18px',
                  fontSize: 34,
                  fontStyle: 'italic',
                  lineHeight: 1.25,
                  color: '#6c4259',
                }}
              >
                “Make studying feel like somewhere you want to be.”
              </p>

              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: '#9e6b83',
                }}
              >
                basically the entire idea
              </p>

              <Heart
                size={54}
                strokeWidth={1.2}
                style={{
                  position: 'absolute',
                  right: 34,
                  bottom: 28,
                  color: '#d8649e',
                  transform: 'rotate(8deg)',
                }}
              />
            </div>

            <div
              style={{
                minHeight: 340,
                borderRadius: 6,
                background: '#efebf8',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    margin: '0 0 10px',
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '.13em',
                    color: '#9587aa',
                  }}
                >
                  Current direction
                </p>

                <h2
                  className="about-serif"
                  style={{
                    margin: 0,
                    fontSize: 31,
                    lineHeight: 1.2,
                    fontWeight: 600,
                    color: '#40364c',
                  }}
                >
                  More than just idol study videos.
                </h2>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: '#777080',
                }}
              >
                I’m slowly building IdoréStudy into a fuller study space with
                focus rooms, practical guides, downloadable resources, music,
                and small tools that actually help while you’re working.
              </p>
            </div>
          </div>
        </section>

        {/* features */}
        <section style={{ padding: '74px 0 94px' }}>
          <div className="about-wrap">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 30,
                alignItems: 'end',
                marginBottom: 30,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <p
                  style={{
                    margin: '0 0 12px',
                    color: '#aaa0a7',
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: '.13em',
                    fontWeight: 700,
                  }}
                >
                  What’s inside
                </p>

                <h2
                  className="about-serif"
                  style={{
                    margin: 0,
                    fontSize: 38,
                    fontWeight: 600,
                    letterSpacing: '-.025em',
                  }}
                >
                  Just the useful stuff.
                </h2>
              </div>

              <p
                style={{
                  margin: 0,
                  maxWidth: 360,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: '#948d95',
                }}
              >
                No complicated setup. No account required just to start a study
                session.
              </p>
            </div>

            <div style={{ borderTop: '1px solid #eee4e9' }}>
              {features.map(({ icon: Icon, title, text }) => (
                <div className="feature-row" key={title}>
                  <div className="feature-icon">
                    <Icon size={20} color="#d8599a" strokeWidth={1.8} />
                  </div>

                  <h3
                    style={{
                      margin: '10px 0 0',
                      fontSize: 15,
                      fontWeight: 600,
                    }}
                  >
                    {title}
                  </h3>

                  <p
                    style={{
                      margin: '8px 0 0',
                      fontSize: 14,
                      lineHeight: 1.75,
                      color: '#847d84',
                      maxWidth: 650,
                    }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* tiny ending */}
        <section
          style={{
            padding: '70px 0 82px',
            background: '#fff',
            borderTop: '1px solid #eee4e9',
          }}
        >
          <div className="about-wrap">
            <div style={{ maxWidth: 660 }}>
              <h2
                className="about-serif"
                style={{
                  margin: '0 0 18px',
                  fontSize: 36,
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Made for studying,
                <br />
                not for looking productive.
              </h2>

              <p
                style={{
                  margin: '0 0 24px',
                  color: '#797279',
                  fontSize: 15,
                  lineHeight: 1.8,
                }}
              >
                If IdoréStudy makes it even slightly easier to open your laptop,
                stop procrastinating, and get through what you need to do, then
                it’s doing its job.
              </p>

              <a
                href="/"
                className="about-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Go study
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* disclaimer */}
        <section
          style={{
            padding: '24px 0 34px',
            borderTop: '1px solid #f0e7eb',
          }}
        >
          <div className="about-wrap">
            <p
              style={{
                margin: 0,
                fontSize: 11,
                lineHeight: 1.7,
                color: '#aaa2a8',
                maxWidth: 880,
              }}
            >
              IdoréStudy is an independent fan-made study project and is not
              affiliated with or endorsed by any artist, entertainment company,
              agency, or record label. Artist names, trademarks, imagery, and
              embedded media belong to their respective owners.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}