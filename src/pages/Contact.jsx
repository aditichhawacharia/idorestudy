import { AlertCircle, Mail, MessageSquareText, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import Seo from '../components/Seo.jsx';
import { CONTACT_EMAIL, SITE_URL } from '../config/site.js';

const address = CONTACT_EMAIL;

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General question');
  const [message, setMessage] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const mailSubject = encodeURIComponent(`[IdoréStudy] ${subject}${name.trim() ? ` — ${name.trim()}` : ''}`);
    const body = encodeURIComponent([
      `Name: ${name.trim() || 'Not provided'}`,
      `Reply email: ${email.trim()}`,
      '',
      message.trim(),
    ].join('\n'));
    window.location.href = `mailto:${address}?subject=${mailSubject}&body=${body}`;
  };

  return (
    <>
      <Seo
        title="Contact IdoréStudy"
        description="Contact IdoréStudy with questions, bug reports, accessibility feedback, partnership inquiries, or content and copyright concerns."
        path="/contact"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact IdoréStudy',
          url: `${SITE_URL}/contact`,
        }}
      />

      <header className="content-hero">
        <div className="narrow-wrap">
          <p className="eyebrow"><MessageSquareText size={16} aria-hidden="true" /> Contact the publisher</p>
          <h1 className="content-title">Questions, corrections, bugs, and content concerns are welcome.</h1>
          <p className="content-lead">
            The form opens your own email app with the message filled in. Nothing is silently submitted to an
            IdoréStudy server from this page.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="page-wrap contact-grid">
          <div className="content-card" style={{ padding: 'clamp(24px, 5vw, 42px)' }}>
            <h2 style={{ marginTop: 0, fontFamily: 'Georgia, serif' }}>Send an email</h2>
            <form className="form-grid" onSubmit={submit}>
              <div className="inline-fields">
                <div className="field">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" maxLength={80} />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Reply email</label>
                  <input id="contact-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" maxLength={160} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="contact-subject">Topic</label>
                <select id="contact-subject" value={subject} onChange={(event) => setSubject(event.target.value)}>
                  <option>General question</option>
                  <option>Bug report</option>
                  <option>Accessibility feedback</option>
                  <option>Editorial correction</option>
                  <option>Content or copyright concern</option>
                  <option>Privacy request</option>
                  <option>Partnership inquiry</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" required minLength={10} maxLength={4000} value={message} onChange={(event) => setMessage(event.target.value)} />
              </div>
              <button className="primary-button" type="submit"><Mail size={17} aria-hidden="true" /> Open email app</button>
            </form>
          </div>

          <aside className="content-stack">
            <div className="contact-method">
              <Mail size={22} aria-hidden="true" />
              <div><strong>Direct email</strong><br /><a href={`mailto:${address}`}>{address}</a></div>
            </div>
            <div className="contact-method">
              <ShieldAlert size={22} aria-hidden="true" />
              <div><strong>Content concern</strong><br /><span>Include the page URL, media title, reason for the request, and a reliable way to contact you.</span></div>
            </div>
            <div className="contact-method">
              <AlertCircle size={22} aria-hidden="true" />
              <div><strong>Bug report</strong><br /><span>Include your browser, device, the steps that caused the issue, and what you expected to happen.</span></div>
            </div>
            <p className="note">
              Do not send passwords, government identifiers, payment-card details, medical records, or other
              highly sensitive information. IdoréStudy does not provide account or payment support because it
              does not offer user accounts or direct purchases.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
