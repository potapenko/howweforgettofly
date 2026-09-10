# Creative edition integration

Status: implementation and verification complete; checkpoint required before handoff.
Single-agent, current master; no deployment.

## Authority and contract basis

The user accepted RU_CREATIVE_THINKING_BOOK.md and explicitly instructed:
“переноси новую редакцию на страницы … сделай переводы на другие языки”.
This authorizes full runtime integration and all nine other existing editions.
Mode Evolve, change CREATIVE-EDITION-2026-09-10. No further approval is needed.

Traversal receipt: global and repository AGENTS → spec-first-workflow →
docs/specs/README → index → editorial-independence-and-colophon rev 6→7,
continuous-bilingual-reading rev 3→4, illustrated-story-and-motion rev 5→6.
Global implementation, product-truth core/routing/change/evidence/delivery/
lifecycle and QA routes apply. Supporting closure: accepted manuscript and
notes, existing scene specifications and illustration inventories/density/blue
surface records. Deployment and analytics domains are excluded and protected.
No source-book research or visual asset generation is needed.

## Outcome and implementation

1. Integrate the complete accepted Russian text, excluding its document title
   and duplicate colophon (the existing footer owns the one public colophon).
2. Keep the cover, twelve Manifesto scenes, ten Atlas entries, all existing
   living scenes and illustration assets. Place scenes alongside the matching
   new passages; reuse their authored motion, narration and accessible art text.
3. Read in manuscript order: opening, Manifesto, creative mechanism, dinner
   product example, adult life, AI, parenting, Atlas, Final Sky. Group the three
   central chapters under Adults in persistent navigation; preserve all major
   anchors and map superseded subsection anchors to corresponding new passages.
4. Author complete en/es/de/fr/pt-BR/ja/zh-Hans/ko/ar editions with identical
   semantic block identities. Preserve every example, causal turn, qualification
   and prompt; adapt sentence rhythm, not content coverage. No language fallback.
5. Reuse the existing localized control/scene dictionaries. New book prose lives
   in separate locale files so old paragraphs cannot leak into the reader.
6. Validate manuscript fidelity, locale coverage, source boundary, anchor and
   language continuity, native mobile flow, visual density and blue surfaces.
   Run npm run check and real-browser RU/EN desktop/mobile plus all locale
   smoke checks, representative RTL/CJK and Safari desktop/mobile.
7. Save only task-owned changes in a checkpoint commit on master.

## Task-owned write set

AGENTS.md; the three active specs above; this plan; new src/content/editions/*;
new book content parser/schema and shared reading renderer/styles; LongformPage;
HomeCoverContent only for new edition integration; navigation bookNavigation;
ScrollToTop only to use the new Manifesto titles for matching deep links;
focused affected tests;
qa/cases/smoke/language-selection-and-reading-continuity.md. Existing manuscript,
illustration assets, motion controllers/registry, analytics, hosting, internal
provenance, old content providers and unrelated working changes are protected.
New supporting files remain confined to these responsibilities.

## Acceptance

- [x] Russian runtime edition matches the accepted manuscript exactly, excluding
  the duplicate colophon already owned by the footer.
- [x] All nine translations are complete, with nine chapters and identical
  paragraph/list/quote coverage; no old-body or language fallback remains.
- [x] All 22 chapter scene instances plus the cover remain, with the seven
  expansion mechanisms, authored layers, beat tracks and motion unchanged.
- [x] Major and legacy semantic destinations, M01–M12 and language continuity
  remain. New Mxx-reading links use the new titles and Manifesto identity.
- [x] Typecheck, 221 tests in 25 files, production build and ten-language SEO
  verification pass. git diff --check passes.
- [x] Real-browser reading and controls checked as below.
- Checkpoint: save this verified write set on master before reporting completion.

## Verification and review

CUA in-app browser: 1440×1000 and 390×844. RU/EN opening, creative mechanism,
product story, Atlas and representative scene transitions were reviewed; all
ten locale routes rendered nine chapters and 147 prose paragraphs, with no
horizontal overflow or framework overlay. Console error/warning checks were
empty. Visible illustration assets loaded correctly. All referenced static
assets and blue variants remain existing source assets.

Mobile density measurement across the rendered document, including living
scenes: largest gaps between illustration regions were RU 741px, EN 628px,
ES 642px, DE 671px, FR 632px, PT 614px, JA 624px, ZH 500px, KO 571px and AR
533px at 390×844. Representative long gaps, blue surfaces, CJK and RTL were
visually inspected. Desktop prose uses its section-local sticky illustration;
inline repetitions appear on mobile only, avoiding duplicate neighboring images.
No reading text was shortened to achieve density.

Arabic → Korean and Chinese → English menu changes preserved the visible
reading passage and closed the menu. RTL changes text/navigation direction,
not artwork. At exact subsection boundaries the saved hash may name the
preceding semantic section; proportional restoration preserved the same next
heading at 94px. The case now starts within the passage for an exact-hash check.

The mobile Ground/Gravity scene moved from progress .848 to .648 and back
through native reverse/forward scrolling, with two hydrated layer packs and
ready live layers. No scene controller, beat or asset changed. This is a
representative integration check, not a claim of a new exhaustive motion audit.

Safari: actual desktop window and Responsive Design Mode 390×844. RU/EN
reading, blue artwork, native scroll, mobile menu, locale switching and Quiet
on/off were exercised. Reading content remained available. Temporary responsive
mode was exited and empty task-created tabs closed. Safari native inspection
provided visual/interaction evidence; console checks were in the in-app browser.
The in-app viewport override was reset and RU#doorways left open.

Complete RU/EN copy was read in order. Russian remains the accepted wording;
three awkward English constructions were corrected before the final check.
All editions preserve the imagined-example framing, observation/assumption
separation, revision, consent, care and authorship limits. RU rendered main has
no source-author references; the existing footer has exactly one colophon.
Internal source/provenance, metadata, analytics and deployment owners unchanged.

Residual: Vite reports a non-failing bundle-size warning (main JS about 2.25MB,
777KB gzip). All locale copy currently ships in the existing eager localization
architecture. No public deployment or independent native-language review is
claimed by this integration.
