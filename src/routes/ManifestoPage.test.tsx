import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LocaleProvider } from "../i18n/LocaleContext";
import { TheatreProvider } from "../theatre";
import { ManifestoPage } from "./ManifestoPage";

function renderManifesto(entry = "/#manifesto") {
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

describe("Manifesto reading flow", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders all twelve articles as continuous reading with no form controls", () => {
    const { container } = renderManifesto();
    expect(container.querySelectorAll(".manifesto-spread")).toHaveLength(12);
    expect(container.querySelector("form, fieldset, input, textarea, select")).toBeNull();
    expect(screen.getByRole("heading", { name: "What must remain ours" })).toBeVisible();
    expect(screen.getAllByText("In ordinary life")).toHaveLength(12);
  });

  it("keeps the Manifesto inside the independent work without source apparatus", () => {
    const { container } = renderManifesto();
    expect(container.querySelector(".manifesto-source-note")).toBeNull();
    expect(screen.queryByRole("link", { name: "Read the Russian text" })).toBeNull();
    expect(container.querySelector('a[href*="universalinternetlibrary"]')).toBeNull();
  });

  it("uses contextual Russian copy on the Russian route", () => {
    const { container } = renderManifesto("/ru/#manifesto");
    expect(screen.getByRole("heading", { name: "То, что должно остаться нашим" })).toBeVisible();
    expect(within(container).getByRole("heading", { name: "Достоинство не зависит от Полёта" })).toBeVisible();
    expect(screen.getAllByText("Если приложить к жизни")).toHaveLength(12);
    expect(container.querySelector("form, fieldset, input, textarea, select")).toBeNull();
  });
});
