import { useEffect } from 'react';
import { DEFAULT_SOCIAL_IMAGE, SITE_NAME, SITE_URL } from '../config/site.js';

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

function setLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function removeMeta(selector) {
  document.head.querySelector(selector)?.remove();
}

export default function Seo({
  title,
  description,
  path = '/',
  type = 'website',
  image = DEFAULT_SOCIAL_IMAGE,
  noIndex = false,
  structuredData,
  publishedTime,
  modifiedTime,
  author,
}) {
  useEffect(() => {
    const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
    const canonical = `${SITE_URL}${normalizedPath}`;
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[name="robots"]', {
      name: 'robots',
      content: noIndex
        ? 'noindex,nofollow'
        : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    });
    setLink('canonical', canonical);

    setMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    setMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_US' });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    setMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
    setMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });
    setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: `${SITE_NAME} K-pop study room and study-guide library` });

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
    setMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: `${SITE_NAME} K-pop study room and study-guide library` });

    if (author) setMeta('meta[name="author"]', { name: 'author', content: author });
    else removeMeta('meta[name="author"]');
    if (publishedTime) setMeta('meta[property="article:published_time"]', { property: 'article:published_time', content: publishedTime });
    else removeMeta('meta[property="article:published_time"]');
    if (modifiedTime) setMeta('meta[property="article:modified_time"]', { property: 'article:modified_time', content: modifiedTime });
    else removeMeta('meta[property="article:modified_time"]');

    const scriptId = 'route-structured-data';
    document.getElementById(scriptId)?.remove();
    if (structuredData) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => document.getElementById(scriptId)?.remove();
  }, [title, description, path, type, image, noIndex, structuredData, publishedTime, modifiedTime, author]);

  return null;
}
