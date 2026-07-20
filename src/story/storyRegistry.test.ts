import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { MechanismId } from "../types";
import { storyForMechanism, storyRegistry } from "./storyRegistry";

const mechanisms = [
  "map-sky",
  "metric-veil",
  "question-fold",
  "map-wall",
  "provisional-form",
  "ground-supports",
  "compass",
  "keeper-table",
  "living-map",
  "wind",
  "adoption-folds",
  "candidate-map",
  "return-threshold",
  "honest-mode-rail",
  "ground-or-gravity",
  "return-tray",
  "refusal-brace",
  "open-binding",
  "equal-lenses",
  "template-hinge",
  "cycle-sheet",
  "climate-tabs",
  "open-sky",
  "open-horizon",
] as const satisfies readonly MechanismId[];

const physicalRevealOrder = {
  "adoption-folds": ["secondary", "primary", "secondary"],
  "candidate-map": ["primary", "atmosphere", "secondary"],
  "return-threshold": ["primary", "secondary", "secondary"],
  "honest-mode-rail": ["primary", "secondary", "secondary"],
  "ground-or-gravity": ["primary", "secondary", "primary"],
  "equal-lenses": ["primary", "secondary", "primary"],
  "open-horizon": ["atmosphere", "primary", "secondary"],
} as const;

const expansionInlineBeats = {
  "adoption-folds": "adoption-folds-one-form-changes",
  "candidate-map": "candidate-map-map-among-maps",
  "return-threshold": "return-threshold-return-is-held",
  "honest-mode-rail": "honest-mode-rail-all-modes-land",
  "ground-or-gravity": "ground-or-gravity-labels-lift",
  "equal-lenses": "equal-lenses-weight-equalises",
  "open-horizon": "open-horizon-many-states-remain",
} as const;

function physicalVector(
  state: Readonly<{
    x?: number;
    y?: number;
    scale?: number;
    rotate?: number;
  }> | undefined,
) {
  return [state?.x ?? 0, state?.y ?? 0, state?.scale ?? 1, state?.rotate ?? 0];
}

