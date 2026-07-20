/**
 * Contextual Russian locale for the three reading pathways.
 *
 * Structural identifiers, routes, scene IDs, experience IDs, and link kinds
 * come from the English registry unchanged. Only reader-facing text is
 * localized. The locale remains an adaptation of the Akimov/Klimenko source,
 * not a claim that every project term appears in the book verbatim.
 */

import {
  pathways,
  windRoles,
  type PathwayDefinition,
  type PathwayId,
} from "./pathways";

const contextualRu: Readonly<Record<string, string>> = {
  "Mirror": "Зеркало",
  "Reflects a draft, summary, tension, or repeated pattern back to the maker.":
    "Возвращает автору его черновик, главную мысль, внутреннее противоречие или повторяющийся ход.",
  "A tidy reflection can erase ambiguity or make one interpretation feel definitive.":
    "Слишком гладкое отражение стирает важную неясность и выдаёт одну трактовку за окончательную.",
  "Decide whether the reflection is recognisable, what it leaves out, and whether it changes the Call.":
    "Сам человек решает, узнаёт ли он себя в этом отражении, чего там не хватает и не подменило ли оно исходный Зов.",
  "Reflect my current position in no more than five points. Mark interpretations you add. Do not name my true purpose. End with one question I may decline.":
    "Отразите мою нынешнюю позицию максимум в пяти пунктах. Отдельно пометьте свои трактовки. Не объявляйте, в чём моя истинная цель. В конце задайте один вопрос — я могу на него не отвечать.",
  "Generator": "Генератор",
  "Produces materially different options, examples, questions, structures, or forms.":
    "Предлагает действительно разные варианты, примеры, вопросы, структуры или формы.",
  "Abundance can replace choosing, while familiar patterns quietly define the option set.":
    "Изобилие вариантов легко подменяет выбор, а привычные шаблоны незаметно очерчивают границы возможного.",
  "Choose which options deserve attention, what criteria matter, and whether to choose any.":
    "Человек решает, какие варианты вообще стоит рассматривать, по каким критериям и нужно ли выбирать сейчас.",
  "Offer five materially different responses to this Call. State each assumption. Include doing nothing now. Do not rank them until I provide criteria.":
    "Предложите пять существенно разных ответов на этот Зов. Для каждого назовите исходные предположения. Включите вариант ничего пока не делать. Не ранжируйте ответы, пока я не задам критерии.",
  "Interlocutor": "Собеседник",
  "Asks questions, rehearses a conversation, or helps articulate an unfinished thought.":
    "Задаёт вопросы, помогает подготовиться к разговору или выразить ещё не сложившуюся мысль.",
  "Dialogue can become an agreeable loop or give fluency the aura of understanding.":
    "Диалог может замкнуться в приятном согласии, а складная речь — создать иллюзию понимания.",
  "Decide which question is real, when another human is needed, and when to end the exchange.":
    "Человек решает, какой вопрос здесь настоящий, когда нужен живой собеседник и когда разговор с системой пора закончить.",
  "Ask one clarifying question at a time. Separate what I observed, assumed, and care about. Do not turn my answer into a diagnosis or mission.":
    "Задавайте по одному уточняющему вопросу. Разделяйте мои наблюдения, предположения и то, что мне небезразлично. Не превращайте ответы в диагноз или жизненную миссию.",
  "Critic": "Критик",
  "Tests assumptions, identifies gaps, checks stated criteria, and offers counterarguments.":
    "Проверяет предположения, находит пробелы, сверяется с заданными критериями и приводит контраргументы.",
  "Confident criticism can become a moral verdict, imported taste, or endless revision.":
    "Уверенный тон критика легко принять за моральный приговор, чужой вкус — за правило, а правки сделать бесконечными.",
  "Choose legitimate criteria, decide what criticism to adopt, and decide when the form is ready enough.":
    "Автор выбирает уместные критерии, принимает или отвергает замечания и сам решает, когда работа достаточно готова.",
  "Test this form against my stated criteria. Separate factual gaps, ethical concerns, craft choices, and taste. Suggest repairs without scoring me or the work.":
    "Проверьте эту форму по моим критериям. Разделите фактические пробелы, этические вопросы, ремесленные решения и вкус. Предложите, что можно поправить, но не выставляйте оценку ни мне, ни работе.",
  "Craft aid": "Помощник в ремесле",
  "Helps edit, translate, restructure, format, prototype, calculate, or execute a chosen technique.":
    "Помогает редактировать, переводить, перестраивать, верстать, прототипировать, считать или выполнять выбранный технический приём.",
  "Friction can vanish before the maker learns which part of the craft matters to this attempt.":
    "Система может убрать трудность раньше, чем автор поймёт, чему именно здесь стоило научиться.",
  "Keep the intended effect, acceptable method, verification standard, and final adoption human.":
    "Замысел, допустимый способ работы, способ проверки и окончательное решение остаются у человека.",
  "Help with this bounded craft operation. Preserve the decisions I name. Flag changes to meaning, consent, attribution, or audience.":
    "Помогите только с этой ограниченной операцией. Сохраните решения, которые я перечислю. Отмечайте всё, что меняет смысл, согласие, авторство или адресата.",
  "Simulator": "Симулятор",
  "Generates plausible questions, edge cases, scenarios, or audience reactions before real contact.":
    "Предлагает возможные вопросы, пограничные случаи, сценарии или реакции аудитории до встречи с реальностью.",
  "A plausible simulation can be mistaken for evidence, consent, lived experience, or feedback.":
    "Правдоподобный сценарий легко спутать с фактом, согласием, живым опытом или настоящей обратной связью.",
  "Name what still requires reality and whose real voice must still be heard.":
    "Нужно назвать, что ещё предстоит проверить в реальности и чей живой голос всё ещё необходимо услышать.",
  "Generate plausible reactions from the stated context. Label them hypotheses, not evidence. Name what only a real person, source, or trial can answer.":
    "Предложите возможные реакции в заданном контексте и пометьте их как гипотезы, а не факты. Отдельно назовите вопросы, на которые ответит только реальный человек, источник или проверка.",

  "For parents and responsible caregivers": "Родителям и взрослым, которые отвечают за ребёнка",
  "Keep the Sky Open": "Оставить небо открытым",
  "A child is not a project. Hold the safety, care, and honest limits that belong to the adult; leave the emerging form genuinely open.":
    "Ребёнок — не проект. Взрослый отвечает за безопасность, заботу и честные границы, но не присваивает себе форму, которая только появляется.",
  "A parent is a Keeper of Conditions, not an engineer of the child's future; equal dignity coexists with unequal adult responsibility.":
    "Родитель — хранитель условий, а не инженер детского будущего. Достоинство у взрослого и ребёнка равное, ответственность — нет.",
  "Distinguish direct instruction, a boundary with choice, and a genuine invitation, then rewrite one real family moment without scoring parent or child.":
    "Научиться различать прямое требование, границу с выбором и настоящее приглашение — а затем по-новому увидеть одну обычную семейную ситуацию, не оценивая ни ребёнка, ни себя.",
  "Begin with Instruction or Invitation?, explore What Grounds Flight?, or simply carry the two-line distinction into tomorrow.":
    "Можно начать с «Требование или приглашение?», посмотреть, на чём держится Полёт, или просто взять это различие с собой в завтрашний день.",
  "The starting relation": "С чего начинаются отношения",
  "The child is not the project": "Ребёнок — не проект",
  "A child is a person in the room now, not the first draft of a future adult.":
    "Ребёнок — человек, который уже находится рядом, а не черновик будущего взрослого.",
  "Creativity is not a trait for a parent to extract. Flight is a moment of noticing, choosing, forming, meeting reality, and taking part in what follows.":
    "Творчество — не качество, которое родитель может получить по инструкции. Полёт случается, когда человек замечает, выбирает, придаёт замыслу форму, встречается с реальностью и участвует в последствиях.",
  "The parent becomes a Keeper of Conditions: holding safety, time, materials, limits, rest, craft, conversation, and gradual responsibility while leaving the child's question and form alive.":
    "Роль родителя — хранить условия: безопасность, время, материалы, границы, отдых, возможность учиться ремеслу и разговаривать. Ответственность можно передавать постепенно, не забирая у ребёнка его вопрос и его форму.",
  "A productive asymmetry": "Неравенство, которое важно признать",
  "Equal dignity, unequal responsibility": "Равное достоинство, разная ответственность",
  "Parent and child have equal human worth; the adult still carries more power and duty.":
    "Человеческая ценность взрослого и ребёнка одинакова. Но власти, возможностей и обязанностей у взрослого больше.",
  "The adult holds safety, care, money, transport, permissions, and consequences the child cannot reasonably carry. Greater duty does not create ownership of the child's interests, pace, style, meaning, or future.":
    "Взрослый отвечает за безопасность, заботу, деньги, дорогу, разрешения и последствия, с которыми ребёнок пока не может справиться сам. Эта обязанность не даёт права владеть его интересами, темпом, стилем, смыслом или будущим.",
  "The adult holds the frame. The child can author a form inside it. When no choice exists, the adult names the requirement instead of disguising it as freedom.":
    "Взрослый удерживает рамку, ребёнок создаёт форму внутри неё. Если выбора нет, лучше прямо назвать требование, чем маскировать его под свободу.",
  "What a Keeper keeps": "Что именно хранит взрослый",
  "Conditions support many answers": "Условия не диктуют единственный ответ",
  "Good conditions do not guarantee a result; they make making, refusal, help, and rest more possible.":
    "Хорошие условия ничего не гарантируют. Они лишь дают больше места для попытки, отказа, просьбы о помощи и отдыха.",
  "A condition is not a recipe for a creative child. It is a concrete part of the Ground that an adult can hold honestly.":
    "Условия — не рецепт «творческого ребёнка». Это конкретная часть Земли, за которую взрослый действительно может отвечать.",
  "Before choosing a tone": "Прежде чем выбирать тон",
  "Name the mode honestly": "Честно назвать режим",
  "Gentle wording does not make an instruction into an invitation, and a question is not open if only yes can survive.":
    "Мягкие слова не превращают требование в приглашение. Вопрос нельзя назвать открытым, если приемлем только ответ «да».",
  "Choose the mode that matches the adult's real responsibility and the amount of choice actually available.":
    "Форма разговора должна соответствовать реальной ответственности взрослого и тому выбору, который действительно доступен.",
  "One small family Flight": "Один небольшой семейный Полёт",
  "A map, not a compliance system": "Карта, а не система послушания",
  "Call, Compass, Lift, Making, Flight, Return, and Ground can move backward, become smaller, or end.":
    "Зов, Компас, Подъём, Работа над формой, Полёт, Возвращение и Земля — не лестница. Можно вернуться назад, уменьшить замысел или закончить.",
  "A family may notice a possible question, name intention and limits, check present capacity, give the question a small form, let it meet reality, answer what happened, and close or rest.":
    "Семья может заметить вопрос, назвать намерение и границы, проверить силы, придать вопросу небольшую форму, дать ей встретиться с реальностью, ответить на последствия — а затем закончить или отдохнуть.",
  "No cycle today is a valid result. Less Lift never means less worth.":
    "Если сегодня никакого цикла не будет, это тоже допустимо. Меньше сил не означает меньше ценности.",
  "No altitude score": "Без оценки высоты",
  "Refusal and feedback preserve personhood": "Отказ и обратная связь оставляют ребёнка человеком",
  "A child may refuse an optional activity, and feedback can meet a form without appointing a kind of child.":
    "От необязательного занятия можно отказаться. Обратная связь может касаться сделанной формы, не назначая ребёнка «творческим», «ленивым» или каким-то ещё.",
  "For unavoidable obligations, refusal may not cancel what must happen, but it can still inform how. Ending a chosen project can remain separate from returning borrowed items or repairing effects.":
    "Неизбежную обязанность отказ отменяет не всегда, но может изменить способ её выполнить. Решение закончить проект не отменяет отдельной обязанности вернуть чужое или исправить последствия.",
  "Observe the form, ask about intention, name the encounter, ask what response is wanted, and leave revision with the maker when safety permits.":
    "Можно описать то, что видно, спросить о замысле и о том, какая реакция сейчас нужна. Если вопрос не в безопасности, право исправлять форму остаётся у автора.",
  "AI in the family": "ИИ в семье",
  "Wind, not wings or pilot": "Ветер, но не крылья и не пилот",
  "AI may support a bounded operation; it does not judge the child, choose a worthy future, or absorb responsibility.":
    "ИИ может помочь в ограниченной задаче. Он не оценивает ребёнка, не выбирает для него достойное будущее и не забирает ответственность взрослого.",
  "Name the human question first, give AI one role, keep purpose and adoption human, protect privacy as an adult duty, never ask it to profile the child, and name material assistance simply.":
    "Сначала формулируется человеческий вопрос. ИИ получает одну понятную роль; цель и решение остаются у людей. За приватность отвечает взрослый, а составлять профиль ребёнка системе нельзя.",
  "Where choice is real, a child may choose a non-AI route. Using Wind is not lesser authorship; refusing it is not moral purity.":
    "Если выбор действительно есть, ребёнок может обойтись без ИИ. Помощь Ветра не уменьшает авторство, а отказ от неё не делает человека нравственно чище.",
  "Repair, not parental shame": "Исправление вместо родительского стыда",
  "When care becomes Gravity": "Когда забота превращается в Инерцию",
  "Gravity appears when one route becomes unquestioned destiny; every family can notice and repair it.":
    "Инерция начинается там, где один путь перестают обсуждать и объявляют судьбой. Это случается в любой семье — и это можно заметить и поправить.",
  "The aim is not perfect parenting. It is to make responsibility visible and repair the next part that can be repaired.":
    "Задача не в безупречном родительстве. Достаточно увидеть, кому принадлежит ответственность, и исправить ближайшее из того, что ещё можно исправить.",

  "For adults beginning from the life already here": "Взрослым, которые начинают с той жизни, что уже есть",
  "Remembering Flight": "Вспомнить Полёт",
  "You do not have to abandon your life, discover one true calling, or condemn your past in order to author one responsible next form.":
    "Чтобы создать следующую ответственную форму, не нужно бросать свою жизнь, находить единственное призвание или осуждать прошлое.",
  "An adult can resume authorship from present life through small, revisable cycles without finding one hidden purpose.":
    "Взрослый может вернуть себе авторство прямо из нынешней жизни — через небольшие циклы, которые можно пересмотреть, не разыскивая скрытую главную цель.",
  "Distinguish Ground from Gravity and name one possible Call, honest refusal, request for help, or right-sized form.":
    "Различить Землю и Инерцию, а затем назвать один возможный Зов, честный отказ, просьбу о помощи или форму по силам.",
  "Begin with Problem Finder, choose any voluntary practice or invitation card, or remain on Ground with nothing to prove.":
    "Можно начать с поиска вопроса, выбрать любую практику — или остаться на Земле. Доказывать ничего не требуется.",
  "Before any practice": "До любой практики",
  "Flight is an event, not a kind of person": "Полёт — событие, а не тип человека",
  "Output, originality, income, visibility, refusal, help, and rest never decide human worth.":
    "Результат, оригинальность, доход, заметность, отказ, помощь и отдых ничего не говорят о человеческой ценности.",
  "A form may succeed, fail, or cause harm. It can be criticised, repaired, or ended. None of those outcomes creates a ladder of more-human and less-human people.":
    "Форма может сработать, провалиться или причинить вред. Её можно критиковать, исправлять или закрыть. Ни один исход не делит людей на более и менее ценных.",
  "A long season on Ground is not a lesser life, and assistance does not dilute authorship.":
    "Долгое время на Земле — не менее настоящая жизнь. Помощь не разбавляет авторство.",
  "A direction is enough": "Направления достаточно",
  "Purpose is a practice, not a hidden assignment": "Смысл — практика, а не спрятанное задание",
  "Purpose is a way of meeting what is unfinished, not one mission buried inside you.":
    "Смысл проявляется в том, как человек встречает незавершённое. Это не единственная миссия, спрятанная где-то внутри.",
  "Notice what asks for attention; decide whether it is yours; choose direction and boundary; give it a form; meet reality; receive what happened; return; and land.":
    "Заметьте, что требует внимания. Решите, ваше ли это. Выберите направление и границу, придайте вопросу форму, дайте ей встретиться с реальностью, примите случившееся, вернитесь к последствиям и приземлитесь.",
  "A purpose may last ten minutes or a decade, appear in work or care, remain private, or end honestly as facts and relationships change.":
    "Такой смысл может прожить десять минут или десять лет, проявиться в работе или заботе, остаться частным или честно закончиться, когда изменятся факты и отношения.",
  "The available material": "Материал, который уже есть",
  "Begin from the life you already have": "Начать с собственной жизни",
  "The present body, ties, skills, obligations, and energy are the starting material, not an obstacle to real life.":
    "Нынешнее тело, отношения, навыки, обязательства и запас сил — исходный материал, а не помеха «настоящей» жизни.",
  "This does not make every commitment sacred. It means seeing what is real clearly enough to choose within it, negotiate, ask for help, or responsibly change it.":
    "Это не делает священным каждое обязательство. Речь о том, чтобы достаточно ясно увидеть реальность: выбрать внутри неё, договориться, попросить помощи или ответственно что-то изменить.",
  "Maintenance, care, administration, recovery, and sleep are part of Ground. They need no poetic title to deserve respect.":
    "Быт, забота, организационные дела, восстановление и сон принадлежат Земле. Им не нужно красивое название, чтобы заслуживать уважения.",
  "Two different pulls": "Две разные силы",
  "Ground is not Gravity": "Земля — не Инерция",
  "Ground is the reality that supports and limits an attempt; Gravity is an unexamined route hardened into destiny.":
    "Земля — это реальность, которая поддерживает попытку и задаёт ей пределы. Инерция — путь, который давно не проверяли и успели принять за судьбу.",
  "Money, care, craft, work, AI, and rest can each be honest conditions. They become Gravity language when one response is made morally compulsory and alternatives can no longer be discussed.":
    "Деньги, забота, ремесло, работа, ИИ и отдых могут быть честными условиями. Они становятся языком Инерции, когда один ответ объявляют морально обязательным, а альтернативы перестают обсуждать.",
  "Some doors are materially locked. The honest movement may be to name the door, find company, seek qualified help, or stop calling it a personal failure.":
    "Некоторые двери действительно закрыты. Иногда честный шаг — назвать такую дверь, найти союзников или профессиональную помощь и перестать считать её личным поражением.",
  "Guidance without surrender": "Подсказка без капитуляции",
  "Maps, scaffolds, and authored direction": "Карты, временные опоры и собственное направление",
  "Outside knowledge can protect and teach; authorship does not require purity from influence.":
    "Чужое знание может учить и защищать. Авторству не нужна стерильность от влияния.",
  "A borrowed map shows a route. A temporary scaffold supports a named part and can be reviewed. An authored direction is one you can presently choose, explain, revise, and answer for.":
    "Заимствованная карта показывает маршрут. Временная опора помогает с конкретной частью и позже пересматривается. Собственное направление — то, которое человек сейчас может выбрать, объяснить, изменить и за которое готов отвечать.",
  "Ask who drew the route, what it enables, what it hides, who is affected, and which part to keep, adapt, refuse, or revisit.":
    "Полезно спросить, кто нарисовал этот маршрут, что он открывает и скрывает, кого затронет и какую его часть стоит оставить, изменить, отвергнуть или проверить позже.",
  "A revisable arc": "Дуга, которую можно пересмотреть",
  "Call → Compass → Lift → Making → Flight → Return → Ground":
    "Зов → Компас → Подъём → Работа над формой → Полёт → Возвращение → Земля",
  "The cycle is a set of questions with doors backward and outward, not a productivity pipeline.":
    "Этот цикл — набор вопросов с выходами назад и наружу, а не конвейер продуктивности.",
  "Notice without obeying. Choose without demanding certainty. Size the attempt to real capacity. Make the smallest honest form. Let it meet something beyond intention. Meet effects. Close, care, and restore.":
    "Замечать — не значит подчиняться. Выбирать можно без полной уверенности. Масштаб попытки стоит соотнести с реальными силами, создать самую маленькую честную форму и дать ей встретиться с чем-то за пределами намерения. Затем — увидеть последствия, закрыть, позаботиться, восстановить.",
  "A ten-minute correction, a refusal, a private form, or an intentionally incomplete cycle can be real.":
    "Десятиминутная правка, отказ, личная форма или намеренно незавершённый цикл тоже могут быть настоящими.",
  "Intention meets resistance": "Намерение встречает сопротивление",
  "Craft, error, repetition, and boredom belong": "Ремесло, ошибка, повторение и скука тоже здесь",
  "Learning how material behaves does not make imagination less free.":
    "Знание материала не делает воображение менее свободным.",
  "Repetition is not the enemy of originality. Boredom is not proof that a route is wrong. Difficulty is not proof that it is right. Error is information about an encounter, not a maker's verdict.":
    "Повторение не враг оригинальности. Скука не доказывает, что путь неверен; трудность не доказывает обратного. Ошибка сообщает что-то о встрече замысла с реальностью, но ничего не решает об авторе.",
  "Ask whether there is a small answerable form, whether contact may change it, who it may affect, and whether you can revise, repair, stop, or keep it private.":
    "Стоит спросить, можно ли сделать небольшую форму, на которую реальность способна ответить; кого она затронет; можно ли её изменить, исправить, остановить или оставить частной.",

  "A human-first practice of amplified making": "Практика усиленного творчества, где человек остаётся первым",
  "Set the Wind": "Настроить Ветер",
  "AI can widen options, accelerate craft, resist a draft, and simulate contact. These are powers, not a purpose.":
    "ИИ умеет расширять набор вариантов, ускорять ремесленную работу, спорить с черновиком и моделировать встречу. Всё это — возможности, но не цель.",
  "AI changes what is easy, visible, and fast, while purpose, consent, adoption, judgment, and responsibility remain human assignments.":
    "ИИ меняет то, что даётся легко, быстро и становится заметным. Цель, согласие, окончательный выбор, суждение и ответственность остаются за людьми.",
  "Name the human question, one bounded Wind role, decisions not delegated, material kept private, and responsibility for anything adopted.":
    "Назвать человеческий вопрос, одну ограниченную роль Ветра, решения, которые нельзя делегировать, данные, которые останутся приватными, и ответственность за всё принятое.",
  "Read Set the Wind as a planning note, or follow the complete no-AI route, then continue with the Parent or Adult chapter.":
    "Раздел «Настроить Ветер» можно прочитать как памятку или выбрать полноценный путь без ИИ, а затем перейти к главе для родителей или взрослых.",
  "A human-first relationship with power": "Как обращаться с новой силой",
  "Wind changes movement; it does not choose a destination": "Ветер меняет движение, но не выбирает пункт назначения",
  "AI can change speed, options, resistance, and reach without gaining authority over purpose or consequence.":
    "ИИ меняет скорость, количество вариантов, сопротивление и дальность. От этого он не получает власти над целью или последствиями.",
  "Wind can lift, resist, redirect, and make some routes easier to see. It is powerful and not neutral, but fluency, novelty, confidence, and speed do not turn output into instruction.":
    "Ветер может поднять, задержать, изменить курс и сделать некоторые маршруты заметнее. Он силён и не нейтрален, но гладкость, новизна, уверенный тон и скорость не превращают ответ системы в указание.",
  "Human-first does not mean human alone. It means purpose, consent, judgment, adoption, and responsibility remain human assignments.":
    "«Сначала человек» не означает «человек в одиночку». Это значит, что цель, согласие, суждение, окончательный выбор и ответственность остаются человеческой работой.",
  "Do not delegate the governing decisions": "Не отдавать решения, которые задают курс",
  "The human assignments": "Что остаётся за человеком",
  "AI may contribute material, critique, and craft; it does not receive authority over dignity, purpose, consent, or Return.":
    "ИИ может дать материал, критику или техническую помощь. Он не получает права решать вопросы достоинства, цели, согласия и Возвращения.",
  "Generation is not adoption. A person adopts a form by deciding to use, share, rely on, or act through it with enough understanding to accept, change, reject, or verify it.":
    "Сгенерировать — ещё не значит принять. Форма становится человеческим решением, когда человек достаточно её понимает, чтобы использовать, изменить, отвергнуть или проверить и отвечать за действие через неё.",
  "One role at a time": "По одной роли за раз",
  "Six roles for Wind": "Шесть ролей Ветра",
  "Naming one bounded role makes the intended relationship visible enough to inspect and reset.":
    "Одна названная и ограниченная роль делает отношения с инструментом достаточно ясными, чтобы их проверить и при необходимости начать заново.",
  "Mirror, Generator, Interlocutor, Critic, Craft aid, and Simulator are contributions, not hidden pilots. If the system begins choosing purpose, criteria, audience, form, and success at once, stop and return those decisions to Compass.":
    "Зеркало, Генератор, Собеседник, Критик, Помощник в ремесле и Симулятор — способы помочь, а не скрытые пилоты. Если система одновременно выбирает цель, критерии, аудиторию, форму и меру успеха, стоит остановиться и вернуть эти решения Компасу.",
  "Wind can enter; it is never an eighth stage": "Ветер может появиться на любом этапе, но не становится восьмым",
  "AI through the Flight cycle": "ИИ внутри цикла Полёта",
  "At every stage, AI may assist a bounded operation while a human question closes the gap.":
    "На любом этапе ИИ может выполнить ограниченную операцию. Но разрыв замыкается человеческим вопросом и человеческим решением.",
  "At Call, restate the observation and keep refusal open. At Compass, name values, affected people, consent, and stop conditions. At Lift, choose realistic scale and support. During Making, inspect each adoption. Flight requires real contact. Return requires real effects. Ground includes stopping the system.":
    "На этапе Зова нужно вернуть исходное наблюдение и оставить возможность отказаться. Компас называет ценности, затронутых людей, согласие и условия остановки. Подъём соотносит замысел с реальными силами и поддержкой. В работе над формой каждое решение проверяется. Полёту нужен настоящий контакт, Возвращению — настоящие последствия. Земля включает право выключить систему.",
  "A simulated audience is preparation, not Return. An AI-assisted form becomes Flight only when people adopt it and it meets something beyond the generation loop.":
    "Смоделированная аудитория — подготовка, а не Возвращение. Форма с участием ИИ становится Полётом, только когда люди осознанно принимают её и она встречается с чем-то вне замкнутого цикла генерации.",
  "Where the governing decisions live": "Где остаются решения, задающие курс",
  "Human-first does not mean opening the tool last": "Человек может начать с ИИ и всё равно остаться первым",
  "A process may begin with an AI draft and use extensive assistance while remaining human-first.":
    "Работа может начаться с черновика ИИ и широко использовать его помощь, не отдавая ему авторство курса.",
  "Human-first keeps the observation, role, criteria, affected relationships, adoption, real contact, Return, and stopping decision visible. AI-first drift hides those decisions inside defaults, fluency, popularity, or machine confidence.":
    "В человеческом процессе видны исходное наблюдение, роль инструмента, критерии, затронутые отношения, принятые решения, реальный контакт, Возвращение и право остановиться. Дрейф начинается, когда всё это прячется в настройках по умолчанию, гладком тексте, популярности или уверенном тоне машины.",
  "The distinction is not a percentage of words made by hand. It is whether a person can explain what was chosen, what changed, what still needs reality, and who remains answerable.":
    "Разница не в проценте слов, написанных вручную. Важно, может ли человек объяснить, что он выбрал, что изменил, что ещё требует встречи с реальностью и кто отвечает за результат.",
  "A voluntary practice": "Добровольная практика",
  "Give AI a visible role before fluency becomes direction.":
    "Дать ИИ видимую роль до того, как гладкость ответа начнёт задавать направление.",
  "Name the human Call, write a Compass note, assign one role, limit the material, make one inspectable request, run the adoption pass, meet reality at an appropriate scale, then Return and Ground.":
    "Назовите человеческий Зов, коротко запишите Компас, назначьте одну роль, ограничьте материал и сделайте один запрос, который можно проверить. Затем примите или отвергните предложенное, встретьтесь с реальностью в подходящем масштабе, совершите Возвращение и приземлитесь.",
  "The protocol may be skipped, kept as an offline card, or ended at any step. It does not make unsafe use safe or turn output into evidence.":
    "Протокол можно пропустить, сохранить как бумажную памятку или закончить на любом шаге. Он не делает опасное использование безопасным и не превращает ответ системы в доказательство.",
  "The hardest case is an attractive route": "Самый трудный случай — привлекательный маршрут",
  "Recover direction from a polished proposal": "Вернуть направление после гладкого предложения",
  "An appealing AI proposal is a candidate map, not a discovered purpose.":
    "Привлекательное предложение ИИ — одна из возможных карт, а не обнаруженная жизненная цель.",
  "Label the proposal as Wind, recover what existed before it, open quieter and no-action alternatives, use Compass, choose explicitly, and own the next real contact.":
    "Назовите предложение работой Ветра, вспомните, что было до него, верните тихие варианты и возможность ничего не делать, сверьтесь с Компасом и сами выберите следующий реальный контакт.",
  "Keep the child out of the instrument panel": "Не превращать ребёнка в данные для панели управления",
  "Families use AI without profiling a child": "Семья может пользоваться ИИ, не составляя профиль ребёнка",
  "The adult keeps safety, privacy, time, limits, and care; the child keeps authorship wherever a real choice exists.":
    "Взрослый удерживает безопасность, приватность, время, границы и заботу. Там, где выбор реален, авторство остаётся у ребёнка.",
  "Do not ask AI whether a child is creative, gifted, lazy, resistant, mature, diagnosable, risky, or destined for a path. Do not enter private child material merely to obtain a more personal answer.":
    "Не нужно спрашивать у ИИ, творческий ли ребёнок, одарённый, ленивый, упрямый, зрелый, «диагностируемый», опасный или предназначенный для какого-то пути. Личные материалы ребёнка нельзя отдавать системе только ради более персонального ответа.",
  "Legitimate roles include open-ended material ideas, simpler instructions, several demonstrations, reviewed translation of child-authored text, or questions about conditions the adult controls.":
    "Уместные роли проще: предложить разные материалы без готового результата, упростить инструкцию, показать несколько способов, помочь с проверяемым переводом детского текста или задать взрослому вопросы об условиях, которыми он управляет.",
  "Failures belong to an encounter, not a person": "Сбой относится к встрече, а не к человеку",
  "Twelve Wind drifts and repairs": "Двенадцать видов дрейфа и способы вернуть управление",
  "A drift names where governing judgment moved out of view; its repair restores a concrete human decision.":
    "Дрейф показывает место, где важное решение исчезло из поля зрения. Исправление возвращает это решение человеку.",
  "The repair is not trust yourself instead. Compass may require evidence, collaborators, affected people, expertise, traditions, or rules.":
    "Исправление не сводится к совету «просто доверься себе». Компасу могут понадобиться факты, соавторы, затронутые люди, профессиональное знание, традиция или правила.",
  "Generation is not adoption": "Генерация — ещё не принятие",
  "Adopt and attribute in proportion to consequence": "Принимать и указывать источник соразмерно последствиям",
  "Attribution says where material came from; adoption says who chose to use it and remains answerable.":
    "Указание источника отвечает на вопрос, откуда взялся материал. Принятие — кто решил его использовать и продолжает отвечать за последствия.",
  "No race for human superiority": "Не нужно соревноваться с машиной за превосходство",
  "Choose assistance by meaning, learning, access, and responsibility": "Выбирать помощь по смыслу, обучению, доступности и ответственности",
  "Craft matters because it helps intention meet material honestly, not because it protects a competitive human advantage.":
    "Ремесло важно потому, что помогает замыслу честно встретиться с материалом, а не потому, что охраняет конкурентное преимущество человека.",
  "AI as Wind is a normative open myth, not a diagnosis, forecast, professional rule, or guarantee about a particular system.":
    "ИИ как Ветер — открытая метафора и этическое предложение. Это не диагноз, прогноз, профессиональное правило и не гарантия возможностей конкретной системы.",
};

