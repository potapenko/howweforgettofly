import type { Locale } from "../i18n/LocaleContext";
import type { MechanismId } from "../types";
import type { RasterLayer, RasterStory, StoryLayerState } from "./types";
import { expansionStoryBeatCopyRu } from "./storyCopy.ru";

type BeatTuple = readonly [
  offset: number,
  slug: string,
  label: string,
  narration: string,
  x: number,
  y: number,
  scale: number,
  rotate: number,
];

const pose = (
  x = 0,
  y = 0,
  scale = 1,
  rotate = 0,
  opacity = 1,
): StoryLayerState => ({
  // Registry authors work in artboard pixels; the runtime consumes stage %.
  x: Number((x / 16.72).toFixed(4)),
  y: Number((y / 9.41).toFixed(4)),
  scale,
  rotate,
  opacity,
});

/** Every chapter ships as a complete poster plus a clean paper ground and two
 * transparent, scene-faithful ImageGen planes. Motion stays deliberately
 * small so regenerated edges continue to sit naturally on their background. */
function posterStory(
  mechanism: MechanismId,
  poster: string,
  ariaLabel: string,
  depth: number,
  beats: readonly BeatTuple[],
): RasterStory {
  const sceneCode = poster.match(/\/(M\d{2})\.webp$/)?.[1];
  if (!sceneCode) {
    throw new Error(`Chapter story ${mechanism} needs an Mxx poster path.`);
  }
  const backgroundId = `${mechanism}-background`;
  const primaryId = `${mechanism}-primary`;
  const secondaryId = `${mechanism}-secondary`;

  return {
    mechanism,
    poster,
    posterMobileSrc: `/scenes/${sceneCode}-960.webp`,
    posterSrcSet: `/scenes/${sceneCode}-960.webp 960w, ${poster} 1672w`,
    posterSizes: responsiveStageSizes,
    ariaLabel,
    aspectRatio: 1672 / 941,
    scrollLengthVh: 320,
    layers: [
      {
        id: backgroundId,
        src: `/parallax/${sceneCode}/background.png`,
        mobileSrc: `/parallax/${sceneCode}/background-960.webp`,
        depth: 0.08,
        pointerStrength: 0.8,
        fit: "contain",
        className: `story-layer story-layer--${mechanism} story-layer--background`,
      },
      {
        id: primaryId,
        src: `/parallax/${sceneCode}/primary.png`,
        mobileSrc: `/parallax/${sceneCode}/primary-960.webp`,
        depth: Math.min(0.82, 0.48 + depth * 0.42),
        pointerStrength: 2.5 + depth * 3,
        fit: "contain",
        className: `story-layer story-layer--${mechanism} story-layer--primary`,
      },
      {
        id: secondaryId,
        src: `/parallax/${sceneCode}/secondary.png`,
        mobileSrc: `/parallax/${sceneCode}/secondary-960.webp`,
        depth: Math.min(1, 0.72 + depth * 0.36),
        pointerStrength: 4 + depth * 4,
        fit: "contain",
        className: `story-layer story-layer--${mechanism} story-layer--secondary`,
      },
    ],
    beats: beats.map(
      ([offset, slug, label, narration, x, y, scale, rotate]) => ({
        id: `${mechanism}-${slug}`,
        offset,
        label,
        narration,
        layers: {
          [backgroundId]: pose(
            x * 0.08,
            y * 0.08,
            1 + (scale - 1) * 0.08,
            rotate * 0.06,
          ),
          [primaryId]: pose(x, y, scale, rotate),
          [secondaryId]: pose(
            -x * 0.72,
            y * 0.65,
            1 + (scale - 1) * 0.62,
            -rotate * 0.72,
          ),
        },
      }),
    ),
  };
}

const responsiveStageSizes =
  "(max-width: 820px) 100vw, (max-aspect-ratio: 1 / 1) 138svh, 100vw";

function authoredLayer(
  sceneCode: "AI03" | "AI04" | "P01" | "A01" | "ATLAS01" | "FINAL01",
  mechanism: MechanismId,
  name: "background" | "primary" | "secondary" | "atmosphere",
  depth: number,
  pointerStrength: number,
): RasterLayer {
  return {
    id: `${mechanism}-${name}`,
    src: `/parallax/${sceneCode}/${name}.webp`,
    mobileSrc: `/parallax/${sceneCode}/${name}-960.webp`,
    srcSet:
      `/parallax/${sceneCode}/${name}-960.webp 960w, ` +
      `/parallax/${sceneCode}/${name}.webp 1672w`,
    sizes: responsiveStageSizes,
    depth,
    pointerStrength,
    fit: "contain",
    className: `story-layer story-layer--${mechanism} story-layer--${name}`,
  };
}

/**
 * AI-02 is a purpose-authored scene pack rather than an alias for one of the
 * original M01-M12 chapters. Its complete poster and all three planes share
 * the same artboard, so Safari can move between fallback and live layers
 * without changing the composition or crop.
 */
