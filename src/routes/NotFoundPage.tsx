import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { canonicalBookHref } from "../navigation/bookNavigation";

export function NotFoundPage() {
  const locale = useLocale();
  return (
    <main className="not-found-page page-width">
      <p className="eyebrow">{locale === "ru" ? "Обычный выход" : "An ordinary exit"}</p>
      <h1>{locale === "ru" ? "Этого разворота в книге нет." : "This fold is not part of the book."}</h1>
      <p>
        {locale === "ru"
          ? "Возможно, адрес изменился или оказался неполным. Можно вернуться к началу непрерывной книги."
          : "The address may have changed or may simply be incomplete. Return to the beginning of the continuous book."}
      </p>
      <div className="hero-actions">
        <Link className="button primary" preventScrollReset to={canonicalBookHref("/", locale)}>
          {locale === "ru" ? "К началу" : "Return to the beginning"}
        </Link>
      </div>
    </main>
  );
}