describe("raster story registry", () => {
  it("covers every mechanism exactly once", () => {
    expect(Object.keys(storyRegistry).sort()).toEqual([...mechanisms].sort());

    for (const mechanism of mechanisms) {
      expect(storyForMechanism(mechanism)).toBe(storyRegistry[mechanism]);
      expect(storyRegistry[mechanism].mechanism).toBe(mechanism);
    }
  });

  it("uses real local raster assets for every poster and layer", () => {
    const paths = new Set<string>();

    for (const story of Object.values(storyRegistry)) {
      expect(story.poster).toMatch(
        /^\/scenes\/(?:master|home|M\d{2}|AI\d{2}|P\d{2}|A\d{2}|ATLAS\d{2}|FINAL\d{2})\.webp$/,
      );
      expect(story.ariaLabel.trim().length).toBeGreaterThan(24);
      expect(story.aspectRatio).toBeCloseTo(1672 / 941, 6);
      expect(story.scrollLengthVh).toBeGreaterThanOrEqual(240);
      expect(story.layers.length).toBeGreaterThan(0);
      expect(story.posterMobileSrc).toMatch(/-960\.webp$/);

      paths.add(story.poster);
      paths.add(story.posterMobileSrc!);
      for (const layer of story.layers) {
        expect(layer.src).toMatch(/^\/(?:parallax|scenes)\/.+\.(?:png|webp)$/);
        expect(layer.mobileSrc).toMatch(/-960\.webp$/);
        expect(layer.depth).toBeGreaterThanOrEqual(0);
        expect(layer.depth).toBeLessThanOrEqual(1);
        paths.add(layer.src);
        paths.add(layer.mobileSrc!);
      }
    }

    for (const assetPath of paths) {
      expect(
        existsSync(join(process.cwd(), "public", assetPath.slice(1))),
        `${assetPath} should exist under public/`,
      ).toBe(true);
    }
  });

  it("decomposes the home artwork into the approved full-artboard layers", () => {
    expect(storyRegistry["map-sky"].poster).toBe("/scenes/master.webp");
    expect(storyRegistry["map-sky"].layers.map((layer) => layer.src)).toEqual([
      "/parallax/home/background-master.png",
      "/parallax/home/wind.png",
      "/parallax/home/sky-objects.png",
      "/parallax/home/sky-objects.png",
      "/parallax/home/boat.png",
      "/parallax/home/pinwheel.png",
      "/parallax/home/explorer.png",
      "/parallax/home/banner.png",
    ]);
    expect(storyRegistry["map-sky"].scrollLengthVh).toBe(480);
    expect(storyRegistry["map-sky"].scrollParallaxStrength).toBe(1.5);
    expect(storyRegistry["map-sky"].pointerParallaxStrength).toBe(1.5);
  });

  it("uses the purpose-authored responsive AI-02 pack for adoption folds", () => {
    const story = storyRegistry["adoption-folds"];

    expect(story.poster).toBe("/scenes/AI02.webp");
    expect(story.posterMobileSrc).toBe("/scenes/AI02-960.webp");
    expect(story.posterSrcSet).toBe(
      "/scenes/AI02-960.webp 960w, /scenes/AI02.webp 1672w",
    );
    expect(story.layers.map((layer) => layer.src)).toEqual([
      "/parallax/AI02/background.webp",
      "/parallax/AI02/secondary.webp",
      "/parallax/AI02/primary.webp",
    ]);
    expect(story.layers.every((layer) => layer.srcSet?.includes("-960.webp 960w")))
      .toBe(true);
    expect(story.layers.every((layer) => layer.mobileSrc?.endsWith("-960.webp")))
      .toBe(true);
    expect(story.beats.map((beat) => beat.id)).toEqual([
      "adoption-folds-note-waits",
      "adoption-folds-forms-arrive",
      "adoption-folds-four-folds-open",
      "adoption-folds-one-form-changes",
      "adoption-folds-candidates-land",
    ]);
    expect(story.scrollLengthVh).toBe(260);

    const responsiveAssets = [
      "/scenes/AI02-960.webp",
      ...story.layers.flatMap((layer) =>
        layer.srcSet
          ? layer.srcSet.split(", ").map((candidate) => candidate.split(" ")[0])
          : [],
      ),
    ];
    for (const assetPath of responsiveAssets) {
      expect(existsSync(join(process.cwd(), "public", assetPath.slice(1))))
        .toBe(true);
    }
  });

  it("registers the six new responsive packs with their authored stacking", () => {
    const expected = {
      "candidate-map": {
        poster: "AI03",
        layers: ["background", "atmosphere", "secondary", "primary"],
      },
      "return-threshold": {
        poster: "AI04",
        layers: ["background", "primary", "secondary"],
      },
      "honest-mode-rail": {
        poster: "P01",
        layers: ["background", "secondary", "primary"],
      },
      "ground-or-gravity": {
        poster: "A01",
        layers: ["background", "primary", "secondary"],
      },
      "equal-lenses": {
        poster: "ATLAS01",
        layers: ["background", "primary", "secondary"],
      },
      "open-horizon": {
        poster: "FINAL01",
        layers: ["background", "primary", "atmosphere", "secondary"],
      },
    } as const;

    for (const [mechanism, contract] of Object.entries(expected)) {
      const story = storyRegistry[mechanism as keyof typeof expected];
      expect(story.poster).toBe(`/scenes/${contract.poster}.webp`);
      expect(story.posterMobileSrc).toBe(
        `/scenes/${contract.poster}-960.webp`,
      );
      expect(story.posterSrcSet).toBe(
        `/scenes/${contract.poster}-960.webp 960w, /scenes/${contract.poster}.webp 1672w`,
      );
      expect(story.layers.map((layer) => layer.src)).toEqual(
        contract.layers.map(
          (layer) => `/parallax/${contract.poster}/${layer}.webp`,
        ),
      );
      expect(story.layers.every((layer) =>
        layer.srcSet?.includes(`${layer.src.replace(".webp", "-960.webp")} 960w`),
      )).toBe(true);
      expect(story.beats).toHaveLength(5);
      expect(story.beats.at(-1)?.offset).toBe(1);
      expect(story.scrollLengthVh).toBe(
        mechanism === "open-horizon" ? 380 : 260,
      );
      for (const state of Object.values(story.beats.at(-1)?.layers ?? {})) {
        expect(state).toEqual({
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
        });
      }
    }

    expect(storyRegistry["open-horizon"].scrollLengthVh).toBe(380);
  });

  it("reserves code-native editorial copy positions for every expansion spread", () => {
    expect({
      "adoption-folds": storyRegistry["adoption-folds"].editorialCopyLayout,
      "candidate-map": storyRegistry["candidate-map"].editorialCopyLayout,
      "return-threshold": storyRegistry["return-threshold"].editorialCopyLayout,
      "honest-mode-rail": storyRegistry["honest-mode-rail"].editorialCopyLayout,
      "ground-or-gravity": storyRegistry["ground-or-gravity"].editorialCopyLayout,
      "equal-lenses": storyRegistry["equal-lenses"].editorialCopyLayout,
      "open-horizon": storyRegistry["open-horizon"].editorialCopyLayout,
    }).toEqual({
      "adoption-folds": "sky-left",
      "candidate-map": "paper-left",
      "return-threshold": "vellum-left",
      "honest-mode-rail": "sky-left",
      "ground-or-gravity": "sky-left",
      "equal-lenses": "paper-left",
      "open-horizon": "horizon-left",
    });

    expect(
      storyRegistry["open-horizon"].beats.at(-1)?.narration,
    ).toBe("We have not forgotten how to fly. The Sky is still here.");
    expect(storyRegistry["equal-lenses"].editorialNarrationLayout).toBe(
      "card",
    );
    expect(storyRegistry["ground-or-gravity"].editorialCopyLayerId).toBe(
      "ground-or-gravity-primary",
    );
  });

  it("keeps every new paper plane materially present and reveals motion in sequence", () => {
    for (const [mechanism, expectedOrder] of Object.entries(
      physicalRevealOrder,
    )) {
      const story = storyRegistry[mechanism as keyof typeof physicalRevealOrder];

      // The initial live stack is the complete poster pose. Readiness can
      // switch atomically without a loading flash or a dissolved object.
      for (const layer of story.layers) {
        expect(story.beats[0].layers?.[layer.id]).toEqual({
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
        });
      }

      for (const beat of story.beats) {
        for (const layer of story.layers) {
          expect(
            beat.layers?.[layer.id]?.opacity,
            `${mechanism}/${beat.id}/${layer.id} must not alpha-materialise`,
          ).toBe(1);
        }
      }

      const materialIds = story.layers
        .map((layer) => layer.id)
        .filter((layerId) => !layerId.endsWith("-background"));

      const actualOrder = story.beats.slice(0, 3).map((beat, index) => {
        const next = story.beats[index + 1];
        const changed = materialIds.filter(
          (layerId) =>
            JSON.stringify(physicalVector(beat.layers?.[layerId])) !==
            JSON.stringify(physicalVector(next.layers?.[layerId])),
        );
        expect(
          changed,
          `${mechanism} beat ${index + 1} should move one paper plane`,
        ).toHaveLength(1);
        return changed[0].replace(`${mechanism}-`, "");
      });

      expect(actualOrder).toEqual(expectedOrder);
    }
  });

  it("gives every expansion scene an exact authored inline/mobile beat", () => {
    for (const [mechanism, beatId] of Object.entries(expansionInlineBeats)) {
      const story = storyRegistry[mechanism as keyof typeof expansionInlineBeats];
      const authoredBeat = story.beats.find((beat) => beat.id === beatId);

      expect(authoredBeat, `${mechanism} should include ${beatId}`).toBeDefined();
      expect(story.inlineProgress).toBe(authoredBeat?.offset);
      expect(story.beats.some((beat) => beat.offset === story.inlineProgress))
        .toBe(true);
    }
  });

  it("uses an atomic poster-to-layer handoff rather than a material crossfade", () => {
    const css = readFileSync(
      join(process.cwd(), "src/story/parallax-stage.css"),
      "utf8",
    );

    expect(css).toMatch(
      /\.parallax-story__poster\s*\{[^}]*transition:\s*none;/,
    );
    expect(css).toMatch(
      /\.parallax-story__layers\s*\{[^}]*transition:\s*none;/,
    );
    expect(css).not.toMatch(
      /\.parallax-story__(?:poster|layers)\s*\{[^}]*transition:\s*opacity/,
    );
  });

  it("gives the Atlas ten equal windows without a selected route", () => {
    const story = storyRegistry["equal-lenses"];

    expect(story.ariaLabel).toContain("ten equally weighted windows");
    expect(story.ariaLabel).toContain("None is higher, brighter, preselected");
    expect(story.beats.map((beat) => beat.id)).toEqual([
      "equal-lenses-one-sheet-rests",
      "equal-lenses-first-fold-opens",
      "equal-lenses-windows-multiply",
      "equal-lenses-weight-equalises",
      "equal-lenses-atlas-remains-open",
    ]);
    const mobilePose = story.beats.find(
      (beat) => beat.id === "equal-lenses-windows-multiply",
    );
    expect(mobilePose?.layers?.["equal-lenses-primary"]?.opacity).toBe(1);
    expect(mobilePose?.layers?.["equal-lenses-secondary"]?.opacity).toBe(1);
  });

  it("provides four to six ordered, bounded story beats per mechanism", () => {
    for (const story of Object.values(storyRegistry)) {
      const offsets = story.beats.map((beat) => beat.offset);

      expect(story.beats.length).toBeGreaterThanOrEqual(4);
      expect(story.beats.length).toBeLessThanOrEqual(6);
      expect(offsets[0]).toBe(0);
      expect(offsets.at(-1)).toBe(1);
      expect(offsets).toEqual([...offsets].sort((a, b) => a - b));
      expect(offsets.every((offset) => offset >= 0 && offset <= 1)).toBe(true);

      for (let index = 1; index < offsets.length; index += 1) {
        expect(offsets[index]).toBeGreaterThan(offsets[index - 1]);
      }
    }
  });

  it("keeps layer and beat identifiers globally unique and states well formed", () => {
    const layerIds = new Set<string>();
    const beatIds = new Set<string>();

    for (const story of Object.values(storyRegistry)) {
      const localLayerIds = new Set(story.layers.map((layer) => layer.id));
      expect(localLayerIds.size).toBe(story.layers.length);

      for (const layerId of localLayerIds) {
        expect(layerIds.has(layerId), `duplicate layer id: ${layerId}`).toBe(false);
        layerIds.add(layerId);
      }

      for (const beat of story.beats) {
        expect(beatIds.has(beat.id), `duplicate beat id: ${beat.id}`).toBe(false);
        beatIds.add(beat.id);
        expect(beat.label?.trim().length).toBeGreaterThan(2);
        expect(beat.narration?.trim().length).toBeGreaterThan(24);

        for (const [layerId, state] of Object.entries(beat.layers ?? {})) {
          expect(localLayerIds.has(layerId), `${beat.id} references ${layerId}`).toBe(true);
          expect(Object.values(state).every(Number.isFinite)).toBe(true);
          expect(state.scale).toBeGreaterThan(0);
          expect(state.opacity).toBeGreaterThanOrEqual(0);
          expect(state.opacity).toBeLessThanOrEqual(1);
        }
      }
    }
  });

  it("gives each mechanism a distinct semantic progression without WebGL data", () => {
    const semanticSignatures = Object.values(storyRegistry).map((story) =>
      story.beats.map((beat) => `${beat.label}:${beat.narration}`).join("|"),
    );

    expect(new Set(semanticSignatures).size).toBe(mechanisms.length);
    expect(JSON.stringify(storyRegistry)).not.toMatch(/three|webgl|canvas/i);
  });
});
