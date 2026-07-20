# Repository Instructions

This checkout is the long-term home of **How We Forget to Fly**. Treat its
active specs and canonical files under `docs/` as authoritative for intended
product behavior. Tests are authoritative verification artifacts, not a
replacement for active specs. The former prototype checkout is archival input
only: do not synchronize files back to it and do not add absolute paths that
depend on it.

## Mandatory Spec Gate

Follow [`docs/spec-first-workflow.md`](docs/spec-first-workflow.md). The active
product contracts and their precedence live in
[`docs/specs/index.md`](docs/specs/index.md).

For every product feature, observable behavior change, behavioral bug,
behavioral investigation, product-behavior plan, or refactor with possible
behavioral impact:

1. Read this file, [`docs/specs/README.md`](docs/specs/README.md), the spec
   index, and every active spec governing the task.
2. **Before opening implementation source, tests, runtime evidence, or Git
   history**, state a visible **Spec Basis** with authoritative spec paths,
   expected behavior, invariants and edge cases, gaps or conflicts, required
   spec impact, and whether implementation is authorized.
3. If the contract is missing or conflicts, create or update its spec first.
   For a behavior change, the spec edit precedes the first implementation edit.
4. Only then inspect implementation evidence. Code, tests, runtime output,
   screenshots, and history establish actual behavior; they do not silently
   replace intended product behavior.

An explicit brownfield discovery pass is the only exception: record the absent
or unreliable contract first, inspect the project as evidence, and create
first-pass specs without changing product implementation. Planning-only and
investigation-only requests never authorize implementation.

## Optional Browser QA Routing

This browser UI keeps optional browser-QA artifacts under `qa/`. Browser QA is
verification evidence, not a replacement for the Mandatory Spec Gate or active
product specs.

If the task is about browser smoke checks, regression runs, or QA reports:

- read `qa/README.md` and `qa/web/AGENTS.run.md`;
- read the active specs that define the expected behavior before assessing it.

If the task is about creating or updating browser QA cases:

- read `qa/web/AGENTS.cases.md` and `qa/web/create-cases-prompt.md`;
- read the governing active specs and search existing cases before adding one.

If a task changes user-visible browser behavior, update or add the relevant
browser-QA artifact when the behavior has a browser case. Keep generated run
reports, screenshots, logs, and browser output uncommitted.

## Working agreement

- The runnable site lives at the repository root. Keep `src/`, `public/`, and
  the package/config files sufficient for a clean `npm ci` checkout.
- Run `npm run check` before handing off code changes. It performs typecheck,
  the full Vitest suite, and the production build.
- Do not commit `node_modules`, `dist`, local npm caches, Playwright output,
  screenshots made only for QA, logs, editor state, or environment files.
- Runtime illustration layers in `public/` are source assets, not generated
  build output. Preserve them unless code and visual QA prove an asset unused.
- Keep internal provenance in `docs/source/` and governance in
  `docs/governance/`; neither directory may be imported into the public app.
- Preserve the MIT `LICENSE`. Do not commit secrets or machine-specific paths.

# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not
give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's
`get-context` skill when the visual source is unclear or no longer matches the
current goal. When the user gives durable prototype-specific design feedback,
preferences, or decisions, record them in this file.

When implementing from a selected generated mock, treat that image as the
source of truth for layout, component anatomy, density, spacing, color,
typography, visible content, and hierarchy.

## Canonical editorial contract

- The completed editorial migration and its preservation constraints are
  defined by `docs/product/PUBLIC_SOURCE_COLOPHON_PLAN.md`; verification is in
  `docs/reports/PUBLIC_SOURCE_COLOPHON_REPORT.md`.
- Current rendered EN/RU copy is the approved golden master. Future work must
  preserve the source reframing and must not become a general rewrite,
  simplification, or re-authoring pass without explicit approval.
- Do not revive superseded restructuring proposals or use older product/source
  documents to broaden that narrow goal.

## Product form

- The work is one continuous bilingual long-form page. Top navigation scrolls
  to anchored chapters; it does not open a collection of separate products.
- The reading order is: Cover -> Manifesto -> Parents -> Adults -> AI as Wind
  -> Atlas -> an independent poetic ending.
- The header, section navigation, motion control, and EN/RU locale control must
  be available from the first screen and remain usable throughout the page.
