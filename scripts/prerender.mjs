import fs from 'node:fs/promises';
import path from 'node:path';
import { guides } from '../src/data/guides.js';

const dist = path.resolve('dist');
const baseHtml = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
const siteName = 'IdoréStudy';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const formatDate = (date) => new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${date}T12:00:00Z`));

function shell(content) {
  return `<div class="site-shell prerender-shell">
    <header class="site-nav"><div class="nav-inner">
      <a class="brand" href="/"><span class="brand-name">${siteName}</span></a>
      <nav class="nav-links" aria-label="Primary navigation">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/resources">Study guides</a>
        <a class="nav-link" href="/about">About</a>
        <a class="nav-link" href="/contact">Contact</a>
        <a class="nav-link nav-cta" href="/study">Open study room</a>
      </nav>
    </div></header>
    <main id="main-content" class="site-main">${content}</main>
    <footer class="site-footer"><div class="footer-inner"><p>${siteName} is an independent, fan-made study project. No artist, label, or entertainment company affiliation.</p>
      <p><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/content-policy">Content policy</a></p></div></footer>
  </div>`;
}

function pageHtml({
  title,
  description,
  route,
  body,
  noIndex = false,
  schema,
  type = 'website',
  publishedTime,
  modifiedTime,
}) {
  const canonical = `https://idorestudy.com${route === '/' ? '/' : route}`;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  let html = baseHtml;
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, '');
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(fullTitle)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}" />`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${escapeHtml(type)}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);

  const articleMeta = [];
  if (type === 'article') articleMeta.push('<meta name="author" content="IdoréStudy Editorial" />');
  if (publishedTime) articleMeta.push(`<meta property="article:published_time" content="${escapeHtml(publishedTime)}" />`);
  if (modifiedTime) articleMeta.push(`<meta property="article:modified_time" content="${escapeHtml(modifiedTime)}" />`);
  if (articleMeta.length) html = html.replace('</head>', `${articleMeta.join('\n  ')}\n  </head>`);

  if (schema) {
    html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>\n  </head>`);
  }
  html = html.replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${shell(body)}</div>`);
  return html;
}

