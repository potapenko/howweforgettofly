import { translateCopy } from "../i18n/translate";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HomeCoverContent, HomeMobileIntro } from "../components/HomeCoverContent";
import { HomeStory } from "../components/HomeStory";
import { RouteCard } from "../components/RouteCard";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useLocale } from "../i18n/LocaleContext";
import { useTheatre } from "../theatre";

const cycle = {
  en: [
    ["Call", "Notice what may deserve a response."],
    ["Compass", "Choose direction, limits, and responsibility."],
    ["Lift", "Meet the conditions that are actually available."],
    ["Making", "Give one revisable response a form."],
    ["Flight", "Let the form meet material, place, or relationship."],
    ["Return", "Receive effects, learning, value, or the need for repair."],
    ["Ground", "Close, care, rest, continue later, or end."],
  ],
  ru: [
    ["Зов", "Заметьте то, что, возможно, требует ответа."],
    ["Компас", "Выберите направление, границы и меру ответственности."],
    ["Подъём", "Оцените условия, которые есть на самом деле."],
    ["Дело", "Придайте одному черновому ответу форму."],
    ["Полёт", "Позвольте форме встретиться с материалом, местом или человеком."],
    ["Возвращение", "Примите последствия, опыт, пользу или необходимость что-то исправить."],
    ["Земля", "Завершите, позаботьтесь, отдохните, продолжите позже или остановитесь."],
  ],
} as const;

