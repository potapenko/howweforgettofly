import { BookOpen } from "@phosphor-icons/react/BookOpen";
import { GithubLogo } from "@phosphor-icons/react/GithubLogo";
import { List } from "@phosphor-icons/react/List";
import { PatreonLogo } from "@phosphor-icons/react/PatreonLogo";
import { TwitterLogo } from "@phosphor-icons/react/TwitterLogo";
import { X } from "@phosphor-icons/react/X";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import {
  bookAnchorFromHash,
  bookSections,
  canonicalBookHref,
  sectionForHash,
  type BookSectionId,
} from "../navigation/bookNavigation";
import {
  captureReadingPosition,
  readingLineOffset,
  restoreReadingPosition,
  type ReadingPositionSnapshot,
} from "../navigation/readingPosition";

function activeSectionForRoute(pathname: string, hash: string) {
  if (pathname === "/" || pathname === "/ru") return sectionForHash(hash);
  const localPath = pathname.replace(/^\/ru(?=\/|$)/, "") || "/";
  return sectionForHash(`#${localPath.replace(/^\//, "")}`);
}

function anchorForRoute(pathname: string, hash: string) {
  const explicitAnchor = bookAnchorFromHash(hash);
  if (explicitAnchor) return explicitAnchor;
  const section = activeSectionForRoute(pathname, hash);
  return section === "home" ? "top" : section;
}

function sectionForReadingAnchor(anchor: string) {
  const containingSection = document
    .getElementById(anchor)
    ?.closest<HTMLElement>("[data-book-section]")
    ?.dataset.bookSection;
  return sectionForHash(`#${containingSection ?? anchor}`);
}

interface SiteHeaderProps {
  quietView: boolean;
  onQuietViewChange: (value: boolean) => void;
}

export function SiteHeader({
  quietView,
  onQuietViewChange,
}: SiteHeaderProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<
    BookSectionId | "home"
  >(() => activeSectionForRoute(location.pathname, location.hash));
  const [readingAnchor, setReadingAnchor] = useState(() =>
    anchorForRoute(location.pathname, location.hash),
  );
  const [readingPosition, setReadingPosition] = useState<
    ReadingPositionSnapshot | null
  >(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pendingQuietPosition = useRef<ReadingPositionSnapshot | null>(null);
  const locale = useLocale();
  const labels = locale === "ru"
    ? {
        title: "Как мы забываем летать",
        opening: "К началу книги",
        primary: "Навигация по книге",
        openMenu: "Открыть навигацию",
        closeMenu: "Закрыть навигацию",
        quiet: "Без движения",
        language: "Язык",
        social: "Ссылки проекта",
        twitter: "Подписаться на @potapenko в Twitter",
        patreon: "Поддержать проект на Patreon",
        github: "Посмотреть код проекта на GitHub",
      }
    : {
        title: "How We Forget to Fly",
        opening: "How We Forget to Fly — opening",
        primary: "Primary",
        openMenu: "Open navigation",
        closeMenu: "Close navigation",
        quiet: "Quiet view",
        language: "Language",
        social: "Project links",
        twitter: "Follow @potapenko on Twitter",
        patreon: "Support the project on Patreon",
        github: "View the project source on GitHub",
      };

  useEffect(() => {
    setMenuOpen(false);
    setActiveSection(activeSectionForRoute(location.pathname, location.hash));
    setReadingAnchor(anchorForRoute(location.pathname, location.hash));
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/" && location.pathname !== "/ru") return;
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const headerHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height",
        ),
      ) || 78;
      const anchor = headerHeight + 12;
      const position = captureReadingPosition(document, anchor);
      const currentAnchor = position?.anchor ??
        anchorForRoute(location.pathname, location.hash);
      setReadingAnchor(currentAnchor);
      setReadingPosition(position);
      setActiveSection(sectionForReadingAnchor(currentAnchor));
    };

    const requestUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const snapshot = pendingQuietPosition.current;
    if (!snapshot) return;
    pendingQuietPosition.current = null;
    let secondFrame: number | null = null;
    const firstFrame = window.requestAnimationFrame(() => {
      restoreReadingPosition(snapshot);
      secondFrame = window.requestAnimationFrame(() => {
        restoreReadingPosition(snapshot);
      });
    });
    const settleTimer = window.setTimeout(() => {
      restoreReadingPosition(snapshot);
    }, 160);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame !== null) window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(settleTimer);
    };
  }, [quietView]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const changeQuietView = () => {
    pendingQuietPosition.current = captureReadingPosition(
      document,
      readingLineOffset(document),
    );
    onQuietViewChange(!quietView);
  };

  return (
    <header className="site-header">
      <Link
        className="wordmark"
        preventScrollReset
        to={canonicalBookHref("/", locale)}
        aria-label={labels.opening}
      >
        <BookOpen className="wordmark-mark" weight="duotone" aria-hidden="true" />
        <span>
          {locale === "ru" ? (
            <>Как мы забываем<br />летать</>
          ) : (
            <>How We Forget<br />to Fly</>
          )}
        </span>
      </Link>

      <button
        ref={menuButtonRef}
        className="menu-button icon-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <X weight="thin" /> : <List weight="thin" />}
      </button>

      <div className={menuOpen ? "nav-shell is-open" : "nav-shell"}>
        <nav id="primary-navigation" className="primary-nav" aria-label={labels.primary}>
          {bookSections.map(({ en, ru, id }) => (
            <Link
              aria-current={activeSection === id ? "location" : undefined}
              className={activeSection === id ? "is-active" : undefined}
              key={id}
              onClick={() => setMenuOpen(false)}
              preventScrollReset
              to={canonicalBookHref(`/${id}`, locale)}
            >
              {locale === "ru" ? ru : en}
            </Link>
          ))}
        </nav>

        <nav className="header-socials" aria-label={labels.social}>
          <a
            aria-label={labels.twitter}
            href="https://x.com/potapenko"
            onClick={() => setMenuOpen(false)}
          >
            <TwitterLogo aria-hidden="true" weight="fill" />
            <span className="header-social-text">{labels.twitter}</span>
          </a>
          <a
            aria-label={labels.patreon}
            href="https://www.patreon.com/c/playphraseme"
            onClick={() => setMenuOpen(false)}
          >
            <PatreonLogo aria-hidden="true" weight="fill" />
            <span className="header-social-text">{labels.patreon}</span>
          </a>
          <a
            aria-label={labels.github}
            href="https://github.com/potapenko/howweforgettofly"
            onClick={() => setMenuOpen(false)}
          >
            <GithubLogo aria-hidden="true" weight="fill" />
            <span className="header-social-text">{labels.github}</span>
          </a>
        </nav>

        <div className="header-preferences">
          <button
            aria-pressed={quietView}
            className="motion-toggle"
            onClick={changeQuietView}
            type="button"
          >
            <span aria-hidden="true" />
            <span className="motion-toggle-label">{labels.quiet}</span>
          </button>
          <nav className="locale-switch" aria-label={labels.language}>
            <Link
              aria-current={locale === "en" ? "page" : undefined}
              preventScrollReset
              state={readingPosition ? { readingPosition } : undefined}
              to={canonicalBookHref(`#${readingAnchor}`, "en")}
            >
              EN
            </Link>
            <Link
              aria-current={locale === "ru" ? "page" : undefined}
              preventScrollReset
              state={readingPosition ? { readingPosition } : undefined}
              to={canonicalBookHref(`#${readingAnchor}`, "ru")}
            >
              RU
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
