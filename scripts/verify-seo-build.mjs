import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

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

const en = readFileSync(resolve(outputRoot, "index.html"), "utf8");
const ru = readFileSync(resolve(outputRoot, "ru/index.html"), "utf8");
assert(en.includes('<html lang="en">'), "English document language is missing");
assert(ru.includes('<html lang="ru">'), "Russian document language is missing");
assert(
  en.includes('<link rel="canonical" href="https://howweforgettofly.com/"'),
  "English canonical URL is missing",
);
assert(
  ru.includes(
    '<link rel="canonical" href="https://howweforgettofly.com/ru/"',
  ),
  "Russian canonical URL is missing",
);
assert(!en.includes('/src/main.tsx'), "English HTML contains a source entry");
assert(!ru.includes('/src/main.tsx'), "Russian HTML contains a source entry");
assert(en !== ru, "localized HTML documents are identical");

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
    JSON.stringify([
      "https://howweforgettofly.com/",
      "https://howweforgettofly.com/ru/",
    ]),
  "sitemap does not contain exactly the two canonical locale roots",
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

console.log("SEO build verified: EN/RU HTML, discovery files, social assets");
