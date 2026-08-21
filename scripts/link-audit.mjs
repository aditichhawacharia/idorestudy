import fs from 'node:fs/promises';
import path from 'node:path';
import { guideIndex } from '../src/data/guideIndex.js';
import { studyBuddies } from '../src/data/studyBuddies.js';

const dist = path.resolve(process.env.DIST_DIR || 'dist');
const failures = [];
const htmlFiles = [];

async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}

await walk(dist);

function internalTarget(href) {
  if (!href || href.startsWith('#') || /^(?:https?:|mailto:|tel:|javascript:)/i.test(href)) return null;
  const pathname = href.split('#')[0].split('?')[0];
  if (!pathname.startsWith('/')) return null;
  return pathname;
}

async function existsForRoute(route) {
  if (route === '/') return fs.access(path.join(dist, 'index.html')).then(() => true).catch(() => false);
  const clean = route.replace(/^\//, '');
  const direct = path.join(dist, clean);
  const candidates = path.extname(clean)
    ? [direct]
    : [direct, path.join(direct, 'index.html'), `${direct}.html`];
  for (const candidate of candidates) {
    try { await fs.access(candidate); return true; } catch {}
  }
  return false;
}

for (const file of htmlFiles) {
  const html = await fs.readFile(file, 'utf8');
  const relative = path.relative(dist, file);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '';
  const description = html.match(/<meta name="description" content="([^"]*)"/i)?.[1]?.trim() || '';
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1]?.trim() || '';
  const h1Count = (html.match(/<h1\b/gi) || []).length;

  if (!title) failures.push(`${relative}: missing title`);
  if (title.length > 60) failures.push(`${relative}: title is ${title.length} characters`);
  if (!description) failures.push(`${relative}: missing meta description`);
  if (description.length > 160) failures.push(`${relative}: description is ${description.length} characters`);
  if (!canonical.startsWith('https://idorestudy.app/')) failures.push(`${relative}: invalid canonical ${canonical}`);
  if (h1Count !== 1) failures.push(`${relative}: expected one h1, found ${h1Count}`);
  if (html.includes('idorestudy.com')) failures.push(`${relative}: contains retired idorestudy.com domain`);

  const hrefs = [...html.matchAll(/\bhref="([^"]+)"/gi)].map((match) => match[1]);
  for (const href of new Set(hrefs)) {
    const target = internalTarget(href);
    if (target && !(await existsForRoute(target))) failures.push(`${relative}: broken internal link ${href}`);
  }

  const newTabAnchors = [...html.matchAll(/<a\b([^>]*\btarget="_blank"[^>]*)>/gi)];
  for (const anchor of newTabAnchors) {
    const attributes = anchor[1];
    if (!/\brel="[^"]*noopener[^"]*noreferrer[^"]*"/i.test(attributes)) {
      failures.push(`${relative}: target=_blank link is missing rel="noopener noreferrer"`);
    }
  }
}

const rootHtml = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
const homepageText = rootHtml
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z0-9#]+;/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const homepageWords = (homepageText.match(/[A-Za-z0-9À-ÖØ-öø-ÿ’'-]+/g) || []).length;
if (homepageWords < 900) failures.push(`Homepage has only ${homepageWords} crawlable words; expected at least 900.`);
if (!/K-pop study room/i.test(homepageText)) failures.push('Homepage does not clearly identify the product as a K-pop study room.');
if (!/Published and maintained by/i.test(homepageText)) failures.push('Homepage is missing a visible publisher byline.');

const buddyLinks = [...rootHtml.matchAll(/href="\/study\?buddy=(\d+)"/g)].map((match) => Number.parseInt(match[1], 10));
const uniqueBuddyLinks = new Set(buddyLinks);
if (uniqueBuddyLinks.size !== studyBuddies.length) {
  failures.push(`Homepage exposes ${uniqueBuddyLinks.size} unique direct buddy links; expected ${studyBuddies.length}.`);
}
for (const buddy of studyBuddies) {
  if (!uniqueBuddyLinks.has(buddy.id)) failures.push(`Homepage is missing the direct room link for ${buddy.name} (${buddy.id}).`);
  if (!rootHtml.includes(`>${buddy.name}<`)) failures.push(`Homepage prerender does not expose ${buddy.name} in the buddy selector.`);
}

const resourcesHtml = await fs.readFile(path.join(dist, 'resources', 'index.html'), 'utf8');
if (!/Written and maintained by/i.test(resourcesHtml)) failures.push('Guide library is missing a visible publisher byline.');
for (const guide of guideIndex) {
  const guideFile = path.join(dist, 'resources', guide.slug, 'index.html');
  try {
    const guideHtml = await fs.readFile(guideFile, 'utf8');
    if (!guideHtml.includes(`By <a href="/about#publisher">IdoréStudy Editorial</a>`)) failures.push(`${guide.slug}: article byline is missing.`);
    if (!guideHtml.includes('Sources and further reading')) failures.push(`${guide.slug}: source section is missing.`);
  } catch {
    failures.push(`Missing prerendered guide route: /resources/${guide.slug}`);
  }
}

const sitemapHtml = await fs.readFile(path.join(dist, 'sitemap', 'index.html'), 'utf8');
if (!sitemapHtml.includes('Every public page in one place')) failures.push('HTML sitemap page is missing its primary heading.');
for (const guide of guideIndex) {
  if (!sitemapHtml.includes(`/resources/${guide.slug}`)) failures.push(`HTML sitemap is missing ${guide.slug}.`);
}

const notFoundHtml = await fs.readFile(path.join(dist, '404.html'), 'utf8');
if (!/<meta name="robots" content="noindex,nofollow"/i.test(notFoundHtml)) failures.push('404 page is not marked noindex,nofollow.');

const manifestPath = path.join(dist, '.vite', 'manifest.json');
try {
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  const studyChunk = Object.entries(manifest).find(([key]) => key.endsWith('src/pages/StudyCafe.jsx'));
  if (!studyChunk) failures.push('Build manifest does not contain a separate StudyCafe route chunk.');
  const mainEntry = Object.entries(manifest).find(([, value]) => value.isEntry);
  if (studyChunk && mainEntry && mainEntry[1].file === studyChunk[1].file) failures.push('StudyCafe is bundled into the main entry instead of a lazy route chunk.');
} catch (error) {
  failures.push(`Could not inspect Vite manifest: ${error.message}`);
}

if (failures.length) {
  console.error('Link and build audit failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Link and build audit passed for ${htmlFiles.length} HTML files; homepage exposes ${homepageWords} crawlable words.`);
