import { describe, expect, it } from "vitest";
import {
  bookAnchorFromHash,
  canonicalBookHref,
  legacyBookDestination,
  sectionForHash,
} from "./bookNavigation";

describe("bookAnchorFromHash", () => {
  it("normalizes manifesto IDs and safely rejects malformed escapes", () => {
    expect(bookAnchorFromHash("#m08")).toBe("M08");
    expect(bookAnchorFromHash("#%4D08")).toBe("M08");
    expect(bookAnchorFromHash("#%E0%A4%A")).toBe("");
  });
});

const formerTopLevelRoutes = [
  ["/", "/#top", "home"],
  ["/manifesto", "/#manifesto", "manifesto"],
  ["/parents", "/#parents", "parents"],
  ["/adults", "/#adults", "adults"],
  ["/ai", "/#ai", "ai"],
  ["/atlas", "/#atlas", "atlas"],
  ["/final-sky", "/#final-sky", "final-sky"],
] as const;

describe("canonicalBookHref", () => {
  it.each(formerTopLevelRoutes)(
    "maps the former %s route to %s",
    (route, destination) => {
      expect(canonicalBookHref(route)).toBe(destination);
      expect(canonicalBookHref(route === "/" ? route : `${route}/`)).toBe(
        destination,
      );
    },
  );

  it("maps manifesto article routes to case-normalized chapter anchors", () => {
    expect(canonicalBookHref("/manifesto/M01")).toBe("/#M01");
    expect(canonicalBookHref("/manifesto/m12")).toBe("/#M12");
  });

  it("normalizes local anchors and preserves already-canonical book links", () => {
    expect(canonicalBookHref("#parents")).toBe("/#parents");
    expect(canonicalBookHref("/#final-sky")).toBe("/#final-sky");
  });

  it("folds retired Atlas workbench URLs back into the reading chapter", () => {
    expect(canonicalBookHref("/atlas/problem-finder")).toBe(
      "/#atlas",
    );
  });

  it("builds the same anchors under the Russian locale root", () => {
    expect(canonicalBookHref("/manifesto/M04", "ru")).toBe("/ru/#M04");
    expect(canonicalBookHref("/parents", "ru")).toBe("/ru/#parents");
    expect(canonicalBookHref("/ru#parents", "ru")).toBe("/ru/#parents");
    expect(canonicalBookHref("/ru/#parents", "ru")).toBe("/ru/#parents");
  });
});

describe("sectionForHash", () => {
  it.each(formerTopLevelRoutes)(
    "resolves the %s destination to the %s book section",
    (_route, destination, section) => {
      expect(sectionForHash(new URL(destination, "https://example.test").hash)).toBe(
        section,
      );
    },
  );

  it("treats every manifesto chapter anchor as part of the Manifesto", () => {
    expect(sectionForHash("#M01")).toBe("manifesto");
    expect(sectionForHash("#m12")).toBe("manifesto");
  });

  it("tracks namespaced anchors inside each top-level section", () => {
    expect(sectionForHash("#parents-practices")).toBe("parents");
    expect(sectionForHash("#adults-ideas")).toBe("adults");
    expect(sectionForHash("#ai-practices")).toBe("ai");
    expect(sectionForHash("#atlas-practices")).toBe("atlas");
    expect(sectionForHash("#final-sky")).toBe("final-sky");
  });

  it("falls back to Home for an empty or unknown hash", () => {
    expect(sectionForHash("")).toBe("home");
    expect(sectionForHash("#not-a-book-section")).toBe("home");
  });
});

describe("legacyBookDestination", () => {
  it("normalizes the slashless Russian root without losing its hash", () => {
    expect(legacyBookDestination("/ru", "#parents")).toBe("/ru/#parents");
  });

  it.each(formerTopLevelRoutes)(
    "redirects the former %s route to %s",
    (route, destination) => {
      expect(legacyBookDestination(route)).toBe(destination);
      expect(
        legacyBookDestination(route === "/" ? route : `${route}/`),
      ).toBe(destination);
    },
  );

  it("redirects legacy manifesto chapter routes to canonical anchors", () => {
    expect(legacyBookDestination("/manifesto/M01")).toBe("/#M01");
    expect(legacyBookDestination("/manifesto/m12")).toBe("/#M12");
  });

  it("gives an explicit legacy hash precedence over the pathname", () => {
    expect(legacyBookDestination("/manifesto/M03", "#M07")).toBe("/#M07");
  });

  it("redirects retired Atlas workbenches into the long-form Atlas chapter", () => {
    expect(legacyBookDestination("/atlas/problem-finder")).toBe("/#atlas");
    expect(legacyBookDestination("/ru/atlas/problem-finder")).toBe("/ru/#atlas");
  });

  it("keeps former Source addresses as invisible aliases to Final Sky", () => {
    expect(canonicalBookHref("/source")).toBe("/#final-sky");
    expect(canonicalBookHref("/#source")).toBe("/#final-sky");
    expect(sectionForHash("#source-boundary")).toBe("final-sky");
    expect(legacyBookDestination("/source")).toBe("/#final-sky");
    expect(legacyBookDestination("/ru/source")).toBe("/ru/#final-sky");
  });

  it("does not let an unknown route bypass Not Found by adding a hash", () => {
    expect(
      legacyBookDestination("/not-a-route", "#not-an-anchor"),
    ).toBeNull();
  });
});