- Keep the three project links in that persistent header using the compact
  HoldType pattern: icon-only Twitter, Patreon, and GitHub links on desktop;
  the same icons with localized labels inside the mobile menu. Their canonical
  destinations are `https://x.com/potapenko`,
  `https://www.patreon.com/c/playphraseme`, and
  `https://github.com/potapenko/howweforgettofly`.
- This is a reading experience. Do not add forms, questionnaires, editable
  exercises, accounts, profiles, saved histories, analytics, databases, or
  live AI calls. Reflective questions may appear as prose, never as a hidden
  assessment or data-collection flow.
- Keep editorial text and every meaningful control in semantic HTML.

## Independent editorial identity

- The public title remains **How We Forget to Fly / Как мы забываем
  летать** unless the user explicitly changes it.
- The work may continue to call itself a book and use chapters, pages, folds,
  and reading language. Public detachment concerns the external source book,
  not this work's own living-book identity.
- Treat the site as an independent interactive poetic manifesto and open myth
  about creative authorship in the age of AI. It is not a course, a handbook,
  an explainer, a summary of another work, or a scientific argument.
- Do not rationalize the work into a list of competencies or a literal labour-
  market prediction. Its meaning should emerge through image, rhythm,
  recurrence, contrast, and the visitor's movement through the paper world.
- A degree of mystery is intentional. Do not explain every metaphor adjacent
  to the metaphor, flatten every chapter into a practical takeaway, or require
  every poetic proposition to resolve into one unambiguous thesis.
- Use this invariant when editing: **poetic meaning may remain open; ethical
  boundaries must remain clear.** What Flight ultimately means may stay open.
  Whether Flight establishes human rank, excuses harm, or removes
  responsibility may not.

## Poetic canon

- Preserve Flight, Sky, Wind, Ground, Maps, Compass, Call, Lift, Making,
  Return, and Gravity as the carrying language of the work. They may be
  translated into ordinary language when a passage needs grounding, but they
  must not be removed merely to make the work more conventional or explicit.
- The canonical arc remains `Call -> Compass -> Lift -> Making -> Flight ->
  Return -> Ground`. It is a poetic and ethical structure, not a score,
  ladder, diagnosis, personality type, or mandatory program.
- Flight is an event of situated authorship, never a superior kind of person.
  Ground includes reality, craft, care, limits, obligation, routine, repair,
  and rest; it is not failure.
- Maps are useful knowledge, memory, instruction, and craft. The danger begins
  only when a map claims to be the whole sky.
- AI is Wind: it can amplify, resist, accelerate, disturb, or reveal possible
  routes. It cannot own direction, consent, care, human worth, adoption, or
  responsibility. Keep this as a living metaphor rather than turning it into
  a product-usage checklist.
- Parents are Keepers of Conditions. Adults retain responsibility for safety,
  care, time, limits, and consequences without treating a child as a project
  whose identity or result belongs to the adult.
- Do not divide people into creative and uncreative, flying and lesser,
  awakened and asleep, or useful and replaceable. Do not use fear of AI to
  justify human dignity.

## Public framing of the source book

- Internally, the source book remains an acknowledged inspiration and a
  supported philosophical impulse. The user does not want the new work to
  reject or scientifically litigate that impulse. Public reframing changes
  the framing, not the project's agreement with the underlying idea.
- The public work must stand on its own. Its only source acknowledgment is one
  short, visually subordinate colophon line at the very bottom, after the
  complete poetic journey. The line may name the authors, book title, and its
  influence; it must not become a chapter, card, CTA, recommendation, or
  promotional block.
- The colophon speaks in a warm first-person authorial voice and names the book
  directly as the source of inspiration. Do not qualify that relationship with
  `отчасти`, `частично`, `partly`, or `in part`, and do not return to the dry
  distancing construction `на эту работу повлияла / this work was influenced
  by`.
- Outside that allowlisted colophon, do not mention the source book, its
  authors, title, URL, web archive, adaptation, translation, inspiration,
  provenance labels, or source boundary in rendered copy, navigation,
  metadata, accessibility labels, or public end matter.
- Keep the removed public `Source / Источник` chapter and source note out of
  the product. Their former position is now the independent poetic ending
  **The Sky Remains Open / Небо остаётся открытым**.
- Preserve all other current public copy by default. Do not restructure or
  rewrite the Manifesto, Parents, Adults, AI, or Atlas merely to create greater
  distance from the source.
