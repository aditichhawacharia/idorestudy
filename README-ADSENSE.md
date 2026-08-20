# IdoréStudy — AdSense-ready rebuild

This folder is a production-oriented rebuild of the uploaded React site. It preserves the interactive study room while moving it to `/study` and making the public homepage, study-guide library, legal pages, navigation, and technical files much stronger for users, search crawlers, and an AdSense site review.

No code change can guarantee approval. Google reviews the deployed site, traffic quality, policy compliance, ownership, regional consent setup, and the actual media available at review time. This rebuild removes several avoidable risks and creates a defensible publisher-content structure.

## What changed

- `/` is now a substantial, original homepage instead of only an immersive media selector.
- The original room is preserved at `/study` and remains free of display-ad placements.
- Seven long-form, original study guides live under `/resources/:slug`.
- A session planner writes compatible timer settings to the existing localStorage key and opens the study room.
- Third-party artist-photo hotlinks were removed. Study buddies now use original text-and-color identity cards.
- YouTube embeds use `youtube-nocookie.com` where supported and load only after a user chooses a room. Background music is opt-in, with “No music” selected by default.
- Each active room links to the selected study-video source, and the music menu links to the selected music source.
- Unsolicited notification permission requests were removed; permission is requested only after the user presses the timer control.
- Privacy, terms, contact, about, content/takedown, 404, navigation, and footer content were rewritten for clarity and consistency.
- A custom cookie banner is not used as a substitute for a certified consent management platform.
- The footer and privacy-page settings buttons can load the approved publisher tag on demand and call Google’s consent-revocation flow after advertising is enabled.
- AdSense code is feature-gated and disabled by default. Only manual, labeled placements are coded, and they appear only on substantive editorial pages.
- `ads.txt`, `robots.txt`, `sitemap.xml`, verification-token files, security headers, a manifest, favicon, Open Graph image, canonical tags, route metadata, and structured data are included.
- The build creates crawlable static HTML for every public route and guide, then loads the normal React app in the browser.
- `npm run audit` checks guide depth, routes, crawler files, ad isolation, source links, hotlinks, and other launch invariants.

## Install and build

```bash
npm install
npm run audit
npm run build
```

`npm run check` runs both the audit and production build.

After every media row has been reviewed and marked **Approved** or **Removed**, run the stricter launch gate:

```bash
npm run check:prelaunch
```

That command deliberately fails while any source is still Pending, lacks a channel/rights basis, or lacks a review date.

The production output is written to `dist/`. The build performs two steps:

1. Vite bundles the React app.
2. `scripts/prerender.mjs` creates route-specific HTML for the homepage, study room lobby, guide library, all guide articles, and trust/policy pages.

For local development:

```bash
npm run dev
```

## Environment variables

Copy `.env.example` to `.env.production` only when you are ready to configure advertising.

```dotenv
VITE_ADSENSE_ENABLED=false
VITE_ADSENSE_CLIENT=ca-pub-8850994665004292
VITE_ADSENSE_HOME_SLOT=
VITE_ADSENSE_RESOURCES_SLOT=
VITE_ADSENSE_GUIDE_SLOT=
```

The publisher ID is already present in the AdSense ownership meta tag and `public/ads.txt`.

### Before approval

Keep `VITE_ADSENSE_ENABLED=false`. The ownership meta tag is sufficient for the AdSense “connect your site” meta-tag method. This avoids showing empty or prematurely configured ad units during review.

### After approval

1. Create manual responsive display units in AdSense.
2. Put the slot IDs in the three slot variables.
3. Set `VITE_ADSENSE_ENABLED=true`.
4. Rebuild and redeploy.
5. Confirm every visible placement is labeled “Advertisement,” does not overlap content, and is not close enough to navigation or controls to invite accidental clicks.

The coded placements are deliberately limited:

- Homepage: after multiple original sections.
- Guide index: after the complete guide grid.
- Article: after several substantial sections.
- No placements: `/study`, `/privacy`, `/terms`, `/content-policy`, `/contact`, `/about`, or 404 pages.

If Auto ads are enabled later, create page exclusions for at least `/study`, all legal pages, `/contact`, and 404/error routes. Manual ads are the safer initial configuration because the study room has many controls and third-party media.

## Required AdSense dashboard work

The repository cannot perform these account-side actions:

1. Add `https://idorestudy.com` in AdSense and choose the meta-tag verification method.
2. Confirm that the deployed `<head>` contains:

   ```html
   <meta name="google-adsense-account" content="ca-pub-8850994665004292">
   ```

3. In AdSense **Privacy & messaging**, create and publish a **European regulations** message using a Google-certified CMP. Configure consent choices and the privacy-options revocation link.
4. Review the **US state regulations** message and restricted-data-processing settings for the states and traffic that apply to the site.
5. Keep the deployed `Referrer-Policy` at `strict-origin` or `strict-origin-when-cross-origin`; the included host configurations use `strict-origin-when-cross-origin`, which is compatible with Google Privacy & messaging.
6. Review the privacy policy after selecting the final hosting, analytics, consent, and advertising settings.
7. Request site review only after every URL below returns a public HTTP 200 response and contains finished content.

Google’s current references:

