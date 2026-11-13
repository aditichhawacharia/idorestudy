import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Coffee,
  Heart,
  Menu,
  Shield,
  Sparkles,
  X,
} from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&display=swap');

  * {
    box-sizing: border-box;
  }

  .idore-navbar {
    width: 100%;
    height: 72px;
    background: rgba(255, 252, 253, 0.94);
    border-bottom: 1px solid #eee4e9;
    position: sticky;
    top: 0;
    z-index: 9000;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    font-family: 'DM Sans', sans-serif;
  }

  .idore-nav-inner {
    width: min(1280px, calc(100% - 48px));
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 38px;
  }

  /* =========================
     HOMEPAGE-STYLE LOGO
     ========================= */

  .idore-logo {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
  }

  .idore-logo-mark {
    position: relative;
    width: 33px;
    height: 33px;
    display: grid;
    place-items: center;
  }

  .idore-logo-coffee {
    color: #ff659c;
  }

  .idore-logo-sparkle {
    position: absolute;
    top: 0;
    right: 0;
    color: #b96bd0;
  }

  .idore-logo-text {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 21px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.035em;

    background: linear-gradient(
      120deg,
      #ff5f9c 0%,
      #e85ca7 36%,
      #c168d4 72%,
      #9b72df 100%
    );

    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .idore-logo-heart {
    font-family: 'Playfair Display', serif;
    font-style: normal;
    font-size: 18px;

    background: linear-gradient(
      120deg,
      #ff5f9c,
      #bd68d5
    );

    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* =========================
     DESKTOP NAV
     ========================= */

  .idore-desktop-links {
    display: flex;
    align-items: center;
    gap: 3px;
    flex: 1;
    min-width: 0;
  }

  .idore-nav-link,
  .idore-more-button {
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    gap: 5px;

    padding: 0 12px;

    border: 0;
    background: transparent;
    text-decoration: none;

    color: #716970;

    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;

    border-radius: 9px;
    cursor: pointer;

    transition:
      background 150ms ease,
      color 150ms ease;
  }

  .idore-nav-link:hover,
  .idore-more-button:hover {
    background: #fbf1f5;
    color: #b74e7f;
  }

  .idore-nav-link.active {
    color: #b84f80;
    font-weight: 600;
  }

  /* =========================
     MORE DROPDOWN
     ========================= */

  .idore-more-wrap {
    position: relative;
  }

  .idore-more-menu {
    position: absolute;

    top: calc(100% + 10px);
    right: 0;

    width: 215px;

    background: #fff;
    border: 1px solid #e9e0e5;
    border-radius: 14px;

    padding: 7px;

    box-shadow: 0 16px 45px rgba(62, 42, 53, 0.11);
  }

  .idore-more-menu::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 0;
    right: 0;
    height: 12px;
  }

  .idore-dropdown-link {
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 11px 10px;

    border-radius: 9px;

    text-decoration: none;
    color: #625b62;

    font-size: 13px;
    font-weight: 500;

    transition:
      background 150ms ease,
      color 150ms ease;
  }

  .idore-dropdown-link:hover,
  .idore-dropdown-link.active {
    background: #faf2f6;
    color: #ad4d79;
  }

  .idore-dropdown-link.active {
    font-weight: 600;
  }

  .idore-dropdown-icon {
    width: 30px;
    height: 30px;

    display: grid;
    place-items: center;

    border-radius: 8px;

    background: #fbf1f6;
    color: #be5886;

    flex-shrink: 0;
  }

  /* =========================
     CTA
     ========================= */

  .idore-start-button {
    flex-shrink: 0;

    min-height: 42px;

    padding: 0 18px;

    border-radius: 11px;

    display: inline-flex;
    align-items: center;
    gap: 8px;

    background: linear-gradient(
      120deg,
      #ee5e9f 0%,
      #bd66d7 100%
    );

    color: white;
    text-decoration: none;

    font-size: 13px;
    font-weight: 600;

    box-shadow: 0 7px 18px rgba(205, 91, 157, 0.20);

    transition:
      transform 150ms ease,
      box-shadow 150ms ease;
  }

  .idore-start-button:hover {
    transform: translateY(-1px);

    box-shadow:
      0 10px 24px rgba(205, 91, 157, 0.27);
  }

  /* =========================
     MOBILE
     ========================= */

  .idore-mobile-toggle {
    display: none;

    margin-left: auto;

    border: 0;
    background: transparent;

    width: 42px;
    height: 42px;

    border-radius: 10px;

    cursor: pointer;

    align-items: center;
    justify-content: center;

    color: #4f4850;
  }

  .idore-mobile-toggle:hover {
    background: #f8eff3;
  }

  .idore-mobile-menu {
    display: none;
  }

  @media (max-width: 1000px) {
    .idore-nav-inner {
      gap: 24px;
    }

    .idore-nav-link,
    .idore-more-button {
      padding-left: 8px;
      padding-right: 8px;
      font-size: 12px;
    }
  }

  @media (max-width: 850px) {
    .idore-navbar {
      height: 66px;
    }

    .idore-nav-inner {
      width: min(100% - 32px, 1280px);
    }

    .idore-desktop-links,
    .idore-start-button {
      display: none;
    }

    .idore-mobile-toggle {
      display: flex;
    }

    .idore-mobile-menu {
      display: block;

      position: absolute;

      top: 66px;
      left: 0;
      right: 0;

      background: rgba(255, 252, 253, 0.99);

      border-bottom: 1px solid #eadfe5;

      padding: 12px 16px 20px;

      box-shadow:
        0 18px 36px rgba(55, 39, 47, 0.08);

      backdrop-filter: blur(18px);
    }

    .idore-mobile-link {
      display: flex;
      align-items: center;
      justify-content: space-between;

      min-height: 48px;

      padding: 0 12px;

      border-radius: 10px;

      text-decoration: none;

      color: #5f585f;

      font-size: 14px;
      font-weight: 500;
    }

    .idore-mobile-link:hover,
    .idore-mobile-link.active {
      background: #faf1f5;
      color: #ac4f79;
    }

    .idore-mobile-separator {
      height: 1px;
      background: #eee4e9;
      margin: 9px 4px;
    }

    .idore-mobile-label {
      padding: 7px 12px 5px;

      color: #aaa0a6;

      font-size: 10px;
      font-weight: 700;

      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .idore-mobile-start {
      margin-top: 12px;

      min-height: 48px;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      border-radius: 10px;

      background: linear-gradient(
        120deg,
        #ee5e9f,
        #bd66d7
      );

      color: white;
      text-decoration: none;

      font-size: 14px;
      font-weight: 600;
    }
  }

  @media (max-width: 400px) {
    .idore-logo-text {
      font-size: 19px;
    }
  }
`;

const mainLinks = [
  { to: '/', label: 'Study' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const legalLinks = [
  {
    to: '/privacy',
    label: 'Privacy Policy',
    description: 'How information is handled',
    icon: Shield,
  },
  {
    to: '/terms',
    label: 'Terms of Service',
    description: 'Rules for using IdoréStudy',
    icon: Coffee,
  },
];

export default function Navbar() {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const moreRef = useRef(null);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const legalActive =
    isActive('/privacy') ||
    isActive('/terms');

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(event.target)
      ) {
        setMoreOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMoreOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleOutsideClick
    );

    document.addEventListener(
      'keydown',
      handleEscape
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      );

      document.removeEventListener(
        'keydown',
        handleEscape
      );
    };
  }, []);

  return (
    <>
      <style>{styles}</style>

      <nav
        className="idore-navbar"
        aria-label="Main navigation"
      >
        <div className="idore-nav-inner">

          {/* LOGO */}
          <Link
            to="/"
            className="idore-logo"
            aria-label="IdoréStudy home"
          >
            <div className="idore-logo-mark">
              <Coffee
                className="idore-logo-coffee"
                size={23}
                strokeWidth={1.7}
              />

              <Sparkles
                className="idore-logo-sparkle"
                size={11}
                strokeWidth={1.9}
              />
            </div>

            <span className="idore-logo-text">
              IdoréStudy
            </span>

            <span className="idore-logo-heart">
              ♡
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="idore-desktop-links">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`idore-nav-link ${
                  isActive(link.to)
                    ? 'active'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* MORE */}
            <div
              className="idore-more-wrap"
              ref={moreRef}
            >
              <button
                type="button"
                className="idore-more-button"
                onClick={() =>
                  setMoreOpen((open) => !open)
                }
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                style={
                  legalActive
                    ? {
                        color: '#b64e7d',
                        fontWeight: 600,
                      }
                    : undefined
                }
              >
                More

                <ChevronDown
                  size={14}
                  strokeWidth={1.8}
                  style={{
                    transform: moreOpen
                      ? 'rotate(180deg)'
                      : 'rotate(0)',
                    transition:
                      'transform 150ms ease',
                  }}
                />
              </button>

              {moreOpen && (
                <div
                  className="idore-more-menu"
                  role="menu"
                >
                  {legalLinks.map(
                    ({
                      to,
                      label,
                      description,
                      icon: Icon,
                    }) => (
                      <Link
                        key={to}
                        to={to}
                        role="menuitem"
                        className={`idore-dropdown-link ${
                          isActive(to)
                            ? 'active'
                            : ''
                        }`}
                      >
                        <span className="idore-dropdown-icon">
                          <Icon
                            size={15}
                            strokeWidth={1.8}
                          />
                        </span>

                        <span>
                          <span
                            style={{
                              display: 'block',
                              marginBottom: 2,
                            }}
                          >
                            {label}
                          </span>

                          <span
                            style={{
                              display: 'block',
                              fontSize: 10,
                              fontWeight: 400,
                              color: '#a49ca2',
                            }}
                          >
                            {description}
                          </span>
                        </span>
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <Link
            to="/"
            className="idore-start-button"
          >
            <Heart
              size={14}
              strokeWidth={1.8}
            />

            Start Studying
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            className="idore-mobile-toggle"
            onClick={() =>
              setMobileOpen((open) => !open)
            }
            aria-label={
              mobileOpen
                ? 'Close navigation'
                : 'Open navigation'
            }
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="idore-mobile-menu">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`idore-mobile-link ${
                  isActive(link.to)
                    ? 'active'
                    : ''
                }`}
              >
                {link.label}

                {isActive(link.to) && (
                  <Heart
                    size={13}
                    strokeWidth={1.8}
                  />
                )}
              </Link>
            ))}

            <div className="idore-mobile-separator" />

            <div className="idore-mobile-label">
              Legal
            </div>

            {legalLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`idore-mobile-link ${
                  isActive(to)
                    ? 'active'
                    : ''
                }`}
              >
                {label}
              </Link>
            ))}

            <Link
              to="/"
              className="idore-mobile-start"
            >
              <Heart
                size={15}
                strokeWidth={1.8}
              />

              Start Studying
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}