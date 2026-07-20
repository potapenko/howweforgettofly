import type { MechanismId } from "../types";
import type { StoryBeatLocalePack } from "./types";

/**
 * Russian narration for the seven expansion acts. The narration is the
 * approved wording from visual/scene-expansion/SCENE_SPECS.md; short labels
 * are authored as natural Russian headings rather than translated slugs.
 */
export const expansionStoryBeatCopyRu = {
  "adoption-folds": {
    "adoption-folds-note-waits": {
      label: "Свободное место ждёт",
      narration: "До Ветра уже есть вопрос и свободное место.",
    },
    "adoption-folds-forms-arrive": {
      label: "Появляются формы",
      narration: "Гладкость приносит материал, а не решение.",
    },
    "adoption-folds-four-folds-open": {
      label: "Четыре сгиба равноправны",
      narration: "Становятся видны четыре человеческих жеста.",
    },
    "adoption-folds-one-form-changes": {
      label: "Одна форма меняется",
      narration:
        "Одна форма меняется, потому что человек решает с ней работать.",
    },
    "adoption-folds-candidates-land": {
      label: "Варианты, а не команды",
      narration:
        "Варианты успокаиваются. Ответственность не уходит вместе с Ветром.",
    },
  },
  "candidate-map": {
    "candidate-map-candidate-appears": {
      label: "Появляется одна карта",
      narration: "Один маршрут появляется как возможность.",
    },
    "candidate-map-map-fills-sky": {
      label: "Карта закрывает Небо",
      narration: "Гладкость может выдать одну карту за целое Небо.",
    },
    "candidate-map-avalanche-gathers": {
      label: "Собирается лавина",
      narration: "Новых маршрутов становится больше, а выбора всё ещё нет.",
    },
    "candidate-map-scale-returns": {
      label: "Возвращается масштаб",
      narration: "Компас возвращает масштаб, но не вычисляет судьбу.",
    },
    "candidate-map-map-among-maps": {
      label: "Карта среди карт",
      narration: "Карта остаётся полезной. Горизонт возвращается.",
    },
  },
  "return-threshold": {
    "return-threshold-rehearsal-appears": {
      label: "Появляется репетиция",
      narration: "Правдоподобная аудитория появляется без последствий.",
    },
    "return-threshold-smooth-response": {
      label: "Ответ остаётся гладким",
      narration:
        "Репетиция может подготовить. Она не даёт согласия и не отвечает за реальность.",
    },
    "return-threshold-threshold-opens": {
      label: "Открывается порог",
      narration:
        "Человек выбирает, с какой реальностью форма уже готова встретиться.",
    },
    "return-threshold-form-meets-world": {
      label: "Форма встречает мир",
      narration: "Контакт оставляет след, которого не могла дать гладкость.",
    },
    "return-threshold-return-is-held": {
      label: "Возвращению дают место",
      narration:
        "Возвращение становится правкой, исправлением, приватностью или честным завершением.",
    },
  },
  "honest-mode-rail": {
    "honest-mode-rail-gentle-surface": {
      label: "Мягкая поверхность",
      narration: "Слова звучат открыто. Устройство выбора пока не видно.",
    },
    "honest-mode-rail-rail-revealed": {
      label: "Рельс становится видимым",
      narration:
        "Даже вопрос может допускать только один приемлемый ответ.",
    },
    "honest-mode-rail-modes-separate": {
      label: "Режимы расходятся",
      narration: "Режим становится честным, когда видны его границы.",
    },
    "honest-mode-rail-exit-opens": {
      label: "Открывается выход",
      narration:
        "Требование, граница и приглашение выполняют разную работу.",
    },
    "honest-mode-rail-all-modes-land": {
      label: "Все режимы на месте",
      narration:
        "Мягким словам больше не приходится изображать выбор, которого нет.",
    },
  },
  "ground-or-gravity": {
    "ground-or-gravity-supports-visible": {
      label: "Опоры видны",
      narration: "Земля уже удерживает жизнь.",
    },
    "ground-or-gravity-labels-descend": {
      label: "Ярлыки опускаются",
      narration: "Реальное условие можно принять за окончательный приговор.",
    },
    "ground-or-gravity-track-hardens": {
      label: "Путь застывает",
      narration: "Давно не проверенный путь начинает выглядеть судьбой.",
    },
    "ground-or-gravity-labels-lift": {
      label: "Ярлыки поднимаются",
      narration:
        "Уберите приговор; оставьте заботу, ремесло, пределы и отдых.",
    },
    "ground-or-gravity-small-fold-waits": {
      label: "Небольшой сгиб ждёт",
      narration:
        "Небольшой сгиб можно открыть, закрыть, оставить ждать — или искать опору вместе.",
    },
  },
  "equal-lenses": {
    "equal-lenses-one-sheet-rests": {
      label: "Один лист ждёт",
      narration: "Атлас начинается с одного листа, а не с диагноза.",
    },
    "equal-lenses-first-fold-opens": {
      label: "Открывается первый сгиб",
      narration:
        "Первый видимый вопрос не становится обязательным первым шагом.",
    },
    "equal-lenses-windows-multiply": {
      label: "Окон становится больше",
      narration: "Один лист даёт место разным способам увидеть ситуацию.",
    },
    "equal-lenses-weight-equalises": {
      label: "Вес уравнивается",
      narration: "Ни один вход не становится рангом или рекомендацией.",
    },
    "equal-lenses-atlas-remains-open": {
      label: "Атлас остаётся открытым",
      narration:
        "Можно выбрать вопрос, оставить все десять или просто продолжить.",
    },
  },
  "open-horizon": {
    "open-horizon-binding-settles": {
      label: "Переплёт замирает",
      narration: "Последний сгиб успокаивается.",
    },
    "open-horizon-wind-returns": {
      label: "Ветер возвращается",
      narration: "Ветер возвращается, не выбирая ни за кого.",
    },
    "open-horizon-edges-open": {
      label: "Края раскрываются",
      narration: "Книга раскрывается дальше края страницы.",
    },
    "open-horizon-many-states-remain": {
      label: "Все состояния остаются рядом",
      narration:
        "Полёт, Возвращение, отдых и возможность делят один горизонт.",
    },
    "open-horizon-sky-is-here": {
      label: "Небо всё ещё здесь",
      narration: "Мы не забыли, как летать. Небо всё ещё здесь.",
    },
  },
} as const satisfies Readonly<
  Partial<Record<MechanismId, StoryBeatLocalePack>>
>;
