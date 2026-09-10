# Static editorial illustrations

Status: eighteen-image expansion implemented and verified locally.
Authority: user approved the three-image proposal on 2026-09-10 ("Хорошо, делаем.").
Mode: Evolve; illustrated-story-and-motion revision 3. Additive, compatible.
Execution: single-agent, current master, no deployment.

## Scope and reference

Eighteen static, decorative images supplement the living scenes. The user
requested significantly greater density after the initial three-image pilot. Existing prose,
locale routing, chapter order, scene placements, beats and motion remain protected.
The default built-in ImageGen tool created each image separately. Reference inputs:

- [Locked paper-world master](reference/popup-game-master.png)
- [Approved Parents banner](../../marketing/advertising/how-we-forget-to-fly-v03/assets/how-we-forget-to-fly-v03-square-ru.png)

Only material, light, palette and character style are carried over; no lettering
or advertising controls enter these assets. No new visible or accessible prose.
The mirror is an evocative still life, not an optical or explanatory diagram.

## Production assets

All assets use a 3:2 canvas. WebP conversion preserves the complete generated
composition without cropping or retouching. Originals remain in the generation
workspace; these self-contained production files are canonical runtime assets.

| Placement | Asset | Dimensions | Role |
| --- | --- | --- | --- |
| Parents doorway | `public/illustrations/parents-doorway.webp` | 900×600 | Adult nearby; child holds the kite string |
| `parents-family-cycle` | `public/illustrations/paper-bridge.webp` | 1200×800 | Sagging bridge between two mugs and a folded next attempt |
| Bridge responsive variant | `public/illustrations/paper-bridge-600.webp` | 600×400 | Same complete composition |
| Mirror Wind role | `public/illustrations/wind-mirror.webp` | 600×400 | Paper bird and a blue-framed reflection |

Owner: `src/components/EditorialSpot.tsx` with its dedicated stylesheet.
Consumers: `RouteCard.tsx` for the existing Parents link, `PathwayPage.tsx`
for the family-cycle passage and Mirror role. No dependency on locale strings.
Images have reserved dimensions, lazy loading and empty alt text; surrounding
semantic prose remains the accessible meaning. No focus stops or click behavior
are added. Existing parent link remains one complete native anchor.

## Initial pilot verification and limits

- In-app browser: all three placements inspected in EN and RU at desktop and
  mobile widths. Safari: RU bridge at desktop size and all three RU spots in
  Responsive Design Mode at 390×844. This is viewport evidence, not a physical
  iPhone run; EN in Safari was not separately confirmed.
- Parents link followed by pointer in Safari and keyboard in the in-app
  browser; navigation reached the existing Parents heading.
- All three images decoded, retain empty alt text and stay in normal flow.
  No horizontal overflow at 390px or 1440px; the smaller bridge source loads
  on mobile. Spots remain static with normal motion and Quiet view. Artwork
  has no mirroring transform; RTL localization itself is outside this pilot.
- No new console errors were observed. The change adds no prose, scene-state
  logic or interpretive panel, and does not modify the scene motion cases.
- Repository-required `npm run check` passed on a temporary snapshot of the
  current committed baseline plus only this pilot: typecheck, 174 tests across
  22 files, production build and EN/RU SEO verification.
- The concurrent multilingual working tree was also checked: six failures in
  existing language-navigation and story-registry tests, plus a separate
  production-build failure on incomplete Japanese translations. Those changes
  are outside this checkpoint; whole-tree acceptance remains with that task.
- Temporary screenshots, build copies and command logs are not deliverables
  and are removed after verification. No deployment was performed.

## Generation prompts

### paper-bridge

```text
Use case: illustration-story. Create one new text-free editorial spot illustration for the existing How We Forget to Fly paper-world website, using the two supplied images only as MATERIAL, LIGHT and CHARACTER STYLE references. Do not recreate their layout or lettering.
Scene: a small paper bridge spanning between two ordinary white folded-paper mugs, seen in a close three-quarter view. A tiny orange papercraft toy car has reached the middle and the white paper bridge visibly sags under it. A fresh accordion-folded strip lies nearby, suggesting another attempt. A narrow cobalt-blue paper ribbon below suggests an imagined river on an otherwise ordinary tabletop. A child's small papercraft hand enters gently from the lower right toward the folded strip. No adult correcting hand. One clear charming everyday moment, incomplete and curious, not a triumph.
Composition: landscape 3:2, single compact connected arrangement, objects fill about 80% of width and 65% of height, all silhouettes fully contained with ample whitespace around. No whole book, no sky backdrop, no room, no border. Clean pure white seamless background out to every edge, subtle short cool contact shadows only near the objects. Suitable for a white web-page image slot about 500px wide.
Style: tangible premium contemporary papercraft, white stock with subtle fibers and credible creases, crisp cut edges, restrained cobalt blue and orange, tiny lime accent, soft upper-left daylight. Match reference craftsmanship without copying its text. No words, letters, numbers, symbols, logo, watermark, UI, title or caption. No photoreal human skin, no antique or sepia tones.
```

