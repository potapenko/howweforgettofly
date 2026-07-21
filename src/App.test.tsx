import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, useLocation } from "react-router-dom";
import { App } from "./App";

const majorSections = [
  "home",
  "manifesto",
  "parents",
  "adults",
  "ai",
  "atlas",
  "final-sky",
] as const;

const primaryNavigation = [
  ["Manifesto", "manifesto"],
  ["Parents", "parents"],
  ["Adults", "adults"],
  ["Set the Wind", "ai"],
  ["Atlas", "atlas"],
  ["Sky", "final-sky"],
] as const;

function renderBook(entry = "/#parents") {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <App />
    </MemoryRouter>,
  );
}

function installResponsiveMatchMedia(
  width: number,
  { coarsePointer = width <= 820, reducedMotion = false } = {},
) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn((query: string) => {
      const maxWidth = query.match(/\(max-width:\s*(\d+)px\)/)?.[1];
      const minWidth = query.match(/\(min-width:\s*(\d+)px\)/)?.[1];
      const matches =
        (maxWidth !== undefined && width <= Number(maxWidth)) ||
        (minWidth !== undefined && width >= Number(minWidth)) ||
        (query.includes("prefers-reduced-motion") && reducedMotion) ||
        (coarsePointer &&
          (query.includes("hover: none") || query.includes("pointer: coarse")));
      return {
        matches,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    }),
  });
}

function LocationProbe() {
  const location = useLocation();
  return (
    <output data-testid="location-probe">
      {location.pathname + location.hash}
    </output>
  );
}

function mockRect(top: number, height: number): DOMRect {
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
  };
}

const semanticReadingSelector = [
  "#main-content main [data-book-section][id]",
  "#main-content main .scene-story-chapter[id]",
  "#main-content main [data-scene-content][id]",
  "#main-content main [data-pathway-section][id]",
  "#main-content main .pathway-sections[id]",
  "#main-content main section[id]",
].join(", ");

function moveSemanticAnchorsOffscreen(except: HTMLElement) {
  document
    .querySelectorAll<HTMLElement>(semanticReadingSelector)
    .forEach((element) => {
      if (element === except) return;
      Object.defineProperty(element, "getBoundingClientRect", {
        configurable: true,
        value: vi.fn(() => mockRect(1_000, 200)),
      });
    });
}

