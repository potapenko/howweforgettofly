/// <reference types="vite/client" />
import type { Locale, NewLocale } from './locales';
import source from './messages/en.json';
const packs = import.meta.glob<Record<string, string>>('./messages/*.json', { eager: true, import: 'default' });
const machineKeys = new Set(['tone', 'id', 'href', 'route', 'kind', 'register', 'mechanism', 'accent', 'atlasExperienceId', 'src', 'poster', 'className']);
const machineValues = new Set(['rust', 'blue', 'ochre']); // Existing doorway tuples carry their color token.
const caches = new Map<Locale, WeakMap<object, unknown>>();
/** Translate authored copy only. IDs, routes, poses, and asset paths are immutable. */
export function translateCopy<T>(value: T, locale: Locale): T {
  if (locale === 'en' || locale === 'ru') return value;
  if (typeof value === 'string') {
    if (!Object.hasOwn(source, value)) {
      if (!machineValues.has(value) && /\p{L}/u.test(value) && !/^(?:[\/#]|https?:)/.test(value)) throw new Error(`Unregistered copy: ${value}`);
      return value;
    }
    const translated = packs[`./messages/${locale}.json`]?.[value];
    if (!translated) throw new Error(`Missing ${locale} copy: ${value}`);
    return translated as T;
  }
  if (!value || typeof value !== 'object') return value;
  if ('$$typeof' in value) return value; // Existing EN JSX is preserved verbatim.
  let cache = caches.get(locale);
  if (!cache) { cache = new WeakMap(); caches.set(locale, cache); }
  if (cache.has(value)) return cache.get(value) as T;
  const translated = Array.isArray(value)
    ? value.map(item => translateCopy(item, locale))
    : Object.fromEntries(Object.entries(value).map(([key, item]) => [key, machineKeys.has(key) ? item : translateCopy(item, locale)]));
  cache.set(value, translated);
  return translated as T;
}
export function translationPack(locale: NewLocale) { return packs[`./messages/${locale}.json`]; }
