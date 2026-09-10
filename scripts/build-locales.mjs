import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { locales, localeRoot } from '../src/i18n/locales.ts';
const origin = 'https://howweforgettofly.com';
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function localizeHtml(template, locale, pack = {}) {
  const definition = locales.find(item => item.code === locale);
  const t = text => {
    if (locale === 'en' || locale === 'ru') return text;
    if (!pack[text]) throw new Error(`Missing ${locale} metadata: ${text}`);
    return pack[text];
  };
  let html = template.replace(/<html lang="[^"]+">/, `<html lang="${locale}" dir="${definition.dir}">`);
  if (locale !== 'en' && locale !== 'ru') {
    html = html.replace(/(<meta\s+(?:name|property)="(?:description|og:site_name|og:title|og:description|og:image:alt|twitter:title|twitter:description|twitter:image:alt)"\s+content=")([^"]+)("\s*\/>)/g, (_, before, content, after) => before + escape(t(content)) + after);
    html = html.replace(/<title>([^<]+)<\/title>/, (_, title) => `<title>${escape(t(title))}</title>`);
  }
  html = html.replace(/(<link rel="canonical" href=")[^"]+("\s*\/>)/, `$1${origin}${localeRoot(locale)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]+("\s*\/>)/, `$1${origin}${localeRoot(locale)}$2`)
    .replace(/(<meta property="og:locale" content=")[^"]+("\s*\/>)/, `$1${definition.og}$2`)
    .replace(/\s*<link\s+rel="alternate"[\s\S]*?\/>/g, '')
    .replace(/\s*<meta property="og:locale:alternate"[^>]*\/>/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  const alternateLinks = [...locales.map(item => `<link rel="alternate" hreflang="${item.code}" href="${origin}${localeRoot(item.code)}" />`), `<link rel="alternate" hreflang="x-default" href="${origin}/" />`];
  const ogAlternates = locales.filter(item => item.code !== locale).map(item => `<meta property="og:locale:alternate" content="${item.og}" />`);
  let schema = '';
  if (locale === 'en') schema = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type':'WebSite', '@id': origin + '/#website', url: origin+'/', name:'How We Forget to Fly', alternateName:'Как мы забываем летать', description:'On childhood curiosity, adult authorship, and AI that can act as wind—but never as the pilot.', inLanguage: locales.map(item => item.code) })}</script>`;
  return html.replace('</head>', `${alternateLinks.join('\n')}\n${ogAlternates.join('\n')}\n${schema}\n</head>`);
}
export function buildLocales(root = 'dist') {
  const en = readFileSync(resolve(root, 'index.html'), 'utf8');
  const ru = readFileSync(resolve(root, 'ru/index.html'), 'utf8');
  const source = JSON.parse(readFileSync('src/i18n/messages/en.json', 'utf8'));
  for (const { code, prefix } of locales) {
    let pack = {};
    if (code !== 'en' && code !== 'ru') {
      pack = JSON.parse(readFileSync(`src/i18n/messages/${code}.json`, 'utf8'));
      const missing = Object.keys(source).filter(key => typeof pack[key] !== 'string' || !pack[key].trim());
      if (missing.length) throw new Error(`${code}: ${missing.length} missing translations`);
    }
    const directory = resolve(root, prefix);
    mkdirSync(directory, { recursive: true });
    writeFileSync(resolve(directory, 'index.html'), localizeHtml(code === 'ru' ? ru : en, code, pack));
  }
  writeFileSync(resolve(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locales.map(item => `<url><loc>${origin}${localeRoot(item.code)}</loc></url>`).join('\n')}\n</urlset>\n`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) buildLocales();
