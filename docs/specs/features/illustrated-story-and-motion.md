# Illustrated story and motion

**Status:** Active, first pass 2026-07-20.

## Goal

Let each chapter inhabit a coherent, gently living paper world whose authored
visual language supports reading without turning interaction into spectacle,
confusion, or a performance burden.

## Scope

- approved scene assets, layered raster presentation, beats, narration, and
  desktop/mobile composition;
- idle, scroll, pointer, Quiet, and reduced-motion behavior;
- scene hydration and heavy-layer resource limits.

## Non-goals

- procedural 3D, Three.js, WebGL geometry, CSS/emoji placeholder art, or
  hand-drawn approximations of approved visual assets;
- changing the editorial contract or inventing new unapproved scene meaning;
- asset-pipeline or licensing policy beyond a separately created asset spec.

## User-visible behavior

- Scenes follow the bright contemporary pop-up-game reference: clean white
  stock, sky/cobalt blue, lime and orange accents, bold sans-serif type, wind
  ribbons, paper folds, and a discoverable open-book world.
- Approved raster layers form one coherent composition. They remain gently
  alive at rest; scroll and pointer may increase their range without producing
  independently drifting fragments.
- Desktop chapter scenes may play through sticky scroll-authored beats. Mobile
  scenes are full-width living illustrations in normal document flow. As each
  mobile scene passes through the viewport, its own scene-local scroll progress
  plays through the authored beats without pinning the page, delaying the
  visitor, changing scroll speed, or requiring a minimum viewing time.
- Every expansion scene retains its explicit authored `inlineProgress` as its
  focal mobile composition. Active mobile scroll progress is derived
  independently for that scene and passes through its authored beat path. When
  the scene and viewport centres align, the scene resolves at its authored
  `inlineProgress`; it must not use one shared interpolated value across
  scenes. Quiet and
  `prefers-reduced-motion` instead show the scene's semantically complete
  settled pose without scroll or idle animation.
- Responsive scene treatments do not add a separately titled explanatory
  panel, such as `What the illustration holds` / `Что показывает иллюстрация`,
  beside or below the artwork in either locale or at any viewport. Internal
  scene description metadata may support authoring and the reviewed
  non-visual alternative remains available, but the illustration may stay open
  to interpretation. Approved chapter prose and authored text within the
  paper composition retain their existing editorial roles.
- Scene labels and narration are localized without changing beat ids, offsets,
  layer poses, or motion meaning.
- Every scene reserves deliberate reading zones and follows a stable scan path:
  scene title, premise, then the mechanism or authored beats it introduces.
  At desktop scene widths, a title that fits naturally in one or two lines must
  not be squeezed into a three-line or one-word-per-line stack. Supporting copy
  and beat labels must read as part of the paper composition rather than as
  arbitrary text laid over active illustration details.
- Quiet view and `prefers-reduced-motion` reduce or settle decorative motion
  without hiding content or changing the reading's meaning.

## Invariants

- The approved popup-game master image is the visual source of truth.
- The open book is a stage and world, not an adaptation claim or decorative
  shell. Source images are authored animation layers, not visual references to
  recreate with CSS drawings.
- The shared proximity gate is 175%. At most two heavy layer packs are
  hydrated; release the outgoing pack before warming a replacement.
- Mobile scroll playback is progressive enhancement. It never changes the
  document's natural height, focus order, touch scrolling, or chapter-anchor
  behavior.

## Edge cases and failure policy

- If a heavy layer fails to load or decode, retain a coherent poster fallback;
  do not hide the scene or expose broken visual fragments.
- Coarse-pointer and mobile use must not require pointer parallax to understand
  a scene.
- A mobile visitor who scrolls quickly may skip intermediate poses without
  being stopped or snapped back. The resulting visible pose must remain
  coherent, and reversing scroll must reverse the scene progression.
- Anchor jumps, rotation, and mobile dynamic-viewport changes must resolve to
  the current scene-local pose without replaying a hold or leaving layers in a
  stale pre-resize position.
- If a locale, viewport, or authored pose leaves too little safe space for
  readable copy, move the copy into a dedicated paper surface or normal-flow
  text region instead of allowing clipping, accidental overlap, or an awkward
  forced wrap.
- Reduced-motion, quiet, and keyboard use retain access to every chapter and
  all editorial content.

## Route / state / data implications

- Scene progress is transient view state. It must not become visitor history,
  analytics, a score, or persisted behavioral data.
- Story identity uses stable authored mechanism, layer, and beat identifiers;
  localization changes copy only.

## Verification mapping

- `src/story/ParallaxStage.test.tsx`, `src/story/storyRegistry.test.ts`,
  mobile scene-progress tests, `src/hooks/useStickyStoryProgress.test.tsx`, and
  motion-related `App` tests
- `docs/visual/reference/popup-game-master.png` and
  `docs/visual/scene-expansion/SCENE_SPECS.md`
- `npm run check`; forward/reverse mobile scroll, no-hold, Quiet, and desktop
  regression checks in Safari, Chrome, and the in-app Browser for changes in
  scope.

## Unknowns requiring confirmation

Create or update an active-spec-mapped browser-QA case before treating a
browser-QA run as release evidence for a motion change.
