import { afterEach, describe, expect, it, vi } from "vitest";
import { createPageViewTracker, MEASUREMENT_ID } from "./googleAnalytics";

function fixture(origin = "https://howweforgettofly.com") {
  const document = window.document.implementation.createHTMLDocument();
  Object.defineProperty(document, "referrer", {
    value: "https://example.com/article?private=value#section",
  });
  const browser = { location: new URL(origin), document } as unknown as Window;
  const track = createPageViewTracker(browser);
  const commands = () => (browser.dataLayer ?? []).map(
    (command) => Array.from(command as IArguments),
  );
  const views = () => commands().filter((command) => command[0] === "event");
  return { browser, document, track, commands, views };
}

afterEach(() => vi.restoreAllMocks());

describe("production reading analytics", () => {
  it.each([
    "http://localhost:5173", "https://preview.example.com",
    "http://howweforgettofly.com", "https://howweforgettofly.com.example.com",
  ])("does not load or queue analytics on %s", (origin) => {
    const { track, document, commands } = fixture(origin);
    track("/");
    expect(commands()).toEqual([]);
    expect(document.scripts).toHaveLength(0);
  });

  it.each(["https://howweforgettofly.com", "https://www.howweforgettofly.com"])(
    "initializes once and disables automatic/ad measurement on %s", (origin) => {
      const { track, commands, document, views } = fixture(origin);
      track("/");
      track("/"); // StrictMode effect replay.
      expect(document.scripts).toHaveLength(1);
      expect(document.scripts[0].async).toBe(true);
      expect(document.scripts[0].src).toBe(
        `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`,
      );
      expect(commands().filter(([name]) => name === "config")).toEqual([
        ["config", MEASUREMENT_ID, expect.objectContaining({
          send_page_view: false,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
        })],
      ]);
      expect(views()).toHaveLength(1);
    },
  );

  it("counts locale switches and back navigation, not chapter/query changes", () => {
    const { browser, track, views } = fixture();
    track("/");
    browser.location.hash = "#parents";
    track("/");
    browser.location.search = "?private=value";
    track("/");
    track("/ru/");
    track("/");
    expect(views()).toEqual([
      ["event", "page_view", expect.objectContaining({
        page_location: "https://howweforgettofly.com/",
        page_referrer: "https://example.com/article",
        send_to: MEASUREMENT_ID,
      })],
      ["event", "page_view", expect.objectContaining({
        page_location: "https://howweforgettofly.com/ru/",
        page_referrer: "https://howweforgettofly.com/",
        page_title: "Как мы забываем летать — Творчество, авторство и ИИ",
      })],
      ["event", "page_view", expect.objectContaining({
        page_location: "https://howweforgettofly.com/",
        page_referrer: "https://howweforgettofly.com/ru/",
      })],
    ]);
  });

  it("counts only the canonical destination of redirects", () => {
    const { track, views } = fixture();
    track("/ru");
    track("/ru/manifesto");
    expect(views()).toEqual([]);
    track("/ru/");
    track("/unknown");
    expect(views()).toHaveLength(1);
    track("/ru/");
    expect(views()).toHaveLength(2);
  });

  it("does not throw or retry initialization if script insertion is blocked", () => {
    const { document, track } = fixture();
    const append = vi.spyOn(document.head, "appendChild").mockImplementation(() => {
      throw new Error("Blocked by browser policy");
    });
    expect(() => { track("/"); track("/ru/"); }).not.toThrow();
    expect(append).toHaveBeenCalledTimes(1);
  });

  it("works without waiting for the tag to load and tolerates a load error", () => {
    const { document, track, views } = fixture();
    track("/");
    document.scripts[0].dispatchEvent(new Event("error"));
    expect(() => track("/ru/")).not.toThrow();
    expect(views()).toHaveLength(2);
  });
});
