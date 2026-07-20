import { describe, expect, it } from "vitest";
import { storyRegistry } from "./storyRegistry";
import { ambientMotionFromSamples } from "./ambientMotion";

describe("ambientMotionFromSamples", () => {
  it("keeps idle peak-to-peak travel at half of the scroll envelope", () => {
    const motion = ambientMotionFromSamples(
      [
        { x: 0, y: 0, rotate: 0, scale: 1 },
        { x: 10, y: -4, rotate: 3, scale: 1 },
      ],
      1,
      1,
    );

    expect(motion.xAmplitude * 2).toBe(5);
    expect(motion.yAmplitude * 2).toBe(2);
    expect(motion.rotateAmplitude * 2).toBe(1.5);
    expect(motion.scaleAmplitude).toBe(0);
    expect(motion.enabled).toBe(true);
  });

  it("leaves a zero-envelope ground layer still", () => {
    const motion = ambientMotionFromSamples(
      [
        { x: 0, y: 0, rotate: 0, scale: 1 },
        { x: 0, y: 0, rotate: 0, scale: 1 },
      ],
      0,
      0,
    );

    expect(motion).toMatchObject({
      xAmplitude: 0,
      yAmplitude: 0,
      rotateAmplitude: 0,
      scaleAmplitude: 0,
      enabled: false,
    });
  });

  it("assigns deterministic staggered timing without changing the envelope", () => {
    const samples = [
      { x: -2, y: 1, rotate: -0.5, scale: 0.99 },
      { x: 2, y: -1, rotate: 0.5, scale: 1.01 },
    ];
    const first = ambientMotionFromSamples(samples, 0.4, 1);
    const repeated = ambientMotionFromSamples(samples, 0.4, 1);
    const next = ambientMotionFromSamples(samples, 0.8, 2);

    expect(repeated).toEqual(first);
    expect(next.durationSeconds).not.toBe(first.durationSeconds);
    expect(next.delaySeconds).not.toBe(first.delaySeconds);
    expect(first.delaySeconds).toBeGreaterThanOrEqual(0);
    expect(next.delaySeconds).toBeGreaterThanOrEqual(0);
    expect(Object.values(first).every((value) =>
      typeof value === "boolean" || Number.isFinite(value),
    )).toBe(true);
  });

  it("keeps at least one paper plane breathing in every illustration", () => {
    for (const story of Object.values(storyRegistry)) {
      const hasAmbientPlane = story.layers.some((layer, layerIndex) => {
        const samples = story.beats.map((beat) => {
          const state = beat.layers?.[layer.id];
          return {
            x: state?.x ?? 0,
            y: state?.y ?? 0,
            rotate: state?.rotate ?? 0,
            scale: state?.scale ?? 1,
          };
        });

        return ambientMotionFromSamples(
          samples,
          layer.depth,
          layerIndex,
        ).enabled;
      });

      expect(hasAmbientPlane, story.mechanism).toBe(true);
    }
  });
});