const adoptionFolds: RasterStory = {
  mechanism: "adoption-folds",
  editorialCopyLayout: "sky-left",
  poster: "/scenes/AI02.webp",
  posterMobileSrc: "/scenes/AI02-960.webp",
  posterSrcSet: "/scenes/AI02-960.webp 960w, /scenes/AI02.webp 1672w",
  posterSizes: responsiveStageSizes,
  ariaLabel:
    "An open pop-up book receives several wind-carried paper forms. Four equal folds remain available while human hands deliberately change one form.",
  aspectRatio: 1672 / 941,
  // Five beats over the upper edge of the plan's 220-260vh internal hold.
  scrollLengthVh: 260,
  scrollParallaxStrength: 1.25,
  pointerParallaxStrength: 1.2,
  inlineProgress: 0.72,
  beatTranslations: { ru: expansionStoryBeatCopyRu["adoption-folds"] },
  layers: [
    {
      id: "adoption-folds-background",
      src: "/parallax/AI02/background.webp",
      mobileSrc: "/parallax/AI02/background-960.webp",
      srcSet:
        "/parallax/AI02/background-960.webp 960w, /parallax/AI02/background.webp 1672w",
      sizes: responsiveStageSizes,
      depth: 0.05,
      pointerStrength: 0.6,
      fit: "contain",
      className:
        "story-layer story-layer--adoption-folds story-layer--background",
    },
    {
      id: "adoption-folds-secondary",
      src: "/parallax/AI02/secondary.webp",
      mobileSrc: "/parallax/AI02/secondary-960.webp",
      srcSet:
        "/parallax/AI02/secondary-960.webp 960w, /parallax/AI02/secondary.webp 1672w",
      sizes: responsiveStageSizes,
      depth: 0.94,
      pointerStrength: 8.4,
      fit: "contain",
      className:
        "story-layer story-layer--adoption-folds story-layer--secondary",
    },
    {
      id: "adoption-folds-primary",
      src: "/parallax/AI02/primary.webp",
      mobileSrc: "/parallax/AI02/primary-960.webp",
      srcSet:
        "/parallax/AI02/primary-960.webp 960w, /parallax/AI02/primary.webp 1672w",
      sizes: responsiveStageSizes,
      depth: 0.76,
      pointerStrength: 6.2,
      fit: "contain",
      className:
        "story-layer story-layer--adoption-folds story-layer--primary",
    },
  ],
  beats: [
    {
      id: "adoption-folds-note-waits",
      offset: 0,
      label: "A place waits",
      narration: "A question and an empty place wait before the Wind arrives.",
      layers: {
        "adoption-folds-background": pose(),
        // Beat zero is the exact complete poster pose. The poster/layer
        // handoff can therefore be atomic without inventing or losing paper.
        "adoption-folds-primary": pose(),
        "adoption-folds-secondary": pose(),
      },
    },
    {
      id: "adoption-folds-forms-arrive",
      offset: 0.22,
      label: "Forms arrive",
      narration: "Fluency brings material, not a decision.",
      layers: {
        "adoption-folds-background": pose(-1, 0, 1.001, 0),
        // The wind-carried forms move first; the hands keep their resting pose.
        "adoption-folds-primary": pose(),
        "adoption-folds-secondary": pose(-24, -10, 0.998, -0.2),
      },
    },
    {
      id: "adoption-folds-four-folds-open",
      offset: 0.46,
      label: "Four folds remain equal",
      narration: "Accept, change, reject, and verify remain human gestures.",
      layers: {
        "adoption-folds-background": pose(1, -1, 1.003, 0.02),
        // The hands follow only after the candidate forms have crossed.
        "adoption-folds-primary": pose(0, 32, 0.985, -0.8),
        "adoption-folds-secondary": pose(-24, -10, 0.998, -0.2),
      },
    },
    {
      id: "adoption-folds-one-form-changes",
      offset: 0.72,
      label: "One form changes",
      narration: "One form changes because someone chooses to work through it.",
      layers: {
        "adoption-folds-background": pose(-1, 0, 1.002, -0.02),
        "adoption-folds-primary": pose(0, 32, 0.985, -0.8),
        "adoption-folds-secondary": pose(-3, -2, 1.004, -0.08),
      },
    },
    {
      id: "adoption-folds-candidates-land",
      offset: 1,
      label: "Candidates, not commands",
      narration: "The candidates settle. Responsibility does not move with the Wind.",
      layers: {
        "adoption-folds-background": pose(),
        "adoption-folds-primary": pose(),
        "adoption-folds-secondary": pose(),
      },
    },
  ],
};

const candidateMap: RasterStory = {
  mechanism: "candidate-map",
  editorialCopyLayout: "paper-left",
  poster: "/scenes/AI03.webp",
  posterMobileSrc: "/scenes/AI03-960.webp",
  posterSrcSet: "/scenes/AI03-960.webp 960w, /scenes/AI03.webp 1672w",
  posterSizes: responsiveStageSizes,
  ariaLabel:
    "A polished paper route expands into a wall and attracts an avalanche of alternatives, then folds down into one candidate map beside equally visible quiet and no-action paths.",
  aspectRatio: 1672 / 941,
  scrollLengthVh: 260,
  scrollParallaxStrength: 1.25,
  pointerParallaxStrength: 1.2,
  inlineProgress: 1,
  beatTranslations: { ru: expansionStoryBeatCopyRu["candidate-map"] },
  // Wind and alternatives remain behind the hinged polished candidate.
  layers: [
    authoredLayer("AI03", "candidate-map", "background", 0.04, 0.5),
    authoredLayer("AI03", "candidate-map", "atmosphere", 0.42, 4.2),
    authoredLayer("AI03", "candidate-map", "secondary", 0.7, 6.5),
    authoredLayer("AI03", "candidate-map", "primary", 0.9, 8.2),
  ],
  beats: [
    {
      id: "candidate-map-candidate-appears",
      offset: 0,
      label: "A candidate appears",
      narration: "One route arrives as a possibility while Ground and the horizon remain wide.",
      layers: {
        "candidate-map-background": pose(),
        "candidate-map-atmosphere": pose(),
        "candidate-map-secondary": pose(),
        "candidate-map-primary": pose(),
      },
    },
    {
      id: "candidate-map-map-fills-sky",
      offset: 0.2,
      label: "The map fills the Sky",
      narration: "Polish can make one useful candidate feel like the whole visible horizon.",
      layers: {
        "candidate-map-background": pose(0, 2, 1.002),
        "candidate-map-atmosphere": pose(),
        "candidate-map-secondary": pose(),
        // The hinged candidate rises before wind or alternative routes move.
        "candidate-map-primary": pose(2, -16, 1.13, -0.45),
      },
    },
    {
      id: "candidate-map-avalanche-gathers",
      offset: 0.45,
      label: "An avalanche gathers",
      narration: "More generated routes can arrive while the human choice remains untouched.",
      layers: {
        "candidate-map-background": pose(-1, 1, 1.003),
        // Wind follows the raised map; neighboring routes still wait.
        "candidate-map-atmosphere": pose(12, -12, 1.008, 0.18),
        "candidate-map-secondary": pose(),
        "candidate-map-primary": pose(2, -16, 1.13, -0.45),
      },
    },
    {
      id: "candidate-map-scale-returns",
      offset: 0.72,
      label: "Scale returns",
      narration: "Compass restores proportion; it does not calculate a person's destiny.",
      layers: {
        "candidate-map-background": pose(1, 0, 1.002),
        "candidate-map-atmosphere": pose(12, -12, 1.008, 0.18),
        // The neighboring routes move on their own beat rather than
        // materialising with the wind.
        "candidate-map-secondary": pose(4, 1, 1.008, 0.08),
        "candidate-map-primary": pose(2, -16, 1.13, -0.45),
      },
    },
    {
      id: "candidate-map-map-among-maps",
      offset: 1,
      label: "A map among maps",
      narration: "The map remains useful as one candidate, and the horizon returns to view.",
      layers: {
        "candidate-map-background": pose(),
        "candidate-map-atmosphere": pose(),
        "candidate-map-secondary": pose(),
        "candidate-map-primary": pose(),
      },
    },
  ],
};

