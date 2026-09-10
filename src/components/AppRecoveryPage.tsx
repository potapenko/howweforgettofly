import { translateCopy } from "../i18n/translate";
import { useEffect, useRef } from "react";
import { useLocale } from "../i18n/LocaleContext";

export function AppRecoveryPage({ onRetry }: { onRetry: () => void }) {
  const locale = useLocale();
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <main className="error-page page-width">
      <p className="eyebrow">
        {locale === "ru" ? "Страница остановилась" : translateCopy("The page paused", locale)}
      </p>
      <h1 ref={headingRef} tabIndex={-1}>
        {locale === "ru"
          ? "Бумажный театр не смог продолжить."
          : translateCopy("The paper theatre could not continue.", locale)}
      </h1>
      <p>
        {locale === "ru"
          ? "На этой странице нет форм и несохранённых записей. Можно безопасно повторить попытку или перезагрузить страницу."
          : translateCopy("There are no forms or unsaved entries on this page. It is safe to retry or reload.", locale)}
      </p>
      <div className="hero-actions">
        <button className="button primary" type="button" onClick={onRetry}>
          {locale === "ru" ? "Повторить" : translateCopy("Retry", locale)}
        </button>
        <a className="button secondary" href={window.location.href}>
          {locale === "ru" ? "Перезагрузить страницу" : translateCopy("Reload the page", locale)}
        </a>
      </div>
    </main>
  );
}
