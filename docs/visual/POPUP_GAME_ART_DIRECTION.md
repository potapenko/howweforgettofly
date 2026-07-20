# Pop-up Game Art Direction

## Locked visual source

The production source of truth is [`reference/popup-game-master.png`](./reference/popup-game-master.png).

- Native size: 1672 × 941 (landscape, approximately 16:9)
- SHA-256: `56e93a80db9cddd412d15cdaa4f00ee4eac59201ca19c7b44bab86ca45a4acf9`
- Status: explicitly selected by the project owner

This image is not a mood-board suggestion. It fixes the visual hierarchy, material language, palette, typographic personality, dimensionality, and emotional register for implementation.

## One-sentence direction

An open contemporary pop-up book becomes a small playable world where wind carries paper forms through questions, choices, making, return, and rest.

## Emotional register

- Curious, generous, kinetic, and quietly brave.
- Young without becoming childish; intelligent without looking institutional.
- A fairy tale expressed through understandable paper mechanics rather than magic effects.
- Adventure comes from opening, steering, testing, folding, returning, and discovering—not from winning.

## Explicit exclusions

- No Cormorant, display serif, illuminated-manuscript, or literary-folio styling.
- No sepia, parchment, distressed paper, leather, brass, wax seals, or museum-book mood.
- No dark laboratory, ominous scientific diagram, mystical glow, sacred geometry, or doctrine-like presentation.
- No dashboard-card aesthetic, progress rank, score, collectible badge, streak, or gamified judgment.
- No generic flat vector illustration standing in for the physical pop-up mechanism.

## Design tokens

### Colour lock

- Canvas white: `#FFFFFF`
- Paper white: `#F8FAFC`
- Ink: `#111318`
- Muted ink: `#596274`
- Sky: `#62B7F2`
- Cobalt: `#1264E8`
- Deep blue: `#0647B5`
- Cyan wind: `#36C9F2`
- Lime: `#A8D52A`
- Orange: `#FF6B1A`
- Soft line: `rgba(17, 19, 24, .14)`
- Paper shadow: cool neutral, never brown

### Typography

- Display and navigation: Space Grotesk Variable, 600–700.
- Reading copy: Source Sans 3, 400–600.
- Headings are compact, bold, and geometric; body copy remains open and calm.
- Uppercase is reserved for short navigation and scene-number utility labels.

### Geometry

- The persistent object is a clean white open book with a blue cover edge, a visible central spine, stacked page edges, and physical pull-tabs.
- Each chapter rises from the same spread through distinct folds, hinges, braces, slots, discs, ribbons, and removable overlays.
- Objects use real thickness, cast shadows, and readable connection points. Nothing should look like weightless UI rectangles.

## Page composition

The source image establishes a two-part spread:

1. A calm editorial page carries code-native title, navigation, chapter number, thesis, and actions.
2. A spacious diorama page carries the visual metaphor and most motion.

Desktop may overlap these zones slightly to make the words and world feel bound together. Mobile stacks them: editorial leaf first, playable diorama second. The stage must still read as one book rather than a card beside an illustration.

## Motion grammar

- Scroll opens the current mechanism in 3–5 readable beats.
- Pointer or touch adds restrained camera tilt and local wind response.
- A selected answer moves only the corresponding tab, hinge, route, brace, or landing surface; it never changes a score.
- Wind ribbons breathe continuously only while the scene is visible and motion is enabled.
- Transitions land. Every scene ends on a stable composition instead of looping forever.
- Reduced motion shows the same complete settled spread with no loss of meaning.

## Twelve chapter scenes

| ID | Chapter | Pop-up game mechanism | Required landing image |
| --- | --- | --- | --- |
| M01 | Dignity comes before Flight | Six distinct forms share one support while a transparent measuring veil folds away. | Different forms remain equally held; no podium. |
| M02 | Authorship begins with a question | One unfinished centre opens into four equal response islands. | Yes, no, not now, and differently remain equally valid. |
| M03 | A map is not the sky | A fold-out map rises into a wall, turns to reveal its edge, then lowers beside an open landscape. | Guidance remains usable without covering the sky. |
| M04 | Flight becomes real in action | A provisional paper form moves through a revisable seven-part work loop. | The changed form returns visibly repairable. |
| M05 | Ground belongs to the journey | The finished scene opens to reveal braces, maintenance, materials, and a calm rest platform. | Support and rest remain visible. |
| M06 | Freedom needs a Compass | A person holds a freely rotating compass over multiple routes and affected shores. | A direction is annotated, never declared correct. |
| M07 | Parents are Keepers of Conditions | Adults hold a safe frame and supplies while a child steers a kite or paper plane through an open field. | Adult responsibility remains; the child's route stays genuinely open. |
| M08 | Adults can remember from the life they have | An intact everyday map reveals one small reversible new fold. | Existing life remains usable whether the fold opens, closes, or waits. |
| M09 | AI is Wind, not a hidden pilot | Human-held wheel and Compass remain fixed while translucent Wind offers movable alternatives. | Adopt, change, verify, reject, or no-AI all return control to the human. |
| M10 | Return completes the arc | A form loops back with material marks into a tray for learning, privacy, repair, or closure. | Consequence lands without becoming audience score. |
| M11 | Refusal and help belong to authorship | Equal landing platforms support continue, reduce, pause, refuse, ask for help, or meet a duty. | Every honest state resolves as complete. |
| M12 | The myth remains open | A loose binding exposes detachable labels, ordinary language, sources, blank leaves, and an exit tab. | The visitor may revise or leave without enrollment. |

## Asset inventory

- Master reference: `visual/reference/popup-game-master.png`
- Text-free production hero: `public/scenes/home.webp`
- Chapter stills: `public/scenes/M01.webp` through `M12.webp`
- Each still is a fallback and visual reference for the corresponding live Three.js scene.
- UI text, navigation, controls, chapter labels, and reflective content remain semantic HTML.
- Paths, dimensions, integrity hashes, provenance limits, and per-scene
  interaction notes: [`POPUP_SCENE_ASSET_MANIFEST.md`](./POPUP_SCENE_ASSET_MANIFEST.md).

## Acceptance checks

- A first-time viewer can describe the site as a modern playable pop-up book without being prompted.
- The page contains no visible serif typography and no antique-paper colour cast.
- The same book and material system visibly connects all twelve scenes, while each scene has a distinct mechanism.
- Scroll, pointer, touch, keyboard, quiet view, and graphics-off fallbacks preserve the chapter's meaning.
- The visual does not imply that Flight is a rank, that AI is the pilot, or that one ending is morally higher than another.
