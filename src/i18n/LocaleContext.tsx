import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

export type Locale = "en" | "ru";

const LocaleContext = createContext<Locale>("en");

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : "en";
}

export function localeRoot(locale: Locale) {
  return locale === "ru" ? "/ru/" : "/";
}

export function isBookRootPathname(pathname: string) {
  return pathname === "/" || pathname === "/ru" || pathname === "/ru/";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const locale = useMemo(() => localeFromPathname(pathname), [pathname]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
    return () => {
      delete document.documentElement.dataset.locale;
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
