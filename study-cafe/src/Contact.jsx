import React, { useState } from 'react';
import { Heart, Sparkles, Mail, MessageCircle, Coffee } from 'lucide-react';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
`;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('General');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens mailto with prefilled content
    const body = encodeURIComponent(`Name: ${name}\n\n${message}`);
    const sub = encodeURIComponent(`[IdoréStudy] ${subject} — from ${name}`);
    window.location.href = `mailto:idore.collections@gmail.com?subject=${sub}&body=${body}`;
    setSubmitted(true);
  };

  const subjects = ['General', 'Bug Report', 'Feature Request', 'Content Issue', 'Partnership', 'Other'];

  return (
    <>
      <style>{fontStyle}</style>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF5F7 0%, #FFF9FB 25%, #F5F3FF 50%, #FFF0F5 75%, #FFF5F7 100%)',
        paddingBottom: '80px',
      }}>
        {/* Hero */}
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '72px 32px 48px',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
            <Mail style={{ width: 28, height: 28, color: '#FF6B9D' }} />
            <Heart style={{ width: 28, height: 28, color: '#C86DD7' }} />
            <MessageCircle style={{ width: 28, height: 28, color: '#FF6B9D' }} />
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: 'clamp(36px, 6vw, 54px)',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
          }}>
            Get in Touch ✨
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '20px',
            color: '#9B7EDB',
            fontWeight: 300,
            lineHeight: 1.7,
          }}>
            Questions, suggestions, bug reports, or just want to say hi? We'd love to hear from you~
          </p>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 32px' }}>
          {/* Direct email card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,107,157,0.08), rgba(200,109,215,0.08))',
            border: '3px solid #FFD7E5',
            borderRadius: '28px',
            padding: '32px 40px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: '16px',
              background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Mail style={{ width: 24, height: 24, color: 'white' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: '16px',
                color: '#444',
                marginBottom: '4px',
              }}>Email us directly</p>
              <a
                href="mailto:idore.collections@gmail.com"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '18px',
                  color: '#FF6B9D',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#C86DD7'}
                onMouseLeave={e => e.currentTarget.style.color = '#FF6B9D'}
              >
                idore.collections@gmail.com
              </a>
            </div>
          </div>

          {/* Contact form */}
          {!submitted ? (
            <div style={{
              background: 'white',
              border: '3px solid #FFD7E5',
              borderRadius: '32px',
              padding: '48px',
              boxShadow: '0 16px 64px rgba(255,107,157,0.12)',
            }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: '24px',
                background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <Coffee style={{ width: 22, height: 22, color: '#FF6B9D' }} />
                Send us a message 💌
              </h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Name */}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: '13px',
                    color: '#FF6B9D',
                    marginBottom: '8px',
                    letterSpacing: '0.05em',
                  }}>YOUR NAME ✨</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Soomin ☕"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '14px',
                      border: '2px solid #FFD7E5',
                      outline: 'none',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '16px',
                      color: '#444',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#FF6B9D'}
                    onBlur={e => e.target.style.borderColor = '#FFD7E5'}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: '13px',
                    color: '#C86DD7',
                    marginBottom: '8px',
                    letterSpacing: '0.05em',
                  }}>YOUR EMAIL 💌</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '14px',
                      border: '2px solid #FFD7E5',
                      outline: 'none',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '16px',
                      color: '#444',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#C86DD7'}
                    onBlur={e => e.target.style.borderColor = '#FFD7E5'}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: '13px',
                    color: '#9B7EDB',
                    marginBottom: '8px',
                    letterSpacing: '0.05em',
                  }}>SUBJECT 📝</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {subjects.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSubject(s)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '999px',
                          border: `2px solid ${subject === s ? '#FF6B9D' : '#FFD7E5'}`,
                          background: subject === s ? 'linear-gradient(135deg, rgba(255,107,157,0.12), rgba(200,109,215,0.12))' : 'white',
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          fontSize: '12px',
                          color: subject === s ? '#FF6B9D' : '#999',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >{s}</button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: '13px',
                    color: '#FF6B9D',
                    marginBottom: '8px',
                    letterSpacing: '0.05em',
                  }}>MESSAGE 💬</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind~ 🌸"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '14px',
                      border: '2px solid #FFD7E5',
                      outline: 'none',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '16px',
                      color: '#444',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      lineHeight: 1.7,
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#FF6B9D'}
                    onBlur={e => e.target.style.borderColor = '#FFD7E5'}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '18px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
                    border: 'none',
                    color: 'white',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontSize: '17px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 28px rgba(255,107,157,0.4)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(255,107,157,0.55)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,107,157,0.4)'; }}
                >
                  <Heart style={{ width: 18, height: 18, fill: 'white' }} />
                  Send Message 💌
                </button>
              </form>
            </div>
          ) : (
            <div style={{
              background: 'white',
              border: '3px solid #FFD7E5',
              borderRadius: '32px',
              padding: '64px 48px',
              textAlign: 'center',
              boxShadow: '0 16px 64px rgba(255,107,157,0.12)',
            }}>
              <div style={{ fontSize: '72px', marginBottom: '20px' }}>💌</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: '28px',
                background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '12px',
              }}>Message sent! ✨</h2>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: '18px',
                color: '#9B7EDB',
                lineHeight: 1.7,
              }}>
                Your email client should have opened. If not, reach us directly at idore.collections@gmail.com 🌸
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  marginTop: '28px',
                  padding: '14px 32px',
                  borderRadius: '999px',
                  border: '2px solid #FFD7E5',
                  background: 'white',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#C86DD7',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B9D'; e.currentTarget.style.color = '#FF6B9D'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#FFD7E5'; e.currentTarget.style.color = '#C86DD7'; }}
              >
                Send another message
              </button>
            </div>
          )}

          {/* Response time note */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '14px',
            color: '#C4A8D4',
            textAlign: 'center',
            marginTop: '24px',
          }}>
            We typically respond within 2–5 business days 🌸
          </p>
        </div>
      </div>
    </>
  );
}