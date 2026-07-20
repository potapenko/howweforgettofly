import { describe, expect, it } from "vitest";
import { pageScenesFor } from "./pages";

describe("page scenes", () => {
  it("gives the Atlas its own equal-lenses scene without changing its copy", () => {
    expect(pageScenesFor("en").atlas).toMatchObject({
      mechanism: "equal-lenses",
      title: "One sheet, ten honest doorways",
      plainMeaning:
        "Choose by the work in front of you, not by a type assigned to you.",
      description:
        "A continuous sheet unfolds into ten equal paper mechanisms. None is elevated, locked, numbered as progress, or recommended by an algorithm.",
    });
    expect(pageScenesFor("ru").atlas).toMatchObject({
      mechanism: "equal-lenses",
      title: "Один лист, десять честных входов",
      plainMeaning:
        "Выбирайте по работе, которая стоит перед вами, а не по присвоенному типу личности.",
      description:
        "Непрерывный лист раскрывается в десять равноправных бумажных механизмов. Ни один не поднят выше, не заперт и не назначен алгоритмом.",
    });
  });
});
