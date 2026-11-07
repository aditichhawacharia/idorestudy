import React from 'react';
import {
  ArrowUpRight,
  ShieldCheck,
  ExternalLink,
  Mail,
} from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600&display=swap');

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  .privacy-page {
    min-height: 100vh;
    background: #fffdfd;
    color: #29252b;
    font-family: 'DM Sans', sans-serif;
  }

  .privacy-wrap {
    width: min(1120px, calc(100% - 48px));
    margin: 0 auto;
  }

  .privacy-serif {
    font-family: 'Playfair Display', serif;
  }

  .privacy-layout {
    display: grid;
    grid-template-columns: 210px minmax(0, 720px);
    gap: 80px;
    align-items: start;
  }

  .privacy-toc {
    position: sticky;
    top: 110px;
  }

  .privacy-toc a {
    display: block;
    padding: 7px 0;
    color: #918990;
    text-decoration: none;
    font-size: 12px;
    line-height: 1.45;
    transition: color 150ms ease;
  }

  .privacy-toc a:hover {
    color: #bc5786;
  }

  .privacy-section {
    padding: 0 0 42px;
    margin-bottom: 42px;
    border-bottom: 1px solid #eee7eb;
  }

  .privacy-section:last-child {
    border-bottom: 0;
  }

  .privacy-section h2 {
    margin: 0 0 16px;
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    line-height: 1.25;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #282329;
  }

  .privacy-section p,
  .privacy-section li {
    font-size: 14px;
    line-height: 1.82;
    color: #6e686f;
  }

  .privacy-section p {
    margin: 0 0 14px;
  }

  .privacy-section ul {
    margin: 12px 0 18px;
    padding-left: 20px;
  }

  .privacy-section li {
    padding-left: 4px;
    margin-bottom: 7px;
  }

  .privacy-section strong {
    color: #3d373e;
    font-weight: 600;
  }

  .privacy-link {
    color: #b95383;
    text-decoration: underline;
    text-decoration-color: #e5bfd1;
    text-underline-offset: 3px;
  }

  .privacy-link:hover {
    color: #95406a;
  }

  .privacy-note {
    margin: 22px 0 4px;
    padding: 17px 18px;
    border-left: 3px solid #d783aa;
    background: #fdf6f9;
  }

  @media (max-width: 820px) {
    .privacy-layout {
      grid-template-columns: 1fr;
      gap: 42px;
    }

    .privacy-toc {
      position: static;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 2px 20px;
      padding-bottom: 28px;
      border-bottom: 1px solid #eee7eb;
    }
  }

  @media (max-width: 520px) {
    .privacy-wrap {
      width: min(100% - 32px, 1120px);
    }

    .privacy-toc {
      grid-template-columns: 1fr;
    }

    .privacy-title {
      font-size: 44px !important;
    }
  }
