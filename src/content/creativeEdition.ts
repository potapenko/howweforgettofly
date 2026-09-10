import type { Locale } from '../i18n/locales';

export interface ReadingBlock { kind: 'p' | 'quote' | 'list'; text: string; }
export interface ReadingPart { title: string; blocks: ReadingBlock[]; }
export interface ReadingChapter { title: string; parts: ReadingPart[]; }
export interface CreativeEdition { title: string; chapters: ReadingChapter[]; }

/** The deliberately small authored format has no HTML, links or executable content. */
export function parseEdition(markdown: string): CreativeEdition {
  const edition: CreativeEdition = { title: '', chapters: [] };
  let chapter: ReadingChapter | undefined;
  let part: ReadingPart | undefined;
  for (const raw of markdown.trim().split(/\n\s*\n/)) {
    const text = raw.replace(/\n\s*/g, ' ').trim();
    if (text.startsWith('# ')) { edition.title = text.slice(2); continue; }
    if (text.startsWith('## ')) {
      part = { title: '', blocks: [] };
      chapter = { title: text.slice(3), parts: [part] };
      edition.chapters.push(chapter);
    } else if (text.startsWith('### ')) {
      if (!chapter) throw new Error('Chapter missing before part');
      part = { title: text.slice(4).replace(/^\d+\.\s*/, ''), blocks: [] };
      chapter.parts.push(part);
    } else {
      if (!part) throw new Error('Part missing before prose');
      const kind = text.startsWith('> ') ? 'quote' : text.startsWith('- ') ? 'list' : 'p';
      part.blocks.push({ kind, text: kind === 'quote' ? text.replace(/(^| )> /g, '$1') : kind === 'list' ? raw.split(/\n- /).map(s => s.replace(/^- /, '').replace(/\n\s*/g, ' ')).join('\n') : text });
    }
  }
  if (edition.chapters.length !== 9) throw new Error('A creative edition must contain all nine chapters');
  return edition;
}

const manuscripts = import.meta.glob('./editions/*.md', { query: '?raw', eager: true, import: 'default' }) as Record<string, string>;
const editions = new Map<string, CreativeEdition>();
export function creativeEdition(locale: Locale): CreativeEdition {
  const cached = editions.get(locale);
  if (cached) return cached;
  const manuscript = manuscripts[`./editions/${locale}.md`];
  if (!manuscript) throw new Error(`Missing creative edition: ${locale}`);
  const parsed = parseEdition(manuscript);
  editions.set(locale, parsed);
  return parsed;
}
