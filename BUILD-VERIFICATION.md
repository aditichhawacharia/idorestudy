# Build and verification report

Date: 2026-08-20  
Project: IdoréStudy professional AdSense rebuild, version 3.0.0

## Verification completed successfully

The following commands completed in this workspace:

```bash
npm run audit
```

That audit performed the checks below.

### Source validation

- Parsed and transpiled 37 JavaScript, JSX, and MJS files.
- Resolved all relative imports through an AST-based import audit.
- Confirmed the app has a separate lazy-loaded study-room route.
- Confirmed public pages do not contain Google Fonts imports or remote celebrity-image hotlinks.
- Confirmed no AdSense import, component, script, or slot appears in `src/pages/StudyCafe.jsx`.
- Confirmed the homepage contains direct links to all 29 buddy rooms.
- Confirmed query-parameter selection opens the requested study buddy.
- Confirmed the About page includes honest publisher, independence, media, editorial, and advertising information.

### Content validation

- 21 long-form study guides are registered in both the full guide data and lightweight index.
- Each guide contains at least 600 words.
- Observed guide lengths ranged from 605 to 877 words after normalization.
- Each guide contains at least five substantive sections, publication and modification dates, and source references.
- The homepage static body contains 1,103 crawlable words.
- Resources and article pages contain visible organizational bylines.
- The catalogue contains 29 study buddies with unique IDs and sources.
- The music catalogue contains 11 optional sources plus the no-music default.
- All 40 active third-party media URLs are present in `MEDIA-SOURCE-REVIEW.md`.

### Route and crawler validation

- Regenerated an XML sitemap with 32 public URLs.
- Produced a temporary static verification build with 32 public routes plus a noindex 404 page.
- Verified every generated route has one main `<h1>`, a unique title no longer than 60 characters, a description no longer than 160 characters, and a canonical URL on `https://idorestudy.app`.
- Verified all internal links resolve to generated routes or public files.
- Verified external new-tab links use safe `rel` attributes.
- Verified the homepage static output includes all 29 direct buddy links and names.
- Verified every guide page includes a byline and source section.
- Verified the HTML sitemap links to every guide.
- Verified the 404 page contains `noindex` metadata.
- Verified the synthetic manifest expects StudyCafe in a separate chunk from the public application entry.

### Files and controls validated

- Root `ads.txt` contains the supplied publisher record.
- `robots.txt` allows public crawling and identifies the production sitemap.
- The ownership meta tag is present.
- Advertising and analytics are disabled by default in `.env.example`.
- Manual ad placement is restricted to Home, Resources, and GuideArticle.
- The study room has no display-ad placement.
- Body text uses a minimum 16px base size on public pages.
- Public navigation, footer navigation, breadcrumbs, policies, HTML sitemap, and contact path are present.

## Expected prelaunch failure

The strict source-review gate currently fails by design:

```bash
npm run audit:prelaunch
```

All 40 media rows remain `Pending`. This is not a code defect. It prevents the project from being represented as launch-ready until a human has reviewed every current YouTube source, recorded the uploader and basis, added a date, and removed rejected sources.

## Production-bundle limitation in this workspace

A full Vite production bundle was attempted but could not be completed here because the environment could not resolve or reach `registry.npmjs.org`. Consequently, dependencies could not be installed, and `vite` was not available locally. The observed build failure was:

```text
sh: 1: vite: not found
```

No claim is made that the final Vite bundle was executed in this workspace. The static route generator and generated-HTML audits did run successfully through the dependency-independent verification path.

Before deployment, run this in a normal networked Node.js 20+ environment:

```bash
npm install
npm run check
```

After completing the media review, run:

```bash
npm run check:prelaunch
```

Then serve `dist/` locally and complete the browser, mobile, live-link, PageSpeed, Search Console, consent, and HTTP-status checks in `ADSENSE-LAUNCH-CHECKLIST.md`.

## Visual review performed

The current static homepage and About page were rendered from the generated HTML with a print renderer for a basic layout inspection. The public design presented a restrained editorial hierarchy, visible K-pop positioning, direct study-room calls to action, readable typography, publisher information, and a consistent navigation/footer system. A real browser review at common desktop and mobile widths is still required after the production Vite bundle is available.
