import type { CSSProperties, ReactNode, RefObject } from "react";
import type { Locale } from "../i18n/LocaleContext";
import type { MechanismId } from "../types";

/** A responsive raster plane. All planes are decorative in the accessibility tree. */
export interface RasterLayer {
  id: string;
  src: string;
  /** Exact mobile file selected below the inline breakpoint, regardless of DPR. */
  mobileSrc?: string;
  /** Responsive alternatives using the native image candidate syntax. */
  srcSet?: string;
  /** Layout hint paired with `srcSet`; defaults to the rendered stage width. */
  sizes?: string;
  /** Larger values produce more local pointer movement. */
  depth: number;
  pointerStrength?: number;
  fit?: "cover" | "contain";
  className?: string;
}

/**
 * A layer pose at one story beat. `x` and `y` are percentages of the stage;
 * `rotate` is expressed in degrees.
 */
export interface StoryLayerState {
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
}

export interface StoryBeat {
  id: string;
  /** Normalized scroll position in the inclusive 0..1 range. */
  offset: number;
  label?: string;
  narration?: string;
  layers?: Readonly<Record<string, StoryLayerState>>;
}

/** Locale-authored words for one existing physical beat. */
export type StoryBeatCopy = Readonly<
  Pick<Required<StoryBeat>, "label" | "narration">
>;

/** Copy is keyed by stable beat id so localization cannot alter motion data. */
export type StoryBeatLocalePack = Readonly<Record<string, StoryBeatCopy>>;

/** Presentational copy printed onto one physical paper panel in a story. */
export interface EditorialPanel {
  labels: readonly string[];
}

/** A poster-first, image-layered interpretation of an existing scene. */
export interface RasterStory {
  mechanism: MechanismId;
  /** Complete still image used while layers load and whenever a layer fails. */
  poster: string;
  /** Exact mobile poster selected below the inline breakpoint, regardless of DPR. */
  posterMobileSrc?: string;
  /** Responsive alternatives for the complete poster fallback. */
  posterSrcSet?: string;
  /** Layout hint paired with `posterSrcSet`; defaults to the rendered stage width. */
  posterSizes?: string;
  /** One description for the complete visual; individual layers stay hidden. */
  ariaLabel: string;
  layers: readonly RasterLayer[];
  beats: readonly StoryBeat[];
  aspectRatio?: number;
  scrollLengthVh?: number;
  /** Multiplies scroll-driven movement around each layer's opening pose. */
  scrollParallaxStrength?: number;
  /** Multiplies pointer movement without changing the idle animation. */
  pointerParallaxStrength?: number;
  /** Exact authored beat offset used by the non-sticky mobile composition. */
  inlineProgress?: number;
  /**
   * Places code-native chapter copy inside an authored area of the desktop
   * spread. The raster deliberately keeps this area free of baked EN/RU text.
   */
  editorialCopyLayout?:
    | "paper-left"
    | "vellum-left"
    | "sky-left"
    | "horizon-left";
  /** Moves printed HTML with the paper plane that physically carries it. */
  editorialCopyLayerId?: string;
  /**
   * Moves integrated beat copy with a different physical carrier when the
   * heading and narration are printed on separate planes.
   */
  editorialNarrationLayerId?: string;
  /** Keeps beat captions separate when the paper mechanism occupies the leaf. */
  editorialNarrationLayout?: "integrated" | "card";
  /** Optional authored editions for beat labels and narration. */
  beatTranslations?: Readonly<
    Partial<Record<Locale, StoryBeatLocalePack>>
  >;
}

export type StoryScene = RasterStory;

export interface ParallaxStageProps {
  story: StoryScene;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Existing localized scene copy printed onto the reserved editorial leaf. */
  editorialCopy?: Readonly<{
    title: string;
    thesis: string;
  }>;
  /** Exact localized labels repeated decoratively on additional paper panels. */
  editorialPanels?: readonly EditorialPanel[];
  /** Render beat narration as an optional overlay without announcing image layers. */
  showNarration?: boolean;
  /** Disables scroll and pointer movement after a scene has intentionally settled. */
  settled?: boolean;
  /** Explicit override; otherwise the system reduced-motion preference is used. */
  reducedMotion?: boolean;
  /** Renders one living, non-sticky pose instead of a scroll-controlled chapter. */
  inline?: boolean;
  onProgress?: (progress: number) => void;
  onBeatChange?: (beat: StoryBeat, index: number) => void;
  onSkip?: () => void;
  skipLabel?: string;
  /** Focus moves here after Skip so keyboard users land after the pinned story. */
  focusAfterSkipRef?: RefObject<HTMLElement | null>;
}
