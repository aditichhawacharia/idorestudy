# IdoréStudy version 3 rebuild summary

## Professional public identity

- Replaced the overly decorative public-page style with a neutral editorial design system.
- Removed public Google Fonts requests and switched to system UI fonts with Georgia headings.
- Standardized navigation, footer, buttons, cards, forms, policy pages, and article layouts.
- Increased base readability with 16px body text, stronger contrast, and more consistent spacing.
- Kept the study room colorful and immersive rather than flattening the product’s main K-pop appeal.

## Direct K-pop homepage flow

- Made “K-pop study room” explicit in the brand, navigation, metadata, hero, FAQ, and footer.
- Added a hero quick-start panel with direct selected-room links.
- Added the complete 29-buddy catalogue to the homepage.
- Added idol/group search and group filtering.
- Changed every buddy card to open `/study?buddy=<id>` immediately.
- Added query-parameter support in the study room so homepage selection is preserved.
- Added plain “Choose a buddy” calls to action throughout public pages.

## Original content and trust

- Expanded the resource library from 7 to 21 long-form study guides.
- Added visible bylines, publication dates, update dates, practical examples, and source sections.
- Added publisher information and an honest description of experience and limitations.
- Added Editorial Policy, Educational Disclaimer, Content/Takedown Policy, and HTML Sitemap pages.
- Rewrote About, Contact, Privacy, Terms, Resources, article, 404, navigation, and footer content.
- Added breadcrumbs, comprehensive footer navigation, internal related-content links, and correction routes.

## Study room

- Preserved the timer, custom presets, local task list, progress tracking, optional music, café decorations, room switching, draggable timer, minimization, sounds, and notifications.
- Kept the selected room free of display ads.
- Added direct query selection and URL updates while switching buddies.
- Replaced remote celebrity photos with original text-and-color identity artwork.
- Made “No music” the default.
- Used YouTube’s privacy-enhanced embed domain.
- Kept source links visible for selected study and music media.
- Made notification permission user-initiated.
- Improved narrow-screen timer, menu, task-widget, and dialog behavior.
- Corrected public catalogue presentation for Heeseung, SHINee, and (G)I-DLE.

## AdSense and privacy controls

- Kept the publisher ownership meta tag and root `ads.txt` record.
- Added environment-gated manual ad slots that are disabled by default.
- Limited slots to substantive Home, Resources, and GuideArticle pages.
- Added reserved ad space and visible Advertisement labels.
- Excluded the study room, trust pages, legal pages, sitemap, and 404 from coded display ads.
- Removed the custom cookie banner as a claimed substitute for a certified CMP.
- Added account-side CMP instructions and a footer privacy-choice action for the enabled Google message.
- Added optional, disabled-by-default analytics with denied consent defaults.

## SEO, crawlability, and performance architecture

- Lazy-loaded every route and isolated the large StudyCafe route.
- Added 32 sitemap routes: 11 fixed routes plus 21 guides.
- Added route-specific static HTML, titles, descriptions, canonical URLs, Open Graph data, and structured data.
- Added Article, CollectionPage, AboutPage, Organization, FAQ, WebApplication, and ItemList schema where appropriate.
- Added a real noindex 404 document and host rules intended to avoid soft 404s.
- Added a manifest, favicon, social image, security headers, crawler files, and verification files.
- Removed public remote artist-image downloads and render-blocking external font stylesheets.

## Verification tooling

- Added source syntax and import auditing.
- Expanded the content audit for 21 guides, 29 buddies, 11 optional music sources, trust signals, direct room links, routes, sitemap, ad isolation, and hotlinks.
- Added dependency-independent static route verification.
- Added generated HTML and internal-link auditing.
- Updated the strict prelaunch gate to compare all active media sources with the manual review log.
- Kept the launch gate intentionally blocked while any of the 40 sources remains Pending.
