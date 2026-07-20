export { TheatreProvider, useTheatre } from "./context";
export type {
  GraphicsStatus,
  SceneIntent,
  SceneIntentValue,
  TheatreController,
  TheatrePointer,
  TheatreProviderProps,
  TheatreQuality,
  TheatreSceneFacade,
  TheatreSnapshot,
} from "./types";

import { useCallback, useMemo } from "react";
import { useTheatre } from "./context";
import type { SceneIntent, TheatreSceneFacade } from "./types";

/** Stable shell-facing facade. A scalar intent is written to `amount`; richer
 * chapter forms may pass a complete SceneIntent record. */
export function useTheatreScene(): TheatreSceneFacade {
  const theatre = useTheatre();
  const {
    activateScene,
    patchIntent,
    resetIntent,
    setIntent: setIntentRecord,
    setProgress,
    setSceneVisible,
    setSettled,
  } = theatre;
  const setScene = useCallback(
    (scene: Parameters<typeof activateScene>[0]) =>
      activateScene(scene, { settled: false }),
    [activateScene],
  );
  const setIntent = useCallback(
    (intent: number | SceneIntent) => {
      if (typeof intent === "number") {
        patchIntent({ amount: Math.min(1, Math.max(0, intent)) });
      } else {
        setIntentRecord(intent);
      }
    },
    [patchIntent, setIntentRecord],
  );
  const reset = useCallback(() => {
    resetIntent();
    setProgress(0);
    setSettled(false);
  }, [resetIntent, setProgress, setSettled]);
  const settle = useCallback(
    (settled = true) => setSettled(settled),
    [setSettled],
  );

  return useMemo(
    () => ({
      scene: theatre.scene,
      sceneVisible: theatre.sceneVisible,
      progress: theatre.progress,
      intent: theatre.intent,
      reducedMotion: theatre.reducedMotion,
      settled: theatre.settled,
      setScene,
      setVisible: setSceneVisible,
      setProgress,
      setIntent,
      patchIntent,
      reset,
      settle,
    }),
    [
      reset,
      setIntent,
      setScene,
      setSceneVisible,
      settle,
      theatre.intent,
      patchIntent,
      theatre.progress,
      theatre.reducedMotion,
      theatre.scene,
      theatre.sceneVisible,
      theatre.settled,
      setProgress,
    ],
  );
}
