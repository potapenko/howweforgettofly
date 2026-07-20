# How We Forget to Fly — scene expansion specifications

**Status:** implemented visual specification; production assets, registry, and
runtime are recorded in
`../../reports/VISUAL_RHYTHM_EXPANSION_REPORT.md`

**Scope:** `AI-02`, `AI-03`, `AI-04`, `P-01`, `A-01`, `ATLAS-01`,
`FINAL-01`

**Date:** 2026-07-20

**Editorial boundary:** the current rendered EN/RU copy is the golden master

This file instantiates Package 2 of
[`../../product/VISUAL_RHYTHM_EXPANSION_PLAN.md`](../../product/VISUAL_RHYTHM_EXPANSION_PLAN.md).
It records the seven implemented visual acts. It does not authorize a broader
rewrite, new product flows, or replacement of any approved paragraph.

## 1. Authority and copy lock

The specifications are downstream from:

1. [`../../../AGENTS.md`](../../../AGENTS.md);
2. [`../POPUP_GAME_ART_DIRECTION.md`](../POPUP_GAME_ART_DIRECTION.md);
3. the locked reference
   [`../reference/popup-game-master.png`](../reference/popup-game-master.png),
   1672 × 941, SHA-256
   `56e93a80db9cddd412d15cdaa4f00ee4eac59201ca19c7b44bab86ca45a4acf9`;
4. the current English registry
   `src/content/pathways.ts` and Russian contextual edition
   `src/content/pathways.ru.ts`;
5. the current Atlas and Final Sky copy in `src/routes/` and their scene
   metadata in `src/content/pages.ts`.

Every block labelled **approved anchor copy** below is quoted from the current
registry and remains read-only. New scene metadata is explicitly labelled
**draft**. It may be added alongside the approved copy after editorial review;
it must not silently replace that copy.

### Anchor implementation note

`honest-modes`, `ground-gravity`, `human-assignments`, `direction-test`,
`cycle`, `adoption-attribution`, and `human-first-pattern` are stable content
registry keys. At the time of this specification, `PathwayPage` does not emit
each key as a DOM `id`. Implementation may expose the existing key on its
existing `<section>` or associate the new scene with it through data, but must
not create a second element with the same id and must not rename the content
key.

`drift-04` is a nested card key inside `drift-repairs`, not a chapter-level
DOM anchor. It is supporting context for `AI-03`; the primary scene anchor
remains `direction-test`.

## 2. Shared scene contract

### 2.1. Visual system

- Preserve the locked master’s clean open book, blue cover edge, visible
  central spine, stacked page edges, bright sky/cobalt blues, lime and orange
  accents, white paper, cool shadows, and playful contemporary paper
  engineering.
- Keep a calm editorial leaf with enough negative space for code-native text
  and a spatial diorama leaf carrying the visual event.
- Use three to six perceptible planes, one dominant mechanism, believable
  hinges, tabs, folds, braces, slots, fibers, thickness, and contact shadows.
- No serif, sepia, parchment, occult light, scientific-control-panel mood,
  dashboard UI, score, rank, progress rail, emoji, flat-vector substitute, or
  generic stock illustration.
- Flight, Return, Ground, rest, refusal, waiting, help, and an unfinished form
  never form a hierarchy of human worth.

### 2.2. Raster and layer package

Each scene is authored first as one complete 1672 × 941 master and only then
separated from that approved master. Independently regenerated layers are not
acceptable because their geometry and light will drift.

| Role | Future production path | Contract |
| --- | --- | --- |
| master | Original generation workspace, not migrated | Review source; never loaded by production |
| poster | `public/scenes/{ID}.webp` | Complete settled or semantically complete pose |
| background | `public/parallax/{ID}/background.webp` | Full aligned book, page, sky, and immobile supports |
| primary | `public/parallax/{ID}/primary.webp` | Dominant paper mechanism on transparent 1672 × 941 canvas |
| secondary | `public/parallax/{ID}/secondary.webp` | Movable forms or consequence plane on transparent 1672 × 941 canvas |
| atmosphere | `public/parallax/{ID}/atmosphere.webp` | Optional Wind/vellum only when the scene requires it |
| mobile | `public/parallax/{ID}/mobile/*.webp` | Approximately 960 px wide authored package; not a download alias to desktop |

All layer canvases share the master’s crop, color, light, and pixel alignment.
The production manifest records actual dimensions, bytes, and SHA-256 hashes
after generation. Until those files exist, those fields are `TBD`, never
invented.

### 2.3. Motion envelope

- Internal desktop scenes: approximately `240vh`, five beats, stable forward
  and reverse scroll, no dead zone.
- `FINAL-01`: approximately `380vh`, five beats, slower landing.
- Scroll owns the transformation. Pointer adds depth only: approximately
  0–4 px background, 0–12 px primary, 0–18 px secondary, and 0–22 px optional
  atmosphere at the 1672 × 941 artboard scale; rotation stays below 0.9°.
- Idle movement is approximately half the local scroll/pointer envelope and
  uses long, non-synchronised 14–24 second breaths. It must not disassemble the
  composition or continuously move the Compass.
- At `900px` and below each expansion scene is full-width, inline, non-sticky,
  and uses one authored pose with only small ambient breathing. Coarse pointer
  does not run pointer parallax.
- The opening cover keeps its independent `820px` breakpoint; the expansion
  scene threshold does not alter the approved cover composition.
- Quiet view and `prefers-reduced-motion` render the same complete settled
  pose with no idle, pointer, or scroll animation.
- All raster planes are decorative in the accessibility tree. Each scene has
  one reviewed `ariaLabel`; approved prose remains semantic HTML.

### 2.4. Exact-content signature

Every scene below carries the same signature:

> No title, thesis, label, number, instruction, paragraph, navigation item,
> response, or required EN/RU copy is baked into the generated image. Blank
> material marks are allowed only when their meaning is also present in HTML.

### 2.5. Proposed runtime identities

These values are additive implementation drafts. New mechanism ids require an
explicit `MechanismId` extension and matching story registry entry; they must
not be aliased to unrelated M01–M12 art.

| Scene | Future scene id | kind | register | accent | proposed mechanism |
| --- | --- | --- | --- | --- | --- |
| `AI-02` | `scene-ai-02` | `route` | `atlas` | `ochre` | `adoption-folds` |
| `AI-03` | `scene-ai-03` | `route` | `atlas` | `blue` | `candidate-map` |
| `AI-04` | `scene-ai-04` | `route` | `quiet` | `ochre` | `return-threshold` |
| `P-01` | `scene-p-01` | `route` | `quiet` | `blue` | `honest-mode-rail` |
| `A-01` | `scene-a-01` | `route` | `atlas` | `blue` | `ground-or-gravity` |
| `ATLAS-01` | `scene-atlas-01` | `route` | `atlas` | `rust` | `equal-lenses` |
| `FINAL-01` | `scene-final-01` | `final` | `quiet` | `blue` | `open-horizon` |

