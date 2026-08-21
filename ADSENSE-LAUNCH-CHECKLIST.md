# IdoréStudy AdSense launch checklist

Use this checklist in order. Do not request AdSense review from an old preview deployment while the final domain, content, consent settings, or media catalogue are still changing.

## 1. Source and editorial review

- [ ] The homepage clearly says “K-pop study room” above the fold.
- [ ] The hero quick-start links open the selected buddy room.
- [ ] Every one of the 29 homepage buddy cards opens `/study?buddy=<id>` correctly.
- [ ] The study-room lobby and selected-room views work on desktop and mobile.
- [ ] Timer, task list, buddy switching, optional music, source links, and café controls work.
- [ ] The study room contains no display-ad placement.
- [ ] All 21 guides have been read by a human editor for accuracy, usefulness, repetition, grammar, and source fit.
- [ ] No article contains invented credentials, fabricated experience, copied passages, lyrics, or unsupported claims.
- [ ] About, Editorial Policy, Disclaimer, Content Policy, Contact, Privacy, and Terms accurately describe the deployed site.
- [ ] The public contact email is monitored.

## 2. Required third-party media review

- [ ] Every active row in `MEDIA-SOURCE-REVIEW.md` is marked **Approved** or **Removed**.
- [ ] Every approved row has a current uploader/channel name, review basis, and ISO review date.
- [ ] Every source opens in a private browser window.
- [ ] Every source permits embedding and plays on the production domain.
- [ ] No active source is deleted, private, age-restricted, misleadingly titled, region-blocked for the intended audience, or rights-unclear.
- [ ] Official artist, label, broadcaster, publisher, or clearly authorized sources are preferred where available.
- [ ] Every removed buddy source is deleted or replaced in `src/data/studyBuddies.js`.
- [ ] Every removed music source is deleted or replaced in `src/data/musicOptions.js`.
- [ ] The review log is updated after each data change.
- [ ] `npm run audit:prelaunch` passes.

## 3. Build verification

Run in a normal networked Node.js 20+ environment:

```bash
npm install
npm run check
```

Then run the stricter gate after the media review:

```bash
npm run check:prelaunch
```

- [ ] Dependency installation completes without warnings that block the build.
- [ ] Source syntax and import audit passes.
- [ ] Content audit passes.
- [ ] Static route audit passes.
- [ ] Vite production bundle completes.
- [ ] Route-specific prerender completes.
- [ ] Generated link audit passes.
- [ ] `dist/` contains the homepage, 21 guide routes, fixed public routes, and `404.html`.
- [ ] No source map, secret, development environment file, or `node_modules` folder is published unintentionally.

## 4. Production-domain checks

- [ ] `VITE_SITE_URL` is the exact production origin without a trailing slash.
- [ ] HTTPS is valid with no mixed content.
- [ ] The HTTP version redirects to HTTPS.
- [ ] The `www` and apex versions resolve consistently.
- [ ] Every canonical points to the production domain rather than Vercel preview URLs.
- [ ] `/ads.txt` returns plain text with HTTP 200.
- [ ] `/robots.txt` returns plain text with HTTP 200.
- [ ] `/sitemap.xml` returns XML with HTTP 200.
- [ ] Verification-token files return their literal token rather than application HTML.
- [ ] Every sitemap URL returns finished content with HTTP 200.
- [ ] A random unknown URL returns the custom 404 with an actual HTTP 404 status.
- [ ] No key route is hidden behind authentication, a maintenance page, or a geographic block.
- [ ] JavaScript-disabled inspection still shows the meaningful prerendered text on public pages.

## 5. Navigation and user experience

- [ ] Home, Study room, Study guides, and About are visible in the primary navigation.
- [ ] “Choose a buddy” returns users to the selector from any public page.
- [ ] Footer links reach all trust, legal, editorial, and sitemap pages.
- [ ] Breadcrumbs work on content and article pages.
- [ ] There are no broken internal or external links.
- [ ] External links that open a new tab use `rel="noopener noreferrer"`.
- [ ] Keyboard navigation reaches menus, filters, buddy cards, timer controls, dialogs, and the task list.
- [ ] Focus indicators are visible.
- [ ] Body text remains readable at 200% zoom.
- [ ] Mobile layouts do not overlap timer controls, task controls, or the bottom menu.
- [ ] No popup or interstitial blocks the main content.