export function HomePage({ embedded = false }: { embedded?: boolean }) {
  const { reducedMotion } = useTheatre();
  const { hash } = useLocation();
  const locale = useLocale();
  const inlineStory = useMediaQuery("(max-width: 820px)");
  const [storyReleased, setStoryReleased] = useState(
    () => reducedMotion || inlineStory || Boolean(hash && hash !== "#top"),
  );
  const Root = embedded ? "section" : "main";
  const copy = locale === "ru"
    ? {
        doorwayEyebrow: "Начните с той жизни, которая уже есть",
        doorwayTitle: "Три входа в одну историю.",
        doorwayIntro: "Можно войти как родитель, который отвечает за условия; как взрослый, заметивший незавершённый вопрос; или как человек, решающий, какую роль дать ИИ — и какую не отдавать.",
        routes: [
          ["01", "Родителям", "Оставить небо открытым", "Держать безопасность и честные границы, не подменяя ими выбор ребёнка.", "/parents", "rust"],
          ["02", "Взрослым", "Вспомнить полёт", "Начать с реальных обязанностей, навыков, отношений и сил, которые есть сегодня.", "/adults", "blue"],
          ["03", "ИИ", "Настроить ветер", "Пусть инструмент расширяет варианты, но не назначает цель и не наследует ответственность.", "/ai", "ochre"],
        ] as const,
        mapEyebrow: "Когда карта становится небом",
        mapTitle: "Карты нужны. Но важно видеть, где они заканчиваются.",
        mapBody: [
          "Иногда перемена почти незаметна. Прежде чем выбрать цвет, мы вспоминаем, какой похвалили. Прежде чем начать, спрашиваем, будет ли польза. Свой вопрос ещё не успел прозвучать, а подходящий ответ уже рядом.",
          "Чужие маршруты помогают учиться и берегут от ошибок. Но постепенно взгляд может привыкнуть к карте настолько, что перестаёт замечать погоду над ней.",
        ],
        cycleEyebrow: "Цикл, из которого можно выйти или вернуться назад",
        cycleTitle: "Один небольшой полёт",
        cycleIntro: "Вопрос получает форму, встречается с миром и возвращается изменившимся. Иногда вся эта дуга помещается в один разговор.",
        closingEyebrow: "Летать никто не обязан",
        closingTitle: "Достоинство существует до любого творческого поступка.",
        closingBody: "Можно читать, задерживаться у рисунков, пропускать страницы. Земля остаётся под ногами, пока мы смотрим в небо.",
      }
    : translateCopy({
        doorwayEyebrow: "Begin with the life in front of you",
        doorwayTitle: "Three doorways into one story.",
        doorwayIntro: "Enter as a parent responsible for conditions, as an adult who has noticed an unfinished question, or as someone deciding what AI may—and may not—do.",
        routes: [
          ["01", "Parents", "Keep the sky open", "Hold safety and honest limits without using them to pre-write a child's answer.", "/parents", "rust"],
          ["02", "Adults", "Remembering Flight", "Begin with the obligations, skills, relationships, and energy that are present today.", "/adults", "blue"],
          ["03", "AI", "Set the Wind", "Let a tool widen the field without assigning purpose or inheriting responsibility.", "/ai", "ochre"],
        ] as const,
        mapEyebrow: "When a map becomes the sky",
        mapTitle: "We need maps. We also need to see their edges.",
        mapBody: [
          "The change can be almost invisible. Before choosing a colour, we remember which one was praised. Before beginning, we ask whether it will be useful. Our own question has barely formed; an acceptable answer is already waiting.",
          "Borrowed routes help us learn and keep us from old mistakes. But our eyes can grow so used to the map that we stop noticing the weather above it.",
        ],
        cycleEyebrow: "A cycle with ways back and out",
        cycleTitle: "One small Flight",
        cycleIntro: "A question takes shape, meets the world, and comes back changed. Sometimes the whole arc fits inside one conversation.",
        closingEyebrow: "No one is required to fly",
        closingTitle: "Dignity comes before every act of authorship.",
        closingBody: "Read, linger over a picture, skip a page. Ground stays beneath our feet while we look at the sky.",
      }, locale);

  useEffect(() => {
    if (inlineStory) setStoryReleased(true);
  }, [inlineStory]);

  useEffect(() => {
    document.documentElement.dataset.homeCoverActive = String(!storyReleased);
    return () => {
      delete document.documentElement.dataset.homeCoverActive;
    };
  }, [storyReleased]);

  return (
    <Root className="home-page book-section" data-book-section="home" id={embedded ? "top" : undefined}>
      <HomeStory reducedMotion={reducedMotion} onReleaseChange={setStoryReleased}>
        {!inlineStory ? <HomeCoverContent /> : null}
      </HomeStory>
      {inlineStory ? <HomeMobileIntro /> : null}

      <section id="doorways" className="doorway-section page-width">
        <div className="section-heading">
          <p className="eyebrow">{copy.doorwayEyebrow}</p>
          <h2>{copy.doorwayTitle}</h2>
          <p>{copy.doorwayIntro}</p>
        </div>
        <div className="route-card-grid three-up">
          {copy.routes.map(([number, eyebrow, title, body, href, tone]) => (
            <RouteCard key={href} number={number} eyebrow={eyebrow} title={title} body={body} href={href} tone={tone} />
          ))}
        </div>
      </section>

      <section className="recognition-section full-bleed-night">
        <div className="page-width recognition-grid">
          <div>
            <p className="eyebrow">{copy.mapEyebrow}</p>
            <h2>{copy.mapTitle}</h2>
          </div>
          <div className="long-copy">
            {copy.mapBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="cycle-section page-width">
        <div className="section-heading compact-heading">
          <p className="eyebrow">{copy.cycleEyebrow}</p>
          <h2>{copy.cycleTitle}</h2>
          <p>{copy.cycleIntro}</p>
        </div>
        <ol className="cycle-rail">
          {(locale === "ru" ? cycle.ru : translateCopy(cycle.en, locale)).map(([term, meaning], index) => (
            <li key={term}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{term}</h3>
              <p>{meaning}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="closing-invitation page-width">
        <div>
          <p className="eyebrow">{copy.closingEyebrow}</p>
          <h2>{copy.closingTitle}</h2>
        </div>
        <p>{copy.closingBody}</p>
      </section>
    </Root>
  );
}
