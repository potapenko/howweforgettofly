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
        {locale === "ru" ? "Страница остановилась" : "The page paused"}
      </p>
      <h1 ref={headingRef} tabIndex={-1}>
        {locale === "ru"
          ? "Бумажный театр не смог продолжить."
          : "The paper theatre could not continue."}
      </h1>
      <p>
        {locale === "ru"
          ? "На этой странице нет форм и несохранённых записей. Можно безопасно повторить попытку или перезагрузить страницу."
          : "There are no forms or unsaved entries on this page. It is safe to retry or reload."}
      </p>
      <div className="hero-actions">
        <button className="button primary" type="button" onClick={onRetry}>
          {locale === "ru" ? "Повторить" : "Retry"}
        </button>
        <a className="button secondary" href={window.location.href}>
          {locale === "ru" ? "Перезагрузить страницу" : "Reload the page"}
        </a>
      </div>
    </main>
  );
}
