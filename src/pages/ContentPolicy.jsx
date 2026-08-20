import { ExternalLink, Mail, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

const email = 'idore.collections@gmail.com';

export default function ContentPolicy() {
  return (
    <>
      <Seo
        title="Content, Copyright and Takedown Policy"
        description="How IdoréStudy handles original editorial content, optional third-party embeds, attribution, unavailable media, copyright concerns, and takedown requests."
        path="/content-policy"
      />

      <header className="content-hero">
        <div className="narrow-wrap">
          <p className="eyebrow"><ShieldAlert size={16} aria-hidden="true" /> Content and takedown policy</p>
          <h1 className="content-title">Original guidance, optional embeds, and a direct path for concerns.</h1>
          <p className="content-lead">Last updated August 20, 2026.</p>
        </div>
      </header>

      <div className="article-wrap" style={{ paddingTop: 18 }}>
        <div className="article-body">
          <section>
            <h2>1. Original IdoréStudy content</h2>
            <p>
              Study guides, examples, planning prompts, interface copy, and custom software are created for
              IdoréStudy unless a source or third-party service is identified. Research references are linked so
              readers can distinguish a cited principle from IdoréStudy’s own practical examples and editorial
              framing.
            </p>
            <p>
              The site does not publish copied artist biographies, lyrics, song transcripts, news articles, or
              galleries assembled from third-party photos. The study-buddy selector uses original text-and-color
              identity cards rather than hotlinking artist photographs from unrelated publishers.
            </p>
          </section>

          <section>
            <h2>2. Third-party video and audio embeds</h2>
            <p>
              Optional study-room media is embedded from YouTube and streamed by YouTube’s player. IdoréStudy
              does not upload, download, host, or re-encode those videos or audio tracks. The player is loaded only after a visitor selects a study buddy and enters the room.
            </p>
            <p>
              Each room provides a route to the original YouTube watch page. Availability, advertising inside
              the player, geographic restrictions, age restrictions, and removal are controlled by YouTube,
              the uploader, and applicable rights holders.
            </p>
          </section>

          <section>
            <h2>3. Descriptive use and independence</h2>
            <p>
              Artist and group names identify the subject of an optional video choice. IdoréStudy does not claim
              ownership of those names or imply sponsorship. The project is independent and fan-made, with no
              endorsement by an artist, label, agency, or entertainment company.
            </p>
          </section>

          <section>
            <h2>4. When media is unavailable</h2>
            <p>
              An uploader may remove a video, disable embedding, restrict playback, or change availability. In
              that case, visitors should choose another option. IdoréStudy may replace or remove broken entries
              during maintenance but cannot restore content controlled by another platform.
            </p>
          </section>

          <section>
            <h2>5. Reporting a concern</h2>
            <p>
              A rights holder, authorized representative, uploader, publisher, artist representative, or other
              affected person can request review. To help locate and evaluate the concern, include:
            </p>
            <ul>
              <li>Your name and a reliable reply address.</li>
              <li>The exact IdoréStudy page or study-buddy entry involved.</li>
              <li>The original media URL when the concern involves an embed.</li>
              <li>A clear explanation of the right, policy, factual issue, or safety concern.</li>
              <li>Your relationship to the work or affected party and, when applicable, evidence of authority.</li>
              <li>The action requested, such as correction, attribution, replacement, or removal.</li>
            </ul>
            <div className="contact-method">
              <Mail size={21} aria-hidden="true" />
              <div><strong>Content review address</strong><br /><a href={`mailto:${email}?subject=IdoreStudy%20content%20review%20request`}>{email}</a></div>
            </div>
          </section>

          <section>
            <h2>6. Review process</h2>
            <p>
              The publisher may acknowledge the request, ask for missing information, temporarily disable an
              entry, check the original platform, correct site-created text, or remove the reference. The process
              is designed to resolve good-faith concerns efficiently; it is not a substitute for any formal legal
              notice process available under applicable law.
            </p>
            <p>
              Knowingly false or abusive reports may be documented and declined. The publisher may preserve
              limited records needed to demonstrate how a request was handled.
            </p>
          </section>

          <section>
            <h2>7. Editorial corrections</h2>
            <p>
              Factual or accessibility corrections to original IdoréStudy content can be reported through the
              same email address or the <Link to="/contact">contact page</Link>. Include the article URL, the text
              in question, and a source or explanation supporting the correction.
            </p>
          </section>

          <section>
            <h2>8. Platform policies</h2>
            <p>
              YouTube embeds remain subject to YouTube and Google policies. Follow the source link on a room to
              use YouTube’s own reporting tools when the underlying upload itself is the issue. <ExternalLink size={14} aria-hidden="true" />
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
