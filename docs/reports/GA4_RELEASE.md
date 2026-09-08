# GA4 release — 2026-09-08

Status: Released and verified.

## Released behavior

Implementation revision: `8e17f62` (includes analytics checkpoint `2074cb9`).
Production: `https://howweforgettofly.com/` and `/ru/`.
Property `553157940`, stream `15739741989`, measurement ID `G-JFXJP3SZ0F`.

Contract baseline: `reader.analytics@2` in
[`site-analytics.md`](../specs/features/site-analytics.md), reading revision 2,
deployment revision 2, and editorial revision 2. This authorized release adds
production GA4 measurement and changes exactly the two Atlas contract headings
to “The book evaluates no one.” / “Книга никого не оценивает.”

## Acceptance

- `npm run check`: typecheck, all 174 tests, production build, and EN/RU SEO
  artifact verification passed.
- Both production locale roots returned HTTP 200 and referenced
  `main-3VWDeT4g.js`; its bytes matched the tested local build.
- On the deployed site, the Google tag loaded with HTTP 200. The collector
  accepted EN and RU `page_view` requests for `G-JFXJP3SZ0F` with HTTP 204.
- The browser flow EN → Parents anchor → RU sent one page view per edition;
  chapter movement did not add a view. Application console had no errors or
  warnings in this flow. Local preview loaded no Google tag.
- Safari GA4 Realtime displayed one active test visitor, both EN/RU titles,
  three page views (initial EN, deliberate EN reload, RU switch), first_visit,
  and session_start. This establishes receipt beyond the request queue.
- Safari desktop and responsive 390×844: the corrected Russian heading was
  visible and readable. EN/RU switching also passed in Safari and the in-app
  Chromium browser; the in-app narrow viewport rendered the corrected heading.
- Stream settings were reopened and verified: history-based automatic page
  views off; scrolls/outbound clicks on; search/forms/video/downloads off.

## Preservation and limits

Only the two allowed Atlas strings changed in editorial implementation;
navigation, scene assets, motion, and remaining copy were preserved. Existing
uncommitted motion-contract changes were excluded from the checkpoints.

Ordinary aggregate reports may lag Realtime. Browser privacy settings or
content blockers can suppress analytics; reading does not depend on the tag.
No raw network logs, visitor identifiers, cookies, or screenshots are retained
in this release record. No legal-compliance conclusion is claimed.