- If a direct source-dependent phrase remains outside the removed apparatus,
  make the smallest necessary change. If a close paraphrase without a direct
  source reference is suspected, report it for a separate editorial decision;
  do not silently rewrite approved copy in this migration.
- Preserve internal provenance materials such as `docs/source/SOURCE_MAP.md`,
  `docs/source/IDEA_CARDS.md`, `docs/source/SOURCE_AND_ATTRIBUTION.md`, and
  `docs/governance/TRACEABILITY.md`. They are internal editorial safeguards and
  must not be deleted merely because they are no longer public content.
- If the repository or documentation is published, keep those internal
  provenance materials outside the deployed/public artifact. Only the small
  approved colophon belongs in the public build.

## Language contract

- English and Russian are parallel authored editions, not a literal source-
  target translation pair. Preserve meaning, rhythm, ambiguity, and emotional
  temperature in each language even when sentence structure differs.
- The seven expansion scenes have authored Russian beat labels and narration
  in `src/story/storyCopy.ru.ts`. Their narration is the approved RU column
  from `docs/visual/scene-expansion/SCENE_SPECS.md`; localization may replace
  words but must never alter beat ids, offsets, layer poses, or motion.
- Avoid generic AI rhetoric, corporate manifestos, inflated promises,
  motivational coaching, and excessive explanation.
- Do not run a new `de-ai-writing` or literary pass over approved existing
  copy. Use `de-ai-writing` only for genuinely new text such as the replacement
  final scene, and preserve the open-myth voice rather than making it merely
  conversational.

## Visual and interaction contract

- The approved visual source of truth is
  `docs/visual/reference/popup-game-master.png` (1672x941, SHA-256
  `56e93a80db9cddd412d15cdaa4f00ee4eac59201ca19c7b44bab86ca45a4acf9`).
  Match its bright contemporary pop-up-game language across the entire work.
- The site is a playful modern paper world for young adults and parents: clean
  white stock, vivid sky/cobalt blue, lime and orange accents, bold sans-serif
  typography, wind ribbons, visible tabs and folds, and a sense of discovery.
  Never return to antique-book, sepia, occult, academic-laboratory, or serif-
  led styling.
- Treat the open book as the stage and world, not as evidence that the site is
  an adaptation and not as decorative chrome. Each chapter may reveal a
  different paper mechanism while retaining the same material, light, wind,
  and interaction grammar.
- Use layered image/DOM parallax and authored 2.5D motion. Do not reintroduce
  Three.js, WebGL geometry, or procedural 3D unless the user explicitly
  reauthorizes it. Source images are visual layers to animate, not references
  to approximate with CSS drawings.
- Illustrations must remain gently alive while idle. Scroll and pointer may
  increase the range of motion, but the scene must remain coherent and never
  become a pile of independently drifting fragments.
- Desktop chapters may use sticky scroll-played scenes. On mobile, use a
  full-width living illustration in normal document flow; do not pin the
  visitor inside a desktop-style scroll sequence.
- Every expansion scene owns an explicit `inlineProgress` that points to one
  of its authored beats. Do not replace those mobile compositions with a
  shared interpolated progress value.
- Keep the shared `175%` proximity gate and enforce a maximum of two hydrated
  heavy layer packs. Rank eligible packs by distance from the viewport and
  release an outgoing pack before warming its replacement.
- Support pointer, touch, keyboard navigation, and `prefers-reduced-motion`.
  Motion controls may reduce or stop decorative movement without hiding
  content or changing the meaning of the page.
- Never fake visible assets with emoji, text symbols, placeholder boxes, CSS
  art, or approximate handcrafted SVGs when the approved visual asset or a
  purpose-made image layer should be used.

## Acceptance checks for editorial changes

- Compare public copy against the pre-change baseline. Outside an explicit
  source-removal allowlist and the new final scene, approved text must remain
  unchanged.
- Read the complete EN and RU page in order; no chapter should require the
  source book to make sense.
- Search rendered copy, metadata, accessibility text, tests, and navigation
  for public source traces before declaring reframing complete. Author/title
  may appear only in the allowlisted bottom colophon.
- Confirm that mystery remains poetic rather than becoming broken hierarchy,
  missing context, illegible text, or ambiguous controls.
- Confirm that no edit turns Flight into achievement, makes Ground shameful,
  treats creativity as compulsory, or frames a child as an optimization
  project.
- Verify desktop and mobile in Safari as part of final QA. Preserve the
  desktop composition while allowing the mobile story to flow naturally.
