import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { guideIndex } from '../src/data/guideIndex.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = (process.env.SITE_URL || 'https://idorestudy.app').replace(/\/$/, '');

const fixedRoutes = [
  { path: '/', lastmod: '2026-08-20', priority: '1.0', changefreq: 'weekly' },
  { path: '/study', lastmod: '2026-08-20', priority: '0.9', changefreq: 'monthly' },
  { path: '/resources', lastmod: '2026-08-20', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', lastmod: '2026-08-20', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', lastmod: '2026-08-20', priority: '0.5', changefreq: 'yearly' },
  { path: '/editorial-policy', lastmod: '2026-08-20', priority: '0.5', changefreq: 'monthly' },
  { path: '/content-policy', lastmod: '2026-08-20', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy', lastmod: '2026-08-20', priority: '0.4', changefreq: 'monthly' },
  { path: '/terms', lastmod: '2026-08-20', priority: '0.4', changefreq: 'monthly' },
  { path: '/disclaimer', lastmod: '2026-08-20', priority: '0.4', changefreq: 'monthly' },
  { path: '/sitemap', lastmod: '2026-08-20', priority: '0.5', changefreq: 'weekly' },
];

const articleRoutes = guideIndex.map((guide) => ({
  path: `/resources/${guide.slug}`,
  lastmod: guide.dateModified,
  priority: '0.8',
  changefreq: 'monthly',
}));

const routes = [...fixedRoutes, ...articleRoutes];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url>\n    <loc>${siteUrl}${route.path === '/' ? '/' : route.path}</loc>\n    <lastmod>${route.lastmod}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;

await fs.writeFile(path.join(root, 'public', 'sitemap.xml'), xml);
await fs.writeFile(path.join(root, 'public', 'robots.txt'), [
  'User-agent: *',
  'Allow: /',
  '',
  'User-agent: Mediapartners-Google',
  'Allow: /',
  '',
  `Sitemap: ${siteUrl}/sitemap.xml`,
  '',
].join('\n'));

console.log(`Generated sitemap.xml with ${routes.length} public URLs for ${siteUrl}.`);
