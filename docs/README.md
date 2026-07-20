# Project document map

The running site and its tests are the behavioral source of truth. These
documents preserve the intent needed to evolve the work without flattening its
editorial or visual language.

## Authority order

1. `AGENTS.md` — current repository and product invariants.
2. `product/PUBLIC_SOURCE_COLOPHON_PLAN.md` — approved public source framing.
3. `visual/reference/popup-game-master.png` and
   `visual/scene-expansion/SCENE_SPECS.md` — visual and motion source of truth.
4. `product/`, `thesis/`, and `universe/` — product shape and poetic canon.
5. `governance/TRACEABILITY.md` and `source/` — internal provenance and
   editorial safeguards.
6. `reports/` — evidence from completed, named migrations; useful context, not
   a substitute for rerunning the current test and browser gates.

## Boundaries

- `docs/source/` is intentionally kept in the repository but outside the
  public runtime. Do not import it from `src/` or copy it into `public/`.
- Historical Three.js directions and bulk image-generation workspaces were not
  migrated. The current implementation is the layered 2.5D parallax system.
- Local screenshots, browser logs, caches, dependency folders, and generated
  builds are deliberately excluded from version control.
- When a document and the current rendered/tested behavior disagree, stop and
  resolve the conflict explicitly instead of silently reviving an older plan.
