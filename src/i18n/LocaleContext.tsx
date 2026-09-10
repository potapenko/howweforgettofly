import { updateLocaleMetadata } from "./metadata";
import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { localeDefinition, localeFromPathname, type Locale } from './locales';
export { localeFromPathname, localeRoot, isBookRootPathname, type Locale } from './locales';
const LocaleContext = createContext<Locale>('en');
export function LocaleProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const locale = useMemo(() => localeFromPathname(pathname), [pathname]);
  useEffect(() => {
    document.documentElement.lang = locale;
    updateLocaleMetadata(locale);
    document.documentElement.dir = localeDefinition(locale).dir;
    document.documentElement.dataset.locale = locale;
    return () => { delete document.documentElement.dataset.locale; };
  }, [locale]);
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
export function useLocale() { return useContext(LocaleContext); }