### 2.6. Implemented semantic editorial leaf

The masters deliberately reserve a calm paper or sky field for code-native
copy. That field is now part of the desktop composition for all seven
expansion scenes; the intended copy was not baked into or regenerated inside
the raster.

| Scene | Editorial field | Beat narration |
| --- | --- | --- |
| `AI-02` | opaque upper-left paper panel | integrated into the panel |
| `AI-03` | three separate reading zones on the left paper leaf | integrated into a compact lower paper zone |
| `AI-04` | three separate reading zones on the front face of the vellum screen | integrated into a slightly more opaque lower vellum band |
| `P-01` | broad central sky for title and thesis | printed on the lower sentence strip |
| `A-01` | all six hanging paper tags: title, thesis, current beat, and three paired Ground-condition blocks | one complete text role per tag, coupled to the primary layer |
| `ATLAS-01` | upper-left paper leaf | printed on the lower-right paper tab; the mechanisms occupy the lower left leaf |
| `FINAL-01` | split blue horizon field left of the spine | integrated into a separate lower-left horizon zone |

The title and thesis visible on the illustration are a presentational duplicate
of the full semantic heading and prose that follow the scene. The duplicate is
therefore hidden from the accessibility tree; narration remains live semantic
HTML. Every scene carries title, thesis, and current beat copy inside the
illustrated spread. `P-01` deliberately separates those roles: its two-line
title and thesis occupy the broad central sky, while the active beat is printed
on the lower sentence strip so it never floats above or privileges one of the
three mechanisms. `ATLAS-01` is the other deliberate placement exception,
keeping its beat on the physical lower-right paper tab instead of in a
viewport-relative card. At `900px` and below the
duplicate editorial layer is hidden entirely, because the full-width inline
illustration is immediately followed by the normal-flow accessible text. This
prevents tiny overlaid type without removing meaning.

Every desktop text role is positioned from its physical carrier first: the
actual page leaf, vellum screen, hanging tag, sentence strip, paper tab, or
horizon field visible in the master. The carrier rectangle is not the text
origin. Copy receives a further inner inset of at least `2.5%` horizontally and
`3%` vertically wherever the carrier geometry allows it. It must also retain a
`5%` outer-book gutter and a `4.5%` spine gutter unless the carrier itself
crosses the spine. A title, thesis, or beat that merely overlaps its intended
graphic surface is a layout failure even when it remains inside the viewport.

The later mixed text-and-image scenes use measured, mechanism-specific desktop
zones rather than the generic `paper-left`, `vellum-left`, or `horizon-left`
flow. Percentages are relative to the complete `1672 × 941` artboard and remain
unchanged when the artboard is scaled:

| Scene | Title `left / top / width / height` | Thesis `left / top / width / height` | Current beat `left / top / width / height` |
| --- | --- | --- | --- |
| `AI-03` | `10.5 / 23 / 19.5 / 13.5` | `10.5 / 39 / 18.5 / 8.5` | `10.5 / 51 / 16 / 15.5` |
| `AI-04` | `20.93 / 31.88 / 21.53 / 12.22` | `20.93 / 45.7 / 20.93 / 7.97` | `20.93 / 54.5 / 20.33 / 12.22` |
| `ATLAS-01` | `10.5 / 22.5 / 29.5 / 11.5` | `10.5 / 35.5 / 29.5 / 4.5` | `73.5 / 64.5 / 15.5 / 10.5` |
| `FINAL-01` | `28.5 / 12.5 / 17 / 12` | `55 / 20.5 / 14.5 / 8.5` | `22.5 / 38.5 / 16.5 / 11` |

`P-01` follows the same carrier rule even though its roles are split. Its title
starts below the descending top edge of the central sky rather than touching
that edge. The lower narration rectangle describes the complete white sentence
strip (`21.8 / 70.8 / 50 / 14.5`), not the first glyph position; the active
beat is inset inside that strip on every side. No label or body line may begin
left of the strip, sit on its outline, or descend through its bottom rule. The
heading remains static within the background sky field, while the narration
rectangle must independently inherit the authored full-artboard pose of
`honest-mode-rail-primary` so translation, scale, rotation, scroll, and pointer
motion cannot detach the words from the moving strip. Its transform reference
box is the complete `1672 × 941` artboard, not the smaller text rectangle.

Their titles use authored two-line breaks in both editions so browser text
balancing cannot reintroduce arbitrary three-line headings:

| Scene | EN | RU |
| --- | --- | --- |
| `AI-03` | `A map that pretended` / `to be the Sky` | `Карта, которая` / `притворилась небом` |
| `AI-04` | `Return from` / `simulation` | `Возвращение` / `из симуляции` |
| `ATLAS-01` | `One sheet, ten` / `honest doorways` | `Один лист, десять` / `честных входов` |
| `FINAL-01` | `The Sky` / `Remains Open` | `Небо остаётся` / `открытым` |

The title and thesis remain a presentational duplicate hidden from the
accessibility tree. Each current beat remains semantic HTML, and only the
active beat may be visibly opaque. The title, thesis, and beat zones must not
share one implicit vertical flow, because their physical paper carriers do not
share one rectangle.

`AI-04` uses the measured front vellum face, not the open book page behind it,
as its only editorial carrier. Its combined safe typography rectangle is
approximately `20.04 / 30.29 / 23.92 / 37.19`; the three smaller rectangles in
the table remain inset inside it. At the `1672 × 941` master this preserves at
least about `30px` from the slanted vellum edge and approximately
`L56 / T30 / R55 / B35px` around the combined composition. The current beat
uses a quiet top rule on the existing vellum rather than drawing a second
rounded paper card over the illustration. Its taller final inset rectangle and
fluid type/gap/padding must also contain the longest RU and EN beats at the
supported `901px` sticky boundary; the overlay disappears in the `900px`
inline composition.

