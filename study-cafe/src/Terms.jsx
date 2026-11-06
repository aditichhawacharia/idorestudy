import React from 'react';
import { FileText, Heart, Sparkles } from 'lucide-react';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
`;

const SectionTitle = ({ children }) => (
  <h2 style={{
    fontFamily: "'Playfair Display', serif",
    fontWeight: 900,
    fontSize: '22px',
    background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '14px',
    marginTop: '40px',
  }}>{children}</h2>
);

const Body = ({ children }) => (
  <p style={{
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '16px',
    color: '#555',
    lineHeight: 1.9,
    marginBottom: '14px',
  }}>{children}</p>
);

const Ul = ({ items }) => (
  <ul style={{ marginBottom: '14px', paddingLeft: '0', listStyle: 'none' }}>
    {items.map((item, i) => (
      <li key={i} style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '16px',
        color: '#555',
        lineHeight: 1.9,
        display: 'flex',
        gap: '10px',
        marginBottom: '6px',
      }}>
        <span style={{ color: '#FF6B9D', flexShrink: 0 }}>♡</span>
        {item}
      </li>
    ))}
  </ul>
);

export default function Terms() {
  const lastUpdated = 'June 2025';

  return (
    <>
      <style>{fontStyle}</style>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF5F7 0%, #FFF9FB 25%, #F5F3FF 50%, #FFF0F5 75%, #FFF5F7 100%)',
        paddingBottom: '80px',
      }}>
        {/* Hero */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '72px 32px 40px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
            <FileText style={{ width: 32, height: 32, color: '#FF6B9D' }} />
            <Heart style={{ width: 28, height: 28, color: '#C86DD7' }} />
            <Sparkles style={{ width: 28, height: 28, color: '#9B7EDB' }} />
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: 'clamp(32px, 5vw, 50px)',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '14px',
          }}>
            Terms of Service ✨
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '17px',
            color: '#B8A0CC',
          }}>
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '48px',
          background: 'white',
          borderRadius: '32px',
          border: '3px solid #FFD7E5',
          boxShadow: '0 16px 64px rgba(255,107,157,0.10)',
        }}>

          <Body>
            Welcome to IdoréStudy! These Terms of Service ("Terms") govern your use of our website at idorestudy.com (the "Site") and all related services. By accessing or using the Site, you agree to be bound by these Terms.
          </Body>

          <SectionTitle>1. Acceptance of Terms</SectionTitle>
          <Body>
            By using IdoréStudy, you confirm that you are at least 13 years of age, have read and understood these Terms, and agree to be bound by them. If you do not agree to these Terms, please discontinue using the Site.
          </Body>

          <SectionTitle>2. Description of Service</SectionTitle>
          <Body>
            IdoréStudy is a free, web-based study companion application that provides virtual study sessions featuring K-pop idol video backgrounds, built-in Pomodoro timers, ambient music from curated YouTube playlists, and productivity tools such as to-do lists.
          </Body>
          <Body>The service is provided free of charge and does not require account registration.</Body>

          <SectionTitle>3. Third-Party Content and Intellectual Property</SectionTitle>
          <Body>
            IdoréStudy embeds video and audio content from third-party platforms, primarily YouTube. All embedded videos are streamed directly from their original platforms and subject to those platforms' terms of service.
          </Body>
          <Ul items={[
            'We do not host, store, upload, or claim ownership of any K-pop music, videos, or artist imagery displayed on the Site.',
            'All artist names, group names, logos, and related imagery are the property of their respective entertainment companies (e.g., HYBE, YG Entertainment, SM Entertainment, JYP Entertainment, Starship Entertainment, and others).',
            'All music is embedded from YouTube and remains subject to YouTube\'s terms and the applicable content licensing agreements.',
            'IdoréStudy is a fan-made, non-commercial project with no affiliation with any K-pop artist, group, or entertainment company.',
          ]} />

          <SectionTitle>4. Acceptable Use</SectionTitle>
          <Body>You agree not to:</Body>
          <Ul items={[
            'Use the Site for any unlawful purpose or in violation of any applicable laws or regulations.',
            'Attempt to circumvent, disable, or interfere with the Site\'s technical systems or security features.',
            'Scrape, copy, or redistribute any content from the Site without our prior written permission.',
            'Use the Site in any way that could damage, overburden, or impair its operation.',
            'Represent yourself as affiliated with IdoréStudy, its creators, or any K-pop artist or entertainment company.',
          ]} />

          <SectionTitle>5. Advertising</SectionTitle>
          <Body>
            The Site may display advertisements served by Google AdSense and other third-party advertising networks. These ads are governed by the respective advertiser's terms and policies. We are not responsible for the content of third-party advertisements.
          </Body>
          <Body>
            By using the Site, you acknowledge and consent to the display of advertisements, including personalized advertisements based on cookies and browsing history, as described in our Privacy Policy.
          </Body>

          <SectionTitle>6. Disclaimer of Warranties</SectionTitle>
          <Body>
            The Site is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. We make no warranties regarding the accuracy, reliability, or completeness of any content on the Site.
          </Body>
          <Body>
            Video availability and music playlists depend on third-party platforms (YouTube) and may change without notice. We are not responsible for the unavailability or removal of any embedded content.
          </Body>

          <SectionTitle>7. Limitation of Liability</SectionTitle>
          <Body>
            To the fullest extent permitted by law, IdoréStudy and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Site, even if advised of the possibility of such damages.
          </Body>

          <SectionTitle>8. Indemnification</SectionTitle>
          <Body>
            You agree to indemnify and hold harmless IdoréStudy and its creators from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Site or your violation of these Terms.
          </Body>

          <SectionTitle>9. Links to Third-Party Sites</SectionTitle>
          <Body>
            The Site may contain links to third-party websites, including YouTube, social media platforms, and affiliate links. We are not responsible for the content or privacy practices of those sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.
          </Body>

          <SectionTitle>10. Changes to Terms</SectionTitle>
          <Body>
            We reserve the right to modify these Terms at any time. We will update the "Last updated" date at the top of this page when changes are made. Continued use of the Site after changes are posted constitutes your acceptance of the revised Terms.
          </Body>

          <SectionTitle>11. Governing Law</SectionTitle>
          <Body>
            These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising from these Terms or your use of the Site shall be resolved through good-faith negotiation, and if unsuccessful, through applicable legal processes.
          </Body>

          <SectionTitle>12. Contact</SectionTitle>
          <Body>
            For questions about these Terms, please contact us:
          </Body>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,107,157,0.06), rgba(200,109,215,0.06))',
            border: '2px solid #FFD7E5',
            borderRadius: '16px',
            padding: '20px 24px',
            marginTop: '8px',
          }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '15px', color: '#444', marginBottom: '4px' }}>
              IdoréStudy
            </p>
            <a
              href="mailto:idore.collections@gmail.com"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#FF6B9D', textDecoration: 'none' }}
            >
              idore.collections@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}