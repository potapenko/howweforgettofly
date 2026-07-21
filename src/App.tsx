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
        {locale === "ru" ? "Книга открывается" : "Opening the book"}
      </p>
      <p>
        {locale === "ru"
          ? "Следующий бумажный разворот раскрывается."
          : "The next paper spread is unfolding."}
      </p>
    </main>
  );
}

function BookRoutes() {
  const location = useLocation();
  if (location.pathname === "/ru") {
    return (
      <Navigate
        replace
        state={location.state}
        to={{ pathname: "/ru/", search: location.search, hash: location.hash }}
      />
    );
  }

  return (
    <Suspense fallback={<RouteLoadingSpread />}>
      <Routes>
        <Route path="/" element={<LongformPage />} />
        <Route path="/ru/" element={<LongformPage />} />
        <Route path="*" element={<LegacyBookRoute />} />
      </Routes>
    </Suspense>
  );
}

function LegacyBookRoute() {
  const location = useLocation();
  const destination = legacyBookDestination(location.pathname, location.hash);
  return destination ? <Navigate replace to={destination} /> : <NotFoundPage />;
}

export function App() {
  const systemReducedMotion = usePrefersReducedMotion();
  const [quietOverride, setQuietOverride] = useState(false);
  const quietView = systemReducedMotion || quietOverride;

  useEffect(() => {
    document.documentElement.dataset.quietView = String(quietView);
    return () => {
      delete document.documentElement.dataset.quietView;
    };
  }, [quietView]);

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
      {locale === "ru" ? "Пропустить обложку" : "Skip the opening story"}
    </a>
  );
}
