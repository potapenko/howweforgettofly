# Pop-up Scene Asset Manifest

**Status:** production visual-reference manifest  
**Date:** 2026-07-19  
**Scope:** the selected master reference, its optimized WebP derivative, the
clean production hero, and the twelve manifesto scene stills used by the local
interactive atlas

This manifest records what the flattened scene images mean and how they may be
used. It does not turn them into the interaction itself: the book, folds,
hinges, wind, pointer response, and scroll response remain live browser layers.

## 1. Authority and provenance

The locked visual authority is
[`reference/popup-game-master.png`](./reference/popup-game-master.png):

- 1672 × 941 px, RGB PNG;
- SHA-256
  `56e93a80db9cddd412d15cdaa4f00ee4eac59201ca19c7b44bab86ca45a4acf9`;
- generated for this project and explicitly selected by the project owner;
- authoritative for the bright contemporary paper language, open-book
  composition, blue/lime/orange palette, physical depth, and playful sense of
  wind and exploration.

The clean hero and chapter stills were generated for this project as visual
interpretations of that approved direction. They are flattened WebP exports,
not layered source files, masks, Three.js geometry, or evidence from the
adapted book. Exact generation prompts are not reconstructed here because no
reviewed prompt log has been established as a production authority. The
semantic briefs in
[`POPUP_GAME_ART_DIRECTION.md`](./POPUP_GAME_ART_DIRECTION.md) are canonical.

Do not describe the images as a translation of, an illustration from, or
scientific evidence for the source book. Do not use the selected master as a
generic mood-board licence for serif, antique, mystical, dark-laboratory, or
score-based variants; those directions are explicitly excluded.

## 2. Shared production contract

- Repository assets live in `public/scenes/` and resolve at
  runtime from `/scenes/`.
- Every recorded image is 1672 × 941 px. Preserve this 16:9 master; derive
  responsive placements without stretching or baking interface text into art.
- The image is the atmospheric poster and graceful graphics-off fallback. Live
  aligned raster planes and semantic DOM provide restrained parallax and local
  motion above it; the runtime intentionally has no Three.js or WebGL layer.
- Scroll reveals a mechanism in a small number of legible stages. Pointer and
  touch add restrained parallax or local wind response. Keyboard alternatives
  operate the same semantic choices in HTML.
- Reduced motion shows a stable, complete landing composition. A missing image
  or failed canvas must not remove the article, choice labels, navigation,
  privacy language, source notes, or exits.
- No interaction awards altitude, correctness, rank, streaks, or completion.
  Every scene must retain a valid pause, refusal, help, rest, or exit state.

## 3. Asset inventory

| ID | Production asset | Semantic scene intent | Live interaction-layer note |
| --- | --- | --- | --- |
| Home | [`public/scenes/home.webp`](../../public/scenes/home.webp) | Clean, text-free production hero derived from the selected direction: one open-book world carries wind ribbons, paper planes, kite, sailboat, pinwheel, hills, and generous editorial air. | Production poster below the live home mechanism. Code-native HTML owns the title, deck, navigation, and controls. |
| Master | [`public/scenes/master.webp`](../../public/scenes/master.webp) | Optimized reference derivative of the locked composite master, including its example editorial treatment. | Preserve for reference or a guarded missing-scene fallback. Its composited words are never semantic UI and should not replace the clean home asset. |
| M01 | [`public/scenes/M01.webp`](../../public/scenes/M01.webp) | **Dignity before Flight:** different forms remain equally supported while a measuring veil loses authority. | The live `metric-veil` may fold or recede; it must never lift one form into a podium. |
| M02 | [`public/scenes/M02.webp`](../../public/scenes/M02.webp) | **Authorship begins with a question:** one unfinished centre opens toward equally valid yes, no, not now, and differently responses. | The live `question-fold` opens one response without marking it correct or required. |
| M03 | [`public/scenes/M03.webp`](../../public/scenes/M03.webp) | **A map is not the sky:** guidance can rise into an obstruction, reveal its edge and maker, then settle beside an open horizon. | The live `map-wall` hinges between guide, wall, inspection, and usable-map states. |
| M04 | [`public/scenes/M04.webp`](../../public/scenes/M04.webp) | **Flight becomes real in action:** a provisional paper form enters a revisable cycle, meets one real plane, and returns marked but repairable. | The live `provisional-form` can advance, shrink, pause, reverse, or stop; it is not a progress meter. |
| M05 | [`public/scenes/M05.webp`](../../public/scenes/M05.webp) | **Ground belongs to the journey:** braces, maintenance, materials, limits, care, and rest stay visible beneath the finished form. | The live `ground-supports` reveals or adjusts support without collapse spectacle; rest is a complete landing. |
| M06 | [`public/scenes/M06.webp`](../../public/scenes/M06.webp) | **Freedom needs a Compass:** a human-held direction remains surrounded by consent, evidence, boundaries, affected people, and consequences. | The live `compass` rotates freely and accepts annotation; it never snaps to a calculated correct route. |
| M07 | [`public/scenes/M07.webp`](../../public/scenes/M07.webp) | **Parents are Keepers of Conditions:** adults hold safety and resources while a young person retains a genuinely open route. | The live `keeper-table` changes the adult-held frame or mode of speech, not the child into a draggable outcome. |
| M08 | [`public/scenes/M08.webp`](../../public/scenes/M08.webp) | **Adults can remember from the life they have:** an intact everyday map reveals one modest, reversible new fold. | The live `living-map` may open, close, resize, or wait while ordinary life and obligations remain usable. |
| M09 | [`public/scenes/M09.webp`](../../public/scenes/M09.webp) | **AI is Wind, not a hidden pilot:** alternatives move through visible Wind while the human keeps the Call, Compass, adoption, and responsibility. | The live `wind` responds to pointer/scroll and role selection; accept, change, verify, reject, and no-AI all return control. |
| M10 | [`public/scenes/M10.webp`](../../public/scenes/M10.webp) | **Return completes the arc:** a changed form lands in a tray for consequence, learning, privacy, repair, closure, or a better question. | The live `return-tray` brings pieces home without audience score and allows private or closed endings. |
| M11 | [`public/scenes/M11.webp`](../../public/scenes/M11.webp) | **Refusal and help belong to authorship:** continue, reduce, pause, refuse, ask for help, and meet a duty receive equal landing structures. | The live `refusal-brace` gives every honest state a complete settled pose with equal visual status. |
| M12 | [`public/scenes/M12.webp`](../../public/scenes/M12.webp) | **The myth remains open:** a loose binding exposes detachable labels, ordinary language, sources, blank leaves, and a visible exit. | The live `open-binding` permits revision, source inspection, a blank continuation, or leaving without enrolment. |

