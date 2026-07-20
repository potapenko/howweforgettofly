import type { SceneDefinition } from "../types";
import type { Locale } from "../i18n/LocaleContext";
import type { PathwayId } from "./pathways";

export const pageScenes: Record<string, SceneDefinition> = {
  home: {
    id: "page-01",
    kind: "home",
    register: "quiet",
    mechanism: "map-sky",
    title: "When the map becomes the sky",
    plainMeaning:
      "A useful route can become so large that it hides the possibility of choosing.",
    description:
      "An open paper book holds a printed map. The map rises into a wall, reveals its edge, then folds back beside an open blue sky while three equal doorways appear.",
    accent: "blue",
  },
  parents: {
    id: "page-03",
    kind: "route",
    register: "quiet",
    mechanism: "keeper-table",
    title: "Keep the sky open",
    plainMeaning:
      "The adult holds safety and honest limits while leaving real choices genuinely open.",
    description:
      "A shared paper worktable separates a strong adult-held frame from an open field. A translucent expected-result sheet can be lifted away without removing the supports.",
    accent: "rust",
  },
  adults: {
    id: "page-04",
    kind: "route",
    register: "atlas",
    mechanism: "living-map",
    title: "Remembering from the life you have",
    plainMeaning:
      "A new question can open without erasing the obligations, skills, and relationships already present.",
    description:
      "A worn inherited map stays intact while one reversible fold opens beside its established routes.",
    accent: "blue",
  },
  ai: {
    id: "page-05",
    kind: "route",
    register: "atlas",
    mechanism: "wind",
    title: "Set the Wind",
    plainMeaning:
      "AI can widen options, but purpose, consent, adoption, and responsibility remain human.",
    description:
      "Translucent vellum planes move around a fixed human-written note and a manually held compass. The Wind never moves the compass.",
    accent: "ochre",
  },
  aiAuthorship: {
    id: "scene-ai-02",
    kind: "route",
    register: "atlas",
    mechanism: "adoption-folds",
    title: "Four gestures of authorship",
    plainMeaning: "Generation is not adoption.",
    description:
      "An open pop-up book receives several wind-carried forms. Four equal paper mechanisms remain available while one form is deliberately changed by human hands.",
    accent: "ochre",
  },
  aiCandidateMap: {
    id: "scene-ai-03",
    kind: "route",
    register: "atlas",
    mechanism: "candidate-map",
    title: "A map that pretended to be the Sky",
    plainMeaning:
      "An appealing AI proposal is a candidate map, not a discovered purpose.",
    description:
      "One polished blue-and-orange route rises until it covers the horizon. More routes gather around it; then the Compass restores their scale beside a quiet path, a blank leaf, and Ground.",
    accent: "blue",
  },
  aiReturnThreshold: {
    id: "scene-ai-04",
    kind: "route",
    register: "atlas",
    mechanism: "return-threshold",
    title: "Return from simulation",
    plainMeaning: "A simulated audience is preparation, not Return.",
    description:
      "A smooth paper rehearsal appears behind a translucent screen. One adopted form crosses a small real threshold, meets material resistance or a trusted witness, and returns with a fold, a mark, and a repair brace.",
    accent: "blue",
  },
  parentsHonestModes: {
    id: "scene-p-01",
    kind: "route",
    register: "quiet",
    mechanism: "honest-mode-rail",
    title: "Name the mode honestly",
    plainMeaning: "A question is not open if only yes can survive.",
    description:
      "A gentle blank sentence strip turns over and reveals a fixed rail beneath it. The strip then unfolds into an instruction, a boundary with real choice of method, and an invitation with a full, equally visible refusal exit.",
    accent: "blue",
  },
  adultsGroundGravity: {
    id: "scene-a-01",
    kind: "route",
    register: "atlas",
    mechanism: "ground-or-gravity",
    title: "Ground is not Gravity",
    plainMeaning:
      "Ground supports and limits an attempt; Gravity turns an unexamined route into destiny.",
    description:
      "Visible paper braces hold money, care, craft, work, and rest as real parts of the landscape. Blank inherited labels lift away while the supports remain; one small reversible fold opens beside a materially closed door.",
    accent: "blue",
  },
  atlas: {
    id: "page-06",
    kind: "route",
    register: "atlas",
    mechanism: "equal-lenses",
    title: "One sheet, ten honest doorways",
    plainMeaning:
      "Choose by the work in front of you, not by a type assigned to you.",
    description:
      "A continuous sheet unfolds into ten equal paper mechanisms. None is elevated, locked, numbered as progress, or recommended by an algorithm.",
    accent: "rust",
  },
  finalSky: {
    id: "page-07",
    kind: "final",
    register: "quiet",
    mechanism: "open-horizon",
    title: "The Sky Remains Open",
    plainMeaning:
      "A route can end while the horizon remains open.",
    description:
      "The last open book widens into a bright horizon. A paper plane, sailboat, kite, blank leaf, resting form, and Ground remain together while familiar Wind passes through without lifting any of them by force.",
    accent: "blue",
  },
};

