# Mobile story scenes animate with normal document scroll

- Priority: P1
- Status: PARTIALLY_VERIFIED
- Spec reference: `docs/specs/features/illustrated-story-and-motion.md`; `docs/visual/scene-expansion/SCENE_SPECS.md`
- Implementation reference: `src/hooks/stickyStoryScheduler.ts`; `src/hooks/useStickyStoryProgress.ts`; `src/story/ParallaxStage.tsx`; `src/components/SceneObserver.tsx`

## Functional interpretation

On mobile, each living illustration advances and reverses with the reader's
scene-local scroll while the page remains ordinary document flow: no sticky
hold, forced dwell, or scroll-speed takeover.

## Preconditions

- Run the current production build or local development server.
- Use a mobile viewport of `390x844` or another width below the `900px` mobile
  breakpoint.
- Keep motion enabled and begin with a freshly loaded `/ru/` page.

## Steps

1. Scroll to `[data-scene="scene-p-01"] [data-layout="inline"]` while its
   illustration is entering the viewport and note its visible layer pose and
   `data-story-progress`.
2. Scroll forward until the illustration is centered, then until it leaves the
   viewport; compare the pose at each point.
3. Scroll backward through the same scene and confirm that its pose reverses.
4. Confirm that the article following the illustration enters immediately in
   normal flow and that the viewport is never held inside the scene.
5. Repeat the entry, center, exit, and reverse check for
   `[data-scene="scene-ai-03"] [data-layout="inline"]`. While moving one scene,
   compare both scenes' `data-story-progress` values and confirm that only the
   scene crossing the viewport changes.
6. Move a representative scene from beyond to within the shared
   `1.75 × viewport height` proximity margin, then fast-scroll between scenes.
   Confirm that only eligible packs hydrate, no more than two are hydrated at
   once, and the current scene becomes ready.
7. Enable Quiet, scroll through a scene, and confirm that decorative motion is
   settled without hiding content; then restore motion. Repeat with the browser
   or operating system's reduced-motion preference enabled.
8. Jump directly to a scene anchor, rotate the responsive viewport, and change
   its dynamic height. Confirm that the current pose is recalculated without a
   hold, stale layer position, or replayed scroll interval.
9. Repeat a desktop-width spot check and confirm that the same representative
   scene retains its sticky desktop playback.
10. Repeat the representative mobile flow in Safari, Chrome, and the in-app
    Browser.

## Expected results

- mobile stages use `data-layout="inline"` and occupy the full available width
- the inner stage is not sticky and the page has no horizontal overflow
- forward scroll advances the authored scene pose and backward scroll reverses it
- each scene crosses its authored `inlineProgress` focal pose near the viewport center
- adjacent prose follows naturally without a pinned interval or scroll trap
- progress in one scene does not drive another scene
- the shared `175%` proximity gate and two-pack hydration limit remain intact
- Quiet and reduced-motion modes settle decorative motion without hiding content
- no uncaught console errors
- no failed core network requests

## Selector and visual notes

- Scene and stage selector: `[data-scene="scene-p-01"] [data-layout="inline"]`
- Layer selector: `[data-story-layer]`
- Progress signal: `data-story-progress`
- Hydration signals: `data-layers-hydrated` and `data-layers-ready`
- Confirm the position of `.parallax-story__sticky` is `relative` in the mobile
  layout even though the class name is shared with desktop.
