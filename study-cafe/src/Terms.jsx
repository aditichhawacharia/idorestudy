import React from 'react';
import {
  FileText,
  Mail,
  ArrowUpRight,
} from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600&display=swap');

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  .terms-page {
    min-height: 100vh;
    background: #fffdfd;
    color: #29252b;
    font-family: 'DM Sans', sans-serif;
  }

  .terms-wrap {
    width: min(1120px, calc(100% - 48px));
    margin: 0 auto;
  }

  .terms-serif {
    font-family: 'Playfair Display', serif;
  }

  .terms-layout {
    display: grid;
    grid-template-columns: 210px minmax(0, 720px);
    gap: 80px;
    align-items: start;
  }

  .terms-toc {
    position: sticky;
    top: 110px;
  }

  .terms-toc a {
    display: block;
    padding: 7px 0;
    color: #918990;
    text-decoration: none;
    font-size: 12px;
    line-height: 1.45;
    transition: color 150ms ease;
  }

  .terms-toc a:hover {
    color: #bc5786;
  }

  .terms-section {
    padding: 0 0 42px;
    margin-bottom: 42px;
    border-bottom: 1px solid #eee7eb;
  }

  .terms-section:last-child {
    border-bottom: 0;
  }

  .terms-section h2 {
    margin: 0 0 16px;
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    line-height: 1.25;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #282329;
  }

  .terms-section p,
  .terms-section li {
    font-size: 14px;
    line-height: 1.82;
    color: #6e686f;
  }

  .terms-section p {
    margin: 0 0 14px;
  }

  .terms-section ul {
    margin: 12px 0 18px;
    padding-left: 20px;
  }

  .terms-section li {
    padding-left: 4px;
    margin-bottom: 7px;
  }

  .terms-section strong {
    color: #3d373e;
    font-weight: 600;
  }

  .terms-link {
    color: #b95383;
    text-decoration: underline;
    text-decoration-color: #e5bfd1;
    text-underline-offset: 3px;
  }

  .terms-note {
    margin: 22px 0 4px;
    padding: 17px 18px;
    border-left: 3px solid #d783aa;
    background: #fdf6f9;
  }

  @media (max-width: 820px) {
    .terms-layout {
      grid-template-columns: 1fr;
      gap: 42px;
    }

    .terms-toc {
      position: static;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 2px 20px;
      padding-bottom: 28px;
      border-bottom: 1px solid #eee7eb;
    }
  }

  @media (max-width: 520px) {
    .terms-wrap {
      width: min(100% - 32px, 1120px);
    }

    .terms-toc {
      grid-template-columns: 1fr;
    }

    .terms-title {
      font-size: 44px !important;
    }
  }
