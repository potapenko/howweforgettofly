import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { locales, localeRoot } from "../src/i18n/locales.ts";

const outputRoot = resolve("dist");
const expectedFiles = [
  "index.html",
  "ru/index.html",
  "robots.txt",
  "sitemap.xml",
  "favicon.png",
  "social/how-we-forget-to-fly-social-1200x630.png",
];

function assert(condition, message) {
  if (!condition) throw new Error(`SEO build verification failed: ${message}`);
}

for (const file of expectedFiles) {
  assert(existsSync(resolve(outputRoot, file)), `missing dist/${file}`);
}

for (const locale of locales) {
  const file = resolve(outputRoot, locale.prefix, "index.html");
  assert(existsSync(file), `missing ${locale.code} entry document`);
  const html = readFileSync(file, "utf8");
  assert(html.includes(`<html lang="${locale.code}" dir="${locale.dir}">`), `${locale.code} language/direction`);
  const url = `https://howweforgettofly.com${localeRoot(locale.code)}`;
  assert(html.includes(`<link rel="canonical" href="${url}"`), `${locale.code} canonical`);
  assert(html.includes(`<meta property="og:url" content="${url}"`), `${locale.code} social URL`);
  assert(html.includes(`<meta property="og:locale" content="${locale.og}"`), `${locale.code} social locale`);
  assert(!html.includes('/src/main.tsx'), `${locale.code} contains a source entry`);
  assert((html.match(/hreflang=/g) || []).length === 11, `${locale.code} must have ten alternates and x-default`);
  assert((html.match(/og:locale:alternate/g) || []).length === 9, `${locale.code} must have nine social alternates`);
  for (const alternate of locales) assert(html.includes(`hreflang="${alternate.code}" href="https://howweforgettofly.com${localeRoot(alternate.code)}"`), `${locale.code} missing ${alternate.code} alternate`);
  if (locale.code !== 'en' && locale.code !== 'ru') {
    const pack = JSON.parse(readFileSync(`src/i18n/messages/${locale.code}.json`, 'utf8'));
    assert(html.includes(`<title>${pack['How We Forget to Fly — Creativity, Agency, and AI']}</title>`), `${locale.code} translated title`);
    assert(html.includes(pack['On childhood curiosity, adult authorship, and AI that can act as wind—but never as the pilot.']), `${locale.code} translated description`);
  }
}

const robots = readFileSync(resolve(outputRoot, "robots.txt"), "utf8");
assert(robots.includes("User-agent: *"), "robots.txt has no global user agent");
assert(
  robots.includes("Sitemap: https://howweforgettofly.com/sitemap.xml"),
  "robots.txt has no production sitemap URL",
);

const sitemap = readFileSync(resolve(outputRoot, "sitemap.xml"), "utf8");
const locations = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) =>
  match[1]
);
assert(
  JSON.stringify(locations) ===
    JSON.stringify(locales.map(item => `https://howweforgettofly.com${localeRoot(item.code)}`)),
  "sitemap does not contain exactly the ten canonical locale roots",
);
assert(!sitemap.includes("#"), "sitemap contains a fragment URL");

const image = readFileSync(
  resolve(outputRoot, "social/how-we-forget-to-fly-social-1200x630.png"),
);
assert(
  image.subarray(0, 8).toString("hex") === "89504e470d0a1a0a",
  "social image is not a PNG",
);
assert(
  image.readUInt32BE(16) === 1200 && image.readUInt32BE(20) === 630,
  "social image is not 1200x630",
);

const favicon = readFileSync(resolve(outputRoot, "favicon.png"));
assert(
  favicon.readUInt32BE(16) === 128 && favicon.readUInt32BE(20) === 128,
  "favicon is not square at 128x128",
);

console.log("SEO build verified: ten locale documents, discovery files, social assets");
