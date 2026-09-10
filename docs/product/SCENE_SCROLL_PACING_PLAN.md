# Brief illustration holds

Status: implemented and verified; checkpoint before handoff. Single-agent,
master, no deploy.

## Authority and Spec Basis

User approved the proposal to replace long desktop holds with 120–180px of
travel, animate through the whole viewport passage and preserve pointer/idle
interaction and unpinned mobile reading. Mode Evolve, SCENE-PACING-2026-09-10.
Traversal: global/repository AGENTS → spec-first-workflow → specs/README →
specs/index → illustrated-story-and-motion rev 6→7; supporting scene-expansion
SCENE_SPECS motion envelope. Reading rev 4 and editorial rev 7 are protected.
Global implementation, product-truth, QA and computer-use routes apply.
Previous 260–480vh lengths are superseded user-facing pacing, not defects in
the authored layers. No further approval or visual concept is needed.

## Implementation boundary

- Share a frame-height and 120–180px hold across all desktop stages.
- Map progress to entry, short hold and exit. Limit entry to the actual document
  space before a stage so the opening cover starts at zero. Keep scene-local
  reverse scrolling and existing passive shared scheduler.
- Remove obsolete per-scene length settings; keep all beats, layer transforms,
  pointer/ambient movement and mobile focal compositions unchanged.
- Verify geometry, cover origin, reverse scroll, resize and scheduler sharing;
  run npm run check. Exercise cover, Manifesto, expansion and final scenes in
  the in-app browser; Safari desktop and mobile; pointer, Quiet and native flow.
- Update the applicable browser case after observing the behavior; checkpoint
  only this task's files on master.

Task-owned writes: this plan, AGENTS, illustrated-story spec and SCENE_SPECS
motion envelope; stickyStoryScheduler and its hook documentation/tests;
ParallaxStage, types, registry and related tests; parallax-stage.css,
home-story.css, HomeStory/SceneObserver comments and affected integration tests;
qa/cases/regression/desktop-scenes-brief-hold.md and the mobile case's desktop
expectation. Public assets, copy/translations, navigation, analytics, deployment
and unrelated edits remain untouched. Working tree was clean at start.

## Acceptance

- All 23 desktop stages, including cover/final, measured exactly 150px of hold
  at 1440×1000. The shared CSS bounds other heights to 120–180px. Quiet measured
  zero extra distance for all stages, with all 147 prose paragraphs present.
- Cover starts at 0; after 300px its frame top is -150px and progress .261.
  The introduction is already entering. No wheel handler or timer was added.
- Candidate-map: native scroll positions 41120.5→41220.5→41320.5 advanced
  progress .462→.512→.563. The frame held at 78px for the first step and moved
  to 28px after the second. Another 300px produced .713; reversing 500px
  restored .462 and the original scroll-layer pose. Pointer x values changed
  independently when moving across the paused image. Ambient remained active.
- Final: a 220px scroll moved the frame from 78px to 8px; progress .462→.573.
  Manifesto entry, hold and departure were also exercised and viewed.
- Mobile 390×844: every layout inline, every frame relative, no overflow.
  Candidate-map entry advanced .704→.892 and reversed to .704. Its existing
  authored focal pose is 1, so its final beat at/after centre is intentional.
  The two-pack hydration ceiling held; visible layers became ready.
- Native Safari desktop RU M01 forward/reverse and Safari Responsive Design
  Mode 390×844 EN Ground/Gravity flow were viewed. Responsive mode was exited.
  A native address-bar input mismatch was discarded; the scenario was repeated
  after verifying the exact localhost URL. Chrome desktop RU M01 forward/reverse
  was checked through native CUA because the Chrome browser provider was absent;
  its task-only tab was closed, preserving the original New Tab.
- In-app console checks were empty; after reload, 166 observed network events
  contained no failed loads or HTTP errors. No broken loaded images or error
  overlay. Temporary viewport override reset; RU#M01 left open as the preview.
- npm run check passed: typecheck, 225 tests /25 files, production build and
  ten-language SEO verification. Geometry tests cover 120/150/180px holds,
  cover origin, reverse, resize and shared scheduling. Two existing integration
  mocks now target the appropriate point in the complete passage; pose and
  pointer-strength expectations are unchanged. Obsolete length assertions removed.
- Scope review: registry diff removes only old lengths and their stale comment;
  all authored beats, layer assets, narration and translations remain unchanged.
  Public copy, navigation and static illustrations are unchanged. No new runtime
  dependency, persistent state, analytics or deployment work.

Residual: existing non-failing Vite bundle warning (about 2.25MB /777KB gzip).
Safari mobile evidence is Responsive Design Mode, not physical iPhone proof.
No public deployment. Commit only this write set before reporting completion.
