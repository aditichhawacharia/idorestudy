import fs from 'node:fs/promises';
import path from 'node:path';
import { guides } from '../src/data/guides.js';
import { guideIndex } from '../src/data/guideIndex.js';
import { studyBuddies } from '../src/data/studyBuddies.js';

const dist = path.resolve(process.env.DIST_DIR || 'dist');
const baseHtml = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
const siteName = 'IdoréStudy';
const siteUrl = (process.env.SITE_URL || 'https://idorestudy.app').replace(/\/$/, '');
const editorialName = 'IdoréStudy Editorial';
const email = 'idore.collections@gmail.com';

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
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="site-nav"><div class="nav-inner">
      <a class="brand" href="/"><span class="brand-copy"><span class="brand-name">${siteName}</span><span class="brand-tagline">K-pop study room</span></span></a>
      <nav class="nav-links" aria-label="Primary navigation">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/study">Study room</a>
        <a class="nav-link" href="/resources">Study guides</a>
        <a class="nav-link" href="/about">About</a>
        <a class="nav-primary" href="/#choose-buddy">Choose a buddy</a>
      </nav>
    </div></header>
    <main id="main-content" class="site-main">${content}</main>
    <footer class="site-footer"><div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand-column"><p class="footer-heading">${siteName}</p><p class="footer-copy">A free, independent K-pop focus room with a timer, local task list, optional third-party ambience, and original practical study guides.</p></div>
        <div><p class="footer-heading">Study</p><div class="footer-links"><a href="/study">Study room</a><a href="/#choose-buddy">Choose a buddy</a><a href="/resources">Study guides</a></div></div>
        <div><p class="footer-heading">About</p><div class="footer-links"><a href="/about">Publisher information</a><a href="/editorial-policy">Editorial policy</a><a href="/content-policy">Content policy</a><a href="/contact">Contact</a></div></div>
        <div><p class="footer-heading">Legal</p><div class="footer-links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/disclaimer">Disclaimer</a><a href="/sitemap">Sitemap</a></div></div>
      </div>
      <div class="footer-bottom"><span>© 2026 ${siteName}. Independent and fan-made.</span><span>Not affiliated with any artist, label, agency, or entertainment company.</span></div>
    </div></footer>
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
  author = editorialName,
}) {
  const canonical = `${siteUrl}${route === '/' ? '/' : route}`;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  let html = baseHtml;
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, '');
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(fullTitle)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta name="author" content="[^"]*"\s*\/?>/, `<meta name="author" content="${escapeHtml(author)}" />`);
  html = html.replace(/<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}" />`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${escapeHtml(type)}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);

  const extraMeta = [];
  if (publishedTime) extraMeta.push(`<meta property="article:published_time" content="${escapeHtml(publishedTime)}" />`);
  if (modifiedTime) extraMeta.push(`<meta property="article:modified_time" content="${escapeHtml(modifiedTime)}" />`);
  if (extraMeta.length) html = html.replace('</head>', `${extraMeta.join('\n    ')}\n  </head>`);

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

function renderGuideCards(items, headingLevel = 2) {
  const tag = `h${headingLevel}`;
  return items.map((guide) => `<article class="guide-card">
    <p class="guide-meta"><span>${escapeHtml(guide.category)}</span><span>${escapeHtml(guide.readTime)}</span></p>
    <${tag}>${escapeHtml(guide.title)}</${tag}>
    <p>${escapeHtml(guide.description)}</p>
    <a class="guide-link" href="/resources/${escapeHtml(guide.slug)}">Read guide</a>
  </article>`).join('');
}

function renderBuddyCards(items) {
  const initialsFor = (name) => String(name).replace(/\([^)]*\)/g, '').trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  return items.map((buddy) => `<a class="buddy-card" href="/study?buddy=${buddy.id}" aria-label="Open a study room with ${escapeHtml(buddy.name)} from ${escapeHtml(buddy.group)}">
    <span class="buddy-artwork" aria-hidden="true"><span class="buddy-initials">${escapeHtml(initialsFor(buddy.name))}</span><span class="buddy-group-stamp">${escapeHtml(buddy.group)}</span></span>
    <span class="buddy-card-copy"><span><strong>${escapeHtml(buddy.name)}</strong><small>${escapeHtml(buddy.group)}</small></span><span class="buddy-card-action">Enter room</span></span>
  </a>`).join('');
}