The `A-01` editorial wrapper follows the same authored scroll and pointer
transform as `ground-or-gravity-primary`. Its six text fragments therefore
remain printed on the moving hanging tags rather than floating above them. The
title belongs wholly inside the first broad rounded tag, the thesis inside the
second angular tag, and the current beat inside the third cloud-shaped tag.
Their inner text rectangles are respectively `10.29 / 22.21 / 9.57 / 9.14`,
`24.4 / 30.61 / 8.25 / 10.63`, and `38.4 / 35.07 / 8.25 / 10.63` on the full
artboard. These are inset reading rectangles, not the outer silhouettes of the
tags.
The remaining three tags repeat the six exact Ground-condition titles that
follow the scene, paired without rewriting: Money + Care on the fourth round
tag, Craft + Work on the fifth angular tag, and AI + Rest on the sixth
cloud-shaped tag. Their inset rectangles remain
`54.61 / 32.41 / 9.33 / 11.69`, `69.02 / 29.76 / 6.52 / 10.63`, and
`80.56 / 20.72 / 9.21 / 11.69`; only the six short labels may use the
non-wrapping treatment in those small carriers. Their `body` and longer
Gravity `detail` stay in the
normal-flow prose below; they must not be miniaturized into decorative
microcopy. Every role keeps a deliberate inner inset and artboard-relative type
scale so no line escapes its paper surface at supported desktop aspect ratios.
The `A-01` title resolves in exactly two authored lines in both editions, and
no hanging tag is left as an unexplained empty text plane.

### 2.7. Implemented reading-position and browser contract

- Locale links use stable `*-illustration` anchors and transfer the exact
  relative progress within the current scene. The in-app Browser and Safari
  both preserve the scene and beat across RU/EN changes.
- The in-app Browser has inspected `P-01`, `A-01`, `AI-03`, `AI-04`,
  `ATLAS-01`, and `FINAL-01` in both editions at the desktop artboard, plus the
  `901px` sticky / `900px` inline boundary and the `768px` inline composition.
  The fresh `P-01` mid-scroll check records an identical computed transform and
  full-artboard rectangle for `honest-mode-rail-primary` and its narration
  carrier; every active beat remains inside the sentence strip. No application
  errors or warnings appear in the Browser console.
- Safari Computer Use has inspected the same six mixed text-and-image scenes
  in both editions on the fresh runtime. `P-01` copy stays attached to its
  moving sentence strip through beat changes, all six `A-01` tags are filled,
  and no carrier-border or editorial collision remains.
- The final combined automated regression gate is complete: `19/19` test
  files and `144/144` tests, TypeScript typecheck, production build, and
  `git diff --check` all pass.

---

## 3. `AI-02` — Four gestures of authorship

### Placement and narrative job

- **Primary registry anchor:** `human-assignments`.
- **Secondary semantic bridge:** `human-first-pattern`.
- **Placement:** introduce the scene with the existing `human-assignments`
  section; let its settled state release into the existing Wind roles and
  later make the `human-first-pattern` distinction visually familiar.
- **Narrative job:** convert “generation is not adoption” from a definition
  into a physical act. The scene makes four human gestures visible without
  presenting any of them as a tool-generated recommendation.
- **Dominant mechanism:** four equal hinged landing folds around one candidate
  field; proposed future mechanism id `adoption-folds`.

### Approved anchor copy — read only

| | EN | RU |
| --- | --- | --- |
| section title | The human assignments | Что остаётся за человеком |
| plain | AI may contribute material, critique, and craft; it does not receive authority over dignity, purpose, consent, or Return. | ИИ может дать материал, критику или техническую помощь. Он не получает права решать вопросы достоинства, цели, согласия и Возвращения. |
| key paragraph | Generation is not adoption. A person adopts a form by deciding to use, share, rely on, or act through it with enough understanding to accept, change, reject, or verify it. | Сгенерировать — ещё не значит принять. Форма становится человеческим решением, когда человек достаточно её понимает, чтобы использовать, изменить, отвергнуть или проверить и отвечать за действие через неё. |

### New scene metadata — draft

| Field | EN | RU |
| --- | --- | --- |
| title | Four gestures of authorship | Четыре жеста авторства |
| plainMeaning | Generation is not adoption. | Сгенерировать — ещё не значит принять. |
| description | Wind carries several convincing paper forms toward four equal folds: accept, change, reject, and verify. A human hand changes one form while the Compass stays outside the Wind. | Ветер приносит несколько убедительных бумажных форм к четырём равноправным сгибам: принять, изменить, отвергнуть и проверить. Рука человека меняет одну форму, а Компас остаётся вне Ветра. |
| ariaLabel | An open pop-up book receives several wind-carried forms. Four equal paper mechanisms remain available while one form is deliberately changed and the Compass stays still. | В раскрытую pop-up-книгу Ветер приносит несколько форм. Четыре равноправных бумажных механизма остаются доступными; одна форма осознанно меняется, а Компас остаётся неподвижным. |

### State logic

- **Opening:** a small human-written blank note, an unfilled work area, and a
  manually held Compass rest on the book.
- **Tension:** several polished translucent candidates arrive together and
  temporarily crowd the work area.
- **Turn:** four equal hinges open; none is brighter, higher, numbered, or
  positioned as a default.
- **Landing:** one candidate bears a visible human fold or cut; the others
  remain candidates, including the possibility that none is adopted.

### Layer map

| Layer | Content | Meaning |
| --- | --- | --- |
| background | Complete open book, quiet work area, blank human note, fixed Compass, cool sky | Purpose and governing judgment exist outside generated material |
| primary | Four equal hinged landing folds arranged without a sequence | Accept, change, reject, and verify are inspectable human gestures, not a funnel |
| secondary | Several translucent candidate forms plus one visibly altered form | Output remains provisional until a person acts through it |
| atmosphere | Restrained cyan/cobalt Wind ribbons, separated from the Compass | Power and abundance without governing authority |

### Five beats

| Offset | Beat | Layer event | Draft narration EN / RU |
| ---: | --- | --- | --- |
| 0.00 | `note-waits` | Background fully visible; candidate planes folded out of view | A question and an empty place wait before the Wind arrives. / До Ветра уже есть вопрос и свободное место. |
| 0.22 | `forms-arrive` | Atmosphere crosses the page; secondary candidates enter together | Fluency brings material, not a decision. / Гладкость приносит материал, а не решение. |
| 0.46 | `four-folds-open` | Primary opens into four equal mechanisms | Four human gestures become visible. / Становятся видны четыре человеческих жеста. |
| 0.72 | `one-form-changes` | One secondary form folds, trims, or gains a verification tab; Compass stays fixed | One form changes because someone chooses to work through it. / Одна форма меняется, потому что человек решает с ней работать. |
| 1.00 | `candidates-land` | Wind softens; all four mechanisms and the no-adoption space remain available | The candidates settle. Responsibility does not move with the Wind. / Варианты успокаиваются. Ответственность не уходит вместе с Ветром. |

### Responsive and fallback

- **Mobile authored pose:** four mechanisms open at equal size; two candidate
  forms remain above them and one altered form rests beside the blank note.
  Wind is a single shallow arc, not a deep moving stack.
