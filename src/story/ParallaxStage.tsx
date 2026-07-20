import {
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useStickyStoryProgress } from "../hooks/useStickyStoryProgress";
import type {
  ParallaxStageProps,
  RasterLayer,
  StoryBeat,
  StoryLayerState,
} from "./types";
import {
  ambientMotionFromSamples,
  type AmbientLayerMotion,
} from "./ambientMotion";
import "./parallax-stage.css";

interface CompleteLayerState {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
}

interface TimelinePoint {
  offset: number;
  state: CompleteLayerState;
}

interface PendingLayerDecode {
  generation: number;
  image: HTMLImageElement;
  source: string;
}

const restingState: CompleteLayerState = {
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  opacity: 1,
};

function completeState(
  previous: CompleteLayerState,
  next: StoryLayerState | undefined,
): CompleteLayerState {
  return {
    x: next?.x ?? previous.x,
    y: next?.y ?? previous.y,
    scale: next?.scale ?? previous.scale,
    rotate: next?.rotate ?? previous.rotate,
    opacity: next?.opacity ?? previous.opacity,
  };
}

function storyBeats(beats: readonly StoryBeat[]) {
  return [...beats]
    .map((beat) => ({
      ...beat,
      offset: Math.min(1, Math.max(0, beat.offset)),
    }))
    .sort((a, b) => a.offset - b.offset);
}

function makeTimeline(layer: RasterLayer, beats: readonly StoryBeat[]) {
  let current = restingState;
  const timeline: TimelinePoint[] = beats.map((beat) => {
    current = completeState(current, beat.layers?.[layer.id]);
    return { offset: beat.offset, state: current };
  });

  if (timeline.length === 0) {
    return [
      { offset: 0, state: restingState },
      { offset: 1, state: restingState },
    ];
  }
  if (timeline[0].offset > 0) {
    timeline.unshift({ offset: 0, state: restingState });
  }
  if (timeline[timeline.length - 1].offset < 1) {
    timeline.push({
      offset: 1,
      state: timeline[timeline.length - 1].state,
    });
  }
  return timeline;
}

function interpolate(a: number, b: number, amount: number) {
  return a + (b - a) * amount;
}

function sampleTimeline(timeline: readonly TimelinePoint[], progress: number) {
  const upperIndex = timeline.findIndex((point) => point.offset >= progress);
  if (upperIndex <= 0) return timeline[0].state;
  if (upperIndex === -1) return timeline[timeline.length - 1].state;

  const lower = timeline[upperIndex - 1];
  const upper = timeline[upperIndex];
  const distance = Math.max(upper.offset - lower.offset, Number.EPSILON);
  const linear = Math.min(1, Math.max(0, (progress - lower.offset) / distance));
  const amount = linear * linear * (3 - 2 * linear);

  return {
    x: interpolate(lower.state.x, upper.state.x, amount),
    y: interpolate(lower.state.y, upper.state.y, amount),
    scale: interpolate(lower.state.scale, upper.state.scale, amount),
    rotate: interpolate(lower.state.rotate, upper.state.rotate, amount),
    opacity: interpolate(lower.state.opacity, upper.state.opacity, amount),
  };
}

function setLayerPose(element: HTMLElement, state: CompleteLayerState) {
  element.style.setProperty("--story-layer-x", String(state.x));
  element.style.setProperty("--story-layer-y", String(state.y));
  element.style.setProperty("--story-layer-scale", String(state.scale));
  element.style.setProperty("--story-layer-rotate", String(state.rotate));
  element.style.setProperty("--story-layer-opacity", String(state.opacity));
}

function amplifyScrollPose(
  state: CompleteLayerState,
  opening: CompleteLayerState,
  strength: number,
): CompleteLayerState {
  if (strength === 1) return state;
  return {
    x: opening.x + (state.x - opening.x) * strength,
    y: opening.y + (state.y - opening.y) * strength,
    scale: opening.scale + (state.scale - opening.scale) * strength,
    rotate: opening.rotate + (state.rotate - opening.rotate) * strength,
    opacity: state.opacity,
  };
}

