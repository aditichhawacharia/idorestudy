import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const measurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();
const analyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === 'true' && /^G-[A-Z0-9]+$/i.test(measurementId);

function ensureGoogleTag() {
  if (!analyticsEnabled || typeof document === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };

  if (!document.getElementById('google-analytics-script')) {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    });

    const script = document.createElement('script');
    script.id = 'google-analytics-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false,
      anonymize_ip: true,
    });
  }
}

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    ensureGoogleTag();
  }, []);

  useEffect(() => {
    if (!analyticsEnabled || !window.gtag) return;
    window.gtag('event', 'page_view', {
      page_path: `${location.pathname}${location.search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
}
