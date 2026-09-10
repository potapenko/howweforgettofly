import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import { App } from '../App';
import { locales, localeRoot, preferenceKey } from './locales';
import { translationPack } from './translate';
import source from './messages/en.json';

function Probe() {
  const location = useLocation(), navigate = useNavigate();
  return <><output data-testid="url">{location.pathname + location.search + location.hash}</output><button onClick={() => navigate(-1)}>Back test</button></>;
}
function book(entry: string) { return render(<MemoryRouter initialEntries={[entry]}><App/><Probe/></MemoryRouter>); }
beforeEach(() => {
  window.localStorage.clear();
  Object.defineProperty(navigator, 'languages', { configurable: true, value: ['en-US'] });
  Object.defineProperty(window, 'matchMedia', { configurable: true, value: vi.fn().mockReturnValue({matches:false,addEventListener:vi.fn(),removeEventListener:vi.fn()}) });
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe('multilingual reader', () => {
  it.each(locales)('renders the complete $code journey and localized accessible copy', locale => {
    const { container } = book(localeRoot(locale.code));
    expect(document.documentElement.lang).toBe(locale.code);
    expect(document.documentElement.dir).toBe(locale.dir);
    for (const anchor of ['top','manifesto','parents','adults','ai','atlas','final-sky','M01','M12']) expect(container.querySelector(`#${anchor}`)).not.toBeNull();
    expect(container.querySelectorAll('form,input,textarea')).toHaveLength(0);
    expect(container.querySelectorAll('.language-options a')).toHaveLength(10);
    if (locale.code !== 'en' && locale.code !== 'ru') {
      const pack = translationPack(locale.code);
      const allCopy = [container.textContent, ...Array.from(container.querySelectorAll('[aria-label],[alt]'), node => node.getAttribute('aria-label') || node.getAttribute('alt'))].join('\n');
      const leaked = Object.keys(source).filter(text => text.length > 25 && pack[text] !== text && allCopy.includes(text));
      expect(leaked).toEqual([]);
    }
  });
  it('detects first entry, preserves URL state, and accepts manual English with blocked storage', async () => {
    Object.defineProperty(navigator, 'languages', { configurable: true, value: ['fr-FR', 'en'] });
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('blocked'); });
    book('/?campaign=paper#parents');
    await waitFor(() => expect(screen.getByTestId('url')).toHaveTextContent('/fr/?campaign=paper#parents'));
    fireEvent.click(screen.getByRole('link', {name:'English'}));
    await waitFor(() => expect(document.documentElement.lang).toBe('en'));
    expect(screen.getByTestId('url').textContent).toContain('/?campaign=paper#');
    fireEvent.click(screen.getByRole('button', {name:'Back test'}));
    await waitFor(() => expect(document.documentElement.lang).toBe('fr'));
  });
  it('respects a saved explicit choice but lets a direct path win', () => {
    window.localStorage.setItem(preferenceKey, 'ar');
    book('/de?campaign=paper#parents');
    expect(screen.getByTestId('url')).toHaveTextContent('/de/?campaign=paper#parents');
    expect(document.documentElement.lang).toBe('de');
  });
  it('remembers a menu choice and restores focus after Escape', () => {
    const {container} = book('/es/');
    const details = container.querySelector('details.language-menu')!;
    const summary = details.querySelector('summary')!;
    details.setAttribute('open','');
    fireEvent.keyDown(details, {key:'Escape'});
    expect(details).not.toHaveAttribute('open');
    expect(document.activeElement).toBe(summary);
    fireEvent.click(screen.getByRole('link', {name:'العربية'}));
    expect(window.localStorage.getItem(preferenceKey)).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.head.querySelectorAll('link[hreflang]')).toHaveLength(11);
    expect(document.head.querySelectorAll('meta[property="og:locale:alternate"]')).toHaveLength(9);
  });
  it('keeps query parameters on a legacy localized route', () => {
    book('/ko/manifesto/M04?campaign=paper');
    expect(screen.getByTestId('url')).toHaveTextContent('/ko/?campaign=paper#M04');
  });
});
