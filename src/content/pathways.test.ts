import { describe, expect, it } from "vitest";
import { pathways, windRoles } from "./pathways";
import { pathwaysRu, windRolesRu } from "./pathways.ru";

describe("pathway links", () => {
  it("gives parents a direct route to the Return article", () => {
    expect(pathways.parent.routeLinks).toContainEqual(
      expect.objectContaining({
        label: "The Return",
        href: "/manifesto/M10",
        kind: "reference",
      }),
    );
  });

  it("does not silently fall back to English reader copy in the Russian edition", () => {
    const structuralKeys = new Set([
      "id",
      "href",
      "route",
      "kind",
      "atlasExperienceId",
      "register",
      "mechanism",
      "accent",
    ]);
    const untranslated: string[] = [];

    function compare(en: unknown, ru: unknown, key = "") {
      if (Array.isArray(en) && Array.isArray(ru)) {
        en.forEach((value, index) => compare(value, ru[index], key));
        return;
      }
      if (en && ru && typeof en === "object" && typeof ru === "object") {
        Object.entries(en).forEach(([childKey, value]) => {
          compare(value, (ru as Record<string, unknown>)[childKey], childKey);
        });
        return;
      }
      if (
        typeof en === "string" &&
        typeof ru === "string" &&
        !structuralKeys.has(key) &&
        en === ru
      ) {
        untranslated.push(en);
      }
    }

    compare(pathways, pathwaysRu);
    compare(windRoles, windRolesRu);
    expect(untranslated).toEqual([]);
  });
});
