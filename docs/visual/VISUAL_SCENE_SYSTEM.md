# How We Forget to Fly — Visual Scene System

> Current art direction: [`POPUP_GAME_ART_DIRECTION.md`](./POPUP_GAME_ART_DIRECTION.md). The approved bright pop-up-game reference supersedes any older antique, sepia, serif-led, or ominous interpretation in this document.

> **Implementation-state note — 2026-07-19.** This document remains the
> original visual and motion contract. A separately authorized local build now
> realizes the system in the [repository root](../../README.md)
> with ImageGen-derived `1672 × 941` RGB/RGBA raster packs, a poster-first
> sticky parallax runtime, a `480svh` Home story, approximately `320vh` chapter
> stories, bounded pointer/touch depth, reduced-motion behavior, and complete
> poster fallback. The runtime intentionally has no Three.js, canvas, or WebGL
> dependency. Sections that refer to a “future prototype” preserve the earlier
> handoff language rather than denying the present build. Public deployment was
> not performed, and rendered-browser/design QA is still open.

**Document type:** visual-experience and motion contract  
**Version:** 1.0  
**Date:** 2026-07-19  
**Status:** `visual-scene-system-ready`  
**Primary surface:** English-language responsive web experience  
**Original document boundary:** design specification only; no code, prototype,
publishing, domain work, analytics, accounts, or live AI integration inside
this document’s initial goal

This document turns the documentary system of **How We Forget to Fly** into a
coherent visual and interactive language for a future site. It is the bridge
between `SITE_THESIS.md`, the two Memoranda, the Interactive Atlas, and a later
vertical-slice prototype.

The governing design idea is:

> **One living book, many theatrical states.**

The site is not a slide deck with decorative pictures and not one impressive
hero followed by ordinary text. Every major section becomes a readable digital
spread with its own paper-engineered scene. The visual register may change with
the meaning, while material, typography, motion grammar, navigation, and human
dignity remain continuous.

Motion is never the price of access. The complete meaning remains available as
real text and as a reduced-motion or static composition.

---

## 1. Governing inputs

The scene system is downstream from, and cannot silently override:

- `universe/FLIGHT_UNIVERSE_BIBLE.md` for terms, roles, tensions, and the exact
  cycle;
- `thesis/MEMORANDUM.en.md` for the twelve primary article scenes;
- `thesis/MEMORANDUM.ru.md` as the paired meaning reference;
- `thesis/PARENT_FOUNDATION.md`, `ADULT_FOUNDATION.md`, and `AI_AS_WIND.md`
  for audience dignity and practice boundaries;
- `product/SITE_THESIS.md` for the seven destinations and narrative arc;
- `product/INTERACTIVE_ATLAS.md` for the ten experiences;
- `product/MVP_SPEC.md` for states, privacy, accessibility, and acceptance;
- `governance/TRACEABILITY.md` for source-derived and project-origin chains.

The canonical cycle remains:

> **Call → Compass → Lift → Making → Flight → Return → Ground**

It may appear as a map, never as a completion meter, rank, mandatory sequence,
or measure of a person.

---

## 2. The visual thesis

### 2.1. Not three competing themes

The three generated concepts are not alternate skins. They are semantic
registers of the same physical book:

1. **Quiet Paper Sky** — possibility, dignity, care, Lift, and Ground.
2. **Night Paper Theatre** — uncertainty, Gravity, forgetting, conflict,
   consequence, and the limits of easy answers.
3. **Living Fold-Out Atlas** — orientation, Compass, choice, practices, and
   explicit interaction.

The site moves among them because the philosophy moves among those conditions.
No visitor selects a prestige theme, and no register represents a higher kind
of person.

### 2.2. One recurring object

The recurring object is a paper book that can also become a theatre, map,
worktable, instrument panel, shelter, or archive. It never becomes a magical
oracle. Continuity is visual and editorial across separate held artboards, not
the persistence of one 3D renderer. Across sections the visitor should
recognise:

- the same paper grain and cut-edge logic;
- the same family of folds, tabs, threads, apertures, and printed marks;
- the same typographic voices;
- one consistent model of light and shadow;
- one motion vocabulary;
- the same navigation positions and exit affordances.

The book changes state; the product does not change identity.

### 2.3. The content remains primary

Each scene contains three separable layers:

1. **Editorial layer:** real, selectable, screen-reader-readable text in the
   document order.
2. **Theatrical layer:** real visual assets arranged as tactile paper planes,
   masks, shadows, and depth.
3. **Interaction layer:** optional movement or input that lets the visitor
   inspect or compose, never a test that reveals a hidden truth.

Text must not be baked into illustration assets. A broken animation must not
erase the article, navigation, source note, or practice.

---

## 3. Concept anchors

These images are direction anchors, not production-ready screens. Their copy,
icons, proportions, and physical plausibility may change during prototyping.
They define atmosphere and composition, not final assets.

> The three exploratory renders described below were intermediate decision
> artifacts and were intentionally not migrated. The selected
> `reference/popup-game-master.png` remains the visual source of truth.

### 3.1. Quiet Paper Sky

**Keep:** light, tactile calm; generous reading space; the open spread as one
object; restrained blue sky; believable fibers, folds, and shadows; doorways
embedded in the book rather than floating cards.

