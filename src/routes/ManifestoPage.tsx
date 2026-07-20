import { Link } from "react-router-dom";
import { SceneObserver } from "../components/SceneObserver";
import { manifestoArticles } from "../content/manifesto";
import { manifestoArticlesRu } from "../content/manifesto.ru";
import { useLocale } from "../i18n/LocaleContext";
import { canonicalBookHref } from "../navigation/bookNavigation";
import type { ManifestoArticle } from "../types";

function ManifestoSpread({
  article,
  locale,
}: {
  article: ManifestoArticle;
  locale: "en" | "ru";
}) {
  return (
    <SceneObserver
      as="article"
      scene={article.scene}
      className="manifesto-spread"
      id={article.id}
      tabIndex={-1}
    >
      <div className="manifesto-number" aria-hidden="true">
        {String(article.number).padStart(2, "0")}
      </div>
      <div className="manifesto-copy paper-panel">
        <p className="eyebrow">
          {locale === "ru" ? `Статья ${article.number}` : `Article ${article.number}`}
        </p>
        <h2>{article.title}</h2>
        <p className="article-kicker">{article.kicker}</p>
        <div className="article-body">
          {article.paragraphs.map((paragraph, index) =>
            paragraph.includes("→") ? (
              <p className="cycle-inline" key={`${article.id}-${index}`}>
                {paragraph}
              </p>
            ) : (
              <p key={`${article.id}-${index}`}>{paragraph}</p>
            ),
          )}
        </div>
        <aside className="article-landing">
          <p className="eyebrow">{locale === "ru" ? "Если приложить к жизни" : "In ordinary life"}</p>
          <p>{article.landing}</p>
        </aside>
        <aside className="scene-reading-note">
          <p className="eyebrow">{locale === "ru" ? "Что показывает иллюстрация" : "What the illustration holds"}</p>
          <p>{article.scene.plainMeaning}</p>
        </aside>
      </div>
      <div className="theatre-reserve" aria-hidden="true" />
    </SceneObserver>
  );
}

