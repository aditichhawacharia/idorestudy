export const adsenseEnabled = import.meta.env.VITE_ADSENSE_ENABLED === 'true';
export const adsenseClient = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-8850994665004292';

let scriptPromise;

export function loadAdSenseScript() {
  if (!adsenseEnabled || typeof document === 'undefined') return Promise.resolve(false);
  if (scriptPromise) return scriptPromise;

  const existing = document.getElementById('adsense-script');
  if (existing) {
    if (existing.dataset.loaded === 'true' || window.adsbygoogle) return Promise.resolve(true);
    scriptPromise = new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve(true), { once: true });
      existing.addEventListener('error', () => {
        scriptPromise = undefined;
        reject(new Error('AdSense publisher script failed to load.'));
      }, { once: true });
    });
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = 'adsense-script';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve(true);
    }, { once: true });
    script.addEventListener('error', () => {
      scriptPromise = undefined;
      reject(new Error('AdSense publisher script failed to load.'));
    }, { once: true });
    document.head.appendChild(script);
  });

  return scriptPromise;
}

const delay = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export async function showGooglePrivacyChoices() {
  if (!adsenseEnabled || typeof window === 'undefined') return false;

  try {
    await loadAdSenseScript();
    for (let attempt = 0; attempt < 100; attempt += 1) {
      if (window.googlefc?.showRevocationMessage) {
        window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
        window.googlefc.callbackQueue.push(window.googlefc.showRevocationMessage);
        return true;
      }
      await delay(100);
    }
  } catch (error) {
    console.warn('Privacy choices could not be opened.', error);
  }

  return false;
}
