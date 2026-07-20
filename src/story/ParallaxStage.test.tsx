// @vitest-environment jsdom
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ParallaxStage } from "./ParallaxStage";
import type { RasterStory } from "./types";

interface TestIntersectionObserver {
  callback: IntersectionObserverCallback;
  disconnect: ReturnType<typeof vi.fn>;
  observe: ReturnType<typeof vi.fn>;
  rootMargin: string;
  unobserve: ReturnType<typeof vi.fn>;
}

let intersectionObservers: TestIntersectionObserver[];

function emitIntersection(
  observer: TestIntersectionObserver,
  target: Element,
  isIntersecting: boolean,
) {
  observer.callback(
    [
      {
        isIntersecting,
        target,
      } as IntersectionObserverEntry,
    ],
    observer as unknown as IntersectionObserver,
  );
}

function observerWithMargin(rootMargin: string) {
  return intersectionObservers.find(
    (observer) => observer.rootMargin === rootMargin,
  )!;
}

const story: RasterStory = {
  mechanism: "map-sky",
  poster: "/poster.webp",
  ariaLabel: "A complete open paper landscape with moving wind and a small boat.",
  scrollLengthVh: 300,
  layers: [
    { id: "ground", src: "/ground.png", depth: 0 },
    { id: "boat", src: "/boat.png", depth: 1 },
  ],
  beats: [
    {
      id: "begin",
      offset: 0,
      label: "Begin",
      narration: "The complete paper world waits before the first movement.",
      layers: { boat: { x: 0, y: 0, rotate: 0 } },
    },
    {
      id: "land",
      offset: 1,
      label: "Land",
      narration: "The boat settles and the scene gives way to the words below.",
      layers: { boat: { x: 10, y: -4, rotate: 3 } },
    },
  ],
};

const intensifiedStory: RasterStory = {
  ...story,
  scrollParallaxStrength: 1.5,
  pointerParallaxStrength: 1.5,
  layers: story.layers.map((layer) =>
    layer.id === "boat" ? { ...layer, pointerStrength: 4 } : layer,
  ),
};

const deferredResponsiveStory: RasterStory = {
  ...story,
  mechanism: "wind",
  posterMobileSrc: "/poster-mobile.webp",
  posterSizes: "(max-width: 820px) 100vw, 1672px",
  posterSrcSet: "/poster-mobile.webp 960w, /poster.webp 1672w",
  layers: story.layers.map((layer) =>
    layer.id === "boat"
      ? {
          ...layer,
          mobileSrc: "/boat-mobile.webp",
          sizes: "(max-width: 820px) 100vw, 1672px",
          srcSet: "/boat-mobile.webp 960w, /boat.webp 1672w",
        }
      : layer,
  ),
};