function ambientLayerStyle(
  motion: AmbientLayerMotion,
  layerIndex: number,
) {
  const xDirection = layerIndex % 2 === 0 ? 1 : -1;
  const yDirection = layerIndex % 3 === 0 ? -1 : 1;
  const rotateDirection = layerIndex % 2 === 0 ? -1 : 1;
  const value = (number: number) => Number(number.toFixed(6));

  return {
    "--story-ambient-x-from": `${value(-motion.xAmplitude * xDirection)}%`,
    "--story-ambient-x-to": `${value(motion.xAmplitude * xDirection)}%`,
    "--story-ambient-y-from": `${value(-motion.yAmplitude * yDirection)}%`,
    "--story-ambient-y-to": `${value(motion.yAmplitude * yDirection)}%`,
    "--story-ambient-rotate-from": `${value(
      -motion.rotateAmplitude * rotateDirection,
    )}deg`,
    "--story-ambient-rotate-to": `${value(
      motion.rotateAmplitude * rotateDirection,
    )}deg`,
    "--story-ambient-scale-from": String(value(1 - motion.scaleAmplitude)),
    "--story-ambient-scale-to": String(value(1 + motion.scaleAmplitude)),
    "--story-ambient-duration": `${motion.durationSeconds}s`,
    "--story-ambient-delay": `${motion.delaySeconds}s`,
  } as CSSProperties;
}

function currentBeatIndex(beats: readonly StoryBeat[], progress: number) {
  let index = 0;
  for (let candidate = 0; candidate < beats.length; candidate += 1) {
    if (beats[candidate].offset > progress) break;
    index = candidate;
  }
  return index;
}

function authoredTitleLines(title: string, mechanism: string) {
  const explicitBreaks: Readonly<
    Record<string, Readonly<Record<string, readonly [string, string]>>>
  > = {
    "candidate-map": {
      "A map that pretended to be the Sky": [
        "A map that pretended",
        "to be the Sky",
      ],
      "Карта, которая притворилась небом": [
        "Карта, которая",
        "притворилась небом",
      ],
    },
    "return-threshold": {
      "Return from simulation": ["Return from", "simulation"],
      "Возвращение из симуляции": ["Возвращение", "из симуляции"],
    },
    "equal-lenses": {
      "One sheet, ten honest doorways": ["One sheet, ten", "honest doorways"],
      "Один лист, десять честных входов": [
        "Один лист, десять",
        "честных входов",
      ],
    },
    "open-horizon": {
      "The Sky Remains Open": ["The Sky", "Remains Open"],
      "Небо остаётся открытым": ["Небо остаётся", "открытым"],
    },
  };
  const explicit = explicitBreaks[mechanism]?.[title];
  if (explicit) {
    return (
      <>
        <span data-story-title-line>{explicit[0]}</span>{" "}
        <span data-story-title-line>{explicit[1]}</span>
      </>
    );
  }

  if (
    mechanism !== "honest-mode-rail" &&
    mechanism !== "ground-or-gravity"
  ) {
    return title;
  }
  const groundNegation = title.indexOf(" не ");
  const breakAt =
    mechanism === "ground-or-gravity" && groundNegation > 0
      ? groundNegation
      : title.lastIndexOf(" ");
  if (breakAt <= 0 || breakAt === title.length - 1) return title;
  return (
    <>
      <span data-story-title-line>{title.slice(0, breakAt)}</span>{" "}
      <span data-story-title-line>{title.slice(breakAt + 1)}</span>
    </>
  );
}

function imageSource(image: HTMLImageElement) {
  return image.currentSrc || image.src;
}

