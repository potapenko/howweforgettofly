import { describe, expect, it } from 'vitest';
import { locales, localeFromPathname, localeRoot, matchLocale, preferredLocale, stripLocale } from './locales';
import { canonicalBookHref, legacyBookDestination } from '../navigation/bookNavigation';
import { translationPack, translateCopy } from './translate';
import source from './messages/en.json';
import { storyForMechanism, storyRegistry } from '../story/storyRegistry';

describe('ten complete editions', () => {
  it.each(locales)('$code owns its routes and keeps semantic anchors', locale => {
    expect(localeFromPathname(localeRoot(locale.code))).toBe(locale.code);
    expect(stripLocale(`${localeRoot(locale.code)}parents`)).toBe('/parents');
    expect(canonicalBookHref('/manifesto/M04', locale.code)).toBe(`${localeRoot(locale.code)}#M04`);
    expect(legacyBookDestination(`${localeRoot(locale.code)}parents`)).toBe(`${localeRoot(locale.code)}#parents`);
  });
  it('matches ordered browser preferences and explicit choices', () => {
    expect(preferredLocale(null, ['it-IT', 'pt-PT', 'en'])).toBe('pt-BR');
    expect(preferredLocale('en', ['ar-EG'])).toBe('en');
    expect(preferredLocale('invalid', ['zh-TW', 'ja-JP'])).toBe('ja');
    expect(preferredLocale(null, ['it'])).toBe('en');
    expect(matchLocale('zh_Hans_CN')).toBe('zh-Hans');
    expect(matchLocale('zh-CN')).toBe('zh-Hans');
    expect(matchLocale('zh-SG')).toBe('zh-Hans');
    expect(matchLocale('zh-Hant')).toBeUndefined();
    expect(matchLocale('zh')).toBeUndefined();
    expect(localeFromPathname('/deceptive/')).toBe('en');
  });
  for (const locale of locales) {
    if (locale.code === 'en' || locale.code === 'ru') continue;
    const code = locale.code;
    it(`${code} has every string and interpolation token, with unchanged scene mechanics`, () => {
      const pack = translationPack(code);
      expect(Object.keys(pack).sort()).toEqual(Object.keys(source).sort());
      for (const [key, value] of Object.entries(pack)) {
        expect(value.trim(), key).not.toBe('');
        expect(value.match(/\{\w+\}/g), key).toEqual(key.match(/\{\w+\}/g));
      }
      for (const mechanism of Object.keys(storyRegistry) as (keyof typeof storyRegistry)[]) {
        const original = storyRegistry[mechanism];
        const translated = storyForMechanism(mechanism, code);
        expect(translated.layers).toBe(original.layers);
        expect(translated.inlineProgress).toBe(original.inlineProgress);
        expect(translated.beats.map(({label: _label, narration: _narration, ...mechanics}) => mechanics))
          .toEqual(original.beats.map(({label: _label, narration: _narration, ...mechanics}) => mechanics));
      }
    });
  }
  it('rejects unregistered editorial words instead of silently showing English', () => {
    expect(() => translateCopy('A new sentence without an edition.', 'fr')).toThrow('Unregistered copy');
  });
  it('leaves both approved editions and machine values unchanged', () => {
    const original = { title: 'Flight', id: 'Flight', href: '/parents' };
    expect(translateCopy(original, 'en')).toBe(original);
    expect(translateCopy(original, 'ru')).toBe(original);
    expect(translateCopy(original, 'ar')).toEqual({title:'الطيران', id:'Flight', href:'/parents'});
  });
});
