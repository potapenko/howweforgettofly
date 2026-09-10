import { locales, localeDefinition, localeRoot, type Locale } from './locales';
import { translateCopy } from './translate';
export const productionOrigin = 'https://howweforgettofly.com';
export function localeMetadata(locale: Locale) {
  return {
    title: locale === 'ru' ? 'Как мы забываем летать — Творчество, авторство и ИИ' : translateCopy('How We Forget to Fly — Creativity, Agency, and AI', locale),
    name: locale === 'ru' ? 'Как мы забываем летать' : translateCopy('How We Forget to Fly', locale),
    description: locale === 'ru' ? 'О детском любопытстве, взрослом авторстве и искусственном интеллекте, который может быть ветром — но не пилотом.' : translateCopy('On childhood curiosity, adult authorship, and AI that can act as wind—but never as the pilot.', locale),
    imageAlt: locale === 'ru' ? 'Социальное превью «Как мы забываем летать»: раскрытая бумажная книга становится ярким миром ветра, лодок, летательных аппаратов, воздушного змея и вертушки.' : translateCopy('How We Forget to Fly social preview: an open paper book becomes a bright landscape of wind, boats, aircraft, a kite, and a pinwheel.', locale),
    url: productionOrigin + localeRoot(locale),
    og: localeDefinition(locale).og,
  };
}
export function updateLocaleMetadata(locale: Locale) {
  const metadata = localeMetadata(locale);
  const fields: Record<string, string> = {
    'name:description': metadata.description,
    'property:og:site_name': metadata.name,
    'property:og:locale': metadata.og,
    'property:og:url': metadata.url,
    'property:og:title': metadata.title,
    'property:og:description': metadata.description,
    'property:og:image:alt': metadata.imageAlt,
    'name:twitter:title': metadata.title,
    'name:twitter:description': metadata.description,
    'name:twitter:image:alt': metadata.imageAlt,
  };
  for (const [key, content] of Object.entries(fields)) {
    const separator = key.indexOf(':');
    const attribute = key.slice(0, separator), value = key.slice(separator + 1);
    document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${value}"]`)?.setAttribute('content', content);
  }
  document.head.querySelector('link[rel="canonical"]')?.setAttribute('href', metadata.url);
  document.head.querySelectorAll('link[rel="alternate"][hreflang], meta[property="og:locale:alternate"]').forEach(node => node.remove());
  for (const item of locales) {
    const link = document.createElement('link');
    link.rel = 'alternate'; link.hreflang = item.code;
    link.href = productionOrigin + localeRoot(item.code);
    document.head.append(link);
    if (item.code !== locale) {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:locale:alternate'); meta.content = item.og;
      document.head.append(meta);
    }
  }
  const fallback = document.createElement('link');
  fallback.rel = 'alternate'; fallback.hreflang = 'x-default'; fallback.href = productionOrigin + '/';
  document.head.append(fallback);
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach(node => node.remove());
  if (locale === 'en') {
    const schema = document.createElement('script'); schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': productionOrigin + '/#website', url: metadata.url, name: metadata.name, alternateName: 'Как мы забываем летать', description: metadata.description, inLanguage: locales.map(item => item.code) });
    document.head.append(schema);
  }
}