## 6. Search and indexing

- [ ] A Google Search Console domain property has been verified.
- [ ] The production sitemap has been submitted.
- [ ] Homepage, Study room lobby, Resources, About, and several complete guides have been inspected with URL Inspection.
- [ ] Core pages are eligible for indexing.
- [ ] The selected interactive room remains noindex while the public study lobby is indexable.
- [ ] Search results do not expose stale `.vercel.app` pages as the preferred canonical.
- [ ] A site search after indexing shows multiple substantial pages, not only the homepage.

## 7. Live performance

Run PageSpeed Insights on the production homepage, Resources page, one guide, and `/study` on both mobile and desktop.

- [ ] Largest Contentful Paint is under 2.5 seconds at the 75th percentile where field data is available.
- [ ] Cumulative Layout Shift is under 0.1.
- [ ] Interaction to Next Paint is under 200 milliseconds.
- [ ] The public homepage does not download the study-room JavaScript before it is needed.
- [ ] No public page requests remote celebrity photos.
- [ ] No public page depends on a render-blocking external font stylesheet.
- [ ] Images include intrinsic dimensions and appropriate alternatives.
- [ ] Ad containers reserve space before ad loading.
- [ ] Compression and long-lived caching work for hashed static assets.

## 8. Privacy, analytics, and consent

Before approval:

- [ ] `VITE_ADSENSE_ENABLED=false`.
- [ ] Ad slot variables are empty.
- [ ] Analytics remains disabled unless a real property and consent flow are configured.
- [ ] The privacy policy matches the services actually enabled.

Before serving Google ads:

- [ ] The site is connected and verified in AdSense.
- [ ] The applicable Google-certified CMP message has been created and published in AdSense Privacy & messaging for EEA, UK, and Swiss traffic.
- [ ] Applicable US-state privacy settings have been reviewed and configured.
- [ ] The footer privacy-settings action successfully opens the available consent-revocation interface.
- [ ] No nonessential ad or analytics storage is granted before the applicable user choice.
- [ ] Production sends an appropriate referrer policy and the consent message appears on the final domain.

## 9. Ad activation after approval

- [ ] Manual responsive units have been created in AdSense.
- [ ] Real slot IDs are added to the production environment variables.
- [ ] `VITE_ADSENSE_ENABLED=true` only after approval and consent setup.
- [ ] Homepage ads appear only after substantial original content.
- [ ] Resources ads appear outside the guide controls and complete library grid.
- [ ] Article ads appear after substantive sections rather than before the main answer.
- [ ] Every placement is visibly labeled “Advertisement.”
- [ ] Ads do not resemble navigation, buddy cards, play controls, timer controls, download buttons, or source links.
- [ ] Ads are absent from `/study`, About, Contact, Privacy, Terms, policies, Disclaimer, Sitemap, and 404 pages.
- [ ] Auto ads are off initially, or page exclusions cover every interactive and non-content route.
- [ ] The layout does not jump or overlap when an ad is slow, empty, or blocked.

## 10. Traffic quality and ongoing maintenance

- [ ] Nobody is asked or rewarded to click ads.
- [ ] The publisher does not click live ads.
- [ ] No bot, traffic exchange, pop-under, forced redirect, paid-to-click, or misleading acquisition source is used.
- [ ] Search Console, PageSpeed, uptime, broken links, and the AdSense Policy Center are monitored.
- [ ] Media availability is rechecked regularly.
- [ ] Correction and takedown requests are handled promptly.
- [ ] New guides are created for real reader problems rather than arbitrary word-count or keyword targets.
- [ ] Privacy and terms are updated when providers or data practices change.

## Important limitation

The source changes address the uploaded audit’s crawlable-content, byline, navigation, design, trust-page, and performance-architecture findings. Domain age, backlinks, actual organic traffic, live field performance, account standing, and Google’s final review decision cannot be fixed or guaranteed inside a ZIP file.
