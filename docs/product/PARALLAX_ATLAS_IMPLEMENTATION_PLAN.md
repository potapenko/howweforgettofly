# How We Forget to Fly — final polish plan

**Snapshot:** 2026-07-19
**Status:** `implemented; final local QA passed`
**Scope:** static bilingual frontend; no deployment, accounts, analytics,
persistence, database, forms, or live AI

This plan supersedes the earlier workbench-heavy Atlas and the historical
Three.js proposal. The product is now a living web book: the reader scrolls,
the paper world moves, and the text remains the only required activity.

## Locked direction

- Preserve the approved bright contemporary pop-up-book composition on
  desktop: white paper, cobalt and sky blue, lime and orange accents, bold
  sans-serif typography, and layered raster objects.
- Keep every chapter in one long document. Header navigation only moves to a
  point in the book.
- Treat illustrations as short visual stories, not decorative hero images.
  Desktop uses a held scroll range; mobile and portrait tablet use a
  full-width non-sticky illustration followed by text.
- Keep the image alive at rest with a smaller ambient range than the authored
  scroll movement.
- Preserve the ethical center: Flight is an event, not a rank; parents keep
  conditions rather than engineer a child; AI is bounded Wind, not pilot;
  Ground, refusal, help, privacy, repair, and ending remain valid.

## Work packages

1. **Reading-only structure — complete**
   - Removed reflection state, form components, guided workbench routes,
     artifact export actions, choice controls, and their visible CSS.
   - Retired old `/atlas/:slug` addresses into the Atlas reading chapter.
   - Audited every remaining button and link for a real destination or action.

2. **English editorial pass — complete**
   - Kept the existing authored voice where it was already specific.
   - Removed workbench promises such as editable cards and form fields.
   - Ran the de-ai-writing long-form linter and a high-signal phrase scan.

3. **Contextual Russian edition — complete**
   - Added `/ru` with translated navigation, Manifesto, pathways, Atlas,
     Source, scene titles, document titles, accessible labels, and boundaries.
   - Adapted the concepts in the context of Akimov and Klimenko rather than
     translating the English syntax literally.
   - Removed conspicuous calques and the remaining form-era language.

4. **Responsive story system — complete**
   - Desktop keeps the approved sticky parallax sequence.
   - At `820px` and below, stories use an inline pose: `100vw`, normal document
     flow, no hold, no horizontal pan, text immediately below.
   - Ambient animation remains active at half the authored movement envelope;
     Quiet view and reduced motion stop all movement.

5. **Safari hardening — complete**
   - Prevented duplicated loading/live layers.
   - Suppressed the false focus outline only for headings focused by anchor
     navigation while keeping visible keyboard focus on real controls.
   - Gave Russian Home a text-free fallback so English baked copy cannot flash.

6. **Verification and documentation — complete**
   - Typecheck, 72 tests, and production build pass.
   - Real Safari checks cover EN/RU desktop, `#source`, ambient motion, mobile,
     and the `768px` inline breakpoint.
   - README, implementation report, QA record, and completion audit now describe
     the reading-only bilingual product rather than the retired workbenches.

## Acceptance contract

The local build is complete when all of the following are true:

- no runtime form, input, fieldset, textarea, select, submit, radio, or checkbox;
- no visible link points to `#` or to a retired standalone workbench;
- English and Russian each render one continuous book with localized semantic
  names and scene descriptions;
- desktop reference composition remains intact;
- mobile/portrait tablet illustrations are full width and non-sticky;
- ambient motion is visible without scroll and stops under Quiet/reduced motion;
- Safari has no duplicated layers or false heading outlines;
- typecheck, tests, build, and `git diff --check` pass.

This closes local implementation only. Publication, hosting, domain choice,
analytics, and any future server feature require a separate decision.