async function writeRoute(route, options) {
  const html = pageHtml({ ...options, route });
  if (route === '/') {
    await fs.writeFile(path.join(dist, 'index.html'), html);
    return;
  }
  const directory = path.join(dist, route.replace(/^\//, ''));
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(path.join(directory, 'index.html'), html);
}

const renderGuideCards = (items) => items.map((guide) => `<article class="guide-card">
  <p class="guide-meta">${escapeHtml(guide.category)} · ${escapeHtml(guide.readTime)}</p>
  <h2>${escapeHtml(guide.title)}</h2>
  <p>${escapeHtml(guide.description)}</p>
  <a class="guide-link" href="/resources/${escapeHtml(guide.slug)}">Read the full guide</a>
</article>`).join('');
const guideCards = renderGuideCards(guides);
const featuredGuideCards = renderGuideCards(guides.slice(0, 3));

await writeRoute('/', {
  title: 'Free Focus Timer, Study Planner and K-pop Study Room',
  description: 'Plan a focused study session, learn practical study methods, and open a free K-pop-inspired study room with a timer and local to-do list.',
  body: `<section class="hero"><div class="page-wrap">
    <p class="eyebrow">A calmer way to begin</p>
    <h1 class="display-title">Make the next study block specific, focused, and easier to start.</h1>
    <p class="hero-lead">IdoréStudy combines an original session planner and practical study guides with an optional K-pop-inspired focus room. Choose one observable outcome, set a realistic timer, and use the media only as background atmosphere.</p>
    <p><a class="primary-button" href="/study">Open the study room</a> <a class="secondary-button" href="/resources">Read study guides</a></p>
  </div></section>
  <section class="section section-soft"><div class="page-wrap"><div class="section-heading"><h2>A useful session begins before the countdown.</h2></div>
    <div class="card-grid">
      <article class="info-card"><h3>Define a finish line</h3><p>Replace a vague subject with a visible result: solve twelve questions, draft two paragraphs, or recall one lecture without notes.</p></article>
      <article class="info-card"><h3>Match the interval</h3><p>Use shorter blocks to overcome resistance and longer blocks when rebuilding context would waste time.</p></article>
      <article class="info-card"><h3>Review the block</h3><p>Record what was completed, what remains uncertain, and the exact action that should begin the next session.</p></article>
    </div>
  </div></section>
  <section class="section"><div class="page-wrap"><div class="section-heading"><h2>Original study guidance</h2><p>IdoréStudy articles provide concrete prompts, examples, and stopping rules rather than copied summaries.</p></div><div class="card-grid">${featuredGuideCards}</div></div></section>
  <section class="section section-soft"><div class="narrow-wrap"><h2>Frequently asked questions</h2>
    <h3>Is an account required?</h3><p>No. Timer settings and tasks are stored locally in the browser.</p>
    <h3>Is the study room ad-free?</h3><p>Yes. Clearly labeled ads may support substantive informational pages, not the immersive room.</p>
    <h3>Does IdoréStudy own the embedded media?</h3><p>No. Optional video and audio is streamed from its original third-party platform. IdoréStudy is independent and not affiliated with any artist or label.</p>
  </div></section>`,
  schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'IdoréStudy home', url: 'https://idorestudy.com/' },
});

await writeRoute('/resources', {
  title: 'Practical Study Guides',
  description: 'Original guides to Pomodoro sessions, active recall, spaced practice, exam planning, study music, breaks, and distraction-light study spaces.',
  body: `<header class="resource-hero"><div class="narrow-wrap"><p class="eyebrow">Original study resources</p><h1 class="content-title">Practical methods for the part after you press start.</h1><p class="content-lead">Choose a guide based on the study problem you can observe, then adapt the examples to your subject.</p></div></header><section class="section"><div class="page-wrap"><div class="card-grid">${guideCards}</div></div></section>`,
  schema: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'IdoréStudy practical study guides', url: 'https://idorestudy.com/resources' },
});

