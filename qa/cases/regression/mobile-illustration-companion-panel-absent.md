# Mobile illustrations do not expose editorial companion panels

- Priority: P1
- Status: PARTIALLY_VERIFIED
- Spec reference: `docs/specs/features/editorial-independence-and-colophon.md`; `docs/specs/features/illustrated-story-and-motion.md`
- Implementation reference: `src/routes/ManifestoPage.tsx`; `src/routes/ManifestoIllustrationNotes.test.tsx`

## Functional interpretation

Readers see the illustration and the authored chapter prose, without a separate
panel that explains what the image means or labels itself as an interpretation
of the illustration.

## Preconditions

- Run the current production build or local development server.
- Use a mobile viewport of `390x844` or another width below the `900px` mobile
  breakpoint.
- Keep motion enabled.

## Steps

1. Open `/ru/` and scroll through the manifesto illustrations.
2. Confirm that `Что показывает иллюстрация` is not visible anywhere on the
   page and that no `.scene-reading-note` element exists.
3. Confirm that each illustration is followed directly by its normal article
   body, including the article heading and approved prose.
4. Repeat on `/` and confirm that `What the illustration holds` is not visible
   and no `.scene-reading-note` element exists.
5. Repeat a desktop-width spot check to prove that the removed panel does not
   survive in another responsive layout.

## Expected results

- neither forbidden explanatory label is rendered in either locale
- there is no standalone explanatory companion panel beside or below a scene
- all twelve manifesto article bodies and their authored prose remain present
- illustration alternative text remains available to assistive technology
- no uncaught console errors
- no failed core network requests

## Selector and visual notes

- Negative selector: `.scene-reading-note`
- Stable scene selector: `[data-scene] [data-layout="inline"]`
- The illustration may carry an accessible description; that description must
  not be duplicated as a visible interpretation panel.
