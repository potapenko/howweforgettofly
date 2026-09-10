# Blue-surface editorial illustrations

Authority: user requested paper subjects on the section's own blue background,
without white image mats. Illustrated-story-and-motion revision 5; Evolve.
Single-agent, current branch; no deployment.

## Scope and basis

Traversal: AGENTS.md → docs/specs/README.md → index.md →
features/illustrated-story-and-motion.md (rev 4 → 5), with
continuous-bilingual-reading and editorial-independence-and-colophon protected.
Supporting sources: SPOT_ILLUSTRATIONS.md, READING_ILLUSTRATION_DENSITY.md,
existing runtime illustrations, and the five rendered blue section instances.
Analytics, release, prose and living-scene motion are outside this change.

Shared owner: EditorialSpot.tsx gains an explicit blue surface. Only Home
recognition, pathway situation cards and the Atlas reader contract opt in.
White-background originals continue to serve paper surfaces. The same thirteen
subjects occupy the same 23 slots in every edition, with unchanged dimensions,
normal reading flow, lazy loading and decorative empty alt text.

## Final assets

All assets are in `public/illustrations/blue/`.
Section images have 1200×800 and 600×400 exports (the latter use `-600`).
Wind roles and Atlas rest use 600×400 only. Total: 23 WebP files.

- `shared-table.webp`
- `borrowed-map.webp`
- `question-window.webp`
- `child-roof.webp`
- `wind-craft.webp`
- `blanket-fort.webp`
- `atlas-rest.webp`
- `unfinished-drawing.webp`
- `wind-generator.webp`
- `old-notebook.webp`
- `paper-letter.webp`
- `compass-hands.webp`
- `dignity-bench.webp`

## Generation

Built-in ImageGen, one edit call per asset using its original white-background
illustration as the edit target. Final images were only downscaled and encoded
as WebP; no automated background-removal or retouch pipeline.

A transparency pilot returned a painted checkerboard in an RGB file and was
rejected. Finals instead use the requested blue surface, with a narrow CSS edge
blend and a small color calibration to match #063D96 while preserving white.
They are RGB assets, not alpha cutouts. Calibration matches the generated
background median; mild local texture remains within the illustrations.

Shared final prompt:

```text
Use case: precise-object-edit. Edit target: the supplied illustration. Replace ONLY the white seamless background and floor with a uniform deep cobalt blue RGB(6,61,150), hex #063D96, all the way to every image edge, including empty gaps between objects. Entire background must be the same flat blue, without gradient, vignette, texture or framing. Preserve all existing papercraft people, objects, paper structural bases, geometry, folds, bright white paper material and original object colors exactly. White subjects must remain opaque white, NOT blue-tinted. Keep the exact existing composition, camera, position and scale of each object in the landscape 3:2 frame, with fully contained silhouettes and existing margins. Do not crop or add anything. No white mat, no text, no symbols, no checkerboard. Website illustration to blend into a #063D96 blue section.
```

The shared-table pilot used the same background/color/preservation instructions.
For compass-hands, the prompt additionally preserved the sleeves' natural
termination at the bottom edge.

## Verification

- All thirteen source edits visually reviewed for subject, material and framing.
- In-app browser: RU desktop 1440×1000, RU mobile 390×844; Home recognition,
  Parents/Adults situations, AI letter/compass and Atlas contract inspected.
  All 23 blue placements use blue assets, none appear outside blue sections,
  no completed broken blue images and no horizontal mobile overflow.
- EN mobile recognition and desktop situation cards visually checked.
- Safari RU: desktop recognition and mobile Responsive Design Mode 390×844.
  This is responsive browser evidence, not a physical iPhone test.
- `npm run check`: typecheck, 209 tests in 24 files and ten-locale production
  build passed. Existing bundle-size advisory remains.
- Public copy and original assets unchanged. No motion/state/controller changes.