for (const guide of guides) {
  const sections = guide.sections.map((section) => `<section><h2>${escapeHtml(section.heading)}</h2>
    ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
    ${section.list ? `<ul>${section.list.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
    ${section.callout ? `<aside class="callout"><h3>${escapeHtml(section.callout.title)}</h3><p>${escapeHtml(section.callout.text)}</p></aside>` : ''}
  </section>`).join('');
  const sources = guide.sources.length ? `<section class="article-sources"><h2>Sources and further reading</h2><ul>${guide.sources.map((source) => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a></li>`).join('')}</ul></section>` : '';
  await writeRoute(`/resources/${guide.slug}`, {
    title: guide.title,
    description: guide.description,
    body: `<article class="article-wrap"><nav class="breadcrumbs"><a href="/resources">Study guides</a> / ${escapeHtml(guide.category)}</nav><header class="article-header"><p class="eyebrow">${escapeHtml(guide.category)}</p><h1>${escapeHtml(guide.title)}</h1><p class="article-deck">${escapeHtml(guide.description)}</p><p class="article-meta">${escapeHtml(guide.readTime)} · By <a href="/about">IdoréStudy Editorial</a> · Published ${escapeHtml(formatDate(guide.datePublished))}${guide.dateModified !== guide.datePublished ? ` · Updated ${escapeHtml(formatDate(guide.dateModified))}` : ''}</p></header><div class="article-body">${guide.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}${sections}${sources}</div></article>`,
    schema: { '@context': 'https://schema.org', '@type': 'Article', headline: guide.title, description: guide.description, datePublished: guide.datePublished, dateModified: guide.dateModified, mainEntityOfPage: `https://idorestudy.com/resources/${guide.slug}`, author: { '@type': 'Organization', name: 'IdoréStudy' }, publisher: { '@type': 'Organization', name: 'IdoréStudy', url: 'https://idorestudy.com' } },
    type: 'article',
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateModified,
  });
}

await writeRoute('/about', {
  title: 'About IdoréStudy',
  description: 'Why IdoréStudy combines original study guidance and productivity tools with an optional independent K-pop-inspired study room.',
  body: `<header class="content-hero"><div class="narrow-wrap"><p class="eyebrow">Independent and fan-made</p><h1 class="content-title">A study tool first, with a room that feels personal.</h1><p class="content-lead">IdoréStudy was created for learners who begin more easily in an inviting environment but still need a clear task, timer, and review.</p></div></header><section class="section"><div class="narrow-wrap content-card"><h2>What the site provides</h2><p>The informational side explains focus planning, retrieval practice, spaced review, exam triage, deliberate breaks, and study environments. The interactive room provides a configurable timer, local task list, and optional ambience.</p><h2>No account and no artist affiliation</h2><p>Local study data stays in the browser. IdoréStudy is not sponsored, endorsed by, or affiliated with any artist, group, label, agency, or entertainment company.</p><h2>Advertising approach</h2><p>Clearly labeled manual ads may support substantive informational pages. The immersive study room, legal pages, and error pages remain free of display-ad placements.</p><h2>Publisher and corrections</h2><p>IdoréStudy is maintained by the independent creator behind Idoré Collections. Questions, accessibility feedback, and correction requests can be sent to <a href="mailto:idore.collections@gmail.com">idore.collections@gmail.com</a>.</p></div></section>`,
});

await writeRoute('/contact', {
  title: 'Contact IdoréStudy',
  description: 'Contact IdoréStudy with questions, bug reports, accessibility feedback, editorial corrections, privacy requests, or content concerns.',
  body: `<header class="content-hero"><div class="narrow-wrap"><p class="eyebrow">Contact the publisher</p><h1 class="content-title">Questions, corrections, bugs, and content concerns are welcome.</h1><p class="content-lead">Email <a href="mailto:idore.collections@gmail.com">idore.collections@gmail.com</a>. For a content concern, include the page URL, original media URL, reason for the request, your relationship to the work, and the action requested.</p></div></header>`,
});

await writeRoute('/privacy', {
  title: 'Privacy Policy',
  description: 'How IdoréStudy handles local browser data, contact email, hosting logs, optional media, advertising, analytics, and privacy choices.',
  body: `<article class="article-wrap"><header class="article-header"><p class="eyebrow">Privacy policy</p><h1>What is stored, what may be shared, and what you can control.</h1><p class="article-deck">Last updated August 20, 2026.</p></header><div class="article-body"><h2>Local browser data</h2><p>Timer settings, session outcomes, tasks, and interface preferences may be stored in localStorage on your device. Clear site data to remove them. There is no account-based cloud sync.</p><h2>Hosting and contact information</h2><p>Hosting infrastructure may process IP addresses, request details, browser information, and security logs. Emails contain the information you choose to send.</p><h2>Optional media</h2><p>YouTube connects only after a visitor selects a study buddy and enters the room. Google may then process device, request, cookie, and interaction information under its own policies.</p><h2>Advertising and consent</h2><p>Display advertising is not loaded unless the publisher has enabled and configured it. If Google AdSense is enabled, Google and its partners may process advertising data. Where required, choices are managed through a Google-certified consent platform, intended to be Google Privacy &amp; messaging.</p><h2>Your rights and contact</h2><p>Rights vary by location and may include access, correction, deletion, objection, withdrawal of consent, or a complaint to an authority. Contact <a href="mailto:idore.collections@gmail.com">idore.collections@gmail.com</a>.</p></div></article>`,
});

await writeRoute('/terms', {
  title: 'Terms of Use',
  description: 'Terms governing use of IdoréStudy, original study resources, local productivity tools, optional third-party media, and advertising.',
  body: `<article class="article-wrap"><header class="article-header"><p class="eyebrow">Terms of use</p><h1>Rules for using the site and its study room.</h1><p class="article-deck">Last updated August 20, 2026.</p></header><div class="article-body"><h2>The service</h2><p>IdoréStudy provides original articles, a planner, timer, local task list, and optional third-party embeds without account registration.</p><h2>Acceptable use</h2><p>Do not use the site unlawfully, interfere with security, overload it with abusive automation, republish original articles at scale, impersonate affiliations, or manipulate advertising traffic.</p><h2>Third-party media</h2><p>Embedded video and audio remains controlled by its original platform and rights holders. IdoréStudy does not host the files or guarantee availability.</p><h2>Advertising</h2><p>Clearly labeled advertising may support informational pages. Never click an ad merely to support the publisher. The study room is designed to remain ad-free.</p><h2>Disclaimers</h2><p>The service is provided as available and general study content does not guarantee a grade or replace professional advice. Mandatory consumer rights remain unaffected.</p></div></article>`,
});

await writeRoute('/content-policy', {
  title: 'Content, Copyright and Takedown Policy',
  description: 'How IdoréStudy handles original content, optional YouTube embeds, attribution, unavailable media, copyright concerns, and takedown requests.',
  body: `<article class="article-wrap"><header class="article-header"><p class="eyebrow">Content and takedown policy</p><h1>Original guidance, optional embeds, and a direct path for concerns.</h1></header><div class="article-body"><h2>Original content</h2><p>Guides, examples, prompts, interface copy, and custom software are created for IdoréStudy unless a third-party source is identified. The site avoids republished biographies, lyrics, article copies, and third-party photo galleries.</p><h2>Optional embeds</h2><p>Study-room media is streamed by YouTube after user selection. A link to the original watch page identifies the platform context and uploader.</p><h2>Requesting review</h2><p>Email <a href="mailto:idore.collections@gmail.com">idore.collections@gmail.com</a> with your name, the exact IdoréStudy page, the original media URL, your relationship to the work, the concern, and the requested action. The publisher may ask for more information, correct text, disable an entry, or remove it.</p></div></article>`,
});

await writeRoute('/study', {
  title: 'K-pop-Inspired Study Room',
  description: 'Choose an optional YouTube study background, set a focus timer, and use a local task list in the free ad-free IdoréStudy room.',
  body: `<header class="content-hero"><div class="narrow-wrap"><p class="eyebrow">Ad-free interactive room</p><h1 class="content-title">Choose a study buddy, set one outcome, and begin.</h1><p class="content-lead">The interactive room requires JavaScript. It includes a configurable timer, a local task list, and optional YouTube ambience. Media does not load until you make a selection.</p><p><a class="primary-button" href="/study">Load the interactive selector</a> <a class="secondary-button" href="/resources/pomodoro-study-session">Plan the session first</a></p><h2>Use the room deliberately</h2><p>Pick one observable outcome before choosing the media. Select the ambience once, minimize its controls, work until the timer ends, and leave an exact next action before closing. IdoréStudy does not place display ads in this room and does not own the optional media.</p></div></header>`,
});

const notFoundHtml = pageHtml({
  title: 'Page Not Found',
  description: 'The requested IdoréStudy page could not be found.',
  route: '/404',
  noIndex: true,
  body: `<section class="not-found"><div class="not-found-card"><p class="eyebrow">404</p><h1>That page is not in this study plan.</h1><p>The address may be incorrect, or the page may have moved.</p><p><a class="primary-button" href="/">Return home</a></p></div></section>`,
});
await fs.writeFile(path.join(dist, '404.html'), notFoundHtml);

console.log(`Prerendered ${guides.length + 8} public routes plus 404.`);