- **Reduced-motion pose:** beat 5 with all four gestures and the unfilled/no-
  adoption space visible.
- **Poster fallback:** the same semantically complete pose as reduced motion.
- **Forbidden reading:** no software toolbar, four-button UI, quality funnel,
  safety filter, approval pipeline, correct choice, or promise that human
  adoption is automatically wise.

---

## 4. `AI-03` — A map that pretended to be the Sky

### Placement and narrative job

- **Primary registry anchor:** `direction-test`.
- **Supporting content key:** `drift-04` inside `drift-repairs`.
- **Placement:** lead with the existing `direction-test` section. The scene
  lands before `family-boundary` and later echoes, without duplicating, the
  `drift-04` card.
- **Narrative job:** reveal how one attractive generated route can occupy the
  whole horizon and how scale, criteria, delay, and Ground return it to the
  status of a candidate map.
- **Dominant mechanism:** a glossy route rises as a map-wall, then folds back
  into one card among quiet alternatives; proposed mechanism id
  `candidate-map`.

### Approved anchor copy — read only

| | EN | RU |
| --- | --- | --- |
| section title | Recover direction from a polished proposal | Вернуть направление после гладкого предложения |
| plain | An appealing AI proposal is a candidate map, not a discovered purpose. | Привлекательное предложение ИИ — одна из возможных карт, а не обнаруженная жизненная цель. |
| supporting card | Options become an avalanche. More generation feels productive while no choice is made. | Варианты превращаются в лавину. Новые варианты создают ощущение работы, хотя выбор так и не сделан. |

### New scene metadata — draft

| Field | EN | RU |
| --- | --- | --- |
| title | A map that pretended to be the Sky | Карта, которая притворилась небом |
| plainMeaning | An appealing AI proposal is a candidate map, not a discovered purpose. | Привлекательное предложение ИИ — одна из возможных карт, а не обнаруженная жизненная цель. |
| description | One polished blue-and-orange route rises until it covers the horizon. More routes gather around it; then the Compass restores their scale beside a quiet path, a blank leaf, and Ground. | Один гладкий сине-оранжевый маршрут поднимается и закрывает горизонт. Вокруг накапливаются другие маршруты; затем Компас возвращает им настоящий масштаб рядом с тихой тропой, чистым листом и Землёй. |
| ariaLabel | A polished paper route expands into a wall and attracts an avalanche of alternatives, then folds down into one candidate map beside equally visible quiet and no-action paths. | Гладкий бумажный маршрут разрастается в стену и притягивает лавину вариантов, а затем складывается в одну возможную карту рядом с такими же видимыми тихим маршрутом и возможностью ничего не делать. |

### State logic

- **Opening:** one beautiful, usable candidate map appears on a broad Ground.
- **Tension:** it scales into a wall and pulls many neighboring routes into a
  dense, productive-looking avalanche.
- **Turn:** the Compass does not choose a route; it restores scale and reveals
  what each route had hidden.
- **Landing:** the candidate remains available beside a quiet path, a blank
  leaf, a small delayed fold, and unoccupied Ground.

### Layer map

| Layer | Content | Meaning |
| --- | --- | --- |
| background | Open book, broad Ground, horizon aperture, quiet path, blank leaf | Reality and alternatives remain even when briefly occluded |
| primary | One polished cobalt route/map on a physical hinge | A useful proposal becoming too large for its epistemic status |
| secondary | A family of materially different route strips and one delay fold | Abundance can hide the absence of choice |
| atmosphere | Wind ribbons that gather routes but never rotate the Compass | AI amplifies visibility and momentum, not purpose |

### Five beats

| Offset | Beat | Layer event | Draft narration EN / RU |
| ---: | --- | --- | --- |
| 0.00 | `candidate-appears` | Primary lies at map scale; horizon and Ground remain wide | One route arrives as a possibility. / Один маршрут появляется как возможность. |
| 0.20 | `map-fills-sky` | Primary hinges upward and occludes most of the horizon | Polish can make a candidate feel like the whole Sky. / Гладкость может выдать одну карту за целое Небо. |
| 0.45 | `avalanche-gathers` | Secondary routes enter on Wind at different depths | More routes can still leave the choice untouched. / Новых маршрутов становится больше, а выбора всё ещё нет. |
| 0.72 | `scale-returns` | Primary lowers; alternatives separate; Compass remains human-held | Compass restores scale; it does not compute destiny. / Компас возвращает масштаб, но не вычисляет судьбу. |
| 1.00 | `map-among-maps` | All routes rest as candidates beside quiet, delay, blank, and Ground | The map remains useful. The horizon returns. / Карта остаётся полезной. Горизонт возвращается. |

### Responsive and fallback

- **Mobile authored pose:** the polished route is half-lowered, exposing its
  hinge and a clear strip of horizon; three materially different alternatives
  and an unoccupied Ground plane fit in one coherent composition.
- **Reduced-motion pose:** beat 5; no wall occlusion and no route highlighted.
- **Poster fallback:** beat 5, with the former dominant route still visibly
  one candidate rather than erased.
- **Forbidden reading:** no evil AI storm, hypnotic tunnel, route-ranking UI,
  “trust your feelings” conclusion, contempt for maps or expertise, or promise
  that delay is always safer than action.

---

## 5. `AI-04` — Return from simulation

### Placement and narrative job

- **Primary registry anchor:** `adoption-attribution`.
- **Upstream premise anchor:** `cycle`.
- **Placement:** after the existing `adoption-attribution` section and before
  `craft-scope`, as specified by the canonical plan.
- **Narrative job:** distinguish a plausible rehearsal from Return. A form
  meets proportionate reality, acquires evidence or consequence, and comes
  back to people who can revise, repair, stop, keep private, or leave it
  incomplete.
- **Dominant mechanism:** a translucent rehearsal screen and a small physical
  threshold beyond the protected page; proposed mechanism id
  `return-threshold`.

### Approved anchor copy — read only

| | EN | RU |
| --- | --- | --- |
| cycle sentence | A simulated audience is preparation, not Return. An AI-assisted form becomes Flight only when people adopt it and it meets something beyond the generation loop. | Смоделированная аудитория — подготовка, а не Возвращение. Форма с участием ИИ становится Полётом, только когда люди осознанно принимают её и она встречается с чем-то вне замкнутого цикла генерации. |
| section title | Adopt and attribute in proportion to consequence | Принимать и указывать источник соразмерно последствиям |
| plain | Attribution says where material came from; adoption says who chose to use it and remains answerable. | Указание источника отвечает на вопрос, откуда взялся материал. Принятие — кто решил его использовать и продолжает отвечать за последствия. |

