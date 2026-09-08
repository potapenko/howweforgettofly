# Site analytics

**Status:** Active, revision 2, 2026-09-08.
**Contract:** `reader.analytics@2`.

## Goal and authority

The user requested a separate Google Analytics property and approved creation,
site integration, checkpoint, publication, and verification on 2026-09-08.
This Evolve change replaces only the former blanket analytics prohibition in
the reading and deployment contracts. All other reading, editorial, motion,
and no-assessment boundaries remain protected.

## Scope and configuration

- `ANALYTICS.PRODUCTION`: GA4 loads asynchronously only on HTTPS
  `howweforgettofly.com` and `www.howweforgettofly.com`. Local development,
  previews on other hosts, and tests send no production traffic by default.
- Property: **How We Forget to Fly** (`553157940`) in account `56061701`;
  web stream: **How We Forget to Fly — Web** (`15739741989`),
  `https://howweforgettofly.com`;
  measurement ID: `G-JFXJP3SZ0F`. Reporting region is Montenegro, currency EUR.
- `ANALYTICS.VIEWS`: send one `page_view` on entry to `/` or `/ru/` and on
  switching between these editions, including back/forward navigation.
  Hash-only chapter movement, query-only changes, and React effect replay
  must not duplicate page views. Legacy redirects count the canonical landing
  page; unknown routes are not reported as reading pages.
- Disable automatic initial `page_view` in the tag and history-based page
  views in the stream. The application owns canonical reading page views.
- Standard GA4 session/engagement measurement, enhanced scrolls, and outbound
  clicks are enabled. Enhanced site search, forms, video, and downloads are
  disabled because they do not belong to this reading experience.

## Data boundaries and non-goals

- `ANALYTICS.DATA`: no user IDs, account information, authored prose, answers,
  scene beat progress, assessments, custom profiles, or application database.
- Explicit page-view URLs and referrers omit query strings and fragments;
  titles identify the EN/RU edition, not the current chapter.
- Google may use its standard first-party analytics cookies for measurement.
  Google Signals and advertising personalization are disabled in tag config;
  no Ads links, advertising features, or custom marketing events are added.
- The user's follow-up publication instruction accepts the proposed narrow
  Atlas heading correction: “The book evaluates no one.” / “Книга никого не
  оценивает.” This removes the now-inaccurate no-collection promise. All other
  copy remains protected; no new reading UI, general rewrite, animation change,
  or consent UI is included. This contract does not assert legal compliance
  or treat analytics as necessary for reading.

## Failure policy and protected behavior

- `ANALYTICS.FAILURE`: unavailable Google services, blocked scripts, or an
  analytics initialization failure must not prevent the app from rendering,
  navigating, switching language, or controlling motion.
- The tag is initialized once per document. Loading it never blocks rendering.
- Except for the two explicitly allowed Atlas heading strings, existing EN/RU
  text, chapter order, motion, hydration, and static deployment remain unchanged.
  Scene-local progress never becomes analytics input.

## Verification mapping

- Focused `src/analytics/` tests: production host gate, canonical paths,
  locale changes/back navigation, hash/query deduplication, effect replay,
  sanitized URLs, blocked tag/initialization failure, and single initialization.
- `npm run check`: mandatory typecheck, suite, production and SEO build.
- Real browser: reading still works; deployed bundle contains this ID; verify
  page-view delivery for both languages and visible receipt in GA4 Realtime
  or DebugView. Do not claim receipt from a successful build alone.

## Dependencies and compatibility

Requires [continuous-bilingual-reading.md](continuous-bilingual-reading.md)
revision 2 and [deployment-and-release.md](deployment-and-release.md) revision 2.
This is an explicitly approved addition of third-party traffic measurement;
the existing no-analytics behavior is changed only within this contract.

## Unknowns requiring confirmation

None. The requested Atlas correction and publication were approved on
2026-09-08. Its editorial contract is revision 2.