export function ManifestoPage({ embedded = false }: { embedded?: boolean }) {
  const locale = useLocale();
  const articles = locale === "ru" ? manifestoArticlesRu : manifestoArticles;
  const Root = embedded ? "section" : "main";
  const ChapterHeading = embedded ? "h2" : "h1";
  const copy = locale === "ru"
    ? {
        eyebrow: "Меморандум о человеческом авторстве",
        title: "То, что должно остаться нашим",
        opening: [
          "Мы живём среди карт. Семья, школа, традиции, профессия, рынок и машины предлагают маршруты раньше, чем мы успеваем спросить, куда они ведут. Карты нужны: в них есть знание, память, предостережение и забота. Опасность появляется, когда карта незаметно объявляет себя небом — знакомый ответ заменяет вопрос, правильное исполнение заменяет авторство, а измеримый результат заслоняет связь человека с тем, что он делает.",
          "Генеративный ИИ сделал это напряжение особенно заметным. Он легко предлагает готовую фразу, картинку, план или довод. Но изобилие ответов не решает, что вообще заслуживает ответа. Машина не может дать согласие, позаботиться о затронутом человеке, выбрать достойное направление или принять на себя последствия чужого решения.",
          "Творческое авторство мы называем Полётом. Это не профессия, не постоянное состояние и не высший сорт людей. Полёт случается, когда человек замечает вопрос, выбирает направление, придаёт ответу форму, выпускает её в реальность и возвращается с опытом, пользой, исправлением или честной точкой.",
          "Летать никто не обязан. Полётом нельзя заслужить достоинство. Этот манифест нужен для другого: чтобы авторство оставалось возможным у детей, у взрослых и у каждого, кто живёт среди большего числа готовых ответов, чем одна жизнь способна проверить.",
        ],
        index: "Статьи манифеста",
        covenantEyebrow: "Обещание и приглашение",
        covenantTitle: "Оставлять небо открытым — и не требовать, чтобы кто-то его заслужил.",
        covenant: [
          "Мы не будем просить людей заслужить достоинство, которое у них уже есть.",
          "Мы сохраним пользу карт, не принимая их за само небо.",
          "Мы будем беречь вопрос достаточно долго, чтобы человек успел выбрать свой ответ.",
          "Мы дадим свободе Компас, действию — форму, а последствиям — Возвращение.",
          "На Земле найдётся место ремеслу, заботе, помощи, границам, рутине и отдыху.",
          "Мы будем отвечать за безопасность детей, не присваивая себе право заранее решить, кем им стать.",
          "Мы позволим взрослому начать с той жизни, которая уже существует.",
          "Мы будем пользоваться Ветром, но не прятать в нём пилота.",
          "Мы оставим место для «да», «нет», «не сейчас», «по-другому» и честного завершения.",
        ],
        invitation: [
          "Начать можно с обычной фразы:",
          "Я замечаю ________. Возможно, мне хочется ответить, потому что ________.",
          "Затем спросите, что должно остаться в безопасности, какая помощь доступна и какую самую небольшую форму может принять ответ. Делайте её только в том случае, если этот Зов — ваш. Позвольте реальности ответить. Верните то, что нужно вернуть. Приземлитесь.",
          "Если сегодня никакого Зова нет, оставайтесь на Земле без оправданий. Так небо тоже остаётся открытым.",
        ],
      }
    : {
        eyebrow: "A memorandum for human authorship",
        title: "What must remain ours",
        opening: [
          "We live among maps. Families, schools, traditions, professions, markets, and machines offer routes before we know how to ask where they lead. We need those maps: they carry knowledge, memory, warning, and care. The danger begins when a map quietly calls itself the sky—when a familiar answer replaces the question, correct performance replaces authorship, and a measurable result obscures a person's relation to the work.",
          "Generative AI has made that tension hard to ignore. It can offer a finished sentence, image, plan, or argument with remarkable ease. Yet an abundance of answers cannot decide what deserves an answer. It cannot give consent, care for an affected person, choose a worthy direction, or inherit responsibility for a route someone adopts.",
          "We call creative authorship Flight. It is not a profession, a permanent state, or a higher kind of person. Flight is an event: someone notices what may call for a response, chooses a direction, gives the response a form, lets it meet reality, and returns with learning, value, repair, or an honest ending.",
          "No one is required to fly. No one earns dignity by flying. This manifesto asks only that authorship remain possible—for children, for adults, and for anyone living among more ready-made answers than one life can examine.",
        ],
        index: "Manifesto articles",
        covenantEyebrow: "A covenant and an invitation",
        covenantTitle: "Keep the sky open without asking anyone to earn it.",
        covenant: [
          "We will not ask people to earn the dignity they already possess.",
          "We will keep maps useful by refusing to mistake them for the sky.",
          "We will protect questions long enough for a person to choose a response.",
          "We will give freedom a Compass, action a form, and consequence a Return.",
          "We will let Ground include craft, care, help, limits, routine, and rest.",
          "We will hold children safely without claiming ownership of who they must become.",
          "We will let adults begin from the life that exists.",
          "We will use Wind without giving it a hidden cockpit.",
          "We will make room for yes, no, not now, differently, and an honest ending.",
        ],
        invitation: [
          "Begin with one ordinary sentence:",
          "I notice ________. I may want to answer because ________.",
          "Then ask what must remain safe, what help is available, and what smallest form could meet reality. Make it only if the Call is yours. Let reality answer. Return what is needed. Land.",
          "If no Call is yours today, remain on Ground without apology. That, too, keeps the sky open.",
        ],
      };

  return (
    <Root className="manifesto-page book-section" data-book-section="manifesto" id={embedded ? "manifesto" : undefined} tabIndex={embedded ? -1 : undefined}>
      <header className="manifesto-intro page-width">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <ChapterHeading className="chapter-title">{copy.title}</ChapterHeading>
        </div>
        <div className="manifesto-opening">
          {copy.opening.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </header>

      <nav className="manifesto-index" aria-label={copy.index}>
        <ol>
          {articles.map((article) => (
            <li key={article.id}>
              <Link preventScrollReset to={canonicalBookHref(`/manifesto/${article.id}`, locale)}>
                <span>{String(article.number).padStart(2, "0")}</span>
                {article.title}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <div className="manifesto-book">
        {articles.map((article) => <ManifestoSpread key={article.id} article={article} locale={locale} />)}
      </div>

      <section className="covenant-section page-width">
        <p className="eyebrow">{copy.covenantEyebrow}</p>
        <h2>{copy.covenantTitle}</h2>
        <div className="covenant-lines">
          {copy.covenant.map((line) => <p key={line}>{line}</p>)}
        </div>
        <div className="manifesto-opening">
          <p>{copy.invitation[0]}</p>
          <p className="article-kicker">{copy.invitation[1]}</p>
          <p>{copy.invitation[2]}</p>
          <p>{copy.invitation[3]}</p>
        </div>
      </section>

    </Root>
  );
}