### New scene metadata — draft

| Field | EN | RU |
| --- | --- | --- |
| title | Return from simulation | Возвращение из симуляции |
| plainMeaning | A simulated audience is preparation, not Return. | Смоделированная аудитория — подготовка, а не Возвращение. |
| description | A smooth paper rehearsal appears behind a translucent screen. One adopted form crosses a small real threshold, meets material resistance or a trusted witness, and returns with a fold, a mark, and a repair brace. | За полупрозрачной ширмой возникает гладкая бумажная репетиция. Одна принятая форма проходит через небольшой реальный порог, встречает сопротивление материала или доверенного свидетеля и возвращается со сгибом, отметкой и опорой для исправления. |
| ariaLabel | A paper form leaves a consequence-free simulation, meets a small real condition, and returns visibly changed while the human-held landing area remains open to revision, repair, privacy, or stopping. | Бумажная форма выходит из симуляции без последствий, встречается с небольшим реальным условием и возвращается изменённой. На человеческой стороне остаются возможности исправить, отремонтировать, сохранить приватность или остановиться. |

### State logic

- **Opening:** a form receives fluent, consequence-free reactions behind a
  translucent screen.
- **Tension:** the simulation looks complete but leaves no material mark,
  consent, evidence, or affected relation.
- **Turn:** a human opens one proportionate real threshold; publication and a
  large audience are not required.
- **Landing:** the returned form, source mark, uncertainty, repair brace, and
  private/stop fold remain visible together.

### Layer map

| Layer | Content | Meaning |
| --- | --- | --- |
| background | Open book, protected work area, real material plane, small trusted-witness aperture, landing tray | Return can be small, private, and proportionate to stakes |
| primary | Translucent simulation screen with plausible but non-readable response shapes | Rehearsal can prepare but cannot consent or supply real effects |
| secondary | One adopted form shown before and after contact, with fold, mark, source tab, and repair brace | Reality changes the form and creates human work after generation |
| atmosphere | Wind passing through both zones without carrying the form home by itself | AI may accompany the encounter but does not perform Return |

### Five beats

| Offset | Beat | Layer event | Draft narration EN / RU |
| ---: | --- | --- | --- |
| 0.00 | `rehearsal-appears` | Primary screen rises; secondary form remains protected | A plausible audience appears without consequence. / Правдоподобная аудитория появляется без последствий. |
| 0.22 | `smooth-response` | Response shapes gather but leave the form unchanged | Rehearsal may prepare. It cannot consent or answer for reality. / Репетиция может подготовить. Она не даёт согласия и не отвечает за реальность. |
| 0.46 | `threshold-opens` | Background threshold opens at a deliberately small scale | A person chooses what kind of reality this form is ready to meet. / Человек выбирает, с какой реальностью форма уже готова встретиться. |
| 0.72 | `form-meets-world` | Secondary crosses, acquires one mark or fold, and begins returning | Contact leaves a trace that fluency could not supply. / Контакт оставляет след, которого не могла дать гладкость. |
| 1.00 | `return-is-held` | Form lands with source tab, uncertainty, repair, private, and stop options visible | Return becomes revision, repair, privacy, or an honest ending. / Возвращение становится правкой, исправлением, приватностью или честным завершением. |

### Responsive and fallback

- **Mobile authored pose:** translucent screen folded partly aside; the real
  threshold, returned marked form, repair brace, and private/stop fold all
  remain legible without a left-to-right cinematic trip.
- **Reduced-motion pose:** beat 5 with both the rehearsal screen and returned
  form visible so the distinction survives without motion.
- **Poster fallback:** beat 5; no applause, metrics, distribution graph, or
  large audience.
- **Forbidden reading:** real contact is not compulsory publication, virality,
  applause, exposure, or a demand that another person provide feedback. The
  scene must allow a reliable source, material test, trusted reader,
  collaborator, affected person, professional review, private trial, or a
  decision not to release the form.

---

## 6. `P-01` — Name the mode honestly

### Placement and narrative job

- **Primary registry anchor:** `honest-modes`.
- **Placement:** use the existing section as the middle visual turn of the
  Parents chapter; do not remove or compress its five cards.
- **Narrative job:** show that gentle language cannot create choice where no
  choice exists. The scene reveals the structure beneath a sentence and then
  makes three primary modes legible without ranking them.
- **Dominant mechanism:** one blank sentence strip turns to reveal a rail and
  then enters three honest paper mechanisms; proposed mechanism id
  `honest-mode-rail`.

### Approved anchor copy — read only

| | EN | RU |
| --- | --- | --- |
| section title | Name the mode honestly | Честно назвать режим |
| plain | Gentle wording does not make an instruction into an invitation, and a question is not open if only yes can survive. | Мягкие слова не превращают требование в приглашение. Вопрос нельзя назвать открытым, если приемлем только ответ «да». |
| paragraph | Choose the mode that matches the adult's real responsibility and the amount of choice actually available. | Форма разговора должна соответствовать реальной ответственности взрослого и тому выбору, который действительно доступен. |

### New scene metadata — draft

| Field | EN | RU |
| --- | --- | --- |
| title | Name the mode honestly | Честно назвать режим |
| plainMeaning | A question is not open if only yes can survive. | Вопрос нельзя назвать открытым, если приемлем только ответ «да». |
| description | A gentle blank sentence strip turns over and reveals a fixed rail beneath it. The strip then unfolds into an instruction, a boundary with real choice of method, and an invitation with a full, equally visible refusal exit. | Мягкая пустая бумажная реплика переворачивается и показывает скрытый жёсткий рельс. Затем она раскрывается в требование, границу с настоящим выбором способа и приглашение с такой же заметной створкой «нет». |
| ariaLabel | A blank sentence reveals whether it is carried by a fixed instruction, a boundary with workable choice, or an invitation whose refusal remains fully open. None of the three is ranked. | Пустая реплика показывает, что за ней стоит: прямое требование, граница с реальным выбором способа или приглашение, от которого действительно можно отказаться. Ни один режим не объявлен лучшим. |

### State logic

- **Opening:** one soft, unlabelled sentence strip looks equally open from the
  front.
- **Tension:** the strip rotates and reveals a rigid hidden rail that allowed
  only one answer.
- **Turn:** the rail separates into three truthful mechanisms with distinct
  physical structures.
- **Landing:** instruction keeps its necessary support; boundary keeps a fixed
  frame and several workable routes; invitation keeps a full exit. Co-
  exploration and witnessing remain in the existing prose cards rather than
  becoming tiny decorative icons.

### Layer map