### parents-doorway

```text
Use case: illustration-story. Derive a new text-free small website illustration from the supplied approved paper-world references. They define MATERIAL, LIGHT, COLOR and CHARACTER anatomy only; remove all typography and do not recreate the ad composition.
Scene: a papercraft adult in white and cobalt clothing crouches companionably near a child in white and orange clothing. The child holds the string of their own small lime/orange/white paper kite, which lifts to their right. Adult's relaxed hands do not hold the string or direct the child. They share one modest white paper ground with a single low lime fold. Warm human closeness, room to wonder, not coaching, reward or heroic achievement.
Composition: landscape 3:2, intimate small vignette, figures occupy center-left with kite to upper-right; kite and string fully contained in frame. Small scale for a card, readable at 300px wide. No whole book, no large landscape, no mountains, no clouds, no huge winds. Pure white seamless background to every edge, restrained cool contact shadows. Leave 10% whitespace around all silhouettes.
Style exactly the tangible contemporary folded-paper figures and vivid but limited blue/lime/orange accents in the supplied parent banner. Soft upper-left daylight, crisp folds, visible paper thickness, generous white stock. No words, letters, numbers, icons, labels, title, CTA, watermark, logos or border.
```

### wind-mirror

```text
Use case: illustration-story. Create a small text-free papercraft still life for the 'Mirror' role in the How We Forget to Fly website. Supplied images are references for tangible PAPER MATERIAL, palette, lighting and quality only, not layout.
Subject: one freestanding folded-paper mirror with a cobalt frame and a pale silver-blue reflective face. On the tabletop before it is one simple unfinished white folded-paper bird with a small orange underside. The mirror returns a recognizable reflection of that SAME unfinished bird, including its asymmetrical unfinished fold: not a more perfect or heroic version. A single slim cyan paper ribbon passes gently behind the frame. Quiet visual metaphor for examining one's draft, not judgment or replacement.
Composition: small connected three-quarter-view still life, landscape 3:2, mirror toward center-right and bird lower-left, recognizable at 240px wide, all objects fully contained with generous clean white space. No whole book, no sky scene, no human, no screen/device/UI, no pedestal. Pure white seamless background at every edge with short soft cool contact shadows.
Material: premium contemporary papercraft, white stock, cobalt edges, tiny orange detail, cool clean lighting from upper-left, real thickness, folds and fibers matching refs. No text, letters, numbers, punctuation, caption, title, watermark, logo or border.
```

## Fifteen-image expansion

The user explicitly requested substantially more illustrations after reviewing
the pilot. Assets use the same built-in ImageGen mode and existing Parents and
Mirror spot references. Each final is a separate generation; no contact-sheet
crops or CSS approximations. Existing prose, anchors and scene motion are unchanged.

| Asset under `public/illustrations/` | Placement type | Source size |
| --- | --- | --- |
| `adults-doorway.webp` | doorway | 900×600 |
| `ai-doorway.webp` | doorway | 900×600 |
| `child-roof.webp` | section | 1200×800 |
| `making-space.webp` | section | 1200×800 |
| `unfinished-drawing.webp` | section | 1200×800 |
| `old-notebook.webp` | section | 1200×800 |
| `borrowed-map.webp` | section | 1200×800 |
| `patient-craft.webp` | section | 1200×800 |
| `wind-generator.webp` | role | 600×400 |
| `wind-dialogue.webp` | role | 600×400 |
| `wind-critic.webp` | role | 600×400 |
| `wind-craft.webp` | role | 600×400 |
| `wind-simulator.webp` | role | 600×400 |
| `atlas-template.webp` | atlas | 600×400 |
| `atlas-rest.webp` | atlas | 600×400 |

The six section images also have complete 600×400 `-600.webp` variants.
Exact placement is keyed by stable ids in `EditorialSpot.tsx`: all three
doorways, Parents present-child / keeper-conditions / family-cycle /
refusal-feedback, Adults invariant / maps / craft, all six Wind roles, and
Atlas A04 / A09. The large Manifesto and ending scenes remain intact.

### Expansion prompt set

Every prompt concatenates this shared prefix with one subject below. The
Craft aid correction uses only the Mirror reference to keep it object-only.

```text
Use case: illustration-story. Create one NEW text-free editorial spot for How We Forget to Fly. Supplied images define only material, light, palette and papercraft anatomy. Match premium contemporary folded paper: clean white stock, crisp creases, believable thickness, soft cool upper-left daylight, cobalt/sky blue with restrained orange and lime accents. Landscape 3:2 canvas, close connected vignette occupying about 80% of frame, all silhouettes completely contained, generous white margin. Pure white seamless background to every edge and short subtle contact shadows. No full book frame, landscape backdrop, borders, words, letters, numbers, symbols, logos, watermarks, UI or captions. No sepia, occult motifs, photorealistic skin, glossy plastic. Readable as a small web illustration. Subject: 
```

#### adults-doorway

```text
An adult papercraft woman in white and cobalt sits comfortably at a modest white table, reopening an old blue notebook beside a small orange cup. A single folded paper bird rests near her hand. Curious everyday beginning, no heroic pose.
```