**Change before production:** avoid a literal flying bird as the central proof
of Flight; make the map-to-sky transformation more important than a symbolic
aircraft; ensure navigation and copy remain usable outside the render.

### 3.2. Night Paper Theatre

**Keep:** cinematic depth; cut-paper light; the sense that one helpful map can
become an enclosing stage; warm light against indigo; suitability for difficult
questions and consequential Return.

**Change before production:** remove the heroic central human silhouette and
literal compass-person fusion; darkness must name uncertainty or constraint,
not spiritual superiority, evil, or membership in a secret world.

### 3.3. Living Fold-Out Atlas

**Keep:** one continuous sheet producing distinct doorways; strong orientation;
visible paper engineering; confident editorial color; the cycle as a flexible
edge map; direct relationship between choice and fold.

**Change before production:** reduce simultaneous labels on small screens;
prevent the numbered rail from reading as mandatory progress; make handwriting
legible or remove it; preserve quiet reading between interactive moments.

---

## 4. Three visual registers

### REG-01 — Quiet Paper Sky

**Semantic job:** make room for possibility without promising transcendence.

**Best for:** Home, dignity, parent care, Lift, Making, supportive Ground,
private Return, rest, and the final open page.

**Material character:** warm ivory and off-white paper; sparse blue apertures;
soft daylight; visible fibers; quiet graphite or letterpress marks; broad
surfaces and one dominant fold.

**Motion character:** slow opening, breathing distance between layers, a form
rising only as far as its support permits, light moving across an edge, and a
gentle landing.

**Risk:** aesthetic purity can turn ordinary life into a luxury object or make
the experience too passive. Counter with plain language, visible responsibilities,
imperfect marks, and real exits.

### REG-02 — Night Paper Theatre

**Semantic job:** let tension become visible without diagnosing or frightening
the visitor into action.

**Best for:** Gravity, borrowed destiny, forgetting, an interrupted whole,
conflicting obligations, AI drift, unintended effects, repair, and moments when
the answer is not yet visible.

**Material character:** deep indigo, charcoal, and black paper; warm light seen
through apertures; thread or fine line showing routes; silhouettes of objects
rather than heroic people; a limited number of planes.

**Motion character:** occlusion, a route moving out of view, light revealing a
boundary, resistance to scroll direction, a shadow separating from its object,
and the scene reopening into Ground.

**Risk:** darkness can imply danger, moral failure, occult authority, or a
special initiated audience. Never make the visitor pass through darkness to
earn access. Always provide plain text, direct exit, and visible Ground.

### REG-03 — Living Fold-Out Atlas

**Semantic job:** make distinctions, alternatives, and human-held choices
operable.

**Best for:** Compass, page and pathway selection, Parent modes, Problem Finder,
Set the Wind, Atlas experiences, source genealogy, and the relation among Call,
choice, action, Return, and Ground.

**Material character:** a continuous warm sheet with restrained rust, ochre,
blue, and graphite fields; printed maps; tabs; ruled or measured marks used as
tools, never scores; die-cut doorways and re-foldable panels.

**Motion character:** unfolding alternatives, rotating an instrument without
snapping to a correct answer, separating required from open, rearranging panels,
and folding selected material into a visitor-owned note.

**Risk:** an atlas can become a dashboard, curriculum, or progress system.
Avoid locked routes, completion percentages, recommended levels, glowing
correct paths, and automatic personalization.

---

## 5. Shared physical grammar

### 5.1. Materials

The core material set is deliberately small:

- uncoated warm paper for primary surfaces;
- blue or indigo paper for sky, distance, and uncertain depth;
- rust and ochre paper for active distinctions and chosen folds;
- translucent vellum for influence, ambiguity, Wind, and partial knowledge;
- graphite, letterpress ink, or fine printed lines for maps and annotations;
- thread, pin, hinge, brace, or tab for relationships and support;
- soft cast shadows that reveal construction rather than simulate luxury.

No visible asset should be faked with placeholder boxes, text symbols, CSS
paper shapes, or improvised vector decoration. Production scenes require real,
purpose-made illustration assets with measured crops and separated layers.

### 5.2. Depth

- Use one dominant object per scene.
- Default to three to six perceptible planes, not dozens of decorative layers.
- Foreground may frame or temporarily occlude; it must not hide essential text.
- Midground carries the active transformation.
- Background supplies sky, Ground, or consequence rather than ornamental
  scenery.
- Depth compresses on smaller screens without changing the semantic order.

### 5.3. Light

- Light has a source inside the physical composition.
- Quiet Paper Sky uses broad daylight and soft contact shadows.
- Night Paper Theatre uses warm apertures and controlled darkness.
- Living Fold-Out Atlas uses directional studio light that makes folds legible.
- A Call may reveal light; light never certifies a morally correct choice.
- Human worth is never represented by brightness, altitude, size, or proximity
  to the light.

### 5.4. Typography

Use no more than two type families:

- one editorial face for titles, quotations, and the manifesto voice;
- one highly legible text face for navigation, practices, labels, and long-form
  reading.

Requirements:

- body text remains real HTML with a comfortable line length;
- mythic terms receive adjacent plain-language meaning on first use;
- scene labels do not imitate instructions unless an action is genuinely
  available;
