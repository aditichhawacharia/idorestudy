import React from 'react';
import { Shield, Heart, Sparkles } from 'lucide-react';

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

export default function PrivacyPolicy() {
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
            <Shield style={{ width: 32, height: 32, color: '#FF6B9D' }} />
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
            Privacy Policy ✨
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
          padding: '0 32px',
          background: 'white',
          borderRadius: '32px',
          border: '3px solid #FFD7E5',
          boxShadow: '0 16px 64px rgba(255,107,157,0.10)',
          padding: '48px',
        }}>

          <Body>
            Welcome to IdoréStudy ("we," "us," or "our"). This Privacy Policy explains how we collect, use, and share information when you use our website located at idorestudy.com (the "Site"). By using the Site, you agree to the practices described in this policy.
          </Body>

          <SectionTitle>1. Information We Collect</SectionTitle>
          <Body>We may collect the following types of information:</Body>
          <Ul items={[
            'Usage Data: Pages visited, time spent on the site, browser type, device information, and IP address, collected automatically via cookies and analytics tools.',
            'Preferences: Timer settings and to-do list items saved locally in your browser\'s localStorage — this data stays on your device and is never sent to our servers.',
            'Communications: If you contact us via email, we receive the information you provide (name, email address, message content).',
          ]} />

          <SectionTitle>2. Cookies and Tracking Technologies</SectionTitle>
          <Body>
            We use cookies and similar tracking technologies to operate and improve the Site. Cookies are small text files stored on your device that help us recognize your browser on return visits.
          </Body>
          <Body>We use cookies for:</Body>
          <Ul items={[
            'Analytics: Understanding how visitors use our site (e.g., Google Analytics).',
            'Advertising: Serving relevant ads through Google AdSense and other third-party advertising partners.',
            'Preferences: Remembering your settings across sessions.',
          ]} />
          <Body>
            You can control or disable cookies through your browser settings. Disabling cookies may affect some site functionality.
          </Body>

          <SectionTitle>3. Google AdSense and Third-Party Advertising</SectionTitle>
          <Body>
            We use Google AdSense to display advertisements on our Site. Google AdSense uses cookies to show ads based on your prior visits to our site and other sites on the internet. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
          </Body>
          <Body>
            You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#FF6B9D' }}>Google Ads Settings</a> or by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: '#FF6B9D' }}>aboutads.info</a>.
          </Body>
          <Body>
            Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites. These third-party ad servers or ad networks use technology to send advertisements and links that appear on IdoréStudy directly to your browser. They automatically receive your IP address when this occurs.
          </Body>

          <SectionTitle>4. Third-Party Services</SectionTitle>
          <Body>Our Site embeds content and services from third parties, including:</Body>
          <Ul items={[
            'YouTube (Google LLC): We embed YouTube videos as study backgrounds and music players. YouTube may set cookies and collect data in accordance with Google\'s Privacy Policy.',
            'Google Analytics: We use Google Analytics to understand how users interact with our Site. Google Analytics collects anonymous data about your visits.',
            'Google Fonts: We use Google Fonts to display custom typography. Google may collect IP address and request data.',
          ]} />
          <Body>
            All videos displayed on IdoréStudy are embedded from YouTube and other third-party platforms. We do not host, claim ownership of, or redistribute any copyrighted content. All artist names, group names, and related imagery remain the property of their respective owners and labels.
          </Body>

          <SectionTitle>5. How We Use Your Information</SectionTitle>
          <Ul items={[
            'To operate and improve the Site.',
            'To analyze usage and understand how users interact with our features.',
            'To display relevant advertisements.',
            'To respond to your communications and support requests.',
            'To comply with legal obligations.',
          ]} />

          <SectionTitle>6. Data Sharing and Disclosure</SectionTitle>
          <Body>We do not sell your personal information. We may share information with:</Body>
          <Ul items={[
            'Service providers: Third parties that help us operate the Site (e.g., analytics, advertising).',
            'Legal authorities: If required by law or to protect our legal rights.',
            'Business transfers: In connection with a merger, acquisition, or sale of our business.',
          ]} />

          <SectionTitle>7. Data Retention and Local Storage</SectionTitle>
          <Body>
            Timer settings and to-do list items are stored in your browser's localStorage on your device only. This data is not transmitted to our servers and can be cleared at any time by clearing your browser data. We retain server-side analytics data for up to 26 months in accordance with standard analytics practices.
          </Body>

          <SectionTitle>8. Children's Privacy</SectionTitle>
          <Body>
            Our Site is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided personal information to us, please contact us and we will delete it promptly.
          </Body>

          <SectionTitle>9. Your Privacy Rights</SectionTitle>
          <Body>Depending on your location, you may have the right to:</Body>
          <Ul items={[
            'Access the personal data we hold about you.',
            'Request correction or deletion of your personal data.',
            'Object to or restrict our processing of your personal data.',
            'Opt out of personalized advertising.',
            'Lodge a complaint with a supervisory authority (for EU/EEA residents).',
          ]} />
          <Body>
            To exercise any of these rights, please contact us at idore.collections@gmail.com.
          </Body>

          <SectionTitle>10. International Visitors</SectionTitle>
          <Body>
            If you are visiting from the European Union, United Kingdom, California, or other regions with privacy regulations, please note that we process your data in accordance with applicable laws. By using our Site, you consent to our collection and use of information as described in this policy.
          </Body>

          <SectionTitle>11. Changes to This Policy</SectionTitle>
          <Body>
            We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. Continued use of the Site after changes constitutes acceptance of the updated policy.
          </Body>

          <SectionTitle>12. Contact Us</SectionTitle>
          <Body>
            If you have any questions about this Privacy Policy, please contact us at:
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