const homeFaq = [
  ['What is the IdoréStudy K-pop study room?', 'A free focus workspace where visitors choose a K-pop study buddy, set study and break intervals, manage a local task list, and optionally play third-party YouTube ambience.'],
  ['Can I choose an idol directly from the homepage?', 'Yes. Every buddy card links directly to the matching room, and visitors can switch buddies from inside the study room.'],
  ['Is the study room ad-free?', 'Yes. Display-ad placements are excluded from the interactive room and its playback, timer, and task controls.'],
  ['Does IdoréStudy own or represent the artists?', 'No. IdoréStudy is independent and fan-made, with no artist, label, agency, or entertainment-company affiliation.'],
];

await writeRoute('/', {
  title: 'K-pop Study Room & Focus Timer',
  description: 'Choose a K-pop study buddy, open an ad-free focus room, and use a timer, local task list, optional ambience, and practical study guides.',
  body: `<header class="home-hero"><div class="page-wrap home-hero-grid">
    <div class="home-hero-copy"><p class="eyebrow">K-pop study room · focus timer · task list</p><h1>Your K-pop study room, built for real focus.</h1>
      <p class="hero-lead">Pick your bias, open the room, and start a focused session in seconds. IdoréStudy keeps the K-pop experience at the center while providing a configurable focus timer, a local to-do list, optional music, and practical study guidance. No account is required, and display ads are kept out of the immersive room.</p>
      <p><a class="primary-button" href="#choose-buddy">Choose a study buddy</a> <a class="secondary-button" href="/study">Open the full study room</a></p>
      <p class="page-byline">Published and maintained by <a href="/about#publisher">${editorialName}</a> · Updated August 20, 2026</p>
    </div>
    <aside class="hero-quick-start"><p class="section-kicker">Quick start</p><h2>Choose now</h2>${renderBuddyCards([1, 5, 18].map((id) => studyBuddies.find((buddy) => buddy.id === id)).filter(Boolean))}<p><a href="#choose-buddy">View all ${studyBuddies.length} study buddies</a></p></aside>
  </div></header>
  <section id="choose-buddy" class="buddy-picker-section"><div class="page-wrap"><div class="section-heading"><p class="eyebrow">Start your session</p><h2>Choose a K-pop study buddy</h2><p>Select any artist below to open the matching focus room immediately. The room includes a timer, local task list, optional ambience, and controls for switching to another buddy.</p></div><div class="buddy-grid">${renderBuddyCards(studyBuddies)}</div></div></section>
  <section class="section section-soft"><div class="page-wrap"><div class="section-heading"><p class="eyebrow">What the room includes</p><h2>A familiar atmosphere with practical controls.</h2></div><div class="feature-row">
    <article class="feature-panel"><h3>Configurable timer</h3><p>Choose study and break lengths that match the work instead of treating one interval as a universal rule. Saved preferences stay on the current device.</p></article>
    <article class="feature-panel"><h3>Local task list</h3><p>Add a small number of visible actions, mark them complete, and keep the next step beside the timer. No account or cloud profile is required.</p></article>
    <article class="feature-panel"><h3>Optional K-pop ambience</h3><p>Third-party YouTube media loads only after a visitor chooses a buddy. The media is optional and can be paused or muted when the task needs silence.</p></article>
    <article class="feature-panel"><h3>Ad-free room controls</h3><p>Display ads are not placed inside the immersive workspace or beside timer, playback, navigation, or task controls.</p></article>
  </div></div></section>
  <section class="section"><div class="page-wrap editorial-grid"><div class="section-heading"><p class="eyebrow">A simple focus routine</p><h2>Use the room as a boundary, not a substitute for a plan.</h2><p>Background media can make the transition into work feel more personal. The useful learning still comes from choosing an output, attempting the work, checking the result, and returning to weak material later.</p></div><ol class="professional-steps"><li><span>01</span><div><h3>Name one output</h3><p>Replace “study chemistry” with a visible result such as solving ten questions and classifying each error.</p></div></li><li><span>02</span><div><h3>Choose the room once</h3><p>Select the buddy and any music before the timer, then minimize controls so browsing does not become the task.</p></div></li><li><span>03</span><div><h3>Work until the boundary</h3><p>Write distracting thoughts on a later list and return to the current line. Take a deliberate break when the interval ends.</p></div></li><li><span>04</span><div><h3>Leave a next action</h3><p>Record what was completed, what remains uncertain, and the exact physical action that should begin the next session.</p></div></li></ol></div></section>
  <section class="section section-muted"><div class="page-wrap"><div class="section-heading"><p class="eyebrow">Original study guides</p><h2>Practical help for the problem behind the timer.</h2><p>The guide library contains ${guideIndex.length} original articles with detailed examples, publication dates, bylines, and linked supporting references.</p></div><div class="card-grid">${renderGuideCards(guideIndex.slice(0, 6))}</div><p><a class="secondary-button" href="/resources">Browse all ${guideIndex.length} guides</a></p></div></section>
  <section class="section"><div class="page-wrap publisher-panel"><p class="section-kicker">Publisher and transparency</p><h2>Independent, fan-made, and clear about what belongs to the site.</h2><p>IdoréStudy’s software, interface copy, planning prompts, original guide library, and text-and-color buddy cards are created for the site. Optional K-pop video and music is streamed from third-party platforms and remains controlled by the uploader, platform, and relevant rights holders. IdoréStudy does not claim artist affiliation or professional academic credentials.</p><div class="publisher-links"><a href="/about#publisher">Publisher information</a><a href="/editorial-policy">Editorial policy</a><a href="/content-policy">Content and takedown policy</a><a href="/disclaimer">Educational disclaimer</a></div></div></section>
  <section class="section section-soft"><div class="narrow-wrap"><div class="section-heading"><p class="eyebrow">Frequently asked questions</p><h2>Before you enter the room</h2></div>${homeFaq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')}</div></section>`,
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', name: 'IdoréStudy K-pop Study Room and Study Guides', url: `${siteUrl}/`, author: { '@type': 'Organization', name: editorialName, url: `${siteUrl}/about#publisher` } },
      { '@type': 'WebApplication', name: 'IdoréStudy K-pop Study Room', url: `${siteUrl}/study`, applicationCategory: 'EducationalApplication', operatingSystem: 'Any', isAccessibleForFree: true },
      { '@type': 'ItemList', name: 'IdoréStudy K-pop study buddies', numberOfItems: studyBuddies.length, itemListElement: studyBuddies.map((buddy, index) => ({ '@type': 'ListItem', position: index + 1, name: `${buddy.name} — ${buddy.group}`, url: `${siteUrl}/study?buddy=${buddy.id}` })) },
      { '@type': 'FAQPage', mainEntity: homeFaq.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    ],
  },
});

