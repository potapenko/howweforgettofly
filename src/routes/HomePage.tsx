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
    ["Создание", "Придайте одному черновому ответу форму."],
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
        doorwayTitle: "Три входа. Ни один не выше другого.",
        doorwayIntro: "Можно войти как родитель, который отвечает за условия; как взрослый, заметивший незавершённый вопрос; или как человек, решающий, какую роль дать ИИ — и какую не отдавать.",
        routes: [
          ["01", "Родителям", "Оставить небо открытым", "Держать безопасность и честные границы, не подменяя ими выбор ребёнка.", "/parents", "rust"],
          ["02", "Взрослым", "Вспомнить полёт", "Начать с реальных обязанностей, навыков, отношений и сил, которые есть сегодня.", "/adults", "blue"],
          ["03", "ИИ", "Настроить ветер", "Пусть инструмент расширяет варианты, но не назначает цель и не наследует ответственность.", "/ai", "ochre"],
        ] as const,
        mapEyebrow: "Когда карта становится небом",
        mapTitle: "Карты нужны. Но важно видеть, где они заканчиваются.",
        mapBody: [
          "Семья, школа, традиции, профессия, рынок и машины предлагают маршруты раньше, чем мы успеваем спросить, куда они ведут. В этих маршрутах есть знание, память, предостережение и забота.",
          "Проблема начинается, когда знакомый ответ незаметно вытесняет вопрос: правильное исполнение заменяет авторство, а измеримый результат — живую связь человека с тем, что он делает.",
        ],
        cycleEyebrow: "Цикл, из которого можно выйти или вернуться назад",
        cycleTitle: "Один небольшой полёт",
        cycleIntro: "Это не конвейер продуктивности. Десятиминутная попытка, просьба о помощи, незаметное исправление или решение остановиться тоже могут быть завершённым циклом.",
        closingEyebrow: "Летать никто не обязан",
        closingTitle: "Достоинство существует до любого творческого поступка.",
        closingBody: "Эту книгу можно просто читать. Здесь нет теста, профиля, сохранённой истории и скрытого следующего уровня. Можно остановиться, остаться на Земле или вернуться позже.",
      }
    : {
        doorwayEyebrow: "Begin with the life in front of you",
        doorwayTitle: "Three doorways. No higher route.",
        doorwayIntro: "Enter as a parent responsible for conditions, as an adult who has noticed an unfinished question, or as someone deciding what AI may—and may not—do.",
        routes: [
          ["01", "Parents", "Keep the sky open", "Hold safety and honest limits without using them to pre-write a child's answer.", "/parents", "rust"],
          ["02", "Adults", "Remembering Flight", "Begin with the obligations, skills, relationships, and energy that are present today.", "/adults", "blue"],
          ["03", "AI", "Set the Wind", "Let a tool widen the field without assigning purpose or inheriting responsibility.", "/ai", "ochre"],
        ] as const,
        mapEyebrow: "When a map becomes the sky",
        mapTitle: "We need maps. We also need to see their edges.",
        mapBody: [
          "Families, schools, traditions, professions, markets, and machines offer routes before we know how to ask where they lead. Those routes carry knowledge, memory, warning, and care.",
          "The trouble begins when a familiar answer quietly replaces the question—when correct performance replaces authorship, and a measurable result replaces a person's living relation to the work.",
        ],
        cycleEyebrow: "A cycle with ways back and out",
        cycleTitle: "One small Flight",
        cycleIntro: "This is not a productivity pipeline. A ten-minute attempt, a request for help, a private repair, or a decision to stop can all complete the cycle.",
        closingEyebrow: "No one is required to fly",
        closingTitle: "Dignity comes before every act of authorship.",
        closingBody: "You can simply read this book. There is no test, profile, saved history, or hidden next level. You may stop, remain on Ground, or return another day.",
      };

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
          {cycle[locale].map(([term, meaning], index) => (
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
