import { translateCopy } from "../i18n/translate";
import { EditorialSpot, atlasSpots } from "../components/EditorialSpot";
import { SceneObserver } from "../components/SceneObserver";
import { atlasReading } from "../content/atlasReading";
import { pageScenesFor } from "../content/pages";
import { useLocale } from "../i18n/LocaleContext";

export function AtlasPage({ embedded = false }: { embedded?: boolean }) {
  const locale = useLocale();
  const cards = atlasReading(locale);
  const Root = embedded ? "section" : "main";
  const ChapterHeading = embedded ? "h2" : "h1";
  const copy = locale === "ru"
    ? {
        eyebrow: "Атлас идей",
        title: "Посмотреть ещё раз.",
        deck: "Десять вопросов к тому, что казалось знакомым.",
        intro: "После долгого пути знакомая вещь может показаться другой. Остановитесь у вопроса, который меняет ваш взгляд на неё.",
        all: "На одном листе",
        question: "Что сейчас перед вами?",
        lens: "Другой ракурс",
        boundary: "Граница",
        contractEyebrow: "Договор с читателем",
        contractTitle: "Книга никого не оценивает.",
        contract: [
          "Нет аккаунта, профиля ребёнка, анкеты, рейтинга и скрытой рекомендации.",
          "На странице нельзя ввести или отправить личный текст.",
          "Движение иллюстраций не меняет содержание и не делает выводов о читателе.",
          "Любой фрагмент можно оставить непрочитанным без потери маршрута.",
          "В вопросах реальной безопасности метафора заканчивается: нужны ясные действия и подходящая помощь.",
        ],
      }
    : translateCopy({
        eyebrow: "An atlas of ideas",
        title: "Look again.",
        deck: "Ten questions for what seemed familiar.",
        intro: "After a long journey, a familiar thing can look different. Pause at the question that changes how you see it.",
        all: "On one sheet",
        question: "What is in front of you?",
        lens: "Another angle",
        boundary: "The boundary",
        contractEyebrow: "A contract with the reader",
        contractTitle: "The book evaluates no one.",
        contract: [
          "No account, child profile, questionnaire, ranking, or hidden recommendation.",
          "There is nowhere to enter or submit personal writing.",
          "Illustration movement never changes the text or draws conclusions about the reader.",
          "Any fragment may be left unread without breaking the route.",
          "Where real safety is at stake, the metaphor ends: use clear action and appropriate help.",
        ],
      }, locale);

  return (
    <Root className="atlas-page book-section" data-book-section="atlas" id={embedded ? "atlas" : undefined} tabIndex={embedded ? -1 : undefined}>
      <SceneObserver scene={pageScenesFor(locale).atlas} className="atlas-hero scene-led-page">
        <div className="atlas-lead paper-panel">
          <p className="eyebrow">{copy.eyebrow}</p>
          <ChapterHeading className="chapter-title">{copy.title}</ChapterHeading>
          <p className="hero-deck">{copy.deck}</p>
          <EditorialSpot name="borrowed-map" size="reading" />
          <p>{copy.intro}</p>
        </div>
        <div className="theatre-reserve" aria-hidden="true" />
      </SceneObserver>

      <section id="atlas-practices" className="atlas-catalogue page-width">
        <div className="section-heading">
          <p className="eyebrow">{copy.all}</p>
          <h2>{copy.question}</h2>
          <EditorialSpot name="question-window" size="reading" />
        </div>
        <div className="experience-grid">
          {cards.map((card, index) => (
            <article key={card.id} className="experience-card atlas-reading-card">
              <div className="experience-card-index">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{card.doorway}</span>
              </div>
              <div>
                {atlasSpots[card.id] ? <EditorialSpot name={atlasSpots[card.id]!} size="reading" /> : null}
                <h3>{card.title}</h3>
                <p>{card.invitation}</p>
              </div>
              <dl>
                <div><dt>{copy.lens}</dt><dd>{card.lens}</dd></div>
                <div><dt>{copy.boundary}</dt><dd>{card.boundary}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="atlas-contract full-bleed-night">
        <div className="page-width atlas-contract-grid">
          <div>
            <p className="eyebrow">{copy.contractEyebrow}</p>
            <EditorialSpot name="dignity-bench" size="reading" surface="blue" />
            <h2>{copy.contractTitle}</h2>
          </div>
          <ul>{copy.contract.map((line) => <li key={line}>{line}</li>)}</ul>
        </div>
      </section>
    </Root>
  );
}
