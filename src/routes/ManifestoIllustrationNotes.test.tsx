import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LocaleProvider } from "../i18n/LocaleContext";
import { TheatreProvider } from "../theatre";
import { ManifestoPage } from "./ManifestoPage";

function renderManifesto(entry: string) {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <LocaleProvider>
        <TheatreProvider initialReducedMotion>
          <ManifestoPage embedded />
        </TheatreProvider>
      </LocaleProvider>
    </MemoryRouter>,
  );
}

describe("Manifesto illustrations", () => {
  afterEach(cleanup);

  it.each([
    ["English", "/#manifesto", "What the illustration holds"],
    ["Russian", "/ru/#manifesto", "Что показывает иллюстрация"],
  ])("keeps the %s illustration open to interpretation", (_, entry, label) => {
    const { container } = renderManifesto(entry);

    expect(screen.queryByText(label)).toBeNull();
    expect(container.querySelector(".scene-reading-note")).toBeNull();
    expect(container.querySelectorAll(".article-body")).toHaveLength(12);
    expect(container.querySelectorAll(".article-landing")).toHaveLength(12);
  });
});
