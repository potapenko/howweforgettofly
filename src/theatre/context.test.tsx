// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { SceneDefinition } from "../types";
import { TheatreProvider, useTheatre, useTheatreScene } from "./index";

const mapScene: SceneDefinition = {
  id: "test-map",
  kind: "manifesto",
  register: "atlas",
  mechanism: "map-wall",
  title: "A map is not the sky",
  plainMeaning: "A useful route still has edges.",
  description: "A map folds down beside an open view.",
};

const windScene: SceneDefinition = {
  id: "test-wind",
  kind: "route",
  register: "atlas",
  mechanism: "wind",
  title: "Set the Wind",
  plainMeaning: "A tool can expand options without choosing direction.",
  description: "Vellum planes move around a fixed human note.",
};

function Probe() {
  const theatre = useTheatre();
  const scene = useTheatreScene();
  return (
    <div>
      <button type="button" onClick={() => scene.setScene(mapScene)}>
        map
      </button>
      <button type="button" onClick={() => scene.setScene(windScene)}>
        wind
      </button>
      <button type="button" onClick={() => theatre.setSceneVisible(false)}>
        hide scene
      </button>
      <button type="button" onClick={() => scene.setIntent(1.7)}>
        scalar
      </button>
      <button type="button" onClick={() => scene.patchIntent({ role: "critic" })}>
        role
      </button>
      <button type="button" onClick={() => scene.setProgress(-0.4)}>
        progress
      </button>
      <button type="button" onClick={() => scene.settle()}>
        settle
      </button>
      <button type="button" onClick={() => scene.reset()}>
        reset
      </button>
      <output data-testid="scene">{theatre.scene?.id ?? "none"}</output>
      <output data-testid="progress">{theatre.progress}</output>
      <output data-testid="intent">{JSON.stringify(theatre.intent)}</output>
      <output data-testid="settled">{String(theatre.settled)}</output>
      <output data-testid="motion">{String(theatre.reducedMotion)}</output>
      <output data-testid="visible">{String(theatre.sceneVisible)}</output>
    </div>
  );
}

afterEach(cleanup);

describe("theatre controller", () => {
  it("marks an activated scene visible and supports explicitly hiding it", () => {
    render(
      <TheatreProvider initialReducedMotion>
        <Probe />
      </TheatreProvider>,
    );

    expect(screen.getByTestId("visible")).toHaveTextContent("false");
    fireEvent.click(screen.getByText("map"));
    expect(screen.getByTestId("visible")).toHaveTextContent("true");
    fireEvent.click(screen.getByText("hide scene"));
    expect(screen.getByTestId("visible")).toHaveTextContent("false");
  });

  it("clamps scalar inputs, clears scene-local intent, and supports a quiet reset", () => {
    render(
      <TheatreProvider quietView>
        <Probe />
      </TheatreProvider>,
    );

    expect(screen.getByTestId("motion")).toHaveTextContent("true");
    fireEvent.click(screen.getByText("map"));
    fireEvent.click(screen.getByText("scalar"));
    fireEvent.click(screen.getByText("role"));
    expect(screen.getByTestId("intent")).toHaveTextContent(
      JSON.stringify({ amount: 1, role: "critic" }),
    );

    fireEvent.click(screen.getByText("wind"));
    expect(screen.getByTestId("scene")).toHaveTextContent("test-wind");
    expect(screen.getByTestId("intent")).toHaveTextContent("{}");

    fireEvent.click(screen.getByText("progress"));
    expect(screen.getByTestId("progress")).toHaveTextContent("0");
    fireEvent.click(screen.getByText("settle"));
    expect(screen.getByTestId("settled")).toHaveTextContent("true");
    fireEvent.click(screen.getByText("reset"));
    expect(screen.getByTestId("settled")).toHaveTextContent("false");
  });
});
