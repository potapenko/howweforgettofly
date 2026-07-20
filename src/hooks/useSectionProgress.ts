import { type RefObject, useEffect, useRef } from "react";

interface SectionProgressOptions {
  onProgress: (progress: number) => void;
  onActive?: () => void;
  onInactive?: () => void;
  activationKey?: string;
  disabled?: boolean;
}

interface RegisteredSection {
  element: HTMLElement;
  isIntersecting: boolean | null;
  callbacks: () => Pick<
    SectionProgressOptions,
    "onProgress" | "onActive" | "onInactive"
  >;
}

const registeredSections = new Set<RegisteredSection>();
let activeSection: RegisteredSection | null = null;
let sharedFrame: number | null = null;
let listening = false;
let visibilityObserver: IntersectionObserver | null = null;

function startVisibilityObserver() {
  if (visibilityObserver || typeof IntersectionObserver === "undefined") return;
  visibilityObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      for (const section of registeredSections) {
        if (section.element !== entry.target) continue;
        section.isIntersecting = entry.isIntersecting;
        break;
      }
    }
    requestUpdate();
  });
  for (const section of registeredSections) {
    visibilityObserver.observe(section.element);
  }
}

function measureSections() {
  sharedFrame = null;
  const viewport = window.innerHeight;
  const anchor = viewport * 0.38;
  let closest: RegisteredSection | null = null;
  let closestDistance = Number.POSITIVE_INFINITY;
  let closestRect: DOMRect | null = null;

  for (const section of registeredSections) {
    if (section.isIntersecting === false) continue;
    const rect = section.element.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= viewport) continue;
    const distance = anchor < rect.top
      ? rect.top - anchor
      : anchor > rect.bottom
        ? anchor - rect.bottom
        : 0;
    if (distance < closestDistance) {
      closest = section;
      closestDistance = distance;
      closestRect = rect;
    }
  }

  if (!closest || !closestRect) {
    activeSection?.callbacks().onInactive?.();
    activeSection = null;
    return;
  }
  if (activeSection !== closest) {
    activeSection = closest;
    closest.callbacks().onActive?.();
  }

  const travel = Math.max(closestRect.height + viewport * 0.25, 1);
  closest.callbacks().onProgress(Math.min(
    1,
    Math.max(0, (viewport * 0.68 - closestRect.top) / travel),
  ));
}

function requestUpdate() {
  if (sharedFrame === null) sharedFrame = requestAnimationFrame(measureSections);
}

function startListeners() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  startVisibilityObserver();
}

function stopListenersIfEmpty() {
  if (!listening || registeredSections.size > 0) return;
  listening = false;
  window.removeEventListener("scroll", requestUpdate);
  window.removeEventListener("resize", requestUpdate);
  if (sharedFrame !== null) cancelAnimationFrame(sharedFrame);
  visibilityObserver?.disconnect();
  visibilityObserver = null;
  sharedFrame = null;
  activeSection = null;
}

export function useSectionProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    onProgress,
    onActive,
    onInactive,
    activationKey,
    disabled = false,
  }: SectionProgressOptions,
) {
  const callbacks = useRef({ onProgress, onActive, onInactive });
  callbacks.current = { onProgress, onActive, onInactive };

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) {
      if (disabled) onProgress(1);
      return;
    }

    const section: RegisteredSection = {
      element,
      isIntersecting: null,
      callbacks: () => callbacks.current,
    };
    registeredSections.add(section);
    startListeners();
    visibilityObserver?.observe(element);
    requestUpdate();

    return () => {
      registeredSections.delete(section);
      visibilityObserver?.unobserve(element);
      if (activeSection === section) {
        section.callbacks().onInactive?.();
        activeSection = null;
      }
      stopListenersIfEmpty();
      if (registeredSections.size > 0) requestUpdate();
    };
  }, [activationKey, disabled, onProgress, ref]);
}
