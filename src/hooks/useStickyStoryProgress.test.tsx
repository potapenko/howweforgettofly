// @vitest-environment jsdom
import { act, cleanup, render } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  stickyStoryProgress,
  useStickyStoryProgress,
} from "./useStickyStoryProgress";

interface HarnessProps {
  onProgress: (progress: number) => void;
  onProximityChange?: (near: boolean) => void;
  reducedMotion?: boolean;
  settled?: boolean;
  fixedProgress?: number;
  withStickyChild?: boolean;
  testId?: string;
}

function Harness({
  onProgress,
  onProximityChange,
  reducedMotion,
  settled,
  fixedProgress,
  withStickyChild = false,
  testId = "story",
}: HarnessProps) {
  const ref = useRef<HTMLDivElement>(null);
  useStickyStoryProgress(ref, {
    onProgress,
    onProximityChange,
    reducedMotion,
    settled,
    fixedProgress,
  });
  return (
    <div data-testid={testId} ref={ref}>
      {withStickyChild ? (
        <div
          className="parallax-story__sticky"
          data-testid={`${testId}-sticky`}
        />
      ) : null}
    </div>
  );
}

function rect(top: number, height = 3000): DOMRect {
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

describe("useStickyStoryProgress", () => {
  let frames: Map<number, FrameRequestCallback>;
  let nextFrame = 0;

  const flushFrame = () => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback(0));
  };

  beforeEach(() => {
    frames = new Map();
    nextFrame = 0;
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 1000,
    });
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      const id = ++nextFrame;
      frames.set(id, callback);
      return id;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => {
      frames.delete(id);
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("emits exact 0, .5, and 1 positions across the sticky travel", () => {
    const onProgress = vi.fn();
    let storyRect = rect(0);
    const view = render(<Harness onProgress={onProgress} />);
    vi.spyOn(view.getByTestId("story"), "getBoundingClientRect")
      .mockImplementation(() => storyRect);

    act(flushFrame);
    expect(onProgress).toHaveBeenLastCalledWith(0);

    storyRect = rect(-1000);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
      flushFrame();
    });
    expect(onProgress).toHaveBeenLastCalledWith(0.5);

    storyRect = rect(-2000);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
      flushFrame();
    });
    expect(onProgress).toHaveBeenLastCalledWith(1);
  });

  it.each([
    {
      label: "header",
      stickyTop: 78,
      stickyHeight: 922,
      positions: [78, -961, -2000],
    },
    {
      label: "manifesto header and index",
      stickyTop: 136,
      stickyHeight: 864,
      positions: [136, -932, -2000],
    },
  ])(
    "maps the $label sticky geometry to exact 0, .5, and 1 progress",
    ({ stickyTop, stickyHeight, positions }) => {
      const geometry = { top: stickyTop, height: stickyHeight };

      expect(stickyStoryProgress(rect(positions[0]), 1000, geometry)).toBe(0);
      expect(stickyStoryProgress(rect(positions[1]), 1000, geometry)).toBe(0.5);
      expect(stickyStoryProgress(rect(positions[2]), 1000, geometry)).toBe(1);
    },
  );

  it("caches sticky geometry across scroll frames and refreshes it on resize", () => {
    let sectionTop = 78;
    let stickyTop = 78;
    let stickyHeight = 922;
    const computedStyle = vi.spyOn(window, "getComputedStyle")
      .mockImplementation(() => ({
        top: `${stickyTop}px`,
      }) as CSSStyleDeclaration);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function storyBounds(this: HTMLElement) {
        return this.classList.contains("parallax-story__sticky")
          ? rect(0, stickyHeight)
          : rect(sectionTop);
      },
    );
    const onProgress = vi.fn();
    render(
      <Harness
        onProgress={onProgress}
        testId="geometry-story"
        withStickyChild
      />,
    );

    act(flushFrame);
    expect(onProgress).toHaveBeenLastCalledWith(0);
    expect(computedStyle).toHaveBeenCalledOnce();

    sectionTop = -961;
    act(() => {
      window.dispatchEvent(new Event("scroll"));
      flushFrame();
    });
    expect(onProgress).toHaveBeenLastCalledWith(0.5);
    expect(computedStyle).toHaveBeenCalledOnce();

    stickyTop = 136;
    stickyHeight = 864;
    sectionTop = 136;
    act(() => {
      window.dispatchEvent(new Event("resize"));
      flushFrame();
    });
    expect(onProgress).toHaveBeenLastCalledWith(0);
    expect(computedStyle).toHaveBeenCalledTimes(2);
  });

  it("removes listeners and cancels pending work on cleanup", () => {
    const addListener = vi.spyOn(window, "addEventListener");
    const removeListener = vi.spyOn(window, "removeEventListener");
    const cancelFrame = vi.spyOn(window, "cancelAnimationFrame");
    const view = render(<Harness onProgress={vi.fn()} />);
    const pendingFrame = nextFrame;
    const scrollHandler = addListener.mock.calls.find(
      ([event]) => event === "scroll",
    )?.[1];

    expect(scrollHandler).toBeTypeOf("function");
    view.unmount();

    expect(removeListener).toHaveBeenCalledWith("scroll", scrollHandler);
    expect(cancelFrame).toHaveBeenCalledWith(pendingFrame);
    expect(frames.size).toBe(0);
  });

  it.each([
    ["reduced motion", { reducedMotion: true }],
    ["a settled story", { settled: true }],
  ])("bypasses scroll listeners for %s", (_, props) => {
    const addListener = vi.spyOn(window, "addEventListener");
    const onProgress = vi.fn();
    render(<Harness onProgress={onProgress} {...props} />);

    expect(onProgress).toHaveBeenCalledOnce();
    expect(onProgress).toHaveBeenCalledWith(1);
    expect(addListener.mock.calls.some(([event]) => event === "scroll")).toBe(false);
  });

  it("uses one authored pose for a non-sticky inline story", () => {
    const addListener = vi.spyOn(window, "addEventListener");
    const onProgress = vi.fn();
    render(<Harness fixedProgress={0.58} onProgress={onProgress} />);

    expect(onProgress).toHaveBeenCalledOnce();
    expect(onProgress).toHaveBeenCalledWith(0.58);
    expect(addListener.mock.calls.some(([event]) => event === "scroll")).toBe(false);
  });

  it("shares one scroll and resize listener across mounted stories", () => {
    const addListener = vi.spyOn(window, "addEventListener");
    const first = vi.fn();
    const second = vi.fn();

    render(
      <>
        <Harness onProgress={first} />
        <Harness onProgress={second} />
      </>,
    );

    expect(
      addListener.mock.calls.filter(([event]) => event === "scroll"),
    ).toHaveLength(1);
    expect(
      addListener.mock.calls.filter(([event]) => event === "resize"),
    ).toHaveLength(1);

    act(flushFrame);
    expect(first).toHaveBeenCalledOnce();
    expect(second).toHaveBeenCalledOnce();
  });

  it("rebuilds the near gate in pixels from the current viewport height", () => {
    const observers: Array<{
      disconnect: ReturnType<typeof vi.fn>;
      observe: ReturnType<typeof vi.fn>;
      rootMargin: string;
    }> = [];
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        readonly root = null;
        readonly rootMargin: string;
        readonly thresholds = [0];
        readonly disconnect = vi.fn();
        readonly observe = vi.fn();
        readonly takeRecords = vi.fn(() => []);
        readonly unobserve = vi.fn();

        constructor(
          _callback: IntersectionObserverCallback,
          options: IntersectionObserverInit = {},
        ) {
          this.rootMargin = options.rootMargin ?? "0px";
          observers.push(this);
        }
      },
    );

    const view = render(<Harness onProgress={vi.fn()} />);
    const story = view.getByTestId("story");

    expect(observers.map(({ rootMargin }) => rootMargin)).toEqual([
      "1750px 0px",
    ]);
    expect(observers[0].observe).toHaveBeenCalledWith(story);

    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });
    act(() => {
      window.dispatchEvent(new Event("resize"));
      flushFrame();
    });

    expect(observers.map(({ rootMargin }) => rootMargin)).toEqual([
      "1750px 0px",
      "1400px 0px",
    ]);
    expect(observers[0].disconnect).toHaveBeenCalledOnce();
    expect(observers[1].observe).toHaveBeenCalledWith(story);

    act(() => {
      window.dispatchEvent(new Event("resize"));
      flushFrame();
    });
    expect(observers).toHaveLength(2);
  });

  it("measures only stories admitted by the shared near-viewport gate", () => {
    let intersectionCallback: IntersectionObserverCallback | undefined;
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        readonly root = null;
        readonly rootMargin: string;
        readonly thresholds = [0];
        readonly disconnect = vi.fn();
        readonly observe = vi.fn();
        readonly takeRecords = vi.fn(() => []);
        readonly unobserve = vi.fn();

        constructor(
          callback: IntersectionObserverCallback,
          options: IntersectionObserverInit = {},
        ) {
          intersectionCallback = callback;
          this.rootMargin = options.rootMargin ?? "0px";
        }
      },
    );

    let secondTop = 5000;
    const bounds = vi
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(function storyBounds(this: HTMLElement) {
        return rect(
          this.dataset.testid === "second" ? secondTop : 0,
        );
      });
    const first = vi.fn();
    const second = vi.fn();
    const view = render(
      <>
        <Harness onProgress={first} testId="first" />
        <Harness onProgress={second} testId="second" />
      </>,
    );

    act(flushFrame);
    expect(first).toHaveBeenCalledOnce();
    expect(second).not.toHaveBeenCalled();

    const firstElement = view.getByTestId("first");
    const secondElement = view.getByTestId("second");
    act(() => {
      intersectionCallback?.(
        [
          {
            isIntersecting: false,
            target: firstElement,
          } as unknown as IntersectionObserverEntry,
          {
            isIntersecting: true,
            target: secondElement,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
      flushFrame();
    });
    expect(second).toHaveBeenLastCalledWith(0);

    secondTop = -1000;
    act(() => {
      window.dispatchEvent(new Event("scroll"));
      flushFrame();
    });
    expect(first).toHaveBeenCalledOnce();
    expect(second).toHaveBeenLastCalledWith(0.5);
    expect(bounds).toHaveBeenCalled();
  });

  it("warms only the two nearest packs and promotes the next pack on scroll", () => {
    let intersectionCallback: IntersectionObserverCallback | undefined;
    const observe = vi.fn();
    const observerMargins: string[] = [];
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        readonly root = null;
        readonly rootMargin: string;
        readonly thresholds = [0];
        readonly disconnect = vi.fn();
        readonly observe = observe;
        readonly takeRecords = vi.fn(() => []);
        readonly unobserve = vi.fn();

        constructor(
          callback: IntersectionObserverCallback,
          options: IntersectionObserverInit = {},
        ) {
          intersectionCallback = callback;
          this.rootMargin = options.rootMargin ?? "0px";
          observerMargins.push(this.rootMargin);
        }
      },
    );

    const tops: Record<string, number> = {
      first: -100,
      second: 700,
      third: 1500,
    };
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function storyBounds(this: HTMLElement) {
        return rect(tops[this.dataset.testid ?? "first"], 300);
      },
    );
    const warmPacks = new Set<string>();
    let peakWarmPacks = 0;
    const trackWarmPack = (id: string) => vi.fn((warm: boolean) => {
      if (warm) warmPacks.add(id);
      else warmPacks.delete(id);
      peakWarmPacks = Math.max(peakWarmPacks, warmPacks.size);
    });
    const firstWarm = trackWarmPack("first");
    const secondWarm = trackWarmPack("second");
    const thirdWarm = trackWarmPack("third");
    const firstProgress = vi.fn();
    const secondProgress = vi.fn();
    const thirdProgress = vi.fn();
    const view = render(
      <>
        <Harness
          onProgress={firstProgress}
          onProximityChange={firstWarm}
          testId="first"
        />
        <Harness
          onProgress={secondProgress}
          onProximityChange={secondWarm}
          testId="second"
        />
        <Harness
          onProgress={thirdProgress}
          onProximityChange={thirdWarm}
          testId="third"
        />
      </>,
    );

    expect(observe).toHaveBeenCalledTimes(3);
    expect(observerMargins).toEqual(["1750px 0px"]);
    expect(firstWarm).toHaveBeenLastCalledWith(true);
    expect(secondWarm).toHaveBeenLastCalledWith(true);
    expect(thirdWarm).toHaveBeenLastCalledWith(false);

    act(flushFrame);
    expect(firstProgress).toHaveBeenCalledOnce();
    expect(secondProgress).toHaveBeenCalledOnce();
    expect(thirdProgress).toHaveBeenCalledOnce();

    const firstElement = view.getByTestId("first");
    act(() => {
      intersectionCallback?.(
        [
          {
            isIntersecting: false,
            target: firstElement,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });
    expect(firstWarm).toHaveBeenLastCalledWith(false);
    expect(secondWarm).toHaveBeenLastCalledWith(true);
    expect(thirdWarm).toHaveBeenLastCalledWith(true);

    act(() => {
      intersectionCallback?.(
        [
          {
            isIntersecting: true,
            target: firstElement,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });
    expect(firstWarm).toHaveBeenLastCalledWith(true);
    expect(secondWarm).toHaveBeenLastCalledWith(true);
    expect(thirdWarm).toHaveBeenLastCalledWith(false);

    tops.first = -1600;
    tops.second = -900;
    tops.third = 100;
    act(() => {
      window.dispatchEvent(new Event("scroll"));
      flushFrame();
    });

    expect(firstWarm).toHaveBeenLastCalledWith(false);
    expect(secondWarm).toHaveBeenLastCalledWith(true);
    expect(thirdWarm).toHaveBeenLastCalledWith(true);
    expect(warmPacks).toEqual(new Set(["second", "third"]));
    expect(peakWarmPacks).toBe(2);
  });

  it("promotes the third-nearest pack immediately when a warm story unmounts", () => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        readonly root = null;
        readonly rootMargin: string;
        readonly thresholds = [0];
        readonly disconnect = vi.fn();
        readonly observe = vi.fn();
        readonly takeRecords = vi.fn(() => []);
        readonly unobserve = vi.fn();

        constructor(
          _callback: IntersectionObserverCallback,
          options: IntersectionObserverInit = {},
        ) {
          this.rootMargin = options.rootMargin ?? "0px";
        }
      },
    );
    const tops: Record<string, number> = {
      first: -100,
      second: 700,
      third: 1500,
    };
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function storyBounds(this: HTMLElement) {
        return rect(tops[this.dataset.testid ?? "first"], 300);
      },
    );
    const firstWarm = vi.fn();
    const secondWarm = vi.fn();
    const thirdWarm = vi.fn();
    const stories = (includeFirst: boolean) => (
      <>
        {includeFirst ? (
          <Harness
            key="first"
            onProgress={vi.fn()}
            onProximityChange={firstWarm}
            testId="first"
          />
        ) : null}
        <Harness
          key="second"
          onProgress={vi.fn()}
          onProximityChange={secondWarm}
          testId="second"
        />
        <Harness
          key="third"
          onProgress={vi.fn()}
          onProximityChange={thirdWarm}
          testId="third"
        />
      </>
    );
    const view = render(stories(true));

    expect(firstWarm).toHaveBeenLastCalledWith(true);
    expect(secondWarm).toHaveBeenLastCalledWith(true);
    expect(thirdWarm).toHaveBeenLastCalledWith(false);

    view.rerender(stories(false));

    expect(secondWarm).toHaveBeenLastCalledWith(true);
    expect(thirdWarm).toHaveBeenLastCalledWith(true);
  });
});
