import { FileText, Mail } from 'lucide-react';
import Seo from '../components/Seo.jsx';

const updated = 'August 20, 2026';
const email = 'idore.collections@gmail.com';

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Use"
        description="Terms governing use of IdoréStudy, its original study resources, local productivity tools, optional third-party media, and advertising."
        path="/terms"
      />

      <header className="content-hero">
        <div className="narrow-wrap">
          <p className="eyebrow"><FileText size={16} aria-hidden="true" /> Terms of use</p>
          <h1 className="content-title">Rules for using the site and its study room.</h1>
          <p className="content-lead">Last updated {updated}. By using IdoréStudy, you agree to these terms.</p>
        </div>
      </header>

      <div className="article-wrap" style={{ paddingTop: 18 }}>
        <div className="article-body">
          <section>
            <h2>1. The service</h2>
            <p>
              IdoréStudy provides original study articles, a browser-based session planner, a configurable
              focus timer, a local to-do list, and an optional study room that can load third-party video and
              audio embeds. The service is offered without account registration and may be changed, suspended,
              or discontinued.
            </p>
          </section>

          <section>
            <h2>2. Eligibility</h2>
            <p>
              You must be legally able to agree to these terms. If you are below the age at which you can enter
              a binding agreement where you live, use the site only with permission and supervision from a parent
              or legal guardian. The site is not directed to children under 13.
            </p>
          </section>

          <section>
            <h2>3. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the site for unlawful, fraudulent, abusive, or harmful activity.</li>
              <li>Interfere with security, availability, access controls, advertising systems, or other technical protections.</li>
              <li>Send malware, automated requests that unreasonably burden the service, or attempts to gain unauthorized access.</li>
              <li>Misrepresent affiliation with IdoréStudy, an artist, a label, or any other organization.</li>
              <li>Copy and republish original IdoréStudy articles at scale without written permission, except as allowed by law.</li>
              <li>Encourage invalid ad traffic, click advertisements on the publisher’s behalf, or manipulate ad impressions or clicks.</li>
            </ul>
          </section>

          <section>
            <h2>4. Original content and limited permission</h2>
            <p>
              The site design, original articles, prompts, explanatory text, and custom software are owned by the
              publisher or used with permission. You may use the site for personal, nonexclusive, revocable study
              purposes. You may quote short portions with attribution where permitted by law, but may not sell,
              mirror, scrape for republication, or remove notices from the original content.
            </p>
          </section>

          <section>
            <h2>5. Third-party media and services</h2>
            <p>
              YouTube videos and audio are streamed from the original platform. IdoréStudy does not host those
              media files, grant rights to them, guarantee that they are authorized in every jurisdiction, or
              control whether they remain available. Use of an embed is also subject to the platform’s terms and
              the rights of the uploader and other rights holders.
            </p>
            <p>
              External links and research citations lead to third-party services. IdoréStudy is not responsible
              for their availability, security, accuracy, transactions, or privacy practices. Report a media or
              rights concern through the content and takedown policy.
            </p>
          </section>

          <section>
            <h2>6. No affiliation or endorsement</h2>
            <p>
              IdoréStudy is an independent fan-made productivity project. It is not sponsored, endorsed by, or
              affiliated with any artist, group, label, agency, streaming platform, or entertainment company.
              Names are used descriptively to help visitors identify optional embedded media.
            </p>
          </section>

          <section>
            <h2>7. Advertising</h2>
            <p>
              The publisher may support original informational pages with clearly labeled advertising supplied
              by Google AdSense or another network. Advertisers do not control the site’s editorial conclusions
              merely because an ad is displayed. Advertising may be personalized or non-personalized depending
              on consent, region, settings, and provider rules.
            </p>
            <p>
              The immersive study room is designed to remain free of display ads. Never click an ad to support
              the publisher; click only when you are genuinely interested in the advertiser’s offer.
            </p>
          </section>

          <section>
            <h2>8. Educational information, not professional advice</h2>
            <p>
              Study guides provide general educational information and practical suggestions. They are not a
              substitute for individualized medical, psychological, disability, legal, financial, or academic
              advice. Learning needs vary, and no method is guaranteed to produce a particular grade or result.
            </p>
          </section>

          <section>
            <h2>9. Availability and warranties</h2>
            <p>
              To the maximum extent permitted by law, the site is provided “as is” and “as available.” The
              publisher does not promise uninterrupted access, error-free code, permanent media availability,
              complete accuracy, compatibility with every device, or a specific outcome. Some jurisdictions do
              not allow certain warranty exclusions, so those exclusions may not apply to you.
            </p>
          </section>

          <section>
            <h2>10. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, the publisher will not be liable for indirect, incidental,
              special, consequential, exemplary, or punitive loss arising from use of or inability to use the
              service, loss of locally stored tasks, third-party media, external sites, or advertisements. Nothing
              in these terms excludes liability that cannot legally be excluded.
            </p>
          </section>

          <section>
            <h2>11. Indemnity</h2>
            <p>
              Where permitted by law, you agree to defend and hold the publisher harmless from third-party claims
              caused by your unlawful use of the site, infringement of another person’s rights, or material
              violation of these terms. This does not apply where prohibited by consumer law.
            </p>
          </section>

          <section>
            <h2>12. Changes and termination</h2>
            <p>
              The publisher may update the service or these terms. Material changes will be reflected by the date
              above. Continued use after an update means you accept the revised terms to the extent permitted by
              law. Access may be limited for abuse, security risks, legal requirements, or operational reasons.
            </p>
          </section>

          <section>
            <h2>13. General terms</h2>
            <p>
              If part of these terms is unenforceable, the remaining parts continue to apply. A failure to enforce
              a term is not a waiver. These terms, together with the privacy and content policies, form the
              agreement about use of the site. Mandatory consumer rights in your location remain unaffected.
            </p>
          </section>

          <section>
            <h2>14. Contact</h2>
            <div className="contact-method">
              <Mail size={21} aria-hidden="true" />
              <div><strong>Questions about these terms</strong><br /><a href={`mailto:${email}`}>{email}</a></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