const returnThreshold: RasterStory = {
  mechanism: "return-threshold",
  editorialCopyLayout: "vellum-left",
  poster: "/scenes/AI04.webp",
  posterMobileSrc: "/scenes/AI04-960.webp",
  posterSrcSet: "/scenes/AI04-960.webp 960w, /scenes/AI04.webp 1672w",
  posterSizes: responsiveStageSizes,
  ariaLabel:
    "A paper form leaves a consequence-free simulation, meets a small real condition, and returns visibly changed while the human-held landing area remains open to revision, repair, privacy, or stopping.",
  aspectRatio: 1672 / 941,
  scrollLengthVh: 260,
  scrollParallaxStrength: 1.25,
  pointerParallaxStrength: 1.2,
  inlineProgress: 1,
  beatTranslations: { ru: expansionStoryBeatCopyRu["return-threshold"] },
  layers: [
    authoredLayer("AI04", "return-threshold", "background", 0.04, 0.5),
    authoredLayer("AI04", "return-threshold", "primary", 0.64, 5.8),
    authoredLayer("AI04", "return-threshold", "secondary", 0.9, 8.2),
  ],
  beats: [
    {
      id: "return-threshold-rehearsal-appears",
      offset: 0,
      label: "A rehearsal appears",
      narration: "A plausible audience appears behind a screen without consequence or consent.",
      layers: {
        "return-threshold-background": pose(),
        "return-threshold-primary": pose(),
        "return-threshold-secondary": pose(),
      },
    },
    {
      id: "return-threshold-smooth-response",
      offset: 0.22,
      label: "The response stays smooth",
      narration: "Rehearsal may prepare, but it cannot consent or answer for reality.",
      layers: {
        "return-threshold-background": pose(0, 1, 1.001),
        // The rehearsal screen flexes first; the paper form stays put.
        "return-threshold-primary": pose(-6, -5, 1.015, 0.08),
        "return-threshold-secondary": pose(),
      },
    },
    {
      id: "return-threshold-threshold-opens",
      offset: 0.46,
      label: "A threshold opens",
      narration: "A person chooses what kind of reality this form is ready to meet.",
      layers: {
        "return-threshold-background": pose(-1, 0, 1.004),
        "return-threshold-primary": pose(-6, -5, 1.015, 0.08),
        // Only after the screen moves does the form approach the threshold.
        "return-threshold-secondary": pose(24, -2, 0.995, -0.08),
      },
    },
    {
      id: "return-threshold-form-meets-world",
      offset: 0.72,
      label: "The form meets the world",
      narration: "Contact leaves a material trace that fluent rehearsal could not supply.",
      layers: {
        "return-threshold-background": pose(1, 0, 1.002),
        "return-threshold-primary": pose(-6, -5, 1.015, 0.08),
        "return-threshold-secondary": pose(-4, -4, 1.012, 0.16),
      },
    },
    {
      id: "return-threshold-return-is-held",
      offset: 1,
      label: "Return is held",
      narration: "Return can become revision, repair, privacy, or an honest ending.",
      layers: {
        "return-threshold-background": pose(),
        "return-threshold-primary": pose(),
        "return-threshold-secondary": pose(),
      },
    },
  ],
};

const honestModeRail: RasterStory = {
  mechanism: "honest-mode-rail",
  editorialCopyLayout: "sky-left",
  poster: "/scenes/P01.webp",
  posterMobileSrc: "/scenes/P01-960.webp",
  posterSrcSet: "/scenes/P01-960.webp 960w, /scenes/P01.webp 1672w",
  posterSizes: responsiveStageSizes,
  ariaLabel:
    "A blank sentence reveals whether it is carried by a fixed instruction, a boundary with workable choice, or an invitation whose refusal remains fully open. None is ranked.",
  aspectRatio: 1672 / 941,
  scrollLengthVh: 260,
  scrollParallaxStrength: 1.25,
  pointerParallaxStrength: 1.2,
  inlineProgress: 1,
  beatTranslations: { ru: expansionStoryBeatCopyRu["honest-mode-rail"] },
  layers: [
    authoredLayer("P01", "honest-mode-rail", "background", 0.04, 0.5),
    authoredLayer("P01", "honest-mode-rail", "secondary", 0.9, 8.2),
    authoredLayer("P01", "honest-mode-rail", "primary", 0.66, 6),
  ],
  beats: [
    {
      id: "honest-mode-rail-gentle-surface",
      offset: 0,
      label: "A gentle surface",
      narration: "The words sound open while the structure of the choice remains concealed.",
      layers: {
        "honest-mode-rail-background": pose(),
        "honest-mode-rail-primary": pose(),
        "honest-mode-rail-secondary": pose(),
      },
    },
    {
      id: "honest-mode-rail-rail-revealed",
      offset: 0.22,
      label: "The rail is revealed",
      narration: "A question can still carry only one answer that is allowed to survive.",
      layers: {
        "honest-mode-rail-background": pose(0, 1, 1.002),
        // The rail turns before the three landscapes shift.
        "honest-mode-rail-primary": pose(0, -6, 1.012, -0.35),
        "honest-mode-rail-secondary": pose(),
      },
    },
    {
      id: "honest-mode-rail-modes-separate",
      offset: 0.46,
      label: "The modes separate",
      narration: "A mode becomes honest when its physical limits become visible.",
      layers: {
        "honest-mode-rail-background": pose(-1, 0, 1.003),
        "honest-mode-rail-primary": pose(0, -6, 1.012, -0.35),
        "honest-mode-rail-secondary": pose(0, 1, 1.012, -0.08),
      },
    },
    {
      id: "honest-mode-rail-exit-opens",
      offset: 0.72,
      label: "The exit opens",
      narration: "Instruction, boundary, and invitation reveal the different work they do.",
      layers: {
        "honest-mode-rail-background": pose(1, 0, 1.001),
        "honest-mode-rail-primary": pose(0, -6, 1.012, -0.35),
        "honest-mode-rail-secondary": pose(0, -4, 1.014, 0.12),
      },
    },
    {
      id: "honest-mode-rail-all-modes-land",
      offset: 1,
      label: "All modes land",
      narration: "No gentle wording has to imitate a choice that is not actually there.",
      layers: {
        "honest-mode-rail-background": pose(),
        "honest-mode-rail-primary": pose(),
        "honest-mode-rail-secondary": pose(),
      },
    },
  ],
};

