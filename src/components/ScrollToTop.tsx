import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { manifestoArticles } from "../content/manifesto";
import { manifestoArticlesRu } from "../content/manifesto.ru";
import {
  isBookRootPathname,
  localeFromPathname,
} from "../i18n/LocaleContext";
import {
  bookAnchorFromHash,
  sectionForHash,
} from "../navigation/bookNavigation";
import {
  restoreReadingPosition,
  type ReadingPositionSnapshot,
} from "../navigation/readingPosition";

function transferredReadingPosition(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const candidate = (value as { readingPosition?: unknown }).readingPosition;
  if (!candidate || typeof candidate !== "object") return null;
  const snapshot = candidate as Partial<ReadingPositionSnapshot>;
  return typeof snapshot.anchor === "string" &&
      typeof snapshot.viewportOffset === "number" &&
      Number.isFinite(snapshot.viewportOffset) &&
      typeof snapshot.sectionProgress === "number" &&
      Number.isFinite(snapshot.sectionProgress)
    ? (snapshot as ReadingPositionSnapshot)
    : null;
}

function titleForLocation(pathname: string, hash: string) {
  const locale = localeFromPathname(pathname);
  const siteName = locale === "ru" ? "Как мы забываем летать" : "How We Forget to Fly";
  const sectionTitles = locale === "ru"
    ? {
        home: siteName,
        manifesto: `Манифест | ${siteName}`,
        parents: `Родителям | ${siteName}`,
        adults: `Взрослым | ${siteName}`,
        ai: `ИИ как Ветер | ${siteName}`,
        atlas: `Атлас идей | ${siteName}`,
        "final-sky": `Небо остаётся открытым | ${siteName}`,
      }
    : {
        home: siteName,
        manifesto: `Manifesto | ${siteName}`,
        parents: `For Parents | ${siteName}`,
        adults: `For Adults | ${siteName}`,
        ai: `AI as Wind | ${siteName}`,
        atlas: `Atlas of Ideas | ${siteName}`,
        "final-sky": `The Sky Remains Open | ${siteName}`,
      };
  const articleId = bookAnchorFromHash(hash).toUpperCase();
  const articles = locale === "ru" ? manifestoArticlesRu : manifestoArticles;
  const article = articles.find(({ id }) => id === articleId);
  if (article) return `${article.title} — ${sectionTitles.manifesto}`;

  if (isBookRootPathname(pathname)) {
    const section = sectionForHash(hash);
    if (section === "home") {
      return locale === "ru"
        ? "Как мы забываем летать — Творчество, авторство и ИИ"
        : "How We Forget to Fly — Creativity, Agency, and AI";
    }
    return sectionTitles[section];
  }
  return locale === "ru" ? `Страница не найдена | ${siteName}` : `Page not found | ${siteName}`;
}

/**
 * Resolves anchors only after the complete long-form document has rendered.
 * This makes direct deep links and former-route redirects reliable without
 * turning passive reading into URL churn.
 */
export function ScrollToTop() {
  const { pathname, hash, key: locationKey, state } = useLocation();
  const navigationType = useNavigationType();
  const savedScrollPositions = useRef(new Map<string, number>());
  const activeLocationKey = useRef(locationKey);
  activeLocationKey.current = locationKey;

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const rememberPosition = () => {
      savedScrollPositions.current.set(activeLocationKey.current, window.scrollY);
    };
    window.addEventListener("scroll", rememberPosition, { passive: true });
    return () => {
      window.removeEventListener("scroll", rememberPosition);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    document.title = titleForLocation(pathname, hash);
    const savedPosition =
      navigationType === "POP"
        ? savedScrollPositions.current.get(locationKey)
        : undefined;
    const transferredPosition = transferredReadingPosition(state);
    const restoringReadingPosition =
      savedPosition !== undefined || transferredPosition !== null;

    let cancelled = false;
    let userInterrupted = false;
    let alignmentPass = 0;
    const frames: number[] = [];
    const timers: number[] = [];

    const align = () => {
      if (cancelled || userInterrupted) return;

      if (restoringReadingPosition) {
        if (transferredPosition) {
          restoreReadingPosition(transferredPosition);
        } else {
          window.scrollTo({ top: savedPosition, behavior: "auto" });
        }
        alignmentPass += 1;
        return;
      }

      const anchor = bookAnchorFromHash(hash);
      const target = anchor
        ? document.getElementById(anchor)
        : isBookRootPathname(pathname)
          ? document.getElementById("top")
          : document.querySelector<HTMLElement>("#main-content main h1");
      if (!target) return;

      const quiet = document.documentElement.dataset.quietView === "true";
      const openingHeld =
        document.documentElement.dataset.homeCoverActive === "true";
      target.scrollIntoView({
        block: "start",
        behavior:
          navigationType !== "PUSH" || quiet || openingHeld || alignmentPass > 0
            ? "auto"
            : "smooth",
      });

      if (anchor && alignmentPass === 0) {
        const focusTarget =
          target.querySelector<HTMLElement>("h1, h2, h3") ?? target;
        const hadTabIndex = focusTarget.hasAttribute("tabindex");
        if (!hadTabIndex) focusTarget.setAttribute("tabindex", "-1");
        focusTarget.dataset.programmaticFocus = "true";
        focusTarget.focus({ preventScroll: true });
        focusTarget.addEventListener(
          "blur",
          () => {
            delete focusTarget.dataset.programmaticFocus;
            if (!hadTabIndex) focusTarget.removeAttribute("tabindex");
          },
          { once: true },
        );
      }
      alignmentPass += 1;
    };

    const alignAfterLayout = () => {
      frames.push(
        window.requestAnimationFrame(() => {
          frames.push(window.requestAnimationFrame(align));
        }),
      );
    };

    alignAfterLayout();
    void document.fonts?.ready.then(alignAfterLayout);
    // Off-screen manifesto spreads use content-visibility. Their real height
    // becomes known while a distant anchor is approached, so make bounded
    // correction passes after that layout settles.
    if (restoringReadingPosition || bookAnchorFromHash(hash)) {
      timers.push(window.setTimeout(alignAfterLayout, 250));
      timers.push(window.setTimeout(alignAfterLayout, 850));
      timers.push(window.setTimeout(alignAfterLayout, 1500));
      timers.push(window.setTimeout(alignAfterLayout, 2600));
    }

    const stopLateAlignment = () => {
      userInterrupted = true;
    };
    window.addEventListener("wheel", stopLateAlignment, { passive: true });
    window.addEventListener("touchstart", stopLateAlignment, { passive: true });
    window.addEventListener("pointerdown", stopLateAlignment, { passive: true });
    window.addEventListener("keydown", stopLateAlignment);

    return () => {
      cancelled = true;
      frames.forEach((frame) => window.cancelAnimationFrame(frame));
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("wheel", stopLateAlignment);
      window.removeEventListener("touchstart", stopLateAlignment);
      window.removeEventListener("pointerdown", stopLateAlignment);
      window.removeEventListener("keydown", stopLateAlignment);
    };
  }, [hash, locationKey, navigationType, pathname, state]);

  return null;
}