| Layer | Content | Meaning |
| --- | --- | --- |
| background | Shared paper worktable, adult-held outer frame, broad unassigned area | Adult responsibility and child dignity coexist |
| primary | Blank sentence strip and its hidden fixed rail | Tone can conceal the actual structure of choice |
| secondary | Three equal physical mechanisms: instruction, boundary with routes, invitation with exit | Honesty means matching language to responsibility and available choice |

### Five beats

| Offset | Beat | Layer event | Draft narration EN / RU |
| ---: | --- | --- | --- |
| 0.00 | `gentle-surface` | Primary strip faces the viewer; mechanism is concealed | The words sound open. The structure is not yet visible. / Слова звучат открыто. Устройство выбора пока не видно. |
| 0.22 | `rail-revealed` | Strip turns; fixed rail appears beneath it | A question can still carry only one survivable answer. / Даже вопрос может допускать только один приемлемый ответ. |
| 0.46 | `modes-separate` | Rail refolds into three equally sized mechanisms | The mode becomes honest when its limits become visible. / Режим становится честным, когда видны его границы. |
| 0.72 | `exit-opens` | Invitation exit opens fully; boundary routes remain workable; instruction support stays firm | Safety, boundary, and invitation do different work. / Требование, граница и приглашение выполняют разную работу. |
| 1.00 | `all-modes-land` | All mechanisms settle with equal light and scale | No soft wording is asked to carry a choice that is not there. / Мягким словам больше не приходится изображать выбор, которого нет. |

### Responsive and fallback

- **Mobile authored pose:** vertical stack of three mechanisms with identical
  width and light. The fixed rail is visible as an underside detail; the
  invitation exit remains as large as the invitation opening.
- **Reduced-motion pose:** beat 5; distinctions are carried by physical
  geometry and the existing semantic cards, never by color alone.
- **Poster fallback:** beat 5 with all three mechanisms in one frame.
- **Forbidden reading:** instruction is not inherently bad. Immediate safety,
  care, law, or unavoidable responsibility may require direct action. Do not
  depict the adult as a puppeteer, the child as an object, or invitation as
  morally superior.

---

## 7. `A-01` — Ground is not Gravity

### Placement and narrative job

- **Primary registry anchor:** `ground-gravity`.
- **Placement:** use the existing section as the central visual turn of the
  Adults chapter; its six exact cards remain prose.
- **Narrative job:** distinguish real support and limit from an inherited
  route treated as destiny. The scene does not stage an escape from ordinary
  life; it makes the difference between a brace and a verdict visible.
- **Dominant mechanism:** removable vellum route-labels over structural Ground
  and one small reversible fold; proposed mechanism id `ground-or-gravity`.

### Approved anchor copy — read only

The canonical plan uses “Земля — не Гравитация” as a working scene label. The
current approved Russian chapter title is **“Земля — не Инерция”** and remains
the golden master.

| | EN | RU |
| --- | --- | --- |
| section title | Ground is not Gravity | Земля — не Инерция |
| plain | Ground is the reality that supports and limits an attempt; Gravity is an unexamined route hardened into destiny. | Земля — это реальность, которая поддерживает попытку и задаёт ей пределы. Инерция — путь, который давно не проверяли и успели принять за судьбу. |
| closing paragraph | Some doors are materially locked. The honest movement may be to name the door, find company, seek qualified help, or stop calling it a personal failure. | Некоторые двери действительно закрыты. Иногда честный шаг — назвать такую дверь, найти союзников или профессиональную помощь и перестать считать её личным поражением. |

### New scene metadata — draft

| Field | EN | RU |
| --- | --- | --- |
| title | Ground is not Gravity | Земля — не Инерция |
| plainMeaning | Ground supports and limits an attempt; Gravity turns an unexamined route into destiny. | Земля поддерживает попытку и задаёт ей пределы. Инерция выдаёт давно не проверенный путь за судьбу. |
| description | Visible paper braces hold money, care, craft, work, and rest as real parts of the landscape. Blank inherited labels lift away while the supports remain; one small reversible fold opens beside a materially closed door. | Видимые бумажные опоры удерживают деньги, заботу, ремесло, работу и отдых как реальные части ландшафта. Пустые чужие ярлыки снимаются, а опоры остаются; рядом с действительно закрытой дверью раскрывается один небольшой обратимый сгиб. |
| ariaLabel | A supported paper landscape remains intact as translucent inherited labels are removed. A small reversible fold may open, close, or wait beside a genuinely locked door that is not treated as personal failure. | Бумажный ландшафт остаётся целым на своих опорах, когда прозрачные унаследованные ярлыки снимают. Небольшой обратимый сгиб можно открыть, закрыть или оставить ждать рядом с действительно запертой дверью, которая не объявляется личным поражением. |

### State logic

- **Opening:** the ordinary landscape is held by visible braces, routines,
  care, craft, material limits, and a rest platform.
- **Tension:** translucent blank route-labels descend and visually fuse each
  support with a single moral conclusion.
- **Turn:** the labels lift; the structural supports do not disappear.
- **Landing:** one modest reversible fold becomes visible. A materially locked
  door remains locked and can be named without spectacle; company/help is a
  support, not a magic key.

### Layer map

| Layer | Content | Meaning |
| --- | --- | --- |
| background | Open book, inhabited paper landscape, structural braces, rest shelf, materially locked door | Real conditions support and limit life; some limits are not chosen |
| primary | Translucent blank route-labels connected by one inherited track | Gravity/Inertia language turns conditions into compulsory destiny |
| secondary | Small reversible fold, neighboring support hinge, optional company/help brace | Authored change can be modest, relational, reversible, delayed, or impossible for now |

### Five beats

| Offset | Beat | Layer event | Draft narration EN / RU |
| ---: | --- | --- | --- |
| 0.00 | `supports-visible` | Background braces and rest shelf are fully legible | Ground is already carrying a life. / Земля уже удерживает жизнь. |
| 0.22 | `labels-descend` | Primary vellum tags and inherited track settle over the supports | A real condition can be mistaken for a complete verdict. / Реальное условие можно принять за окончательный приговор. |
| 0.46 | `track-hardens` | Labels align into one apparently inevitable route | An unexamined route begins to look like destiny. / Давно не проверенный путь начинает выглядеть судьбой. |
| 0.72 | `labels-lift` | Primary rises; background supports stay fixed; secondary fold appears | Remove the verdict; keep the care, craft, limit, and rest. / Уберите приговор; оставьте заботу, ремесло, пределы и отдых. |
| 1.00 | `small-fold-waits` | Reversible fold rests partly open; locked door and help brace remain honest | A small opening may open, close, wait, or need company. / Небольшой сгиб можно открыть, закрыть, оставить ждать — или искать опору вместе. |