const groundOrGravity: RasterStory = {
  mechanism: "ground-or-gravity",
  editorialCopyLayout: "sky-left",
  editorialCopyLayerId: "ground-or-gravity-primary",
  poster: "/scenes/A01.webp",
  posterMobileSrc: "/scenes/A01-960.webp",
  posterSrcSet: "/scenes/A01-960.webp 960w, /scenes/A01.webp 1672w",
  posterSizes: responsiveStageSizes,
  ariaLabel:
    "A supported paper landscape remains intact as translucent inherited labels are removed. A small reversible fold may open, close, or wait beside a genuinely locked door that is not treated as personal failure.",
  aspectRatio: 1672 / 941,
  scrollLengthVh: 260,
  scrollParallaxStrength: 1.25,
  pointerParallaxStrength: 1.2,
  inlineProgress: 0.72,
  beatTranslations: { ru: expansionStoryBeatCopyRu["ground-or-gravity"] },
  layers: [
    authoredLayer("A01", "ground-or-gravity", "background", 0.04, 0.5),
    authoredLayer("A01", "ground-or-gravity", "primary", 0.66, 6),
    authoredLayer("A01", "ground-or-gravity", "secondary", 0.9, 8.2),
  ],
  beats: [
    {
      id: "ground-or-gravity-supports-visible",
      offset: 0,
      label: "The supports are visible",
      narration: "Ground is already carrying an ordinary life through limits, care, craft, and rest.",
      layers: {
        "ground-or-gravity-background": pose(),
        "ground-or-gravity-primary": pose(),
        "ground-or-gravity-secondary": pose(),
      },
    },
    {
      id: "ground-or-gravity-labels-descend",
      offset: 0.22,
      label: "The labels descend",
      narration: "A real condition can be mistaken for a complete verdict about a life.",
      layers: {
        "ground-or-gravity-background": pose(0, 1, 1.001),
        // The hanging labels move before the smaller fold and brace.
        "ground-or-gravity-primary": pose(0, -8, 1.008, -0.08),
        "ground-or-gravity-secondary": pose(),
      },
    },
    {
      id: "ground-or-gravity-track-hardens",
      offset: 0.46,
      label: "The track hardens",
      narration: "An inherited and unexamined route begins to look like destiny.",
      layers: {
        "ground-or-gravity-background": pose(-1, 0, 1.003),
        "ground-or-gravity-primary": pose(0, -8, 1.008, -0.08),
        "ground-or-gravity-secondary": pose(7, 4, 0.995, 0),
      },
    },
    {
      id: "ground-or-gravity-labels-lift",
      offset: 0.72,
      label: "The labels lift",
      narration: "Remove the verdict while keeping the care, craft, limit, and rest.",
      layers: {
        "ground-or-gravity-background": pose(1, 0, 1.002),
        "ground-or-gravity-primary": pose(0, -26, 0.996, -0.14),
        "ground-or-gravity-secondary": pose(7, 4, 0.995, 0),
      },
    },
    {
      id: "ground-or-gravity-small-fold-waits",
      offset: 1,
      label: "A small fold waits",
      narration: "A modest opening may open, close, wait, or need company and support.",
      layers: {
        "ground-or-gravity-background": pose(),
        "ground-or-gravity-primary": pose(),
        "ground-or-gravity-secondary": pose(),
      },
    },
  ],
};

/**
 * The Atlas is one continuous reading field, not a quiz or a route picker.
 * Pointer depth therefore moves the complete accordion and all ten lenses as
 * groups: no individual window can become selected, enlarged, or persistent.
 */
const equalLenses: RasterStory = {
  mechanism: "equal-lenses",
  editorialCopyLayout: "paper-left",
  editorialNarrationLayout: "card",
  poster: "/scenes/ATLAS01.webp",
  posterMobileSrc: "/scenes/ATLAS01-960.webp",
  posterSrcSet:
    "/scenes/ATLAS01-960.webp 960w, /scenes/ATLAS01.webp 1672w",
  posterSizes: responsiveStageSizes,
  ariaLabel:
    "One continuous paper sheet unfolds into ten equally weighted windows. None is higher, brighter, preselected, locked, or connected to a progress path.",
  aspectRatio: 1672 / 941,
  scrollLengthVh: 260,
  scrollParallaxStrength: 1.25,
  pointerParallaxStrength: 1.2,
  inlineProgress: 0.72,
  beatTranslations: { ru: expansionStoryBeatCopyRu["equal-lenses"] },
  layers: [
    authoredLayer("ATLAS01", "equal-lenses", "background", 0.04, 0.5),
    authoredLayer("ATLAS01", "equal-lenses", "primary", 0.66, 6),
    authoredLayer("ATLAS01", "equal-lenses", "secondary", 0.9, 8.2),
  ],
  beats: [
    {
      id: "equal-lenses-one-sheet-rests",
      offset: 0,
      label: "One sheet rests",
      narration: "The Atlas begins as one page, not a diagnosis.",
      layers: {
        "equal-lenses-background": pose(),
        "equal-lenses-primary": pose(),
        "equal-lenses-secondary": pose(),
      },
    },
    {
      id: "equal-lenses-first-fold-opens",
      offset: 0.22,
      label: "The first fold opens",
      narration: "The first visible question is not the first required step.",
      layers: {
        "equal-lenses-background": pose(0, 1, 1.001),
        // The connected frame hinges before its inserts flex.
        "equal-lenses-primary": pose(-8, 40, 0.975, -0.12),
        "equal-lenses-secondary": pose(),
      },
    },
    {
      id: "equal-lenses-windows-multiply",
      offset: 0.46,
      label: "The windows multiply",
      narration: "One page makes room for several ways of seeing.",
      layers: {
        "equal-lenses-background": pose(-1, 0, 1.003),
        "equal-lenses-primary": pose(-8, 40, 0.975, -0.12),
        "equal-lenses-secondary": pose(3, 9, 1.012, 0.08),
      },
    },
    {
      id: "equal-lenses-weight-equalises",
      offset: 0.72,
      label: "The weight equalises",
      narration: "No doorway is a rank or recommendation.",
      layers: {
        "equal-lenses-background": pose(1, 0, 1.001),
        "equal-lenses-primary": pose(-1, 0, 1.002, -0.02),
        "equal-lenses-secondary": pose(3, 9, 1.012, 0.08),
      },
    },
    {
      id: "equal-lenses-atlas-remains-open",
      offset: 1,
      label: "The Atlas remains open",
      narration: "Choose a question, leave all ten, or continue.",
      layers: {
        "equal-lenses-background": pose(),
        "equal-lenses-primary": pose(),
        "equal-lenses-secondary": pose(),
      },
    },
  ],
};

