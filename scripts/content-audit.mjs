import fs from 'node:fs';
import path from 'node:path';
import { guides } from '../src/data/guides.js';
import { guideIndex } from '../src/data/guideIndex.js';
import { studyBuddies } from '../src/data/studyBuddies.js';
import { musicOptions } from '../src/data/musicOptions.js';

const root = path.resolve('.');
const errors = [];
const notes = [];
const fail = (message) => errors.push(message);
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function countWords(value) {
  return value.match(/[A-Za-z0-9][A-Za-z0-9’'\-]*/g)?.length || 0;
}

function cleanYouTubeId(value) {
  return String(value || '').split('?')[0];
}

const requiredFiles = [
  'index.html',
  '.env.example',
  'src/App.jsx',
  'src/components/Analytics.jsx',
  'src/components/AdSlot.jsx',
  'src/components/BuddyArtwork.jsx',
  'src/components/Footer.jsx',
  'src/components/Navbar.jsx',
  'src/components/Seo.jsx',
  'src/config/site.js',
  'src/data/guides.js',
  'src/data/guideIndex.js',
  'src/data/studyBuddies.js',
  'src/data/musicOptions.js',
  'src/pages/Home.jsx',
  'src/pages/StudyCafe.jsx',
  'src/pages/Resources.jsx',
  'src/pages/GuideArticle.jsx',
  'src/pages/About.jsx',
  'src/pages/Contact.jsx',
  'src/pages/PrivacyPolicy.jsx',
  'src/pages/Terms.jsx',
  'src/pages/ContentPolicy.jsx',
  'src/pages/EditorialPolicy.jsx',
  'src/pages/Disclaimer.jsx',
  'src/pages/SitemapPage.jsx',
  'src/lib/adsense.js',
  'public/ads.txt',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/og-image.png',
  'public/_headers',
  'vercel.json',
  'MEDIA-SOURCE-REVIEW.md',
];
for (const file of requiredFiles) {
  if (!exists(file)) fail(`Missing required file: ${file}`);
}

if (guides.length < 20) fail(`Expected at least 20 substantive guides; found ${guides.length}.`);
if (guideIndex.length !== guides.length) {
  fail(`Guide metadata index contains ${guideIndex.length} entries but the article source contains ${guides.length}.`);
}

const slugs = new Set();
const guideIndexBySlug = new Map(guideIndex.map((guide) => [guide.slug, guide]));
for (const guide of guides) {
  if (!guide.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(guide.slug)) fail(`Invalid guide slug: ${guide.slug || '(blank)'}`);
  if (slugs.has(guide.slug)) fail(`Duplicate guide slug: ${guide.slug}`);
  slugs.add(guide.slug);

  const text = [
    guide.title,
    guide.shortTitle,
    guide.description,
    ...(guide.intro || []),
    ...(guide.sections || []).flatMap((section) => [
      section.heading,
      ...(section.paragraphs || []),
      ...(section.list || []),
      section.callout?.title || '',
      section.callout?.text || '',
    ]),
  ].join(' ');
  const words = countWords(text);
  notes.push(`${guide.slug}: ${words} words, ${(guide.sections || []).length} sections, ${(guide.sources || []).length} source(s)`);

  if (words < 600) fail(`Guide ${guide.slug} has only ${words} words; expected at least 600.`);
  if ((guide.intro || []).length < 2) fail(`Guide ${guide.slug} needs at least two introductory paragraphs.`);
  if ((guide.sections || []).length < 5) fail(`Guide ${guide.slug} needs at least five substantive sections.`);
  if (!(guide.sources || []).length) fail(`Guide ${guide.slug} needs at least one supporting source.`);
  if (!guide.title?.trim() || !guide.shortTitle?.trim() || !guide.description?.trim()) fail(`Guide ${guide.slug} is missing required display metadata.`);
  if (countWords(guide.description || '') < 8) fail(`Guide ${guide.slug} has an unusually short description.`);
  if (!/^[0-9]+ min read$/.test(guide.readTime || '')) fail(`Guide ${guide.slug} has an invalid read-time label.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(guide.datePublished || '')) fail(`Invalid publication date for ${guide.slug}.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(guide.dateModified || '')) fail(`Invalid modified date for ${guide.slug}.`);
  if (new Date(guide.dateModified) < new Date(guide.datePublished)) fail(`Modified date precedes publication date for ${guide.slug}.`);
  if (!(guide.keywords || []).length) fail(`Guide ${guide.slug} needs descriptive keywords.`);

  for (const source of guide.sources || []) {
    if (!source.title?.trim()) fail(`Guide source title is missing: ${guide.slug}.`);
    if (!/^https:\/\//.test(source.url || '')) fail(`Guide source must use HTTPS: ${guide.slug} -> ${source.url}`);
  }

  const indexed = guideIndexBySlug.get(guide.slug);
  if (!indexed) {
    fail(`Guide metadata index is missing ${guide.slug}.`);
  } else {
    for (const field of ['title', 'shortTitle', 'description', 'category', 'readTime', 'datePublished', 'dateModified']) {
      if (indexed[field] !== guide[field]) fail(`Guide metadata mismatch for ${guide.slug}.${field}.`);
    }
  }
}
for (const indexed of guideIndex) {
  if (!slugs.has(indexed.slug)) fail(`Guide metadata index has an orphaned entry: ${indexed.slug}.`);
}

if (studyBuddies.length < 29) fail(`Expected at least 29 study buddies; found ${studyBuddies.length}.`);
const buddyIds = new Set();
const buddyNames = new Set();
const buddyVideoIds = new Set();
for (const buddy of studyBuddies) {
  if (!Number.isInteger(buddy.id)) fail(`Study buddy ${buddy.name || '(unnamed)'} has an invalid ID.`);
  if (buddyIds.has(buddy.id)) fail(`Duplicate study-buddy ID: ${buddy.id}.`);
  buddyIds.add(buddy.id);
  if (!buddy.name?.trim() || !buddy.group?.trim()) fail(`Study buddy ID ${buddy.id} is missing a name or group.`);
  const identityKey = `${buddy.name}|${buddy.group}`.toLowerCase();
  if (buddyNames.has(identityKey)) fail(`Duplicate study buddy: ${buddy.name} (${buddy.group}).`);
  buddyNames.add(identityKey);
  const videoId = cleanYouTubeId(buddy.videoId);
  if (!/^[A-Za-z0-9_-]{6,}$/.test(videoId)) fail(`Invalid YouTube ID for ${buddy.name}: ${buddy.videoId}`);
  if (buddyVideoIds.has(videoId)) fail(`Duplicate study-buddy YouTube source: ${videoId}.`);
  buddyVideoIds.add(videoId);
}

if (musicOptions.length < 12) fail(`Expected 11 music choices plus no-music; found ${musicOptions.length}.`);
const noMusic = musicOptions.find((item) => item.id === 0);
if (!noMusic || noMusic.name !== 'No music' || noMusic.videoId !== '') fail('The opt-in no-music choice is missing or malformed.');
const musicVideoIds = new Set();
for (const option of musicOptions.filter((item) => item.videoId)) {
  const videoId = cleanYouTubeId(option.videoId);
  if (!/^[A-Za-z0-9_-]{6,}$/.test(videoId)) fail(`Invalid music YouTube ID for ${option.name}: ${option.videoId}`);
  if (musicVideoIds.has(videoId)) fail(`Duplicate music YouTube source: ${videoId}.`);
  musicVideoIds.add(videoId);
}
if (musicVideoIds.size !== 11) fail(`Expected 11 optional music sources; found ${musicVideoIds.size}.`);

const sourceFiles = walk(path.join(root, 'src')).filter((file) => /\.(jsx?|css)$/.test(file));
const allSource = sourceFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const retiredDomainMatches = [...allSource.matchAll(/idorestudy\.com/gi)];
if (retiredDomainMatches.length) fail('The retired idorestudy.com domain remains in source files.');
if (/fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(allSource)) fail('Remote Google Fonts imports remain; use the local system font stack for faster, more professional public pages.');

const externalImageUrls = [...allSource.matchAll(/https?:\/\/[^'"\s)]+\.(?:jpe?g|png|gif|webp)(?:\?[^'"\s)]*)?/gi)]
  .map((match) => match[0])
  .filter((url) => !url.startsWith('https://idorestudy.app/'));
if (externalImageUrls.length) fail(`External image hotlinks remain: ${[...new Set(externalImageUrls)].join(', ')}`);

const studyCafe = read('src/pages/StudyCafe.jsx');
if (/adsbygoogle|googlesyndication|data-ad-slot|<AdSlot/i.test(studyCafe)) fail('The immersive study room contains advertising code or placement attributes.');
if (!studyCafe.includes('youtube-nocookie.com')) fail('Privacy-enhanced YouTube embed domain is missing.');
if (!studyCafe.includes('Open selected music source')) fail('Selected music source link is missing.');
if (!studyCafe.includes('Video source')) fail('Selected study-video source link is missing.');
if (!studyCafe.includes('useSearchParams')) fail('The study room does not read the direct buddy-selection query parameter.');
if (!studyCafe.includes("setSearchParams({ buddy: String(buddy.id) })")) fail('The study room does not preserve the selected buddy in the URL.');

if (/CookieConsent/i.test(allSource)) fail('A legacy custom CookieConsent component or reference remains.');
if (/supplied build|after AdSense approval/i.test(allSource)) fail('Developer-facing review language remains in public page source.');

const home = read('src/pages/Home.jsx');
if (!/K-pop study room/i.test(home)) fail('The homepage does not clearly identify the product as a K-pop study room.');
if (!home.includes('to={`/study?buddy=${buddy.id}`}')) fail('The homepage is missing direct buddy links into the study room.');
if (!home.includes('Choose a K-pop study buddy')) fail('The homepage is missing an explicit study-buddy selection heading.');
if (!home.includes('EDITORIAL_NAME')) fail('The homepage is missing visible publisher or author attribution.');

const about = read('src/pages/About.jsx');
for (const phrase of ['independent', 'K-pop', 'editorial']) {
  if (!new RegExp(phrase, 'i').test(about)) fail(`The About page is missing a clear ${phrase} trust signal.`);
}

const app = read('src/App.jsx');
if (!app.includes("const StudyCafe = lazy(() => import('./pages/StudyCafe.jsx'))")) fail('The study room is not code-split from public editorial pages.');
const fixedRoutes = [
  '/', '/study', '/resources', '/about', '/contact', '/privacy', '/terms', '/content-policy',
  '/editorial-policy', '/disclaimer', '/sitemap',
];
for (const route of fixedRoutes) {
  if (!app.includes(`path="${route}"`)) fail(`App route missing: ${route}`);
}
if (!app.includes('path="/resources/:slug"')) fail('Dynamic guide route is missing.');

const sitemap = read('public/sitemap.xml');
const expectedRoutes = [...fixedRoutes, ...guides.map((guide) => `/resources/${guide.slug}`)];
for (const route of expectedRoutes) {
  const url = `https://idorestudy.app${route === '/' ? '/' : route}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) fail(`Sitemap URL missing: ${url}`);
}
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail('Sitemap contains duplicate URLs.');
if (sitemapUrls.length !== expectedRoutes.length) fail(`Expected ${expectedRoutes.length} sitemap URLs; found ${sitemapUrls.length}.`);

const mediaReview = read('MEDIA-SOURCE-REVIEW.md');
for (const buddy of studyBuddies) {
  const url = `https://www.youtube.com/watch?v=${cleanYouTubeId(buddy.videoId)}`;
  if (!mediaReview.includes(url)) fail(`MEDIA-SOURCE-REVIEW.md is missing study-buddy source ${url}.`);
}
for (const option of musicOptions.filter((item) => item.videoId)) {
  const url = `https://www.youtube.com/watch?v=${cleanYouTubeId(option.videoId)}`;
  if (!mediaReview.includes(url)) fail(`MEDIA-SOURCE-REVIEW.md is missing music source ${url}.`);
}

const adsTxt = read('public/ads.txt').trim();
if (adsTxt !== 'google.com, pub-8850994665004292, DIRECT, f08c47fec0942fa0') {
  fail('ads.txt does not exactly match the configured AdSense publisher record.');
}

const robots = read('public/robots.txt');
if (!/User-agent:\s*Mediapartners-Google[\s\S]*?Allow:\s*\//i.test(robots)) fail('robots.txt does not explicitly allow Mediapartners-Google.');
if (!robots.includes('https://idorestudy.app/sitemap.xml')) fail('robots.txt does not advertise the production sitemap URL.');

const indexHtml = read('index.html');
if (!indexHtml.includes('google-adsense-account')) fail('AdSense ownership meta tag is missing.');
if (/pagead2\.googlesyndication\.com/i.test(indexHtml)) fail('AdSense runtime script is hard-coded in index.html; keep it gated until enabled.');
if (!indexHtml.includes('application/ld+json')) fail('Base structured data is missing.');
if (!/K-pop study room/i.test(indexHtml)) fail('Base metadata does not clearly describe the K-pop study room.');
if (!indexHtml.includes('https://idorestudy.app/')) fail('Base metadata does not use the canonical production origin.');

const envExample = read('.env.example');
if (!/VITE_ADSENSE_ENABLED=false/.test(envExample)) fail('Advertising must remain disabled by default before approval.');
if (!/VITE_ANALYTICS_ENABLED=false/.test(envExample)) fail('Analytics must remain disabled by default until a real property and consent setup exist.');
if (!/VITE_SITE_URL=https:\/\/idorestudy\.app/.test(envExample)) fail('The production origin is missing from .env.example.');

const analytics = read('src/components/Analytics.jsx');
if (!analytics.includes("import.meta.env.VITE_ANALYTICS_ENABLED === 'true'")) fail('Analytics is not gated behind an explicit production flag.');
if (!analytics.includes("analytics_storage: 'denied'")) fail('Analytics consent does not default to denied.');

const adsenseUtility = read('src/lib/adsense.js');
if (!adsenseUtility.includes('showGooglePrivacyChoices')) fail('Privacy-choice helper is missing.');
if (!adsenseUtility.includes('googlefc.callbackQueue.push(window.googlefc.showRevocationMessage)')) fail('Google Privacy & messaging revocation API is not wired correctly.');

const headers = `${read('public/_headers')}\n${read('vercel.json')}`;
if (!/strict-origin-when-cross-origin/i.test(headers)) fail('Host configuration needs a privacy-compatible Referrer-Policy.');
if (!/X-Content-Type-Options/i.test(headers)) fail('Host configuration is missing X-Content-Type-Options.');

const adFiles = ['src/pages/Home.jsx', 'src/pages/Resources.jsx', 'src/pages/GuideArticle.jsx'];
for (const file of adFiles) {
  if (!read(file).includes('<AdSlot')) fail(`Expected a gated editorial ad placement in ${file}.`);
}
for (const file of [
  'src/pages/About.jsx', 'src/pages/Contact.jsx', 'src/pages/PrivacyPolicy.jsx', 'src/pages/Terms.jsx',
  'src/pages/ContentPolicy.jsx', 'src/pages/EditorialPolicy.jsx', 'src/pages/Disclaimer.jsx',
  'src/pages/SitemapPage.jsx', 'src/pages/NotFound.jsx',
]) {
  if (read(file).includes('<AdSlot')) fail(`Ad placement must not appear in ${file}.`);
}

const css = read('src/index.css');
if (!/body\s*\{[\s\S]*?font-size:\s*16px/i.test(css)) fail('Base body text must be at least 16px for readability.');
if (/--pink|#FF6B9D/i.test(css.slice(0, 12000))) {
  notes.push('Professional public CSS still contains some warm accent tokens; visual review is required, but the public shell no longer depends on the study-room gradients.');
}

if (errors.length) {
  console.error('Content and policy-structure audit failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content audit passed: ${guides.length} guides, ${studyBuddies.length} study buddies, ${musicVideoIds.size} optional music sources plus no-music, and ${sitemapUrls.length} sitemap URLs.`);
for (const note of notes) console.log(`- ${note}`);
