import { afterEach, describe, expect, it, vi } from "vitest";
import {
  captureReadingPosition,
  restoreReadingPosition,
} from "./readingPosition";

function rect(top: number, height: number): DOMRect {
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

describe("semantic reading position", () => {
  afterEach(() => {
    document.body.replaceChildren();
    vi.restoreAllMocks();
  });

  it("captures the smallest real content anchor crossing the reading line", () => {
    document.body.innerHTML = `
      <div id="main-content">
        <main>
          <section id="parents" data-book-section="parents">
            <section id="parents-keeper-conditions" data-pathway-section="keeper-conditions"></section>
          </section>
          <section id="adults" data-book-section="adults"></section>
        </main>
      </div>
    `;
    const parents = document.getElementById("parents");
    const keeperConditions = document.getElementById(
      "parents-keeper-conditions",
    );
    const adults = document.getElementById("adults");
    if (!parents || !keeperConditions || !adults) {
      throw new Error("Reading-position fixture did not render");
    }
    vi.spyOn(parents, "getBoundingClientRect").mockReturnValue(
      rect(0, 1_000),
    );
    vi.spyOn(keeperConditions, "getBoundingClientRect").mockReturnValue(
      rect(40, 300),
    );
    vi.spyOn(adults, "getBoundingClientRect").mockReturnValue(
      rect(500, 400),
    );

    expect(captureReadingPosition(document, 90)).toEqual({
      anchor: "parents-keeper-conditions",
      viewportOffset: 90,
      sectionProgress: 1 / 6,
    });
  });

  it("captures an illustrated sticky chapter instead of its broader pathway group", () => {
    document.body.innerHTML = `
      <div id="main-content">
        <main>
          <section id="ai" data-book-section="ai">
            <div id="ai-ideas" class="pathway-sections">
              <div
                id="scene-ai-03-illustration"
                class="scene-story-chapter"
                data-scene="scene-ai-03"
              >
                <section id="ai-direction-test" data-scene-content="scene-ai-03"></section>
              </div>
            </div>
          </section>
        </main>
      </div>
    `;
    const ai = document.getElementById("ai");
    const ideas = document.getElementById("ai-ideas");
    const illustration = document.getElementById(
      "scene-ai-03-illustration",
    );
    const content = document.getElementById("ai-direction-test");
    if (!ai || !ideas || !illustration || !content) {
      throw new Error("Illustration-position fixture did not render");
    }
    vi.spyOn(ai, "getBoundingClientRect").mockReturnValue(rect(-2_000, 8_000));
    vi.spyOn(ideas, "getBoundingClientRect").mockReturnValue(
      rect(-1_000, 6_000),
    );
    vi.spyOn(illustration, "getBoundingClientRect").mockReturnValue(
      rect(-510, 3_000),
    );
    vi.spyOn(content, "getBoundingClientRect").mockReturnValue(
      rect(2_000, 400),
    );

    expect(captureReadingPosition(document, 90)).toEqual({
      anchor: "scene-ai-03-illustration",
      viewportOffset: 90,
      sectionProgress: 0.2,
    });
  });

  it("restores the same relative point after a sticky section changes height", () => {
    document.body.innerHTML = `
      <div id="main-content">
        <main>
          <section id="parents-keeper-conditions" data-pathway-section="keeper-conditions"></section>
        </main>
      </div>
    `;
    const target = document.getElementById("parents-keeper-conditions");
    if (!target) throw new Error("Reading-position fixture did not render");
    vi.spyOn(target, "getBoundingClientRect").mockReturnValue(rect(300, 120));
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 1_000,
    });
    Object.defineProperty(window, "scrollX", {
      configurable: true,
      value: 0,
    });
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    expect(
      restoreReadingPosition({
        anchor: "parents-keeper-conditions",
        viewportOffset: 90,
        sectionProgress: 1 / 6,
      }),
    ).toBe(true);
    expect(scrollTo).toHaveBeenCalledWith({
      behavior: "auto",
      left: 0,
      top: 1_230,
    });
  });
});
