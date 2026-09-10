import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { localeDefinition, localeRoot, locales, rememberLocale, type Locale } from '../i18n/locales';
import { translateCopy } from '../i18n/translate';
import type { ReadingPositionSnapshot } from '../navigation/readingPosition';
export function LanguageMenu({ locale, anchor, readingPosition, onNavigate }: {
  locale: Locale; anchor: string; readingPosition: ReadingPositionSnapshot | null; onNavigate: () => void;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const { search } = useLocation();
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (details.current?.open && !details.current.contains(event.target as Node)) details.current.open = false;
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);
  const languageLabel = locale === 'ru' ? 'Язык' : translateCopy('Language', locale);
  return <details className="language-menu" ref={details} onKeyDown={event => {
    if (event.key === 'Escape' && details.current?.open) {
      event.preventDefault(); event.stopPropagation(); details.current.open = false;
      details.current.querySelector('summary')?.focus();
    }
  }}>
    <summary aria-label={`${languageLabel}: ${localeDefinition(locale).name}`}>
      <span lang={locale} dir={localeDefinition(locale).dir}>{localeDefinition(locale).name}</span>
    </summary>
    <nav className="language-options" aria-label={languageLabel}>
      {locales.map(item => <Link key={item.code} lang={item.code} dir={item.dir}
        aria-current={item.code === locale ? 'page' : undefined}
        to={{ pathname: localeRoot(item.code), search, hash: `#${anchor}` }}
        state={{ readingPosition, explicitLocale: true }} preventScrollReset
        onClick={() => { rememberLocale(item.code); if (details.current) details.current.open = false; onNavigate(); }}>
        {item.name}
      </Link>)}
    </nav>
  </details>;
}
