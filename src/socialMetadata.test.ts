import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const productionRoot = "https://howweforgettofly.com";
const socialImage =
  `${productionRoot}/social/how-we-forget-to-fly-social-1200x630.png`;
const imagePath = resolve(
  "public/social/how-we-forget-to-fly-social-1200x630.png",
);
const faviconPath = resolve("public/favicon.png");

const editions = [
  {
    locale: "en",
    path: resolve("index.html"),
    url: `${productionRoot}/`,
    title: "How We Forget to Fly — Creativity, Agency, and AI",
    description:
      "On childhood curiosity, adult authorship, and AI that can act as wind—but never as the pilot.",
    ogLocale: "en_US",
    alternateOgLocale: "ru_RU",
  },
  {
    locale: "ru",
    path: resolve("ru/index.html"),
    url: `${productionRoot}/ru/`,
    title: "Как мы забываем летать — Творчество, авторство и ИИ",
    description:
      "О детском любопытстве, взрослом авторстве и искусственном интеллекте, который может быть ветром — но не пилотом.",
    ogLocale: "ru_RU",
    alternateOgLocale: "en_US",
  },
] as const;

function parseDocument(path: string) {
  return new DOMParser().parseFromString(readFileSync(path, "utf8"), "text/html");
}

function contentFor(head: HTMLHeadElement, selector: string) {
  return head.querySelector<HTMLMetaElement>(selector)?.content;
}

function hrefFor(head: HTMLHeadElement, selector: string) {
  return head.querySelector<HTMLLinkElement>(selector)?.getAttribute("href");
}

