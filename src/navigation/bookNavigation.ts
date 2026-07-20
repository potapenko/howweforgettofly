import type { Locale } from "../i18n/LocaleContext";

export const bookSections = [
  { id: "manifesto", en: "Manifesto", ru: "Манифест" },
  { id: "parents", en: "Parents", ru: "Родителям" },
  { id: "adults", en: "Adults", ru: "Взрослым" },
  { id: "ai", en: "Set the Wind", ru: "ИИ как ветер" },
  { id: "atlas", en: "Atlas", ru: "Атлас" },
  { id: "final-sky", en: "Sky", ru: "Небо" },
] as const;

export type BookSectionId = (typeof bookSections)[number]["id"];

/** Decode a URL hash without allowing a malformed escape sequence to break UI. */
export function bookAnchorFromHash(hash: string) {
  const rawAnchor = hash.replace(/^#/, "");
  if (!rawAnchor) return "";

  try {
    const anchor = decodeURIComponent(rawAnchor);
    if (anchor === "source" || anchor.startsWith("source-")) {
      return "final-sky";
    }
    return /^M\d{2}$/i.test(anchor) ? anchor.toUpperCase() : anchor;
  } catch {
    return "";
  }
}

const topLevelAnchors: Record<string, string> = {
  "/": "top",
  "/manifesto": "manifesto",
  "/parents": "parents",
  "/adults": "adults",
  "/ai": "ai",
  "/atlas": "atlas",
  "/final-sky": "final-sky",
  // Historical route only. Source is no longer a public chapter.
  "/source": "final-sky",
};

/**
 * Converts former narrative routes into canonical anchors in the single book.
 * Former Atlas workbench addresses return to the reading chapter; the current
 * product has no separate tools or form routes.
 */
export function canonicalBookHref(href: string, locale: Locale = "en") {
  const root = locale === "ru" ? "/ru" : "/";
  const withAnchor = (anchor: string) => `${root}#${anchor}`;

  if (href.startsWith("/#") || href.startsWith("/ru#")) {
    return withAnchor(bookAnchorFromHash(href.slice(href.indexOf("#"))));
  }
  if (href.startsWith("#")) return withAnchor(bookAnchorFromHash(href));

  const manifestoArticle = href.match(/^\/manifesto\/(M\d{2})$/i);
  if (manifestoArticle) return withAnchor(manifestoArticle[1].toUpperCase());

  if (/^\/atlas\/[^/]+\/?$/.test(href)) return withAnchor("atlas");

  const anchor = topLevelAnchors[href.replace(/\/+$/, "") || "/"];
  return anchor ? withAnchor(anchor) : href;
}

export function sectionForHash(hash: string): BookSectionId | "home" {
  const anchor = bookAnchorFromHash(hash);
  if (/^M\d{2}$/.test(anchor) || anchor === "manifesto") return "manifesto";
  if (anchor === "parents" || anchor.startsWith("parents-")) return "parents";
  if (anchor === "adults" || anchor.startsWith("adults-")) return "adults";
  if (anchor === "ai" || anchor.startsWith("ai-")) return "ai";
  if (anchor === "atlas" || anchor.startsWith("atlas-")) return "atlas";
  if (anchor === "final-sky" || anchor.startsWith("final-sky-")) {
    return "final-sky";
  }
  return "home";
}

export function legacyBookDestination(pathname: string, hash = "") {
  const locale: Locale =
    pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : "en";
  const root = locale === "ru" ? "/ru" : "/";
  const withoutLocale = locale === "ru" ? pathname.slice(3) || "/" : pathname;
  const normalized =
    withoutLocale.length > 1
      ? withoutLocale.replace(/\/+$/, "")
      : withoutLocale;
  const manifestoArticle = normalized.match(/^\/manifesto\/(M\d{2})$/i);
  const formerAtlasWorkbench = /^\/atlas\/[^/]+$/.test(normalized);
  const anchor = topLevelAnchors[normalized];
  if (!manifestoArticle && !formerAtlasWorkbench && !anchor) return null;

  const explicitAnchor = bookAnchorFromHash(hash);
  if (explicitAnchor) return `${root}#${explicitAnchor}`;
  if (manifestoArticle) return `${root}#${manifestoArticle[1].toUpperCase()}`;
  if (formerAtlasWorkbench) return `${root}#atlas`;
  return `${root}#${anchor}`;
}