- handwriting is an accent, never required content;
- article numbers orient but do not imply achievement or completion;
- hierarchy must survive without color, depth, or animation.

### 5.5. Navigation

Navigation belongs to the book’s edge, margin, or table of contents, but remains
a conventional and predictable control.

Every scene exposes:

- current destination and article;
- a route to the seven primary destinations;
- a plain exit from a practice;
- a source route where provenance matters;
- a way to skip the scene’s animation and reach its settled state.

The visual metaphor never traps the visitor inside a page turn or forces a
precise scroll gesture.

---

## 6. Motion grammar

Every movement must belong to one of seven verbs. This is the motion equivalent
of the Flight cycle, not a literal one-to-one animation at every stage.

| Motion verb | Physical action | Meaning | Forbidden reading |
|---|---|---|---|
| **Notice** | aperture, edge, or mark becomes visible | something may deserve attention | destiny has selected the visitor |
| **Orient** | planes separate; compass or map becomes inspectable | choices and limits can be seen | a correct route has been computed |
| **Support** | brace, hinge, table, or Ground becomes visible | conditions make an attempt possible | dependency lowers worth |
| **Form** | flat material folds into a provisional object | intention becomes answerable | output proves identity |
| **Meet** | object encounters resistance, another plane, or response | reality can answer a form | friction means failure |
| **Return** | pieces, marks, or responses move back into relation | effects, learning, value, or repair are received | publicity or gratitude is owed |
| **Land** | object settles, folds, rests, or remains unfinished | closure, care, pause, or honest ending | the visitor must begin again |

### 6.1. Scroll behavior

Natural document scroll remains the primary transport. A scene may temporarily
hold its visual field while the editorial layer advances through a small number
of semantic beats, provided that:

- scroll direction and browser controls remain predictable;
- no long dead zone exists merely to display animation;
- the scene can be skipped to its settled composition;
- fast scrolling does not produce flashing, chaotic reversals, or lost text;
- returning upward restores a meaningful earlier state without changing the
  visitor’s authored answer;
- completion never depends on reaching an invisible scroll threshold.

A typical article scene has five beats:

1. **Grounded opening:** title, plain thesis, and complete static composition.
2. **Recognition:** one tension becomes visible.
3. **Transformation:** the paper object changes in a semantically legible way.
4. **Choice or encounter:** optional direct manipulation or visitor-authored
   line.
5. **Return and Ground:** the scene settles and the next destination is offered
   without pressure.

### 6.2. Direct manipulation

Direct manipulation is optional and limited to objects whose meaning depends on
human choice:

- open or close one fold;
- rotate a Compass without snapping to a correct answer;
- separate “required” from “open” panels;
- assign Wind one role and set a boundary;
- move a visitor-authored note into Return or Ground;
- stop a movement and leave the object unfinished.

Hover-only meaning is prohibited. Touch, keyboard, and non-motion alternatives
must reach the same content and settled state.

### 6.3. Timing and feel

- Navigation and controls respond immediately.
- Paper movement feels weighted and interruptible, never gelatinous or bouncy.
- Large reveals are slow enough to read but do not delay access to text.
- Repeated ambient movement stops; nothing flaps forever to keep the page alive.
- No confetti, achievement pulse, completion chime, streak animation, altitude
  reward, or gamified progress.

### 6.4. Sound

Sound is optional, off by default, and never carries essential meaning. If a
later prototype tests it, the vocabulary is limited to paper, hinge, pencil,
thread, air, and room tone. Sound starts only after an explicit visitor action,
has a persistent mute control, and does not intensify to manufacture emotion.

---

## 7. Page-to-register map

| Destination | Primary register | Secondary state | Dominant physical object | Signature movement | Content / practice landing |
|---|---|---|---|---|---|
| `PAGE-01 — Home` | Quiet Paper Sky | Atlas appears at doorway choice | open book; map rising into sky | map stops occupying the whole sky; three folds become visible | Parent, Adult, AI, Manifesto, Source |
| `PAGE-02 — Manifesto` | all three, article by article | transitions land on Quiet Ground | twelve related spreads in one bound book | each article performs one semantic transformation | complete English Memorandum; reading-only path |
| `PAGE-03 — Parents` | Quiet Paper Sky | Atlas for honest modes; brief Night state for hidden control | shared worktable with adult-held frame and open form | fixed frame and child-authored part separate without breaking relation | `EXP-01`, `EXP-03`, descriptive `EXP-07` |
| `PAGE-04 — Adults` | Fold-Out Atlas | Night for borrowed destiny; Quiet for rest and private making | inherited map with one revisable fold | old routes remain while another relation becomes possible | `EXP-02`, `EXP-06`, descriptive `EXP-04`, `EXP-10` |
| `PAGE-05 — AI` | Fold-Out Atlas | Night for drift; Quiet for human adoption and Ground | vellum Wind planes around a manually held Compass | Wind moves options; visitor sets role and keeps direction | `EXP-05`, complete no-AI route |
| `PAGE-06 — Practices` | Fold-Out Atlas | register preview for each experience | one continuous sheet with ten non-ranked folds | visitor chooses by present job, not inferred type | `EXP-01…EXP-10`, seven core and three descriptive next |
| `PAGE-07 — Source / About` | Quiet archival spread | Night used only to show missing material; Atlas for genealogy | source book beside an independent new construction | trace lines connect inspiration and transformation without merging works | source link, gap note, authorship boundary |

