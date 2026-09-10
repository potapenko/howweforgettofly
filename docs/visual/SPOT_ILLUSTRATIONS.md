# Static editorial illustration pilot

Status: implemented and visually checked; checkpoint scope excludes concurrent localization.
Authority: user approved the three-image proposal on 2026-09-10 ("Хорошо, делаем.").
Mode: Evolve; illustrated-story-and-motion revision 1 → 2. Additive, compatible.
Execution: single-agent, current master, no deployment.

## Scope and reference

Three static, decorative images supplement the living scenes. Existing prose,
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

## Verification and limits

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
