import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("home story mobile crop", () => {
  it("keeps inline Quiet and reduced-motion artwork within the mobile viewport", () => {
    const css = readFileSync(
      join(process.cwd(), "src/home-story.css"),
      "utf8",
    );

    expect(css).toMatch(
      /@media \(max-width: 820px\)[\s\S]*?\.home-story\[data-layout="inline"\]\[data-motion-disabled="true"\][\s\S]*?\.parallax-story__visual\s*\{[\s\S]*?width: 100vw;[\s\S]*?max-width: 100%;[\s\S]*?transform: none;/,
    );
  });
});