await writeRoute('/resources', {
  title: 'Practical Study Guides',
  description: `${guideIndex.length} original guides for focus planning, active recall, spaced review, reading, exam preparation, problem solving, and study routines.`,
  body: `<header class="resource-hero professional-hero"><div class="page-wrap resource-hero-layout"><div><p class="eyebrow">Original study guidance</p><h1 class="content-title">Study methods explained as actions you can use today.</h1><p class="content-lead">Browse ${guideIndex.length} detailed guides on planning, retrieval practice, reading, problem solving, exam preparation, study environments, and sustainable routines. Each article includes concrete prompts, examples, publication details, and supporting references where relevant.</p><p class="page-byline">Written and maintained by <a href="/about#publisher">${editorialName}</a> · Updated August 20, 2026</p></div><aside class="resource-summary"><strong>${guideIndex.length}</strong><span>in-depth guides</span><p>Every guide contains at least 600 words, practical examples, and a visible source section.</p></aside></div></header><section class="section"><div class="page-wrap"><div class="guide-library-grid">${renderGuideCards(guideIndex)}</div></div></section><section class="section section-soft"><div class="narrow-wrap content-card"><h2>How the library is maintained</h2><p>IdoréStudy articles are written for practical use rather than copied or lightly rewritten from other sites. Research links support learning principles where relevant, while the examples, prompts, schedules, and templates are original editorial guidance. Readers can review the <a href="/editorial-policy">editorial and corrections policy</a>, publisher details, and educational disclaimer.</p></div></section>`,
  schema: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'IdoréStudy practical study guides', url: `${siteUrl}/resources`, author: { '@type': 'Organization', name: editorialName }, hasPart: guideIndex.map((guide) => ({ '@type': 'Article', headline: guide.title, url: `${siteUrl}/resources/${guide.slug}`, datePublished: guide.datePublished, dateModified: guide.dateModified })) },
});

