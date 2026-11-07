import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const KEY = 'idorestudy_cookie_choice_v1';

function updateConsent(granted) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const choice = localStorage.getItem(KEY);

      if (!choice) {
        setVisible(true);
        return;
      }

      updateConsent(choice === 'accept');
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (choice) => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      // Consent can still be applied for the current session
      // even if localStorage is unavailable.
    }

    updateConsent(choice === 'accept');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        .idore-cookie-wrap {
          position: fixed;
          left: 24px;
          bottom: 24px;
          z-index: 99999;
          width: min(440px, calc(100vw - 48px));
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .idore-cookie-card {
          position: relative;
          background: rgba(255, 255, 255, 0.97);
          border: 1px solid #eadfe5;
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 22px 65px rgba(68, 45, 57, 0.16);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .idore-cookie-top {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          padding-right: 24px;
        }

        .idore-cookie-icon {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          border-radius: 11px;
          display: grid;
          place-items: center;
          background: #fbecf3;
          color: #c15888;
        }

        .idore-cookie-title {
          margin: 0 0 6px;
          color: #332d33;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 18px;
          line-height: 1.25;
          font-weight: 600;
        }

        .idore-cookie-copy {
          margin: 0;
          color: #756d74;
          font-size: 12px;
          line-height: 1.7;
        }

        .idore-cookie-link {
          display: inline-block;
          margin-top: 9px;
          color: #b34f7c;
          text-decoration: none;
          font-size: 11px;
          font-weight: 600;
        }

        .idore-cookie-link:hover {
          text-decoration: underline;
        }

        .idore-cookie-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
        }

        .idore-cookie-button {
          min-height: 42px;
          border-radius: 10px;
          padding: 0 15px;
          border: 0;
          font-family: inherit;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition:
            transform 150ms ease,
            background 150ms ease,
            border-color 150ms ease;
        }

        .idore-cookie-button:hover {
          transform: translateY(-1px);
        }

        .idore-cookie-reject {
          flex: 1;
          background: #ffffff;
          border: 1px solid #e6dce2;
          color: #655e64;
        }

        .idore-cookie-reject:hover {
          background: #faf6f8;
          border-color: #dbcbd3;
        }

        .idore-cookie-accept {
          flex: 1;
          background: #352f36;
          color: #ffffff;
        }

        .idore-cookie-accept:hover {
          background: #4a4149;
        }

        .idore-cookie-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #9d949a;
          cursor: pointer;
        }

        .idore-cookie-close:hover {
          background: #f8f1f4;
          color: #6b6268;
        }

        @media (max-width: 560px) {
          .idore-cookie-wrap {
            left: 12px;
            right: 12px;
            bottom: 12px;
            width: auto;
          }

          .idore-cookie-card {
            padding: 17px;
            border-radius: 16px;
          }

          .idore-cookie-actions {
            flex-direction: column-reverse;
          }

          .idore-cookie-button {
            width: 100%;
          }
        }
      `}</style>

      <aside
        className="idore-cookie-wrap"
        aria-label="Cookie preferences"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-consent-title"
      >
        <div className="idore-cookie-card">
          <button
            type="button"
            className="idore-cookie-close"
            onClick={() => choose('reject')}
            aria-label="Close and reject optional cookies"
          >
            <X size={15} />
          </button>

          <div className="idore-cookie-top">
            <div className="idore-cookie-icon">
              <Cookie size={18} strokeWidth={1.8} />
            </div>

            <div>
              <h2
                id="cookie-consent-title"
                className="idore-cookie-title"
              >
                Your privacy choices
              </h2>

              <p className="idore-cookie-copy">
                IdoréStudy uses necessary browser storage to keep
                features working. With your permission, analytics and
                advertising cookies may also be used to understand site
                usage and support the site.
              </p>

              <Link
                to="/privacy"
                className="idore-cookie-link"
              >
                Read our Privacy Policy
              </Link>
            </div>
          </div>

          <div className="idore-cookie-actions">
            <button
              type="button"
              className="idore-cookie-button idore-cookie-reject"
              onClick={() => choose('reject')}
            >
              Reject optional
            </button>

            <button
              type="button"
              className="idore-cookie-button idore-cookie-accept"
              onClick={() => choose('accept')}
            >
              Accept optional
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}