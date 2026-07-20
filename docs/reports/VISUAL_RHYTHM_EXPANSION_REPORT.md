# How We Forget to Fly — visual rhythm expansion report

**Date:** 2026-07-20  
**Plan:** `../product/VISUAL_RHYTHM_EXPANSION_PLAN.md`  
**Status:** complete; implementation, live browser QA, and automated regression
gate verified locally
**Deployment:** not performed

> Paths to `output/`, Playwright screenshots, and the former root QA report are
> historical evidence from the prototype workspace. Those generated files are
> intentionally excluded from this portable repository.

## Outcome

The late half of the continuous EN/RU book now has seven independent living
paper scenes instead of repeating Manifesto artwork:

| Scene | Chapter position | Mechanism | Release into |
| --- | --- | --- | --- |
| `P-01` | after `parents-keeper-conditions` | `honest-mode-rail` | `parents-honest-modes` |
| `A-01` | after `adults-present-life` | `ground-or-gravity` | `adults-ground-gravity` |
| `AI-02` | after `ai-human-assignments` | `adoption-folds` | `ai-wind-roles` |
| `AI-03` | after `ai-protocol` | `candidate-map` | `ai-direction-test` |
| `AI-04` | after `ai-adoption-attribution` | `return-threshold` | `ai-craft-scope` |
| `ATLAS-01` | Atlas opening | `equal-lenses` | Atlas reading cards |
| `FINAL-01` | Final Sky | `open-horizon` | final cadence and colophon |

The AI chapter is now a four-act visual arc: the existing M09 Wind opening,
four human gestures, a polished route returning to map scale, and a form
returning from rehearsal to consequence. Parents and Adults receive internal
visual turns. Atlas and Final Sky no longer reuse M12.

The reserve `A-02` was not created: after `A-01`, the distance to AI no longer
forms the disproportionate blank run that justified an eighth scene.

## Final cadence

`FINAL-01` is a calm open horizon rather than a repeated chapter plate. Its
last semantic HTML line is:

- EN: `We have not forgotten how to fly. The Sky is still here.`
- RU: `Мы не забыли, как летать. Небо всё ещё здесь.`

The previous large blue footer statement and its redundant navigation links
were removed. The explanatory “static book / no account” line was also
removed: the interface no longer talks about forms that do not exist. Only a
small, non-interactive source-influence colophon remains below the ending.

## Editorial copy inside the illustrations

The first implementation left the calm left leaves of several new masters
visibly empty and placed only a small narration card near the stage edge. That
did not complete the scene-card intention: the new image was present, but the
thesis had not become part of the illustrated spread.

All seven expansion scenes now use the reserved negative space for
code-native, localized editorial copy:

| Scene | Desktop copy field | Narration treatment |
| --- | --- | --- |
| `AI-02` | opaque upper-left paper panel | integrated |
| `AI-03` | `paper-left` | integrated |
| `AI-04` | `vellum-left` | integrated |
| `P-01` | clear central sky | integrated |
| `A-01` | three hanging paper tags | distributed and coupled to the primary layer |
| `ATLAS-01` | `paper-left` | card, because the lower left leaf contains the ten mechanisms |
| `FINAL-01` | `horizon-left` | integrated |

Title and thesis are semantic HTML layered over the book rather than pixels in
the artwork. Their visual duplicate is hidden from the accessibility tree
because the full accessible title and prose remain in reading order after the
scene. Beat narration stays live HTML. On mobile the desktop editorial overlay
is hidden and the full localized text follows the full-width inline image, so
the composition does not reduce desktop typography to unreadable phone text.

Every scene therefore includes localized HTML title, thesis, and current beat
copy within the illustrated spread. `ATLAS-01` keeps only the beat in a
separate lower-right card so it does not cover the ten mechanisms on the lower
left leaf. `AI-02` uses a solid paper panel, `P-01` uses the clear central sky,
and `A-01` prints its three fragments on hanging paper tags. The `A-01` copy
wrapper follows the same scroll and pointer transform as its primary layer, so
the type stays physically attached to the tags throughout movement.

## Runtime

- All sticky stories use one `StickyStoryScheduler`; the page no longer gives
  every scene its own scroll listener.
- Scene progress is measured in one animation frame and only for near-viewport
  registrations.
- A `175%` proximity gate hydrates the aligned layer pack shortly before use
  and releases it again when it is far away.
- The scheduler ranks eligible stories by viewport distance and keeps at most
  two heavy layer packs hydrated at once. An outgoing pack is released before
  its replacement is warmed; scroll, resize, intersection, and unmount all
  rerun the same deterministic selection.
