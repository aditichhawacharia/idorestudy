# Rebuild summary

## Structure

- Moved the interactive experience from `/` to `/study`.
- Added a crawlable original-content homepage and seven article routes.
- Added route-specific prerendering.

## Study room

- Preserved timer, timer presets, local settings, to-do list, music controls, café effects, study-buddy switching, draggable timer, and completion notifications.
- Replaced third-party artist image hotlinks with original generated identity cards.
- Changed embeds to the YouTube privacy-enhanced domain.
- Added separate source links for the selected study video and selected music.
- Added an opt-in “No music” default so a second media player is not loaded automatically.
- Made notification permission user-initiated.
- Kept the room free of display ads.
- Improved narrow-screen room behavior: compact top controls, a non-overlapping timer start position, mobile-minimized timer/menu defaults, responsive dialogs, and a repositioned task widget.

## Monetization controls

- Added disabled-by-default manual AdSense slots.
- Added publisher ownership meta tag and root `ads.txt`.
- Added guidance for Google Privacy & messaging rather than relying on the old custom banner.
- Added a shared publisher-script loader so the sitewide privacy-settings link can call Google’s revocation flow after advertising is enabled.

## Trust and discoverability

- Rewrote About, Contact, Privacy, Terms, 404, and footer/navigation.
- Added a content/copyright/takedown policy.
- Added structured data, canonical tags, metadata, sitemap, crawler rules, social image, manifest, and security headers.
- Added route-level static HTML and a real 404 fallback so unknown URLs are not presented as homepage content.
- Added a repeatable content audit and a 40-item third-party media review log.
- Added a stricter prelaunch audit that blocks launch while any media source remains Pending or undocumented.
