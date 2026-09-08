import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LocaleProvider } from "../i18n/LocaleContext";
import { TheatreProvider } from "../theatre";
import { FinalSkyPage } from "./FinalSkyPage";

function renderFinalSky(entry = "/#final-sky") {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <LocaleProvider>
        <TheatreProvider>
          <FinalSkyPage />
        </TheatreProvider>
      </LocaleProvider>
    </MemoryRouter>,
  );
}

describe("Final Sky illustrated cadence", () => {
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

  it("uses FINAL01 and lands on the authorized English line", () => {
    const { container } = renderFinalSky();
    const story = container.querySelector<HTMLElement>(
      '[data-story-mechanism="open-horizon"]',
    )!;

    expect(story).toBeInTheDocument();
    expect(screen.getByTestId("story-poster")).toHaveAttribute(
      "srcset",
      "/scenes/FINAL01-960.webp 960w, /scenes/FINAL01.webp 1672w",
    );
    expect(screen.getByText("The page ends here. The Sky does not.")).toBeVisible();
    expect(container.querySelector(".final-sky-copy > p:last-child"))
      .toHaveTextContent("The page ends here. The Sky does not.");
    expect(container.querySelector(".final-sky-cadence")).toBeNull();
  });

  it("keeps the independent Russian cadence", () => {
    const { container } = renderFinalSky("/ru/#final-sky");

    expect(screen.getByText("Здесь заканчивается страница. Не небо.")).toBeVisible();
    expect(container.querySelector(".final-sky-copy > p:last-child"))
      .toHaveTextContent("Здесь заканчивается страница. Не небо.");
    expect(container.querySelector(".final-sky-cadence")).toBeNull();
  });
});