#### ai-doorway

```text
A small white folded-paper sailboat beside a grounded cobalt compass with a simple orange needle. A broad cyan paper wind ribbon curves past the sail while the compass stays on the ground. No person, robot, electronics or magical glow.
```

#### child-roof

```text
A child in white and orange sits drawing a little house on a white sheet; several colored paper pencils nearby, a small lime folded roof rising gently from the drawing. Child chooses their own color. Intimate scene, no adult, awards or correction.
```

#### making-space

```text
An inviting cleared corner of a white papercraft worktable with a small open cobalt box of paper offcuts, child-safe round scissors, orange pencil and two loose white sheets. Plenty of free tabletop; no finished product or human. Materials are available without commanding an outcome.
```

#### unfinished-drawing

```text
A slightly irregular child's house drawing expressed as flat cobalt, orange and lime paper cutouts on a sheet. A paper eraser, a few shavings and two colored pencils rest beside it. A quiet unfinished work, no grading, ticks, marks or correcting hand.
```

#### old-notebook

```text
An open slightly worn cobalt-covered notebook beside a few plain folded receipts and a modest orange mug. One tiny white folded bird emerges from the blank notebook page. Everyday bills and imagination share the same tabletop, no hierarchy. Pages and receipts entirely text-free.
```

#### borrowed-map

```text
A well-used folded paper map, with only abstract cobalt paths and lime terrain shapes, lies beside a small orange compass and a simple paper craft tool. One corner of the map curls upward opening a white gap; map useful and intact, no destination marker, no lettering.
```

#### patient-craft

```text
Two folded paper hands gently fitting a white notched paper joint on a small craft bench. Several imperfect test folds lie nearby, a blue ruler without numbers and an orange pencil. Tactile patient learning, not a trophy or perfect result.
```

#### wind-generator

```text
Three distinct unfinished paper possibilities arranged equally on a small white sheet: a cobalt folded boat, an orange spiral and a lime branching folded form. A slim cyan wind ribbon passes behind them. None selected, ranked or raised on a pedestal.
```

#### wind-dialogue

```text
Two modest empty folded-paper speech forms lean toward each other across an open white space, one cobalt outside and one white with orange underside. Between them lies a partly folded white sheet. Conversation as inquiry, no faces, text, question marks or technology.
```

#### wind-critic

```text
A cobalt paper magnifying glass hovering just above an unfinished white folded structure, revealing one loose orange paper joint. Small lime paper tab. Constructive examination of the work, no red cross, grade, judge, score or destruction.
```

#### wind-craft

```text
OBJECTS ONLY still life: cobalt ruler, small rounded orange-handled scissors, partly folded white paper, lime offcut, thin cyan ribbon. Absolutely NO people, children, adults, faces, arms or hands; discard all figures from reference. The tools rest on the white ground. Compact connected arrangement suitable for Craft aid role.
```

#### wind-simulator

```text
A tiny white paper sailboat positioned before two freestanding translucent pale-blue curved paper screens; faint abstract waves and an orange buoy are suggested beyond the screens. A visible gap between rehearsal screens and white ground. Quiet tabletop rehearsal, not a computer or world model.
```

#### atlas-template

```text
A row of three small white folded forms made from similar sheets, the third gently unfolded in a different lime-and-cobalt curve. An orange paper offcut nearby. Equally valued alternative folds, no arrows, rankings, winner or broken cage.
```

#### atlas-rest

```text
A closed cobalt notebook with an orange paper bookmark, a simple folded white chair and a resting white paper bird on the ground beside it. A soft lime paper patch. Calm ordinary pause, daylight, no trophy or implied next task.
```


### Expansion verification

- The final working tree passed `npm run check`: typecheck, 209 tests across
  24 files, production build and SEO verification for all ten editions. The
  initial pilot's multilingual failures above are historical, not current.
- In-app browser: all eighteen RU placements inspected at desktop and mobile
  widths; EN doorway, section, Wind-role and Atlas layouts inspected at mobile
  size, plus the illustrated Maps section at desktop size (1440×1000 and
  390×844 respectively). All eighteen
  EN images loaded with empty alt text and no horizontal page overflow.
- Safari: RU Adults notebook on desktop and Parents child illustration in
  Responsive Design Mode at 390×844. This is responsive viewport evidence,
  not a physical iPhone test. EN Safari was not separately exercised.
- Arabic at 390×844: Craft aid and Atlas template compositions retain readable
  RTL text; all eighteen artwork elements remain unmirrored, with no page
  overflow. The full ten-language browser matrix belongs to localization QA.
- New doorway links retain native focus treatment. Normal and Quiet modes
  preserve the static images. No scene-motion code, editorial copy, locale
  state, analytics or navigation destinations changed.
- Illustrated section headings use a smaller balanced measure so the image,
  title and premise form a readable composition. Responsive section sources
  retain the full image; no artwork is cropped.
- No deployment, additional runtime dependency, committed QA screenshots or
  command logs are part of this checkpoint.
