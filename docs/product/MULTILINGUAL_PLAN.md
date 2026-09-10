# Ten-language implementation

The user approved this implementation on 2026-09-10. Execution is single-agent
in the existing master branch. No push or public deployment is authorized.

## Outcome and scope

Complete editions: en, es, de, fr, pt-BR, ja, zh-Hans, ko, ru and ar. The shared
registry owns URL roots, native names, language tags and direction. Initial root
entry uses an explicit saved choice, then ordered browser languages, then English.
Direct localized paths win. Switching retains query parameters and the semantic
reading position; storage failure cannot prevent manual navigation.

Write set: AGENTS.md; reading/editorial/deployment specs; src/i18n; localized
words in src/content, src/routes, src/components and src/story; navigation,
App.tsx, applicable styles, build/SEO owners, focused tests and a browser case.
Protect EN/RU prose, section and beat IDs, animation offsets/poses, imagery,
internal provenance, marketing, analytics and hosting configuration.

## Contract basis

Mode Evolve. Traversal: AGENTS.md → docs/spec-first-workflow.md →
docs/specs/README.md → index.md → continuous-bilingual-reading@3,
editorial-independence-and-colophon@4, illustrated-story-and-motion@2,
deployment-and-release@3. Reading/editorial/build extensions implement the
user-approved language expansion; scene mechanics remain protected.

Supporting authority: PUBLIC_SOURCE_COLOPHON_PLAN and the approved paper-world
reference and scene specifications. Reference implementation inspected read-only:
PlayPhrase.me landings' locale registry, automatic routing and language selector.
Skills applied: de-ai-writing (new translations only), React best practices and
frontend testing. Global implementation, product-truth, QA and Computer Use
routes and repository browser-case instructions were followed.

## Completed work

- Shared ten-language registry, root detection, explicit preference storage,
  localized/legacy routes and native-name menu with Escape/focus restoration.
- Eight complete authored dictionaries, each with 1024 entries; approved EN/RU
  source remains in place. New words without a catalog entry fail explicitly.
- Localized prose, controls, recovery/loading copy, accessible descriptions,
  illustration beat words and social metadata; Arabic RTL without mirrored art.
- CJK font fallbacks and heading adjustments, including Japanese cover measure,
  Korean word boundaries and the Portuguese mobile title.
- Ten generated static HTML heads, reciprocal hreflang/x-default links,
  canonical/social URLs and sitemap. Build verification rejects incomplete packs.

## Verification and boundary

Focused checks cover every edition, text coverage, interpolation tokens, immutable
scene mechanics, automatic choice, direct paths, blocked storage, manual English,
Back navigation, query retention, menu preference and Escape focus. Existing
reading-position tests remain. Comparing changed source against the pre-change
copy found no removed or changed long EN/RU text literals.

Browser validation: in-app desktop/mobile routes and headings for all editions;
Safari desktop and 390×844 responsive checks, including RTL, Portuguese wrapping,
EN/RU preservation and saved/manual selection; Chrome desktop dropdown,
keyboard Escape and Japanese selection. Arabic → Korean retained the family
passage. Checked core resource loading and console errors. The reusable case is
qa/cases/smoke/language-selection-and-reading-continuity.md.

The repository-required npm run check passed: typecheck, 209 tests across 24
files, production build and all ten static heads. The bundle currently includes
all dictionaries (about 686 kB gzip); Vite reports its non-fatal chunk-size warning.
The checkpoint commit saves this result in the existing branch.
The existing GA4 integration remains unchanged: its current locale coverage is
EN/RU. Extending analytics was outside this approved plan and has not been done.
Unrelated illustration/marketing work was left intact and is not part of this
change. No public release is claimed.