### 7.1. Register transitions

Transitions happen through physical continuity:

- Quiet paper turns away from light and becomes Night paper.
- A Night aperture opens and the same sheet unfolds as an Atlas.
- Atlas panels refold into a broad Quiet Ground.
- A page turn may change chapter, but it never erases the visitor’s current
  text without explicit discard.

A sudden palette cut is reserved for a real semantic break. Visual novelty by
itself is not a reason to change register.

---

## 8. Twelve Manifesto spreads

Each English article and its Russian meaning pair share one scene contract.
The public MVP may launch in English, but the scene cannot depend on an
English-only pun.

### SCENE-M01 — Dignity comes before Flight

**Register:** Quiet Paper Sky.  
**Object:** several different paper forms resting on one continuous Ground;
measuring marks sit on a removable vellum overlay.  
**Scroll transformation:** the overlay arrives → begins comparing height,
speed, and output → separates from the people/forms → folds away while the
shared Ground remains.  
**Optional action:** remove one proposed metric or leave the overlay untouched
and read why dignity remains outside it.  
**Landing:** forms remain different, equally held by the page.  
**Guardrail:** no identical figures implying sameness of ability; no bright or
elevated “creative” form.

### SCENE-M02 — Authorship begins with a question

**Register:** Quiet Paper Sky moving into Living Fold-Out Atlas.  
**Object:** a small cut or unfinished mark in an otherwise complete sheet.  
**Scroll transformation:** the mark becomes noticeable → several possible
question folds appear → their consequences and owners become visible → none is
selected automatically.  
**Optional action:** open `yes`, `no`, `not now`, or `differently`; all produce
a complete composition.  
**Landing:** one possible Call or an honest non-answer rests on Ground.  
**Guardrail:** no glowing destiny, personality inference, or pressure to choose
`yes`.

### SCENE-M03 — A map is not the sky

**Register:** Living Fold-Out Atlas briefly becoming Night Paper Theatre, then
returning to Quiet Paper Sky.  
**Object:** a useful printed map that can rise vertically and occlude the sky.  
**Scroll transformation:** map guides across the Ground → grows into a wall →
its edge and authorship become visible → it folds down into a usable reference
while the sky reappears.  
**Optional action:** inspect who drew one route, what it protects, and what it
hides.  
**Landing:** map remains available beside an open view.  
**Guardrail:** influence is not impurity; the scene must not reward throwing
the map away.

### SCENE-M04 — Flight becomes real in action

**Register:** Living Fold-Out Atlas resolving into Quiet Paper Sky.  
**Object:** a flat drawing and one small foldable form.  
**Scroll transformation:** imagined outline → conditions and hinges appear →
the visitor sees a right-sized fold → the form rises and meets one real plane →
it returns altered.  
**Optional action:** choose a smaller form or stop before folding.  
**Landing:** the object is visibly provisional and repairable.  
**Guardrail:** no grand takeoff, hero ascent, or output as proof of identity.

### SCENE-M05 — Ground belongs to the journey

**Register:** Quiet Paper Sky with a brief Night cutaway.  
**Object:** the underside of a pop-up construction: braces, hinges, table,
hands-off supports, and areas of rest.  
**Scroll transformation:** finished object is seen → page reveals its support →
removing one support shows consequence without collapse spectacle → structure
is resized or laid down.  
**Optional action:** name one needed condition or choose rest/no change.  
**Landing:** support and rest remain visible, not hidden as backstage labor.  
**Guardrail:** dependency and routine never reduce worth; rest is not fuel owed
to future productivity.

### SCENE-M06 — Freedom needs a Compass

**Register:** Living Fold-Out Atlas.  
**Object:** a human-held compass mounted on a revisable map with consent,
boundary, evidence, and consequence layers.  
**Scroll transformation:** many directions appear → Compass questions separate
them → affected people and limits enter the map → one direction may be tried
without becoming certain.  
**Optional action:** rotate the Compass, then explicitly choose keep, revise,
ask, or stop; it never snaps.  
**Landing:** chosen direction stays annotated with its limits.  
**Guardrail:** no oracle, sovereign individual, correct bearing, or moral score.

### SCENE-M07 — Parents are Keepers of Conditions

**Register:** Quiet Paper Sky moving into Living Fold-Out Atlas.  
**Object:** a shared paper worktable: the adult-held base and an open material
field are visibly connected but not fused.  
**Scroll transformation:** adult responsibility appears first → a hidden
expected result overlays the open field → fixed and authored parts separate →
one honest mode of speech is folded into a sentence.  
**Optional action:** use `EXP-01` or the five modes of `EXP-03`.  
**Landing:** the adult remains present and responsible; the child is never a
manipulable on-screen object.  
**Guardrail:** no child profile, parenting grade, forced choice, parental shame,
or disappearing Keeper.

### SCENE-M08 — Adults can remember from the life they have