const detailRu: Readonly<Record<string, string>> = {
  "What Grounds Flight?": "На чём держится Полёт?",
  "Separate a recurring conflict into visible facts, adult responsibility, possible Gravity, a fixed frame, and an open part.":
    "Разберите повторяющийся конфликт: что произошло, за что отвечает взрослый, где включилась Инерция, что в рамке неизменно, а что по-настоящему открыто.",
  "Write one next-time sentence naming what the adult must hold and what the child can truly author.":
    "Сформулируйте одну фразу на следующий раз: что обязан удержать взрослый и что ребёнок действительно может решить сам.",
  "One specific, revisable Ground agreement exists—or the distinction remains honestly unresolved.":
    "Появилась одна конкретная договорённость об Земле, которую можно пересмотреть, — либо вы честно признали, что пока не разобрались.",
  "Use after the moment, never instead of immediate safety action; the result is not a family diagnosis or score.":
    "Возвращайтесь к этому после события, а не вместо срочного действия ради безопасности. Это не диагноз семье и не оценка.",
  "What I must hold…": "Что обязан удержать я…",
  "What the child can truly author…": "Что ребёнок действительно может решить сам…",
  "Instruction or Invitation?": "Требование или приглашение?",
  "Test one familiar sentence against what is required, why it is required, what is open, and whether no can survive.":
    "Проверьте привычную фразу: что здесь обязательно, почему, что остаётся открытым и можно ли на самом деле ответить «нет».",
  "Rewrite the sentence in the honest mode and name the behaviour that will make the openness real.":
    "Перепишите фразу честно и назовите действие взрослого, благодаря которому выбор останется реальным.",
  "The words and the actual distribution of choice agree.":
    "Слова совпадают с тем, как в действительности распределён выбор.",
  "Do not soften an unavoidable instruction into manipulation or weaken a necessary safety boundary.":
    "Не маскируйте неизбежное требование мягкими словами и не ослабляйте необходимую границу безопасности.",
  "What is required?": "Что обязательно?",
  "Why?": "Почему?",
  "What is genuinely open?": "Где выбор настоящий?",
  "Can no survive?": "Можно ли здесь ответить «нет»?",
  "Creative Climate Map": "Карта творческого климата",
  "Look at safety, time, rest, materials, freedom of form, craft, conversation, and possible Return for one attempt.":
    "Для одной конкретной попытки посмотрите на безопасность, время, отдых, материалы, свободу формы, ремесло, разговор и возможное Возвращение.",
  "Use ordinary condition words, then choose at most one support worth changing—or none.":
    "Опишите условия обычными словами и выберите не больше одной вещи, которую стоит изменить. Возможно, менять не нужно ничего.",
  "One condition is clearer without producing a total, profile, or verdict.":
    "Одно условие стало яснее — без итогового балла, профиля и приговора.",
  "Map one situation, never the child, parent, or family. The child may disagree and may not want the attempt.":
    "Карта относится к одной ситуации, не к ребёнку, родителю или семье целиком. Ребёнок может не согласиться и вообще не хотеть этой попытки.",
  "One Small Flight": "Один небольшой Полёт",
  "Help a real Call become one reversible form: a rough model, question, rearrangement, test, or conversation.":
    "Помогите настоящему Зову получить небольшую обратимую форму: черновую модель, вопрос, перестановку, проверку или разговор.",
  "Agree on one safety boundary, one stop point, and one possible Return before beginning.":
    "До начала договоритесь об одной границе безопасности, одной точке остановки и одном возможном Возвращении.",
  "The small form meets what it needs to meet, or the family chooses not to proceed.":
    "Небольшая форма встретилась с тем, ради чего была создана, — либо семья решила не продолжать.",
  "The small form is not bait for a larger programme and does not create a debt to continue.":
    "Маленькая форма — не приманка для большой программы и не долг продолжать.",
  "Ground Landing": "Приземление",
  "Close, pause, care, repair, ask for help, or rest at the end of a family attempt.":
    "В конце семейной попытки можно закрыть её, поставить на паузу, позаботиться о последствиях, что-то исправить, попросить помощи или отдохнуть.",
  "Name only what should be put away, returned, cleaned, kept safely, repaired, helped, or left undecided.":
    "Назовите только то, что нужно убрать, вернуть, очистить, сохранить, исправить, кому помочь и что пока оставить нерешённым.",
  "The present cycle no longer demands hidden attention.":
    "Этот цикл больше не удерживает фоновое внимание.",
  "Close with no next project required; rest is not a productivity technique.":
    "После закрытия не обязан появляться следующий проект. Отдых — не приём для повышения продуктивности.",

  "Choosing an activity": "Выбор занятия",
  "A parent notices a recurring interest and can offer access, time, or a trial.":
    "Родитель замечает устойчивый интерес и может дать доступ, время или возможность попробовать.",
  "Assign a future identity, enrol first, and call the decision gratitude later.":
    "Заранее назначить ребёнку будущую роль, записать без обсуждения, а потом потребовать благодарности.",
  "Name what was observed, offer real options including open time, and explain cost, schedule, and commitment before deciding.":
    "Сказать, что именно было замечено, предложить реальные варианты, включая свободное время, и до решения обсудить цену, расписание и обязательства.",
  "The adult holds money and logistics; a trial is not a contract for a future self.":
    "Деньги и организацию удерживает взрослый. Проба — не контракт с будущей версией ребёнка.",
  "Starting a home project": "Домашний проект",
  "Materials and forty minutes are available before a shared table is needed.":
    "Есть материалы и сорок минут, после которых общий стол снова понадобится всем.",
  "Say make anything while requiring the example from a video.":
    "Сказать «делай что хочешь», но на деле ждать точной копии примера из видео.",
  "Offer several genuinely different forms, the child's own idea, or nothing today; name cleanup and offer one technique or company.":
    "Предложить несколько действительно разных форм, собственную идею ребёнка или возможность сегодня ничего не делать. Сразу назвать условия уборки и предложить один приём или своё присутствие.",
  "The material and boundary are real; the example remains a map, not the hidden answer.":
    "Материал и граница реальны; пример остаётся картой, а не спрятанным правильным ответом.",
  "Refusing to continue": "Решение не продолжать",
  "A child wants to stop a chosen project that still touches borrowed pieces or a collaborator.":
    "Ребёнок хочет закончить выбранный проект, хотя в нём остались чужие детали или обязательство перед соавтором.",
  "Treat stopping as evidence of weak character.":
    "Считать остановку доказательством слабого характера.",
  "Ask whether this is pause, different version, or ending; help meet the limited remaining responsibility.":
    "Уточнить, это пауза, другая версия или конец, и помочь выполнить только оставшуюся конкретную обязанность.",
  "Ending a form and meeting a consequence are different decisions.":
    "Закончить форму и ответить за последствия — два разных решения.",
  "A tool becomes unsafe": "Инструмент стал опасным",
  "A fastening has come loose and the tool can hurt someone.":
    "Крепление разболталось, и инструмент может кого-то ранить.",
  "Use a false invitation while expecting immediate compliance.":
    "Сделать вид, будто это приглашение, хотя требуется немедленно остановиться.",
  "Stop the action directly, make the tool safe, then reopen continue, demonstration, another tool, or ending.":
    "Прямо остановить действие и привести инструмент в безопасное состояние. После этого снова открыть выбор: продолжить, посмотреть показ, взять другой инструмент или закончить.",
  "The adult owns the safety duty; choice returns when it becomes real.":
    "За безопасность отвечает взрослый. Выбор возвращается, когда снова становится настоящим.",
  "Homework or another unavoidable task": "Домашняя работа или другая обязательная задача",
  "A task must be completed or submitted.": "Задачу нужно выполнить или сдать.",
  "Turn compliance into a judgment about being responsible.":
    "Превратить выполнение требования в приговор о том, насколько ребёнок «ответственный».",
  "Name the obligation and offer honest choices of order, environment, break, company, or clarification.":
    "Назвать обязанность и предложить честный выбор порядка, места, перерыва, компании или способа уточнить непонятное.",
  "An obligation can contain authorship without pretending to be a Call.":
    "Даже внутри обязанности остаётся место для авторства, хотя сама она не обязана быть Зовом.",
  "Paint, noise, and a shared room": "Краска, шум и общая комната",
  "An expressive activity affects equipment, surfaces, noise, or other people.":
    "Творческое занятие затрагивает инструменты, поверхности, уровень шума или других людей.",
  "Romanticise mess or ban the whole medium because uncertainty feels unsafe.":
    "Романтизировать беспорядок или запретить весь материал только потому, что неопределённость кажется опасной.",
  "Name the mat, water, noise, and cleanup boundaries; leave picture and method open; offer dry material or no project.":
    "Договориться о подложке, воде, шуме и уборке; оставить открытыми изображение и способ работы; предложить сухие материалы или возможность не начинать.",
  "Ground gives imagination somewhere to land.": "Земля даёт воображению место для приземления.",
  "Responding to a drawing": "Как отозваться на рисунок",
  "A child offers or leaves visible a particular form.":
    "Ребёнок показывает сделанное или просто оставляет его на виду.",
  "Use praise to appoint the child as a natural artist.":
    "Похвалой назначить ребёнка «прирождённым художником».",
  "Describe a visible choice, ask about intention, and ask whether the child wants noticing, questions, suggestions, or a witness.":
    "Описать заметное решение, спросить о замысле и уточнить, что сейчас нужно: внимание, вопросы, предложения или просто свидетель.",
  "Warmth can meet this form without assigning a role the child must keep performing.":
    "Тепло можно выразить этой конкретной форме, не выдавая ребёнку роль, которую потом придётся подтверждать.",
  "A fort occupies shared space": "Крепость заняла общее пространство",
  "A child-authored construction blocks a walkway or uses another person's belongings.":
    "Детская конструкция перекрывает проход или использует чужие вещи.",
  "Let the creative project erase consent and shared access.":
    "Позволить творческому проекту отменить согласие и общий доступ.",
  "Keep design open while naming the walkway and permission boundaries; adapt, relocate, or close if no version fits.":
    "Оставить конструкцию открытой для изменений, но ясно назвать границы прохода и разрешения. Переделать, перенести или закрыть проект, если подходящей версии нет.",
  "Authorship does not cancel consent.": "Авторство не отменяет согласие.",
  "Using AI for a story": "ИИ помогает с историей",
  "AI could suggest titles, ask plot questions, or help check spelling.":
    "ИИ может предложить названия, задать вопросы о сюжете или помочь проверить орфографию.",
  "Ask AI to make it better—or claim any AI help makes the story unreal.":
    "Попросить ИИ «сделать лучше» — или, наоборот, объявить любую помощь ИИ доказательством, что история ненастоящая.",
  "Name the child's purpose, offer one bounded role or no AI, keep private information out, and make adoption visible.":
    "Назвать замысел ребёнка, предложить системе одну ограниченную роль или путь без ИИ, не передавать личные данные и ясно отмечать, что было принято.",
  "The child keeps direction; the adult keeps the privacy duty.":
    "Направление остаётся у ребёнка, ответственность за приватность — у взрослого.",
  "The parent has no Lift": "У родителя сегодня нет сил",
  "The adult lacks enough attention or energy for the planned activity.":
    "У взрослого не хватает внимания или энергии на запланированное занятие.",
  "Push through to perform availability and become unsafe or resentful.":
    "Заставить себя участвовать, изображая доступность, а в итоге стать раздражённым или невнимательным к безопасности.",
  "Name the limit and offer a smaller paper version, preparation, help, another time, or stopping.":
    "Назвать предел и предложить уменьшенную бумажную версию, только подготовку, помощь, другое время или остановку.",
  "The parent is part of the conditions; low Lift changes the attempt, not anyone's worth.":
    "Родитель тоже часть условий. Недостаток сил меняет попытку, но не ценность кого-либо.",
  "Sharing the result": "Поделиться результатом",
  "A parent wants to show, post, or narrate a child's form.":
    "Родитель хочет показать, опубликовать или пересказать сделанное ребёнком.",
  "Treat public praise as proof that the activity mattered.":
    "Считать публичную похвалу доказательством, что занятие имело смысл.",
  "Offer privacy, one person, a specific question, or wider sharing; do not post without agreement.":
    "Предложить варианты: оставить личным, показать одному человеку, задать конкретный вопрос или поделиться шире. Не публиковать без согласия.",
  "Return can be real without compulsory publicity; actual effects still receive care.":
    "Возвращение возможно и без обязательной публичности. Реальные последствия всё равно требуют внимания.",

  "Problem Finder": "Найти вопрос",
  "Turn one noticed mismatch into a possible question—or an honest refusal.":
    "Превратите одно замеченное несоответствие в возможный вопрос — или честно откажитесь отвечать на него.",
  "Finish: I notice…, I care because…, A possible question is…. Then answer yes, no, not now, or differently.":
    "Закончите три фразы: «Я замечаю…», «Мне это важно, потому что…», «Возможный вопрос…». Затем ответьте: да, нет, не сейчас или иначе.",
  "The mismatch becomes one possible question or a complete non-answer.":
    "Несоответствие стало одним возможным вопросом — или получило полноценный ответ «нет».",
  "Pain, fear, and irritation are not automatically Calls. Safety, rest, or help may come first.":
    "Боль, страх и раздражение не обязаны становиться Зовом. Сначала могут понадобиться безопасность, отдых или помощь.",
  "Borrowed Map, Living Compass": "Чужая карта, живой Компас",
  "Examine one inherited rule without rejecting expertise, care, or commitment by reflex.":
    "Рассмотрите одно унаследованное правило, не отбрасывая автоматически знание, заботу и обязательства.",
  "Name who gave the map, what it once carried, what it costs now, then choose keep, adapt, borrow temporarily, or refuse for one situation.":
    "Назовите, от кого пришла карта, что она когда-то давала и во что обходится сейчас. Для одной ситуации решите: оставить, изменить, временно одолжить или отказаться.",
  "The next use of the map is conscious and revisable.":
    "Следующее использование карты стало осознанным и допускает пересмотр.",
  "Outside origin alone does not make a map Gravity.":
    "Чужое происхождение само по себе не превращает карту в Инерцию.",
  "Template Escape": "Выход из шаблона",
  "Change one variable in a recurring task and observe what the variation reveals.":
    "Измените одну переменную в привычной задаче и посмотрите, что откроет эта вариация.",
  "Change order, material, audience, scale, question, location, or definition of done once.":
    "Один раз измените порядок, материал, аудиторию, масштаб, вопрос, место или определение готовности.",
  "One reversible variation has met reality.": "Одна обратимая вариация встретилась с реальностью.",
  "Difference is not automatically improvement, and routine is not automatically Gravity.":
    "Отличие не обязательно улучшает, а рутина не обязательно является Инерцией.",
  "One-Day Form": "Форма на один день",
  "Give one question a small form that reality can answer.":
    "Придайте одному вопросу небольшую форму, на которую реальность сможет ответить.",
  "Choose a note, sketch, repair, request, conversation, arrangement, boundary, small test, or decision; define the stop point first.":
    "Выберите заметку, набросок, исправление, просьбу, разговор, перестановку, границу, небольшую проверку или решение. Сначала определите точку остановки.",
  "The form is encounterable, not perfect.": "Форма готова к встрече, а не доведена до совершенства.",
  "This is not a compulsory first instalment of a large project.":
    "Это не обязательный первый взнос в большой проект.",
  "The Boring Hinge": "Скучный шарнир",
  "Practise the small craft operation on which a larger action turns.":
    "Потренируйте небольшую ремесленную операцию, на которой держится более крупное действие.",
  "Practise one hinge slowly, then perform or view the whole action once and keep only what helps it.":
    "Медленно отработайте один шарнир, затем один раз выполните или посмотрите действие целиком и оставьте только то, что ему помогает.",
  "Technique has returned to the living form.": "Техника снова служит живой форме.",
  "Mastery is not a moral rank, and exhaustion is not disciplined practice.":
    "Мастерство — не моральный ранг, а истощение — не признак дисциплины.",
  "Flight Log": "Запись о Полёте",
  "Remember one cycle without turning it into a personality label, surveillance record, or productivity report.":
    "Вспомните один цикл, не превращая его в ярлык личности, слежение за собой или отчёт о продуктивности.",
  "Record any useful parts of Call, Compass, Lift, Making, Flight, feedback, Return, and Ground.":
    "Запишите любые полезные части Зова, Компаса, Подъёма, Работы над формой, Полёта, обратной связи, Возвращения и Земли.",
  "The cycle is legible enough to revisit or release, including an intentionally incomplete page.":
    "Цикл описан достаточно ясно, чтобы к нему вернуться или отпустить его. Намеренно незаполненная страница тоже допустима.",
  "No scores, streaks, totals, personality profiles, comparisons, or obligation to document every phase.":
    "Никаких баллов, серий, итогов, профилей личности, сравнений и обязанности описывать каждый этап.",
  "The Return": "Возвращение",
  "Choose the relationship, repair, learning, privacy, value, or ending that fits what happened.":
    "Выберите отношения, исправление, урок, приватность, ценность или завершение, которые подходят случившемуся.",
  "Meet one relevant person, effect, question, influence, repair, lesson, or honest private ending.":
    "Встретьтесь с одним важным человеком, последствием, вопросом, влиянием, исправлением, уроком или честным личным завершением.",
  "The relevant relationship or consequence has been met at a fitting scale.":
    "Важное отношение или последствие получило ответ соразмерного масштаба.",
  "Return does not require publicity, market value, gratitude, or self-disclosure.":
    "Возвращение не требует публичности, рыночной ценности, благодарности или саморазоблачения.",
  "Close or pause the current cycle without creating a future productivity debt.":
    "Закройте или приостановите текущий цикл, не создавая долг будущей продуктивности.",
  "Put away, keep a promise, eat, sleep, move, ask for support, record what remains open, or state that the cycle is finished or paused.":
    "Уберите материалы, выполните обещание, поешьте, поспите, подвигайтесь, попросите поддержки, запишите, что осталось открытым, или прямо скажите, что цикл завершён либо поставлен на паузу.",
  "The cycle no longer demands hidden attention.": "Цикл больше не удерживает фоновое внимание.",
  "Rest does not need to justify itself through later output.":
    "Отдыху не нужно оправдывать себя будущим результатом.",
  "Ask for Lift": "Попросить поддержки",
  "Name one concrete condition that could make a right-sized attempt possible.":
    "Назовите одно конкретное условие, которое сделает попытку по силам.",
  "Ask for time, transport, a witness, translation, childcare, instruction, access, company, assistance, or permission to reduce scope—or decide the request is unsafe or unavailable.":
    "Попросите время, дорогу, свидетеля, перевод, помощь с ребёнком, инструкцию, доступ, компанию, поддержку или возможность уменьшить масштаб — либо признайте, что такая просьба сейчас небезопасна или невозможна.",
  "The need and available next step are clearer, even if the answer is no.":
    "Потребность и доступный следующий шаг стали яснее, даже если ответ — «нет».",
  "Help does not cancel authorship, and nobody is obliged to provide what they cannot give.":
    "Помощь не отменяет авторства, а другой человек не обязан давать то, чего у него нет.",
  "Relationship and Obligation Check": "Проверка отношений и обязательств",
  "Make freedom and responsibility visible before a consequential change.":
    "До важного изменения сделайте видимыми свободу и ответственность.",
  "List affected people, real promises and dependencies, needed consent, negotiable parts, and what remains yours; plan one conversation or reduce the stakes.":
    "Перечислите затронутых людей, реальные обещания и зависимости, необходимое согласие, предметы для переговоров и то, что остаётся вашим. Запланируйте один разговор или снизьте ставки.",
  "The experiment is responsibly bounded or deliberately paused.":
    "Эксперимент получил ответственную границу или намеренно поставлен на паузу.",
  "Do not call every tie Gravity or every constraint sacred Ground; seek outside help when power makes conversation dangerous.":
    "Не называйте всякую связь Инерцией, а всякое ограничение — священной Землёй. Если неравенство власти делает разговор опасным, ищите внешнюю помощь.",
  "Give AI one visible role while keeping direction, adoption, consent, and responsibility human.":
    "Дайте ИИ одну видимую роль, оставив направление, принятие, согласие и ответственность людям.",
  "Name Call, Compass, one Wind role, decisions not delegated, and private material withheld; then mark output accept, change, reject, or verify.":
    "Назовите Зов, Компас, одну роль Ветра, решения, которые нельзя делегировать, и личный материал, который не будет передан. Затем пометьте ответ: принять, изменить, отвергнуть или проверить.",
  "The tool's role and the human adoption are explicit—or AI is not used.":
    "Роль инструмента и человеческое решение ясны — либо ИИ не используется.",
  "Speed is not direction. Using or refusing AI changes no person's worth.":
    "Скорость не задаёт направление. Использование ИИ или отказ от него не меняют человеческой ценности.",
  "Honorable Refusal": "Честный отказ",
  "Give no, not now, or differently a real form.":
    "Придайте ответу «нет», «не сейчас» или «иначе» настоящую форму.",
  "Complete: I will not answer this Call now because…. Communicate, offer another form, name a reconsideration condition, or close privately as needed.":
    "Закончите фразу: «Я не отвечу на этот Зов сейчас, потому что…». Если нужно, сообщите решение, предложите другую форму, назовите условие пересмотра или закройте вопрос для себя.",
  "The refusal has closed the relevant loop.": "Отказ замкнул нужный контур.",
  "Refusal does not erase unavoidable obligations or their effects.":
    "Отказ не стирает неизбежные обязательства и их последствия.",

  "Too many Calls": "Слишком много Зовов",
  "Many lively ideas together prevent any one of them from meeting reality.":
    "Множество живых идей одновременно не даёт ни одной встретиться с реальностью.",
  "Place them on one map without ranking their human importance; choose one question or tiny form that fits present commitments, review the others later, or choose none.":
    "Поместите идеи на одну карту, не превращая её в рейтинг собственной ценности. Выберите один вопрос или маленькую форму, совместимую с нынешними обязательствами, вернитесь к остальным позже — или не выбирайте ничего.",
  "Unchosen ideas are not failed destinies; the aim is one authored encounter or honest Ground.":
    "Невыбранные идеи — не проваленные судьбы. Достаточно одной авторской встречи или честной Земли.",
  "The tired adult": "Уставший взрослый",
  "A wanted question appears after work and care when the adult can barely stay awake.":
    "Желанный вопрос появляется после работы и заботы, когда человек едва держится на ногах.",
  "Call exhaustion fear, prescribe discipline as proof of desire, or allow rest only as fuel for output.":
    "Назвать истощение страхом, требовать дисциплины как доказательства желания или разрешить отдых только как топливо для результата.",
  "Treat low Lift as information; choose sleep, food, prescribed care, an ordinary chore, help, one line, a smaller form, or no form.":
    "Принять нехватку сил как факт. Выбрать сон, еду, назначенную заботу о здоровье, обычное дело, помощь, одну строку, уменьшенную форму или никакой формы.",
  "Ground Landing is complete. One line creates no debt to continue tomorrow. Worth is unchanged in every branch.":
    "Приземление завершает цикл. Одна строка не создаёт долг продолжать завтра. Человеческая ценность не меняется ни в одной ветке.",
  "AI proposes the destination": "ИИ предлагает пункт назначения",
  "AI returns a polished, plausible public project that was not the adult's question before the prompt.":
    "ИИ выдаёт гладкий и правдоподобный публичный проект, которого не было в исходном вопросе человека.",
  "Treat fluency or predicted demand as purpose, or defend humanity only by claiming the machine is worse.":
    "Принять гладкость или предсказанный спрос за цель — либо защищать человека лишь утверждением, что машина делает хуже.",
  "Name the proposal as a Wind-shaped map, recover the prior observation, ask whose question it is, then reject, keep as reference, or deliberately transform one part.":
    "Назвать предложение картой, созданной Ветром, вернуться к исходному наблюдению и спросить, чей это вопрос. Затем отвергнуть, оставить как справку или осознанно преобразовать одну часть.",
  "Direction, adoption, affected relationships, and Return remain human whether AI is used or refused.":
    "Направление, принятие, затронутые отношения и Возвращение остаются человеческими — с ИИ или без него.",

  "AI as Wind: Set the Wind": "ИИ как Ветер: настроить Ветер",
  "Choose one AI role and keep purpose, consent, adoption, judgment, and responsibility visible.":
    "Выберите одну роль ИИ и не дайте исчезнуть из виду цели, согласию, принятию, суждению и ответственности.",
  "A short pass before and after AI use": "Короткая проверка до и после работы с ИИ",
  "Name the Call and Compass, choose one of six roles, limit material, write one request, inspect output, mark adoption, then meet reality and Return.":
    "Назовите Зов и Компас, выберите одну из шести ролей, ограничьте материал, сделайте один запрос, проверьте ответ и отметьте принятое. Затем встретьтесь с реальностью и совершите Возвращение.",
  "Wind's contribution, human choices, unresolved uncertainty, and responsibility can be stated—or AI is not used.":
    "Можно ясно назвать вклад Ветра, человеческие решения, оставшуюся неопределённость и ответственность — либо ИИ не используется.",
  "No protocol turns generated text into evidence, consent, diagnosis, professional judgment, or transferred responsibility.":
    "Ни один протокол не превращает сгенерированный текст в доказательство, согласие, диагноз, профессиональное заключение или передачу ответственности.",
  "The Direction Test": "Проверка направления",
  "Recover human direction when AI proposes an attractive destination.":
    "Верните человеческое направление, если ИИ предложил привлекательный пункт назначения.",
  "Label the route, recover the original observation, open alternatives, consult Compass, choose explicitly, and own the next contact.":
    "Назовите маршрут предложением системы, восстановите исходное наблюдение, откройте альтернативы, сверьтесь с Компасом, сделайте явный выбор и отвечайте за следующую реальную встречу.",
  "The proposal is rejected, retained as reference, transformed into an authored direction, or left undecided.":
    "Предложение отвергнуто, оставлено как справка, превращено в собственное направление или пока не решено.",
  "Predicted demand, fluency, confidence, or scale is not a mandate.":
    "Предсказанный спрос, гладкость, уверенный тон или масштаб не дают приказа действовать.",
  "The Adoption Test": "Проверка принятия",
  "Check whether an AI-assisted form is ready to enter a consequential setting.":
    "Проверьте, готова ли форма с участием ИИ войти в ситуацию, где будут последствия.",
  "Answer: What role did AI play? What did it contribute? What was accepted, changed, rejected, or verified? Who and what remain relevant? Who responds if it is wrong?":
    "Ответьте: какую роль играл ИИ? Что он добавил? Что было принято, изменено, отвергнуто или проверено? Чьи интересы и какие факты всё ещё важны? Кто ответит, если форма окажется неверной?",
  "The adopter can answer—or reduces the stakes, seeks review, revises, or does not adopt yet.":
    "Принимающий может ответить — либо снижает ставки, ищет проверку, исправляет форму или пока её не принимает.",
  "Attribution does not transfer responsibility, and disclosure does not make unsafe use safe.":
    "Указание источника не передаёт ответственность, а раскрытие участия ИИ не делает опасное применение безопасным.",
  "Assistance without self-erasure": "Помощь без стирания себя",
  "An adult asks AI to improve a difficult letter; the result is graceful, decisive, and more certain than the adult feels.":
    "Человек просит ИИ улучшить трудное письмо. Ответ получается красивым, решительным и гораздо увереннее, чем чувствует себя автор.",
  "Send it because it sounds competent—or delete it because any assistance would make the letter false.":
    "Отправить, потому что звучит убедительно, — или удалить, потому что любая помощь якобы делает письмо фальшивым.",
  "Name Wind as Mirror or Craft aid; mark claims about feeling, promise, fact, and boundary; keep only what can be adopted; restore lived uncertainty; consider the recipient; send, revise, delay, or stop.":
    "Назвать роль Ветра — Зеркало или Помощник в ремесле. Отметить фразы о чувствах, обещаниях, фактах и границах; оставить только то, за что автор готов отвечать; вернуть живую неуверенность; подумать об адресате. Затем отправить, исправить, отложить или остановиться.",
  "Authorship is not a percentage of human-made words. It is a form the person can recognise, explain, and answer for.":
    "Авторство не измеряется процентом слов, написанных человеком. Это форма, которую он узнаёт как свою, может объяснить и за которую готов отвечать.",
};

