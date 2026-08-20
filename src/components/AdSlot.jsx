import { useEffect, useRef } from 'react';
import { adsenseClient, adsenseEnabled, loadAdSenseScript } from '../lib/adsense.js';

export default function AdSlot({ slot, format = 'auto', className = '' }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!adsenseEnabled || !slot || initialized.current) return undefined;
    initialized.current = true;
    let active = true;

    loadAdSenseScript()
      .then(() => {
        if (!active) return;
        try {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
        } catch (error) {
          console.warn('AdSense slot could not initialize.', error);
        }
      })
      .catch((error) => console.warn('AdSense script could not initialize.', error));

    return () => {
      active = false;
      initialized.current = false;
    };
  }, [slot]);

  if (!adsenseEnabled || !slot) return null;

  return (
    <aside className={`ad-shell ${className}`.trim()} aria-label="Advertisement">
      <span className="ad-label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