const openHorizon: RasterStory = {
  mechanism: "open-horizon",
  editorialCopyLayout: "horizon-left",
  poster: "/scenes/FINAL01.webp",
  posterMobileSrc: "/scenes/FINAL01-960.webp",
  posterSrcSet:
    "/scenes/FINAL01-960.webp 960w, /scenes/FINAL01.webp 1672w",
  posterSizes: responsiveStageSizes,
  ariaLabel:
    "An open paper book unfolds into a wide bright horizon. Flying, sailing, resting, returning, remaining blank, and staying on Ground share the scene without hierarchy.",
  aspectRatio: 1672 / 941,
  scrollLengthVh: 380,
  scrollParallaxStrength: 1.25,
  pointerParallaxStrength: 1.2,
  inlineProgress: 0.72,
  beatTranslations: { ru: expansionStoryBeatCopyRu["open-horizon"] },
  // The landscape leaves sit beneath the Wind; equal-state objects remain
  // the nearest and most legible plane in the final quiet composition.
  layers: [
    authoredLayer("FINAL01", "open-horizon", "background", 0.04, 0.4),
    authoredLayer("FINAL01", "open-horizon", "primary", 0.5, 4.2),
    authoredLayer("FINAL01", "open-horizon", "atmosphere", 0.72, 6.2),
    authoredLayer("FINAL01", "open-horizon", "secondary", 0.9, 7.8),
  ],
  beats: [
    {
      id: "open-horizon-binding-settles",
      offset: 0,
      label: "The binding settles",
      narration: "The last fold comes to rest without preparing a compulsory next chapter.",
      layers: {
        "open-horizon-background": pose(),
        "open-horizon-primary": pose(),
        "open-horizon-atmosphere": pose(),
        "open-horizon-secondary": pose(),
      },
    },
    {
      id: "open-horizon-wind-returns",
      offset: 0.22,
      label: "The Wind returns",
      narration: "The Wind crosses the page again without choosing or launching anyone.",
      layers: {
        "open-horizon-background": pose(0, 1, 1.001),
        "open-horizon-primary": pose(),
        // Wind moves first; the landscape and equal-state objects rest.
        "open-horizon-atmosphere": pose(-8, -3, 1.006, -0.06),
        "open-horizon-secondary": pose(),
      },
    },
    {
      id: "open-horizon-edges-open",
      offset: 0.46,
      label: "The edges open",
      narration: "The book widens beyond the rectangular edge of its final page.",
      layers: {
        "open-horizon-background": pose(-1, 0, 1.003),
        // The outer landscape leaves open only after the Wind has crossed.
        "open-horizon-primary": pose(0, 0, 1.014, 0),
        "open-horizon-atmosphere": pose(-8, -3, 1.006, -0.06),
        "open-horizon-secondary": pose(),
      },
    },
    {
      id: "open-horizon-many-states-remain",
      offset: 0.72,
      label: "Many states remain",
      narration: "Flight, Return, rest, and open possibility share one horizon without rank.",
      layers: {
        "open-horizon-background": pose(1, 0, 1.002),
        "open-horizon-primary": pose(0, 0, 1.014, 0),
        "open-horizon-atmosphere": pose(-8, -3, 1.006, -0.06),
        // Finally the plane, boat, kite, blank leaf, and resting forms move.
        "open-horizon-secondary": pose(0, -3, 1.01, -0.04),
      },
    },
    {
      id: "open-horizon-sky-is-here",
      offset: 1,
      label: "The Sky is still here",
      narration: "We have not forgotten how to fly. The Sky is still here.",
      layers: {
        "open-horizon-background": pose(),
        "open-horizon-primary": pose(),
        "open-horizon-atmosphere": pose(),
        "open-horizon-secondary": pose(),
      },
    },
  ],
};

