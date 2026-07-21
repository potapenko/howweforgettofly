# Editorial independence and final colophon

**Status:** Active, first pass 2026-07-20.

## Goal

Keep the public work an independent bilingual poetic manifesto while preserving
the approved EN/RU copy, ethical boundaries, and a narrow, warm source
acknowledgment at the end of the completed journey.

## Scope

- rendered EN/RU editorial content, headings, navigation labels, metadata, and
  accessible text;
- the public source-reference allowlist and final scene/end matter;
- separation of internal provenance from the deployed product.

## Non-goals

- a general rewrite, simplification, literal translation, or academic defense
  of the work;
- deleting or publishing internal provenance records;
- adding promotional source material, calls to action, or source navigation.

## User-visible behavior

- EN and RU are parallel authored editions: they preserve meaning, rhythm,
  ambiguity, and emotional temperature without needing literal sentence parity.
- The work remains a living book and open myth. Its carrying language includes
  Flight, Sky, Wind, Ground, Maps, Compass, Call, Lift, Making, Return, and
  Gravity, while ethical boundaries remain explicit.
- The page concludes with Final Sky and exactly one visually subordinate,
  non-interactive colophon. In a warm first-person authorial voice, it names
  the book and authors as the source of inspiration.
- Outside that bottom colophon, public rendered copy, navigation, metadata, and
  accessibility text do not mention the source book, authors, title, URL,
  adaptation, translation, inspiration, provenance, or source boundary.
- Responsive illustration layouts do not introduce separately titled
  interpretive companion panels such as `What the illustration holds` / `Что
  показывает иллюстрация`. Removing those standalone panels in both locales
  and at every viewport is a narrow presentation correction, not permission
  to rewrite the approved chapter prose, scene title, premise, beat narration,
  metadata, reviewed non-visual alternative, or authored text that belongs
  inside the paper composition.
- The public document head exposes a large-image Open Graph and Twitter Card
  preview for link sharing. It uses the approved opening-book cover artwork,
  the independent project title and description, and an absolute HTTPS image
  URL under `howweforgettofly.com` so crawlers can render it without executing
  JavaScript.
- Each canonical locale root exposes its own localized, crawler-readable
  document head in the static HTML. It includes a concise title and description,
  a self-referencing canonical URL, reciprocal EN/RU/x-default language links,
  index and rich-preview directives, and social metadata that agrees with the
  visible edition. Search and social crawlers must not need JavaScript to see it.
- The domain root exposes truthful `WebSite` structured data for the public
  project identity. `robots.txt` and the XML sitemap expose only the canonical
  public locale roots and do not turn anchored chapters into separate pages.
- Internal materials in `docs/source/` and `docs/governance/` never enter the
  public runtime artifact.

## Invariants

- Approved rendered EN/RU copy is the golden master except for explicitly
  authorized editorial work and the removal of the standalone explanatory
  panels named above.
- Flight is situated authorship, not human rank; Ground includes care, limits,
  craft, obligation, repair, routine, and rest.
- AI is Wind, not pilot, moral authority, or a replacement for consent, care,
  direction, human worth, or responsibility. Children are never optimization
  projects.
- Social-preview metadata and image alternative text remain source-independent,
  and the preview image is included in the static production artifact at the
  declared dimensions.
- Search metadata and structured data describe only content a visitor can
  actually read. They contain no source traces, keyword stuffing, hidden copy,
  invented claims, or legacy `meta keywords`.
- EN and RU metadata are parallel authored summaries of their editions. Their
  canonical and language-alternate URLs remain internally consistent across
  HTML, Open Graph, structured data, and the sitemap.

## Edge cases and failure policy

- If a suspected close paraphrase or source-dependent line appears outside the
  allowlist, report it for editorial decision; do not silently rewrite approved
  copy.
- If a source trace appears through metadata or accessibility text, remove it
  unless it is the authorized colophon.
- If EN/RU differ in exact form, preserve each edition's authored cadence and
  require an editorial decision before treating the difference as a defect.
- If a canonical locale URL cannot return the matching localized static head,
  fail verification rather than relying on a client-side metadata mutation.

## Route / state / data implications

- The final colophon is end matter, not a route, card, CTA, recommendation,
  link, or interactive disclosure.
- No public data contract may expose internal provenance documents.

## Verification mapping

- `src/App.test.tsx`, `src/routes/FinalSkyPage.test.tsx`, and
  `src/routes/ManifestoPage.test.tsx`
- `docs/product/PUBLIC_SOURCE_COLOPHON_PLAN.md` and
  `docs/reports/PUBLIC_SOURCE_COLOPHON_REPORT.md`
- scoped rendered-copy, metadata, accessibility, navigation, and test search;
  production EN/RU HTML inspection with ordinary and crawler user agents;
  `robots.txt` and sitemap validation; `npm run check`.

## Unknowns requiring confirmation

None for preservation work. Any desired editorial re-authoring requires an
explicitly approved new or amended spec.
