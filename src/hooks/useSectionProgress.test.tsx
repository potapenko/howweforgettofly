// @vitest-environment jsdom
import { act, render } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSectionProgress } from "./useSectionProgress";

type RectShape = Pick<DOMRect, "top" | "bottom" | "height">;

function makeRect({ top, bottom, height }: RectShape): DOMRect {
  return {
    top,
    bottom,
    height,
    left: 0,
    right: 100,
    width: 100,
    x: 0,
    y: top,
    toJSON: () => ({}),
  } as DOMRect;
}

interface HarnessProps {
  onProgress: (progress: number) => void;
  onActive?: () => void;
  onInactive?: () => void;
  activationKey?: string;
}

function Harness({
  onProgress,
  onActive,
  onInactive,
  activationKey,
}: HarnessProps) {
  const ref = useRef<HTMLDivElement>(null);
  useSectionProgress(ref, {
    onProgress,
    onActive,
    onInactive,
    activationKey,
  });
  return <div data-testid="section" ref={ref} />;
}

describe("useSectionProgress", () => {
  let nextFrameId = 0;
  let frames: Map<number, FrameRequestCallback>;

  const flushAnimationFrame = () => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback(0));
  };

  beforeEach(() => {
    frames = new Map();
    nextFrameId = 0;
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 1000,
    });
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      const id = ++nextFrameId;
      frames.set(id, callback);
      return id;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => {
      frames.delete(id);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("activates an intersecting section, emits progress, and becomes inactive offscreen", () => {
    const onActive = vi.fn();
    const onInactive = vi.fn();
    const onProgress = vi.fn();
    let rect = makeRect({ top: 100, bottom: 500, height: 400 });

    const view = render(
      <Harness
        onActive={onActive}
        onInactive={onInactive}
        onProgress={onProgress}
      />,
    );
    vi.spyOn(
      view.getByTestId("section"),
      "getBoundingClientRect",
    ).mockImplementation(() => rect);

    act(flushAnimationFrame);

    expect(onActive).toHaveBeenCalledTimes(1);
    expect(onProgress).toHaveBeenCalledTimes(1);
    expect(onProgress).toHaveBeenLastCalledWith(580 / 650);

    rect = makeRect({ top: 1100, bottom: 1500, height: 400 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
      flushAnimationFrame();
    });

    expect(onInactive).toHaveBeenCalledTimes(1);
    expect(onProgress).toHaveBeenCalledTimes(1);

    view.unmount();
  });

  it("removes shared listeners and cancels a pending frame after the last section unmounts", () => {
    const addListener = vi.spyOn(window, "addEventListener");
    const removeListener = vi.spyOn(window, "removeEventListener");
    const cancelFrame = vi.spyOn(window, "cancelAnimationFrame");
    const view = render(<Harness onProgress={vi.fn()} />);
    const pendingFrame = nextFrameId;
    const scrollHandler = addListener.mock.calls.find(
      ([event]) => event === "scroll",
    )?.[1];
    const resizeHandler = addListener.mock.calls.find(
      ([event]) => event === "resize",
    )?.[1];

    expect(scrollHandler).toBeTypeOf("function");
    expect(resizeHandler).toBeTypeOf("function");
    expect(frames.has(pendingFrame)).toBe(true);

    view.unmount();

    expect(removeListener).toHaveBeenCalledWith("scroll", scrollHandler);
    expect(removeListener).toHaveBeenCalledWith("resize", resizeHandler);
    expect(cancelFrame).toHaveBeenCalledWith(pendingFrame);
    expect(frames.size).toBe(0);
  });

  it("re-registers and re-activates a visible section when its semantic key changes", () => {
    const firstActive = vi.fn();
    const secondActive = vi.fn();
    const onProgress = vi.fn();
    const rect = makeRect({ top: 100, bottom: 500, height: 400 });
    const view = render(
      <Harness
        activationKey="scene-a"
        onActive={firstActive}
        onProgress={onProgress}
      />,
    );
    vi.spyOn(view.getByTestId("section"), "getBoundingClientRect").mockReturnValue(rect);
    act(flushAnimationFrame);
    expect(firstActive).toHaveBeenCalledTimes(1);

    view.rerender(
      <Harness
        activationKey="scene-b"
        onActive={secondActive}
        onProgress={onProgress}
      />,
    );
    act(flushAnimationFrame);
    expect(secondActive).toHaveBeenCalledTimes(1);
    view.unmount();
  });
});