describe("ParallaxStage", () => {
  beforeEach(() => {
    intersectionObservers = [];
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
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
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
      callback(0);
      return 1;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("keeps scroll pose and ambient drift on separate nested elements", () => {
    const view = render(<ParallaxStage reducedMotion story={story} />);
    const boatPose = view.container.querySelector<HTMLElement>(
      '[data-story-layer-pose="boat"]',
    );
    const boatArt = view.container.querySelector<HTMLImageElement>(
      '[data-story-layer="boat"]',
    );

    expect(boatPose).toContainElement(boatArt);
    expect(boatPose?.style.getPropertyValue("--story-layer-x")).toBe("10");
    expect(boatPose?.style.getPropertyValue("--story-layer-y")).toBe("-4");
    expect(boatPose?.style.getPropertyValue("--story-layer-rotate")).toBe("3");
    expect(boatArt?.style.getPropertyValue("--story-layer-x")).toBe("");
    expect(boatArt).toHaveAttribute("data-ambient-enabled", "true");
    expect(boatArt?.style.getPropertyValue("--story-ambient-x-from")).toBe(
      "2.5%",
    );
    expect(boatArt?.style.getPropertyValue("--story-ambient-x-to")).toBe(
      "-2.5%",
    );
    expect(boatArt?.style.getPropertyValue("--story-ambient-y-from")).toBe(
      "-1%",
    );
    expect(boatArt?.style.getPropertyValue("--story-ambient-y-to")).toBe(
      "1%",
    );
    expect(
      boatArt?.style.getPropertyValue("--story-ambient-rotate-from"),
    ).toBe("-0.75deg");
    expect(
      boatArt?.style.getPropertyValue("--story-ambient-rotate-to"),
    ).toBe("0.75deg");
    expect(view.container.querySelector(".parallax-story__progress")).toBeNull();
  });

  it("locks printed copy to whichever paper layer carries it", () => {
    const view = render(
      <ParallaxStage
        editorialCopy={{
          title: "Ground is not Gravity",
          thesis: "Ground supports the attempt and gives it limits.",
        }}
        story={{
          ...story,
          mechanism: "candidate-map",
          editorialCopyLayout: "paper-left",
          editorialCopyLayerId: "boat",
        }}
      />,
    );
    const printedPaper = view.container.querySelector(
      '[data-story-layer="boat"]',
    );

    expect(printedPaper).toHaveAttribute("data-ambient-enabled", "false");
    expect(printedPaper).toHaveAttribute(
      "data-story-editorial-surface-lock",
      "true",
    );
  });

  it("prints localized scene copy and beat narration on the reserved editorial leaf", () => {
    const view = render(
      <ParallaxStage
        editorialCopy={{
          title: "A map that pretended to be the Sky",
          thesis: "A polished proposal remains one candidate map.",
        }}
        reducedMotion
        story={{ ...story, editorialCopyLayout: "paper-left" }}
      />,
    );
    const visual = view.container.querySelector(".parallax-story__visual")!;
    const editorialCopy = visual.querySelector(
      "[data-story-editorial-copy]",
    );

    expect(editorialCopy).toHaveClass(
      "parallax-story__editorial-copy--paper-left",
    );
    expect(editorialCopy).toHaveTextContent(
      "A map that pretended to be the Sky",
    );
    expect(editorialCopy).toHaveTextContent(
      "A polished proposal remains one candidate map.",
    );
    expect(editorialCopy).toHaveTextContent("Land");
    expect(editorialCopy).toHaveTextContent(
      "The boat settles and the scene gives way to the words below.",
    );
    expect(
      editorialCopy?.querySelector(".parallax-story__editorial-heading"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      view.container.querySelector(".parallax-story__narration"),
    ).toBeNull();

    view.rerender(
      <ParallaxStage
        editorialCopy={{
          title: "One sheet, ten honest doorways",
          thesis: "Choose by the work in front of you.",
        }}
        reducedMotion
        story={{
          ...story,
          editorialCopyLayout: "paper-left",
          editorialNarrationLayout: "card",
        }}
      />,
    );
    expect(
      view.container.querySelector("[data-story-editorial-copy]"),
    ).toHaveTextContent("One sheet, ten honest doorways");
    expect(
      view.container.querySelector(".parallax-story__editorial-narration"),
    ).toBeNull();
    expect(
      view.container.querySelector(".parallax-story__narration"),
    ).toHaveTextContent("Land");
  });

  it("prints three exact Ground-condition pairs on the remaining A-01 tags", () => {
    const editorialPanels = [
      {
        labels: ["Money", "Care"],
      },
      {
        labels: ["Craft", "Work"],
      },
      {
        labels: ["AI", "Rest"],
      },
    ];
    const view = render(
      <ParallaxStage
        editorialCopy={{
          title: "Ground is not Gravity",
          thesis: "Ground supports the attempt and gives it limits.",
        }}
        editorialPanels={editorialPanels}
        reducedMotion
        story={{
          ...story,
          mechanism: "ground-or-gravity",
          editorialCopyLayout: "sky-left",
        }}
      />,
    );
    const support = view.container.querySelector(
      ".parallax-story__editorial-supports",
    );
    const panels = support?.querySelectorAll(
      "[data-story-editorial-panel]",
    );

    expect(support).toHaveAttribute("aria-hidden", "true");
    expect(panels).toHaveLength(3);
    expect(
      support?.querySelectorAll(".parallax-story__editorial-support-label"),
    ).toHaveLength(6);
    editorialPanels.flatMap(({ labels }) => labels).forEach((label) => {
      expect(support).toHaveTextContent(label);
    });
  });

  it.each([
    [
      "Name the mode honestly",
      "honest-mode-rail",
      ["Name the mode", "honestly"],
    ],
    [
      "Честно назвать режим",
      "honest-mode-rail",
      ["Честно назвать", "режим"],
    ],
    ["Ground is not Gravity", "ground-or-gravity", ["Ground is not", "Gravity"]],
    ["Земля — не Инерция", "ground-or-gravity", ["Земля —", "не Инерция"]],
    [
      "A map that pretended to be the Sky",
      "candidate-map",
      ["A map that pretended", "to be the Sky"],
    ],
    [
      "Карта, которая притворилась небом",
      "candidate-map",
      ["Карта, которая", "притворилась небом"],
    ],
    ["Return from simulation", "return-threshold", ["Return from", "simulation"]],
    [
      "Возвращение из симуляции",
      "return-threshold",
      ["Возвращение", "из симуляции"],
    ],
    [
      "One sheet, ten honest doorways",
      "equal-lenses",
      ["One sheet, ten", "honest doorways"],
    ],
    [
      "Один лист, десять честных входов",
      "equal-lenses",
      ["Один лист, десять", "честных входов"],
    ],
    ["The Sky Remains Open", "open-horizon", ["The Sky", "Remains Open"]],
    [
      "Небо остаётся открытым",
      "open-horizon",
      ["Небо остаётся", "открытым"],
    ],
  ] as const)(
    "gives %s an authored two-line phrase break",
    (titleCopy, mechanism, expected) => {
      const view = render(
        <ParallaxStage
          editorialCopy={{
            title: titleCopy,
            thesis: "A question is not open if only yes can survive.",
          }}
          reducedMotion
          story={{
            ...story,
            mechanism,
            editorialCopyLayout: "sky-left",
          }}
        />,
      );
      const title = view.container.querySelector(
        ".parallax-story__editorial-title",
      );
      const lines = title?.querySelectorAll("[data-story-title-line]");

      expect(title).toHaveTextContent(titleCopy);
      expect(Array.from(lines ?? []).map((line) => line.textContent)).toEqual(
        expected,
      );
    },
  );

  it("keeps ambient handoff at beat zero and removes narration transitions in Quiet view", () => {
    const css = readFileSync(
      join(process.cwd(), "src/story/parallax-stage.css"),
      "utf8",
    );

    expect(css).toMatch(
      /\.parallax-story\[data-motion-disabled="true"\]\s+\.parallax-story__beat\s*\{[^}]*transition:\s*none;/,
    );
    expect(css).toMatch(
      /@keyframes paper-layer-breath\s*\{\s*0%,\s*100%\s*\{[^}]*translate3d\(0%,\s*0%,\s*0\)/,
    );
    expect(css).toMatch(
      /@media \(max-width: 820px\)[\s\S]*\.parallax-story\[data-layout="inline"\]\s+\.parallax-story__editorial-copy\s*\{[^}]*display:\s*none;/,
    );
    for (const mechanism of [
      "adoption-folds",
      "candidate-map",
      "return-threshold",
      "honest-mode-rail",
      "ground-or-gravity",
      "equal-lenses",
      "open-horizon",
    ]) {
      expect(css).toContain(`data-story-mechanism="${mechanism}"`);
    }
    expect(css).toMatch(
      /data-story-mechanism="honest-mode-rail"[\s\S]*\.parallax-story__editorial-heading\s*\{[^}]*position:\s*absolute;[^}]*width:\s*34%;/,
    );
    expect(css).toMatch(
      /data-story-mechanism="honest-mode-rail"[\s\S]*\.parallax-story__editorial-copy--sky-left\s*\{[^}]*container-type:\s*inline-size;/,
    );
    expect(css).toMatch(
      /data-story-mechanism="honest-mode-rail"[\s\S]*\.parallax-story__editorial-title\s*\{[^}]*max-width:\s*15ch;[^}]*font-size:\s*clamp\([^;]*cqw[^;]*\);/,
    );
    expect(css).toMatch(
      /data-story-mechanism="honest-mode-rail"[\s\S]*\[data-story-title-line\]\s*\{[^}]*display:\s*block;[^}]*white-space:\s*nowrap;/,
    );
    expect(css).toMatch(
      /data-story-mechanism="honest-mode-rail"[\s\S]*\.parallax-story__editorial-narration\s*\{[^}]*position:\s*absolute;[^}]*top:\s*74\.5%;[^}]*width:\s*49%;/,
    );
    expect(css).toMatch(
      /data-story-mechanism="honest-mode-rail"[\s\S]*\.parallax-story__beat--editorial span\s*\{[^}]*max-width:\s*min\(52ch,\s*26cqw\);/,
    );
    expect(css).toMatch(
      /data-story-mechanism="ground-or-gravity"[\s\S]*\.parallax-story__editorial-copy--sky-left\s*\{[^}]*container-type:\s*inline-size;/,
    );
    expect(css).toMatch(
      /data-story-mechanism="ground-or-gravity"[\s\S]*\.parallax-story__editorial-title\s*\{[^}]*top:\s*22\.42%;[^}]*left:\s*9\.81%;[^}]*width:\s*10\.29%;[^}]*height:\s*9\.56%;[^}]*font-size:\s*clamp\([^;]*cqw[^;]*\);/,
    );
    expect(css).toMatch(
      /data-story-mechanism="ground-or-gravity"[\s\S]*\.parallax-story__editorial-thesis\s*\{[^}]*top:\s*30\.39%;[^}]*left:\s*24\.1%;[^}]*width:\s*8\.79%;[^}]*height:\s*11\.69%;[^}]*font-size:\s*clamp\([^;]*cqw[^;]*\);/,
    );
    expect(css).toMatch(
      /data-story-mechanism="ground-or-gravity"[\s\S]*\.parallax-story__editorial-narration\s*\{[^}]*top:\s*34\.75%;[^}]*left:\s*38\.76%;[^}]*width:\s*9\.57%;[^}]*height:\s*11\.69%;[^}]*padding:\s*0;[^}]*border:\s*0;/,
    );
    expect(css).toMatch(
      /\.parallax-story__editorial-support:nth-child\(1\)\s*\{[^}]*top:\s*32\.41%;[^}]*left:\s*54\.61%;[^}]*width:\s*9\.33%;[^}]*height:\s*11\.69%;/,
    );
    expect(css).toMatch(
      /\.parallax-story__editorial-support:nth-child\(2\)\s*\{[^}]*top:\s*29\.76%;[^}]*left:\s*69\.02%;[^}]*width:\s*6\.52%;[^}]*height:\s*10\.63%;/,
    );
    expect(css).toMatch(
      /\.parallax-story__editorial-support:nth-child\(3\)\s*\{[^}]*top:\s*20\.72%;[^}]*left:\s*80\.56%;[^}]*width:\s*9\.21%;[^}]*height:\s*11\.69%;/,
    );
    expect(css).toMatch(
      /\.parallax-story__editorial-support:nth-child\(2\)[\s\S]*\.parallax-story__editorial-support-label\s*\{[^}]*font-size:\s*clamp\(0\.55rem,\s*0\.78cqw,\s*0\.84rem\);/,
    );
    expect(css).toMatch(
      /data-story-mechanism="candidate-map"[\s\S]*\.parallax-story__editorial-title\s*\{[^}]*top:\s*20\.5%;[^}]*left:\s*8\.8%;[^}]*width:\s*22%;[^}]*height:\s*14%;/,
    );
    expect(css).toMatch(
      /data-story-mechanism="candidate-map"[\s\S]*\.parallax-story__editorial-narration\s*\{[^}]*top:\s*49\.5%;[^}]*left:\s*8\.8%;[^}]*width:\s*18%;[^}]*height:\s*16%;/,
    );
    expect(css).toMatch(
      /data-story-mechanism="return-threshold"[\s\S]*\.parallax-story__editorial-title\s*\{[^}]*top:\s*28\.5%;[^}]*left:\s*18\.5%;[^}]*width:\s*28%;[^}]*height:\s*14%;/,
    );
    expect(css).toMatch(
      /data-story-mechanism="return-threshold"[\s\S]*\.parallax-story__editorial-narration\s*\{[^}]*top:\s*55\.5%;[^}]*left:\s*18\.5%;[^}]*width:\s*25\.5%;[^}]*height:\s*13\.5%;/,
    );
    expect(css).toMatch(
      /data-story-mechanism="equal-lenses"[\s\S]*\.parallax-story__editorial-title\s*\{[^}]*top:\s*22%;[^}]*left:\s*7\.2%;[^}]*width:\s*35\.5%;[^}]*height:\s*12\.2%;/,
    );
    expect(css).toMatch(
      /data-story-mechanism="equal-lenses"[\s\S]*\.parallax-story__editorial-narration\s*\{[^}]*top:\s*63%;[^}]*left:\s*72%;[^}]*width:\s*18\.5%;[^}]*height:\s*11\.5%;/,
    );
    expect(css).toMatch(
      /data-story-mechanism="open-horizon"[\s\S]*\.parallax-story__editorial-title\s*\{[^}]*top:\s*10%;[^}]*left:\s*28%;[^}]*width:\s*21%;[^}]*height:\s*11\.8%;/,
    );
    expect(css).toMatch(
      /data-story-mechanism="open-horizon"[\s\S]*\.parallax-story__editorial-narration\s*\{[^}]*top:\s*35%;[^}]*left:\s*20\.5%;[^}]*width:\s*18%;[^}]*height:\s*10%;/,
    );
    expect(css).toMatch(
      /\.parallax-story__beat--editorial\s*\{[^}]*transition:\s*none;/,
    );
    expect(css).toMatch(
      /@media \(max-width: 900px\)[\s\S]*\.scene-story-chapter[\s\S]*\.parallax-story\[data-layout="inline"\][\s\S]*\.parallax-story__visual\s*\{[^}]*width:\s*100vw;[^}]*transform:\s*none\s*!important;/,
    );
  });

  it("amplifies configured scroll and pointer parallax without changing idle drift", () => {
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 100,
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function storyRect(this: HTMLElement) {
        const top = this.dataset.storyMechanism ? -200 : 0;
        const height = this.dataset.storyMechanism ? 300 : 100;
        return {
          bottom: top + height,
          height,
          left: 0,
          right: 100,
          top,
          width: 100,
          x: 0,
          y: top,
          toJSON: () => ({}),
        } as DOMRect;
      },
    );
    const view = render(
      <ParallaxStage reducedMotion={false} story={intensifiedStory} />,
    );
    const boatPose = view.container.querySelector<HTMLElement>(
      '[data-story-layer-pose="boat"]',
    )!;
    const boatArt = view.container.querySelector<HTMLImageElement>(
      '[data-story-layer="boat"]',
    )!;

    expect(boatPose.style.getPropertyValue("--story-layer-x")).toBe("15");
    expect(boatPose.style.getPropertyValue("--story-layer-y")).toBe("-6");
    expect(boatPose.style.getPropertyValue("--story-layer-rotate")).toBe("4.5");
    expect(boatArt.style.getPropertyValue("--story-ambient-x-from")).toBe(
      "2.5%",
    );

    const visual = view.container.querySelector<HTMLElement>(
      ".parallax-story__visual",
    )!;
    Object.defineProperty(visual, "getBoundingClientRect", {
      configurable: true,
      value: () => ({
        bottom: 100,
        height: 100,
        left: 0,
        right: 100,
        top: 0,
        width: 100,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }),
    });
    fireEvent.pointerMove(visual, { clientX: 100, clientY: 100 });

    expect(boatPose.style.getPropertyValue("--story-pointer-x")).toBe("6");
    expect(boatPose.style.getPropertyValue("--story-pointer-y")).toBe("6");

    view.rerender(<ParallaxStage reducedMotion story={intensifiedStory} />);
    expect(boatPose.style.getPropertyValue("--story-layer-x")).toBe("10");
    expect(boatPose.style.getPropertyValue("--story-layer-y")).toBe("-4");
    expect(boatPose.style.getPropertyValue("--story-layer-rotate")).toBe("3");
    expect(boatPose.style.getPropertyValue("--story-pointer-x")).toBe("0");
    expect(boatPose.style.getPropertyValue("--story-pointer-y")).toBe("0");
  });

  it("keeps inline/mobile illustrations alive without pointer-driven layer drift", () => {
    const view = render(
      <ParallaxStage inline reducedMotion={false} story={intensifiedStory} />,
    );
    const section = view.container.querySelector<HTMLElement>(
      "[data-story-mechanism]",
    )!;
    const visual = view.container.querySelector<HTMLElement>(
      ".parallax-story__visual",
    )!;
    const boatPose = view.container.querySelector<HTMLElement>(
      '[data-story-layer-pose="boat"]',
    )!;

    Object.defineProperty(visual, "getBoundingClientRect", {
      configurable: true,
      value: () => ({
        bottom: 100,
        height: 100,
        left: 0,
        right: 100,
        top: 0,
        width: 100,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }),
    });
    fireEvent.pointerMove(visual, { clientX: 100, clientY: 100 });

    expect(section).toHaveAttribute("data-layout", "inline");
    expect(section).toHaveAttribute("data-motion-disabled", "false");
    expect(boatPose.style.getPropertyValue("--story-pointer-x")).toBe("0");
    expect(boatPose.style.getPropertyValue("--story-pointer-y")).toBe("0");

    act(() =>
      emitIntersection(observerWithMargin("12% 0px"), section, true),
    );
    expect(section).toHaveAttribute("data-ambient-active", "true");
    expect(
      view.container.querySelector('[data-story-layer="boat"]'),
    ).toHaveAttribute("data-ambient-enabled", "true");
  });

  it("disables pointer parallax on coarse-pointer layouts above the mobile breakpoint", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn((query: string) => ({
        matches: query.includes("pointer: coarse"),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
    const view = render(
      <ParallaxStage reducedMotion={false} story={intensifiedStory} />,
    );
    const visual = view.container.querySelector<HTMLElement>(
      ".parallax-story__visual",
    )!;
    const boatPose = view.container.querySelector<HTMLElement>(
      '[data-story-layer-pose="boat"]',
    )!;

    Object.defineProperty(visual, "getBoundingClientRect", {
      configurable: true,
      value: () => ({
        bottom: 100,
        height: 100,
        left: 0,
        right: 100,
        top: 0,
        width: 100,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }),
    });
    fireEvent.pointerMove(visual, { clientX: 100, clientY: 100 });

    expect(view.container.querySelector("[data-story-mechanism]")).toHaveAttribute(
      "data-layout",
      "sticky",
    );
    expect(boatPose.style.getPropertyValue("--story-pointer-x")).toBe("0");
    expect(boatPose.style.getPropertyValue("--story-pointer-y")).toBe("0");
  });

  it("activates ambient motion only while intersecting and disconnects on cleanup", () => {
    const view = render(<ParallaxStage reducedMotion={false} story={story} />);
    const section = view.container.querySelector<HTMLElement>(
      "[data-story-mechanism]",
    )!;
    const observer = observerWithMargin("12% 0px");

    expect(observer).toBeDefined();
    expect(observer.observe).toHaveBeenCalledWith(section);
    expect(section).toHaveAttribute("data-ambient-active", "false");

    act(() => emitIntersection(observer, section, true));
    expect(section).toHaveAttribute("data-ambient-active", "true");

    act(() => emitIntersection(observer, section, false));
    expect(section).toHaveAttribute("data-ambient-active", "false");

    view.unmount();
    expect(observer.disconnect).toHaveBeenCalledOnce();
    expect(section).toHaveAttribute("data-ambient-active", "false");
  });

  it("pauses an intersecting illustration while the document is hidden", () => {
    const view = render(<ParallaxStage reducedMotion={false} story={story} />);
    const section = view.container.querySelector<HTMLElement>(
      "[data-story-mechanism]",
    )!;
    const observer = observerWithMargin("12% 0px");

    act(() => emitIntersection(observer, section, true));
    expect(section).toHaveAttribute("data-ambient-active", "true");

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "hidden",
    });
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(section).toHaveAttribute("data-ambient-active", "false");

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(section).toHaveAttribute("data-ambient-active", "true");
  });

  it("prevents reduced motion from activating ambient drift", () => {
    const view = render(<ParallaxStage reducedMotion story={story} />);
    const section = view.container.querySelector<HTMLElement>(
      "[data-story-mechanism]",
    )!;

    expect(section).toHaveAttribute("data-motion-disabled", "true");
    expect(section).toHaveAttribute("data-ambient-active", "false");
    expect(observerWithMargin("1750px 0px")).toBeDefined();
    expect(observerWithMargin("12% 0px")).toBeUndefined();

    view.rerender(<ParallaxStage reducedMotion={false} story={story} />);
    const observer = observerWithMargin("12% 0px");
    act(() => emitIntersection(observer, section, true));
    expect(section).toHaveAttribute("data-motion-disabled", "false");
    expect(section).toHaveAttribute("data-ambient-active", "true");

    view.rerender(<ParallaxStage reducedMotion story={story} />);
    expect(observer.disconnect).toHaveBeenCalledOnce();
    expect(section).toHaveAttribute("data-motion-disabled", "true");
    expect(section).toHaveAttribute("data-ambient-active", "false");
  });

  it("keeps the complete poster visible when any layer fails", () => {
    const view = render(<ParallaxStage reducedMotion story={story} />);
    const section = view.container.querySelector<HTMLElement>("[data-story-mechanism]");
    const layers = view.container.querySelectorAll<HTMLImageElement>("[data-story-layer]");

    expect(view.getByTestId("story-poster")).toHaveAttribute("src", "/poster.webp");
    expect(
      view.getByText(story.ariaLabel, { selector: "figcaption" }),
    ).toBeInTheDocument();
    expect(section).toHaveAttribute("data-layers-ready", "false");

    fireEvent.load(layers[0]);
    fireEvent.error(layers[1]);

    expect(section).toHaveAttribute("data-layers-ready", "false");
    expect(section).toHaveAttribute("data-layer-error", "boat");
    expect(view.getByTestId("story-poster")).toBeInTheDocument();
    expect(layers[0]).toHaveAttribute("aria-hidden", "true");
    expect(layers[1]).toHaveAttribute("aria-hidden", "true");
  });

  it("reveals the layered composition only after every raster plane loads", () => {
    const view = render(<ParallaxStage reducedMotion story={story} />);
    const section = view.container.querySelector<HTMLElement>("[data-story-mechanism]");
    const layers = view.container.querySelectorAll<HTMLImageElement>("[data-story-layer]");

    expect(section).toHaveAttribute("data-layer-handoff", "atomic");
    fireEvent.load(layers[0]);
    expect(section).toHaveAttribute("data-layers-ready", "false");
    fireEvent.load(layers[1]);
    expect(section).toHaveAttribute("data-layers-ready", "true");
  });

  it("keeps the poster until every current raster plane has decoded", async () => {
    const view = render(<ParallaxStage reducedMotion story={story} />);
    const section = view.container.querySelector<HTMLElement>("[data-story-mechanism]");
    const layers = [
      ...view.container.querySelectorAll<HTMLImageElement>("[data-story-layer]"),
    ];
    let resolveGround!: () => void;
    let resolveBoat!: () => void;
    const groundDecoded = new Promise<void>((resolve) => {
      resolveGround = resolve;
    });
    const boatDecoded = new Promise<void>((resolve) => {
      resolveBoat = resolve;
    });
    Object.defineProperty(layers[0], "decode", {
      configurable: true,
      value: vi.fn(() => groundDecoded),
    });
    Object.defineProperty(layers[1], "decode", {
      configurable: true,
      value: vi.fn(() => boatDecoded),
    });

    fireEvent.load(layers[0]);
    fireEvent.load(layers[1]);
    expect(section).toHaveAttribute("data-layers-ready", "false");

    await act(async () => resolveGround());
    expect(section).toHaveAttribute("data-layers-ready", "false");

    await act(async () => resolveBoat());
    expect(section).toHaveAttribute("data-layers-ready", "true");
  });

  it("ignores a decode completion from an obsolete layer generation", async () => {
    const view = render(<ParallaxStage reducedMotion story={story} />);
    const section = view.container.querySelector<HTMLElement>("[data-story-mechanism]");
    const layers = [
      ...view.container.querySelectorAll<HTMLImageElement>("[data-story-layer]"),
    ];
    const resolvers: Array<() => void> = [];
    for (const image of layers) {
      Object.defineProperty(image, "decode", {
        configurable: true,
        value: vi.fn(() => new Promise<void>((resolve) => resolvers.push(resolve))),
      });
      fireEvent.load(image);
    }

    view.rerender(
      <ParallaxStage
        reducedMotion
        story={{ ...story, poster: "/replacement-poster.webp" }}
      />,
    );
    await act(async () => resolvers.forEach((resolve) => resolve()));

    expect(section).toHaveAttribute("data-layers-ready", "false");
  });

  it("falls back safely when Safari rejects decode for a complete cached image", async () => {
    const view = render(<ParallaxStage reducedMotion story={story} />);
    const section = view.container.querySelector<HTMLElement>("[data-story-mechanism]");
    const layers = [
      ...view.container.querySelectorAll<HTMLImageElement>("[data-story-layer]"),
    ];
    for (const image of layers) {
      Object.defineProperty(image, "complete", {
        configurable: true,
        get: () => true,
      });
      Object.defineProperty(image, "naturalWidth", {
        configurable: true,
        get: () => 1672,
      });
      Object.defineProperty(image, "decode", {
        configurable: true,
        value: vi.fn().mockRejectedValue(new DOMException("cached decode")),
      });
      fireEvent.load(image);
    }

    await act(async () => Promise.resolve());
    expect(section).not.toHaveAttribute("data-layer-error");
    expect(section).toHaveAttribute("data-layers-ready", "true");
  });

  it("recognizes cached layers that are complete before load handlers run", () => {
    vi.spyOn(HTMLImageElement.prototype, "complete", "get").mockReturnValue(true);
    vi.spyOn(HTMLImageElement.prototype, "naturalWidth", "get").mockReturnValue(1672);

    const view = render(<ParallaxStage reducedMotion story={story} />);
    const section = view.container.querySelector<HTMLElement>("[data-story-mechanism]");

    expect(section).toHaveAttribute("data-layers-ready", "true");
  });

  it("combines a cached layer with a later load event", () => {
    vi.spyOn(HTMLImageElement.prototype, "complete", "get").mockImplementation(
      function cachedLayer(this: HTMLImageElement) {
        return this.dataset.storyLayer === "ground";
      },
    );
    vi.spyOn(HTMLImageElement.prototype, "naturalWidth", "get").mockReturnValue(1672);

    const view = render(<ParallaxStage reducedMotion story={story} />);
    const section = view.container.querySelector<HTMLElement>("[data-story-mechanism]");
    const boat = view.container.querySelector<HTMLImageElement>(
      '[data-story-layer="boat"]',
    )!;

    expect(section).toHaveAttribute("data-layers-ready", "false");
    fireEvent.load(boat);
    expect(section).toHaveAttribute("data-layers-ready", "true");
  });

  it("hydrates responsive layers near the viewport and releases them when far away", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function storyBounds(this: HTMLElement) {
        const top = this.dataset.storyMechanism === "wind" ? 5000 : 0;
        return {
          bottom: top + 300,
          height: 300,
          left: 0,
          right: 100,
          top,
          width: 100,
          x: 0,
          y: top,
          toJSON: () => ({}),
        } as DOMRect;
      },
    );
    const view = render(
      <ParallaxStage reducedMotion={false} story={deferredResponsiveStory} />,
    );
    const section = view.container.querySelector<HTMLElement>(
      '[data-story-mechanism="wind"]',
    )!;
    const proximityObserver = observerWithMargin("1750px 0px");

    expect(section).toHaveAttribute("data-layers-hydrated", "false");
    expect(view.getByTestId("story-poster")).toHaveAttribute(
      "srcset",
      "/poster-mobile.webp 960w, /poster.webp 1672w",
    );
    expect(view.getByTestId("story-poster")).toHaveAttribute(
      "sizes",
      "(max-width: 820px) 100vw, 1672px",
    );
    expect(view.container.querySelector("[data-story-mobile-poster]")).toHaveAttribute(
      "srcset",
      "/poster-mobile.webp",
    );
    expect(view.container.querySelectorAll("[data-story-layer]")).toHaveLength(0);

    vi.spyOn(HTMLImageElement.prototype, "complete", "get").mockReturnValue(true);
    vi.spyOn(HTMLImageElement.prototype, "naturalWidth", "get").mockReturnValue(
      960,
    );
    act(() => emitIntersection(proximityObserver, section, true));

    const boat = view.container.querySelector<HTMLImageElement>(
      '[data-story-layer="boat"]',
    )!;
    expect(
      view.container.querySelector('[data-story-mobile-layer="boat"]'),
    ).toHaveAttribute("srcset", "/boat-mobile.webp");
    expect(section).toHaveAttribute("data-layers-hydrated", "true");
    expect(section).toHaveAttribute("data-layers-ready", "true");
    expect(boat).toHaveAttribute(
      "srcset",
      "/boat-mobile.webp 960w, /boat.webp 1672w",
    );
    expect(boat).toHaveAttribute(
      "sizes",
      "(max-width: 820px) 100vw, 1672px",
    );
    expect(boat).toHaveAttribute("loading", "eager");

    act(() => emitIntersection(proximityObserver, section, false));
    expect(section).toHaveAttribute("data-layers-hydrated", "false");
    expect(section).toHaveAttribute("data-layers-ready", "false");
    expect(view.container.querySelectorAll("[data-story-layer]")).toHaveLength(0);
    expect(view.getByTestId("story-poster")).toBeInTheDocument();
  });

  it("restores the authored mobile pose when an inline layer pack hydrates", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function storyBounds(this: HTMLElement) {
        const top = this.dataset.storyMechanism === "wind" ? 5000 : 0;
        return {
          bottom: top + 300,
          height: 300,
          left: 0,
          right: 100,
          top,
          width: 100,
          x: 0,
          y: top,
          toJSON: () => ({}),
        } as DOMRect;
      },
    );
    const view = render(
      <ParallaxStage
        inline
        reducedMotion={false}
        story={deferredResponsiveStory}
      />,
    );
    const section = view.container.querySelector<HTMLElement>(
      '[data-story-mechanism="wind"]',
    )!;

    expect(section).toHaveAttribute("data-story-progress", "0.580");
    expect(view.container.querySelector("[data-story-layer-pose]")).toBeNull();

    act(() =>
      emitIntersection(observerWithMargin("1750px 0px"), section, true),
    );
    const boatPose = view.container.querySelector<HTMLElement>(
      '[data-story-layer-pose="boat"]',
    )!;

    expect(section).toHaveAttribute("data-story-progress", "0.580");
    expect(boatPose.style.getPropertyValue("--story-layer-x")).not.toBe("0");
  });

  it("uses a story-authored beat instead of the legacy inline interpolation", () => {
    const view = render(
      <ParallaxStage
        inline
        reducedMotion={false}
        story={{ ...intensifiedStory, inlineProgress: 0.72 }}
      />,
    );
    const section = view.container.querySelector<HTMLElement>(
      "[data-story-mechanism]",
    )!;

    expect(section).toHaveAttribute("data-story-progress", "0.720");
  });

  it("runs the skip callback and focuses the destination after the story", () => {
    const onSkip = vi.fn();
    const focusAfterSkipRef = createRef<HTMLElement>();
    const view = render(
      <>
        <ParallaxStage
          focusAfterSkipRef={focusAfterSkipRef}
          onSkip={onSkip}
          reducedMotion
          story={story}
        />
        <main ref={focusAfterSkipRef}>Following text</main>
      </>,
    );
    focusAfterSkipRef.current!.scrollIntoView = vi.fn();

    act(() => view.getByRole("button", { name: /skip illustrated story/i }).click());

    expect(onSkip).toHaveBeenCalledOnce();
    expect(focusAfterSkipRef.current).toHaveFocus();
    expect(focusAfterSkipRef.current).toHaveAttribute("tabindex", "-1");
    expect(focusAfterSkipRef.current).toHaveAttribute(
      "data-programmatic-focus",
      "true",
    );

    act(() => focusAfterSkipRef.current!.blur());
    expect(focusAfterSkipRef.current).not.toHaveAttribute("tabindex");
    expect(focusAfterSkipRef.current).not.toHaveAttribute(
      "data-programmatic-focus",
    );
  });
});