### Responsive and fallback

- **Mobile authored pose:** labels lifted above but still visibly related to
  the supports; reversible fold, rest shelf, locked door, and help brace all
  fit without reducing the scene to “before/after liberation.”
- **Reduced-motion pose:** beat 5; support and limit remain as prominent as the
  new fold.
- **Poster fallback:** beat 5 with no door magically opened.
- **Forbidden reading:** no fantasy of abandoning duties, no unlocked-door
  miracle, no contempt for stable work or money, no diagnosis that every
  obligation is oppression, and no implication that asking for help guarantees
  access.

---

## 8. `ATLAS-01` — One sheet, ten honest doorways

### Placement and narrative job

- **Exact chapter anchor:** `atlas`.
- **Secondary existing anchor:** `atlas-practices`.
- **Replaces:** the M12 poster/layer reuse currently attached to mechanism
  `open-binding`; no Atlas prose or card is removed.
- **Narrative job:** give the Atlas its own visual identity and demonstrate,
  before the ten cards, that the reader is choosing a question rather than
  being assigned a type or next step.
- **Dominant mechanism:** one accordion sheet unfolds into ten equal windows;
  proposed mechanism id `equal-lenses`.

### Approved anchor copy — read only

| | EN | RU |
| --- | --- | --- |
| chapter title | Choose the question, not a type. | Выбирайте вопрос, а не тип человека. |
| page scene title | One sheet, ten honest doorways | Один лист, десять честных входов |
| plain | Choose by the work in front of you, not by a type assigned to you. | Выбирайте по работе, которая стоит перед вами, а не по присвоенному типу личности. |
| description | A continuous sheet unfolds into ten equal paper mechanisms. None is elevated, locked, numbered as progress, or recommended by an algorithm. | Непрерывный лист раскрывается в десять равноправных бумажных механизмов. Ни один не поднят выше, не заперт и не назначен алгоритмом. |

### New scene metadata — draft

No literary change is needed. Reuse the approved page-scene title,
`plainMeaning`, and description exactly. Add only this accessibility draft:

| Field | EN | RU |
| --- | --- | --- |
| ariaLabel | One continuous paper sheet unfolds into ten equally weighted windows. None is higher, brighter, preselected, locked, or connected to a progress path. | Один непрерывный бумажный лист раскрывается в десять равноправных окон. Ни одно не выше, не ярче, не выбрано заранее, не заперто и не связано с маршрутом прогресса. |

### State logic

- **Opening:** one ordinary continuous sheet lies folded; no personality label
  or hidden result exists beneath it.
- **Tension:** the first opening could appear dominant merely because it opens
  first.
- **Turn:** the same sheet keeps unfolding until all ten windows share equal
  scale, light, depth, and distance.
- **Landing:** pointer may reveal depth but never preselect, enlarge, brighten,
  recommend, or persist a choice.

### Layer map

| Layer | Content | Meaning |
| --- | --- | --- |
| background | Open book, continuous base sheet, quiet page edge and exit | The Atlas is one reading field and may simply be left |
| primary | Accordion spine and ten connected equal window frames | Questions share one material and no hidden hierarchy |
| secondary | Ten distinct but equally weighted lens/fold mechanisms, all blank | Different readings without person typing or progress |

### Five beats

| Offset | Beat | Layer event | Draft narration EN / RU |
| ---: | --- | --- | --- |
| 0.00 | `one-sheet-rests` | Primary and secondary lie folded into one sheet | The Atlas begins as one page, not a diagnosis. / Атлас начинается с одного листа, а не с диагноза. |
| 0.22 | `first-fold-opens` | First hinge reveals construction but receives no extra light | The first visible question is not the first required step. / Первый видимый вопрос не становится обязательным первым шагом. |
| 0.46 | `windows-multiply` | Remaining frames unfold from the same primary sheet | One page makes room for several ways of seeing. / Один лист даёт место разным способам увидеть ситуацию. |
| 0.72 | `weight-equalises` | All ten reach identical scale, base height, light, and depth | No doorway is a rank or recommendation. / Ни один вход не становится рангом или рекомендацией. |
| 1.00 | `atlas-remains-open` | Ten windows settle; exit and uninterrupted reading path remain visible | Choose a question, leave all ten, or continue. / Можно выбрать вопрос, оставить все десять или просто продолжить. |

### Responsive and fallback

- **Mobile authored pose:** two-column or vertical accordion composition with
  ten mechanisms kept equal. It is an illustration, not ten touch targets;
  the real cards remain semantic HTML below.
- **Reduced-motion pose:** beat 5 with all ten windows present at once.
- **Poster fallback:** beat 5, no selected window.
- **Forbidden reading:** no personality test, quiz, progress map, recommended
  route, hidden personalization, “best lens,” numbered achievement path,
  dashboard, or fake interactive controls baked into art.

---

## 9. `FINAL-01` — The Sky is still here

### Placement and narrative job

- **Exact chapter anchor:** `final-sky`.
- **Replaces:** the second M12 reuse currently attached to `open-sky`.
- **Placement:** this is the final emotional event. Only quiet technical end
  matter and the small source-influence colophon may follow it.
- **Narrative job:** let the physical book become a horizon without turning
  Flight into an instruction, reward, or superior ending. Familiar forms
  return with equal dignity and the page releases the reader into possibility.
- **Dominant mechanism:** the two outer book leaves unfold beyond the object’s
  rectangular silhouette and become one broad horizon; proposed mechanism id
  `open-horizon`.

### Approved baseline and final allowlist

The current final block is the baseline, not text to be silently overwritten:

| | EN | RU |
| --- | --- | --- |
| current title | The Sky Remains Open | Небо остаётся открытым |
| current deck | A route may end without closing the horizon. | Путь может закончиться, не закрывая горизонта. |
| current closing | The page ends here. The Sky does not. | Здесь заканчивается страница. Не небо. |

The canonical expansion plan explicitly allows minimal new final copy. The
following remains a draft until the main editorial pass approves it.

### New scene metadata and final line — draft

