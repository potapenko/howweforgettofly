import { SceneObserver } from "../components/SceneObserver";
import { pageScenesFor } from "../content/pages";
import { useLocale } from "../i18n/LocaleContext";

export function FinalSkyPage({ embedded = false }: { embedded?: boolean }) {
  const locale = useLocale();
  const Root = embedded ? "section" : "main";
  const ChapterHeading = embedded ? "h2" : "h1";
  const copy = locale === "ru"
    ? {
        eyebrow: "После Возвращения",
        title: "Небо остаётся открытым",
        deck: "Путь может закончиться, не закрывая горизонта.",
        paragraphs: [
          "Одни Полёты возвращаются формой. Другие — вопросом, который изменила погода. Некоторые Зовы остаются без ответа и тихо возвращаются на Землю.",
          "Здесь заканчивается страница. Не небо.",
        ],
        cadence: "Мы не забыли, как летать. Небо всё ещё здесь.",
      }
    : {
        eyebrow: "After the Return",
        title: "The Sky Remains Open",
        deck: "A route may end without closing the horizon.",
        paragraphs: [
          "Some Flights return as a form. Others return as questions changed by the weather. Some Calls go unanswered and settle quietly back on Ground.",
          "The page ends here. The Sky does not.",
        ],
        cadence: "We have not forgotten how to fly. The Sky is still here.",
      };

  return (
    <Root
      className="final-sky-page book-section"
      data-book-section="final-sky"
      id={embedded ? "final-sky" : undefined}
      tabIndex={embedded ? -1 : undefined}
    >
      <SceneObserver
        scene={pageScenesFor(locale).finalSky}
        className="final-sky-hero scene-led-page"
      >
        <div className="final-sky-lead paper-panel">
          <p className="eyebrow">{copy.eyebrow}</p>
          <ChapterHeading className="chapter-title">{copy.title}</ChapterHeading>
          <p className="hero-deck">{copy.deck}</p>
          <div className="final-sky-copy">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="final-sky-cadence">{copy.cadence}</p>
          </div>
        </div>
        <div className="theatre-reserve" aria-hidden="true" />
      </SceneObserver>
    </Root>
  );
}
