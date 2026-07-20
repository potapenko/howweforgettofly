# Brownfield product map

**Status:** Discovery evidence, 2026-07-20. This map does not override active
specs; it records the bounded evidence used to create them.

## Product shape observed

The runnable application is a React/Vite bilingual living book. `src/App.tsx`
serves `/` and `/ru` as one `LongformPage`; legacy paths redirect to in-page
anchors or fall through to a not-found view. The ordered reading surface is:

1. Cover
2. Manifesto
3. Parents
4. Adults
5. AI as Wind
6. Atlas
7. Final Sky and one quiet colophon

`SiteHeader` remains available throughout. It provides anchored chapter
navigation, a motion/Quiet control, EN/RU switching that retains the nearest
semantic reading location, and the three project destinations. The primary
content is semantic, and the test suite explicitly guards against forms and
workbench routes.

## Editorial system observed

EN and RU content are parallel authored editions selected by path. The current
repository instructions designate rendered EN/RU copy as the approved golden
master. A public source reference is limited to the non-interactive final
colophon; internal source and governance files must remain outside the runtime.

## Visual and motion system observed

The page combines text with authored raster paper-world scenes. Desktop scenes
may use sticky scroll progress, pointer parallax, idle ambient motion, and
beat narration. At mobile widths scenes move into normal document flow with
authored inline progress. Quiet view and `prefers-reduced-motion` retain content
while settling decorative motion. The layer system uses proximity hydration
and an explicit cap on heavy scene packs.

## Evidence consulted

- `AGENTS.md`
- `docs/product/PUBLIC_SOURCE_COLOPHON_PLAN.md`
- `docs/visual/scene-expansion/SCENE_SPECS.md`
- `docs/visual/reference/popup-game-master.png`
- `src/App.tsx`, `src/routes/LongformPage.tsx`, header/footer, locale,
  navigation, and story modules
- representative route, story, navigation, and motion tests

## Authority conflicts found

Older `docs/product/SITE_THESIS.md`, `docs/product/MVP_SPEC.md`, and portions
of the older visual/product material describe separate routes, interactive
practices, a source/about page, or source links. These conflict with the
current long-form, no-form, and final-colophon contract in `AGENTS.md`,
`PUBLIC_SOURCE_COLOPHON_PLAN.md`, and current tests. The spec index classifies
the conflicting documents as supporting context, not active behavior.

No implementation was changed during this discovery pass.