- Posters render first and remain the failure fallback.
- Responsive `srcset`/`sizes` select the 960-wide packs at the mobile boundary.
- Cached-image reconciliation retains the existing Safari safeguard: a layer
  restored as already complete cannot leave poster and layers visible at the
  same time.
- No Three.js, React Three Fiber, WebGL, canvas scene, procedural geometry, or
  CSS substitute was added.

## Motion and responsive behavior

Desktop keeps the approved long held composition. Each new scene has five
authored scroll beats, restrained pointer depth, and quieter idle movement.
The requested parallax amplification remains `1.5` for the opening and is
configured per scene for the expansion.

### Physical reveal correction

The seven expansion scenes now treat every raster plane as material already
present in the open book:

- every authored layer state keeps CSS opacity at `1`;
- beat 0 is the exact poster-aligned rest pose for every plane;
- poster readiness switches atomically to the complete layer stack instead of
  crossfading two compositions;
- beats 2-4 start one dominant plane at a time and use only translation,
  rotation, scale-as-fold, overlap, and return-to-rest;
- reverse scroll reverses the same physical movement instead of dissolving a
  layer away.

Registry tests enforce the rest pose, full opacity, and scene-specific plane
order for `AI-02`, `AI-03`, `AI-04`, `P-01`, `A-01`, `ATLAS-01`, and
`FINAL-01`. The raster packs contain several objects inside some single
planes; a future object-by-object cascade would require those assets to be
segmented further. The current correction deliberately does not pretend that
one baked plane contains independent hinges.

At `900px` and below each expansion story becomes a full-width inline
illustration in normal document flow:

- no sticky hold or scroll trap;
- no horizontal pan;
- no pointer-driven layer separation;
- ambient movement remains active in normal mode;
- the same scene uses a 960-wide responsive pack and a semantically complete
  authored beat;
- text follows naturally below the art.

The seven expansion scenes no longer share the old interpolated mobile value
`0.58`. Each points to an exact authored beat: `AI-02` and `A-01` use `0.72`,
`AI-03`, `AI-04`, and `P-01` use their complete `1.00` landing, and
`ATLAS-01` and `FINAL-01` use `0.72`. Existing M01-M12 scenes retain the
legacy fallback.

Coarse-pointer devices also suppress pointer parallax above the breakpoint.
The opening cover retains its independent `820px` breakpoint; changing the
inner-scene threshold does not alter the approved cover composition. Quiet view
and `prefers-reduced-motion` stop scroll-, pointer-, and ambient motion without
hiding the poster, prose, or ending.

## Safari/WebKit hardening

The current implementation adds three targeted WebKit corrections:

1. `MediaQueryList.addListener` fallback keeps layout and reduced-motion
   responsive in older Safari/WebKit shells.
2. Programmatic Skip focus is marked, then removes both the marker and its
   temporary `tabindex` on blur. This prevents the former giant rust focus
   rectangle without weakening keyboard focus on real controls.
3. The sticky Manifesto index includes `-webkit-backdrop-filter` alongside the
   standard property.

Sticky/overflow/transform boundaries, header offsets, inline overrides,
poster-first loading, and cached-image reconciliation were reviewed
statically. No speculative `img.decode()` gate was introduced without a
reproducible flash.

Historical real-Safari evidence from 2026-07-19 still covers the shared
opening/header, 390/768/820 responsive boundary, EN/RU switch, pointer,
ambient, Quiet view, anchor focus, reverse scroll, and Final Sky/colophon
runtime. It is recorded in `../design-qa.md`,
`PUBLIC_SOURCE_COLOPHON_REPORT.md`, and `../output/qa/safari-*.jpeg`.

### Fresh browser acceptance boundary

The local Vite server is live at `http://127.0.0.1:4174/`.

Fresh Chrome/Playwright evidence covers all seven expansion scenes in RU at
desktop size, all seven at mobile size, and the `821px` compact boundary. The
compact runtime assertions recorded `layout: inline`, a full-width visual,
`position: relative`, hidden desktop editorial duplicate, and
`documentWidth === viewportWidth` for every scene. The screenshots are stored as:

- `../output/playwright/editorial-{mechanism}-ru.png`;
- `../output/playwright/mobile-{mechanism}-ru.png`;
- the focused `editorial-ai03-ru.png` and `editorial-atlas-ru.png` views.

Fresh Safari inspection through Computer Use covers all seven expansion
scenes: `AI-02`, `AI-03`, `AI-04`, `P-01`, `A-01`, `ATLAS-01`, and
`FINAL-01`. The pass found no remaining border artifact or editorial
collision. It also followed `A-01` through scroll and confirmed that the copy
remains aligned with its moving paper tags. Ambient motion runs in normal mode
and stops in Quiet view.