- Connect a site: https://support.google.com/adsense/answer/12169212
- Create a European regulations message: https://support.google.com/adsense/answer/10960768
- Create a US state regulations message: https://support.google.com/adsense/answer/10960771
- Google-certified CMP requirements: https://support.google.com/adsense/answer/13554116
- Authorized digital sellers (`ads.txt`): https://support.google.com/adsense/answer/7532444
- Google Publisher Policies: https://support.google.com/publisherpolicies/answer/10502938

## Deployment checks

Verify these exact public URLs after deployment:

```text
https://idorestudy.com/
https://idorestudy.com/study
https://idorestudy.com/resources
https://idorestudy.com/about
https://idorestudy.com/contact
https://idorestudy.com/privacy
https://idorestudy.com/terms
https://idorestudy.com/content-policy
https://idorestudy.com/ads.txt
https://idorestudy.com/robots.txt
https://idorestudy.com/sitemap.xml
```

Also open every guide URL listed in the sitemap. Test with JavaScript disabled to confirm the prerendered text remains visible.

### Netlify

Publish `dist/`. `public/_redirects` and `public/_headers` are copied into the build automatically. Netlify serves each generated route from its real `route/index.html` file; unknown paths are sent to `404.html` with an HTTP 404 status instead of being disguised as the homepage.

### Vercel

Set the build command to `npm run build` and output directory to `dist`. `vercel.json` supplies the security headers. Because the build creates actual `route/index.html` files, known routes do not depend on a broad SPA rewrite.

### Other static hosts

Configure directory-index serving and use `dist/404.html` with an actual HTTP 404 status for unknown URLs. Every known public route is generated as static HTML, so a broad `/* -> /index.html 200` SPA fallback is unnecessary and can create crawler-visible soft 404s. Do not redirect `ads.txt`, `robots.txt`, `sitemap.xml`, or verification files to the React application.

## Content and media review before applying

The most important manual risk is the optional media catalogue.

- Complete every row in `MEDIA-SOURCE-REVIEW.md`; no row should remain `Pending`.
- Open every study-buddy and music video in a private browser window.
- Confirm embedding is allowed and playback works on the production domain.
- Remove videos that are unavailable, age-restricted, misleadingly labeled, or sourced from an uploader you are not comfortable featuring.
- Prefer official artist, label, broadcaster, or clearly authorized study-channel uploads when possible.
- Keep the source link visible in every room.
- Process good-faith correction or takedown requests promptly.
- Do not add copied artist biographies, lyrics, news rewrites, photo galleries, or pages created only to rank for a celebrity name.

Embedding does not automatically establish that a page has enough original publisher value. The content-rich pages and original utilities should remain the primary monetized surfaces.

## Search and crawler setup

1. Add the domain property in Google Search Console.
2. Submit `https://idorestudy.com/sitemap.xml`.
3. Inspect the homepage, resources page, two or three guides, and `/study`.
4. Confirm the rendered HTML contains the correct title, canonical, main heading, and body copy.
5. Check that `robots.txt` permits both general crawlers and `Mediapartners-Google`.
6. Keep policy pages linked from every public content page.
7. Do not use a `noindex` header or password protection on pages submitted for review.

The active room view is intentionally `noindex` because its state is user-specific and media-heavy. The public `/study` lobby remains indexable and prerendered.

## Traffic and invalid-click safeguards

- Never click your own ads, including during testing.
- Do not ask friends, followers, or visitors to click ads to support the site.
- Avoid paid-to-click, traffic-exchange, bot, pop-under, forced-redirect, or misleading-notification traffic.
- Keep ad styling visually distinct from buddy cards, timer buttons, source links, and navigation.
- Do not place ads over video, under draggable widgets, or in a way that moves controls after load.
- Monitor AdSense Policy Center and invalid-traffic warnings after launch.

## Privacy and legal notes

The supplied privacy and terms pages are careful operational drafts, not legal advice. Update them when the production hosting provider, analytics service, consent message, retention settings, or business entity changes. Do not state that a service is used until it is actually configured.

The code intentionally removes the uploaded `CookieConsent` component. A home-built accept/reject banner is not enough for Google’s EEA/UK/Switzerland publisher consent requirement; publish a Google-certified CMP message in the AdSense account instead.

## Files worth reviewing first

- `src/pages/StudyCafe.jsx` — preserved and hardened study room.
- `src/data/guides.js` — original article content.
- `src/components/AdSlot.jsx` — gated manual ad implementation.
- `src/pages/PrivacyPolicy.jsx` — conditional and production-aware disclosures.
- `src/pages/ContentPolicy.jsx` — media, correction, and takedown workflow.
- `scripts/prerender.mjs` — static crawler-readable route generation.
- `scripts/content-audit.mjs` — repeatable content and policy-structure checks.
- `scripts/prelaunch-audit.mjs` — intentional launch blocker until all optional media has been reviewed.
- `MEDIA-SOURCE-REVIEW.md` — required rights/source review log for every optional embed.
- `public/ads.txt`, `public/robots.txt`, `public/sitemap.xml` — crawler and publisher files.

## Approval reality

This rebuild materially improves originality, navigation, transparency, crawlability, ad placement, and consent readiness. Approval can still be denied for reasons outside the repository, including thin real-world traffic, domain history, account issues, unavailable media, policy findings, incomplete CMP setup, invalid traffic, or a reviewer concluding that the third-party media is still too central. Treat the media catalogue as an ongoing editorial responsibility, not a one-time technical check.
