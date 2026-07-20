import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LocaleProvider } from "../i18n/LocaleContext";
import { TheatreProvider } from "../theatre";
import type { PathwayId } from "../content/pathways";
import { PathwayPage } from "./PathwayPage";

function renderPathway(pathwayId: PathwayId, entry = `/#${pathwayId}`) {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <LocaleProvider>
        <TheatreProvider>
          <PathwayPage pathwayId={pathwayId} />
        </TheatreProvider>
      </LocaleProvider>
    </MemoryRouter>,
  );
}

function renderAiPath(entry = "/#ai") {
  return renderPathway("ai", entry);
}

describe("AI pathway illustrated acts", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("places AI-02 after the human assignments and releases into the next approved section", () => {
    const { container } = renderAiPath();
    const assignments = document.getElementById("ai-human-assignments");
    const illustratedAct = container.querySelector<HTMLElement>(
      '[data-scene="scene-ai-02"]',
    );
    const windRoles = document.getElementById("ai-wind-roles");

    expect(assignments).toBeInTheDocument();
    expect(illustratedAct).toContainElement(windRoles);
    expect(
      assignments!.compareDocumentPosition(illustratedAct!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      within(illustratedAct!).getByRole("heading", {
        name: "Six roles for Wind",
      }),
    ).toBeVisible();
    expect(
      illustratedAct!.querySelector('[data-story-mechanism="adoption-folds"]'),
    ).toHaveAttribute("data-layout", "sticky");
    expect(
      within(assignments!).getByText(/^Generation is not adoption\./),
    ).toBeVisible();

    const ids = Array.from(
      container.querySelectorAll<HTMLElement>("[data-pathway-section]"),
      (section) => section.id,
    );
    expect(ids).toContain("ai-human-assignments");
    expect(ids).toContain("ai-wind-roles");
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses the Russian scene description and the authored inline mobile pose", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn((query: string) => ({
        matches: query.includes("max-width"),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
    const { container } = renderAiPath("/ru#ai");
    const story = container.querySelector<HTMLElement>(
      '[data-story-mechanism="adoption-folds"]',
    )!;
    const poster = within(story).getByTestId("story-poster");

    expect(story).toHaveAttribute("data-layout", "inline");
    expect(story).toHaveAttribute("data-story-progress", "0.720");
    expect(poster).toHaveAttribute(
      "srcset",
      "/scenes/AI02-960.webp 960w, /scenes/AI02.webp 1672w",
    );
    expect(
      within(story).getByText(
        "В раскрытую pop-up-книгу Ветер приносит несколько бумажных форм. Четыре равноправных механизма остаются доступными; одну форму намеренно меняют руки человека.",
        { selector: "figcaption" },
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Что остаётся за человеком" }),
    ).toBeVisible();
  });

  it("renders the authored Russian beat narration for the new AI scenes", () => {
    const { container } = renderAiPath("/ru#ai");
    const expectedFirstBeats = {
      "adoption-folds": [
        "Свободное место ждёт",
        "До Ветра уже есть вопрос и свободное место.",
      ],
      "candidate-map": [
        "Появляется одна карта",
        "Один маршрут появляется как возможность.",
      ],
      "return-threshold": [
        "Появляется репетиция",
        "Правдоподобная аудитория появляется без последствий.",
      ],
    } as const;

    for (const [mechanism, [label, narration]] of Object.entries(
      expectedFirstBeats,
    )) {
      const story = container.querySelector<HTMLElement>(
        `[data-story-mechanism="${mechanism}"]`,
      )!;

      expect(within(story).getByText(label)).toBeVisible();
      expect(within(story).getByText(narration)).toBeVisible();
    }
  });

  it("wraps the polished-proposal and Return sections in their own acts", () => {
    const { container } = renderAiPath();
    const protocol = document.getElementById("ai-protocol")!;
    const direction = document.getElementById("ai-direction-test")!;
    const attribution = document.getElementById("ai-adoption-attribution")!;
    const craftScope = document.getElementById("ai-craft-scope")!;
    const candidateAct = container.querySelector<HTMLElement>(
      '[data-scene="scene-ai-03"]',
    )!;
    const returnAct = container.querySelector<HTMLElement>(
      '[data-scene="scene-ai-04"]',
    )!;

    expect(candidateAct).toContainElement(direction);
    expect(returnAct).toContainElement(craftScope);
    expect(
      protocol.compareDocumentPosition(candidateAct) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      attribution.compareDocumentPosition(returnAct) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      candidateAct.querySelector('[data-story-mechanism="candidate-map"]'),
    ).toBeInTheDocument();
    expect(
      returnAct.querySelector('[data-story-mechanism="return-threshold"]'),
    ).toBeInTheDocument();
    expect(within(candidateAct).getByRole("heading", {
      name: "Recover direction from a polished proposal",
    })).toBeVisible();
    expect(within(returnAct).getByRole("heading", {
      name: "Choose assistance by meaning, learning, access, and responsibility",
    })).toBeVisible();
  });

  it.each([
    {
      pathwayId: "parent" as const,
      sceneId: "scene-p-01",
      mechanism: "honest-mode-rail",
      sectionId: "parents-honest-modes",
      heading: "Name the mode honestly",
    },
    {
      pathwayId: "adult" as const,
      sceneId: "scene-a-01",
      mechanism: "ground-or-gravity",
      sectionId: "adults-ground-gravity",
      heading: "Ground is not Gravity",
    },
  ])("wraps the approved $pathwayId prose without replacing it", ({
    pathwayId,
    sceneId,
    mechanism,
    sectionId,
    heading,
  }) => {
    const { container } = renderPathway(pathwayId);
    const act = container.querySelector<HTMLElement>(
      `[data-scene="${sceneId}"]`,
    )!;
    const section = document.getElementById(sectionId)!;

    expect(act).toContainElement(section);
    expect(
      act.querySelector(`[data-story-mechanism="${mechanism}"]`),
    ).toBeInTheDocument();
    expect(within(section).getByRole("heading", { name: heading })).toBeVisible();
  });

  it.each([
    {
      entry: "/#adult",
      pairs: [
        ["Money", "Care"],
        ["Craft", "Work"],
        ["AI", "Rest"],
      ],
      bodies: [
        "Reliable income may be necessary now.",
        "Choices affect people who depend on us.",
        "A form may require repetition and skills not yet learned.",
        "Some tasks belong to an accepted or currently unavoidable agreement.",
        "A tool can make some versions faster.",
        "Capacity can be low and recovery necessary.",
      ],
    },
    {
      entry: "/ru#adult",
      pairs: [
        ["Деньги", "Забота"],
        ["Ремесло", "Работа"],
        ["ИИ", "Отдых"],
      ],
      bodies: [
        "Стабильный доход может быть необходим прямо сейчас.",
        "Наш выбор затрагивает людей, которые от нас зависят.",
        "Форма может потребовать повторения и навыков, которым ещё предстоит научиться.",
        "Некоторые задачи входят в принятое или пока неизбежное соглашение.",
        "Инструмент может ускорить создание некоторых версий.",
        "Сил может быть мало, а восстановление — необходимо.",
      ],
    },
  ])("fills every A-01 paper tag from the exact $entry Ground cards", ({
    entry,
    pairs,
    bodies,
  }) => {
    const { container } = renderPathway("adult", entry);
    const support = container.querySelector<HTMLElement>(
      '[data-story-mechanism="ground-or-gravity"] .parallax-story__editorial-supports',
    )!;
    const prose = document.getElementById("adults-ground-gravity")!;
    const panels = Array.from(
      support.querySelectorAll<HTMLElement>("[data-story-editorial-panel]"),
    );

    expect(support).toHaveAttribute("aria-hidden", "true");
    expect(panels).toHaveLength(3);
    pairs.forEach((pair, index) => {
      pair.forEach((title) => expect(panels[index]).toHaveTextContent(title));
    });
    bodies.forEach((body) => {
      expect(support).not.toHaveTextContent(body);
      expect(prose).toHaveTextContent(body);
    });
    expect(support).not.toHaveTextContent(/Gravity says|Инерция говорит/);
  });
});