const home: RasterStory = {
  mechanism: "map-sky",
  poster: "/scenes/master.webp",
  posterMobileSrc: "/scenes/master-960.webp",
  posterSrcSet: "/scenes/master-960.webp 960w, /scenes/master.webp 1672w",
  posterSizes: responsiveStageSizes,
  ariaLabel:
    "An open paper book becomes a bright landscape of wind, boats, aircraft, a kite, and a pinwheel.",
  aspectRatio: 1672 / 941,
  scrollLengthVh: 480,
  scrollParallaxStrength: 1.5,
  pointerParallaxStrength: 1.5,
  layers: [
    {
      id: "home-background",
      src: "/parallax/home/background-master.png",
      mobileSrc: "/parallax/home/background-master-960.webp",
      depth: 0,
      pointerStrength: 0,
      fit: "contain",
      className: "home-layer home-layer--background",
    },
    {
      id: "home-wind",
      src: "/parallax/home/wind.png",
      mobileSrc: "/parallax/home/wind-960.webp",
      depth: 0.35,
      pointerStrength: 3,
      fit: "contain",
      className: "home-layer home-layer--wind",
    },
    {
      id: "home-sky-objects",
      src: "/parallax/home/sky-objects.png",
      mobileSrc: "/parallax/home/sky-objects-960.webp",
      depth: 0.58,
      pointerStrength: 5,
      fit: "contain",
      className: "home-layer home-layer--sky-objects",
    },
    {
      id: "home-left-cloud",
      src: "/parallax/home/sky-objects.png",
      mobileSrc: "/parallax/home/sky-objects-960.webp",
      depth: 0.44,
      pointerStrength: 3.5,
      fit: "contain",
      className: "home-layer home-layer--left-cloud",
    },
    {
      id: "home-boat",
      src: "/parallax/home/boat.png",
      mobileSrc: "/parallax/home/boat-960.webp",
      depth: 0.78,
      pointerStrength: 7,
      fit: "contain",
      className: "home-layer home-layer--boat",
    },
    {
      id: "home-pinwheel",
      src: "/parallax/home/pinwheel.png",
      mobileSrc: "/parallax/home/pinwheel-960.webp",
      depth: 1,
      pointerStrength: 10,
      fit: "contain",
      className: "home-layer home-layer--pinwheel",
    },
    {
      id: "home-explorer",
      src: "/parallax/home/explorer.png",
      mobileSrc: "/parallax/home/explorer-960.webp",
      depth: 0.72,
      pointerStrength: 5,
      fit: "contain",
      className: "home-layer home-layer--explorer",
    },
    {
      id: "home-banner",
      src: "/parallax/home/banner.png",
      mobileSrc: "/parallax/home/banner-960.webp",
      depth: 0.64,
      pointerStrength: 4,
      fit: "contain",
      className: "home-layer home-layer--banner",
    },
  ],
  beats: [
    {
      id: "map-sky-book-arrives",
      offset: 0,
      label: "The book arrives",
      narration: "A complete paper world rests on the table before anything moves.",
      layers: {
        "home-background": pose(),
        "home-wind": pose(-18, 3, 0.992, -0.12, 0.88),
        "home-sky-objects": pose(0, 4, 0.99, 0, 0.92),
        "home-left-cloud": pose(110, -55, 0.78, -0.2, 0.96),
        "home-boat": pose(145, 35, 0.37, -1.2, 0.94),
        "home-pinwheel": pose(446, 152, 0.4, -7, 0.94),
        "home-explorer": pose(-152, 117, 0.3, 0, 1),
        "home-banner": pose(564, -8, 0.34, 0.8, 0.94),
      },
    },
    {
      id: "map-sky-first-breath",
      offset: 0.18,
      label: "The first breath",
      narration: "The wind ribbons loosen while the book and its printed ground stay still.",
      layers: {
        "home-background": pose(),
        "home-wind": pose(-5, -4, 1.002, -0.25),
        "home-sky-objects": pose(0, -9, 0.997, -0.2),
        "home-left-cloud": pose(107, -59, 0.783, -0.35),
        "home-boat": pose(145, 31, 0.37, -0.6),
        "home-pinwheel": pose(446, 152, 0.4, 5),
        "home-explorer": pose(-152, 115, 0.3, -0.5),
        "home-banner": pose(564, -10, 0.34, 0.3),
      },
    },
    {
      id: "map-sky-routes-rise",
      offset: 0.39,
      label: "Routes rise",
      narration: "Aircraft and kite discover different currents rather than one prescribed route.",
      layers: {
        "home-background": pose(),
        "home-wind": pose(14, -8, 1.008, 0.2),
        "home-sky-objects": pose(7, -17, 1.004, 0.3),
        "home-left-cloud": pose(112, -65, 0.786, 0.15),
        "home-boat": pose(150, 27, 0.372, 0.2),
        "home-pinwheel": pose(447, 150, 0.402, 19),
        "home-explorer": pose(-150, 112, 0.302, 0.8),
        "home-banner": pose(566, -14, 0.342, -0.5),
      },
    },
    {
      id: "map-sky-water-carries",
      offset: 0.61,
      label: "Water carries",
      narration: "A small sailboat answers the same wind without becoming an aeroplane.",
      layers: {
        "home-background": pose(),
        "home-wind": pose(20, -5, 1.01, 0.28),
        "home-sky-objects": pose(11, -21, 1.008, 0.45),
        "home-left-cloud": pose(116, -68, 0.789, 0.25),
        "home-boat": pose(162, 25, 0.376, -1.1),
        "home-pinwheel": pose(450, 148, 0.404, 36),
        "home-explorer": pose(-148, 111, 0.302, 0.2),
        "home-banner": pose(568, -11, 0.343, 0.8),
      },
    },
    {
      id: "map-sky-human-scale",
      offset: 0.82,
      label: "A human-sized choice",
      narration: "The pinwheel turns nearby: agency appears as a small response, not a heroic rank.",
      layers: {
        "home-background": pose(),
        "home-wind": pose(8, 1, 1.006, 0.1),
        "home-sky-objects": pose(6, -10, 1.005, 0.2),
        "home-left-cloud": pose(112, -61, 0.784, 0.05),
        "home-boat": pose(155, 31, 0.373, -0.2),
        "home-pinwheel": pose(448, 152, 0.402, 58),
        "home-explorer": pose(-151, 114, 0.301, -0.4),
        "home-banner": pose(566, -7, 0.341, 0.3),
      },
    },
    {
      id: "map-sky-open-question",
      offset: 1,
      label: "The question stays open",
      narration: "The moving scene settles and hands the visitor to the words beneath it.",
      layers: {
        "home-background": pose(),
        "home-wind": pose(),
        "home-sky-objects": pose(),
        "home-left-cloud": pose(110, -55, 0.78),
        "home-boat": pose(145, 35, 0.37),
        "home-pinwheel": pose(446, 152, 0.4, 72),
        "home-explorer": pose(-152, 117, 0.3),
        "home-banner": pose(564, -8, 0.34),
      },
    },
  ],
};