export const pageScenesRu: Record<string, SceneDefinition> = {
  home: {
    ...pageScenes.home,
    title: "Когда карта становится небом",
    plainMeaning: "Полезный маршрут может разрастись так, что за ним перестаёт быть видно возможность выбора.",
    description: "В раскрытой бумажной книге лежит карта. Она поднимается стеной, затем показывает свой край и складывается рядом с открытым голубым небом.",
  },
  parents: {
    ...pageScenes.parents,
    title: "Оставить небо открытым",
    plainMeaning: "Взрослый держит безопасность и честные границы, не закрывая пространство настоящего выбора.",
    description: "Бумажный рабочий стол отделяет прочную рамку, за которую отвечает взрослый, от открытого поля. Прозрачный лист с ожидаемым результатом можно поднять, не убирая опоры.",
  },
  adults: {
    ...pageScenes.adults,
    title: "Вспомнить, не стирая настоящую жизнь",
    plainMeaning: "Новый вопрос может открыться рядом с уже существующими обязанностями, навыками и отношениями.",
    description: "Потрёпанная унаследованная карта остаётся целой, а рядом с её привычными маршрутами раскрывается один обратимый сгиб.",
  },
  ai: {
    ...pageScenes.ai,
    title: "Настроить Ветер",
    plainMeaning: "ИИ может расширить выбор, но цель, согласие, решение и ответственность остаются у человека.",
    description: "Полупрозрачные бумажные потоки движутся вокруг записанной человеком цели и удерживаемого рукой компаса. Ветер никогда не поворачивает компас.",
  },
  aiAuthorship: {
    ...pageScenes.aiAuthorship,
    title: "Четыре жеста авторства",
    plainMeaning: "Сгенерировать — ещё не значит принять.",
    description:
      "В раскрытую pop-up-книгу Ветер приносит несколько бумажных форм. Четыре равноправных механизма остаются доступными; одну форму намеренно меняют руки человека.",
  },
  aiCandidateMap: {
    ...pageScenes.aiCandidateMap,
    title: "Карта, которая притворилась небом",
    plainMeaning:
      "Привлекательное предложение ИИ — одна из возможных карт, а не обнаруженная жизненная цель.",
    description:
      "Один гладкий сине-оранжевый маршрут поднимается и закрывает горизонт. Вокруг накапливаются другие маршруты; затем Компас возвращает им настоящий масштаб рядом с тихой тропой, чистым листом и Землёй.",
  },
  aiReturnThreshold: {
    ...pageScenes.aiReturnThreshold,
    title: "Возвращение из симуляции",
    plainMeaning: "Смоделированная аудитория — подготовка, а не Возвращение.",
    description:
      "За полупрозрачной ширмой возникает гладкая бумажная репетиция. Одна принятая форма проходит через небольшой реальный порог, встречает сопротивление материала или доверенного свидетеля и возвращается со сгибом, отметкой и опорой для исправления.",
  },
  parentsHonestModes: {
    ...pageScenes.parentsHonestModes,
    title: "Честно назвать режим",
    plainMeaning:
      "Вопрос нельзя назвать открытым, если приемлем только ответ «да».",
    description:
      "Мягкая пустая бумажная реплика переворачивается и показывает скрытый жёсткий рельс. Затем она раскрывается в требование, границу с настоящим выбором способа и приглашение с такой же заметной створкой «нет».",
  },
  adultsGroundGravity: {
    ...pageScenes.adultsGroundGravity,
    title: "Земля — не Инерция",
    plainMeaning:
      "Земля поддерживает попытку и задаёт ей пределы. Инерция выдаёт давно не проверенный путь за судьбу.",
    description:
      "Видимые бумажные опоры удерживают деньги, заботу, ремесло, работу и отдых как реальные части ландшафта. Пустые чужие ярлыки снимаются, а опоры остаются; рядом с действительно закрытой дверью раскрывается один небольшой обратимый сгиб.",
  },
  atlas: {
    ...pageScenes.atlas,
    title: "Один лист, десять честных входов",
    plainMeaning: "Выбирайте по работе, которая стоит перед вами, а не по присвоенному типу личности.",
    description: "Непрерывный лист раскрывается в десять равноправных бумажных механизмов. Ни один не поднят выше, не заперт и не назначен алгоритмом.",
  },
  finalSky: {
    ...pageScenes.finalSky,
    title: "Небо остаётся открытым",
    plainMeaning: "Путь может закончиться, а горизонт — остаться открытым.",
    description: "Последняя раскрытая книга становится светлым горизонтом. Бумажный самолётик, парусник, змей, чистый лист, отдыхающая форма и Земля остаются вместе, а знакомый Ветер проходит сквозь них, никого не поднимая силой.",
  },
};

export function pageScenesFor(locale: Locale) {
  return locale === "ru" ? pageScenesRu : pageScenes;
}

export interface PathwayScenePlacement {
  /** The scene begins immediately after this approved prose section. */
  afterSectionId: string;
  /** Its settled state releases into this existing section without new copy. */
  releaseIntoSectionId: string;
  scene: SceneDefinition;
}

export function pathwayScenePlacementsFor(
  locale: Locale,
  pathwayId: PathwayId,
): readonly PathwayScenePlacement[] {
  const scenes = pageScenesFor(locale);
  if (pathwayId === "parent") {
    return [{
      afterSectionId: "keeper-conditions",
      releaseIntoSectionId: "honest-modes",
      scene: scenes.parentsHonestModes,
    }];
  }
  if (pathwayId === "adult") {
    return [{
      afterSectionId: "present-life",
      releaseIntoSectionId: "ground-gravity",
      scene: scenes.adultsGroundGravity,
    }];
  }
  return [
    {
      afterSectionId: "human-assignments",
      releaseIntoSectionId: "wind-roles",
      scene: scenes.aiAuthorship,
    },
    {
      afterSectionId: "protocol",
      releaseIntoSectionId: "direction-test",
      scene: scenes.aiCandidateMap,
    },
    {
      afterSectionId: "adoption-attribution",
      releaseIntoSectionId: "craft-scope",
      scene: scenes.aiReturnThreshold,
    },
  ];
}
