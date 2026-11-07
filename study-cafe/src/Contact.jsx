import React, { useState } from 'react';
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Bug,
  Lightbulb,
  Handshake,
  FileWarning,
} from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap');

  * {
    box-sizing: border-box;
  }

  .contact-page {
    min-height: 100vh;
    background: #fffafb;
    color: #262229;
    font-family: 'DM Sans', sans-serif;
  }

  .contact-serif {
    font-family: 'Playfair Display', serif;
  }

  .contact-wrap {
    width: min(1120px, calc(100% - 48px));
    margin: 0 auto;
  }

  .contact-input,
  .contact-textarea {
    width: 100%;
    border: 1px solid #e9dfe5;
    background: #fff;
    border-radius: 10px;
    padding: 13px 14px;
    font: inherit;
    font-size: 14px;
    color: #29242b;
    outline: none;
    transition: border-color 150ms ease, box-shadow 150ms ease;
  }

  .contact-input:focus,
  .contact-textarea:focus {
    border-color: #d96a9e;
    box-shadow: 0 0 0 3px rgba(217, 106, 158, 0.08);
  }

  .contact-textarea {
    resize: vertical;
    min-height: 150px;
    line-height: 1.6;
  }

  .subject-button {
    border: 1px solid #e9dfe5;
    background: #fff;
    color: #777078;
    border-radius: 999px;
    padding: 9px 13px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 150ms ease;
  }

  .subject-button:hover {
    border-color: #d9b2c5;
    color: #b45283;
  }

  .subject-button.active {
    background: #fcecf4;
    color: #b94f83;
    border-color: #e7b4cc;
  }

  .contact-submit {
    border: none;
    border-radius: 10px;
    background: #29242b;
    color: white;
    padding: 14px 18px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 150ms ease, transform 150ms ease;
  }

  .contact-submit:hover {
    background: #3b343e;
    transform: translateY(-1px);
  }

  @media (max-width: 860px) {
    .contact-layout {
      grid-template-columns: 1fr !important;
      gap: 56px !important;
    }
  }

  @media (max-width: 520px) {
    .contact-wrap {
      width: min(100% - 32px, 1120px);
    }

    .contact-form-card {
      padding: 24px !important;
    }

    .contact-title {
      font-size: 48px !important;
    }
  }
