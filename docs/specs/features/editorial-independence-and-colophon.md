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
- Internal materials in `docs/source/` and `docs/governance/` never enter the
  public runtime artifact.

## Invariants

- Approved rendered EN/RU copy is the golden master except for explicitly
  authorized editorial work.
- Flight is situated authorship, not human rank; Ground includes care, limits,
  craft, obligation, repair, routine, and rest.
- AI is Wind, not pilot, moral authority, or a replacement for consent, care,
  direction, human worth, or responsibility. Children are never optimization
  projects.

## Edge cases and failure policy

- If a suspected close paraphrase or source-dependent line appears outside the
  allowlist, report it for editorial decision; do not silently rewrite approved
  copy.
- If a source trace appears through metadata or accessibility text, remove it
  unless it is the authorized colophon.
- If EN/RU differ in exact form, preserve each edition's authored cadence and
  require an editorial decision before treating the difference as a defect.

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
  `npm run check`.

## Unknowns requiring confirmation

None for preservation work. Any desired editorial re-authoring requires an
explicitly approved new or amended spec.
