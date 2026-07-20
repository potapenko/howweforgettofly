// @vitest-environment jsdom
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TheatreProvider, useTheatre } from "../theatre";
import type { SceneDefinition } from "../types";
import { SceneObserver } from "./SceneObserver";

interface TestIntersectionObserver {
  callback: IntersectionObserverCallback;
  disconnect: ReturnType<typeof vi.fn>;
  rootMargin: string;
}

const scene: SceneDefinition = {
  id: "scene-test",
  kind: "route",
  register: "quiet",
  mechanism: "adoption-folds",
  title: "Test scene",
  plainMeaning: "The active scene remains available to the reading shell.",
  description: "An open paper mechanism waits for a human choice.",
};

function rect(top: number, height: number): DOMRect {
  return {
    top,
    bottom: top + height,
    height,
    left: 0,
    right: 100,
    width: 100,
    x: 0,
    y: top,
    toJSON: () => ({}),
  } as DOMRect;
}

function TheatreState() {
  const theatre = useTheatre();
  return (
    <output
      data-testid="theatre-state"
      data-active-scene={theatre.scene?.id ?? "none"}
      data-progress={String(theatre.progress)}
      data-visible={String(theatre.sceneVisible)}
    />
  );
}

describe("SceneObserver", () => {
  let frames: Map<number, FrameRequestCallback>;
  let intersectionObservers: TestIntersectionObserver[];
  let nextFrame = 0;
  let storyTop = 0;

  const flushFrame = () => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback(0));
  };

  beforeEach(() => {
    frames = new Map();
    intersectionObservers = [];
    nextFrame = 0;
    storyTop = 0;
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        readonly root = null;
        readonly rootMargin: string;
        readonly thresholds: readonly number[];
        readonly callback: IntersectionObserverCallback;
        readonly disconnect = vi.fn();
        readonly observe = vi.fn();
        readonly takeRecords = vi.fn(() => []);
        readonly unobserve = vi.fn();

        constructor(
          callback: IntersectionObserverCallback,
          options: IntersectionObserverInit = {},
        ) {
          this.callback = callback;
          this.rootMargin = options.rootMargin ?? "0px";
          this.thresholds = Array.isArray(options.threshold)
            ? options.threshold
            : [options.threshold ?? 0];
          intersectionObservers.push(this);
        }
      },
    );
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      const id = ++nextFrame;
      frames.set(id, callback);
      return id;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => {
      frames.delete(id);
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function storyBounds(this: HTMLElement) {
        return this.dataset.storyMechanism
          ? rect(storyTop, 3000)
          : rect(0, 1000);
      },
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("keeps active-scene updates without publishing per-frame story progress", () => {
    const view = render(
      <TheatreProvider>
        <SceneObserver scene={scene}>
          <p>Readable chapter</p>
        </SceneObserver>
        <TheatreState />
      </TheatreProvider>,
    );
    const chapter = view.container.querySelector<HTMLElement>(
      '[data-scene="scene-test"]',
    )!;
    const story = view.container.querySelector<HTMLElement>(
      "[data-story-mechanism]",
    )!;
    const state = view.getByTestId("theatre-state");
    const editorialCopy = view.container.querySelector(
      "[data-story-editorial-copy]",
    );
    const activationObserver = intersectionObservers.find(
      ({ rootMargin }) => rootMargin === "-18% 0px -42%",
    )!;

    expect(chapter).toHaveAttribute("id", "scene-test-illustration");
    act(flushFrame);
    expect(story).toHaveAttribute("data-story-progress", "0.000");
    expect(state).toHaveAttribute("data-active-scene", "none");
    expect(editorialCopy).toHaveTextContent(scene.title);
    expect(editorialCopy).toHaveTextContent(scene.plainMeaning);

    act(() => {
      activationObserver.callback(
        [
          {
            isIntersecting: true,
            target: chapter,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });
    expect(state).toHaveAttribute("data-active-scene", scene.id);
    expect(state).toHaveAttribute("data-visible", "true");

    storyTop = -1000;
    act(() => {
      window.dispatchEvent(new Event("scroll"));
      flushFrame();
    });

    expect(story).toHaveAttribute("data-story-progress", "0.500");
    expect(state).toHaveAttribute("data-active-scene", scene.id);
    expect(state).toHaveAttribute("data-progress", "0");
  });

  it("keeps an explicit chapter id instead of replacing it with the illustration anchor", () => {
    const view = render(
      <TheatreProvider>
        <SceneObserver id="M01" scene={scene}>
          <p>Readable chapter</p>
        </SceneObserver>
      </TheatreProvider>,
    );

    expect(
      view.container.querySelector<HTMLElement>(
        '[data-scene="scene-test"]',
      ),
    ).toHaveAttribute("id", "M01");
    expect(view.container.querySelector("#scene-test-illustration")).toBeNull();
  });
});
