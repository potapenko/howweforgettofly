import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { creativeEdition, parseEdition } from './creativeEdition';
import { chapterIds, partIds, partSpots, creativeAnchorAliases } from './creativePlacements';
import { locales } from '../i18n/locales';

describe('accepted creative edition', () => {
  it('preserves the accepted Russian manuscript exactly outside the existing footer', () => {
    const accepted = readFileSync('docs/product/RU_CREATIVE_THINKING_BOOK.md', 'utf8').split('\n---\n')[0];
    expect(creativeEdition('ru')).toEqual(parseEdition(accepted));
  });
  it.each(locales.map(item => item.code))('keeps all chapters, paragraphs and rich blocks in %s', locale => {
    const edition = creativeEdition(locale);
    const baseline = creativeEdition('ru');
    expect(edition.chapters).toHaveLength(9);
    edition.chapters.forEach((chapter, i) => {
      expect(chapter.parts).toHaveLength(partIds[i].length);
      expect(partSpots[i]).toHaveLength(chapter.parts.length);
      chapter.parts.forEach((part, j) => {
        expect(part.blocks.map(b => b.kind)).toEqual(baseline.chapters[i].parts[j].blocks.map(b => b.kind));
        expect(part.blocks.every(b => b.text.trim())).toBe(true);
      });
    });
  });
  it('maps every retained alias to an actual reading destination', () => {
    const targets = new Set([...chapterIds, ...partIds.flat(), 'adults']);
    for (const target of Object.values(creativeAnchorAliases)) expect(targets.has(target)).toBe(true);
  });
});