`;

const sections = [
  ['acceptance', 'Acceptance of terms'],
  ['service', 'About the service'],
  ['third-party', 'Third-party content'],
  ['acceptable-use', 'Acceptable use'],
  ['advertising', 'Advertising'],
  ['availability', 'Availability and changes'],
  ['disclaimer', 'Disclaimer of warranties'],
  ['liability', 'Limitation of liability'],
  ['links', 'External links'],
  ['termination', 'Access and termination'],
  ['changes', 'Changes to these terms'],
  ['law', 'Governing law'],
  ['contact', 'Contact'],
];

export default function Terms() {
  const lastUpdated = 'November 6, 2026';

  return (
    <>
      <style>{styles}</style>

      <main className="terms-page">
        {/* Header */}
        <section
          style={{
            padding: '88px 0 66px',
            borderBottom: '1px solid #eee7eb',
          }}
        >
          <div className="terms-wrap">
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
                <FileText size={16} strokeWidth={1.8} />
                Legal
              </div>

              <h1
                className="terms-serif terms-title"
                style={{
                  margin: '0 0 18px',
                  fontSize: 'clamp(48px, 6vw, 68px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  fontWeight: 600,
                }}
              >
                Terms of Service
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
                These Terms explain the rules that apply when using
                IdoréStudy and the study tools, media, and resources available
                through the site.
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
          <div className="terms-wrap terms-layout">
            {/* Contents */}
            <aside className="terms-toc">
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

            {/* Main */}
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
                  These Terms of Service (“Terms”) govern your access to and
                  use of IdoréStudy. By using the site, you agree to these
                  Terms. If you do not agree with them, please do not use the
                  site.
                </p>
              </div>

              <section id="acceptance" className="terms-section">
                <h2>1. Acceptance of terms</h2>

                <p>
                  By accessing or using IdoréStudy, you confirm that you are
                  legally permitted to use the site and agree to comply with
                  these Terms.
                </p>

                <p>
                  If you are using the site on behalf of another person or
                  organization, you confirm that you are authorized to accept
                  these Terms on their behalf.
                </p>
              </section>

              <section id="service" className="terms-section">
                <h2>2. About the service</h2>

                <p>
                  IdoréStudy is a web-based study platform that provides
                  productivity and focus features including:
                </p>

                <ul>
                  <li>virtual study rooms and study-partner experiences;</li>
                  <li>focus and break timers;</li>
                  <li>to-do and task-management tools;</li>
                  <li>ambient music and study audio;</li>
                  <li>study guides and educational resources; and</li>
                  <li>other study-related tools and content.</li>
                </ul>

                <p>
                  Some features may be added, changed, or removed over time as
                  the site develops.
                </p>
              </section>

              <section id="third-party" className="terms-section">
                <h2>3. Third-party content and intellectual property</h2>

                <p>
                  IdoréStudy may display, link to, or embed content provided by
                  third parties, including video, audio, images, and external
                  websites.
                </p>

                <ul>
                  <li>
                    Third-party media remains owned by its respective owner or
                    rights holder.
                  </li>

                  <li>
                    Embedded content may be subject to the terms and policies
                    of the platform from which it is provided.
                  </li>

                  <li>
                    IdoréStudy does not claim ownership of third-party artist
                    names, group names, trademarks, or media.
                  </li>

                  <li>
                    The availability of embedded content may change or end at
                    any time based on the decisions of the provider or rights
                    holder.
                  </li>
                </ul>

                <div className="terms-note">
                  <p style={{ margin: 0 }}>
                    IdoréStudy is an independent fan-created study platform and
                    is not affiliated with, sponsored by, or endorsed by any
                    artist, entertainment company, agency, or record label
                    unless explicitly stated otherwise.
                  </p>
                </div>
              </section>

              <section id="acceptable-use" className="terms-section">
                <h2>4. Acceptable use</h2>

                <p>You agree not to use IdoréStudy to:</p>

                <ul>
                  <li>violate any applicable law or regulation;</li>
                  <li>
                    attempt to interfere with, disable, damage, or overload the
                    site or its infrastructure;
                  </li>
                  <li>
                    attempt to access restricted areas, systems, or data
                    without authorization;
                  </li>
                  <li>
                    use automated systems to scrape or extract substantial
                    portions of site content without permission;
                  </li>
                  <li>
                    falsely suggest that you are affiliated with IdoréStudy or
                    its creators;
                  </li>
                  <li>
                    use the site in a way that infringes the rights of others;
                    or
                  </li>
                  <li>
                    exploit the site for fraudulent, abusive, or malicious
                    purposes.
                  </li>
                </ul>
              </section>

              <section id="advertising" className="terms-section">
                <h2>5. Advertising</h2>

                <p>
                  IdoréStudy may display advertisements from third-party
                  advertising providers, including Google AdSense.
                </p>

                <p>
                  We do not control the content of third-party advertisements
                  and are not responsible for products, services, claims, or
                  websites promoted through those advertisements.
                </p>

                <p>
                  Advertising and related tracking technologies are described
                  in more detail in the Privacy Policy.
                </p>
              </section>

              <section id="availability" className="terms-section">
                <h2>6. Availability and changes to the service</h2>

                <p>
                  We may update, modify, suspend, or discontinue any part of
                  IdoréStudy at any time.
                </p>

                <p>
                  We do not guarantee that every feature, study room, media
                  item, playlist, or resource will remain permanently
                  available.
                </p>

                <p>
                  Third-party media may also become unavailable for reasons
                  outside our control.
                </p>
              </section>

              <section id="disclaimer" className="terms-section">
                <h2>7. Disclaimer of warranties</h2>

                <p>
                  IdoréStudy is provided on an “as is” and “as available”
                  basis.
                </p>

                <p>
                  To the extent permitted by law, we make no warranties,
                  express or implied, regarding the availability, reliability,
                  accuracy, security, or suitability of the site or its
                  content.
                </p>

                <p>
                  IdoréStudy is a productivity and study-support tool. It is
                  not intended to provide professional academic, medical,
                  financial, or legal advice.
                </p>
              </section>

              <section id="liability" className="terms-section">
                <h2>8. Limitation of liability</h2>

                <p>
                  To the fullest extent permitted by applicable law,
                  IdoréStudy and its operators will not be liable for
                  indirect, incidental, special, consequential, or punitive
                  damages arising from your use of or inability to use the
                  site.
                </p>

                <p>
                  This includes losses arising from unavailable third-party
                  content, interruptions, technical errors, data loss, or
                  interactions with external websites or advertisements.
                </p>
              </section>

              <section id="links" className="terms-section">
                <h2>9. External links and services</h2>

                <p>
                  IdoréStudy may contain links to third-party websites,
                  platforms, or services.
                </p>

                <p>
                  Those services operate independently from IdoréStudy and may
                  have their own terms, privacy policies, and practices. We are
                  not responsible for their content or operation.
                </p>
              </section>

              <section id="termination" className="terms-section">
                <h2>10. Access and termination</h2>

                <p>
                  We may restrict or block access to the site where reasonably
                  necessary to protect IdoréStudy, its users, or third parties,
                  or to address misuse of the service.
                </p>

                <p>
                  Because IdoréStudy currently does not require user accounts
                  for its core study experience, there may not be an account
                  to terminate or delete.
                </p>
              </section>

              <section id="changes" className="terms-section">
                <h2>11. Changes to these terms</h2>

                <p>
                  We may update these Terms as the site changes.
                </p>

                <p>
                  When material changes are made, the “Last updated” date at
                  the top of this page will be revised. Your continued use of
                  the site after updated Terms are posted constitutes
                  acceptance of the revised Terms where permitted by law.
                </p>
              </section>

              <section id="law" className="terms-section">
                <h2>12. Governing law</h2>

                <p>
                  These Terms will be interpreted according to applicable law.
                  Nothing in these Terms limits any consumer rights that cannot
                  legally be waived.
                </p>

                <p>
                  Any dispute relating to IdoréStudy should first be raised
                  with us so that we have an opportunity to resolve the issue
                  informally where appropriate.
                </p>
              </section>

              <section id="contact" className="terms-section">
                <h2>13. Contact</h2>

                <p>
                  If you have questions about these Terms, you can contact:
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