describe("search and social metadata", () => {
  it.each(editions)(
    "exposes localized crawler-readable metadata for $locale",
    (edition) => {
      const document = parseDocument(edition.path);
      const { head } = document;

      expect(document.documentElement.lang).toBe(edition.locale);
      expect(head.querySelectorAll("title")).toHaveLength(1);
      expect(head.querySelector("title")?.textContent).toBe(edition.title);
      expect(contentFor(head, 'meta[name="description"]')).toBe(
        edition.description,
      );
      expect(contentFor(head, 'meta[name="robots"]')).toBe(
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      );
      expect(head.querySelector('meta[name="keywords"]')).toBeNull();
    },
  );

  it.each(editions)(
    "publishes a self-canonical and reciprocal language links for $locale",
    (edition) => {
      const head = parseDocument(edition.path).head;

      expect(head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
      expect(hrefFor(head, 'link[rel="canonical"]')).toBe(edition.url);
      expect(hrefFor(head, 'link[rel="alternate"][hreflang="en"]')).toBe(
        `${productionRoot}/`,
      );
      expect(hrefFor(head, 'link[rel="alternate"][hreflang="ru"]')).toBe(
        `${productionRoot}/ru/`,
      );
      expect(
        hrefFor(head, 'link[rel="alternate"][hreflang="x-default"]'),
      ).toBe(`${productionRoot}/`);
    },
  );

  it.each(editions)(
    "keeps Open Graph and X metadata aligned for $locale",
    (edition) => {
      const head = parseDocument(edition.path).head;

      expect(contentFor(head, 'meta[property="og:type"]')).toBe("website");
      expect(contentFor(head, 'meta[property="og:url"]')).toBe(edition.url);
      expect(contentFor(head, 'meta[property="og:locale"]')).toBe(
        edition.ogLocale,
      );
      expect(contentFor(head, 'meta[property="og:locale:alternate"]')).toBe(
        edition.alternateOgLocale,
      );
      expect(contentFor(head, 'meta[property="og:title"]')).toBe(
        edition.title,
      );
      expect(contentFor(head, 'meta[property="og:description"]')).toBe(
        edition.description,
      );
      expect(contentFor(head, 'meta[property="og:image"]')).toBe(socialImage);
      expect(contentFor(head, 'meta[property="og:image:secure_url"]')).toBe(
        socialImage,
      );
      expect(contentFor(head, 'meta[property="og:image:type"]')).toBe(
        "image/png",
      );
      expect(contentFor(head, 'meta[property="og:image:width"]')).toBe("1200");
      expect(contentFor(head, 'meta[property="og:image:height"]')).toBe("630");
      expect(contentFor(head, 'meta[name="twitter:card"]')).toBe(
        "summary_large_image",
      );
      expect(contentFor(head, 'meta[name="twitter:title"]')).toBe(
        edition.title,
      );
      expect(contentFor(head, 'meta[name="twitter:description"]')).toBe(
        edition.description,
      );
      expect(contentFor(head, 'meta[name="twitter:image"]')).toBe(socialImage);
      expect(contentFor(head, 'meta[property="og:image:alt"]')).toBeTruthy();
      expect(contentFor(head, 'meta[property="og:image:alt"]')).toBe(
        contentFor(head, 'meta[name="twitter:image:alt"]'),
      );
    },
  );

  it("publishes truthful WebSite structured data on the domain root", () => {
    const head = parseDocument(resolve("index.html")).head;
    const blocks = head.querySelectorAll('script[type="application/ld+json"]');
    expect(blocks).toHaveLength(1);
    const data = JSON.parse(blocks[0].textContent ?? "") as Record<
      string,
      unknown
    >;

    expect(data).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${productionRoot}/#website`,
      url: `${productionRoot}/`,
      name: "How We Forget to Fly",
      alternateName: "Как мы забываем летать",
      description:
        "On childhood curiosity, adult authorship, and AI that can act as wind—but never as the pilot.",
      inLanguage: ["en", "ru"],
    });
    expect(JSON.stringify(data)).not.toMatch(
      /SearchAction|aggregateRating|Akimov|Klimenko|flying children/i,
    );
  });

  it("ships an open robots policy and a production sitemap declaration", () => {
    const robots = readFileSync(resolve("public/robots.txt"), "utf8");
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).not.toMatch(/^Disallow:\s*\/$/m);
    expect(robots.match(/^Sitemap:/gm)).toHaveLength(1);
    expect(robots).toContain(
      `Sitemap: ${productionRoot}/sitemap.xml`,
    );
    expect(robots).not.toMatch(/localhost|127\.0\.0\.1|staging/i);
  });

  it("lists only the two canonical locale roots in the XML sitemap", () => {
    const source = readFileSync(resolve("public/sitemap.xml"), "utf8");
    const sitemap = new DOMParser().parseFromString(source, "application/xml");
    expect(sitemap.querySelector("parsererror")).toBeNull();
    expect(sitemap.documentElement.namespaceURI).toBe(
      "http://www.sitemaps.org/schemas/sitemap/0.9",
    );
    const locations = Array.from(
      sitemap.querySelectorAll("loc"),
      (node) => node.textContent,
    );
    expect(locations).toEqual([`${productionRoot}/`, `${productionRoot}/ru/`]);
    expect(locations.join("\n")).not.toMatch(/#|\/www\./);
    expect(source).not.toMatch(/<priority>|<changefreq>|<lastmod>/);
  });

  it("ships the declared 1200x630 social image", () => {
    expect(existsSync(imagePath)).toBe(true);
    expect(statSync(imagePath).size).toBeLessThan(5 * 1024 * 1024);

    const image = readFileSync(imagePath);
    expect(image.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(image.readUInt32BE(16)).toBe(1200);
    expect(image.readUInt32BE(20)).toBe(630);
  });

  it("ships a stable, crawlable square favicon for search results", () => {
    expect(existsSync(faviconPath)).toBe(true);
    const favicon = readFileSync(faviconPath);
    expect(favicon.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(favicon.readUInt32BE(16)).toBe(128);
    expect(favicon.readUInt32BE(20)).toBe(128);

    for (const edition of editions) {
      const head = parseDocument(edition.path).head;
      const icon = head.querySelector<HTMLLinkElement>('link[rel="icon"]');
      expect(icon?.getAttribute("href")).toBe("/favicon.png");
      expect(icon?.getAttribute("sizes")).toBe("128x128");
    }
  });

  it.each(editions)("keeps $locale metadata source-independent", (edition) => {
    const head = parseDocument(edition.path).head;
    expect(head.innerHTML).not.toMatch(
      /Akimov|Klimenko|flying children|localhost|127\.0\.0\.1/i,
    );
  });
});