for (const guide of guides) {
  const sections = guide.sections.map((section) => {
    const id = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `<section id="${id}"><h2>${escapeHtml(section.heading)}</h2>${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}${section.list ? `<ul>${section.list.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}${section.callout ? `<aside class="callout"><h3>${escapeHtml(section.callout.title)}</h3><p>${escapeHtml(section.callout.text)}</p></aside>` : ''}</section>`;
  }).join('');
  const sources = guide.sources.length ? `<section class="article-sources" id="sources-and-reading"><h2>Sources and further reading</h2><p>These references support learning principles discussed in the article. Practical examples, prompts, and session templates are original IdoréStudy guidance.</p><ul>${guide.sources.map((source) => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a></li>`).join('')}</ul></section>` : '';
  const toc = `<nav class="article-toc"><strong>On this page</strong><ol>${guide.sections.map((section) => { const id = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); return `<li><a href="#${id}">${escapeHtml(section.heading.replace(/^\d+\.\s*/, ''))}</a></li>`; }).join('')}${guide.sources.length ? '<li><a href="#sources-and-reading">Sources and further reading</a></li>' : ''}</ol></nav>`;
  await writeRoute(`/resources/${guide.slug}`, {
    title: guide.shortTitle,
    description: guide.description,
    body: `<article class="article-wrap"><nav class="breadcrumbs"><a href="/">Home</a> / <a href="/resources">Study guides</a> / ${escapeHtml(guide.category)}</nav><header class="article-header"><p class="eyebrow">${escapeHtml(guide.category)}</p><h1>${escapeHtml(guide.title)}</h1><p class="article-deck">${escapeHtml(guide.description)}</p><p class="article-meta">${escapeHtml(guide.readTime)} · By <a href="/about#publisher">${editorialName}</a> · Published ${escapeHtml(formatDate(guide.datePublished))}${guide.dateModified !== guide.datePublished ? ` · Updated ${escapeHtml(formatDate(guide.dateModified))}` : ''}</p></header>${toc}<div class="article-body">${guide.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}${sections}${sources}<aside class="article-author-box"><div><p class="eyebrow">About the publisher</p><h2>${editorialName}</h2><p>IdoréStudy is independently designed, written, and maintained by the creator behind Idoré Collections. The site publishes general educational information and practical study tools without claiming academic, clinical, legal, or financial credentials.</p><p><a href="/about#publisher">Publisher details</a> · <a href="/editorial-policy">Editorial policy</a></p></div></aside></div></article>`,
    schema: { '@context': 'https://schema.org', '@type': 'Article', headline: guide.title, description: guide.description, datePublished: guide.datePublished, dateModified: guide.dateModified, mainEntityOfPage: `${siteUrl}/resources/${guide.slug}`, author: { '@type': 'Organization', name: editorialName, url: `${siteUrl}/about#publisher` }, publisher: { '@type': 'Organization', name: siteName, url: siteUrl }, citation: guide.sources.map((source) => source.url) },
    type: 'article',
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateModified,
  });
}

await writeRoute('/study', {
  title: 'K-pop Study Room',
  description: 'Choose a K-pop study buddy, set a focus timer, and use a local task list in the free ad-free IdoréStudy room.',
  body: `<header class="content-hero"><div class="narrow-wrap"><p class="eyebrow">Ad-free interactive workspace</p><h1 class="content-title">Choose a K-pop study buddy and begin.</h1><p class="content-lead">Select a room below. JavaScript adds the full-screen YouTube background, configurable timer, local task list, optional music, and room controls. Third-party media loads only after a visitor chooses a buddy.</p></div></header><section class="buddy-picker-section"><div class="page-wrap"><div class="buddy-grid">${renderBuddyCards(studyBuddies)}</div><div class="content-card"><h2>Use the room deliberately</h2><p>Choose one observable outcome before opening the media. Select the ambience once, minimize the controls, work until the timer ends, and leave an exact next action before closing. IdoréStudy does not place display ads in the study room and does not own the optional media.</p><p><a href="/resources/pomodoro-study-session">Plan a focus interval</a> · <a href="/resources/study-with-music">Decide whether music fits the task</a></p></div></div></section>`,
  schema: { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'IdoréStudy K-pop Study Room', url: `${siteUrl}/study`, applicationCategory: 'EducationalApplication', operatingSystem: 'Any', isAccessibleForFree: true },
});

await writeRoute('/about', {
  title: 'About the K-pop Study Room',
  description: 'Who publishes IdoréStudy, why the K-pop study room exists, how original guides are maintained, and how third-party media is handled.',
  body: `<header class="content-hero professional-hero"><div class="narrow-wrap"><p class="eyebrow">About IdoréStudy</p><h1 class="content-title">A K-pop study room with a clear purpose: help people begin and stay with the work.</h1><p class="content-lead">IdoréStudy combines an immediate “pick your bias and start” experience with practical focus tools and original study guidance. It is independent, fan-made, free to use, and built so the K-pop atmosphere supports the session rather than replacing it.</p><p class="page-byline">Published by ${editorialName} · Updated August 20, 2026</p></div></header><section class="section"><div class="narrow-wrap article-body">
    <section><h2>What the product does</h2><p>A visitor chooses a K-pop study buddy on the homepage or room lobby and enters a full-screen focus workspace. The room provides a configurable study-and-break timer, local task list, optional YouTube ambience, and controls that can be minimized once work begins.</p><p>No account is required. Timer preferences, session outcomes, and task-list data are stored in the current browser. The fast setup also means that local information does not automatically sync and may disappear when browser storage is cleared.</p></section>
    <section><h2>Why K-pop remains central</h2><p>For many fans, selecting a familiar artist creates a personal transition into work. IdoréStudy therefore keeps the buddy selector prominent on the homepage rather than hiding the product behind a generic productivity landing page. The room is atmosphere, not a claim that media alone improves learning.</p><p>Users are encouraged to pause video or music whenever it makes reading, language production, memory retrieval, or difficult problem solving less effective.</p></section>
    <section><h2>What is original</h2><p>The interface, timer workflow, task tools, planner handoff, text-and-color buddy cards, guide articles, examples, FAQs, policies, and editorial framing are created for IdoréStudy. The site does not publish copied artist biographies, lyrics, article reproductions, or photo galleries assembled from unrelated publishers.</p></section>
    <section id="publisher"><h2>Publisher information and experience</h2><p>IdoréStudy is published and maintained by the independent creator behind Idoré Collections, a K-pop fan and digital-product creator. The publisher develops the interface, maintains the tools, writes and updates the site copy, reviews correction requests, and manages the guide library.</p><p>The publisher does not claim academic, medical, legal, financial, or mental-health credentials. Study articles offer general educational information and planning ideas, not individualized professional advice.</p><p>Questions and corrections can be sent to <a href="mailto:${email}">${email}</a>.</p></section>
    <section><h2>Editorial standards</h2><p>Articles must give readers a concrete action, example, prompt, or decision rule. Sources are linked when a research finding or established learning principle supports the guidance. Publication and material-update dates are shown, and advertising is kept separate from editorial conclusions and interactive study controls.</p><p><a href="/editorial-policy">Read the full editorial and corrections policy.</a></p></section>
    <section><h2>Third-party media and independence</h2><p>Optional video and audio is embedded from third-party platforms, primarily YouTube. IdoréStudy does not host those files. Availability, regional access, advertising inside the player, and removal decisions are controlled by the platform, uploader, and rights holders.</p><p>Artist and group names identify a room. IdoréStudy is not endorsed by, sponsored by, or affiliated with any artist, group, label, agency, or entertainment company.</p></section>
  </div></section>`,
  schema: { '@context': 'https://schema.org', '@graph': [{ '@type': 'AboutPage', name: 'About IdoréStudy', url: `${siteUrl}/about` }, { '@type': 'Organization', '@id': `${siteUrl}/#publisher`, name: siteName, url: siteUrl, email, description: 'Independent publisher of a K-pop study room and practical study guides.' }] },
});

await writeRoute('/contact', {
  title: 'Contact IdoréStudy',
  description: 'Contact IdoréStudy with questions, bug reports, accessibility feedback, corrections, privacy requests, or content concerns.',
  body: `<header class="content-hero professional-hero"><div class="narrow-wrap"><p class="eyebrow">Contact the publisher</p><h1 class="content-title">Questions, corrections, bugs, and content concerns are welcome.</h1><p class="content-lead">Email <a href="mailto:${email}">${email}</a>. The interactive contact form opens the visitor’s own email application; it does not silently submit information to an IdoréStudy server.</p></div></header><section class="section"><div class="narrow-wrap content-stack"><section class="content-card"><h2>What to include</h2><p>For a bug, include the browser, device, steps, result, and expected result. For an editorial correction, include the page URL, disputed text, explanation, and a supporting source when available. For a content or rights concern, include the exact room or media URL, your relationship to the work, and the action requested.</p></section><aside class="notice-card"><p>Do not send passwords, payment-card details, government identifiers, medical records, or other highly sensitive information.</p></aside></div></section>`,
  schema: { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact IdoréStudy', url: `${siteUrl}/contact` },
});

await writeRoute('/privacy', {
  title: 'Privacy Policy',
  description: 'How IdoréStudy handles local browser data, contact email, hosting logs, optional media, advertising, analytics, and privacy choices.',
  body: `<article class="article-wrap"><header class="article-header"><p class="eyebrow">Privacy policy</p><h1>What is stored, what may be shared, and what you can control.</h1><p class="article-deck">Last updated August 20, 2026. This policy applies to idorestudy.app and its study room.</p></header><div class="article-body"><section><h2>Local browser data</h2><p>Timer settings, session outcomes, tasks, and interface preferences may be stored in localStorage on the current device. Clearing site data may remove them. IdoréStudy does not provide an account-based backup or cloud sync.</p></section><section><h2>Hosting and contact information</h2><p>Hosting infrastructure may process standard request details such as IP address, requested URL, browser information, time, referrer, and security logs. Emails contain the information the sender chooses to provide.</p></section><section><h2>Optional YouTube media</h2><p>The media player loads only after a visitor selects a study buddy and enters the room. The browser then connects to YouTube’s privacy-enhanced embed domain, and Google may process request, device, cookie, and interaction information under its policies.</p></section><section><h2>Advertising, analytics, and consent</h2><p>Display advertising is not loaded unless the publisher has enabled and configured it. If AdSense is enabled, Google and its partners may process cookie, local-storage, device, network, page, and advertising-interaction information under their policies. Where required, advertising and related storage should be controlled through a Google-certified consent management platform. General analytics is not installed by default; any future analytics service should be identified here with its purposes and available controls.</p></section><section><h2>Rights and contact</h2><p>Depending on location, visitors may have rights of access, correction, deletion, objection, withdrawal of consent, or complaint. Contact <a href="mailto:${email}">${email}</a>.</p></section></div></article>`,
});

await writeRoute('/terms', {
  title: 'Terms of Use',
  description: 'Terms governing use of IdoréStudy, original study resources, local productivity tools, optional third-party media, and advertising.',
  body: `<article class="article-wrap"><header class="article-header"><p class="eyebrow">Terms of use</p><h1>Rules for using the site and its study room.</h1><p class="article-deck">Last updated August 20, 2026.</p></header><div class="article-body"><section><h2>The service</h2><p>IdoréStudy provides original study articles, a browser-based planner, timer, local task list, and optional third-party embeds without account registration.</p></section><section><h2>Acceptable use</h2><p>Visitors must not use the site unlawfully, interfere with security or availability, overload it with abusive automation, republish original articles at scale, impersonate an affiliation, or manipulate advertising traffic.</p></section><section><h2>Original and third-party material</h2><p>Original interface copy, articles, prompts, and custom software belong to the publisher or are used with permission. Embedded media remains controlled by its original platform and rights holders; IdoréStudy does not grant rights to those files or guarantee availability.</p></section><section><h2>Advertising and independence</h2><p>Clearly labeled advertising may support original informational pages. Visitors should never click ads merely to support the publisher. The immersive study room is designed to remain free of display-ad placements.</p></section><section><h2>Educational limits</h2><p>General study content does not guarantee a grade or replace individualized professional advice. The service is provided as available, subject to mandatory consumer rights.</p></section></div></article>`,
});

await writeRoute('/content-policy', {
  title: 'Content & Takedown Policy',
  description: 'How IdoréStudy handles original content, optional YouTube embeds, attribution, unavailable media, copyright concerns, and review requests.',
  body: `<article class="article-wrap"><header class="article-header"><p class="eyebrow">Content and takedown policy</p><h1>Original guidance, optional embeds, and a direct path for concerns.</h1><p class="article-deck">Last updated August 20, 2026.</p></header><div class="article-body"><section><h2>Original content</h2><p>Guides, examples, prompts, interface copy, and custom software are created for IdoréStudy unless a source or third-party service is identified. The site avoids copied artist biographies, lyrics, article reproductions, and photo galleries assembled from unrelated publishers.</p></section><section><h2>Optional embeds</h2><p>Study-room video and audio is streamed by YouTube after user selection. IdoréStudy does not upload, download, host, or re-encode those files. Each active room links to the original watch page.</p></section><section><h2>Independence</h2><p>Artist and group names identify an optional room choice. IdoréStudy does not claim ownership or imply sponsorship, endorsement, or affiliation.</p></section><section><h2>Requesting review</h2><p>Email <a href="mailto:${email}">${email}</a> with the page, original media URL, concern, your relationship to the work, supporting information, and requested action. The publisher may seek clarification, correct site-created text, disable an entry, or remove it.</p></section></div></article>`,
});

await writeRoute('/editorial-policy', {
  title: 'Editorial & Corrections Policy',
  description: 'How IdoréStudy plans, writes, sources, reviews, updates, and corrects original study guides and public information pages.',
  body: `<article class="article-wrap"><header class="article-header"><p class="eyebrow">Editorial policy</p><h1>How IdoréStudy creates, reviews, and corrects its public content.</h1><p class="article-deck">Effective August 20, 2026.</p></header><div class="article-body"><section><h2>Publisher responsibility</h2><p>The independent creator behind Idoré Collections is responsible for IdoréStudy editorial decisions, product maintenance, and corrections. The publisher does not claim academic, clinical, legal, or financial credentials.</p></section><section><h2>Standards for guides</h2><p>Each guide addresses a defined study problem and provides concrete actions, examples, prompts, or decision rules. Articles are written for IdoréStudy rather than copied, scraped, spun, or lightly reworded from third-party pages.</p></section><section><h2>Sources</h2><p>When a research finding supports a learning principle, the site prefers primary papers, scholarly reviews, official documentation, or recognized institutional material. Citations do not imply that a paper validates every original example in the article.</p></section><section><h2>Updates and corrections</h2><p>Publication and material-update dates are displayed. Correction requests should include the page URL, disputed material, explanation, and source where applicable. Significant corrections are incorporated into the page and may update its modified date.</p></section><section><h2>Advertising independence</h2><p>Advertising does not determine topics, conclusions, or sources. Ads are excluded from the study room and legal pages and kept away from timer, playback, task, and navigation controls.</p></section><p>Submit corrections to <a href="mailto:${email}">${email}</a>.</p></div></article>`,
});

await writeRoute('/disclaimer', {
  title: 'Educational Disclaimer',
  description: 'Important limits on IdoréStudy general study guidance, productivity tools, third-party media, external links, and advertising.',
  body: `<article class="article-wrap"><header class="article-header"><p class="eyebrow">Educational disclaimer</p><h1>General study guidance, not a guarantee or professional service.</h1><p class="article-deck">Last updated August 20, 2026.</p></header><div class="article-body"><section><h2>Educational information only</h2><p>Study guides, examples, planning templates, timer suggestions, and productivity prompts are general information. They are not individualized teaching, tutoring, disability, medical, mental-health, legal, financial, or other professional advice.</p></section><section><h2>No guaranteed results</h2><p>IdoréStudy does not guarantee grades, exam performance, admission, certification, employment, or any other outcome. Course design, prior knowledge, instruction, available time, health, and the quality of practice all matter.</p></section><section><h2>Local tools and third-party media</h2><p>Visitors are responsible for saving essential work elsewhere and checking official deadlines. Local browser data can be lost. Optional media is controlled by its original platform and rights holders, not IdoréStudy.</p></section><section><h2>Independent project and advertising</h2><p>IdoréStudy is independent and fan-made, with no artist or entertainment-company affiliation. Advertising providers control the ads they serve, and visitors should evaluate third-party offers independently.</p></section></div></article>`,
});

const groupedGuides = guideIndex.reduce((groups, guide) => {
  (groups[guide.category] ||= []).push(guide);
  return groups;
}, {});
await writeRoute('/sitemap', {
  title: 'Sitemap',
  description: 'Browse every public IdoréStudy page, K-pop study-room entry point, practical study guide, trust page, and legal policy.',
  body: `<header class="content-hero professional-hero"><div class="narrow-wrap"><p class="eyebrow">HTML sitemap</p><h1 class="content-title">Every public page in one place.</h1><p class="content-lead">Reach the K-pop study room, all ${guideIndex.length} guides, publisher information, contact routes, and site policies.</p></div></header><section class="section"><div class="page-wrap sitemap-grid"><section class="sitemap-panel"><h2>Start here</h2><ul><li><a href="/">Homepage and buddy selector</a></li><li><a href="/study">K-pop study room</a></li><li><a href="/resources">Study-guide library</a></li></ul></section><section class="sitemap-panel"><h2>Publisher and support</h2><ul><li><a href="/about">About</a></li><li><a href="/editorial-policy">Editorial policy</a></li><li><a href="/contact">Contact</a></li><li><a href="/content-policy">Content policy</a></li></ul></section><section class="sitemap-panel"><h2>Legal</h2><ul><li><a href="/privacy">Privacy</a></li><li><a href="/terms">Terms</a></li><li><a href="/disclaimer">Disclaimer</a></li></ul></section><section class="sitemap-panel sitemap-guides-panel"><h2>Study guides</h2><div class="sitemap-guide-groups">${Object.entries(groupedGuides).map(([category, items]) => `<div><h3>${escapeHtml(category)}</h3><ul>${items.map((guide) => `<li><a href="/resources/${escapeHtml(guide.slug)}">${escapeHtml(guide.title)}</a></li>`).join('')}</ul></div>`).join('')}</div></section></div></section>`,
  schema: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'IdoréStudy HTML sitemap', url: `${siteUrl}/sitemap`, hasPart: guideIndex.map((guide) => ({ '@type': 'Article', name: guide.title, url: `${siteUrl}/resources/${guide.slug}` })) },
});

const notFoundHtml = pageHtml({
  title: 'Page Not Found',
  description: 'The requested IdoréStudy page could not be found.',
  route: '/404',
  noIndex: true,
  body: `<section class="not-found"><div class="not-found-card"><p class="eyebrow">404</p><h1>That page is not in this study plan.</h1><p>The address may be incorrect, or the page may have moved.</p><p><a class="primary-button" href="/">Return home</a> <a class="secondary-button" href="/study">Open the study room</a></p></div></section>`,
});
await fs.writeFile(path.join(dist, '404.html'), notFoundHtml);

console.log(`Prerendered ${guideIndex.length + 11} public routes plus 404.`);