Locale transfer now uses stable `*-illustration` anchors plus a relative scene
progress snapshot. Chrome and Safari both preserve the exact scene and
approximately the same progress/beat while switching RU/EN instead of jumping
back to a chapter-level anchor.

The in-app Browser was attempted again after the Vite server was live, but the
local URL was rejected by that tool's security policy. This is not an
application failure. The complete Chrome/Playwright and Safari Computer Use
evidence substitutes for that unavailable surface.

The live-browser matrix and final combined automated regression gate are
complete.

## Assets and integrity

Seven scene manifests cover 60 production records and 12 retained master
records. The production series is `4,037,648` bytes in total. Every recorded
path, byte count, dimension, and SHA-256 hash matches the current file.

- desktop artboards: `1672 × 941`;
- responsive artboards: `960 × 540`;
- required backgrounds are opaque;
- moving planes carry alpha;
- all packs are well below the plan’s per-scene budget;
- manual inspection and OCR found no readable baked EN/RU copy;
- poster-to-decoded-layer RMSE is low, with no visible settled-state jump.

`P-01` initially exposed a latent z-order mismatch that a static poster could
not show because its planes do not overlap at rest. Registry, manifest, and
test now agree on `background → secondary → primary`.

Packaging comparison evidence is retained in:

- `../output/qa/VISUAL_ASSET_AUDIT.md`;
- `../output/qa/01-reference-and-desktop-posters.png`;
- `../output/qa/02-desktop-mobile-pairs.png`;
- `../output/qa/03-p01-stack-order.png`;
- `../output/qa/04-posters-vs-layer-stacks.png`.

Those files are provenance for alignment and responsive packaging, not a new
art-direction gate. The current raster artwork, including the tactile hands in
`AI-02`, has been explicitly accepted for this goal; no image regeneration or
additional hand audit remains in scope.

## Editorial and product boundary

The approved copy files remain byte-for-byte equal to the prior golden master:

| File | SHA-256 |
| --- | --- |
| `src/content/manifesto.ts` | `2474405d533484eecb0c880936f43f389b7a8cd9021e5d902dfb1b2733ec760c` |
| `src/content/manifesto.ru.ts` | `1b3b654f18ab34a4c28225fb5b1aae6f97ddadbf3f51f7d2e9b7d97c19e25c89` |
| `src/content/pathways.ts` | `f1624bfc0fa89b329d68eb4dbc0d5611d34ccba8d3d6b973af36a68855749ce4` |
| `src/content/pathways.ru.ts` | `2e85dc5aa77c6d872db5b14456caa0e57497b8feb704e77a384297b0f7a8e88c` |
| `src/content/atlasReading.ts` | `67fe34c23309e4cf97150676e37a756661265f1307e4f95d699e298a1683f5f6` |

Structural wrappers and the explicitly authorized final line are the only
content-path changes. All 35 beats in the seven expansion scenes now have
authored Russian labels and the approved RU narration from `SCENE_SPECS.md`.
Locale selection replaces words only: beat ids, offsets, layers, and motion
remain identical. Existing M01-M12 narration keeps its previous EN-only
behavior. Scene narration and accessible descriptions are metadata rather
than a rewrite of the book.

The integrated editorial leaves do not alter that boundary. They reuse the
localized scene title, `plainMeaning`, and current beat narration as HTML. No
required phrase was added to the raster, and the normal-flow copy remains the
single accessible reading source.

Production source scans find no form, fieldset, input, textarea, select,
submit action, empty `href="#"`, empty `to="#"`, Three.js import, WebGL host,
or canvas scene. Remaining controls have a real purpose: navigation, locale,
Quiet view, mobile menu, Skip, and error recovery.

## Automated verification

The final combined run after the editorial-stage, reading-position,
scene-specific-copy, and compact-boundary changes passed:

- Vitest: `19/19` files, `127/127` tests;
- TypeScript: `tsc --noEmit` passed;
- Vite production build: passed (`101` modules transformed);
- `git diff --check`: passed.
- manifest integrity: passed for `7` manifests / `60` production records;
- form, empty-link, and 3D scan: passed.

Vite emits one non-blocking warning: the single-page book’s main minified
chunk is `631.24 kB` (`197.34 kB` gzip), above the default 500 kB warning
threshold. It is an optimization note, not a runtime or acceptance failure.

## Acceptance closeout

Implementation, assets, semantic editorial copy, scene-specific placement,
compact behavior, locale-position transfer, Chrome/Playwright coverage,
Safari Computer Use coverage, and the final automated gate are complete. No
acceptance blocker remains for the local static-site scope.