**Register:** Night Paper Theatre unfolding into Living Fold-Out Atlas and
settling into Quiet Paper Sky.  
**Object:** an existing worn map with obligations, routines, skills, and one
unused fold.  
**Scroll transformation:** present routes become legible → a borrowed route is
distinguished from necessary Ground → one small fold opens without erasing the
map → it may remain open, close, or wait.  
**Optional action:** write one possible question or choose “nothing today.”  
**Landing:** present life remains intact and usable.  
**Guardrail:** no rebirth fantasy, contempt for routine, secret true self, or
one mission explaining the past.

### SCENE-M09 — AI is Wind, not a hidden pilot

**Register:** Living Fold-Out Atlas passing briefly through Night Paper Theatre.  
**Object:** translucent Wind planes carrying alternatives around a manually
held Compass and a visible human-written Call note.  
**Scroll transformation:** Call and Compass appear before Wind → one role is
assigned → options accelerate and some routes are obscured → adoption/rejection
returns control to the visitor → the tool closes.  
**Optional action:** set Mirror, Generator, Interlocutor, Critic, Craft Aid, or
Simulator; complete the same planning card with no AI.  
**Landing:** adopted material is visibly annotated; rejected material leaves no
penalty.  
**Guardrail:** no AI face, oracle, neutral magic, replacement fear, child
analysis, or hidden prompt optimization.

### SCENE-M10 — Return completes the arc

**Register:** Night Paper Theatre returning to Quiet Paper Sky.  
**Object:** a made form meeting material, another plane, silence, or an
unexpected mark.  
**Scroll transformation:** form leaves its protected fold → contact changes
both surfaces → responses travel back as distinct pieces → the visitor sees
learning, value, privacy, repair, or ending → scene settles.  
**Optional action:** choose what is observed and what response is adopted.  
**Landing:** Return may remain private; actual harm still receives attention.  
**Guardrail:** no applause, audience size, gratitude, usefulness, publication,
or market value as default completion.

### SCENE-M11 — Refusal and help belong to authorship

**Register:** Night Paper Theatre resolving into Quiet Paper Sky with visible
structural supports.  
**Object:** a fold that can stop halfway and accept a brace, shared hinge, or
closed tab.  
**Scroll transformation:** invitation begins → visitor sees duty versus choice
→ form can continue, reduce, receive help, stop, or close → each option lands
without visual demotion.  
**Optional action:** choose `no`, `not now`, `differently`, help, obligation
only, or continue.  
**Landing:** the chosen state is complete and non-evaluative.  
**Guardrail:** no locked-door heroism, shame for help, or refusal presented as
freedom from consequences.

### SCENE-M12 — The myth remains open

**Register:** all three registers resolving into Quiet Paper Sky.  
**Object:** the bound book reveals detachable labels, visible construction,
blank paper, source notes, and several ordinary exits.  
**Scroll transformation:** symbols and scenes return → their plain meanings
appear → no central interpreter is installed → terms can be lifted, questioned,
or left → the book remains open rather than demanding a conclusion.  
**Optional action:** switch to plain language, inspect provenance, or leave.  
**Landing:** an open page with no enrollment, badge, next level, or promised
salvation.  
**Guardrail:** no guru, secret door, initiation, superior believer, sacred
founder, compulsory creed, or endless engagement loop.

### 8.1. Physical continuity across the twelve spreads

The scenes should inherit material from one another so the Manifesto feels
like one continuously engineered book rather than a gallery of effects. The
removed metric overlay from `M01` can become the question card in `M02`; its
four leaves become the map in `M03`; the map hinges become the cycle mechanism
in `M04`; its Ground plate opens into the support table in `M05`; a printed
mark on that table becomes the Compass in `M06`; the Compass enters the
Keeper’s worktable in `M07`; its remaining materials become the adult evening
table in `M08`; its vellum catches Wind in `M09`; an adopted or rejected card
travels into Return in `M10`; a Return tray becomes the stop/help structure in
`M11`; and those braces become the loose, revisable binding of `M12`.

This continuity is a production hypothesis, not a puzzle the visitor must
notice. It should reduce asset fragmentation and quietly reinforce that every
chapter belongs to one material world.

---

## 9. Experience-to-object map

The ten Atlas experiences reuse the same scene grammar rather than inventing a
new UI style for each tool.

| Experience | Register | Interactive paper object | Visitor-owned artifact | Settled state |
|---|---|---|---|---|
| `EXP-01 What Grounds Flight?` | Quiet + Atlas | shared worktable with fixed/open folds | three-part Ground agreement | adult-held frame and child-authored part remain distinct |
| `EXP-02 Problem Finder` | Quiet → Atlas | small aperture unfolding into four responses | possible Call + present response | question, refusal, or not-now rests on Ground |
| `EXP-03 Instruction or Invitation?` | Atlas | five honest speech folds | mode, sentence, behaviour, real-no check | sentence returns to one family moment |
| `EXP-04 Template Escape` | Atlas | one routine panel with reversible hinge | small variation card | original template remains available |
| `EXP-05 Set the Wind` | Atlas → Night → Quiet | vellum Wind planes around human note and Compass | Wind agreement + adoption note | tool closes; responsibility remains human |
| `EXP-06 Flight Log` | Quiet bound spread | seven optional areas on one cycle sheet | intentionally complete or incomplete note | single-cycle page closes without history |
| `EXP-07 Creative Climate Map` | Quiet + Atlas | eight unscored condition tabs | one-situation climate note | at most one change, or none |
| `EXP-08 The Return` | Night → Quiet | response pieces returning from contact | Return note or honest ending | privacy, repair, revision, or closure |
| `EXP-09 Ground Landing` | Quiet | fold, brace, rest surface, or closed tab | optional landing sentence | no automatic continuation |
| `EXP-10 Borrowed Map, Living Compass` | Atlas | inherited route with movable annotation layer | keep/revise/refuse decision | map stays useful without becoming sky |