export const storyRegistry = {
  "map-sky": home,
  "metric-veil": posterStory(
    "metric-veil",
    "/scenes/M01.webp",
    "Different paper forms share one ground while a measuring veil folds away.",
    0.18,
    [
      [0, "shared-ground", "One shared ground", "Different forms arrive without a hierarchy.", 0, 0, 1, 0],
      [0.24, "veil-descends", "The metric descends", "A translucent comparison tries to turn difference into rank.", 0, 2, 1.008, 0.1],
      [0.5, "measures-visible", "Measures become visible", "Height, speed, visibility, and output reveal themselves as chosen measures.", -2, -1, 1.014, -0.1],
      [0.76, "veil-folds", "The veil folds away", "The comparison leaves; none of the forms loses dignity.", 2, 0, 1.008, 0.1],
      [1, "ground-remains", "The ground remains", "Equal worth is the stable surface beneath every outcome.", 0, 0, 1, 0],
    ],
  ),
  "question-fold": posterStory(
    "question-fold",
    "/scenes/M02.webp",
    "A small paper question unfolds into several equally valid responses.",
    0.32,
    [
      [0, "unfinished-mark", "An unfinished mark", "A possibility appears before it becomes anyone's assignment.", 0, 0, 1, 0],
      [0.22, "aperture-opens", "The aperture opens", "Attention gives the possible question room without demanding an answer.", 1, -2, 1.008, 0.15],
      [0.48, "responses-unfold", "Responses unfold", "Yes, no, not now, and differently receive equal space.", -2, -1, 1.015, -0.12],
      [0.74, "ownership-visible", "Ownership becomes visible", "The visitor can inspect whose question and whose consequence this is.", 2, 1, 1.009, 0.08],
      [1, "answer-unforced", "The answer stays unforced", "Authorship survives because every honest response remains possible.", 0, 0, 1, 0],
    ],
  ),
  "map-wall": posterStory(
    "map-wall",
    "/scenes/M03.webp",
    "A useful printed map rises into a wall and then returns beside an open sky.",
    0.38,
    [
      [0, "route-guides", "A route guides", "The printed map begins as a practical aid across the ground.", 0, 0, 1, 0],
      [0.23, "map-rises", "The map rises", "Guidance grows until it starts to hide everything beyond itself.", 0, -3, 1.01, 0.12],
      [0.49, "sky-occluded", "The sky disappears", "A useful route briefly presents itself as the whole world.", -2, -2, 1.018, -0.1],
      [0.75, "edge-revealed", "The edge is revealed", "Turning the surface exposes authorship, limits, and blind spots.", 3, 1, 1.009, 0.15],
      [1, "map-beside-sky", "Map beside sky", "The route stays available without replacing the open view.", 0, 0, 1, 0],
    ],
  ),
  "provisional-form": posterStory(
    "provisional-form",
    "/scenes/M04.webp",
    "A modest paper outline folds into a revisable form and meets one real surface.",
    0.44,
    [
      [0, "outline", "A right-sized outline", "The attempt starts small enough to remain revisable.", 0, 0, 1, 0],
      [0.2, "conditions", "Conditions appear", "Material, time, support, and limits become part of the form.", -1, -2, 1.008, -0.08],
      [0.45, "form-folds", "The form folds", "One possibility becomes concrete without becoming an identity.", 2, -2, 1.015, 0.14],
      [0.7, "contact", "Contact with reality", "The provisional form meets a fact, material, place, or person.", 3, 1, 1.011, -0.1],
      [1, "marked-return", "A marked return", "What happened comes back as information for revision or closure.", 0, 0, 1, 0],
    ],
  ),
  "ground-supports": posterStory(
    "ground-supports",
    "/scenes/M05.webp",
    "A paper structure reveals the braces, care, maintenance, and rest beneath it.",
    0.24,
    [
      [0, "finished-form", "The visible form", "The finished pop-up first appears to stand by itself.", 0, 0, 1, 0],
      [0.24, "supports-reveal", "Supports are revealed", "Braces, hinges, care, and maintenance come into view.", 0, -2, 1.009, 0.08],
      [0.49, "support-shifts", "One support shifts", "A changed condition has a consequence without becoming a collapse spectacle.", -3, 1, 1.014, -0.12],
      [0.75, "rest-surface", "A surface for rest", "The structure can become smaller or lie down without shame.", 2, 2, 1.007, 0.08],
      [1, "ground-holds", "Ground holds", "Care, limits, routine, help, and rest remain part of the journey.", 0, 0, 1, 0],
    ],
  ),
  compass: posterStory(
    "compass",
    "/scenes/M06.webp",
    "A hand-held paper compass turns above separate layers for consent, evidence, limits, people, and consequences.",
    0.52,
    [
      [0, "layers-present", "The layers are present", "Consent, evidence, limits, affected people, and consequences remain separate.", 0, 0, 1, 0],
      [0.23, "direction-tested", "A direction is tested", "The Compass turns toward a possibility without snapping to certainty.", 2, -2, 1.009, 0.2],
      [0.48, "limits-align", "Limits align", "A chosen direction is examined against boundaries and available facts.", -2, -1, 1.015, -0.2],
      [0.74, "people-return", "Other people return to view", "Freedom stays relational by including those who may be affected.", 2, 1, 1.009, 0.12],
      [1, "direction-revisable", "Direction remains revisable", "Judgment stays visible, human, and open to correction.", 0, 0, 1, 0],
    ],
  ),
  "keeper-table": posterStory(
    "keeper-table",
    "/scenes/M07.webp",
    "A shared paper worktable holds firm adult responsibilities around a genuinely open middle.",
    0.28,
    [
      [0, "shared-table", "A shared table", "Adult and child meet on connected ground with unequal responsibilities.", 0, 0, 1, 0],
      [0.22, "supports-rise", "Adult-held supports rise", "Safety, time, care, and honest limits stay visibly held.", 0, -2, 1.009, 0.08],
      [0.48, "expectation-lifts", "The expected result lifts", "A borrowed image of the correct outcome can be recognised and removed.", -2, -1, 1.014, -0.12],
      [0.74, "middle-opens", "The middle stays open", "Real choices remain open only where their answers can be honoured.", 2, 1, 1.009, 0.1],
      [1, "responsible-presence", "Responsible presence", "The adult stays present without manufacturing the child's form.", 0, 0, 1, 0],
    ],
  ),
  "living-map": posterStory(
    "living-map",
    "/scenes/M08.webp",
    "A worn map of present life remains intact while one reversible fold opens beside it.",
    0.36,
    [
      [0, "present-map", "The present map", "Obligations, relationships, routines, and skills remain readable.", 0, 0, 1, 0],
      [0.22, "unused-fold", "An unused fold", "One small possibility appears without condemning the existing life.", 1, -2, 1.009, 0.12],
      [0.47, "annotation-moves", "The annotation moves", "A borrowed route can be kept, adapted, questioned, or refused.", -3, -1, 1.014, -0.14],
      [0.73, "fold-waits", "The fold can wait", "Not now and nothing today remain complete answers.", 2, 1, 1.008, 0.08],
      [1, "map-intact", "The map remains intact", "Purpose can begin from the ordinary life already here.", 0, 0, 1, 0],
    ],
  ),
  wind: posterStory(
    "wind",
    "/scenes/M09.webp",
    "Translucent paper currents circulate around a human-written purpose and a held compass.",
    0.62,
    [
      [0, "human-card", "The human card", "Purpose and the decision AI must not take are named before movement begins.", 0, 0, 1, 0],
      [0.2, "role-named", "One role is named", "Mirror, generator, critic, craft aid, simulator, or no AI becomes explicit.", -2, -2, 1.01, -0.14],
      [0.44, "options-circulate", "Options circulate", "Wind increases speed and possibility without becoming the pilot.", 3, -2, 1.017, 0.2],
      [0.7, "pieces-reviewed", "Pieces are reviewed", "The human can accept, change, verify, reject, or stay uncertain.", -2, 1, 1.011, -0.1],
      [1, "control-returns", "Control returns", "The tool closes while adoption and responsibility stay human.", 0, 0, 1, 0],
    ],
  ),
  "adoption-folds": adoptionFolds,
  "candidate-map": candidateMap,
  "return-threshold": returnThreshold,
  "honest-mode-rail": honestModeRail,
  "ground-or-gravity": groundOrGravity,
  "return-tray": posterStory(
    "return-tray",
    "/scenes/M10.webp",
    "Changed paper pieces return from contact and settle into a quiet response tray.",
    0.48,
    [
      [0, "form-leaves", "The form leaves", "A made thing moves beyond its protected fold.", 0, 0, 1, 0],
      [0.22, "contact", "Contact happens", "Material, another person, silence, or surprise changes the form.", 2, -2, 1.01, 0.12],
      [0.47, "pieces-return", "Pieces answer back", "Learning, value, repair, privacy, or ending return as distinct pieces.", -3, -1, 1.016, -0.18],
      [0.73, "pockets", "Different landing pockets", "Response is observed without becoming an audience score.", 2, 1, 1.009, 0.1],
      [1, "arc-lands", "The arc lands", "Relationship completes the attempt and returns it to Ground.", 0, 0, 1, 0],
    ],
  ),
  "refusal-brace": posterStory(
    "refusal-brace",
    "/scenes/M11.webp",
    "A paper fold can continue, pause, change scale, accept support, or close completely.",
    0.3,
    [
      [0, "choice-named", "Choice is named", "Invitation and unavoidable duty separate before a response is asked for.", 0, 0, 1, 0],
      [0.22, "paths-visible", "Several paths stay visible", "No, not now, differently, and continue receive equal composition.", 1, -2, 1.009, 0.1],
      [0.47, "brace-arrives", "A brace can arrive", "Help adds support without taking authorship away.", -2, -1, 1.014, -0.12],
      [0.73, "tab-closes", "The tab may close", "Stopping halfway is allowed to resolve as a complete state.", 2, 1, 1.008, 0.08],
      [1, "still-complete", "Still and complete", "The scene settles without an onward arrow or moral demotion.", 0, 0, 1, 0],
    ],
  ),
  "open-binding": posterStory(
    "open-binding",
    "/scenes/M12.webp",
    "A visibly loose paper binding opens onto detachable labels, plain meanings, sources, blank sheets, and exits.",
    0.2,
    [
      [0, "book-opens", "The book opens", "The metaphor begins as an offered tool rather than a doctrine.", 0, 0, 1, 0],
      [0.22, "labels-detach", "Labels detach", "Every project term can be questioned, translated, revised, or retired.", 1, -2, 1.009, 0.1],
      [0.46, "plain-meaning", "Plain meaning returns", "Symbols sit beside ordinary language instead of replacing it.", -2, -1, 1.014, -0.1],
      [0.72, "sources-show", "Construction and sources show", "Provenance remains visible without becoming final authority.", 2, 1, 1.008, 0.08],
      [1, "exit-open", "The exit stays open", "The page remains useful only while the visitor remains free to leave.", 0, 0, 1, 0],
    ],
  ),
  "equal-lenses": equalLenses,
  "template-hinge": posterStory(
    "template-hinge",
    "/scenes/M03.webp",
    "A familiar paper panel stays present while one variable turns on a reversible hinge.",
    0.42,
    [
      [0, "original-visible", "The useful original", "A familiar template remains readable and reachable.", 0, 0, 1, 0],
      [0.22, "variable-chosen", "One variable is chosen", "Order, scale, material, audience, place, question, or finish becomes movable.", 1, -2, 1.009, 0.12],
      [0.47, "hinge-turns", "The hinge turns", "One deliberate change creates difference without romanticising rupture.", -2, -1, 1.016, -0.16],
      [0.73, "boundary-holds", "The boundary holds", "A brace and stop pin keep the experiment proportionate.", 2, 1, 1.009, 0.1],
      [1, "return-available", "Return remains available", "The original and the changed version can still be compared.", 0, 0, 1, 0],
    ],
  ),
  "cycle-sheet": posterStory(
    "cycle-sheet",
    "/scenes/M04.webp",
    "Seven optional paper areas share one sheet without becoming a productivity pipeline.",
    0.34,
    [
      [0, "sheet-closed", "One quiet sheet", "The cycle begins whole before any area is filled.", 0, 0, 1, 0],
      [0.2, "areas-unfold", "Seven areas unfold", "Call, Compass, Lift, Making, Flight, Return, and Ground become available.", 1, -2, 1.009, 0.1],
      [0.45, "path-loose", "The path stays loose", "Every stage keeps a route backward, outward, or into rest.", -2, -1, 1.014, -0.12],
      [0.7, "empty-weight", "Empty has full weight", "Unfilled areas remain visually complete instead of recording failure.", 2, 1, 1.008, 0.08],
      [1, "binding-closes", "The binding closes", "The sheet ends without counting progress or starting another cycle.", 0, 0, 1, 0],
    ],
  ),
  "climate-tabs": posterStory(
    "climate-tabs",
    "/scenes/M05.webp",
    "Eight independent paper condition tabs surround one optional attempt without forming a score.",
    0.26,
    [
      [0, "conditions-rest", "Conditions at rest", "Safety, time, rest, materials, freedom, craft, conversation, and Return are present.", 0, 0, 1, 0],
      [0.22, "tabs-open", "Tabs open independently", "Description replaces diagnosis; no condition becomes the whole person.", 1, -2, 1.009, 0.1],
      [0.46, "no-gauge", "There is no gauge", "The conditions never collapse into one readiness number.", -2, -1, 1.014, -0.12],
      [0.72, "one-braced", "One condition may change", "A single tab can receive support while another is already enough.", 2, 1, 1.008, 0.08],
      [1, "attempt-optional", "The attempt remains optional", "The scene settles without prescribing action or improvement.", 0, 0, 1, 0],
    ],
  ),
  "open-sky": posterStory(
    "open-sky",
    "/scenes/M12.webp",
    "An open paper book settles beneath a bright sky while wind and distant routes remain in motion.",
    0.16,
    [
      [0, "last-fold-rests", "The last fold rests", "A completed route settles on the open page without closing it.", 0, 0, 1, 0],
      [0.22, "weather-crosses", "Weather crosses the page", "The air keeps moving after the route has found its ending.", 1, -2, 1.008, 0.08],
      [0.46, "forms-return", "Forms return to Ground", "What was made can stay useful, unfinished, changed, or simply complete.", -2, -1, 1.013, -0.1],
      [0.72, "horizon-opens", "The horizon stays open", "No last page owns the routes that may or may not follow.", 2, 1, 1.007, 0.08],
      [1, "sky-remains", "The sky remains", "The book reaches its end. The horizon does not become an instruction.", 0, 0, 1, 0],
    ],
  ),
  "open-horizon": openHorizon,
} as const satisfies Readonly<Record<MechanismId, RasterStory>>;

export function storySupportsLocale(story: RasterStory, locale: Locale) {
  return locale === "en" || Boolean(story.beatTranslations?.[locale]);
}

export function storyForMechanism(
  mechanism: MechanismId,
  locale: Locale = "en",
): RasterStory {
  const story = storyRegistry[mechanism];
  const localizedCopy = story.beatTranslations?.[locale];
  if (!localizedCopy) return story;

  return {
    ...story,
    beats: story.beats.map((beat) => {
      const copy = localizedCopy[beat.id];
      return copy ? { ...beat, ...copy } : beat;
    }),
  };
}