`;

const sections = [
  ['information', 'Information we collect'],
  ['cookies', 'Cookies and tracking'],
  ['ads', 'Advertising'],
  ['third-parties', 'Third-party services'],
  ['use', 'How we use information'],
  ['sharing', 'Sharing and disclosure'],
  ['storage', 'Local storage and retention'],
  ['children', "Children's privacy"],
  ['rights', 'Your privacy rights'],
  ['international', 'International visitors'],
  ['changes', 'Changes to this policy'],
  ['contact', 'Contact'],
];

export default function PrivacyPolicy() {
  const lastUpdated = 'July 13, 2026';

  return (
    <>
      <style>{styles}</style>

      <main className="privacy-page">
        {/* Header */}
        <section
          style={{
            padding: '88px 0 66px',
            borderBottom: '1px solid #eee7eb',
          }}
        >
          <div className="privacy-wrap">
            <div style={{ maxWidth: 760 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 18,
                  color: '#b95b87',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                <ShieldCheck size={16} strokeWidth={1.8} />
                Privacy
              </div>

              <h1
                className="privacy-serif privacy-title"
                style={{
                  margin: '0 0 18px',
                  fontSize: 'clamp(48px, 6vw, 68px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  fontWeight: 600,
                }}
              >
                Privacy Policy
              </h1>

              <p
                style={{
                  margin: '0 0 12px',
                  maxWidth: 650,
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: '#777078',
                }}
              >
                This page explains what information IdoréStudy may collect,
                why it is used, and the choices available to you when using
                the site.
              </p>

              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: '#aaa2a8',
                }}
              >
                Last updated {lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* Document */}
        <section style={{ padding: '66px 0 100px' }}>
          <div className="privacy-wrap privacy-layout">
            {/* Contents */}
            <aside className="privacy-toc">
              <div
                style={{
                  marginBottom: 14,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '.13em',
                  textTransform: 'uppercase',
                  color: '#aaa1a7',
                }}
              >
                On this page
              </div>

              {sections.map(([id, label], index) => (
                <a href={`#${id}`} key={id}>
                  {index + 1}. {label}
                </a>
              ))}
            </aside>

            {/* Main copy */}
            <article>
              <div
                style={{
                  paddingBottom: 42,
                  marginBottom: 42,
                  borderBottom: '1px solid #eee7eb',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.85,
                    color: '#625c63',
                  }}
                >
                  IdoréStudy (“we,” “us,” or “our”) operates this website.
                  This Privacy Policy describes how information may be
                  collected and used when you visit or interact with
                  IdoréStudy.
                </p>
              </div>

              <section id="information" className="privacy-section">
                <h2>1. Information we collect</h2>

                <p>
                  The information collected depends on how you use the site.
                  This may include:
                </p>

                <ul>
                  <li>
                    <strong>Usage information.</strong> Information such as
                    pages viewed, approximate session duration, device type,
                    browser type, and similar technical information may be
                    collected through analytics tools.
                  </li>

                  <li>
                    <strong>Local preferences.</strong> Some features,
                    including timer settings and to-do items, may be stored
                    directly in your browser using local storage.
                  </li>

                  <li>
                    <strong>Information you send us.</strong> If you contact
                    IdoréStudy by email, we receive the information contained
                    in that message, including your email address and any
                    details you choose to provide.
                  </li>
                </ul>

                <div className="privacy-note">
                  <p style={{ margin: 0 }}>
                    Timer preferences and study to-do items stored through
                    browser local storage remain on your device unless a
                    feature explicitly states otherwise.
                  </p>
                </div>
              </section>

              <section id="cookies" className="privacy-section">
                <h2>2. Cookies and similar technologies</h2>

                <p>
                  IdoréStudy may use cookies and similar technologies to keep
                  the site working, understand how visitors use it, remember
                  preferences, and support advertising.
                </p>

                <p>
                  Depending on your location and consent choices, these may
                  include:
                </p>

                <ul>
                  <li>Essential technologies needed for site functionality.</li>
                  <li>
                    Analytics technologies used to understand site traffic and
                    feature usage.
                  </li>
                  <li>
                    Advertising technologies used by advertising providers.
                  </li>
                </ul>

                <p>
                  You can also control cookies through your browser settings.
                  Some features may work differently if certain storage is
                  disabled.
                </p>
              </section>

              <section id="ads" className="privacy-section">
                <h2>3. Advertising</h2>

                <p>
                  IdoréStudy may display advertising through Google AdSense or
                  other advertising providers.
                </p>

                <p>
                  Advertising providers may use cookies or similar
                  technologies to measure ad performance and, where permitted,
                  personalize advertising based on activity across websites or
                  services.
                </p>

                <p>
                  You can learn more about Google's advertising controls at{' '}
                  <a
                    className="privacy-link"
                    href="https://myadcenter.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google My Ad Center
                  </a>
                  .
                </p>
              </section>

              <section id="third-parties" className="privacy-section">
                <h2>4. Third-party services</h2>

                <p>
                  Some parts of IdoréStudy rely on services operated by other
                  companies. Those services may process information according
                  to their own privacy policies.
                </p>

                <ul>
                  <li>
                    <strong>YouTube.</strong> Embedded YouTube videos may send
                    information to Google when video content is loaded or
                    played.
                  </li>

                  <li>
                    <strong>Analytics providers.</strong> Analytics tools may
                    collect technical and usage information to help us
                    understand how the site is used.
                  </li>

                  <li>
                    <strong>Google Fonts or other hosted assets.</strong> Some
                    externally hosted resources may receive basic request
                    information such as IP address and browser data.
                  </li>
                </ul>

                <p>
                  Embedded media remains subject to the terms and privacy
                  practices of the platform providing that media.
                </p>
              </section>

              <section id="use" className="privacy-section">
                <h2>5. How we use information</h2>

                <p>Information may be used to:</p>

                <ul>
                  <li>Operate and maintain IdoréStudy.</li>
                  <li>Understand how visitors use the site.</li>
                  <li>Improve study tools, layouts, and site performance.</li>
                  <li>Respond to questions, reports, or support requests.</li>
                  <li>Display and measure advertising.</li>
                  <li>Protect the site from abuse or security issues.</li>
                  <li>Comply with applicable legal obligations.</li>
                </ul>
              </section>

              <section id="sharing" className="privacy-section">
                <h2>6. Sharing and disclosure</h2>

                <p>
                  We do not sell personal information in exchange for money.
                  Information may be shared with service providers when
                  necessary to operate the site, provide analytics, display
                  advertising, or comply with legal requirements.
                </p>

                <p>
                  We may also disclose information if reasonably necessary to
                  protect IdoréStudy, its users, or our legal rights.
                </p>
              </section>

              <section id="storage" className="privacy-section">
                <h2>7. Local storage and data retention</h2>

                <p>
                  Some IdoréStudy settings are stored locally in your browser.
                  You can generally remove this information by clearing site
                  data or browser storage.
                </p>

                <p>
                  Information handled by external analytics or advertising
                  services may be retained according to those providers'
                  policies and configuration settings.
                </p>
              </section>

              <section id="children" className="privacy-section">
                <h2>8. Children's privacy</h2>

                <p>
                  IdoréStudy is not intended to knowingly collect personal
                  information from children under 13.
                </p>

                <p>
                  If you believe a child has provided personal information
                  directly to us, please contact us so the issue can be
                  reviewed.
                </p>
              </section>

              <section id="rights" className="privacy-section">
                <h2>9. Your privacy choices and rights</h2>

                <p>
                  Depending on where you live, you may have rights relating to
                  your personal information, including the ability to request
                  access, correction, deletion, or information about certain
                  processing activities.
                </p>

                <p>
                  You may also be able to limit personalized advertising
                  through your cookie choices, browser settings, or the
                  controls offered by advertising providers.
                </p>

                <p>
                  To make a privacy-related request, contact us at the email
                  address listed below.
                </p>
              </section>

              <section id="international" className="privacy-section">
                <h2>10. International visitors</h2>

                <p>
                  IdoréStudy may be accessed by visitors in different
                  countries. Third-party providers used by the site may
                  process information in countries other than the one in which
                  you live.
                </p>

                <p>
                  Where required, applicable privacy rights and consent
                  requirements will apply based on your location.
                </p>
              </section>

              <section id="changes" className="privacy-section">
                <h2>11. Changes to this policy</h2>

                <p>
                  This Privacy Policy may change as IdoréStudy evolves or as
                  the services used by the site change.
                </p>

                <p>
                  When updates are made, the “Last updated” date at the top of
                  this page will be revised.
                </p>
              </section>

              <section id="contact" className="privacy-section">
                <h2>12. Contact</h2>

                <p>
                  Questions about this Privacy Policy or privacy-related
                  requests can be sent to:
                </p>

                <a
                  href="mailto:idore.collections@gmail.com"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 6,
                    color: '#312b31',
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  <Mail size={16} strokeWidth={1.8} />
                  idore.collections@gmail.com
                  <ArrowUpRight size={14} />
                </a>
              </section>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}