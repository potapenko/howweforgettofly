import { describe, expect, it } from "vitest";
import type { MechanismId } from "../types";
import { expansionStoryBeatCopyRu } from "./storyCopy.ru";
import {
  storyForMechanism,
  storyRegistry,
  storySupportsLocale,
} from "./storyRegistry";

const approvedNarration = {
  "adoption-folds": [
    "До Ветра уже есть вопрос и свободное место.",
    "Гладкость приносит материал, а не решение.",
    "Становятся видны четыре человеческих жеста.",
    "Одна форма меняется, потому что человек решает с ней работать.",
    "Варианты успокаиваются. Ответственность не уходит вместе с Ветром.",
  ],
  "candidate-map": [
    "Один маршрут появляется как возможность.",
    "Гладкость может выдать одну карту за целое Небо.",
    "Новых маршрутов становится больше, а выбора всё ещё нет.",
    "Компас возвращает масштаб, но не вычисляет судьбу.",
    "Карта остаётся полезной. Горизонт возвращается.",
  ],
  "return-threshold": [
    "Правдоподобная аудитория появляется без последствий.",
    "Репетиция может подготовить. Она не даёт согласия и не отвечает за реальность.",
    "Человек выбирает, с какой реальностью форма уже готова встретиться.",
    "Контакт оставляет след, которого не могла дать гладкость.",
    "Возвращение становится правкой, исправлением, приватностью или честным завершением.",
  ],
  "honest-mode-rail": [
    "Слова звучат открыто. Устройство выбора пока не видно.",
    "Даже вопрос может допускать только один приемлемый ответ.",
    "Режим становится честным, когда видны его границы.",
    "Требование, граница и приглашение выполняют разную работу.",
    "Мягким словам больше не приходится изображать выбор, которого нет.",
  ],
  "ground-or-gravity": [
    "Земля уже удерживает жизнь.",
    "Реальное условие можно принять за окончательный приговор.",
    "Давно не проверенный путь начинает выглядеть судьбой.",
    "Уберите приговор; оставьте заботу, ремесло, пределы и отдых.",
    "Небольшой сгиб можно открыть, закрыть, оставить ждать — или искать опору вместе.",
  ],
  "equal-lenses": [
    "Атлас начинается с одного листа, а не с диагноза.",
    "Первый видимый вопрос не становится обязательным первым шагом.",
    "Один лист даёт место разным способам увидеть ситуацию.",
    "Ни один вход не становится рангом или рекомендацией.",
    "Можно выбрать вопрос, оставить все десять или просто продолжить.",
  ],
  "open-horizon": [
    "Последний сгиб успокаивается.",
    "Ветер возвращается, не выбирая ни за кого.",
    "Книга раскрывается дальше края страницы.",
    "Полёт, Возвращение, отдых и возможность делят один горизонт.",
    "Мы не забыли, как летать. Небо всё ещё здесь.",
  ],
} as const satisfies Readonly<
  Partial<Record<MechanismId, readonly string[]>>
>;

describe("Russian expansion-story copy", () => {
  it("covers every expansion beat with the approved narration and Russian labels", () => {
    for (const [mechanism, narration] of Object.entries(approvedNarration)) {
      const typedMechanism = mechanism as keyof typeof approvedNarration;
      const baseStory = storyRegistry[typedMechanism];
      const localizedStory = storyForMechanism(typedMechanism, "ru");
      const localePack = expansionStoryBeatCopyRu[typedMechanism];

      expect(Object.keys(localePack)).toEqual(
        baseStory.beats.map((beat) => beat.id),
      );
      expect(localizedStory).not.toBe(baseStory);
      expect(localizedStory.beats.map((beat) => beat.narration)).toEqual(
        narration,
      );
      expect(
        localizedStory.beats.every((beat) => /[А-Яа-яЁё]/.test(beat.label ?? "")),
      ).toBe(true);
      expect(storySupportsLocale(localizedStory, "ru")).toBe(true);

      localizedStory.beats.forEach((beat, index) => {
        expect(beat.id).toBe(baseStory.beats[index].id);
        expect(beat.offset).toBe(baseStory.beats[index].offset);
        expect(beat.layers).toBe(baseStory.beats[index].layers);
      });
    }
  });

  it("leaves existing scenes on their current English-only beat behavior", () => {
    const baseStory = storyRegistry.wind;

    expect(storyForMechanism("wind", "ru")).toBe(baseStory);
    expect(storySupportsLocale(baseStory, "ru")).toBe(false);
  });
});