const cardRu: Readonly<Record<string, string>> = {
  "Safety": "Безопасность",
  "Name the hazard and act directly; reopen choice when it becomes real again.":
    "Назовите конкретную опасность и действуйте прямо. Верните выбор, когда он снова станет реальным.",
  "Time": "Время",
  "Protect unhurried time without turning every free hour into enrichment.":
    "Берегите неспешное время, не превращая каждый свободный час в развивающее занятие.",
  "Rest and energy": "Отдых и силы",
  "Treat tiredness as information, not a verdict. Rest belongs to Ground.":
    "Считайте усталость информацией, а не приговором. Отдых принадлежит Земле.",
  "Materials and access": "Материалы и доступ",
  "Make access real without implying that more supplies must produce more creativity.":
    "Дайте реальный доступ, но не внушайте, будто больше материалов обязаны дать больше творчества.",
  "Craft and instruction": "Ремесло и обучение",
  "Teach the safe or useful map, then return destination and whole action to the maker.":
    "Покажите безопасную или полезную карту, а затем верните автору пункт назначения и действие целиком.",
  "Boundaries": "Границы",
  "State limits around cost, noise, privacy, consent, and shared belongings plainly.":
    "Прямо назовите границы цены, шума, приватности, согласия и общих вещей.",
  "Conversation": "Разговор",
  "Make questions and help available without demanding explanation or commentary.":
    "Оставьте доступными вопросы и помощь, не требуя объяснений или комментариев.",
  "Consequences and Return": "Последствия и Возвращение",
  "Meet effects through repair, learning, return, sharing, privacy, or an honest ending—not compulsory publicity.":
    "Ответьте на последствия исправлением, уроком, возвращением, адресным обменом, приватностью или честным завершением — но не обязательной публичностью.",
  "Direct instruction": "Прямое требование",
  "Use for immediate safety, care, law, or an unavoidable responsibility. Explain afterward and restore choice where possible.":
    "Подходит для немедленной безопасности, заботы, закона или неизбежной обязанности. Объясните позже и верните выбор там, где он возможен.",
  "Boundary with choice": "Граница с выбором",
  "Name the fixed obligation and offer only workable ways to meet it.":
    "Назовите неизменную обязанность и предложите только те способы её выполнить, которые действительно доступны.",
  "Genuine invitation": "Настоящее приглашение",
  "Use only when refusal will not cost affection, status, or future access.":
    "Используйте его лишь тогда, когда отказ не лишит ребёнка любви, положения или будущего доступа.",
  "Co-exploration": "Совместное исследование",
  "Learn together while the adult continues to hold adult risk and responsibility.":
    "Исследуйте вместе, но риск и взрослую ответственность продолжает нести взрослый.",
  "Witnessing and stepping back": "Быть свидетелем и отступить",
  "Stay available without adding another suggestion or abandoning the conditions.":
    "Оставайтесь рядом, не добавляя ещё один совет и не бросая условия без поддержки.",
  "The imagined child": "Воображаемый ребёнок",
  "A future identity replaces the child present now.":
    "Будущий образ заслоняет ребёнка, который находится рядом сейчас.",
  "Describe what is happening now and remove future identity as prize or threat.":
    "Опишите происходящее сейчас. Не используйте будущую роль ни как награду, ни как угрозу.",
  "The hidden brief": "Скрытое техническое задание",
  "Make anything secretly means make my answer.":
    "Фраза «сделай что угодно» на деле означает «сделай мой вариант».",
  "Name the constraint; call a required form instruction and accept surprise when it is truly open.":
    "Назовите ограничение. Обязательную форму честно назовите требованием, а там, где выбор открыт, примите неожиданный ответ.",
  "Forced takeoff": "Принудительный взлёт",
  "Creativity, enthusiasm, or sharing becomes compulsory performance.":
    "Творчество, энтузиазм или показ результата превращаются в обязательное выступление.",
  "Restore no, not now, or differently; separate the obligation from optional Flight.":
    "Верните ответы «нет», «не сейчас» и «иначе». Отделите обязанность от необязательного Полёта.",
  "Safety covers every uncertainty": "Безопасностью называют любую неопределённость",
  "Mess, failure, judgment, or wasted money is renamed danger.":
    "Беспорядок, неудачу, чужую оценку или напрасные траты переименовывают в опасность.",
  "Name the concrete risk, hold that boundary, and reopen choices outside it.":
    "Назовите конкретный риск, удержите эту границу и верните выбор за её пределами.",
  "The absent Keeper": "Исчезнувший хранитель",
  "It is your choice transfers adult burdens to the child.":
    "Фраза «это твой выбор» перекладывает взрослую ношу на ребёнка.",
  "Take back adult responsibility for risk, cost, time, cleanup, and consequences.":
    "Верните взрослому ответственность за риск, цену, время, уборку и последствия.",
  "Altitude scoring": "Оценка высоты",
  "Originality, speed, awards, visibility, or output becomes a measure of a person.":
    "Оригинальность, скорость, награды, заметность или количество работ становятся мерой человека.",
  "Discuss the form and effects specifically; remove labels and leaderboards.":
    "Говорите конкретно о форме и последствиях. Уберите ярлыки и таблицы лидеров.",
  "The map becomes the sky": "Карта становится небом",
  "One method or example becomes the only legitimate route.":
    "Один метод или пример объявляют единственным правильным маршрутом.",
  "Teach what the map is for, then return whole action and safe adaptation to the child.":
    "Объясните назначение карты, а затем верните ребёнку действие целиком и право безопасно её менять.",
  "Explanation interrupts action": "Объяснение прерывает действие",
  "Questions and corrections arrive before the child can complete a movement.":
    "Вопросы и поправки появляются раньше, чем ребёнок успевает завершить движение.",
  "Ask when input is wanted; offer one relevant technique and return to the whole.":
    "Спросите, когда нужен ваш отклик. Предложите один уместный приём и вернитесь к целому.",
  "Ground shame": "Стыд за Землю",
  "Care, cleanup, repetition, boredom, or rest is treated as lesser life.":
    "Заботу, уборку, повторение, скуку или отдых считают жизнью второго сорта.",
  "Close, care, and rest without promising a more productive tomorrow.":
    "Закройте дело, позаботьтесь о последствиях и отдохните, не обещая завтра стать продуктивнее.",
  "Return becomes performance": "Возвращение становится выступлением",
  "Public display is used to prove the activity mattered.":
    "Публичный показ должен доказать, что занятие имело смысл.",
  "Ask permission and offer private or addressed Return without making visibility a fee.":
    "Спросите разрешение и предложите личное или адресное Возвращение. Видимость не должна быть платой за смысл.",
  "Wind drift": "Дрейф Ветра",
  "AI's polished form arrives before a human direction and becomes the route.":
    "Гладкая форма ИИ появляется раньше человеческого направления и сама становится маршрутом.",
  "Restate the human question, tool role, and remaining choices; keep, change, or discard.":
    "Верните человеческий вопрос, роль инструмента и оставшиеся варианты. Затем сохраните, измените или отбросьте результат.",

  "Money": "Деньги",
  "Reliable income may be necessary now.": "Стабильный доход может быть необходим прямо сейчас.",
  "Gravity says serious adults may make only what has a market.":
    "Инерция говорит: серьёзный взрослый может создавать только то, что продаётся.",
  "Care": "Забота",
  "Choices affect people who depend on us.": "Наш выбор затрагивает людей, которые от нас зависят.",
  "Gravity says care erases every question of one's own.":
    "Инерция говорит: забота стирает любые собственные вопросы.",
  "Craft": "Ремесло",
  "A form may require repetition and skills not yet learned.":
    "Форма может потребовать повторения и навыков, которым ещё предстоит научиться.",
  "Gravity says not being exceptional immediately proves the question was false.":
    "Инерция говорит: если сразу не получилось выдающегося результата, вопрос был ложным.",
  "Work": "Работа",
  "Some tasks belong to an accepted or currently unavoidable agreement.":
    "Некоторые задачи входят в принятое или пока неизбежное соглашение.",
  "Gravity says a role is the whole truth about what one may want.":
    "Инерция говорит: рабочая роль полностью определяет, чего человеку позволено хотеть.",
  "AI": "ИИ",
  "A tool can make some versions faster.": "Инструмент может ускорить создание некоторых версий.",
  "Gravity says machine capability makes human attention and judgment worthless.":
    "Инерция говорит: возможности машины обесценивают человеческое внимание и суждение.",
  "Rest": "Отдых",
  "Capacity can be low and recovery necessary.": "Сил может быть мало, а восстановление — необходимо.",
  "Gravity says rest must be earned by future output.":
    "Инерция говорит: отдых нужно заслужить будущим результатом.",

  "Human worth": "Человеческая ценность",
  "No output, speed, originality, market use, rest, refusal, or assistance determines value.":
    "Ни результат, ни скорость, ни оригинальность, ни рыночная польза, ни отдых, отказ или помощь не определяют ценность человека.",
  "The worthy Call": "Зов, достойный ответа",
  "AI may surface questions; it cannot announce a true purpose, child destiny, or moral mission.":
    "ИИ может подсветить вопросы, но не может объявить истинную цель, судьбу ребёнка или моральную миссию.",
  "Consent": "Согласие",
  "A simulation cannot consent for a maker, collaborator, child, audience, or represented person.":
    "Симуляция не может дать согласие за автора, соавтора, ребёнка, аудиторию или изображённого человека.",
  "Generated signs of attention do not replace noticing, listening, remaining reachable, and responding.":
    "Сгенерированные признаки внимания не заменяют способность заметить, выслушать, оставаться доступным и ответить.",
  "Compass": "Компас",
  "AI can supply arguments; values, limits, affected relations, revision, and choice remain human.":
    "ИИ может предложить аргументы. Ценности, границы, затронутые отношения, пересмотр и выбор остаются человеческими.",
  "Adoption": "Принятие",
  "An output becomes part of a form only through an explicit human accept, change, reject, or verify decision.":
    "Ответ системы становится частью формы лишь после явного человеческого решения: принять, изменить, отвергнуть или проверить.",
  "Responsibility and Return": "Ответственность и Возвращение",
  "The people or institutions that adopt and act remain answerable for effects.":
    "Люди и организации, которые приняли форму и действуют через неё, продолжают отвечать за последствия.",
  "A child's identity": "Личность ребёнка",
  "AI must not diagnose, score, type, rank, or predict a child's life.":
    "ИИ не должен диагностировать, оценивать, типизировать, ранжировать или предсказывать жизнь ребёнка.",
  "Starting": "Начало",
  "A person names an observation, care, duty, or tentative question.":
    "Человек называет наблюдение, заботу, обязанность или предварительный вопрос.",
  "Drift asks the system what the person should want.":
    "При дрейфе систему спрашивают, чего человеку следует хотеть.",
  "Role": "Роль",
  "One contribution is assigned and can be revised.":
    "Инструменту назначают один вид помощи, который можно пересмотреть.",
  "Drift lets the system become planner, judge, maker, and approver at once.":
    "При дрейфе система одновременно становится планировщиком, судьёй, исполнителем и тем, кто утверждает результат.",
  "Criteria": "Критерии",
  "People name or negotiate criteria and affected relationships.":
    "Люди называют или обсуждают критерии и затронутые отношения.",
  "Drift imports criteria from defaults, popularity, or confidence.":
    "При дрейфе критерии незаметно приходят из настроек по умолчанию, популярности или уверенного тона.",
  "Options": "Варианты",
  "Generated routes remain candidates alongside refusal and delay.":
    "Сгенерированные маршруты остаются кандидатами наряду с отказом и отсрочкой.",
  "Drift treats the visible option set as the boundary of imagination.":
    "При дрейфе видимый набор вариантов принимают за границу воображения.",
  "Making": "Работа над формой",
  "The adopter understands enough to select, alter, explain, and verify the form.":
    "Принимающий понимает форму достаточно, чтобы выбрать, изменить, объяснить и проверить её.",
  "Drift accepts polish because it feels difficult to challenge.":
    "При дрейфе гладкий ответ принимают лишь потому, что с ним трудно спорить.",
  "Contact": "Контакт",
  "Simulation prepares for a suitable real encounter.":
    "Симуляция готовит к подходящей реальной встрече.",
  "Drift treats simulation as audience consent or evidence of effect.":
    "При дрейфе симуляцию принимают за согласие аудитории или доказательство эффекта.",
  "Return": "Возвращение",
  "The responsible people meet effects and repair what they adopt.":
    "Ответственные люди встречаются с последствиями и исправляют то, что приняли.",
  "Drift assigns responsibility to the instrument afterward.":
    "При дрейфе ответственность задним числом перекладывают на инструмент.",
  "Stopping": "Остановка",
  "No AI, less AI, pause, and Ground remain available.":
    "Путь без ИИ, меньше ИИ, пауза и Земля остаются доступными.",
  "Drift makes use compulsory or refusal a badge of purity.":
    "При дрейфе использование становится обязательным, а отказ — знаком моральной чистоты.",
  "1 · Name the Call": "1 · Назовите Зов",
  "Write the observation and possible reason to respond before asking AI. No or not now remains valid.":
    "До обращения к ИИ запишите наблюдение и возможную причину ответить. «Нет» и «не сейчас» остаются допустимыми.",
  "2 · Make a Compass note": "2 · Запишите Компас",
  "Name affected people, consent and privacy, revision conditions, decisions kept human, and what is unknown.":
    "Назовите затронутых людей, согласие и приватность, условия пересмотра, решения, оставленные людям, и всё неизвестное.",
  "3 · Assign one role": "3 · Назначьте одну роль",
  "Choose one canonical Wind role and name what it must not decide.":
    "Выберите одну роль Ветра и назовите, чего он не должен решать.",
  "4 · Set the material boundary": "4 · Ограничьте материал",
  "Use the minimum necessary context; prefer generic, fictionalised, or person-created material.":
    "Дайте минимум необходимого контекста. Предпочитайте обобщённый, вымышленный или созданный самим человеком материал.",
  "5 · Make one request": "5 · Сделайте один запрос",
  "Ask for an output small enough to inspect; if purpose or criteria shift, return to Compass.":
    "Запросите ответ такого размера, который можно проверить. Если цель или критерии сдвинулись, вернитесь к Компасу.",
  "6 · Run the adoption pass": "6 · Проверьте принятие",
  "Mark possible material Accept, Change, Reject, or Verify.":
    "Пометьте материал: принять, изменить, отвергнуть или проверить.",
  "7 · Meet reality": "7 · Встретьтесь с реальностью",
  "Choose a material test, reliable source, trusted reader, collaborator, affected person, professional review, or real environment suited to the stakes.":
    "Выберите материальную проверку, надёжный источник, доверенного читателя, соавтора, затронутого человека, профессиональную проверку или реальную среду, соответствующую ставкам.",
  "8 · Return and Ground": "8 · Возвращение и Земля",
  "Name Wind's contribution, human adoption, remaining uncertainty or effect, and whether the cycle is complete, paused, or returned for repair.":
    "Назовите вклад Ветра, человеческое решение, оставшуюся неопределённость или последствия и состояние цикла: завершён, на паузе или возвращён для исправления.",

  "AI proposes the direction": "ИИ предлагает направление",
  "A generated goal feels like discovered purpose.":
    "Сгенерированная цель ощущается как найденное предназначение.",
  "Label it a candidate route, recover the prior observation, open alternatives, consult affected people, and choose or defer.":
    "Назовите её возможным маршрутом, верните исходное наблюдение, откройте альтернативы, поговорите с затронутыми людьми и выберите или отложите.",
  "A parent asks AI to assess a child": "Родитель просит ИИ оценить ребёнка",
  "Output assigns talent, motivation, type, diagnosis, or destiny.":
    "Ответ назначает ребёнку талант, мотивацию, тип, диагноз или судьбу.",
  "Discard the classification and ask only about adult-controlled conditions or specific artefact criteria without profiling.":
    "Отбросьте классификацию. Спрашивайте только об условиях, которыми управляет взрослый, или о конкретных критериях работы — без профилирования.",
  "An unexamined output is published": "Непроверенный ответ публикуют",
  "The publisher cannot explain or defend the polished form.":
    "Публикующий не может объяснить или защитить гладкую форму.",
  "Pause; run Accept, Change, Reject, Verify; check sources and relationships; revise, attribute, or do not publish.":
    "Остановитесь. Пройдите решения «принять, изменить, отвергнуть, проверить», сверьте источники и отношения. Исправьте, укажите происхождение или не публикуйте.",
  "Options become an avalanche": "Варианты превращаются в лавину",
  "More generation feels productive while no choice is made.":
    "Новые варианты создают ощущение работы, хотя выбор так и не сделан.",
  "Stop, restate the Call, choose two criteria, keep a small set, or return to Ground.":
    "Остановитесь, верните Зов, выберите два критерия, оставьте небольшой набор — или вернитесь к Земле.",
  "The critic becomes a judge": "Критик становится судьёй",
  "Feedback is read as a verdict on ability or worth.":
    "Обратную связь принимают за приговор способностям или ценности человека.",
  "Separate fact, ethics, craft, and taste; choose legitimate criteria and reject the rank.":
    "Разделите факт, этику, ремесло и вкус. Выберите уместные критерии и отвергните ранг.",
  "Speed outruns consent": "Скорость обгоняет согласие",
  "Material is shared or transformed before boundaries are checked.":
    "Материал передают или изменяют раньше, чем проверяют границы.",
  "Stop distribution, identify affected interests, seek real consent where required, limit use, and repair effects.":
    "Остановите распространение, определите затронутые интересы, получите реальное согласие там, где оно нужно, ограничьте использование и исправьте последствия.",
  "Simulation replaces contact": "Симуляция заменяет контакт",
  "Plausible reactions are treated as evidence or approval.":
    "Правдоподобные реакции принимают за доказательство или одобрение.",
  "Label hypotheses, meet an appropriate real person or environment, and revise from actual feedback.":
    "Назовите их гипотезами, встретьтесь с подходящим реальным человеком или средой и пересмотрите форму по настоящей обратной связи.",
  "Completion replaces learning": "Готовый результат заменяет обучение",
  "A craft aid performs the operation the person intended to practise.":
    "Помощник выполняет операцию, которую человек хотел освоить сам.",
  "Choose learning or delivery consciously, then narrow assistance or change the aim.":
    "Осознанно выберите обучение или готовый результат, затем сузьте помощь или измените цель.",
  "One route becomes invisible normality": "Один маршрут становится невидимой нормой",
  "Repeated outputs narrow style, assumptions, or represented lives.":
    "Повторяющиеся ответы сужают стиль, предположения или представленные способы жизни.",
  "Name the pattern, vary sources and constraints, invite affected perspectives, and keep rejection open.":
    "Назовите шаблон, меняйте источники и ограничения, приглашайте затронутые точки зрения и оставляйте право отказаться.",
  "Responsibility is laundered": "Ответственность отмывают",
  "The AI said so is used after harm.":
    "После причинённого вреда звучит оправдание: «так сказал ИИ».",
  "Name who chose, approved, and acted; meet the effect; repair the form or process.":
    "Назовите, кто выбрал, утвердил и действовал. Ответьте на последствие и исправьте форму или процесс.",
  "AI use becomes compulsory": "Использование ИИ становится обязательным",
  "Refusal is treated as backwardness or failure.":
    "Отказ считают отсталостью или провалом.",
  "Restore a workable non-AI route where choice is real and judge only the relevant form.":
    "Там, где выбор реален, верните рабочий путь без ИИ и оценивайте только конкретную форму.",
  "Purity becomes a badge": "Чистота становится знаком превосходства",
  "Unaided work is treated as morally superior or fully self-created.":
    "Работу без помощи считают нравственно выше или полностью созданной в одиночку.",
  "Name teachers, tools, traditions, collaborators, and conditions; choose assistance by purpose and boundary.":
    "Назовите учителей, инструменты, традиции, соавторов и условия. Выбирайте помощь по цели и границам.",

  "The child is never a product, proof of parenting, future labour-market strategy, or data source for a score.":
    "Ребёнок никогда не становится продуктом, доказательством качества воспитания, стратегией для будущего рынка труда или источником данных для оценки.",
  "Equal dignity never removes the adult's greater duty for safety, care, privacy, limits, and consequences.":
    "Равное достоинство не отменяет большей ответственности взрослого за безопасность, заботу, приватность, границы и последствия.",
  "An invitation is genuine only when refusal can survive without relational punishment.":
    "Приглашение настоящее только тогда, когда отказ не наказывается отношениями.",
  "An unavoidable obligation or emergency is named directly; false choice is not creative freedom.":
    "Неизбежную обязанность и экстренную ситуацию называют прямо. Ложный выбор — не творческая свобода.",
  "Feedback describes forms, intentions, and effects without assigning creative identity, rank, diagnosis, or destiny.":
    "Обратная связь описывает форму, намерение и последствия, не назначая творческую идентичность, ранг, диагноз или судьбу.",
  "No practice asks for a child's name, diagnosis, image, school, private history, or identifying work sample.":
    "Ни одна практика не требует имени ребёнка, диагноза, фотографии, школы, личной истории или узнаваемого образца работы.",
  "Public sharing is optional; actual effects on other people still require attention and repair.":
    "Публичность необязательна. Реальные последствия для других людей всё равно требуют внимания и исправления.",
  "The metaphor stops where danger or medical, psychological, educational, legal, or social help is needed.":
    "Метафора заканчивается там, где есть опасность или нужна медицинская, психологическая, образовательная, юридическая либо социальная помощь.",
  "Treat the child as a person now, not a project for later.":
    "Относиться к ребёнку как к человеку сейчас, а не как к проекту на будущее.",
  "Hold safety, care, and consequences without owning the child's inner form.":
    "Удерживать безопасность, заботу и последствия, не присваивая внутреннюю форму ребёнка.",
  "Name what is required and offer only choices that can be honoured.":
    "Называть обязательное и предлагать только тот выбор, который можно уважить.",
  "Let maps teach without letting them choose the whole sky.":
    "Позволять картам учить, но не выбирать всё небо.",
  "Make room for yes, no, not now, and differently where those answers are real.":
    "Оставлять место для «да», «нет», «не сейчас» и «иначе» там, где эти ответы реальны.",
  "Offer feedback about forms and effects without ranking the person.":
    "Говорить о формах и последствиях, не ранжируя человека.",
  "Count rest, help, repetition, and honest endings as Ground.":
    "Считать отдых, помощь, повторение и честное завершение частью Земли.",
  "Use AI as Wind, never as judge of worth or substitute for consent and responsibility.":
    "Использовать ИИ как Ветер, но не как судью ценности и не вместо согласия и ответственности.",
  "Repair when care becomes control and take back burdens that belong to the adult.":
    "Исправлять момент, когда забота становится контролем, и возвращать взрослому его ношу.",
  "No height, originality, achievement, refusal, or future usefulness changes a child's worth.":
    "Ни высота, ни оригинальность, ни достижение, отказ или будущая полезность не меняют ценность ребёнка.",

  "Flight names an event, never a human type, rank, identity, or obligation to produce.":
    "Полёт называет событие, а не тип, ранг, личность или обязанность производить.",
  "Present-life purpose does not require one destiny, a dramatic reinvention, or condemnation of the past.":
    "Смысл в нынешней жизни не требует единственной судьбы, драматического перерождения или осуждения прошлого.",
  "Ground includes body, money, facts, relationships, craft, care, obligations, maintenance, and rest; naming it is not approving injustice.":
    "Земля включает тело, деньги, факты, отношения, ремесло, заботу, обязательства, быт и отдых. Назвать их — не значит одобрить несправедливость.",
  "A borrowed map is not automatically Gravity, and every commitment is not automatically sacred Ground.":
    "Чужая карта не обязательно Инерция, а каждое обязательство не обязательно священная Земля.",
  "No practice creates a score, streak, diagnosis, forecast, personality result, or comparative measure.":
    "Ни одна практика не создаёт балл, серию, диагноз, прогноз, тип личности или сравнительную меру.",
  "No, not now, differently, ask for help, keep private, and end are complete authored branches.":
    "«Нет», «не сейчас», «иначе», просьба о помощи, приватность и завершение — полноценные авторские ветви.",
  "Consequential choices attend to consent, affected relationships, real expertise, evidence, and repair.":
    "Важные решения учитывают согласие, затронутые отношения, настоящее знание, доказательства и исправление.",
  "This is speculative philosophy and voluntary practice, not treatment, diagnosis, professional advice, or a forecast.":
    "Это спекулятивная философия и добровольная практика, а не лечение, диагноз, профессиональный совет или прогноз.",
  "Begin with this life, not an imaginary life without limits or ties.":
    "Начинать с этой жизни, а не с воображаемой жизни без границ и связей.",
  "Treat a Call as an invitation, never proof of destiny.":
    "Считать Зов приглашением, а не доказательством судьбы.",
  "Use maps without mistaking them for the sky.": "Пользоваться картами, не принимая их за небо.",
  "Choose a form small enough for the Lift actually present.":
    "Выбирать форму, достаточно маленькую для тех сил, которые есть сейчас.",
  "Let craft, care, repetition, limits, and rest belong to Ground.":
    "Оставлять ремесло, заботу, повторение, границы и отдых в составе Земли.",
  "Meet what actions change and make a fitting Return.":
    "Встречаться с тем, что изменили действия, и совершать соразмерное Возвращение.",
  "Ask for help, change direction, refuse, pause, or end a cycle.":
    "Просить помощи, менять направление, отказываться, ставить на паузу или завершать цикл.",
  "Use Wind without asking speed to choose what is worthy.":
    "Пользоваться Ветром, не позволяя скорости решать, что достойно внимания.",
  "Never measure a person by height, output, usefulness, or originality.":
    "Никогда не измерять человека высотой, результатом, полезностью или оригинальностью.",
  "There is nothing to prove; author the next responsible form only if and when one is possible.":
    "Доказывать нечего. Создавать следующую ответственную форму стоит только тогда, когда она возможна.",

  "Human worth does not depend on using AI, refusing it, outperforming it, or producing anything.":
    "Человеческая ценность не зависит от использования ИИ, отказа от него, превосходства над ним или способности что-либо произвести.",
  "AI is influential and not neutral, but it is not an oracle, moral authority, Compass, hidden pilot, or bearer of Return.":
    "ИИ влиятелен и не нейтрален. Но он не оракул, не моральный авторитет, не Компас, не скрытый пилот и не носитель Возвращения.",
  "No output supplies consent, evidence, factual verification, professional judgment, or lived feedback by itself.":
    "Ни один ответ сам по себе не даёт согласия, доказательства, проверки фактов, профессионального заключения или живой обратной связи.",
  "Children are never profiled, diagnosed, ranked, forecast, or used as private data sources for personalised inference.":
    "Детей нельзя профилировать, диагностировать, ранжировать, прогнозировать или использовать их личные данные для персонализированных выводов.",
  "Use only necessary material and check the actual system, venue, source, legal, privacy, and professional conditions that apply.":
    "Используйте только необходимый материал. Проверяйте конкретную систему, площадку, источники, право, приватность и профессиональные требования.",
  "Simulation is preparation, not relationship; generation is material, not adoption.":
    "Симуляция — подготовка, а не отношения. Генерация даёт материал, но не означает его принятия.",
  "A no-AI route, human help, pause, Ground, and an unanswered Call remain valid.":
    "Путь без ИИ, помощь человека, пауза, Земля и Зов без ответа остаются допустимыми.",
  "The Wind metaphor is a practical open myth, not a technical capability claim or labour-market forecast.":
    "Метафора Ветра — практический открытый миф, а не заявление о технических возможностях и не прогноз рынка труда.",
  "Worth is invariant.": "Ценность человека неизменна.",
  "Wind receives one visible role.": "Ветер получает одну видимую роль.",
  "An offered route is not a destiny or mandate.": "Предложенный маршрут — не судьба и не приказ.",
  "Compass remains human.": "Компас остаётся у человека.",
  "Wind's non-neutral pulls remain visible and reviewable.":
    "Ненейтральные влияния Ветра остаются видимыми и доступными для пересмотра.",
  "Children are not profiles.": "Дети — не профили.",
  "Adoption is explicit: accept, change, reject, or verify.":
    "Принятие выражено явно: принять, изменить, отвергнуть или проверить.",
  "Simulation is not consent, evidence, or relationship.":
    "Симуляция — не согласие, не доказательство и не отношения.",
  "Return cannot be outsourced.": "Возвращение нельзя передать машине.",
  "Ground remains open: pause, work without AI, ask for human help, or leave the Call unanswered.":
    "Земля остаётся открытой: можно сделать паузу, работать без ИИ, попросить человека о помощи или оставить Зов без ответа.",
};

