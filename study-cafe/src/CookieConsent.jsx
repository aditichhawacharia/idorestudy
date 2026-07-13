import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const KEY = 'idorestudy_cookie_choice_v1';

function updateConsent(granted) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied'
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const choice = localStorage.getItem(KEY);
    if (!choice) setVisible(true);
    else updateConsent(choice === 'accept');
  }, []);
  const choose = (choice) => {
    localStorage.setItem(KEY, choice);
    updateConsent(choice === 'accept');
    setVisible(false);
  };
  if (!visible) return null;
  return <aside className="cookie-banner" aria-label="Cookie preferences">
    <div><strong>Your privacy choices</strong><p>We use analytics and, after approval, advertising cookies to understand usage and support this free site. You can accept or continue with nonessential storage denied.</p><Link to="/privacy">Read the privacy policy</Link></div>
    <div className="cookie-actions"><button className="secondary-btn" onClick={() => choose('reject')}>Reject optional cookies</button><button className="primary-btn" onClick={() => choose('accept')}>Accept</button></div>
  </aside>;
}