| Field | EN | RU |
| --- | --- | --- |
| title | The Sky Is Still Here | Небо всё ещё здесь |
| plainMeaning | The page can end while Flight, Return, rest, and open possibility remain equally human. | Страница может закончиться, а Полёт, Возвращение, отдых и открытая возможность — остаться равноправными человеческими состояниями. |
| description | The last open book widens into a bright horizon. A paper plane, sailboat, kite, blank leaf, resting form, and Ground remain together while familiar Wind passes through without lifting any of them by force. | Последняя раскрытая книга становится светлым горизонтом. Бумажный самолётик, парусник, змей, чистый лист, отдыхающая форма и Земля остаются вместе, а знакомый Ветер проходит сквозь них, никого не поднимая силой. |
| ariaLabel | An open paper book unfolds into a wide bright horizon. Flying, sailing, resting, returning, remaining blank, and staying on Ground share the scene without hierarchy. | Раскрытая бумажная книга разворачивается в широкий светлый горизонт. Полёт, плавание, отдых, Возвращение, чистый лист и Земля остаются в одной сцене без иерархии. |
| final HTML line | We have not forgotten how to fly. The Sky is still here. | Мы не забыли, как летать. Небо всё ещё здесь. |

### State logic

- **Opening:** the final book and binding settle; no “next chapter” mechanism
  is waiting.
- **Tension:** a familiar Wind enters, but nothing must follow it.
- **Turn:** the book’s edges extend into a horizon; the book is still
  recognisable as the same material world.
- **Landing:** plane, sailboat, kite, blank leaf, returned form, rest platform,
  and Ground share the field without hierarchy. The final HTML line appears
  only after the composition has enough quiet space to hold it.

### Layer map

| Layer | Content | Meaning |
| --- | --- | --- |
| background | Open book, central spine, broad sky aperture, Ground, quiet rest platform | The same book becomes more open without disappearing into spectacle |
| primary | Outer leaves and landscape folds extending into the horizon | The page ends while possibility exceeds its frame |
| secondary | Paper plane, sailboat, kite, blank leaf, returned marked form, resting unfinished form | Different states and routes remain equally human |
| atmosphere | Familiar blue/cyan Wind ribbons at very low density | Possibility moves through the world without issuing a command |

### Five beats

| Offset | Beat | Layer event | Draft narration EN / RU |
| ---: | --- | --- | --- |
| 0.00 | `binding-settles` | Complete book rests; all layers nearly still | The last fold comes to rest. / Последний сгиб успокаивается. |
| 0.22 | `wind-returns` | Atmosphere crosses slowly; no object launches | The Wind returns without choosing for anyone. / Ветер возвращается, не выбирая ни за кого. |
| 0.46 | `edges-open` | Primary leaves extend and reveal a wider sky aperture | The book opens beyond the edge of its page. / Книга раскрывается дальше края страницы. |
| 0.72 | `many-states-remain` | Secondary objects take equal resting positions; one may float, others stay | Flight, Return, rest, and possibility share one horizon. / Полёт, Возвращение, отдых и возможность делят один горизонт. |
| 1.00 | `sky-is-here` | Motion becomes barely perceptible; final HTML line enters | We have not forgotten how to fly. The Sky is still here. / Мы не забыли, как летать. Небо всё ещё здесь. |

### Responsive and fallback

- **Mobile authored pose:** one full-width landscape window in normal flow.
  The book remains recognisable; horizon occupies the upper half, and the
  equal-state objects read at phone scale. No sticky hold.
- **Reduced-motion pose:** beat 5, completely still. The final HTML line is
  present without waiting for scroll progress.
- **Poster fallback:** beat 5; it must not reuse M12 or contain the final text.
- **Forbidden reading:** no sunrise revelation, motivational poster,
  triumphant hero, launch countdown, heaven/ascension symbolism, “flying
  people” above “grounded people,” compulsory next Call, or devaluation of
  rest, ordinary duty, return, private making, incompletion, or not flying.

---

## 10. Cross-scene rhythm and acceptance

### Distinct visual verbs

| Scene | Dominant verb | Must not collapse into |
| --- | --- | --- |
| `AI-02` | adopt / alter | four-button interface |
| `AI-03` | rescale | anti-AI storm or route ranking |
| `AI-04` | meet and return | publication or applause |
| `P-01` | reveal structure | good-mode/bad-mode lesson |
| `A-01` | separate support from verdict | escape fantasy |
| `ATLAS-01` | unfold equally | quiz or dashboard |
| `FINAL-01` | open and land | motivational launch |

### Physical reveal contract

Every visible raster plane represents paper or another physical material that
is already present in the book. The animation may articulate that material;
it may not create it from alpha.

- Beat 0 is the complete poster-aligned resting pose for every layer:
  `x: 0`, `y: 0`, `scale: 1`, `rotate: 0`, `opacity: 1`.
- Poster readiness uses an atomic poster-to-layer swap. A crossfade would
  briefly double the complete composition and make objects look as if they
  were dissolving into the scene.
- Every authored state in `AI02`, `AI03`, `AI04`, `P01`, `A01`, `ATLAS01`,
  and `FINAL01` keeps material-layer opacity at `1`, including the interpolated
  mobile pose.
- Intrinsic translucency is allowed only when the asset depicts vellum,
  tracing paper, or a screen. Runtime opacity is not a reveal mechanism.
- Reveal and conceal use hinges, folds, rotation, translation, scale-as-fold,
  clipping by the page or stage edge, and occlusion by another paper plane.
- Beats 2–4 stagger the dominant planes. A new plane begins its physical move
  after the previous plane has established the action; all planes do not enter
  together.
- Reverse scroll reverses the same material action. No layer evaporates on the
  way back.

- [x] Runtime registry tests enforce poster-aligned beat 0, opacity `1` for
      every layer and beat, and the authored plane order for all seven scenes.
- [x] Generic poster/layer readiness is atomic rather than crossfaded.

### Scene-card completion gate

Before any prompt is sent for generation:

- [ ] exact anchor and insertion position are confirmed against the live
      render;
- [ ] approved anchor copy above matches the current registry byte-for-byte;
- [ ] draft metadata receives separate EN/RU editorial approval;
- [ ] master prompt uses the locked reference image, not a verbal memory of it;
- [ ] dominant mechanism and layer split can produce one coherent poster;
- [ ] the five beats are legible forward, backward, skipped, and still;
- [ ] all material planes remain fully opaque and begin physical movement in
      the scene-specific staggered order;
- [ ] mobile authored pose preserves meaning without sticky motion;
- [ ] reduced-motion and poster poses are semantically complete;
- [ ] forbidden reading has a visible countermeasure in the composition;
- [ ] no required text is present in the raster.

### Copy-preservation verification

This specification introduces no edits to the current EN/RU registries,
routes, or page metadata. The only new prose here is clearly marked draft
scene metadata/narration. During implementation, compare the content files to
the pre-change baseline and allow only:

1. additive scene definitions and accessibility metadata;
2. the already-authorized minimal `FINAL-01` literary change after editorial
   approval;
3. structural scene wrappers or ids that do not modify rendered copy.
