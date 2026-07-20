# How We Forget to Fly

**How We Forget to Fly / Как мы забываем летать** is a bilingual living web
book about creativity, human authorship, parenting, and AI as Wind.

![The opening paper world](./public/scenes/master-approved.png)

The experience is one continuous reading journey rather than a collection of
pages or a course. Its paper pop-up scenes stay gently alive, respond to
scroll and pointer movement on desktop, and become full-width illustrations in
the normal reading flow on mobile. The runtime uses layered HTML and raster
assets; it does not use Three.js, canvas, or WebGL.

## Experience

- English lives at `/`; the parallel Russian edition lives at `/ru`.
- The reading order is Opening → Manifesto → Parents → Adults → AI as Wind →
  Atlas → The Sky Remains Open.
- Header navigation scrolls to chapters inside the same long page.
- Quiet view and `prefers-reduced-motion` stop decorative movement without
  hiding content.
- The site is static and reading-only: no forms, accounts, analytics,
  database, saved responses, or server-side API.

## Run locally

Requirements: Node.js 22 or newer and npm 10 or newer.

```bash
npm ci
npm run dev
```

Vite serves the project on `http://127.0.0.1:5173/` by default and selects the
next available port when it is occupied.

Run the complete local verification gate with:

```bash
npm run check
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite server |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm test` | Run the complete Vitest suite once |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Typecheck, test, and build in CI order |

## Project structure

```text
src/
  components/   Shared shell, navigation, and scene integration
  content/      Authored English and Russian editions
  i18n/         URL-derived locale handling
  routes/       Continuous book composition and redirect routes
  story/        Parallax registry, motion, loading, and scene copy
public/
  parallax/     Aligned raster layers used by the living scenes
  scenes/       Complete responsive poster fallbacks
docs/           Product canon, visual direction, and internal provenance
```

`src/routes/LongformPage.tsx` composes the semantic book.
`src/story/ParallaxStage.tsx` owns poster-first loading, sticky desktop
progress, pointer parallax, ambient motion, reduced motion, and inline mobile
behavior. `src/story/storyRegistry.ts` is the runtime asset and scene registry.

## Documentation

The durable project context is kept with the code:

- [Product and interaction specifications](./docs/product/)
- [Editorial foundations](./docs/thesis/)
- [Flight universe canon](./docs/universe/)
- [Visual system and scene specification](./docs/visual/)
- [Traceability and editorial safeguards](./docs/governance/TRACEABILITY.md)
- [Internal source provenance](./docs/source/)

The source-provenance documents are repository records. They are not imported
into the app and must not become part of the deployed reading experience.
See [docs/README.md](./docs/README.md) for the document map and authority order.

## Deployment

`npm run build` produces a static `dist/` directory. A host must serve
`index.html` as the fallback for client-side routes such as `/ru`. The build
contains no server component and needs no environment variables.

## License

The code and repository documentation are available under the
[MIT License](./LICENSE). Illustration and text reuse should also respect the
authors and sources documented inside the repository.