function waitForPaint() {
  return new Promise<void>((resolve) => {
    if (typeof window.requestAnimationFrame !== "function") {
      resolve();
      return;
    }
    // A rejected Safari decode can still accompany a complete, drawable
    // cached image. Leave one complete paint between the fallback poster and
    // the handoff instead of hiding the poster in the same frame as `load`.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

async function waitForLayerDecode(image: HTMLImageElement) {
  if (typeof image.decode !== "function") return;

  try {
    await image.decode();
  } catch (error) {
    // WebKit may reject decode() for an already complete cached resource. A
    // complete image with intrinsic width is still a safe fallback after a
    // paint boundary; a genuinely broken resource must keep the poster.
    if (!image.complete || image.naturalWidth <= 0) throw error;
    await waitForPaint();
  }
}

export function ParallaxStage({
  story,
  className,
  style,
  children,
  editorialCopy,
  editorialPanels,
  showNarration = true,
  settled = false,
  reducedMotion,
  inline = false,
  onProgress,
  onBeatChange,
  onSkip,
  skipLabel = "Skip illustrated story",
  focusAfterSkipRef,
}: ParallaxStageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLElement>(null);
  const editorialCopyRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef(new Map<string, HTMLElement>());
  const layerImageRefs = useRef(new Map<string, HTMLImageElement>());
  const narrationRefs = useRef(new Map<string, HTMLElement>());
  const loadedLayers = useRef(new Set<string>());
  const layerGeneration = useRef(0);
  const pendingLayerDecodes = useRef(new Map<string, PendingLayerDecode>());
  const pointerFrame = useRef<number | null>(null);
  const pendingPointer = useRef({ x: 0, y: 0 });
  const activeBeat = useRef(-1);
  const currentProgress = useRef(0);
  const [layersHydrated, setLayersHydrated] = useState(
    story.mechanism === "map-sky",
  );
  const systemReducedMotion = usePrefersReducedMotion();
  const coarsePointer = useMediaQuery("(hover: none), (pointer: coarse)");
  const motionDisabled = settled || (reducedMotion ?? systemReducedMotion);
  const scrollParallaxStrength = inline || motionDisabled
    ? 1
    : (story.scrollParallaxStrength ?? 1);
  const pointerParallaxStrength = story.pointerParallaxStrength ?? 1;
  const beats = useMemo(() => storyBeats(story.beats), [story.beats]);
  const hasNarration =
    showNarration && beats.some((beat) => beat.narration);
  const resolvedEditorialCopy = story.editorialCopyLayout
    ? editorialCopy
    : undefined;
  const integrateEditorialNarration = Boolean(
    resolvedEditorialCopy && story.editorialNarrationLayout !== "card",
  );
  const timelines = useMemo(
    () => new Map(
      story.layers.map((layer) => [layer.id, makeTimeline(layer, beats)]),
    ),
    [beats, story.layers],
  );
  const ambientMotions = useMemo(
    () =>
      new Map(
        story.layers.map((layer, index) => {
          const timeline = timelines.get(layer.id) ?? [];
          return [
            layer.id,
            ambientMotionFromSamples(
              timeline.map(({ state }) => state),
              layer.depth,
              index,
            ),
          ];
        }),
      ),
    [story.layers, timelines],
  );

  const requestLayerDecode = useCallback((
    layerId: string,
    image: HTMLImageElement,
    generation: number,
  ) => {
    const source = imageSource(image);
    const existing = pendingLayerDecodes.current.get(layerId);
    if (
      existing?.generation === generation &&
      existing.image === image &&
      existing.source === source
    ) {
      return;
    }

    const pending = { generation, image, source };
    pendingLayerDecodes.current.set(layerId, pending);

    const isCurrent = () => {
      const section = sectionRef.current;
      return Boolean(
        section &&
          layerGeneration.current === generation &&
          pendingLayerDecodes.current.get(layerId) === pending &&
          layerImageRefs.current.get(layerId) === image &&
          imageSource(image) === source &&
          section.dataset.layersHydrated === "true" &&
          !section.dataset.layerError,
      );
    };

    const markReady = () => {
      if (!isCurrent()) return;
      loadedLayers.current.add(layerId);
      const section = sectionRef.current!;
      section.dataset.layersReady = String(
        story.layers.length > 0 &&
          story.layers.every((layer) => loadedLayers.current.has(layer.id)),
      );
    };

    // `decode()` is not present in older WebKit. There, a successful load is
    // the strongest available readiness signal and preserves the old safe
    // fallback rather than leaving the poster permanently pinned.
    if (typeof image.decode !== "function") {
      markReady();
      pendingLayerDecodes.current.delete(layerId);
      return;
    }

    const finish = async () => {
      try {
        await waitForLayerDecode(image);
      } catch {
        if (!isCurrent()) return;
        const section = sectionRef.current!;
        section.dataset.layerError = layerId;
        section.dataset.layersReady = "false";
        return;
      }

      markReady();
    };

    void finish().finally(() => {
      if (pendingLayerDecodes.current.get(layerId) === pending) {
        pendingLayerDecodes.current.delete(layerId);
      }
    });
  }, [story.layers]);

  const applyProgress = useCallback((progress: number) => {
    const section = sectionRef.current;
    if (!section) return;
    currentProgress.current = progress;
    section.style.setProperty("--story-progress", String(progress));
    const visualWidth = visualRef.current?.offsetWidth ?? 0;
    const horizontalTravel = Math.max(0, visualWidth - window.innerWidth);
    section.style.setProperty(
      "--story-horizontal-pan",
      `${-horizontalTravel * progress}px`,
    );
    section.dataset.storyProgress = progress.toFixed(3);

    for (const layer of story.layers) {
      const element = layerRefs.current.get(layer.id);
      const timeline = timelines.get(layer.id);
      if (element && timeline) {
        const sampled = sampleTimeline(timeline, progress);
        setLayerPose(
          element,
          amplifyScrollPose(
            sampled,
            timeline[0].state,
            scrollParallaxStrength,
          ),
        );
      }
    }

    const editorialTimeline = story.editorialCopyLayerId
      ? timelines.get(story.editorialCopyLayerId)
      : undefined;
    if (editorialCopyRef.current && editorialTimeline) {
      setLayerPose(
        editorialCopyRef.current,
        amplifyScrollPose(
          sampleTimeline(editorialTimeline, progress),
          editorialTimeline[0].state,
          scrollParallaxStrength,
        ),
      );
    }

    if (beats.length > 0) {
      const nextBeat = currentBeatIndex(beats, progress);
      if (activeBeat.current !== nextBeat) {
        activeBeat.current = nextBeat;
        for (const [id, element] of narrationRefs.current) {
          const isActive = id === beats[nextBeat].id;
          element.dataset.active = String(isActive);
          element.setAttribute("aria-hidden", String(!isActive));
        }
        onBeatChange?.(beats[nextBeat], nextBeat);
      }
    }
    onProgress?.(progress);
  }, [
    beats,
    onBeatChange,
    onProgress,
    scrollParallaxStrength,
    story.editorialCopyLayerId,
    story.layers,
    timelines,
  ]);

  useStickyStoryProgress(sectionRef, {
    activationKey: `${story.mechanism}:${story.poster}`,
    onProgress: applyProgress,
    reducedMotion: motionDisabled,
    settled,
    fixedProgress: inline ? (story.inlineProgress ?? 0.58) : undefined,
    onProximityChange: setLayersHydrated,
  });

  useLayoutEffect(() => {
    const generation = ++layerGeneration.current;
    loadedLayers.current.clear();
    pendingLayerDecodes.current.clear();
    activeBeat.current = -1;
    const section = sectionRef.current;
    if (!section) return;
    section.dataset.layersHydrated = String(layersHydrated);
    section.dataset.layersReady = "false";
    delete section.dataset.layerError;

    if (!layersHydrated) return;

    // Safari can restore eager or cached images in a complete state without
    // replaying React's load handler. Reconcile the DOM state after refs have
    // attached so the poster cannot remain over a fully loaded composition.
    for (const layer of story.layers) {
      const image = layerImageRefs.current.get(layer.id);
      if (image?.complete && image.naturalWidth > 0) {
        requestLayerDecode(layer.id, image, generation);
      }
    }
    // Inline and reduced-motion scenes can receive their fixed pose before a
    // distant layer pack is mounted. Reapply that exact pose after hydration.
    applyProgress(currentProgress.current);

    return () => {
      if (layerGeneration.current === generation) {
        layerGeneration.current += 1;
      }
      pendingLayerDecodes.current.clear();
    };
  }, [
    applyProgress,
    inline,
    layersHydrated,
    requestLayerDecode,
    story.layers,
    story.mechanism,
    story.poster,
  ]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.dataset.ambientActive = "false";
    if (motionDisabled) return;

    let intersecting = typeof IntersectionObserver === "undefined";
    const syncActiveState = () => {
      section.dataset.ambientActive = String(
        intersecting && document.visibilityState !== "hidden",
      );
    };
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              intersecting = entry.isIntersecting;
              syncActiveState();
            },
            { rootMargin: "12% 0px", threshold: 0 },
          );

    observer?.observe(section);
    document.addEventListener("visibilitychange", syncActiveState);
    syncActiveState();
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", syncActiveState);
      section.dataset.ambientActive = "false";
    };
  }, [motionDisabled, story.mechanism]);

  useLayoutEffect(() => {
    const visual = visualRef.current;
    const resetPointerPose = () => {
      for (const element of layerRefs.current.values()) {
        element.style.setProperty("--story-pointer-x", "0");
        element.style.setProperty("--story-pointer-y", "0");
      }
      editorialCopyRef.current?.style.setProperty("--story-pointer-x", "0");
      editorialCopyRef.current?.style.setProperty("--story-pointer-y", "0");
    };
    // Inline stories are the touch-first mobile composition. Keep their
    // authored pose and ambient breathing, but do not let a pan gesture pull
    // individual paper layers apart. The coarse-pointer guard covers larger
    // touch devices that sit just above the inline breakpoint as well.
    if (!visual || motionDisabled || inline || coarsePointer) {
      resetPointerPose();
      return;
    }

    const applyPointer = () => {
      pointerFrame.current = null;
      for (const layer of story.layers) {
        const element = layerRefs.current.get(layer.id);
        if (!element) continue;
        const depth = Math.min(1.5, Math.max(-1.5, layer.depth));
        const strength = layer.pointerStrength ?? 16;
        element.style.setProperty(
          "--story-pointer-x",
          String(
            pendingPointer.current.x *
              depth *
              strength *
              pointerParallaxStrength,
          ),
        );
        element.style.setProperty(
          "--story-pointer-y",
          String(
            pendingPointer.current.y *
              depth *
              strength *
              pointerParallaxStrength,
          ),
        );
        if (
          editorialCopyRef.current &&
          story.editorialCopyLayerId === layer.id
        ) {
          editorialCopyRef.current.style.setProperty(
            "--story-pointer-x",
            String(
              pendingPointer.current.x *
                depth *
                strength *
                pointerParallaxStrength,
            ),
          );
          editorialCopyRef.current.style.setProperty(
            "--story-pointer-y",
            String(
              pendingPointer.current.y *
                depth *
                strength *
                pointerParallaxStrength,
            ),
          );
        }
      }
    };

    const requestPointer = (x: number, y: number) => {
      pendingPointer.current = { x, y };
      if (pointerFrame.current === null) {
        pointerFrame.current = window.requestAnimationFrame(applyPointer);
      }
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = visual.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      requestPointer(
        Math.min(1, Math.max(-1, ((event.clientX - rect.left) / rect.width) * 2 - 1)),
        Math.min(1, Math.max(-1, ((event.clientY - rect.top) / rect.height) * 2 - 1)),
      );
    };
    const resetPointer = () => requestPointer(0, 0);

    visual.addEventListener("pointermove", handlePointer, { passive: true });
    visual.addEventListener("pointerleave", resetPointer, { passive: true });
    visual.addEventListener("pointercancel", resetPointer, { passive: true });
    return () => {
      visual.removeEventListener("pointermove", handlePointer);
      visual.removeEventListener("pointerleave", resetPointer);
      visual.removeEventListener("pointercancel", resetPointer);
      if (pointerFrame.current !== null) {
        window.cancelAnimationFrame(pointerFrame.current);
        pointerFrame.current = null;
      }
      resetPointerPose();
    };
  }, [
    coarsePointer,
    inline,
    motionDisabled,
    pointerParallaxStrength,
    story.editorialCopyLayerId,
    story.layers,
  ]);

  const handleLayerLoad = (layerId: string, image: HTMLImageElement) => {
    const section = sectionRef.current;
    if (!section || section.dataset.layerError) return;
    requestLayerDecode(layerId, image, layerGeneration.current);
  };

  const handleLayerError = (layerId: string) => {
    const section = sectionRef.current;
    if (!section) return;
    pendingLayerDecodes.current.delete(layerId);
    loadedLayers.current.delete(layerId);
    section.dataset.layerError = layerId;
    section.dataset.layersReady = "false";
  };

  const handleSkip = () => {
    onSkip?.();
    const target = focusAfterSkipRef?.current;
    if (!target) return;
    target.scrollIntoView?.({ block: "start" });
    window.requestAnimationFrame(() => {
      const hadTabIndex = target.hasAttribute("tabindex");
      if (!hadTabIndex) target.tabIndex = -1;
      // Safari exposes focus-visible for some scripted focus transfers. Mark
      // this as navigation focus so the global keyboard ring does not become
      // a large orange frame around the released chapter content.
      target.dataset.programmaticFocus = "true";
      target.addEventListener(
        "blur",
        () => {
          delete target.dataset.programmaticFocus;
          if (!hadTabIndex) target.removeAttribute("tabindex");
        },
        { once: true },
      );
      target.focus({ preventScroll: true });
    });
  };

  const outerStyle = {
    ...style,
    "--story-aspect-ratio": story.aspectRatio ?? 16 / 9,
    "--story-scroll-length": `${story.scrollLengthVh ?? 320}vh`,
  } as CSSProperties;
  const classes = ["parallax-story", className].filter(Boolean).join(" ");

  return (
    <section
      className={classes}
      data-ambient-active="false"
      data-editorial-copy={story.editorialCopyLayout ?? "none"}
      data-layer-handoff="atomic"
      data-layers-ready="false"
      data-layout={inline ? "inline" : "sticky"}
      data-layers-hydrated={String(layersHydrated)}
      data-motion-disabled={String(motionDisabled)}
      data-story-mechanism={story.mechanism}
      data-story-progress="0.000"
      ref={sectionRef}
      style={outerStyle}
    >
      <div className="parallax-story__sticky">
        <figure
          className="parallax-story__visual"
          ref={visualRef}
        >
          <figcaption className="parallax-story__caption">
            {story.ariaLabel}
          </figcaption>
          <picture>
            {story.posterMobileSrc ? (
              <source
                data-story-mobile-poster
                media="(max-width: 820px)"
                srcSet={story.posterMobileSrc}
              />
            ) : null}
            <img
              alt=""
              aria-hidden="true"
              className="parallax-story__poster"
              data-testid="story-poster"
              decoding="async"
              draggable="false"
              fetchPriority={story.mechanism === "map-sky" ? "high" : "auto"}
              loading={story.mechanism === "map-sky" ? "eager" : "lazy"}
              sizes={story.posterSizes}
              src={story.poster}
              srcSet={story.posterSrcSet}
            />
          </picture>
          <div aria-hidden="true" className="parallax-story__layers">
            {layersHydrated
              ? story.layers.map((layer, index) => {
                  const ambientMotion = ambientMotions.get(layer.id)!;
                  const locksPrintedEditorialSurface =
                    layer.id === story.editorialCopyLayerId;
                  return (
                    <span
                      className="parallax-story__layer-pose"
                      data-story-layer-pose={layer.id}
                      key={layer.id}
                      ref={(element) => {
                        if (element) layerRefs.current.set(layer.id, element);
                        else layerRefs.current.delete(layer.id);
                      }}
                    >
                      <picture>
                        {layer.mobileSrc ? (
                          <source
                            data-story-mobile-layer={layer.id}
                            media="(max-width: 820px)"
                            srcSet={layer.mobileSrc}
                          />
                        ) : null}
                        <img
                          alt=""
                          aria-hidden="true"
                          className={["parallax-story__layer", layer.className]
                            .filter(Boolean)
                            .join(" ")}
                          data-ambient-enabled={String(
                            ambientMotion.enabled &&
                              !locksPrintedEditorialSurface,
                          )}
                          data-story-editorial-surface-lock={
                            locksPrintedEditorialSurface ? "true" : undefined
                          }
                          data-story-layer={layer.id}
                          decoding="async"
                          draggable="false"
                          // Proximity hydration is the loading gate; once a pack
                          // mounts it should be ready before the sticky beat.
                          loading="eager"
                          onError={() => handleLayerError(layer.id)}
                          onLoad={(event) =>
                            handleLayerLoad(layer.id, event.currentTarget)}
                          ref={(element) => {
                            if (element) {
                              layerImageRefs.current.set(layer.id, element);
                            } else {
                              layerImageRefs.current.delete(layer.id);
                            }
                          }}
                          sizes={layer.sizes}
                          src={layer.src}
                          srcSet={layer.srcSet}
                          style={{
                            objectFit: layer.fit ?? "cover",
                            ...ambientLayerStyle(ambientMotion, index),
                          }}
                        />
                      </picture>
                    </span>
                  );
                })
              : null}
          </div>
          {resolvedEditorialCopy ? (
            <div
              className={[
                "parallax-story__editorial-copy",
                `parallax-story__editorial-copy--${story.editorialCopyLayout}`,
              ].join(" ")}
              data-story-editorial-copy-layer={story.editorialCopyLayerId}
              data-story-editorial-copy
              ref={editorialCopyRef}
            >
              <div
                aria-hidden="true"
                className="parallax-story__editorial-heading"
              >
                <p className="parallax-story__editorial-title">
                  {authoredTitleLines(
                    resolvedEditorialCopy.title,
                    story.mechanism,
                  )}
                </p>
                <p className="parallax-story__editorial-thesis">
                  {resolvedEditorialCopy.thesis}
                </p>
              </div>
              {hasNarration && integrateEditorialNarration ? (
                <div className="parallax-story__editorial-narration">
                  {beats.map((beat, index) => (
                    <article
                      aria-hidden={index !== 0}
                      className="parallax-story__beat parallax-story__beat--editorial"
                      data-active={String(index === 0)}
                      key={beat.id}
                      ref={(element) => {
                        if (element) narrationRefs.current.set(beat.id, element);
                        else narrationRefs.current.delete(beat.id);
                      }}
                    >
                      {beat.label ? <strong>{beat.label}</strong> : null}
                      {beat.narration ? <span>{beat.narration}</span> : null}
                    </article>
                  ))}
                </div>
              ) : null}
              {story.mechanism === "ground-or-gravity" &&
              editorialPanels?.length ? (
                <div
                  aria-hidden="true"
                  className="parallax-story__editorial-supports"
                >
                  {editorialPanels.map((panel, panelIndex) => (
                    <div
                      className="parallax-story__editorial-support"
                      data-story-editorial-panel={panelIndex + 1}
                      key={panelIndex}
                    >
                      {panel.labels.map((label, labelIndex) => (
                        <strong
                          className="parallax-story__editorial-support-label"
                          key={`${label}-${labelIndex}`}
                        >
                          {label}
                        </strong>
                      ))}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          {children ? <div className="parallax-story__overlay">{children}</div> : null}
        </figure>
        {hasNarration && !integrateEditorialNarration ? (
          <div className="parallax-story__narration">
            {beats.map((beat, index) => (
              <article
                aria-hidden={index !== 0}
                className="parallax-story__beat"
                data-active={String(index === 0)}
                key={beat.id}
                ref={(element) => {
                  if (element) narrationRefs.current.set(beat.id, element);
                  else narrationRefs.current.delete(beat.id);
                }}
              >
                {beat.label ? <strong>{beat.label}</strong> : null}
                {beat.narration ? <span>{beat.narration}</span> : null}
              </article>
            ))}
          </div>
        ) : null}
        {onSkip || focusAfterSkipRef ? (
          <button className="parallax-story__skip" onClick={handleSkip} type="button">
            {skipLabel}
          </button>
        ) : null}
      </div>
    </section>
  );
}
