import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppErrorBoundary } from "./AppErrorBoundary";

function DeliberateFailure() {
  const [failed, setFailed] = useState(false);
  if (failed) throw new Error("Deliberate child failure");
  return <button type="button" onClick={() => setFailed(true)}>Fail once</button>;
}

describe("AppErrorBoundary recovery", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("offers a truthful recovery screen without referring to form data", async () => {
    render(<AppErrorBoundary><DeliberateFailure /></AppErrorBoundary>);
    fireEvent.click(screen.getByRole("button", { name: "Fail once" }));

    const heading = await screen.findByRole("heading", {
      name: "The paper theatre could not continue.",
    });
    await waitFor(() => expect(heading).toHaveFocus());
    expect(screen.getByText(/there are no forms or unsaved entries/i)).toBeVisible();
    expect(screen.getByRole("button", { name: "Retry" })).toBeEnabled();
    expect(screen.getByRole("link", { name: "Reload the page" })).toHaveAttribute("href");
  });
});