describe("application accessibility controls", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    });
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) =>
      window.setTimeout(() => callback(performance.now()), 0)
    );
    vi.stubGlobal("cancelAnimationFrame", (frame: number) => {
      window.clearTimeout(frame);
    });
    vi.stubGlobal("scrollTo", vi.fn());
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
    });
    Object.defineProperty(window, "scrollX", {
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("renders the canonical book as one main with ordered, uniquely linked sections", async () => {
    renderBook();

    const main = await screen.findByRole("main", {
      name: "How We Forget to Fly",
    });
    expect(document.querySelectorAll("main")).toHaveLength(1);
    expect(within(main).getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      within(main).getByRole("heading", { level: 1, name: /how we forget to fly/i }),
    ).toBeInTheDocument();

    const renderedSections = Array.from(
      main.querySelectorAll<HTMLElement>("[data-book-section]"),
      (section) => section.dataset.bookSection,
    );
    expect(renderedSections).toEqual(majorSections);

    const navigation = screen.getByRole("navigation", { name: "Primary" });
    const links = within(navigation).getAllByRole("link");
    expect(links).toHaveLength(primaryNavigation.length);

    for (const [label, id] of primaryNavigation) {
      const link = within(navigation).getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", `/#${id}`);
      expect(document.querySelectorAll(`[id="${id}"]`)).toHaveLength(1);
    }
  });

  it("exposes Quiet view as a real button and makes it authoritative for story motion", async () => {
    renderBook();

    const quietView = await screen.findByRole("button", { name: "Quiet view" });
    const openingStory = await waitFor(() => {
      const element = document.querySelector(
        "[data-story-mechanism='map-sky']",
      );
      expect(element).toBeInTheDocument();
      return element;
    });
    expect(quietView).toHaveAttribute("aria-pressed", "false");
    expect(openingStory).toHaveAttribute("data-motion-disabled", "false");

    quietView.focus();
    fireEvent.click(quietView);

    await waitFor(() => {
      expect(quietView).toHaveAttribute("aria-pressed", "true");
      expect(openingStory).toHaveAttribute("data-motion-disabled", "true");
      expect(openingStory).toHaveAttribute("data-ambient-active", "false");
      expect(
        document.querySelectorAll('[data-ambient-active="true"]'),
      ).toHaveLength(0);
    });
    expect(quietView).toHaveFocus();
  });

  it("keeps the project social destinations in the persistent header", async () => {
    renderBook();

    const links = await screen.findByRole("navigation", {
      name: "Project links",
    });
    expect(
      within(links).getByRole("link", {
        name: "Follow @potapenko on Twitter",
      }),
    ).toHaveAttribute("href", "https://x.com/potapenko");
    expect(
      within(links).getByRole("link", {
        name: "Support the project on Patreon",
      }),
    ).toHaveAttribute("href", "https://www.patreon.com/c/playphraseme");
    expect(
      within(links).getByRole("link", {
        name: "View the project source on GitHub",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/potapenko/howweforgettofly",
    );
  });

  it("renders a complete Russian locale without forms or workbench routes", async () => {
    renderBook("/ru/#atlas");

    const main = await screen.findByRole("main", { name: "Как мы забываем летать" });
    expect(within(main).getByRole("heading", { name: "Как мы забываем летать" })).toBeVisible();
    const navigation = screen.getByRole("navigation", { name: "Навигация по книге" });
    expect(navigation).toBeVisible();
    expect(within(navigation).getByRole("link", { name: "Манифест" })).toHaveAttribute("href", "/ru/#manifesto");
    expect(screen.getByRole("link", { name: "RU" })).toHaveAttribute("aria-current", "page");
    expect(document.documentElement).toHaveAttribute("lang", "ru");
    expect(document.querySelector("form, input, textarea, fieldset")).toBeNull();
    expect(document.querySelector('a[href^="/atlas/"]')).toBeNull();
    const colophon = document.querySelector<HTMLElement>(".footer-colophon");
    expect(colophon).toHaveTextContent(/На создание этого сайта меня вдохновила книга/);
    expect(colophon?.querySelector("a, button")).toBeNull();
  });

  it("ends the independent story with Final Sky and a single quiet colophon", async () => {
    renderBook("/#final-sky");

    const finalSky = await screen.findByRole("heading", {
      name: "The Sky Remains Open",
    });
    expect(finalSky.closest('[data-book-section="final-sky"]')).toHaveAttribute(
      "id",
      "final-sky",
    );
    expect(document.querySelector('[data-book-section="source"]')).toBeNull();
    expect(document.querySelector(".manifesto-source-note")).toBeNull();
    expect(document.querySelector(".footer-covenant")).toBeNull();
    expect(document.querySelector(".footer-privacy")).toBeNull();
    expect(document.querySelector(".site-footer nav")).toBeNull();

    const colophons = document.querySelectorAll<HTMLElement>(".footer-colophon");
    expect(colophons).toHaveLength(1);
    expect(colophons[0]).toHaveTextContent(/I drew inspiration for this site from/);
    expect(colophons[0].querySelector("a, button")).toBeNull();
  });

  it("uses the inline, text-free Russian opening at mobile widths", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn((query: string) => ({
        matches: query.includes("max-width"),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    renderBook("/ru/#top");

    const opening = await waitFor(() => {
      const element = document.querySelector<HTMLElement>(
        '[data-story-mechanism="map-sky"]',
      );
      expect(element).toBeInTheDocument();
      if (!element) throw new Error("Opening story did not render");
      return element;
    });
    expect(opening).toHaveAttribute("data-layout", "inline");
    expect(opening).toHaveAttribute("data-motion-disabled", "false");
    expect(within(opening).getByTestId("story-poster")).toHaveAttribute(
      "src",
      "/parallax/home/background-master.png",
    );
    expect(document.querySelector(".home-cover-content")).toBeNull();
    expect(
      screen.getByRole("heading", { name: "Как мы забываем летать" }),
    ).toBeVisible();
  });

  it("uses normal-flow living illustrations at the exact 820px boundary", async () => {
    installResponsiveMatchMedia(820);
    renderBook("/#top");

    await screen.findByRole("main", { name: "How We Forget to Fly" });
    const stories = Array.from(
      document.querySelectorAll<HTMLElement>("[data-story-mechanism]"),
    );
    expect(stories.length).toBeGreaterThan(1);
    expect(stories.every((story) => story.dataset.layout === "inline")).toBe(
      true,
    );
    expect(
      stories.every((story) => story.dataset.motionDisabled === "false"),
    ).toBe(true);
    expect(document.querySelector(".home-mobile-intro")).toBeInTheDocument();
    expect(document.querySelector(".home-cover-content")).toBeNull();
    expect(document.querySelectorAll(".parallax-story__skip")).toHaveLength(0);

    const menuButton = screen.getByRole("button", {
      name: "Open navigation",
    });
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Primary" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "RU" })).toHaveAttribute(
      "href",
      "/ru/#top",
    );

    fireEvent.click(screen.getByRole("button", { name: "Quiet view" }));
    await waitFor(() => {
      expect(
        stories.every((story) => story.dataset.motionDisabled === "true"),
      ).toBe(true);
      expect(
        document.querySelectorAll('[data-ambient-active="true"]'),
      ).toHaveLength(0);
    });
  });

  it("keeps the opening cinematic but makes reading chapters inline at 821px", async () => {
    installResponsiveMatchMedia(821, { coarsePointer: false });
    renderBook("/#top");

    await screen.findByRole("main", { name: "How We Forget to Fly" });
    const opening = document.querySelector<HTMLElement>(
      '[data-story-mechanism="map-sky"]',
    );
    const chapterStories = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".scene-story-chapter > [data-story-mechanism]",
      ),
    );
    expect(opening).toHaveAttribute("data-layout", "sticky");
    expect(chapterStories.length).toBeGreaterThan(1);
    expect(
      chapterStories.every((story) => story.dataset.layout === "inline"),
    ).toBe(true);
    expect(document.querySelector(".home-mobile-intro")).toBeNull();
    expect(document.querySelector(".home-cover-content")).toBeInTheDocument();
  });

  it("keeps the header available on a direct hash visit and closes the mobile menu after navigation", async () => {
    renderBook();

    const header = document.querySelector(".site-header");
    expect(header).toBeInTheDocument();
    await waitFor(() => {
      expect(header).not.toHaveAttribute("inert");
      expect(header).not.toHaveAttribute("aria-hidden");
    });

    const menuButton = screen.getByRole("button", { name: "Open navigation" });
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    const navigation = screen.getByRole("navigation", { name: "Primary" });
    fireEvent.click(within(navigation).getByRole("link", { name: "Adults" }));

    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
      expect(menuButton).toHaveAccessibleName("Open navigation");
    });
  });

  it("keeps navigation and language controls available while the opening cover is held", async () => {
    renderBook("/#top");

    const header = document.querySelector(".site-header");
    expect(header).toBeInTheDocument();
    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        "data-home-cover-active",
        "true",
      );
    });
    expect(header).not.toHaveAttribute("inert");
    expect(header).not.toHaveAttribute("aria-hidden");

    const navigation = screen.getByRole("navigation", { name: "Primary" });
    const manifestoLink = within(navigation).getByRole("link", {
      name: "Manifesto",
    });
    expect(manifestoLink).toHaveAttribute("href", "/#manifesto");
    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "RU" })).toHaveAttribute(
      "href",
      "/ru/#top",
    );

    const manifesto = document.getElementById("manifesto");
    expect(manifesto).toBeInTheDocument();
    if (!manifesto) throw new Error("Manifesto section did not render");
    const scrollIntoView = vi.fn();
    Object.defineProperty(manifesto, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });
    fireEvent.click(manifestoLink);
    await waitFor(() => {
      expect(scrollIntoView).toHaveBeenCalledWith({
        block: "start",
        behavior: "auto",
      });
    });
  });

  it("switches locale at the nearest semantic content anchor", async () => {
    render(
      <MemoryRouter initialEntries={["/#parents"]}>
        <App />
        <LocationProbe />
      </MemoryRouter>,
    );

    await screen.findByRole("main", { name: "How We Forget to Fly" });
    const currentSection = document.getElementById(
      "parents-keeper-conditions",
    );
    expect(currentSection).toBeInTheDocument();
    if (!currentSection) throw new Error("Parents content anchor did not render");
    moveSemanticAnchorsOffscreen(currentSection);
    Object.defineProperty(currentSection, "getBoundingClientRect", {
      configurable: true,
      value: vi.fn(() => mockRect(40, 500)),
    });

    fireEvent.scroll(window);
    const russianLink = screen.getByRole("link", { name: "RU" });
    await waitFor(() => {
      expect(russianLink).toHaveAttribute(
        "href",
        "/ru/#parents-keeper-conditions",
      );
    });
    fireEvent.click(russianLink);

    await waitFor(() => {
      expect(screen.getByTestId("location-probe")).toHaveTextContent(
        "/ru/#parents-keeper-conditions",
      );
    });
  });

  it("switches locale without leaving the active sticky illustration", async () => {
    render(
      <MemoryRouter initialEntries={["/#ai-direction-test"]}>
        <App />
        <LocationProbe />
      </MemoryRouter>,
    );

    await screen.findByRole("main", { name: "How We Forget to Fly" });
    const illustration = document.getElementById(
      "scene-ai-03-illustration",
    );
    expect(illustration).toBeInTheDocument();
    if (!illustration) {
      throw new Error("AI candidate-map illustration did not render");
    }
    moveSemanticAnchorsOffscreen(illustration);
    let localeSwitched = false;
    Object.defineProperty(illustration, "getBoundingClientRect", {
      configurable: true,
      value: vi.fn(() =>
        localeSwitched ? mockRect(500, 3_000) : mockRect(40, 3_000)
      ),
    });

    fireEvent.scroll(window);
    const russianLink = screen.getByRole("link", { name: "RU" });
    await waitFor(() => {
      expect(russianLink).toHaveAttribute(
        "href",
        "/ru/#scene-ai-03-illustration",
      );
      expect(
        within(screen.getByRole("navigation", { name: "Primary" })).getByRole(
          "link",
          { name: "Set the Wind" },
        ),
      ).toHaveAttribute("aria-current", "location");
    });
    localeSwitched = true;
    fireEvent.click(russianLink);

    await waitFor(() => {
      expect(screen.getByTestId("location-probe")).toHaveTextContent(
        "/ru/#scene-ai-03-illustration",
      );
      expect(window.scrollTo).toHaveBeenCalledWith({
        behavior: "auto",
        left: 0,
        top: 460,
      });
    });
  });

  it("keeps the same visual reading point when Quiet collapses sticky holds", async () => {
    renderBook("/#parents");

    await screen.findByRole("main", { name: "How We Forget to Fly" });
    const currentSection = document.getElementById(
      "parents-keeper-conditions",
    );
    expect(currentSection).toBeInTheDocument();
    if (!currentSection) throw new Error("Parents content anchor did not render");
    moveSemanticAnchorsOffscreen(currentSection);
    Object.defineProperty(currentSection, "getBoundingClientRect", {
      configurable: true,
      value: vi.fn(() =>
        document.documentElement.dataset.quietView === "true"
          ? mockRect(300, 180)
          : mockRect(40, 600),
      ),
    });
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 1_000,
    });

    fireEvent.scroll(window);
    const quietView = screen.getByRole("button", { name: "Quiet view" });
    fireEvent.click(quietView);

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        "data-quiet-view",
        "true",
      );
      expect(window.scrollTo).toHaveBeenCalledWith({
        behavior: "auto",
        left: 0,
        top: 1_225,
      });
    });
  });

  it("redirects the legacy Parents route to the canonical in-page anchor", async () => {
    render(
      <MemoryRouter initialEntries={["/parents"]}>
        <App />
        <LocationProbe />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("location-probe")).toHaveTextContent(
        "/#parents",
      );
    });
    expect(
      await screen.findByRole("main", { name: "How We Forget to Fly" }),
    ).toBeInTheDocument();
  });

  it("normalizes the slashless Russian root without losing its chapter", async () => {
    render(
      <MemoryRouter initialEntries={["/ru#parents"]}>
        <App />
        <LocationProbe />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("location-probe")).toHaveTextContent(
        "/ru/#parents",
      );
    });
    expect(
      await screen.findByRole("main", { name: "Как мы забываем летать" }),
    ).toBeInTheDocument();
  });
});
