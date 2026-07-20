import type { MutableRefObject, ReactNode } from "react";
import type { SceneDefinition } from "../types";

export type TheatreQuality = "low" | "balanced" | "high";
export type GraphicsStatus = "checking" | "ready" | "lost" | "failed";

export type SceneIntentValue =
  | string
  | number
  | boolean
  | readonly string[]
  | null
  | undefined;

export type SceneIntent = Readonly<Record<string, SceneIntentValue>>;

export interface TheatrePointer {
  x: number;
  y: number;
}

export interface TheatreSnapshot {
  scene: SceneDefinition | null;
  sceneVisible: boolean;
  progress: number;
  intent: SceneIntent;
  reducedMotion: boolean;
  settled: boolean;
  quality: TheatreQuality;
  graphicsStatus: GraphicsStatus;
  description: string;
}

export interface TheatreController extends TheatreSnapshot {
  pointerRef: MutableRefObject<TheatrePointer>;
  activateScene: (
    scene: SceneDefinition,
    options?: {
      progress?: number;
      intent?: SceneIntent;
      description?: string;
      settled?: boolean;
    },
  ) => void;
  setSceneVisible: (visible: boolean) => void;
  setProgress: (progress: number) => void;
  setIntent: (intent: SceneIntent) => void;
  patchIntent: (intent: SceneIntent) => void;
  resetIntent: () => void;
  setReducedMotion: (reduced: boolean) => void;
  setSettled: (settled: boolean) => void;
  setQuality: (quality: TheatreQuality) => void;
  setDescription: (description: string) => void;
  setPointer: (pointer: TheatrePointer) => void;
  setGraphicsStatus: (status: GraphicsStatus) => void;
  requestRender: () => void;
  registerInvalidator: (invalidate: (() => void) | null) => void;
}

export interface TheatreProviderProps {
  children: ReactNode;
  quietView?: boolean;
  initialScene?: SceneDefinition;
  initialReducedMotion?: boolean;
  initialQuality?: TheatreQuality;
}

export interface TheatreSceneFacade {
  scene: SceneDefinition | null;
  sceneVisible: boolean;
  progress: number;
  intent: SceneIntent;
  reducedMotion: boolean;
  settled: boolean;
  setScene: (scene: SceneDefinition) => void;
  setVisible: (visible: boolean) => void;
  setProgress: (progress: number) => void;
  setIntent: (intent: number | SceneIntent) => void;
  patchIntent: (intent: SceneIntent) => void;
  reset: () => void;
  settle: (settled?: boolean) => void;
}
