# Continuous bilingual reading

**Status:** Active, revision 3, 2026-09-10.

## Goal

Present How We Forget to Fly as one continuous, accessible bilingual reading
experience rather than a collection of products, exercises, or separate apps.

## Scope

- canonical EN and RU book roots, anchored chapters, and legacy-route handling;
- chapter order, persistent reading controls, language continuity, and
  interaction/accessibility expectations;
- the boundary against data collection and interactive workbench mechanics.

## Non-goals

- editorial wording beyond the separate editorial contract;
- visual scene anatomy beyond the illustrated-story contract;
- new practices, profiles, accounts, saved state, or data collection.

## User-visible behavior

- `/` presents English and `/ru/` presents Russian as one long-form page in the
  order Cover, Manifesto, Parents, Adults, AI as Wind, Atlas, Final Sky. The
  legacy slashless `/ru` entry normalizes to `/ru/` without losing a chapter
  fragment.
- Primary navigation moves through stable in-page chapter anchors. Existing
  legacy book destinations redirect to their canonical anchors when an
  equivalent section exists; unknown destinations show a useful not-found view.
- From the first screen and throughout reading, the header offers chapter
  navigation, a motion control, EN/RU selection, and the canonical X, Patreon,
  and GitHub project links. Desktop social links may be icon-only; the mobile
  menu supplies localized labels.
- Switching language retains the nearest semantic reading location where a
  matching anchor exists. Direct hash visits leave the header usable.
- Meaningful controls and content use semantic HTML and work with keyboard,
  pointer, and touch. A skip route reaches the reading content.
- The work contains no forms, questionnaires, accounts, profiles, saved
  histories, live AI calls, or hidden assessment behavior. The user-approved
  production traffic analytics exception is governed by
  [site-analytics.md](site-analytics.md).

## Invariants

- There is one main reading journey, not a route-per-product experience.
- Flight never becomes a score, identity class, or required progression; Ground
  is not failure.
- Visitors can read, navigate, change locale, reduce motion, or leave without
  providing personal information.

## Edge cases and failure policy

- A malformed or unsupported legacy path must not invent a destination.
- Hash and locale changes must preserve a valid, reachable reading position;
  falling back to the beginning is preferable to a broken or hidden section.
- A menu closes after its navigation action and remains operable by keyboard.

## Route / state / data implications

- Canonical public roots are `/` and `/ru/`; chapter location is represented by
  stable URL fragments, not visitor profiles or persisted reading records.
- Locale derives from the path. Motion preference may be locally controlled
  for the current view but must not alter editorial meaning.

## Verification mapping

- `src/App.test.tsx`
- `src/navigation/bookNavigation.test.ts`
- `src/navigation/readingPosition.test.ts`
- `npm run check`; Safari desktop and mobile visual QA for changes in scope.

## Ten-language extension — 2026-09-10

Authority: the user approved the ten-language implementation plan in this task.
This extension supersedes the two-locale scope above. English remains `/`;
Spanish `/es/`, German `/de/`, French `/fr/`, Brazilian Portuguese `/pt-br/`,
Japanese `/ja/`, Simplified Chinese `/zh-hans/`, Korean `/ko/`, Russian `/ru/`,
and Arabic `/ar/` are complete editions of the same continuous book.

- One registry owns URL prefixes, language tags, native names and direction.
- Automatic selection runs only on initial entry to `/`: supported explicit
  saved choice, then ordered browser languages, then English. It preserves
  query and hash. Direct localized paths always win; slashless locale roots
  normalize without losing URL state. Unknown paths retain not-found behavior.
- Remember only explicit menu choices in a versioned localStorage key. Storage
  failures must not prevent navigation. No geolocation or server is introduced.
- Regional Portuguese preferences map to pt-BR. Only zh-Hans, zh-CN and zh-SG
  variants map automatically to Simplified Chinese, not zh-TW or zh-Hant.
- The persistent header exposes native language names with keyboard, touch,
  Escape/focus restoration and a usable mobile disclosure. Switching keeps the
  nearest semantic reading position, query and anchor. Explicit English selection
  overrides browser preference, including when storage is unavailable.
- Arabic text and navigation use RTL; the authored paper world and animation
  coordinates do not mirror. CJK and long headings remain readable.
- Acceptance covers every route and locale, initial detection, manual English,
  blocked storage, back/forward, semantic continuity, RTL, and desktop/mobile.

## Unknowns requiring confirmation

None. Hosting follows [deployment-and-release.md](deployment-and-release.md);
traffic measurement follows [site-analytics.md](site-analytics.md). Other
persistence or external integrations require an explicit contract first.
