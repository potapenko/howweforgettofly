# Illustration presence throughout reading

Status: implemented and verified locally.
Authority: user clarified that every viewport of reading should contain artwork;
a full-screen image is not required. Evolve, illustrated-story-and-motion rev 4.
Single-agent, current master, no deployment.

## Findings and change

The eighteen-image baseline left entire text groups without illustrations:
Home recognition/cycle, Manifesto reading after its living scenes, the remaining
pathway passages, practices/situations, thirty invitations and eight Atlas cards.
Images at a section's beginning did not cover its continuation or transitions.

The reading now has authored image associations for every section/card family,
inline images between long paragraphs, and a desktop-only section-local sticky
lead. Mobile remains normal flow. Public prose, links, anchors, locale logic,
analytics and living-scene layers/beat tracks are unchanged. Existing motifs recur
with their subject rather than being assigned randomly.

Task-owned write set: AGENTS.md; illustrated-story-and-motion.md; this document;
EditorialSpot.tsx, editorial-spot.css, readingIllustrations.ts, HomeCoverContent.tsx;
HomePage.tsx, ManifestoPage.tsx, PathwayPage.tsx, AtlasPage.tsx, FinalSkyPage.tsx;
and the twelve new illustration pairs listed below. No other source owners.

## Assets and prompts

Generated separately with the built-in ImageGen tool. References:
public/illustrations/parents-doorway.webp and borrowed-map.webp (material and style).
Every final is a 3:2 composition exported as WebP at 1200×800 and 600×400;
the smaller variant adds `-600` to the name. No raster crop or retouch.
All source runtime files live in `public/illustrations/`.

Shared prompt:

```text
Use case: illustration-story. Generate ONE new text-free editorial vignette for How We Forget to Fly. The two reference images define MATERIAL, LIGHT, character anatomy and palette only. Tangible contemporary papercraft: clean white stock, crisp folds and believable thickness, soft cool upper-left daylight, cobalt/sky blue with restrained orange and lime. Landscape 3:2, compact connected composition filling 80% of frame, fully contained silhouettes, white seamless background to all edges and subtle short contact shadows. No whole book, no room/background scenery, no borders, no lettering, numbers, symbols, captions, logos, watermarks, devices, UI, photoreal human skin, sepia, magic glow. Suitable as a medium web illustration 280-480px wide. Subject: 
```

### question-window.webp

```text
A modest folded-paper person in cobalt sits beside an open white window on a low white ledge, noticing a tiny orange loose paper curl on the windowsill. Lime sliver outside. An ordinary unanswered question, calm attention.
```

### dignity-bench.webp

```text
Two ordinary folded-paper people sit companionably at opposite ends of a low white bench, one cobalt shirt, one orange shirt; a small lime plant beside them. Equal scale, no work, trophy or task, dignity in simply being here.
```

### compass-hands.webp

```text
Two relaxed folded-paper adult hands gently hold an ordinary white compass with cobalt rim and one simple orange needle. Two broad white paths continue beyond it, a lime paper tab rests beside. Direction belongs to these hands. No letters or numbers.
```

### return-repair.webp

```text
An unfinished white folded-paper bird with one gently torn wing is being mended with a small orange patch by two papercraft hands. Blue spool and lime paper scrap nearby. Repair is a modest act of care, no perfect result.
```

### open-gate.webp

```text
A short white folded-paper boundary with one open cobalt gate, orange latch and a lime path curving beside it. Clear open passage and honest boundary, no locked cage, no barriers trapping anyone.
```

### shared-table.webp

```text
Two folded-paper adults in white/cobalt and white/orange sit on equal small chairs across a round white table. One blank partly unfolded sheet between them; lime cup. Both listening and leaving space, no pointing teacher or authority.
```

### blanket-fort.webp

```text
A small child's papercraft blanket fort of white stock draped over two cobalt chairs, an orange paper boat beside it; its broad doorway is open and a lime strip marks a clear passage alongside. No people, room backdrop or text.
```

### paper-letter.webp

```text
An open white paper envelope with cobalt lining, one blank white folded letter half emerging, orange pencil and a lime curl nearby. A small paper breeze curls past without covering the letter. A personal draft waiting for a real reply, no text or seals.
```

### time-pocket.webp

```text
A small white tabletop clock with cobalt rim and plain orange hands WITHOUT digits or tickmarks, beside an open shallow white tray holding an unfinished lime fold and orange pencil. A little time protected for making, no urgency.
```

### care-basket.webp

```text
A modest white paper basket with cobalt handle containing folded white cloth, a small orange mug and a lime paper sprig. A pair of plain white slippers beside it. Ordinary care, chores and rest share one ground, no trophy.
```

### wind-anchor.webp

```text
A white paper sail on a short cobalt mast fixed to a modest wide folded base. A broad cyan wind ribbon curves through the sail while an orange peg holds the base. The wind changes motion but does not own direction. No sea or landscape.
```

### open-horizon.webp

```text
An open white folded sheet whose far edge lifts into a cobalt arch of sky, a small white paper bird resting on the near edge, orange bookmark and a tiny lime fold. An open ending with room to leave, no stairs, ranking or triumphant launch.
```


## Final verification

- `npm run check` passes: typecheck, 209 tests / 24 files, production build
  and SEO validation of all ten locale documents. No test expectations changed.
- The final page renders 257 editorial placements on desktop and 258 on mobile
  (the extra one belongs to the mobile cover introduction), using thirty unique
  assets including the twelve new images. Placements are intentionally distinct
  from an asset count; existing motifs recur with their associated ideas.
- In-app browser, RU/EN at 1440×1000 and 390×844: measured the full document's
  vertical illustration intervals, excluding 12% of each image's top/bottom
  whitespace. Largest final RU gaps were approximately 804px desktop / 665px
  mobile; EN approximately 743px / 620px. These remain smaller than the reading
  viewport below its persistent header. This is geometric supporting evidence,
  not a promise about arbitrary zoom levels or every possible device size.
- Visually inspected transitions, Manifesto reading, long Parents card groups,
  adult prose, situation cards, invitation lists and Atlas. Followed native
  reading/keyboard navigation; checked normal and Quiet states. Safari RU:
  Parents conditions on desktop and in Responsive Design Mode at 390×844.
  The Safari check is responsive viewport evidence, not a physical iPhone test.
- Arabic mobile: conditions and Atlas inspected, no horizontal overflow, with
  the artwork staying unmirrored. The full ten-language browser matrix is not
  claimed by this presentation-only task.
- No completed image requests failed after a fresh document load. New and
  existing assets retain empty alt text and intrinsic dimensions. Below-fold
  loading remains lazy, with size-specific responsive source hints.
- Existing copy/content files and scene-runtime owners are untouched. The diff
  adds illustration elements and layout rules; it introduces no new prose,
  controls, user state, network service or motion timeline. No deployment.