`;

const subjects = [
  { label: 'General', icon: MessageCircle },
  { label: 'Bug report', icon: Bug },
  { label: 'Feature idea', icon: Lightbulb },
  { label: 'Content issue', icon: FileWarning },
  { label: 'Partnership', icon: Handshake },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('General');

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    const sub = encodeURIComponent(
      `[IdoréStudy] ${subject} — from ${name}`
    );

    window.location.href =
      `mailto:idore.collections@gmail.com?subject=${sub}&body=${body}`;

    setSubmitted(true);
  };

  return (
    <>
      <style>{styles}</style>

      <main className="contact-page">
        <section style={{ padding: '92px 0 110px' }}>
          <div
            className="contact-wrap contact-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: '0.8fr 1.2fr',
              gap: 96,
              alignItems: 'start',
            }}
          >
            {/* LEFT */}
            <div style={{ paddingTop: 8 }}>
              <p
                style={{
                  margin: '0 0 18px',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '.13em',
                  textTransform: 'uppercase',
                  color: '#c15e8f',
                }}
              >
                Contact
              </p>

              <h1
                className="contact-serif contact-title"
                style={{
                  margin: '0 0 26px',
                  fontSize: 'clamp(50px, 6vw, 72px)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.045em',
                  fontWeight: 600,
                }}
              >
                Have something
                <br />
                to tell us?
              </h1>

              <p
                style={{
                  margin: '0 0 42px',
                  maxWidth: 420,
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: '#797178',
                }}
              >
                Found something broken, have an idea for the site, want to
                report a content issue, or just want to say hi? Send a note.
              </p>

              <div
                style={{
                  paddingTop: 26,
                  borderTop: '1px solid #eae1e6',
                }}
              >
                <p
                  style={{
                    margin: '0 0 8px',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#9a9198',
                  }}
                >
                  Email
                </p>

                <a
                  href="mailto:idore.collections@gmail.com"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    color: '#2e2930',
                    fontSize: 15,
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  idore.collections@gmail.com
                  <ArrowUpRight size={15} />
                </a>

                <p
                  style={{
                    margin: '24px 0 0',
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: '#aaa1a8',
                    maxWidth: 360,
                  }}
                >
                  For copyright, licensing, or media concerns, please choose
                  “Content issue” so we can identify it quickly.
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              {!submitted ? (
                <div
                  className="contact-form-card"
                  style={{
                    background: '#fff',
                    border: '1px solid #eae1e6',
                    borderRadius: 18,
                    padding: '38px 40px 42px',
                  }}
                >
                  <div style={{ marginBottom: 30 }}>
                    <h2
                      className="contact-serif"
                      style={{
                        margin: '0 0 8px',
                        fontSize: 27,
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Send a message
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: '#999198',
                      }}
                    >
                      This opens your email app with your message filled in.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 22,
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 16,
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: 'block',
                            marginBottom: 7,
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#665f65',
                          }}
                        >
                          Name
                        </label>

                        <input
                          className="contact-input"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label
                          style={{
                            display: 'block',
                            marginBottom: 7,
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#665f65',
                          }}
                        >
                          Email
                        </label>

                        <input
                          className="contact-input"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: 10,
                          fontSize: 12,
                          fontWeight: 600,
                          color: '#665f65',
                        }}
                      >
                        What is this about?
                      </label>

                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 8,
                        }}
                      >
                        {subjects.map(({ label, icon: Icon }) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() => setSubject(label)}
                            className={`subject-button ${
                              subject === label ? 'active' : ''
                            }`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                            }}
                          >
                            <Icon size={13} />
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: 7,
                          fontSize: 12,
                          fontWeight: 600,
                          color: '#665f65',
                        }}
                      >
                        Message
                      </label>

                      <textarea
                        className="contact-textarea"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what's going on..."
                      />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 16,
                        flexWrap: 'wrap',
                        paddingTop: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          color: '#aaa1a8',
                        }}
                      >
                        We usually reply within a few business days.
                      </span>

                      <button
                        type="submit"
                        className="contact-submit"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <Mail size={15} />
                        Send message
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div
                  className="contact-form-card"
                  style={{
                    background: '#fff',
                    border: '1px solid #eae1e6',
                    borderRadius: 18,
                    padding: '54px 40px',
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: '#f8e7f0',
                      display: 'grid',
                      placeItems: 'center',
                      marginBottom: 22,
                    }}
                  >
                    <Mail size={19} color="#c45689" />
                  </div>

                  <h2
                    className="contact-serif"
                    style={{
                      margin: '0 0 12px',
                      fontSize: 30,
                      fontWeight: 600,
                    }}
                  >
                    Your email app should be open.
                  </h2>

                  <p
                    style={{
                      margin: '0 0 28px',
                      maxWidth: 500,
                      fontSize: 14,
                      lineHeight: 1.75,
                      color: '#817980',
                    }}
                  >
                    If nothing opened, you can email us directly at
                    {' '}
                    <a
                      href="mailto:idore.collections@gmail.com"
                      style={{
                        color: '#bd5789',
                        textDecoration: 'none',
                      }}
                    >
                      idore.collections@gmail.com
                    </a>
                    .
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    style={{
                      padding: 0,
                      border: 'none',
                      background: 'transparent',
                      color: '#b64f82',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Write another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* bottom note */}
        <section
          style={{
            borderTop: '1px solid #ece3e8',
            background: '#fff',
            padding: '26px 0 32px',
          }}
        >
          <div className="contact-wrap">
            <p
              style={{
                margin: 0,
                fontSize: 11,
                lineHeight: 1.7,
                color: '#aaa2a8',
                maxWidth: 760,
              }}
            >
              IdoréStudy is an independent fan-made study project. Please do
              not send confidential, financial, or sensitive personal
              information through this form.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}