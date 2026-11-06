import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, Sparkles, Heart, Menu, X } from 'lucide-react';

const navFontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
`;

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: 'Study ☕' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy', label: 'Privacy' },
    { to: '/terms', label: 'Terms' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{navFontStyle}</style>
      <nav style={{
        width: '100%',
        background: 'linear-gradient(135deg, rgba(255,245,247,0.98), rgba(245,243,255,0.98))',
        borderBottom: '3px solid #FFB6D9',
        boxShadow: '0 4px 24px rgba(255,107,157,0.12)',
        position: 'sticky',
        top: 0,
        zIndex: 9000,
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <Coffee style={{ width: 26, height: 26, color: '#FF6B9D' }} />
              <Sparkles style={{ width: 12, height: 12, color: '#C86DD7', position: 'absolute', top: '-4px', right: '-4px' }} />
            </div>
            <div>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontStyle: 'italic',
                fontSize: '20px',
                background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>IdoréStudy ♡</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="desktop-nav">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  textDecoration: 'none',
                  padding: '8px 18px',
                  borderRadius: '999px',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  transition: 'all 0.2s',
                  ...(isActive(link.to)
                    ? {
                        background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
                        color: 'white',
                        boxShadow: '0 4px 16px rgba(255,107,157,0.35)',
                      }
                    : {
                        color: '#9B7EDB',
                        background: 'transparent',
                      }),
                }}
                onMouseEnter={e => {
                  if (!isActive(link.to)) {
                    e.currentTarget.style.background = 'rgba(255,107,157,0.08)';
                    e.currentTarget.style.color = '#FF6B9D';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive(link.to)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#9B7EDB';
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}
            className="mobile-toggle"
          >
            {mobileOpen
              ? <X style={{ width: 24, height: 24, color: '#FF6B9D' }} />
              : <Menu style={{ width: 24, height: 24, color: '#FF6B9D' }} />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{
            padding: '16px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            borderTop: '2px solid #FFD7E5',
          }}>
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  textDecoration: 'none',
                  padding: '12px 20px',
                  borderRadius: '16px',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: '15px',
                  ...(isActive(link.to)
                    ? {
                        background: 'linear-gradient(135deg, #FF6B9D, #C86DD7)',
                        color: 'white',
                      }
                    : {
                        color: '#9B7EDB',
                        background: 'rgba(255,107,157,0.06)',
                      }),
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}