## 4. Integrity record

| Asset | Bytes | SHA-256 |
| --- | ---: | --- |
| `home.webp` | 110,322 | `2e6d4552aaf57b6d54c73dc109b1564a14566b14298d3ed0f1dc557ef080e4a1` |
| `master.webp` | 160,050 | `4134c94e50d5cd2652cdf1dd44edd848ed58a20d1f7ba4cc52d3c6b17b90a1bb` |
| `M01.webp` | 145,810 | `bec467a2a9e7dff22f896d84828cfca68c2d01ea96e76841c969a2bbcac50918` |
| `M02.webp` | 156,566 | `09c37893938f7db690611ff5e8153f5a117143467fa919b22669052acf65d86d` |
| `M03.webp` | 198,862 | `40a8865baa4536dd6790ab41ce9b910171a91d4866bd37009c79ea463119550e` |
| `M04.webp` | 228,978 | `24735721e1365e8ac68b04f1f91d38d967267875e406fd4c077f05dbce4f2cdf` |
| `M05.webp` | 168,454 | `4e03d17bf89d039037d7516480850fde3b124590ab58970170515bdcd79073c7` |
| `M06.webp` | 157,704 | `ba3a665de0035bf35b978cd0a4b748114bbc3db264bc827562eee52b277e31c1` |
| `M07.webp` | 149,258 | `061bae43a53becd9d72c76a136fd8f00b22fcd4180a897b59e4084e310b3423a` |
| `M08.webp` | 150,986 | `73c1afd05de1c6a39949136acfc67f785027f2404fb82c4339b0a21ddb168c95` |
| `M09.webp` | 214,522 | `d9f5dfb4c07e8060369685abd1a310d419a4d2465937e0660257d683e8a22252` |
| `M10.webp` | 201,962 | `13d251f2337211b9b61cd6961de64abafac7dfc5b769ebc6db0dcfcb7d609004` |
| `M11.webp` | 222,760 | `f46d9597cc68206281cf66d097c10e4f29fee49e912d8df713039112a8599843` |
| `M12.webp` | 114,964 | `7316295476156767e3c7a5826a34d1970e577c1b007b11ae5a61a1d63ef724a1` |

The hashes describe the files present when this manifest was written. Any
intentional regeneration or recompression requires updating this table and
reviewing the new image against the semantic landing state—not merely checking
that the dimensions still match.

## 5. Handoff rule

Before replacing a scene, compare its final resting composition with the row
above and with the corresponding chapter in
[`POPUP_GAME_ART_DIRECTION.md`](./POPUP_GAME_ART_DIRECTION.md). A visually
polished image is not a valid replacement if it changes who holds agency,
implies one morally correct route, hides Ground or responsibility, turns AI
into a pilot, or removes a valid exit.