No object stores a child profile, computes a score, or persists a reflective
history. Copy, print, export, discard, and fresh-session behavior remain those
defined in `MVP_SPEC.md`.

---

## 10. Text and scene composition

### 10.1. Editorial density

The public article remains readable as an article. For each spread:

- the opening view gives the article title, a one- or two-sentence plain thesis,
  and a complete static scene;
- the full article is divided only at real semantic turns, generally three to
  five beats;
- each beat advances both text and one physical relation;
- a visitor may choose “Read continuously” and receive the complete text
  without a held scene;
- source notes and caveats remain ordinary links or text, not hidden easter
  eggs;
- optional interaction follows comprehension; it never blocks the next
  paragraph.

### 10.2. Desktop composition

Desktop may place editorial text and the diorama in a changing relationship:

- text beside the object during orientation;
- text crossing a quiet paper surface when contrast remains strong;
- visual field held while short text beats move;
- article conclusion returning to a normal reading column.

The whole site must not remain a two-column template. The physical fold can
change composition while reading order stays stable.

### 10.3. Mobile composition

Mobile is a re-authored stage, not a crop of desktop:

- text leads; the scene follows or sits behind only where contrast is certain;
- depth compresses to roughly two or three meaningful planes;
- no hover behavior;
- large direct-manipulation targets and a conventional alternative control;
- scene holds are shorter and can be skipped;
- diagrams refold vertically rather than shrinking illegibly;
- article and practice remain complete in portrait orientation;
- landscape may enrich the scene but is never required.

---

## 11. Accessibility and agency contract

### 11.1. Reduced motion

When reduced motion is requested:

- every scene loads in its settled, comprehensible composition;
- semantic changes use immediate state replacement or restrained opacity;
- no parallax, camera travel, persistent drift, scroll-held animation, or
  involuntary spatial movement;
- all direct manipulation has conventional buttons or choices;
- the complete article and practice remain available.

### 11.2. Static fallback

Without advanced graphics or client-side motion, the experience still provides:

- one final illustration per scene;
- the complete text in document order;
- ordinary links among all seven destinations;
- HTML practice fields and decisions where a practice is offered;
- source and privacy boundaries;
- copy, print, export, or discard under visitor control.

### 11.3. Input and reading

- Keyboard and assistive technology follow the editorial order, not visual
  depth.
- Focus never moves because a paper plane moves.
- Scroll alone does not alter a form answer.
- Interaction labels describe the real result: “Open the distinction,” not
  “Take flight.”
- No time limit, precision drag, sound cue, or gesture is required.
- Contrast, zoom, reflow, and language remain testable independently from the
  illustration.
- Visitor text is never exposed as decoration in a public scene.

### 11.4. Cognitive and ethical clarity

- First use of every mythic term includes plain language.
- One scene carries one dominant transformation.
- Darkness, light, height, size, speed, and visual complexity never encode
  worth.
- A child is not represented as an object the adult moves.
- Refusal and stopping receive complete, visually settled outcomes.
- Professional help and immediate safety leave the metaphor in plain language.

---

## 12. Implemented rendering posture

The production decision for the current local prototype is layered raster
parallax. The earlier true-3D evaluation is closed: browser inspection showed
that a WebGL reconstruction did not provide sufficient visual control or
reference fidelity for this art direction.

### 12.1. Fixed artboard and real raster packs

Every story is authored on a `1672 × 941` artboard. ImageGen-derived production
packs use an RGB background and registered RGBA foreground subjects; the Home
scene has seven planes, and M01–M12 each have background, primary, and
secondary planes. A complete WebP poster remains available for the settled
composition and any loading failure.

The material illusion—paper grain, folds, cut edges, daylight, and shadows—is
carried by the illustration itself. Motion is limited to semantically useful
translation, scale, rotation, and opacity among the registered planes.

### 12.2. Sticky story pacing

The opening spread holds for `480svh` and plays six visual beats before
releasing into normal text. Chapter and route stories hold for approximately
`320vh` and play four to six beats. Natural scroll is always the timeline;
pointer or touch adds only a small nested depth offset and never changes the
visitor's answers.

### 12.3. Progressive enhancement

The editorial and practice layer arrives independently from the richest scene.
The complete poster is visible first; registered planes replace it only after
all required images load. A failed plane keeps the settled poster and ordinary
controls without losing position or text.

### 12.4. Performance posture

- Deliver readable text and a light settled poster before enhanced scene
  assets are ready.
- Animate only the current scene; off-screen scenes stop fully.
- Prepare only the current and nearest relevant destination rather than the
  whole book at launch.
- Re-author crop, plane travel, and hold length for constrained screens without
  removing content or controls.
