# Project document map

For work covered by the Mandatory Spec Gate, active contracts in
[`specs/`](specs/README.md) define intended product behavior. The running site,
tests, screenshots, and Git history are evidence of current behavior; they do
not silently replace a product contract. This map preserves the project inputs
needed to evolve the work without flattening its editorial or visual language.

## Authority order

1. [`specs/index.md`](specs/index.md) — active product contracts and their
   precedence for future behavior work.
2. `AGENTS.md` — repository workflow and enduring product guardrails.
3. `product/PUBLIC_SOURCE_COLOPHON_PLAN.md` — approved public source framing.
4. `visual/reference/popup-game-master.png` and
   `visual/scene-expansion/SCENE_SPECS.md` — visual and motion source of truth.
5. `product/`, `thesis/`, and `universe/` — product shape and poetic canon;
   use the spec index where an older document conflicts with current contracts.
6. `governance/TRACEABILITY.md` and `source/` — internal provenance and
   editorial safeguards.
7. `reports/` — evidence from completed, named migrations; useful context, not
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
