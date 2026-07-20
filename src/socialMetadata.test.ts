import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const indexPath = resolve("index.html");
const imagePath = resolve(
  "public/social/how-we-forget-to-fly-social-1200x630.png",
);
const documentHead = new DOMParser().parseFromString(
  readFileSync(indexPath, "utf8"),
  "text/html",
).head;

function contentFor(selector: string) {
  return documentHead.querySelector<HTMLMetaElement>(selector)?.content;
}

describe("social preview metadata", () => {
  it("exposes a crawler-readable large-image preview", () => {
    const image =
      "https://howweforgettofly.com/social/how-we-forget-to-fly-social-1200x630.png";

    expect(contentFor('meta[property="og:type"]')).toBe("website");
    expect(contentFor('meta[property="og:url"]')).toBe(
      "https://howweforgettofly.com/",
    );
    expect(contentFor('meta[property="og:title"]')).toBe(
      "How We Forget to Fly",
    );
    expect(contentFor('meta[property="og:image"]')).toBe(image);
    expect(contentFor('meta[property="og:image:width"]')).toBe("1200");
    expect(contentFor('meta[property="og:image:height"]')).toBe("630");
    expect(contentFor('meta[name="twitter:card"]')).toBe(
      "summary_large_image",
    );
    expect(contentFor('meta[name="twitter:image"]')).toBe(image);
  });

  it("ships the declared social image in the static public artifact", () => {
    expect(existsSync(imagePath)).toBe(true);

    const image = readFileSync(imagePath);
    expect(image.subarray(1, 4).toString("ascii")).toBe("PNG");
    expect(image.readUInt32BE(16)).toBe(1200);
    expect(image.readUInt32BE(20)).toBe(630);
  });

  it("keeps social metadata independent of the source book", () => {
    const socialMetadata = Array.from(documentHead.querySelectorAll("meta"))
      .filter((meta) =>
        ["og:", "twitter:"].some((prefix) =>
          (meta.getAttribute("property") ?? meta.name).startsWith(prefix),
        ),
      )
      .map((meta) => meta.content)
      .join(" ");

    expect(socialMetadata).not.toMatch(/Akimov|Klimenko|flying children/i);
  });
});