- Exclude decorative particles, complex reflections, continuous Wind
  simulation, and perpetual ambient loops.
- Treat a raster-layer failure as a normal fallback to the settled image and
  document interface, not as a broken page.

### 12.5. Prototype measurement questions

The vertical slice must measure rather than assume:

- whether paper remains believable during movement;
- whether text stays readable while the scene transforms;
- whether scroll feels natural rather than captured;
- whether a mid-range phone can maintain smooth input and stable layout;
- whether loading the first meaningful content waits on visual assets;
- whether reduced-motion and static versions feel intentional;
- whether visitors understand the transformation without instruction;
- whether the scene improves the idea enough to justify its production cost.

Hard performance budgets belong to the prototype plan after representative
assets are measured; they are not invented in this document.

---

## 13. First vertical slice

The first build target is deliberately narrower than the full site:

> **Home → Parent doorway → `EXP-03 Instruction or Invitation?` →
> `EXP-08 The Return` → `EXP-09 Ground Landing`**

Quiet Paper Sky is the dominant art direction and receives the full production
attention first. Atlas mechanics and the brief Night state are deliberately
lighter transition states in this slice: enough to prove that the same book
can change semantic register, not an attempt to finish all three art systems at
once. The route remains one meaningful visitor journey.

### VS-01 — Home / The map became the sky

**Register:** Quiet Paper Sky.  
**Editorial job:** state the singular promise and reveal Parent, Adult, AI,
Manifesto, and Source routes.  
**Scene:** an open spread; a printed map has risen high enough to occupy the
sky. Scroll reveals its edge, then lets it settle into a useful Ground plane.
Three doorway folds appear.  
**Proof:** visitor can understand and navigate before or without movement.

### VS-02 — Parent doorway / What the adult holds

**Register:** Quiet Paper Sky with Atlas mechanics.  
**Editorial job:** establish equal dignity and unequal adult responsibility.  
**Scene:** a shared table; safety, care, time, and obligation braces are visible;
the open material field remains unassigned.  
**Proof:** the adult frame can be clear without producing a child outcome.

### VS-03 — `EXP-03` / Five honest modes

**Register:** Living Fold-Out Atlas.  
**Editorial job:** distinguish direct instruction, boundary with choice,
genuine invitation, co-exploring, and witnessing.  
**Scene:** one sentence sits on a central strip. Five folds expose what is
required, what is open, whether `no` can survive, and the behavior needed to
honor the chosen mode.  
**Interaction:** visitor writes or uses a fictional sentence, chooses a mode,
rewrites, and may discard. No mode is visually higher.  
**Proof:** the result matches the Atlas contract and remains usable by keyboard,
touch, reduced motion, and static HTML.

The five mechanisms remain visibly equal:

| Mode | Paper behavior | What stays honest |
|---|---|---|
| **Direct instruction** | one clear guide with a fixed required result | adult authority and reason are named directly |
| **Boundary with choice** | stable frame containing several permitted folds | the frame is fixed; the method or form is truly open |
| **Genuine invitation** | an open panel with an equally visible exit | `no` survives without hidden punishment |
| **Co-exploring** | two independently movable forms connected at one working edge | adult and child can both affect the inquiry without equalizing responsibility |
| **Witnessing** | supporting frame recedes while remaining available | the adult sees without taking over or disappearing |

### VS-04 — `EXP-08` / Meet what happened

**Register:** brief Night Paper Theatre returning to Quiet Paper Sky.  
**Editorial job:** distinguish intended result from observed effect and choose
learning, privacy, repair, revision, or ending.  
**Scene:** the rewritten sentence crosses a cut-paper threshold; a response may
return, remain silent, or reveal an obligation.  
**Interaction:** visitor records only what can be observed and may choose “not
used yet.”  
**Proof:** Return does not require compliance, gratitude, publication, or a
positive family outcome.

### VS-05 — `EXP-09` / Ground Landing

**Register:** Quiet Paper Sky.  
**Editorial job:** close, pause, rest, repair, ask for help, or leave without a
new productivity debt.  
**Scene:** all active planes settle into one broad page; an optional landing
note may be folded into the visitor’s own artifact.  
**Interaction:** copy, print, export, discard, or exit; no retained history and
no automatic next experience.  
**Proof:** the journey feels complete even when the chosen state is no action.

### 13.1. Vertical-slice states

The slice must cover:

- first visit and reading-only route;
- blank or fictional parent sentence;
- direct instruction as an honest valid mode;
- genuine invitation with a real `no`;
- uncertain mode;
- refusal and exit;
- insufficient Lift;
- no Return yet;
- observed harm or repair obligation;
- interruption/error with truthful retention statement;
- completion through copy, export, discard, or immediate exit;
- reduced-motion and static rendering.

### 13.2. Visual asset package for the slice

The prototype brief should request real assets for:

- one master open-book object with measured desktop and mobile compositions;
- map, Ground, sky, and three doorway layer groups;
- adult-held worktable and support layer group;
- five distinct but equal mode folds;
- visitor sentence strip and neutral fictional example;
- Night threshold, response, silence, and repair pieces;
- Ground Landing surface, brace, closed tab, and optional note;
- calibrated shadow/mask assets for each fold state;
- final settled images for reduced motion and fallback;
- conventional interface icons from a consistent accessible icon library;
- no audio in the first slice unless separately approved after the silent
  version works.

