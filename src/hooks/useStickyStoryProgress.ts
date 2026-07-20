import { type RefObject, useEffect, useRef } from "react";
import {
  stickyStoryProgress,
  stickyStoryScheduler,
} from "./stickyStoryScheduler";

export { stickyStoryProgress };

export interface StickyStoryProgressOptions {
  onProgress: (progress: number) => void;
  reducedMotion?: boolean;
  settled?: boolean;
  activationKey?: string;
  /** A single authored pose for inline/mobile stories that do not pin to scroll. */
  fixedProgress?: number;
  /** Mount heavy raster layers only while this story is near the viewport. */
  onProximityChange?: (near: boolean) => void;
}

function clampProgress(value: number) {
  return Math.min(1, Math.max(0, value));
}

/**
 * Emits sticky scroll progress without storing it in React state. One passive
 * listener schedules at most one layout read per animation frame.
 */
export function useStickyStoryProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    onProgress,
    reducedMotion = false,
    settled = false,
    activationKey,
    fixedProgress,
    onProximityChange,
  }: StickyStoryProgressOptions,
) {
  const callbackRef = useRef(onProgress);
  callbackRef.current = onProgress;
  const proximityCallbackRef = useRef(onProximityChange);
  proximityCallbackRef.current = onProximityChange;
  const schedulesLayerHydration = onProximityChange !== undefined;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const fixed = reducedMotion || settled || fixedProgress !== undefined;

    if (reducedMotion || settled) {
      callbackRef.current(1);
    } else if (fixedProgress !== undefined) {
      callbackRef.current(clampProgress(fixedProgress));
    }

    return stickyStoryScheduler.register(element, {
      onProgress: fixed
        ? undefined
        : (progress) => callbackRef.current(progress),
      onProximityChange: schedulesLayerHydration
        ? (near) => proximityCallbackRef.current?.(near)
        : undefined,
    });
  }, [
    activationKey,
    fixedProgress,
    reducedMotion,
    ref,
    schedulesLayerHydration,
    settled,
  ]);
}
