# AdSense launch checklist

## Content and trust

- [ ] Homepage has no placeholder copy, broken sections, or empty cards.
- [ ] Every guide has a unique title, useful examples, and a working canonical URL.
- [ ] About, Contact, Privacy, Terms, and Content Policy are reachable from the footer.
- [ ] Contact email is monitored.
- [ ] No copied biographies, lyrics, article rewrites, or third-party photo hotlinks remain.
- [ ] Every row in `MEDIA-SOURCE-REVIEW.md` is marked Approved or Removed; none remain Pending.
- [ ] Every optional YouTube item has been opened and reviewed, with channel/uploader and rights basis recorded.
- [ ] Broken, restricted, reuploaded, or rights-unclear embeds have been removed.
- [ ] “No music” is the default and selected music exposes its source link.

## Technical access

- [ ] `npm run audit` succeeds without errors.
- [ ] `npm run audit:prelaunch` succeeds after the media review log is complete.
- [ ] `npm run build` succeeds without errors.
- [ ] The deployed homepage returns HTTP 200.
- [ ] Every route in `sitemap.xml` returns HTTP 200.
- [ ] Directly opening a nested guide URL works.
- [ ] An unknown URL returns the custom page with an actual HTTP 404 status.
- [ ] Route-specific title, description, canonical, and body text are present in page source.
- [ ] The site works on mobile and desktop.
- [ ] JavaScript-disabled page source still contains substantive prerendered content.
- [ ] `robots.txt` permits `Mediapartners-Google`.
- [ ] `ads.txt` is plain text at the domain root and contains the correct publisher ID.
- [ ] HTTPS is valid and there are no redirect loops.

## AdSense connection and consent

- [ ] Domain is added in AdSense.
- [ ] The `google-adsense-account` meta tag is visible in production.
- [ ] Google Privacy & messaging European regulations message is configured and published.
- [ ] Applicable US state regulations messaging, ad-partner, and restricted-data-processing settings have been reviewed.
- [ ] Privacy-options revocation link is tested after the Google message loads.
- [ ] Production sends `Referrer-Policy: strict-origin-when-cross-origin` (or another Google-compatible cross-origin policy).
- [ ] Privacy policy matches the final production providers and settings.
- [ ] `VITE_ADSENSE_ENABLED` remains `false` until approval and slot creation.

## After approval

- [ ] Manual ad units have been created.
- [ ] Real slot IDs are added to production environment variables.
- [ ] Ads are visible only on original informational pages.
- [ ] No ad is adjacent to the study-room controls, buddy selector, source link, or media player.
- [ ] The study room and legal pages have no display-ad placements.
- [ ] Ads are clearly labeled.
- [ ] Layout does not jump when an ad loads.
- [ ] Auto ads are off initially, or page exclusions cover the room and non-content pages.

## Traffic quality

- [ ] Nobody has been asked to click ads.
- [ ] Publisher and team members know not to click live ads.
- [ ] No traffic exchange, bot, paid-to-click, pop-under, or forced redirect source is active.
- [ ] Search Console and AdSense Policy Center are monitored.
