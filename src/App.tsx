import { locales, localeFromPathname, preferredLocale, readPreference } from "./i18n/locales";
import { translateCopy } from "./i18n/translate";
import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import { ScrollToTop } from "./components/ScrollToTop";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { LocaleProvider, localeRoot, useLocale } from "./i18n/LocaleContext";
import { legacyBookDestination } from "./navigation/bookNavigation";
import { LongformPage } from "./routes/LongformPage";
import { TheatreProvider } from "./theatre";

const NotFoundPage = lazy(async () => {
  const module = await import("./routes/NotFoundPage");
  return { default: module.NotFoundPage };
});

function RouteLoadingSpread() {
  const locale = useLocale();
  return (
    <main className="route-loading page-width" aria-live="polite">
      <p className="eyebrow">
        {locale === "ru" ? "Книга открывается" : translateCopy("Opening the book", locale)}
      </p>
      <p>
        {locale === "ru"
          ? "Следующий бумажный разворот раскрывается."
          : translateCopy("The next paper spread is unfolding.", locale)}
      </p>
    </main>
  );
}

function BookRoutes() {
  const location = useLocation();
  const normalizedRoot = localeRoot(localeFromPathname(location.pathname));
  if (location.pathname !== normalizedRoot && locales.some(item => item.prefix && location.pathname === `/${item.prefix}`)) {
    return (
      <Navigate
        replace
        state={location.state}
        to={{ pathname: normalizedRoot, search: location.search, hash: location.hash }}
      />
    );
  }

  return (
    <Suspense fallback={<RouteLoadingSpread />}>
      <Routes>
        {locales.map(item => <Route key={item.code} path={localeRoot(item.code)} element={<LongformPage />} />)}
        <Route path="*" element={<LegacyBookRoute />} />
      </Routes>
    </Suspense>
  );
}

function LegacyBookRoute() {
  const location = useLocation();
  const destination = legacyBookDestination(location.pathname, location.hash);
  return destination ? <Navigate replace state={location.state} to={{ pathname: destination.split("#")[0], search: location.search, hash: destination.includes("#") ? `#${destination.split("#")[1]}` : "" }} /> : <NotFoundPage />;
}

export function App() {
  const location = useLocation();
  const [initialRedirect, clearInitialRedirect] = useState(() => {
    if (location.pathname !== "/") return null;
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    const target = preferredLocale(readPreference(), languages);
    return target === "en" ? null : { pathname: localeRoot(target), search: location.search, hash: location.hash };
  });
  useEffect(() => { if (initialRedirect && location.pathname !== "/") clearInitialRedirect(null); }, [initialRedirect, location.pathname]);
  const systemReducedMotion = usePrefersReducedMotion();
  const [quietOverride, setQuietOverride] = useState(false);
  const quietView = systemReducedMotion || quietOverride;

  useEffect(() => {
    document.documentElement.dataset.quietView = String(quietView);
    return () => {
      delete document.documentElement.dataset.quietView;
    };
  }, [quietView]);

  if (initialRedirect && location.pathname === "/" && !location.state?.explicitLocale) {
    return <Navigate replace to={initialRedirect} />;
  }

  return (
    <LocaleProvider>
      <AppErrorBoundary>
        <TheatreProvider quietView={quietView}>
          <SkipOpeningLink />
          <SiteHeader
            quietView={quietView}
            onQuietViewChange={setQuietOverride}
          />
          <div id="main-content" tabIndex={-1}>
            <ScrollToTop />
            <BookRoutes />
          </div>
          <SiteFooter />
        </TheatreProvider>
      </AppErrorBoundary>
    </LocaleProvider>
  );
}

function SkipOpeningLink() {
  const locale = useLocale();
  return (
    <a className="skip-link" href={`${localeRoot(locale)}#doorways`}>
      {locale === "ru" ? "Пропустить обложку" : translateCopy("Skip the opening story", locale)}
    </a>
  );
}
