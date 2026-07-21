const NEAR_VIEWPORTS = 1.75;
const MAX_WARM_LAYER_PACKS = 2;

/**
 * IntersectionObserver resolves percentage root margins against the root
 * width, including vertical margins. Express the shared near gate in pixels
 * so it remains exactly 1.75 current viewport heights.
 */
export function storyNearViewportMargin(viewportHeight: number) {
  return `${Math.max(0, viewportHeight) * NEAR_VIEWPORTS}px 0px`;
}

function clampProgress(value: number) {
  return Math.min(1, Math.max(0, value));
}

export interface StickyStoryGeometry {
  top: number;
  height: number;
}

export type StoryProgressMode = "sticky" | "inline";

function defaultStickyGeometry(viewportHeight: number): StickyStoryGeometry {
  return { top: 0, height: viewportHeight };
}

/** Exact geometry contract for a tall section and its configured sticky child. */
export function stickyStoryProgress(
  rect: Pick<DOMRect, "top" | "height">,
  viewportHeight: number,
  stickyGeometry: StickyStoryGeometry = defaultStickyGeometry(viewportHeight),
) {
  const stickyTop = Number.isFinite(stickyGeometry.top)
    ? stickyGeometry.top
    : 0;
  const stickyHeight = Number.isFinite(stickyGeometry.height) &&
      stickyGeometry.height > 0
    ? stickyGeometry.height
    : viewportHeight;
  const travel = Math.max(rect.height - stickyHeight, 1);
  return clampProgress((stickyTop - rect.top) / travel);
}

/**
 * Maps one normal-flow illustration's complete viewport passage to its own
 * authored timeline. The focal pose is reached when the scene is centred,
 * without adding document height or taking control of native scrolling.
 */
export function inlineStoryProgress(
  rect: Pick<DOMRect, "top" | "height">,
  viewportHeight: number,
  focalProgress = 0.5,
) {
  const sceneHeight = Number.isFinite(rect.height) && rect.height > 0
    ? rect.height
    : 0;
  const passage = clampProgress(
    (Math.max(0, viewportHeight) - rect.top) /
      Math.max(Math.max(0, viewportHeight) + sceneHeight, 1),
  );
  const focal = clampProgress(focalProgress);

  return passage <= 0.5
    ? passage * 2 * focal
    : focal + (passage - 0.5) * 2 * (1 - focal);
}

function measureStickyGeometry(
  element: HTMLElement,
  viewportHeight: number,
): StickyStoryGeometry {
  const sticky = element.querySelector<HTMLElement>(".parallax-story__sticky");
  if (!sticky) return defaultStickyGeometry(viewportHeight);

  const style = window.getComputedStyle(sticky);
  const top = Number.parseFloat(style.top);
  const height = sticky.getBoundingClientRect().height;
  return {
    top: Number.isFinite(top) ? top : 0,
    height: Number.isFinite(height) && height > 0 ? height : viewportHeight,
  };
}

interface StoryScheduleRegistration {
  element: HTMLElement;
  near: boolean;
  warm: boolean | null;
  order: number;
  lastProgress: number | null;
  progressMode: StoryProgressMode;
  inlineFocalProgress: number;
  stickyGeometry: StickyStoryGeometry;
  onProgress?: (progress: number) => void;
  onProximityChange?: (near: boolean) => void;
}

interface RegisterStoryScheduleOptions {
  onProgress?: (progress: number) => void;
  onProximityChange?: (near: boolean) => void;
  progressMode?: StoryProgressMode;
  inlineFocalProgress?: number;
}

function initiallyNearViewport(element: HTMLElement) {
  if (typeof IntersectionObserver === "undefined") return true;

  const rect = element.getBoundingClientRect();
  const margin = window.innerHeight * NEAR_VIEWPORTS;
  return rect.bottom >= -margin && rect.top <= window.innerHeight + margin;
}

interface StoryDistance {
  gap: number;
  center: number;
}

function distanceFromViewport(
  rect: Pick<DOMRect, "top" | "bottom">,
  viewportHeight: number,
): StoryDistance {
  const gap = rect.bottom < 0
    ? -rect.bottom
    : rect.top > viewportHeight
      ? rect.top - viewportHeight
      : 0;
  const viewportCenter = viewportHeight / 2;
  const storyCenter = (rect.top + rect.bottom) / 2;

  return {
    gap,
    center: Math.abs(storyCenter - viewportCenter),
  };
}

class StickyStoryScheduler {
  private readonly registrations = new Map<
    HTMLElement,
    StoryScheduleRegistration
  >();

  private frame: number | null = null;
  private observer: IntersectionObserver | null = null;
  private observerViewportHeight: number | null = null;
  private listening = false;
  private nextOrder = 0;

  private readonly requestMeasure = () => {
    if (this.frame !== null || !this.hasScheduledRegistrations()) return;

    // The sentinel also makes the scheduler deterministic under synchronous
    // requestAnimationFrame mocks used by unit tests.
    this.frame = -1;
    const frame = window.requestAnimationFrame(() => {
      this.frame = null;
      this.measureScheduledStories();
    });
    if (this.frame !== null) this.frame = frame;
  };

  private readonly handleIntersections: IntersectionObserverCallback = (
    entries,
  ) => {
    let shouldMeasure = false;

    for (const entry of entries) {
      const registration = this.registrations.get(entry.target as HTMLElement);
      if (!registration) continue;

      const near = entry.isIntersecting;
      registration.near = near;
      if (near && registration.onProgress) shouldMeasure = true;
    }

    this.syncWarmRegistrations();
    if (shouldMeasure) this.requestMeasure();
  };

  private readonly handleResize = () => {
    this.refreshObserverMargin();
    this.refreshStickyGeometries();
    this.requestMeasure();
  };

