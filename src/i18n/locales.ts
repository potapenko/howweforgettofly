/** The only registry for public routes, language metadata and browser matching. */
export const locales = [
  { code: 'en', prefix: '', name: 'English', dir: 'ltr', matches: ['en'], og: 'en_US' },
  { code: 'es', prefix: 'es', name: 'Español', dir: 'ltr', matches: ['es'], og: 'es_ES' },
  { code: 'de', prefix: 'de', name: 'Deutsch', dir: 'ltr', matches: ['de'], og: 'de_DE' },
  { code: 'fr', prefix: 'fr', name: 'Français', dir: 'ltr', matches: ['fr'], og: 'fr_FR' },
  { code: 'pt-BR', prefix: 'pt-br', name: 'Português (Brasil)', dir: 'ltr', matches: ['pt'], og: 'pt_BR' },
  { code: 'ja', prefix: 'ja', name: '日本語', dir: 'ltr', matches: ['ja'], og: 'ja_JP' },
  { code: 'zh-Hans', prefix: 'zh-hans', name: '简体中文', dir: 'ltr', matches: ['zh-Hans','zh-CN','zh-SG'], og: 'zh_CN' },
  { code: 'ko', prefix: 'ko', name: '한국어', dir: 'ltr', matches: ['ko'], og: 'ko_KR' },
  { code: 'ru', prefix: 'ru', name: 'Русский', dir: 'ltr', matches: ['ru'], og: 'ru_RU' },
  { code: 'ar', prefix: 'ar', name: 'العربية', dir: 'rtl', matches: ['ar'], og: 'ar_AR' },
] as const;
export type Locale = typeof locales[number]['code'];
export type NewLocale = Exclude<Locale, 'en' | 'ru'>;
export const preferenceKey = 'howweforgettofly.preferredLocale.v1';
export function localeDefinition(locale: Locale) { return locales.find(item => item.code === locale)!; }
export function localeRoot(locale: Locale) { const {prefix} = localeDefinition(locale); return prefix ? `/${prefix}/` : '/'; }
export function localeFromPathname(path: string): Locale {
  return locales.find(item => item.prefix && (path === `/${item.prefix}` || path.startsWith(`/${item.prefix}/`)))?.code ?? 'en';
}
export function stripLocale(path: string) {
  const locale = localeFromPathname(path);
  const prefix = localeDefinition(locale).prefix;
  return prefix ? path.slice(prefix.length + 1) || '/' : path;
}
export function isBookRootPathname(path: string) { return stripLocale(path) === '/'; }
export function matchLocale(value: string | null | undefined): Locale | undefined {
  const normalized = value?.replaceAll('_', '-').toLowerCase();
  if (!normalized) return;
  return locales.find(item => item.code.toLowerCase() === normalized)?.code ?? locales.find(item =>
    item.matches.some(match => normalized === match.toLowerCase() || normalized.startsWith(`${match.toLowerCase()}-`)))?.code;
}
export function preferredLocale(saved: string | null, languages: readonly string[]): Locale {
  return matchLocale(saved) ?? languages.map(matchLocale).find(Boolean) ?? 'en';
}
export function readPreference(): string | null { try { return window.localStorage.getItem(preferenceKey); } catch { return null; } }
export function rememberLocale(locale: Locale) { try { window.localStorage.setItem(preferenceKey, locale); } catch { /* Navigation remains usable. */ } }
