import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { SceneDefinition } from "../types";
import type {
  GraphicsStatus,
  SceneIntent,
  TheatreController,
  TheatrePointer,
  TheatreProviderProps,
  TheatreQuality,
} from "./types";

const TheatreContext = createContext<TheatreController | null>(null);

const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

function inferReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

function inferQuality(): TheatreQuality {
  if (typeof window === "undefined") return "balanced";
  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  const constrained =
    window.innerWidth < 720 ||
    (typeof memory === "number" && memory <= 4) ||
    navigator.maxTouchPoints > 1;
  if (constrained) return "low";
  if (window.devicePixelRatio > 1.5 && window.innerWidth > 1280) return "high";
  return "balanced";
}

function describe(scene: SceneDefinition | null) {
  if (!scene) return "The paper theatre is waiting for a chapter.";
  return `${scene.title}. ${scene.plainMeaning} ${scene.description}`.trim();
}

export function TheatreProvider({
  children,
  quietView,
  initialScene,
  initialReducedMotion,
  initialQuality,
}: TheatreProviderProps) {
  const [scene, setScene] = useState<SceneDefinition | null>(initialScene ?? null);
  const [sceneVisible, setSceneVisibleState] = useState(Boolean(initialScene));
  const [progress, setProgressState] = useState(0);
  const [intent, setIntentState] = useState<SceneIntent>({});
  const [reducedMotion, setReducedMotion] = useState(
    quietView ?? initialReducedMotion ?? inferReducedMotion,
  );
  const [settled, setSettled] = useState(false);
  const [quality, setQuality] = useState<TheatreQuality>(
    initialQuality ?? inferQuality,
  );
  const [graphicsStatus, setGraphicsStatus] =
    useState<GraphicsStatus>("checking");
  const [description, setDescriptionState] = useState(() =>
    describe(initialScene ?? null),
  );
  const pointerRef = useRef<TheatrePointer>({ x: 0, y: 0 });
  const invalidatorRef = useRef<(() => void) | null>(null);
  const sceneRef = useRef<SceneDefinition | null>(initialScene ?? null);

  const requestRender = useCallback(() => {
    invalidatorRef.current?.();
  }, []);

  // `quietView` is the shell-level reading-only/motionless switch. Keep it
  // authoritative after mount while still allowing an in-product motion
  // preference when the prop is omitted.
  useEffect(() => {
    if (quietView !== undefined) setReducedMotion(quietView);
  }, [quietView]);

  useEffect(() => {
    if (initialQuality !== undefined || typeof window === "undefined") return;
    let frame: number | null = null;
    const updateQuality = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = null;
        setQuality(inferQuality());
        requestRender();
      });
    };
    window.addEventListener("resize", updateQuality, { passive: true });
    window.addEventListener("orientationchange", updateQuality, { passive: true });
    return () => {
      window.removeEventListener("resize", updateQuality);
      window.removeEventListener("orientationchange", updateQuality);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [initialQuality, requestRender]);

  const registerInvalidator = useCallback((invalidate: (() => void) | null) => {
    invalidatorRef.current = invalidate;
  }, []);

  const activateScene = useCallback(
    (
      nextScene: SceneDefinition,
      options?: {
        progress?: number;
        intent?: SceneIntent;
        description?: string;
        settled?: boolean;
      },
    ) => {
      const changedScene = sceneRef.current?.id !== nextScene.id;
      sceneRef.current = nextScene;
      setScene(nextScene);
      setSceneVisibleState(true);
      if (options?.progress !== undefined) {
        setProgressState(clampProgress(options.progress));
      } else if (changedScene) setProgressState(0);
      if (options?.intent !== undefined) setIntentState(options.intent);
      else if (changedScene) setIntentState({});
      if (options?.settled !== undefined) setSettled(options.settled);
      setDescriptionState(options?.description ?? describe(nextScene));
      requestRender();
    },
    [requestRender],
  );

  const setSceneVisible = useCallback(
    (visible: boolean) => {
      setSceneVisibleState(visible);
      if (!visible) pointerRef.current = { x: 0, y: 0 };
      requestRender();
    },
    [requestRender],
  );

  const setProgress = useCallback(
    (next: number) => {
      const clamped = clampProgress(next);
      setProgressState((current) =>
        Math.abs(current - clamped) < 0.0015 ? current : clamped,
      );
      requestRender();
    },
    [requestRender],
  );

  const setIntent = useCallback(
    (next: SceneIntent) => {
      setIntentState(next);
      requestRender();
    },
    [requestRender],
  );

  const patchIntent = useCallback(
    (next: SceneIntent) => {
      setIntentState((current) => ({ ...current, ...next }));
      requestRender();
    },
    [requestRender],
  );

  const resetIntent = useCallback(() => {
    setIntentState({});
    requestRender();
  }, [requestRender]);

  const setDescription = useCallback((next: string) => {
    setDescriptionState(next);
  }, []);

  const setPointer = useCallback(
    (next: TheatrePointer) => {
      pointerRef.current = {
        x: Math.min(1, Math.max(-1, next.x)),
        y: Math.min(1, Math.max(-1, next.y)),
      };
      requestRender();
    },
    [requestRender],
  );

  const controller = useMemo<TheatreController>(
    () => ({
      scene,
      sceneVisible,
      progress,
      intent,
      reducedMotion,
      settled,
      quality,
      graphicsStatus,
      description,
      pointerRef,
      activateScene,
      setSceneVisible,
      setProgress,
      setIntent,
      patchIntent,
      resetIntent,
      setReducedMotion,
      setSettled,
      setQuality,
      setDescription,
      setPointer,
      setGraphicsStatus,
      requestRender,
      registerInvalidator,
    }),
    [
      activateScene,
      description,
      graphicsStatus,
      intent,
      patchIntent,
      progress,
      quality,
      reducedMotion,
      registerInvalidator,
      requestRender,
      resetIntent,
      scene,
      sceneVisible,
      setDescription,
      setIntent,
      setPointer,
      setProgress,
      setSceneVisible,
      settled,
    ],
  );

  return (
    <TheatreContext.Provider value={controller}>
      {children}
    </TheatreContext.Provider>
  );
}

export function useTheatre() {
  const context = useContext(TheatreContext);
  if (!context) {
    throw new Error("useTheatre must be used inside a TheatreProvider.");
  }
  return context;
}
