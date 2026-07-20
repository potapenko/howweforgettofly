import { useLocale } from "../i18n/LocaleContext";

export function SiteFooter() {
  const locale = useLocale();
  const copy = locale === "ru"
    ? {
        colophon: <>На создание этого сайта меня вдохновила книга Игоря Акимова и Виктора Клименко <i>«О мальчике, который умел летать, или путь к свободе»</i>.</>,
      }
    : {
        colophon: <>I drew inspiration for this site from <i>On the Boy Who Could Fly, or the Path to Freedom</i>, a Russian-language book by Igor Akimov and Viktor Klimenko.</>,
      };
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <p className="footer-colophon">{copy.colophon}</p>
      </div>
    </footer>
  );
}