### 13.3. Explicitly outside the first slice

- the complete twelve-article Manifesto experience;
- Adult and AI interactive paths;
- all ten guided experiences;
- live AI or generated responses;
- accounts, saved history, analytics, community, sharing, or personalization;
- production CMS, localization system, public deployment, domain work, and
  monetization;
- visual effects without a named semantic job.

### 13.4. Evidence required before implementation handoff

The no-code vertical-slice package is complete when it contains:

1. one route map for `VS-01…VS-05`;
2. three key compositions per scene—opening, transformation, and settled—for
   a total of fifteen keyframes;
3. one comparative sheet proving that the five `EXP-03` modes have equal
   visual status;
4. a state table covering every case in §13.1;
5. desktop, tablet, mobile, reduced-motion, and static reading compositions;
6. a copy deck mapped to `PAGE-01`, `PAGE-03`, `EXP-03`, `EXP-08`, and
   `EXP-09`;
7. an asset manifest identifying every real layer, mask, shadow, crop, settled
   image, and ownership/licensing requirement;
8. a short risk review showing how the slice avoids child representation,
   parent scoring, forced choice, saved history, and automatic continuation.

---

## 14. Expansion sequence

All three visual concepts remain part of the product. They are expanded in a
controlled sequence rather than built as three separate sites.

1. **Vertical slice:** prove one complete journey and all three registers.
2. **Manifesto spine:** produce and validate `SCENE-M01…SCENE-M12` as the
   central digital book.
3. **Parent path:** expand the shared worktable, household scenes, `EXP-01`,
   and descriptive `EXP-07`.
4. **Adult path:** expand the inherited Atlas, `EXP-02`, `EXP-06`, and
   descriptive `EXP-04` / `EXP-10`.
5. **AI path:** expand Wind roles, drift, adoption, no-AI mode, and `EXP-05`.
6. **Atlas and Source:** complete all experience entries, genealogy, archival
   spread, and known source-gap treatment.
7. **Whole-site coherence pass:** verify register transitions, content access,
   performance, reduced motion, source boundary, and dignified exits.

No later stage is unlocked by user completion. This is production sequencing,
not a visitor curriculum.

---

## 15. Scene acceptance criteria

A scene is ready to enter prototyping only when:

1. it names one article, page, or experience job;
2. its dominant object and transformation express that job without narration;
3. its complete copy exists as real text outside the illustration;
4. its opening and settled states both make sense as static compositions;
5. scroll and direct manipulation are optional paths to understanding;
6. reduced-motion, mobile, keyboard, touch, and reading-order behavior are
   specified;
7. the visitor may skip or leave without shame or loss threat;
8. no light, height, speed, complexity, or completion state measures worth;
9. no child, parent, adult, or AI role violates the governing foundations;
10. the scene creates no score, profile, diagnosis, saved reflection history,
    mandatory belief, or hidden recommendation;
11. a Return or Ground state exists where the scene invites action;
12. the production cost is justified by improved comprehension or felt meaning,
    not novelty alone.

The whole system is coherent only when:

- all three registers are recognisable as states of one book;
- page transitions preserve material and editorial continuity;
- the first useful text does not wait for advanced rendering;
- the full site remains meaningful with motion disabled;
- visual richness does not turn the philosophy into an exclusive luxury,
  spiritual spectacle, or technical demo.

---

## 16. Open design decisions

These choices belong to visual prototyping and are intentionally not closed
here:

1. exact typefaces and language-specific typography;
2. final palette values, paper scans, ink behavior, and production technique;
3. how to preserve the recurring book's continuity across separate raster
   artboards without making every chapter composition identical;
4. how many desktop planes survive on mid-range mobile hardware;
5. whether any sound adds meaning after the silent experience is complete;
6. whether the implemented `480svh` Home / approximately `320vh` chapter holds
   need shorter portrait variants after browser QA;
7. whether the Russian Memorandum becomes a public parallel edition;
8. asset-production workflow for separated folds, masks, shadows, and fallback
   renders;
9. prototype performance budgets after representative assets are measured;
10. user-comprehension criteria for deciding whether a scene earns its motion.

No open item permits invention of a child profile, scoring, compulsory motion,
live AI, saved reflective history, domain action, publication, or a scientific
claim.

---

## 17. Handoff to the next stage

The original no-code vertical-slice package was an intermediate planning
artifact and was intentionally not migrated. Its useful decisions are carried
forward by the current implementation, `AGENTS.md`, the approved master, and
the scene specifications kept in this repository.

The separately authorized implementation prototype now exists in
the [repository root](../../README.md), with its current
architecture recorded in
[`../product/PARALLAX_ATLAS_IMPLEMENTATION_PLAN.md`](../product/PARALLAX_ATLAS_IMPLEMENTATION_PLAN.md).
The remaining stage is rendered-browser iteration and acceptance: same-state
reference comparison, responsive captures, forward/reverse scroll, input,
reduced motion, poster fallback, keyboard order, focus, and console review.

The original no-code package did not authorize implementation by itself; that
authorization was supplied separately. Nothing here authorizes deployment,
domain registration, analytics, persistence, accounts, live AI, or public
release.
