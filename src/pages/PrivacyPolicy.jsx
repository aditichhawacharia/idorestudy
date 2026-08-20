import { ExternalLink, Mail, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { showGooglePrivacyChoices } from '../lib/adsense.js';

const updated = 'August 20, 2026';
const email = 'idore.collections@gmail.com';

function PrivacyChoicesButton() {
  const navigate = useNavigate();
  const openChoices = async () => {
    const opened = await showGooglePrivacyChoices();
    if (!opened) navigate('/privacy#privacy-choices');
  };

  return <button type="button" className="secondary-button" onClick={openChoices}>Open privacy and cookie settings</button>;
}

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How IdoréStudy handles local browser data, contact emails, hosting logs, optional third-party media, analytics, advertising, and privacy choices."
        path="/privacy"
      />

      <header className="content-hero">
        <div className="narrow-wrap">
          <p className="eyebrow"><ShieldCheck size={16} aria-hidden="true" /> Privacy policy</p>
          <h1 className="content-title">What is stored, what may be shared, and what you can control.</h1>
          <p className="content-lead">Last updated {updated}. This policy applies to idorestudy.com and its study room.</p>
        </div>
      </header>

      <div className="article-wrap" style={{ paddingTop: 18 }}>
        <div className="article-body">
          <section>
            <h2>1. Overview</h2>
            <p>
              IdoréStudy is an independent, no-account study website. This policy explains the information that
              may be processed when you browse the site, use local study tools, choose optional third-party
              media, contact the publisher, or interact with analytics or advertising services if those services
              are enabled.
            </p>
            <p>
              The publisher is the data controller for information received directly through the site or email.
              Third-party services process information under their own policies and terms.
            </p>
          </section>

          <section>
            <h2>2. Information stored on your device</h2>
            <p>
              The timer settings, session outcome, to-do list, and certain interface preferences may be stored
              in your browser using localStorage. This allows the study room to remember settings without an
              account. LocalStorage data stays on the device and browser profile where it was created unless a
              browser extension, synchronization feature, device administrator, or other software copies it.
            </p>
            <ul>
              <li>You can remove this data by clearing site data in your browser.</li>
              <li>Clearing it may reset timer settings and remove saved tasks.</li>
              <li>IdoréStudy does not provide cloud backup or cross-device synchronization for this data.</li>
            </ul>
          </section>

          <section>
            <h2>3. Information processed automatically</h2>
            <p>
              The hosting provider and network infrastructure may process standard request information needed
              to deliver and secure the site. This can include an IP address, request time, requested URL,
              browser or device information, referring page, and security or error logs. Retention and access
              depend on the hosting provider’s configuration.
            </p>
            <p>
              IdoréStudy may use aggregated or limited logs to diagnose outages, prevent abuse, measure basic
              reliability, and protect the service. The site does not ask visitors to create profiles or submit
              demographic information.
            </p>
          </section>

          <section>
            <h2>4. Contact messages</h2>
            <p>
              The contact page opens your own email application. When you send the email, the publisher receives
              the address, name, subject, message, and any information or attachments you choose to include.
              Messages may be retained as long as reasonably needed to respond, resolve a report, keep a record
              of a content request, or meet legal obligations.
            </p>
            <p>Do not send passwords, payment-card information, government identifiers, medical records, or other highly sensitive information.</p>
          </section>

          <section>
            <h2>5. Optional YouTube media</h2>
            <p>
              The study room contains optional video and audio embeds. The media player is not loaded until you
              choose a study buddy and enter the room. When an embed loads, your browser connects to YouTube,
              which may receive your IP address, browser information, the page URL, device identifiers, and
              interaction or cookie information under Google’s policies. The rebuilt room uses YouTube’s
              privacy-enhanced embed domain where supported, but that does not prevent every form of data
              processing by Google.
            </p>
            <p>
              You can avoid loading the media by remaining on the informational pages or leaving the study room
              before selecting a buddy. Media availability and privacy practices are controlled by the original
              platform, not IdoréStudy.
            </p>
          </section>

          <section>
            <h2>6. Advertising and analytics</h2>
            <p>
              Display advertising is not loaded unless the publisher has enabled and configured it. If Google
              AdSense is enabled, Google and its partners may use cookies, local
              storage, IP addresses, device information, and page or ad interactions to deliver, limit, measure,
              personalize, or protect advertising. IdoréStudy places ads only on substantive informational pages,
              not in the study room or on policy pages.
            </p>
            <p>
              The publisher may also enable a privacy-respecting analytics service or Google Analytics in the
              future. If enabled, the policy and consent interface should be updated to identify the service,
              purposes, retention choices, and available controls. IdoréStudy does not install a general analytics
              tag by default.
            </p>
            <p>
              Google explains advertising data use at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">How Google uses data for advertising</a> and provides ad-personalization controls through <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">My Ad Center</a>.
            </p>
          </section>

          <section id="privacy-choices">
            <h2>7. Consent and privacy choices</h2>
            <p>
              Where required, advertising and related storage should be controlled through a Google-certified
              consent management platform. The intended production setup is Google’s Privacy &amp; messaging
              European regulations message. That interface allows eligible visitors to accept, reject, or manage
              advertising purposes and vendors, and to revisit those choices later.
            </p>
            <div className="button-row"><PrivacyChoicesButton /></div>
            <p className="note">
              The button opens Google’s revocation interface after that message has been configured and loaded.
              Before advertising is active, it may simply keep you on this policy section because no advertising
              consent interface is present.
            </p>
          </section>

          <section>
            <h2>8. Google Fonts and external links</h2>
            <p>
              The site uses local system-font fallbacks and does not require a Google Fonts stylesheet.
              External links, such as research citations or YouTube source pages, take you to services governed by
              their own policies. A link does not mean IdoréStudy controls or endorses that service.
            </p>
          </section>

          <section>
            <h2>9. Legal bases and purposes</h2>
            <p>Depending on your location and the feature involved, processing may rely on one or more of the following:</p>
            <ul>
              <li>Performance of the service you request, such as delivering a page or remembering local settings.</li>
              <li>Legitimate interests in security, reliability, responding to messages, and maintaining the site.</li>
              <li>Consent for nonessential advertising storage, personalization, and related purposes where required.</li>
              <li>Compliance with applicable legal obligations and the protection of legal rights.</li>
            </ul>
          </section>

          <section>
            <h2>10. Sharing and service providers</h2>
            <p>
              IdoréStudy does not sell a visitor list or operate a data-broker business. Information may be
              processed by hosting and security providers, email providers, YouTube/Google when embeds are
              loaded, Google and consent-platform vendors if advertising is activated, professional advisers,
              or authorities when required by law. A business transfer may also involve relevant records,
              subject to applicable law.
            </p>
          </section>

          <section>
            <h2>11. Retention</h2>
            <p>
              Browser storage remains until you or the browser clears it. Contact messages and content reports
              are kept only as long as reasonably necessary for the purpose received, dispute prevention, or
              legal compliance. Hosting, advertising, analytics, and embedded-media providers set their own
              retention periods. The publisher should review those settings before enabling each service.
            </p>
          </section>

          <section>
            <h2>12. Children</h2>
            <p>
              IdoréStudy is a general-audience study tool and is not directed to children under 13. The site does
              not knowingly request personal information from children under 13. A parent or guardian who
              believes a child sent personal information can request review or deletion by email.
            </p>
          </section>

          <section>
            <h2>13. Your rights</h2>
            <p>
              Depending on where you live, you may have rights to request access, correction, deletion,
              restriction, portability, or objection; to withdraw consent; to opt out of certain advertising;
              or to complain to a data-protection authority. These rights can be limited by exceptions in
              applicable law. The publisher may need reasonable information to verify and fulfill a request.
            </p>
          </section>

          <section>
            <h2>14. Security and international processing</h2>
            <p>
              Reasonable technical and organizational steps are used, but no internet service or email system is
              completely secure. Providers may process information in countries other than your own. Their
              safeguards, locations, and transfer mechanisms are described in their own documentation.
            </p>
          </section>

          <section>
            <h2>15. Changes and contact</h2>
            <p>
              This policy may change when features or providers change. The date at the top will be updated for
              material revisions. Questions or privacy requests can be sent to <a href={`mailto:${email}`}>{email}</a>.
            </p>
            <div className="contact-method">
              <Mail size={21} aria-hidden="true" />
              <div><strong>IdoréStudy privacy contact</strong><br /><a href={`mailto:${email}`}>{email}</a></div>
            </div>
            <p className="note">
              For Google’s own privacy information, visit its published privacy and advertising documentation
              through the consent interface or Google’s official sites. <ExternalLink size={14} aria-hidden="true" />
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
