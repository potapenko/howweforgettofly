import { ArrowDown } from "@phosphor-icons/react/ArrowDown";
import { ArrowRight } from "@phosphor-icons/react/ArrowRight";
import { Link } from "react-router-dom";
import { localeRoot, useLocale } from "../i18n/LocaleContext";
import { canonicalBookHref } from "../navigation/bookNavigation";

export function HomeCoverContent() {
  const locale = useLocale();
  const copy = locale === "ru"
    ? {
        title: ["Как мы", "забываем", "летать"],
        ariaTitle: "Как мы забываем летать",
        deck: "Творчество, авторство и ИИ",
        manifesto: "Манифест",
        parents: "Родителям",
        ai: "ИИ",
        atlas: "Атлас",
        section: "Раздел",
        pattern: "Схема",
        patternText: <>Мы начинаем в системах,<br />которые учат нас быть меньше.</>,
        finalSky: "Последний разворот",
        continue: "Продолжить к манифесту",
        finish: "Завершить сцену и перейти к тексту",
        nav: "Переходы по книге",
        sectionAria: "Раздел 01. Схема",
      }
    : {
        title: ["How we", "forget", "to fly"],
        ariaTitle: "How we forget to fly",
        deck: "Creativity, agency, and AI",
        manifesto: "Manifesto",
        parents: "Parents",
        ai: "AI",
        atlas: "Atlas",
        section: "Section",
        pattern: "The pattern",
        patternText: <>We start in systems<br />designed to keep us small.</>,
        finalSky: "Last spread",
        continue: "Continue to the Manifesto",
        finish: "Finish the opening scene and continue to the text",
        nav: "Opening routes",
        sectionAria: "Section 01, The Pattern",
      };
  return (
    <div className="home-cover-content" data-cover-locale={locale}>
      <img
        alt=""
        aria-hidden="true"
        className="home-cover-approved-frame"
        decoding="sync"
        draggable="false"
        fetchPriority="high"
        src={
          locale === "ru"
            ? "/parallax/home/background-master.png"
            : "/scenes/master-approved.png"
        }
      />
      <div className="home-cover-copy">
        <h1 aria-label={copy.ariaTitle}>
          {copy.title.map((line) => <span key={line}>{line}</span>)}
        </h1>
        <span className="home-cover-rule" aria-hidden="true" />
        <p className="home-cover-deck">{copy.deck}</p>
        <nav className="home-cover-nav" aria-label={copy.nav}>
          <Link preventScrollReset to={canonicalBookHref("/manifesto", locale)}>{copy.manifesto}</Link>
          <Link preventScrollReset to={canonicalBookHref("/parents", locale)}>{copy.parents}</Link>
          <Link preventScrollReset to={canonicalBookHref("/ai", locale)}>{copy.ai}</Link>
          <Link preventScrollReset to={canonicalBookHref("/atlas", locale)}>{copy.atlas}</Link>
        </nav>
      </div>

      <div className="home-cover-section" aria-label={copy.sectionAria}>
        <span className="home-cover-section-word">{copy.section}</span>
        <strong>01</strong>
        <span className="home-cover-section-divider" aria-hidden="true" />
        <p>
          <b>{copy.pattern}</b>
          {copy.patternText}
        </p>
      </div>

      <Link
        className="home-cover-tab home-cover-tab-left"
        preventScrollReset
        to={canonicalBookHref("/final-sky", locale)}
        aria-label={copy.finalSky}
      >
        <ArrowRight weight="bold" aria-hidden="true" />
      </Link>
      <Link
        className="home-cover-tab home-cover-tab-right"
        preventScrollReset
        to={canonicalBookHref("/manifesto", locale)}
        aria-label={copy.continue}
      >
        <ArrowRight weight="bold" aria-hidden="true" />
      </Link>
      <a
        className="home-cover-tab home-cover-tab-bottom"
        href={`${localeRoot(locale)}#doorways`}
        aria-label={copy.finish}
      >
        <ArrowDown weight="bold" aria-hidden="true" />
      </a>
    </div>
  );
}

export function HomeMobileIntro() {
  const locale = useLocale();
  return (
    <header className="home-mobile-intro page-width">
      <p className="eyebrow">
        {locale === "ru" ? "Живая книга о творчестве" : "A living book about creativity"}
      </p>
      <h1>
        {locale === "ru" ? "Как мы забываем летать" : "How We Forget to Fly"}
      </h1>
      <p className="hero-deck">
        {locale === "ru"
          ? "О детском любопытстве, взрослом авторстве и искусственном интеллекте, который может быть ветром — но не пилотом."
          : "On childhood curiosity, adult authorship, and AI that can act as wind—but never as the pilot."}
      </p>
    </header>
  );
}
