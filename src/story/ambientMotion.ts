export interface MotionSample {
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

export interface AmbientLayerMotion {
  /** One-sided idle excursion. Peak-to-peak idle travel is twice this value. */
  xAmplitude: number;
  yAmplitude: number;
  rotateAmplitude: number;
  scaleAmplitude: number;
  durationSeconds: number;
  delaySeconds: number;
  enabled: boolean;
}

function channelSpan(
  samples: readonly MotionSample[],
  channel: keyof MotionSample,
) {
  const values = samples.map((sample) => sample[channel]);
  return Math.max(...values) - Math.min(...values);
}

/**
 * Idle motion uses half of a layer's scroll envelope. Because the animation
 * travels from -amplitude to +amplitude, each one-sided amplitude is a quarter
 * of the complete scroll span.
 */
export function ambientMotionFromSamples(
  samples: readonly MotionSample[],
  depth: number,
  layerIndex: number,
): AmbientLayerMotion {
  if (samples.length === 0) {
    return {
      xAmplitude: 0,
      yAmplitude: 0,
      rotateAmplitude: 0,
      scaleAmplitude: 0,
      durationSeconds: 0,
      delaySeconds: 0,
      enabled: false,
    };
  }

  const xAmplitude = channelSpan(samples, "x") / 4;
  const yAmplitude = channelSpan(samples, "y") / 4;
  const rotateAmplitude = channelSpan(samples, "rotate") / 4;
  const scaleAmplitude = channelSpan(samples, "scale") / 4;
  const safeDepth = Math.min(1, Math.max(0, depth));
  const durationSeconds = Number(
    (11.3 + (layerIndex % 3) * 3.4 + safeDepth * 0.8).toFixed(3),
  );
  // A positive, short stagger keeps the paused/initial frame at the exact
  // authored pose. Negative delays would place a paused animation midway
  // through its cycle and make an atomic poster handoff visibly jump.
  const delaySeconds = Number(
    ((layerIndex % 3) * 0.28 + safeDepth * 0.12).toFixed(3),
  );
  const enabled =
    xAmplitude > Number.EPSILON ||
    yAmplitude > Number.EPSILON ||
    rotateAmplitude > Number.EPSILON ||
    scaleAmplitude > Number.EPSILON;

  return {
    xAmplitude,
    yAmplitude,
    rotateAmplitude,
    scaleAmplitude,
    durationSeconds,
    delaySeconds,
    enabled,
  };
}