const deckRu: Readonly<Record<string, string>> = {
  "Read the Manifesto": "Читать манифест",
  "10 minutes": "10 минут",
  "15 minutes": "15 минут",
  "20 minutes": "20 минут",
  "20–60 minutes; never more than one day": "20–60 минут, но не больше одного дня",
  "5 minutes": "5 минут",
  "10–30 minutes": "10–30 минут",
  "As needed": "По необходимости",
  "5 minutes before and after AI use": "5 минут до и после работы с ИИ",
  "5–20 minutes": "5–20 минут",
  "Map the ideas without turning them into a personal ranking.":
    "Нанесите идеи на карту, не превращая её в личный рейтинг.",
  "Ask which fits present commitments and who is affected.":
    "Спросите, какая идея совместима с нынешними обязательствами и кого она затронет.",
  "Choose one, reduce one, place the rest on Ground, or choose none.":
    "Выберите одну, уменьшите одну, оставьте остальные на Земле — или не выбирайте ничего.",
  "Before consequential use, name AI's role and contribution, what people accepted or changed, what was verified, which rights and uncertainties remain, and who will respond if the form is wrong.":
    "Перед важным применением назовите роль и вклад ИИ, что люди приняли или изменили, что проверили, какие права и неопределённости остаются и кто ответит, если форма окажется неверной.",
  "Private exploration may need only a short note. Shared or public work requires the relevant source, legal, professional, venue, credit, and trust practices. A fluent claim is not evidence.":
    "Для личного исследования может хватить короткой заметки. Общая или публичная работа требует уместной проверки источников, права, профессиональных норм, правил площадки, авторства и доверия. Гладкое утверждение не становится доказательством.",
  "Ask what craft carries meaning, what merely blocks contact, what must be understood to verify the result, what is worth learning even if slower, and which assistance improves access without removing another person's choice.":
    "Спросите, какое ремесло несёт смысл, а какое лишь мешает контакту; что нужно понимать, чтобы проверить результат; чему стоит учиться, даже если это медленнее; и какая помощь расширяет доступ, не отнимая чужой выбор.",
  "Thirty invitations, not a challenge": "Тридцать приглашений, а не марафон",
  "A card may take a day, six months, remain unfinished, be replaced by Ground, or be left unopened.":
    "Одна карточка может занять день или полгода, остаться незавершённой, уступить место Земле или так и не быть открытой.",
  "No streaks, scores, catch-up days, completion badges, ranking, or requirement to continue.":
    "Никаких серий, баллов, дней для навёрстывания, значков, рейтингов и обязанности продолжать.",
  "Notice": "Замечать",
  "Choose": "Выбирать",
  "Give form": "Придавать форму",
  "Meet and Return": "Встречаться и возвращаться",
  "Land": "Приземляться",
  "Name one ordinary irritation without solving it.":
    "Назовите одно обычное раздражение, не пытаясь его решить.",
  "Name one thing you care for that is not a project.":
    "Назовите то, о чём вы заботитесь, хотя это не проект.",
  "Notice one desire that would remain if no audience knew about it.":
    "Заметьте одно желание, которое осталось бы, даже если бы о нём никто не узнал.",
  "Write one recurring ‘a person like me should…’.":
    "Запишите одну повторяющуюся мысль: «Такой человек, как я, должен…».",
  "Name one real Ground condition without judging it.":
    "Назовите одно реальное условие Земли, не оценивая его.",
  "Take a Ground day; record nothing unless you want to.":
    "Проведите день на Земле. Ничего не записывайте, если не хочется.",
  "Turn one observation into a possible Call—or decline it.":
    "Превратите одно наблюдение в возможный Зов — или откажитесь от него.",
  "Write one sentence about why it matters now.":
    "Одним предложением запишите, почему это имеет значение сейчас.",
  "Name everyone directly affected by a response.":
    "Назовите всех, кого напрямую затронет ответ.",
  "Name one boundary of consent, safety, time, or care.":
    "Назовите одну границу согласия, безопасности, времени или заботы.",
  "Name one condition that would make you revise or stop.":
    "Назовите одно условие, при котором вы пересмотрите решение или остановитесь.",
  "Choose one map to keep, adapt, borrow temporarily, or refuse.":
    "Выберите одну карту: оставить, изменить, временно одолжить или отвергнуть.",
  "Check today's Lift without comparing it with yesterday's.":
    "Оцените сегодняшние силы, не сравнивая их со вчерашними.",
  "Ask for one condition or reduce the scope.":
    "Попросите об одном условии или уменьшите масштаб.",
  "Choose a form possible in one day or less.":
    "Выберите форму, которую можно сделать за день или быстрее.",
  "Make a rough version that reality can answer.":
    "Сделайте черновую версию, на которую реальность сможет ответить.",
  "Practise one boring hinge, then return to the whole.":
    "Потренируйте один скучный шарнир и вернитесь к целому.",
  "Put the materials away and rest without earning it.":
    "Уберите материалы и отдохните. Отдых не нужно заслуживать.",
  "Let the form meet one material, fact, place, or consenting witness.":
    "Дайте форме встретиться с одним материалом, фактом, местом или согласившимся свидетелем.",
  "Receive one response without turning it into a verdict on yourself.":
    "Примите один отклик, не превращая его в приговор себе.",
  "Separate feedback about the form from worth of the maker.":
    "Отделите обратную связь о форме от ценности автора.",
  "Revise, repair, stop, or keep the form private.":
    "Измените, исправьте, остановите или оставьте форму личной.",
  "Choose a fitting Return: value, learning, repair, gratitude, or closure.":
    "Выберите подходящее Возвращение: ценность, урок, исправление, благодарность или завершение.",
  "Complete that Return at the smallest honest scale.":
    "Совершите это Возвращение в самом маленьком честном масштабе.",
  "Name what the cycle changed and what it did not.":
    "Назовите, что цикл изменил, а что оставил прежним.",
  "Give full attention to one ordinary obligation or act of care.":
    "Уделите полное внимание одной обычной обязанности или акту заботы.",
  "Use AI in one named Wind role—or consciously do not use it.":
    "Используйте ИИ в одной названной роли Ветра — или осознанно обойдитесь без него.",
  "Revisit one borrowed map and decide its place for now.":
    "Вернитесь к одной заимствованной карте и решите, какое место она занимает сейчас.",
  "Choose a next small Call, not now, or no next Call.":
    "Выберите следующий небольшой Зов, ответ «не сейчас» или отсутствие следующего Зова.",
  "Read the covenant and rewrite one line in your own words.":
    "Прочитайте договор и перепишите одну строку своими словами.",

  "Rewrite one real adult sentence in its honest mode.":
    "Перепишите одну настоящую фразу взрослого в честном режиме.",
  "Separate adult responsibility from a hidden expected result.":
    "Отделите ответственность взрослого от скрытого ожидаемого результата.",
  "Inspect conditions for one attempt without profiling a child or family.":
    "Посмотрите на условия одной попытки, не составляя профиль ребёнка или семьи.",
  "Close or pause without a required next project.":
    "Закройте или приостановите цикл без обязательного следующего проекта.",
  "Set a human-first family boundary around AI.":
    "Установите семейную границу вокруг ИИ, оставив человека первым.",
  "Apply the same philosophy to your own present life.":
    "Примените ту же философию к собственной нынешней жизни.",
  "Read the article on consequence, repair, privacy, and honest endings.":
    "Прочитайте статью о последствиях, исправлении, приватности и честных завершениях.",
  "See the full worldview behind the parent path.":
    "Посмотрите на целостное мировоззрение, из которого вырос родительский путь.",
  "Turn one observation into a possible Call or honest non-answer.":
    "Превратите одно наблюдение в возможный Зов или честный отказ отвечать.",
  "Choose the present place of one inherited route.":
    "Определите нынешнее место одного унаследованного маршрута.",
  "Try one reversible variation without worshipping novelty.":
    "Попробуйте одну обратимую вариацию, не поклоняясь новизне.",
  "Remember one complete or incomplete cycle without tracking a life.":
    "Запомните один полный или незавершённый цикл, не превращая жизнь в трекер.",
  "Meet an effect through learning, repair, privacy, value, or ending.":
    "Ответьте на последствие уроком, исправлением, приватностью, ценностью или завершением.",
  "Close or pause without debt to continue.":
    "Закройте или поставьте на паузу без долга продолжать.",
  "Choose a bounded role for AI and review adoption.":
    "Выберите ограниченную роль ИИ и проверьте, что именно было принято.",
  "Carry the framework into unequal adult responsibility with a child.":
    "Перенесите рамку в отношения, где ответственность взрослого и ребёнка неравна.",
  "Read the twelve governing articles.":
    "Прочитайте двенадцать основных статей.",
  "Create a bounded Wind agreement and human adoption note.":
    "Составьте ограниченное соглашение о Ветре и отметьте человеческие решения.",
  "Apply the family boundary while retaining unequal adult responsibility.":
    "Примените семейную границу, сохраняя большую ответственность взрослого.",
  "Return the tool boundary to a present-life human direction.":
    "Верните границу инструмента в направление нынешней человеческой жизни.",
  "Meet the effects of an adopted form in a real relationship.":
    "Встретьтесь с последствиями принятой формы в реальных отношениях.",
  "Stop the system and close the cycle without promising another.":
    "Остановите систему и закройте цикл, не обещая следующий.",
  "See why Wind remains one part of a larger ethical world.":
    "Посмотрите, почему Ветер остаётся лишь частью более широкого этического мира.",
};

const readerTextRu: Readonly<Record<string, string>> = {
  ...contextualRu,
  ...detailRu,
  ...cardRu,
  ...deckRu,
};

const structuralKeys = new Set([
  "id",
  "href",
  "route",
  "kind",
  "atlasExperienceId",
]);

function localizeDeep<T>(value: T, key = ""): T {
  if (Array.isArray(value)) {
    return value.map((item) => localizeDeep(item, key)) as T;
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, childValue]) => [
        childKey,
        structuralKeys.has(childKey)
          ? childValue
          : localizeDeep(childValue, childKey),
      ]),
    ) as T;
  }

  if (typeof value === "string" && !structuralKeys.has(key)) {
    return (readerTextRu[value] ?? value) as T;
  }

  return value;
}

export const windRolesRu = localizeDeep(windRoles);

export const pathwaysRu = localizeDeep(pathways) as unknown as Record<
  PathwayId,
  PathwayDefinition
>;

export const pathwayListRu = [
  pathwaysRu.parent,
  pathwaysRu.adult,
  pathwaysRu.ai,
] as const;

export function getPathwayRu(pathwayId: PathwayId): PathwayDefinition {
  return pathwaysRu[pathwayId];
}