  register(
    element: HTMLElement,
    {
      onProgress,
      onProximityChange,
      progressMode = "sticky",
      inlineFocalProgress = 0.5,
    }: RegisterStoryScheduleOptions,
  ) {
    const near = initiallyNearViewport(element);
    const registration: StoryScheduleRegistration = {
      element,
      near,
      warm: null,
      order: this.nextOrder++,
      lastProgress: null,
      progressMode,
      inlineFocalProgress: clampProgress(inlineFocalProgress),
      stickyGeometry: onProgress && progressMode === "sticky"
        ? measureStickyGeometry(element, window.innerHeight)
        : defaultStickyGeometry(window.innerHeight),
      onProgress,
      onProximityChange,
    };

    this.registrations.set(element, registration);
    this.ensureObserver();
    this.observer?.observe(element);
    this.syncListeners();
    this.syncWarmRegistrations();
    if (near && onProgress) this.requestMeasure();

    return () => {
      const current = this.registrations.get(element);
      if (current !== registration) return;

      this.observer?.unobserve(element);
      this.registrations.delete(element);
      this.syncListeners();
      this.syncWarmRegistrations();

      if (this.registrations.size === 0) {
        this.observer?.disconnect();
        this.observer = null;
        this.observerViewportHeight = null;
      }
    };
  }

  private ensureObserver() {
    if (
      this.observer ||
      typeof IntersectionObserver === "undefined" ||
      this.registrations.size === 0
    ) {
      return this.observer;
    }

    const viewportHeight = window.innerHeight;
    this.observer = new IntersectionObserver(this.handleIntersections, {
      rootMargin: storyNearViewportMargin(viewportHeight),
      threshold: 0,
    });
    this.observerViewportHeight = viewportHeight;
    return this.observer;
  }

  private refreshObserverMargin() {
    if (
      !this.observer ||
      typeof IntersectionObserver === "undefined" ||
      this.observerViewportHeight === window.innerHeight
    ) {
      return;
    }

    this.observer.disconnect();
    this.observer = null;
    this.observerViewportHeight = null;
    const observer = this.ensureObserver();
    for (const registration of this.registrations.values()) {
      observer?.observe(registration.element);
    }
  }

  private refreshStickyGeometries() {
    const viewportHeight = window.innerHeight;
    for (const registration of this.registrations.values()) {
      if (
        !registration.onProgress ||
        registration.progressMode !== "sticky"
      ) {
        continue;
      }
      registration.stickyGeometry = measureStickyGeometry(
        registration.element,
        viewportHeight,
      );
    }
  }

  private hasScheduledRegistrations() {
    for (const registration of this.registrations.values()) {
      if (registration.onProgress || registration.onProximityChange) return true;
    }
    return false;
  }

  private syncListeners() {
    const shouldListen = this.hasScheduledRegistrations();
    if (shouldListen === this.listening) return;

    this.listening = shouldListen;
    if (shouldListen) {
      window.addEventListener("scroll", this.requestMeasure, { passive: true });
      window.addEventListener("resize", this.handleResize, { passive: true });
      return;
    }

    window.removeEventListener("scroll", this.requestMeasure);
    window.removeEventListener("resize", this.handleResize);
    if (this.frame !== null) {
      window.cancelAnimationFrame(this.frame);
      this.frame = null;
    }
  }

  private syncWarmRegistrations(
    measuredRects: ReadonlyMap<HTMLElement, DOMRect> = new Map(),
  ) {
    const viewportHeight = window.innerHeight;
    const warm = new Set(
      [...this.registrations.values()]
        .filter(
          (registration) =>
            registration.near && registration.onProximityChange,
        )
        .map((registration) => {
          const rect = measuredRects.get(registration.element) ??
            registration.element.getBoundingClientRect();
          return {
            registration,
            distance: distanceFromViewport(rect, viewportHeight),
          };
        })
        .sort((a, b) =>
          a.distance.gap - b.distance.gap ||
          a.distance.center - b.distance.center ||
          a.registration.order - b.registration.order,
        )
        .slice(0, MAX_WARM_LAYER_PACKS)
        .map(({ registration }) => registration),
    );

    const scheduled = [...this.registrations.values()].filter(
      (registration) => registration.onProximityChange,
    );

    // Release outgoing packs before promoting replacements. React batches the
    // resulting state updates, but this ordering also keeps the scheduler's
    // own warm-state invariant true for imperative consumers.
    for (const registration of scheduled) {
      if (warm.has(registration) || registration.warm === false) continue;
      registration.warm = false;
      registration.onProximityChange?.(false);
    }
    for (const registration of scheduled) {
      if (!warm.has(registration) || registration.warm === true) continue;
      registration.warm = true;
      registration.onProximityChange?.(true);
    }
  }

  private measureScheduledStories() {
    const viewportHeight = window.innerHeight;
    const measuredRects = new Map<HTMLElement, DOMRect>();

    for (const registration of this.registrations.values()) {
      if (
        !registration.near ||
        (!registration.onProgress && !registration.onProximityChange)
      ) {
        continue;
      }

      const rect = registration.element.getBoundingClientRect();
      measuredRects.set(registration.element, rect);
      if (!registration.onProgress) continue;

      const progress = registration.progressMode === "inline"
        ? inlineStoryProgress(
            rect,
            viewportHeight,
            registration.inlineFocalProgress,
          )
        : stickyStoryProgress(
            rect,
            viewportHeight,
            registration.stickyGeometry,
          );
      if (progress === registration.lastProgress) continue;

      registration.lastProgress = progress;
      registration.onProgress(progress);
    }

    this.syncWarmRegistrations(measuredRects);
  }
}

export const stickyStoryScheduler = new StickyStoryScheduler();
