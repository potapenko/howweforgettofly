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
        title: "Выбирайте вопрос, а не тип человека.",
        deck: "Десять неранжированных способов посмотреть на обычную ситуацию.",
        intro: "Атлас не диагностирует, кто вы, и не вычисляет следующий шаг. Это десять линз для чтения: задержитесь у той, которая помогает увидеть работу яснее, или просто продолжайте.",
        all: "Все десять остаются на одной странице",
        question: "Что сейчас перед вами?",
        lens: "Что помогает увидеть",
        boundary: "Чего из этого не следует",
        contractEyebrow: "Договор с читателем",
        contractTitle: "Книга ничего не собирает и никого не оценивает.",
        contract: [
          "Нет аккаунта, профиля ребёнка, анкеты, рейтинга и скрытой рекомендации.",
          "На странице нельзя ввести или отправить личный текст.",
          "Движение иллюстраций не меняет содержание и не делает выводов о читателе.",
          "Любой фрагмент можно оставить непрочитанным без потери маршрута.",
          "В вопросах реальной безопасности метафора заканчивается: нужны ясные действия и подходящая помощь.",
        ],
      }
    : {
        eyebrow: "An atlas of ideas",
        title: "Choose the question, not a type.",
        deck: "Ten unranked ways to look at an ordinary situation.",
        intro: "The Atlas does not diagnose who you are or compute a next step. These are ten lenses to read: pause where one clarifies the work, or simply continue.",
        all: "All ten remain on one page",
        question: "What is in front of you?",
        lens: "What it helps reveal",
        boundary: "What does not follow",
        contractEyebrow: "A contract with the reader",
        contractTitle: "The book collects nothing and evaluates no one.",
        contract: [
          "No account, child profile, questionnaire, ranking, or hidden recommendation.",
          "There is nowhere to enter or submit personal writing.",
          "Illustration movement never changes the text or draws conclusions about the reader.",
          "Any fragment may be left unread without breaking the route.",
          "Where real safety is at stake, the metaphor ends: use clear action and appropriate help.",
        ],
      };

  return (
    <Root className="atlas-page book-section" data-book-section="atlas" id={embedded ? "atlas" : undefined} tabIndex={embedded ? -1 : undefined}>
      <SceneObserver scene={pageScenesFor(locale).atlas} className="atlas-hero scene-led-page">
        <div className="atlas-lead paper-panel">
          <p className="eyebrow">{copy.eyebrow}</p>
          <ChapterHeading className="chapter-title">{copy.title}</ChapterHeading>
          <p className="hero-deck">{copy.deck}</p>
          <p>{copy.intro}</p>
        </div>
        <div className="theatre-reserve" aria-hidden="true" />
      </SceneObserver>

      <section id="atlas-practices" className="atlas-catalogue page-width">
        <div className="section-heading">
          <p className="eyebrow">{copy.all}</p>
          <h2>{copy.question}</h2>
        </div>
        <div className="experience-grid">
          {cards.map((card, index) => (
            <article key={card.id} className="experience-card atlas-reading-card">
              <div className="experience-card-index">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{card.doorway}</span>
              </div>
              <div>
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
            <h2>{copy.contractTitle}</h2>
          </div>
          <ul>{copy.contract.map((line) => <li key={line}>{line}</li>)}</ul>
        </div>
      </section>
    </Root>
  );
}
