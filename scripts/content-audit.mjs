import fs from 'node:fs';
import path from 'node:path';
import { guides } from '../src/data/guides.js';

const root = path.resolve('.');
const errors = [];
const notes = [];
const fail = (message) => errors.push(message);
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));

const requiredFiles = [
  'index.html',
  'src/App.jsx',
  'src/pages/Home.jsx',
  'src/pages/StudyCafe.jsx',
  'src/pages/Resources.jsx',
  'src/pages/PrivacyPolicy.jsx',
  'src/pages/Terms.jsx',
  'src/pages/ContentPolicy.jsx',
  'src/lib/adsense.js',
  'public/ads.txt',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/og-image.png',
];
for (const file of requiredFiles) {
  if (!exists(file)) fail(`Missing required file: ${file}`);
}

if (guides.length < 7) fail(`Expected at least 7 guides; found ${guides.length}.`);
const slugs = new Set();
for (const guide of guides) {
  if (slugs.has(guide.slug)) fail(`Duplicate guide slug: ${guide.slug}`);
  slugs.add(guide.slug);

  const text = [
    guide.title,
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
  const words = text.match(/[A-Za-z0-9][A-Za-z0-9’'\-]*/g)?.length || 0;
  notes.push(`${guide.slug}: ${words} words`);
  if (words < 600) fail(`Guide ${guide.slug} has only ${words} words; expected at least 600.`);
  if ((guide.intro || []).length < 2) fail(`Guide ${guide.slug} needs at least two introductory paragraphs.`);
  if ((guide.sections || []).length < 5) fail(`Guide ${guide.slug} needs at least five substantive sections.`);
  if (!(guide.sources || []).length) fail(`Guide ${guide.slug} needs at least one supporting source.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(guide.datePublished)) fail(`Invalid publication date for ${guide.slug}.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(guide.dateModified)) fail(`Invalid modified date for ${guide.slug}.`);
  for (const source of guide.sources || []) {
    if (!source.title?.trim()) fail(`Guide source title is missing: ${guide.slug}.`);
    if (!/^https:\/\//.test(source.url)) fail(`Guide source must use HTTPS: ${guide.slug} -> ${source.url}`);
  }
}

const studyCafe = read('src/pages/StudyCafe.jsx');
const allSource = fs.readdirSync(path.join(root, 'src'), { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(jsx?|css)$/.test(entry.name))
  .map((entry) => read(path.relative(root, path.join(entry.parentPath, entry.name))))
  .join('\n');

const externalImageUrls = [...allSource.matchAll(/https?:\/\/[^'"\s)]+\.(?:jpe?g|png|gif|webp)(?:\?[^'"\s)]*)?/gi)]
  .map((match) => match[0])
  .filter((url) => !url.startsWith('https://idorestudy.com/'));
if (externalImageUrls.length) fail(`External image hotlinks remain: ${[...new Set(externalImageUrls)].join(', ')}`);

if (/adsbygoogle|googlesyndication|data-ad-slot/i.test(studyCafe)) {
  fail('The immersive study room contains advertising code or placement attributes.');
}
if (/CookieConsent/i.test(allSource)) fail('A legacy custom CookieConsent component or reference remains.');
if (/supplied build|after AdSense approval/i.test(allSource)) fail('Developer-facing review language remains in public page source.');

const buddyMatches = [...studyCafe.matchAll(/\{ id: \d+, name: '[^']+', group: '[^']+', videoId: '[^']+' \}/g)];
const musicMatches = [...studyCafe.matchAll(/\{ id: \d+, name: '[^']+', icon: '[^']+', videoId: '[^']*' \}/g)];
if (buddyMatches.length < 29) fail(`Expected at least 29 study buddies; found ${buddyMatches.length}.`);
if (musicMatches.length < 12) fail(`Expected 11 music choices plus no-music; found ${musicMatches.length}.`);
if (!studyCafe.includes("name: 'No music'")) fail('The opt-in no-music choice is missing.');
if (!studyCafe.includes('youtube-nocookie.com')) fail('Privacy-enhanced YouTube embed domain is missing.');
if (!studyCafe.includes('Open selected music source')) fail('Selected music source link is missing.');
if (!studyCafe.includes('Video source')) fail('Selected study-video source link is missing.');

const mediaReview = read('MEDIA-SOURCE-REVIEW.md');
for (const match of [...buddyMatches, ...musicMatches]) {
  const videoId = match[0].match(/videoId: '([^'?]*)/)?.[1];
  if (videoId && !mediaReview.includes(`https://www.youtube.com/watch?v=${videoId}`)) {
    fail(`MEDIA-SOURCE-REVIEW.md is missing YouTube source ${videoId}.`);
  }
}

const app = read('src/App.jsx');
const expectedRoutes = [
  '/', '/study', '/resources', '/about', '/contact', '/privacy', '/terms', '/content-policy',
  ...guides.map((guide) => `/resources/${guide.slug}`),
];
for (const route of expectedRoutes.slice(0, 8)) {
  if (!app.includes(`path="${route}"`) && route !== '/resources') fail(`App route missing: ${route}`);
}

const sitemap = read('public/sitemap.xml');
for (const route of expectedRoutes) {
  const url = `https://idorestudy.com${route === '/' ? '/' : route}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) fail(`Sitemap URL missing: ${url}`);
}

const adsTxt = read('public/ads.txt').trim();
if (adsTxt !== 'google.com, pub-8850994665004292, DIRECT, f08c47fec0942fa0') {
  fail('ads.txt does not exactly match the configured AdSense publisher record.');
}

const robots = read('public/robots.txt');
if (!/User-agent:\s*Mediapartners-Google[\s\S]*?Allow:\s*\//i.test(robots)) fail('robots.txt does not explicitly allow Mediapartners-Google.');
if (!robots.includes('https://idorestudy.com/sitemap.xml')) fail('robots.txt does not advertise the sitemap URL.');

const indexHtml = read('index.html');
if (!indexHtml.includes('google-adsense-account')) fail('AdSense ownership meta tag is missing.');
if (/pagead2\.googlesyndication\.com/i.test(indexHtml)) fail('AdSense runtime script is hard-coded in index.html; keep it gated until enabled.');
if (!indexHtml.includes('application/ld+json')) fail('Base structured data is missing.');

const adsenseUtility = read('src/lib/adsense.js');
if (!adsenseUtility.includes('showGooglePrivacyChoices')) fail('Privacy-choice helper is missing.');
if (!adsenseUtility.includes('googlefc.callbackQueue.push(window.googlefc.showRevocationMessage)')) {
  fail('Google Privacy & messaging revocation API is not wired correctly.');
}

const headers = `${read('public/_headers')}\n${read('vercel.json')}`;
if (!/strict-origin(?:-when-cross-origin)?/i.test(headers)) {
  fail('Host configuration needs a Google Privacy & messaging-compatible Referrer-Policy.');
}

const adFiles = ['src/pages/Home.jsx', 'src/pages/Resources.jsx', 'src/pages/GuideArticle.jsx'];
for (const file of adFiles) {
  if (!read(file).includes('<AdSlot')) fail(`Expected a gated editorial ad placement in ${file}.`);
}
for (const file of ['src/pages/About.jsx', 'src/pages/Contact.jsx', 'src/pages/PrivacyPolicy.jsx', 'src/pages/Terms.jsx', 'src/pages/ContentPolicy.jsx', 'src/pages/NotFound.jsx']) {
  if (read(file).includes('<AdSlot')) fail(`Ad placement must not appear in ${file}.`);
}

if (errors.length) {
  console.error('Content and policy-structure audit failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content audit passed: ${guides.length} guides, ${buddyMatches.length} study buddies, ${musicMatches.length - 1} music sources plus no-music.`);
for (const note of notes) console.log(`- ${note}`);
