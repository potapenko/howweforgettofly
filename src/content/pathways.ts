/**
 * Editorial content for the three life paths.
 *
 * The Atlas experiences are the site's ten full visitor-authored tools. This
 * registry keeps the larger foundations visible around those tools: household
 * scenes, adult scenes, voluntary practices, small cards, AI roles, and drift
 * repairs. An Atlas-backed practice carries its EXP id and route; a
 * supplementary card remains deliberately editorial and non-scored.
 */

export type PathwayId = "parent" | "adult" | "ai";

export type AtlasExperienceId =
  | "EXP-01"
  | "EXP-02"
  | "EXP-03"
  | "EXP-04"
  | "EXP-05"
  | "EXP-06"
  | "EXP-07"
  | "EXP-08"
  | "EXP-09"
  | "EXP-10";

export interface EditorialCard {
  id: string;
  title: string;
  body: string;
  detail?: string;
  prompt?: string;
  repair?: string;
  items?: readonly string[];
}

export interface PathwaySection {
  id: string;
  eyebrow: string;
  title: string;
  plain: string;
  paragraphs: readonly string[];
  cards?: readonly EditorialCard[];
}

export interface PracticeCard {
  id: string;
  title: string;
  summary: string;
  action: string;
  completion: string;
  guardrail: string;
  time?: string;
  prompts?: readonly string[];
  atlasExperienceId?: AtlasExperienceId;
  href?: string;
}

export interface SceneCard {
  id: string;
  title: string;
  situation: string;
  unhelpfulPattern?: string;
  groundedResponse: string;
  principle: string;
  steps?: readonly string[];
}

export interface SmallEditorialCard {
  id: string;
  number: number;
  phase: string;
  prompt: string;
}

export interface CardDeck {
  id: string;
  title: string;
  introduction: string;
  guardrail: string;
  cards: readonly SmallEditorialCard[];
}

export interface RouteLink {
  label: string;
  href: string;
  description: string;
  kind: "primary" | "atlas" | "cross-path" | "reference";
}

export interface PathwayDefinition {
  id: PathwayId;
  route: string;
  eyebrow: string;
  title: string;
  lede: string;
  plainThesis: string;
  readerOutcome: string;
  nextStep: string;
  sections: readonly PathwaySection[];
  practices: readonly PracticeCard[];
  sceneCards: readonly SceneCard[];
  cardDecks: readonly CardDeck[];
  guardrails: readonly string[];
  covenant: readonly string[];
  routeLinks: readonly RouteLink[];
}

export interface WindRole {
  id:
    | "mirror"
    | "generator"
    | "interlocutor"
    | "critic"
    | "craft-aid"
    | "simulator";
  title:
    | "Mirror"
    | "Generator"
    | "Interlocutor"
    | "Critic"
    | "Craft aid"
    | "Simulator";
  usefulContribution: string;
  nonNeutralPull: string;
  humanDecision: string;
  starterPrompt: string;
}

export const windRoles = [
  {
    id: "mirror",
    title: "Mirror",
    usefulContribution:
      "Reflects a draft, summary, tension, or repeated pattern back to the maker.",
    nonNeutralPull:
      "A tidy reflection can erase ambiguity or make one interpretation feel definitive.",
    humanDecision:
      "Decide whether the reflection is recognisable, what it leaves out, and whether it changes the Call.",
    starterPrompt:
      "Reflect my current position in no more than five points. Mark interpretations you add. Do not name my true purpose. End with one question I may decline.",
  },
  {
    id: "generator",
    title: "Generator",
    usefulContribution:
      "Produces materially different options, examples, questions, structures, or forms.",
    nonNeutralPull:
      "Abundance can replace choosing, while familiar patterns quietly define the option set.",
    humanDecision:
      "Choose which options deserve attention, what criteria matter, and whether to choose any.",
    starterPrompt:
      "Offer five materially different responses to this Call. State each assumption. Include doing nothing now. Do not rank them until I provide criteria.",
  },
  {
    id: "interlocutor",
    title: "Interlocutor",
    usefulContribution:
      "Asks questions, rehearses a conversation, or helps articulate an unfinished thought.",
    nonNeutralPull:
      "Dialogue can become an agreeable loop or give fluency the aura of understanding.",
    humanDecision:
      "Decide which question is real, when another human is needed, and when to end the exchange.",
    starterPrompt:
      "Ask one clarifying question at a time. Separate what I observed, assumed, and care about. Do not turn my answer into a diagnosis or mission.",
  },
  {
    id: "critic",
    title: "Critic",
    usefulContribution:
      "Tests assumptions, identifies gaps, checks stated criteria, and offers counterarguments.",
    nonNeutralPull:
      "Confident criticism can become a moral verdict, imported taste, or endless revision.",
    humanDecision:
      "Choose legitimate criteria, decide what criticism to adopt, and decide when the form is ready enough.",
    starterPrompt:
      "Test this form against my stated criteria. Separate factual gaps, ethical concerns, craft choices, and taste. Suggest repairs without scoring me or the work.",
  },
  {
    id: "craft-aid",
    title: "Craft aid",
    usefulContribution:
      "Helps edit, translate, restructure, format, prototype, calculate, or execute a chosen technique.",
    nonNeutralPull:
      "Friction can vanish before the maker learns which part of the craft matters to this attempt.",
    humanDecision:
      "Keep the intended effect, acceptable method, verification standard, and final adoption human.",
    starterPrompt:
      "Help with this bounded craft operation. Preserve the decisions I name. Flag changes to meaning, consent, attribution, or audience.",
  },
  {
    id: "simulator",
    title: "Simulator",
    usefulContribution:
      "Generates plausible questions, edge cases, scenarios, or audience reactions before real contact.",
    nonNeutralPull:
      "A plausible simulation can be mistaken for evidence, consent, lived experience, or feedback.",
    humanDecision:
      "Name what still requires reality and whose real voice must still be heard.",
    starterPrompt:
      "Generate plausible reactions from the stated context. Label them hypotheses, not evidence. Name what only a real person, source, or trial can answer.",
  },
] as const satisfies readonly WindRole[];

const parentSections = [
  {
    id: "present-child",
    eyebrow: "The starting relation",
    title: "The child is not the project",
    plain:
      "A child is a person in the room now, not the first draft of a future adult.",
    paragraphs: [
      "Imagine a child drawing a house. Someone loves the red roof. The next house has a red roof too. After a while, the child looks up before choosing a colour.",
      "Praise can be warm and sincere. Yet the glance toward the adult may slowly take the place of looking at the picture. A Keeper notices that glance and makes room for a roof nobody has asked for.",
    ],
  },
  {
    id: "dignity-responsibility",
    eyebrow: "A productive asymmetry",
    title: "Equal dignity, unequal responsibility",
    plain:
      "Parent and child have equal human worth; the adult still carries more power and duty.",
    paragraphs: [
      "The adult holds safety, care, money, transport, permissions, and consequences the child cannot reasonably carry. Greater duty does not create ownership of the child's interests, pace, style, meaning, or future.",
      "The adult holds the frame. The child can author a form inside it. When no choice exists, the adult names the requirement instead of disguising it as freedom.",
    ],
  },
  {
    id: "keeper-conditions",
    eyebrow: "What a Keeper keeps",
    title: "Conditions support many answers",
    plain:
      "Good conditions do not guarantee a result; they make making, refusal, help, and rest more possible.",
    paragraphs: [
      "A clear corner of the table, time to linger, someone who knows how to hold the scissors: the conditions are often ordinary things.",
    ],
    cards: [
      { id: "safety", title: "Safety", body: "Name the hazard and act directly; reopen choice when it becomes real again." },
      { id: "time", title: "Time", body: "Protect unhurried time without turning every free hour into enrichment." },
      { id: "rest", title: "Rest and energy", body: "Treat tiredness as information, not a verdict. Rest belongs to Ground." },
      { id: "materials", title: "Materials and access", body: "Make access real without implying that more supplies must produce more creativity." },
      { id: "craft", title: "Craft and instruction", body: "Teach the safe or useful map, then return destination and whole action to the maker." },
      { id: "boundaries", title: "Boundaries", body: "State limits around cost, noise, privacy, consent, and shared belongings plainly." },
      { id: "conversation", title: "Conversation", body: "Make questions and help available without demanding explanation or commentary." },
      { id: "return", title: "Consequences and Return", body: "Return borrowed things, mend what was damaged, listen to an answer. A drawing can also stay in its drawer." },
    ],
  },
  {
    id: "honest-modes",
    eyebrow: "Before choosing a tone",
    title: "Name the mode honestly",
    plain:
      "Gentle wording does not make an instruction into an invitation, and a question is not open if only yes can survive.",
    paragraphs: [
      "Choose the mode that matches the adult's real responsibility and the amount of choice actually available.",
    ],
    cards: [
      { id: "instruction", title: "Direct instruction", body: "Use for immediate safety, care, law, or an unavoidable responsibility. Explain afterward and restore choice where possible." },
      { id: "boundary", title: "Boundary with choice", body: "Name the fixed obligation and offer only workable ways to meet it." },
      { id: "invitation", title: "Genuine invitation", body: "Use only when refusal will not cost affection, status, or future access." },
      { id: "co-exploration", title: "Co-exploration", body: "Learn together while the adult continues to hold adult risk and responsibility." },
      { id: "witness", title: "Witnessing and stepping back", body: "Stay available without adding another suggestion or abandoning the conditions." },
    ],
  },
  {
    id: "family-cycle",
    eyebrow: "One small family Flight",
    title: "The bridge bends",
    plain:
      "Making begins to move when the material answers back.",
    paragraphs: [
      "Imagine a paper bridge between two cups. A toy car reaches the middle and the road sags. The adult reaches for thicker card. The child folds the fallen sheet like a fan and tries again.",
      "This time the car crosses. Then another goes on, and both fall into the river below. Someone laughs. The bridge gets a new fold; the river gets a name. Later, the cups go back to the kitchen.",
    ],
  },
  {
    id: "refusal-feedback",
    eyebrow: "No altitude score",
    title: "Before the next suggestion",
    plain:
      "The maker may still be listening to what the work has done.",
    paragraphs: [
      "A child leaves a drawing on the table. You can see a way to improve it. Before speaking, there is time to look: where the line grew darker, what was rubbed out, which part the child returns to. Ask whether they want to tell you about it.",
      "If they want to finish, the drawing can be finished. Returning borrowed pens or making space for dinner is a separate responsibility.",
    ],
  },
  {
    id: "family-wind",
    eyebrow: "AI in the family",
    title: "Wind, not wings or pilot",
    plain:
      "AI may support a bounded operation; it does not judge the child, choose a worthy future, or absorb responsibility.",
    paragraphs: [
      "A child asks for three possible names for a creature, then invents a fourth from two of them. The parent helps with the tool and protects private information. The story can keep growing in the child’s voice, with or without the screen."
    ],
  },
  {
    id: "care-gravity",
    eyebrow: "Repair, not parental shame",
    title: "When care becomes Gravity",
    plain:
      "Gravity appears when one route becomes unquestioned destiny; every family can notice and repair it.",
    paragraphs: [
      "The aim is not perfect parenting. It is to make responsibility visible and repair the next part that can be repaired.",
    ],
    cards: [
      {
        "id": "hidden-brief",
        "title": "The hidden brief",
        "body": "Make anything secretly means make my answer.",
        "repair": "Name the constraint; call a required form instruction and accept surprise when it is truly open."
      },
      {
        "id": "safety-expands",
        "title": "Safety covers every uncertainty",
        "body": "Mess, failure, judgment, or wasted money is renamed danger.",
        "repair": "Name the concrete risk, hold that boundary, and reopen choices outside it."
      },
      {
        "id": "absent-keeper",
        "title": "The absent Keeper",
        "body": "It is your choice transfers adult burdens to the child.",
        "repair": "Take back adult responsibility for risk, cost, time, cleanup, and consequences."
      },
      {
        "id": "explanation-interrupts",
        "title": "Explanation interrupts action",
        "body": "Questions and corrections arrive before the child can complete a movement.",
        "repair": "Ask when input is wanted; offer one relevant technique and return to the whole."
      }
    ],
  },
] as const satisfies readonly PathwaySection[];

const parentPractices = [
  {
    "id": "parent-what-grounds-flight",
    "title": "What Grounds Flight?",
    "summary": "Separate a recurring conflict into visible facts, adult responsibility, possible Gravity, a fixed frame, and an open part.",
    "action": "Write one next-time sentence naming what the adult must hold and what the child can truly author.",
    "completion": "You can name what is fixed and what remains open, or the part you still need to discuss.",
    "guardrail": "Use after the moment, never instead of immediate safety action; the result is not a family diagnosis or score.",
    "prompts": [
      "What I must hold…",
      "What the child can truly author…"
    ],
    "atlasExperienceId": "EXP-01",
    "href": "/atlas/what-grounds-flight"
  },
  {
    "id": "parent-instruction-invitation",
    "title": "Instruction or Invitation?",
    "summary": "Test one familiar sentence against what is required, why it is required, what is open, and whether no can survive.",
    "action": "Rewrite the sentence in the honest mode and name the behaviour that will make the openness real.",
    "completion": "The words and the actual distribution of choice agree.",
    "guardrail": "Do not soften an unavoidable instruction into manipulation or weaken a necessary safety boundary.",
    "prompts": [
      "What is required?",
      "Why?",
      "What is genuinely open?",
      "Can no survive?"
    ],
    "atlasExperienceId": "EXP-03",
    "href": "/atlas/instruction-or-invitation"
  },
  {
    "id": "parent-ground-landing",
    "title": "Ground Landing",
    "summary": "Close, pause, care, repair, ask for help, or rest at the end of a family attempt.",
    "action": "Name only what should be put away, returned, cleaned, kept safely, repaired, helped, or left undecided.",
    "completion": "The present cycle no longer demands hidden attention.",
    "guardrail": "Close with no next project required; rest is not a productivity technique.",
    "atlasExperienceId": "EXP-09",
    "href": "/atlas/ground-landing"
  }
] as const satisfies readonly PracticeCard[];

const parentScenes = [
  {
    "id": "parent-scene-02",
    "title": "Starting a home project",
    "situation": "“Make anything,” says the adult, pausing a video beside the materials. The child makes the roof crooked. A hand reaches over to straighten it.",
    "unhelpfulPattern": "Say make anything while requiring the example from a video.",
    "groundedResponse": "The hand can stop. “I was expecting the one in the video. What are you making?” The child may turn the screen away. The table still needs to be clear in forty minutes.",
    "principle": "The material and boundary are real; the example remains a map, not the hidden answer."
  },
  {
    "id": "parent-scene-04",
    "title": "A tool becomes unsafe",
    "situation": "A fastening has come loose and the tool can hurt someone.",
    "unhelpfulPattern": "Use a false invitation while expecting immediate compliance.",
    "groundedResponse": "Stop the action directly, make the tool safe, then reopen continue, demonstration, another tool, or ending.",
    "principle": "The adult owns the safety duty; choice returns when it becomes real."
  },
  {
    "id": "parent-scene-08",
    "title": "A fort occupies shared space",
    "situation": "A blanket fort reaches across the doorway. Someone carrying dinner cannot get through. From inside comes a voice: “But that is the sea.”",
    "unhelpfulPattern": "Let the creative project erase consent and shared access.",
    "groundedResponse": "The passage has to open. The adult names that limit and waits. Perhaps the sea acquires a ferry, perhaps the fort moves, perhaps the building ends for today. Other people still need their way through.",
    "principle": "Authorship does not cancel consent."
  },
  {
    "id": "parent-scene-10",
    "title": "The parent has no Lift",
    "situation": "The adult lacks enough attention or energy for the planned activity.",
    "unhelpfulPattern": "Push through to perform availability and become unsafe or resentful.",
    "groundedResponse": "Name the limit and offer a smaller paper version, preparation, help, another time, or stopping.",
    "principle": "The parent is part of the conditions; low Lift changes the attempt, not anyone's worth."
  },
  {
    "id": "parent-scene-11",
    "title": "Sharing the result",
    "situation": "A parent wants to show, post, or narrate a child's form.",
    "unhelpfulPattern": "Treat public praise as proof that the activity mattered.",
    "groundedResponse": "Offer privacy, one person, a specific question, or wider sharing; do not post without agreement.",
    "principle": "Return can be real without compulsory publicity; actual effects still receive care."
  }
] as const satisfies readonly SceneCard[];

const adultSections = [
  {
    id: "invariant",
    eyebrow: "An old question",
    title: "Flight is an event, not a kind of person",
    plain:
      "A long season on Ground can hold more than anyone sees.",
    paragraphs: [
      "Imagine finding an old notebook while looking for a receipt. Half a page of a story; a sentence crossed out twice. You remember the room in which you wrote it before you remember what the story was about.",
      "The notebook can stay open beside tonight’s bills. Neither page has to explain away the other.",
    ],
  },
  {
    id: "purpose",
    eyebrow: "A direction is enough",
    title: "Purpose is a practice, not a hidden assignment",
    plain:
      "Purpose is a way of meeting what is unfinished, not one mission buried inside you.",
    paragraphs: [
      "An old question may return in a different shape. The story you wanted to publish becomes a letter to one person. A wish to build something becomes a shelf that finally fits an awkward corner. The answer can matter at this size.",
      "Some questions stay with us for decades. Others finish their work in one afternoon.",
    ],
  },
  {
    id: "present-life",
    eyebrow: "The available material",
    title: "Begin from the life you already have",
    plain:
      "The present body, ties, skills, obligations, and energy are the starting material, not an obstacle to real life.",
    paragraphs: [
      "This does not make every commitment sacred. It means seeing what is real clearly enough to choose within it, negotiate, ask for help, or responsibly change it.",
      "Maintenance, care, administration, recovery, and sleep are part of Ground. They need no poetic title to deserve respect.",
    ],
  },
  {
    id: "ground-gravity",
    eyebrow: "Two different pulls",
    title: "Ground is not Gravity",
    plain:
      "Ground is the reality that supports and limits an attempt; Gravity is an unexamined route hardened into destiny.",
    paragraphs: [
      "Money, care, craft, work, AI, and rest can each be honest conditions. They become Gravity language when one response is made morally compulsory and alternatives can no longer be discussed.",
      "Some doors are materially locked. The honest movement may be to name the door, find company, seek qualified help, or stop calling it a personal failure.",
    ],
    cards: [
      { id: "money", title: "Money", body: "Reliable income may be necessary now.", detail: "Gravity says serious adults may make only what has a market." },
      { id: "care", title: "Care", body: "Choices affect people who depend on us.", detail: "Gravity says care erases every question of one's own." },
      { id: "craft", title: "Craft", body: "A form may require repetition and skills not yet learned.", detail: "Gravity says not being exceptional immediately proves the question was false." },
      { id: "work", title: "Work", body: "Some tasks belong to an accepted or currently unavoidable agreement.", detail: "Gravity says a role is the whole truth about what one may want." },
      { id: "ai", title: "AI", body: "A tool can make some versions faster.", detail: "Gravity says machine capability makes human attention and judgment worthless." },
      { id: "rest", title: "Rest", body: "Capacity can be low and recovery necessary.", detail: "Gravity says rest must be earned by future output." },
    ],
  },
  {
    id: "maps",
    eyebrow: "Guidance without surrender",
    title: "Maps, scaffolds, and authored direction",
    plain:
      "Outside knowledge can protect and teach; authorship does not require purity from influence.",
    paragraphs: [
      "A teacher’s way of holding a tool may still serve you well. A sentence about what “people like us” should want may no longer fit. They can be examined separately. Gratitude leaves room for disagreement."
    ],
  },
  {
    id: "adult-cycle",
    eyebrow: "A revisable arc",
    title: "Call → Compass → Lift → Making → Flight → Return → Ground",
    plain:
      "A question takes shape, meets the world, and comes back changed.",
    paragraphs: [
      "Call draws attention. Compass finds a direction among real limits and other lives. Lift is the support that makes a beginning possible. Making gives the answer a body; Flight lets it meet something beyond intention. Return receives what happened. Ground holds what comes after.",
      "The path can turn back, wait, or end. Its shape is easier to see after the encounter.",
    ],
  },
  {
    id: "craft",
    eyebrow: "Intention meets resistance",
    title: "Craft, error, repetition, and boredom belong",
    plain:
      "Learning how material behaves does not make imagination less free.",
    paragraphs: [
      "A line wobbles. A joint will not fit. You try again, adjusting the pressure, and suddenly your hand understands something the instructions could only describe. For a moment, the work holds your whole attention.",
      "Repetition can bring that pleasure. It can also tire you. Boredom is not proof that a route is wrong; difficulty is not proof that it is right.",
    ],
  },
] as const satisfies readonly PathwaySection[];

const adultPractices = [
  {
    "id": "adult-problem-finder",
    "title": "Problem Finder",
    "summary": "Turn one noticed mismatch into a possible question—or an honest refusal.",
    "time": "10 minutes",
    "action": "Finish: I notice…, I care because…, A possible question is…. Then answer yes, no, not now, or differently.",
    "completion": "The mismatch becomes one possible question or a complete non-answer.",
    "guardrail": "Pain, fear, and irritation are not automatically Calls. Safety, rest, or help may come first.",
    "atlasExperienceId": "EXP-02",
    "href": "/atlas/problem-finder"
  },
  {
    "id": "adult-one-day-form",
    "title": "One-Day Form",
    "summary": "Give one question a small form that reality can answer.",
    "time": "20–60 minutes; never more than one day",
    "action": "Choose a note, sketch, repair, request, conversation, arrangement, boundary, small test, or decision; define the stop point first.",
    "completion": "Someone can read it, use it, try it, or answer it.",
    "guardrail": "This is not a compulsory first instalment of a large project."
  },
  {
    "id": "adult-boring-hinge",
    "title": "The Boring Hinge",
    "summary": "Practise the small craft operation on which a larger action turns.",
    "time": "15 minutes",
    "action": "Practise one hinge slowly, then perform or view the whole action once and keep only what helps it.",
    "completion": "Technique has returned to the living form.",
    "guardrail": "Mastery is not a moral rank, and exhaustion is not disciplined practice."
  },
  {
    "id": "adult-relationship-check",
    "title": "Relationship and Obligation Check",
    "summary": "Make freedom and responsibility visible before a consequential change.",
    "time": "15 minutes",
    "action": "List affected people, real promises and dependencies, needed consent, negotiable parts, and what remains yours; plan one conversation or reduce the stakes.",
    "completion": "The experiment is responsibly bounded or deliberately paused.",
    "guardrail": "Do not call every tie Gravity or every constraint sacred Ground; seek outside help when power makes conversation dangerous."
  },
  {
    "id": "adult-honorable-refusal",
    "title": "Honorable Refusal",
    "summary": "Give no, not now, or differently a real form.",
    "time": "5–20 minutes",
    "action": "Complete: I will not answer this Call now because…. Communicate, offer another form, name a reconsideration condition, or close privately as needed.",
    "completion": "The people who need to know have heard your answer.",
    "guardrail": "Refusal does not erase unavoidable obligations or their effects."
  }
] as const satisfies readonly PracticeCard[];

const adultScenes = [
  {
    id: "adult-scene-a",
    title: "Too many Calls",
    situation: "Many lively ideas together prevent any one of them from meeting reality.",
    groundedResponse: "Write the ideas where you can return to them. One may fit the time and commitments you have now. Choosing it leaves the others on the page.",
    principle: "Unchosen ideas are not failed destinies; the aim is one authored encounter or honest Ground.",
  },
  {
    id: "adult-scene-b",
    title: "The tired adult",
    situation: "A wanted question appears after work and care when the adult can barely stay awake.",
    unhelpfulPattern: "Call exhaustion fear, prescribe discipline as proof of desire, or allow rest only as fuel for output.",
    groundedResponse: "The notebook is open, but the same sentence has been read three times. Close it and leave a scrap of paper at the line. Eat, sleep, ask for help if you need it. The scrap can keep the place.",
    principle: "Rest belongs to this life, whether the notebook opens tomorrow or much later.",
  },
  {
    id: "adult-scene-c",
    title: "AI proposes the destination",
    situation: "AI returns a polished, plausible public project that was not the adult's question before the prompt.",
    unhelpfulPattern: "Treat fluency or predicted demand as purpose, or defend humanity only by claiming the machine is worse.",
    groundedResponse: "Name the proposal as a Wind-shaped map, recover the prior observation, ask whose question it is, then reject, keep as reference, or deliberately transform one part.",
    principle: "Direction, adoption, affected relationships, and Return remain human whether AI is used or refused.",
  },
] as const satisfies readonly SceneCard[];

const adultInvitationDeck = {
  id: "adult-thirty-invitations",
  title: "Thirty invitations",
  introduction:
    "A page to wander through. A question may stay with you after the book is closed.",
  guardrail:
    "Read in any order; there is nothing to complete.",
  cards: [
    { id: "adult-card-01", number: 1, phase: "Notice", prompt: "Which small inconvenience have you stopped noticing?" },
    { id: "adult-card-02", number: 2, phase: "Notice", prompt: "What do you care for that has never appeared on a list of ambitions?" },
    { id: "adult-card-03", number: 3, phase: "Notice", prompt: "What would you still want to make if nobody knew who made it?" },
    { id: "adult-card-04", number: 4, phase: "Notice", prompt: "Whose voice do you hear in “someone like me should…”?" },
    { id: "adult-card-05", number: 5, phase: "Notice", prompt: "What is quietly holding up your day?" },
    { id: "adult-card-06", number: 6, phase: "Notice", prompt: "What catches your eye when you have nowhere to hurry?" },
    { id: "adult-card-07", number: 7, phase: "Choose", prompt: "Which question has returned more than once?" },
    { id: "adult-card-08", number: 8, phase: "Choose", prompt: "What makes it matter at this moment?" },
    { id: "adult-card-09", number: 9, phase: "Choose", prompt: "Who else would live with the answer?" },
    { id: "adult-card-10", number: 10, phase: "Choose", prompt: "What must remain safe while you try?" },
    { id: "adult-card-11", number: 11, phase: "Choose", prompt: "What discovery would make you change direction?" },
    { id: "adult-card-12", number: 12, phase: "Choose", prompt: "Which old instruction still helps your hands?" },
    { id: "adult-card-13", number: 13, phase: "Give form", prompt: "What is within reach today: a whole afternoon, ten minutes, another person?" },
    { id: "adult-card-14", number: 14, phase: "Give form", prompt: "Which part could become possible with help?" },
    { id: "adult-card-15", number: 15, phase: "Give form", prompt: "How small could this idea become and still interest you?" },
    { id: "adult-card-16", number: 16, phase: "Give form", prompt: "What could you put on the table for a first encounter?" },
    { id: "adult-card-17", number: 17, phase: "Give form", prompt: "Where does your hand hesitate? Try that movement slowly." },
    { id: "adult-card-18", number: 18, phase: "Give form", prompt: "What would let you put the work down for tonight?" },
    { id: "adult-card-19", number: 19, phase: "Meet and Return", prompt: "Who might want to see this? Ask before handing it over." },
    { id: "adult-card-20", number: 20, phase: "Meet and Return", prompt: "What surprised you in the answer?" },
    { id: "adult-card-21", number: 21, phase: "Meet and Return", prompt: "What did the material teach you that the plan could not?" },
    { id: "adult-card-22", number: 22, phase: "Meet and Return", prompt: "Which part would you like to change, and which part can stay strange?" },
    { id: "adult-card-23", number: 23, phase: "Meet and Return", prompt: "What has come back: a question, a useful thing, a laugh, a need to repair?" },
    { id: "adult-card-24", number: 24, phase: "Meet and Return", prompt: "Who needs an answer from you now?" },
    { id: "adult-card-25", number: 25, phase: "Land", prompt: "What remains different after the materials are put away?" },
    { id: "adult-card-26", number: 26, phase: "Land", prompt: "What ordinary act of care is waiting here?" },
    { id: "adult-card-27", number: 27, phase: "Land", prompt: "Where did the Wind help, and where did you turn away from it?" },
    { id: "adult-card-28", number: 28, phase: "Land", prompt: "Which edge of your old map can you see now?" },
    { id: "adult-card-29", number: 29, phase: "Land", prompt: "What can remain unfinished without keeping you awake?" },
    { id: "adult-card-30", number: 30, phase: "Land", prompt: "Which image from these pages would you carry into tomorrow?" },
  ],
} as const satisfies CardDeck;

const aiSections = [
  {
    id: "wind-meaning",
    eyebrow: "A human-first relationship with power",
    title: "Wind changes movement; it does not choose a destination",
    plain:
      "AI can change speed, options, resistance, and reach without gaining authority over purpose or consequence.",
    paragraphs: [
      "Perhaps the tool found the sentence you had been reaching for. Perhaps it quietly supplied a feeling you do not have. Both can happen in the same paragraph. The work is to recognise the difference.",
      "Wind is powerful and uneven: some routes become easy to see, others disappear in its wake. Compass stays with the people who will live with the choice.",
    ],
  },
  {
    id: "human-assignments",
    eyebrow: "Do not delegate the governing decisions",
    title: "The human assignments",
    plain:
      "AI may contribute material, critique, and craft; it does not receive authority over dignity, purpose, consent, or Return.",
    paragraphs: [
      "Generation is not adoption. Sending the letter means choosing its words and promises. You can keep a phrase, change another, check a claim, or leave the draft unsent.",
    ],
    cards: [
      {
        "id": "consent",
        "title": "Consent",
        "body": "A simulation cannot consent for a maker, collaborator, child, audience, or represented person."
      },
      {
        "id": "care",
        "title": "Care",
        "body": "Generated signs of attention do not replace noticing, listening, remaining reachable, and responding."
      },
      {
        "id": "compass",
        "title": "Compass",
        "body": "AI can supply arguments; values, limits, affected relations, revision, and choice remain human."
      },
      {
        "id": "responsibility",
        "title": "Responsibility and Return",
        "body": "The people or institutions that adopt and act remain answerable for effects."
      }
    ],
  },
  {
    id: "wind-roles",
    eyebrow: "One role at a time",
    title: "Six roles for Wind",
    plain:
      "Naming one bounded role makes the intended relationship visible enough to inspect and reset.",
    paragraphs: [
      "Mirror, Generator, Interlocutor, Critic, Craft aid, and Simulator are contributions, not hidden pilots. If the system begins choosing purpose, criteria, audience, form, and success at once, stop and return those decisions to Compass.",
    ],
  },
  {
    id: "cycle",
    eyebrow: "Wind can enter; it is never an eighth stage",
    title: "AI through the Flight cycle",
    plain:
      "The letter leaves the screen and enters a relationship.",
    paragraphs: [
      "The recipient may notice the sentence you almost removed. They may answer a day later, or ask something no rehearsal predicted. That reply belongs to the encounter. No generated audience can supply it in advance.",
      "Return begins with attending to what actually came back, including silence or a promise that now needs keeping.",
    ],
  },
  {
    id: "human-first-pattern",
    eyebrow: "Where the governing decisions live",
    title: "Human-first does not mean opening the tool last",
    plain:
      "A process may begin with an AI draft and use extensive assistance while remaining human-first.",
    paragraphs: [
      "An AI draft can be the beginning of the work. The important question is whether you can recognise and explain what you choose to keep. A page made with extensive help can carry a considered decision; a sentence typed by hand can repeat someone else’s unexamined answer."
    ],
    cards: [
      {
        "id": "pattern-criteria",
        "title": "Criteria",
        "body": "People name or negotiate criteria and affected relationships.",
        "detail": "Drift imports criteria from defaults, popularity, or confidence."
      },
      {
        "id": "pattern-options",
        "title": "Options",
        "body": "Generated routes remain candidates alongside refusal and delay.",
        "detail": "Drift treats the visible option set as the boundary of imagination."
      },
      {
        "id": "pattern-making",
        "title": "Making",
        "body": "The adopter understands enough to select, alter, explain, and verify the form.",
        "detail": "Drift accepts polish because it feels difficult to challenge."
      }
    ],
  },
  {
    id: "protocol",
    eyebrow: "A voluntary practice",
    title: "Set the Wind",
    plain:
      "Give AI a visible role before fluency becomes direction.",
    paragraphs: [
      "A brief note can hold the question while you work. Give the tool one job, protect private material, and keep the answer small enough to examine. The note is useful for as long as it helps you see your decisions."
    ],
    cards: [
      {
        "id": "step-1",
        "title": "The question",
        "body": "What are you trying to say or make, and who may be affected?"
      },
      {
        "id": "step-3",
        "title": "The help",
        "body": "What one task can the tool help with? Which decisions stay with you?"
      },
      {
        "id": "step-4",
        "title": "The material",
        "body": "Use the minimum necessary context; prefer generic, fictionalised, or person-created material."
      },
      {
        "id": "step-6",
        "title": "The answer",
        "body": "What will you accept, change, reject, or verify before using it?"
      }
    ],
  },
  {
    id: "direction-test",
    eyebrow: "The hardest case is an attractive route",
    title: "Recover direction from a polished proposal",
    plain:
      "An appealing AI proposal is a candidate map, not a discovered purpose.",
    paragraphs: [
      "You asked about a small neighbourhood problem. The reply offers a name, a business, a launch plan. It is easy to begin polishing that plan and forget the person whose difficulty first caught your attention. Put the original question beside the proposal. See whether they still belong together.",
    ],
  },
  {
    id: "family-boundary",
    eyebrow: "Keep the child out of the instrument panel",
    title: "Families use AI without profiling a child",
    plain:
      "The adult keeps safety, privacy, time, limits, and care; the child keeps authorship wherever a real choice exists.",
    paragraphs: [
      "Do not ask AI whether a child is creative, gifted, lazy, resistant, mature, diagnosable, risky, or destined for a path. Do not enter private child material merely to obtain a more personal answer.",
      "Legitimate roles include open-ended material ideas, simpler instructions, several demonstrations, reviewed translation of child-authored text, or questions about conditions the adult controls.",
    ],
  },
  {
    id: "drift-repairs",
    eyebrow: "Failures belong to an encounter, not a person",
    title: "Where the course begins to shift",
    plain:
      "A familiar failure can become easier to notice the next time.",
    paragraphs: [
      "The repair is not trust yourself instead. Compass may require evidence, collaborators, affected people, expertise, traditions, or rules.",
    ],
    cards: [
      {
        "id": "drift-03",
        "title": "An unexamined output is published",
        "body": "The publisher cannot explain or defend the polished form.",
        "repair": "Pause; run Accept, Change, Reject, Verify; check sources and relationships; revise, attribute, or do not publish."
      },
      {
        "id": "drift-04",
        "title": "Options become an avalanche",
        "body": "More generation feels productive while no choice is made.",
        "repair": "Stop, restate the Call, choose two criteria, keep a small set, or return to Ground."
      },
      {
        "id": "drift-05",
        "title": "The critic becomes a judge",
        "body": "Feedback is read as a verdict on ability or worth.",
        "repair": "Separate fact, ethics, craft, and taste; choose legitimate criteria and reject the rank."
      },
      {
        "id": "drift-06",
        "title": "Speed outruns consent",
        "body": "Material is shared or transformed before boundaries are checked.",
        "repair": "Stop distribution, identify affected interests, seek real consent where required, limit use, and repair effects."
      },
      {
        "id": "drift-08",
        "title": "Completion replaces learning",
        "body": "A craft aid performs the operation the person intended to practise.",
        "repair": "Choose learning or delivery consciously, then narrow assistance or change the aim."
      },
      {
        "id": "drift-09",
        "title": "One route becomes invisible normality",
        "body": "Repeated outputs narrow style, assumptions, or represented lives.",
        "repair": "Name the pattern, vary sources and constraints, invite affected perspectives, and keep rejection open."
      },
      {
        "id": "drift-10",
        "title": "“The AI said so”",
        "body": "The AI said so is used after harm.",
        "repair": "Name who chose, approved, and acted; meet the effect; repair the form or process."
      }
    ],
  },
  {
    id: "adoption-attribution",
    eyebrow: "Generation is not adoption",
    title: "Adopt and attribute in proportion to consequence",
    plain:
      "Attribution says where material came from; adoption says who chose to use it and remains answerable.",
    paragraphs: [
      "For work you share, explain the relevant help you used, check what others will rely on, and name who can respond if something is wrong. Public and professional settings may require more: permissions, sources, credit, and the rules of the place where the work will appear."
    ],
  },
  {
    id: "craft-scope",
    eyebrow: "No race for human superiority",
    title: "Choose assistance by meaning, learning, access, and responsibility",
    plain:
      "Craft matters because it helps intention meet material honestly, not because it protects a competitive human advantage.",
    paragraphs: [
      "Sometimes assistance opens a door: a translation reaches someone you could not address; a prototype lets you try an idea while it is still vivid. Sometimes you want to learn the slow operation yourself. Its resistance is part of what you came for.",
      "Choose the help that serves this encounter. Leave room to discover that you need a different kind.",
    ],
  },
] as const satisfies readonly PathwaySection[];

const aiPractices = [
  {
    "id": "ai-adoption-test",
    "title": "The Adoption Test",
    "summary": "Check whether an AI-assisted form is ready to enter a consequential setting.",
    "action": "Answer: What role did AI play? What did it contribute? What was accepted, changed, rejected, or verified? Who and what remain relevant? Who responds if it is wrong?",
    "completion": "The adopter can answer—or reduces the stakes, seeks review, revises, or does not adopt yet.",
    "guardrail": "Attribution does not transfer responsibility, and disclosure does not make unsafe use safe."
  }
] as const satisfies readonly PracticeCard[];

const aiScenes = [
  {
    id: "ai-scene-assistance-without-erasure",
    title: "Assistance without self-erasure",
    situation: "The letter is ready. One sentence remains: “I know exactly how you feel.” The writer stops over it.",
    unhelpfulPattern: "Send it because it sounds competent—or delete it because any assistance would make the letter false.",
    groundedResponse: "The sentence becomes: “I keep wondering how this has been for you.” The letter is less certain now. It leaves room for an answer the writer does not yet know. Before sending, the writer checks the other claims and promises too.",
    principle: "Authorship is not a percentage of human-made words. It is a form the person can recognise, explain, and answer for.",
  },
] as const satisfies readonly SceneCard[];

export const pathways = {
  parent: {
    id: "parent",
    route: "/parents",
    eyebrow: "For parents and responsible caregivers",
    title: "Keep the Sky Open",
    lede:
      "There is a child beside you, making something you cannot yet recognise. There is also a table that everyone needs for dinner. Both belong in this story.",
    plainThesis:
      "A Keeper of Conditions leaves room for surprise while holding the safety, care, and limits that belong to the adult.",
    readerOutcome:
      "Sometimes the important change is in a sentence the adult was about to say.",
    nextStep:
      "What is already decided here, and what can the child still change?",
    sections: parentSections,
    practices: parentPractices,
    sceneCards: parentScenes,
    cardDecks: [],
    guardrails: [
      "The adult holds safety, care, privacy, and consequences the child cannot carry. Emergencies and unavoidable duties are named directly.",
      "A real invitation allows refusal without withdrawing affection. Sharing a child’s work requires their agreement; AI must not be used to profile or rank them.",
      "When a family needs medical, psychological, educational, legal, or social help, the metaphor gives way to concrete care."
    ],
    covenant: [
      "Keep a place at the table for the child who is here now.",
      "When care turns into control, notice it, repair what you can, and make room again."
    ],
    routeLinks: [
      { label: "Instruction or Invitation?", href: "/atlas/instruction-or-invitation", description: "Rewrite one real adult sentence in its honest mode.", kind: "primary" },
      { label: "What Grounds Flight?", href: "/atlas/what-grounds-flight", description: "Separate adult responsibility from a hidden expected result.", kind: "atlas" },
      { label: "Creative Climate Map", href: "/atlas/creative-climate-map", description: "Inspect conditions for one attempt without profiling a child or family.", kind: "atlas" },
      { label: "Ground Landing", href: "/atlas/ground-landing", description: "Close or pause without a required next project.", kind: "atlas" },
      { label: "Set the Wind", href: "/ai", description: "Set a human-first family boundary around AI.", kind: "cross-path" },
      { label: "Remembering Flight", href: "/adults", description: "Apply the same philosophy to your own present life.", kind: "cross-path" },
      { label: "The Return", href: "/manifesto/M10", description: "Read the article on consequence, repair, privacy, and honest endings.", kind: "reference" },
      { label: "Read the Manifesto", href: "/manifesto", description: "See the full worldview behind the parent path.", kind: "reference" },
    ],
  },
  adult: {
    id: "adult",
    route: "/adults",
    eyebrow: "For adults beginning from the life already here",
    title: "Remembering Flight",
    lede:
      "An unfinished question can travel quietly through years of work, meals, errands, and sleep. One day something ordinary brings it back within reach.",
    plainThesis:
      "The life you have gives this question its material: experience, people, limits, and whatever time can be found.",
    readerOutcome:
      "The first opening may be smaller than the change you once imagined.",
    nextStep:
      "A page, a conversation, a repaired object. Something close enough to begin with.",
    sections: adultSections,
    practices: adultPractices,
    sceneCards: adultScenes,
    cardDecks: [adultInvitationDeck],
    guardrails: [
      "Care, income, health, and obligations are real conditions. Naming them does not make an unjust arrangement acceptable.",
      "Changes that affect other people need consent, conversation, and attention to consequences. Where power makes conversation unsafe, seek appropriate outside help.",
      "These pages offer reflection, not diagnosis, treatment, or a promise about your future."
    ],
    covenant: [
      "Begin where life is already happening.",
      "Let what you make return to it, carrying whatever the encounter has taught you."
    ],
    routeLinks: [
      { label: "Problem Finder", href: "/atlas/problem-finder", description: "Turn one observation into a possible Call or honest non-answer.", kind: "primary" },
      { label: "Borrowed Map, Living Compass", href: "/atlas/borrowed-map-living-compass", description: "Choose the present place of one inherited route.", kind: "atlas" },
      { label: "Template Escape", href: "/atlas/template-escape", description: "Try one reversible variation without worshipping novelty.", kind: "atlas" },
      { label: "Flight Log", href: "/atlas/flight-log", description: "Remember one complete or incomplete cycle without tracking a life.", kind: "atlas" },
      { label: "The Return", href: "/atlas/the-return", description: "Meet an effect through learning, repair, privacy, value, or ending.", kind: "atlas" },
      { label: "Ground Landing", href: "/atlas/ground-landing", description: "Close or pause without debt to continue.", kind: "atlas" },
      { label: "Set the Wind", href: "/ai", description: "Choose a bounded role for AI and review adoption.", kind: "cross-path" },
      { label: "Keep the Sky Open", href: "/parents", description: "Carry the framework into unequal adult responsibility with a child.", kind: "cross-path" },
      { label: "Read the Manifesto", href: "/manifesto", description: "Read the twelve governing articles.", kind: "reference" },
    ],
  },
  ai: {
    id: "ai",
    route: "/ai",
    eyebrow: "When the answer arrives first",
    title: "Set the Wind",
    lede:
      "A difficult letter comes back from the machine clear, graceful, and certain. You read it twice. It says more than you meant.",
    plainThesis:
      "Wind can give a thought reach. Its fluency can also carry a promise you never made.",
    readerOutcome:
      "Before sending, there is still a moment to hear your own uncertainty.",
    nextStep:
      "What in this answer can you stand behind when another person reads it?",
    sections: aiSections,
    practices: aiPractices,
    sceneCards: aiScenes,
    cardDecks: [],
    guardrails: [
      "Consent comes from the people involved. A simulation cannot grant it or establish what happened in the world.",
      "Keep private material out of unnecessary requests. Children must not be profiled, diagnosed, or ranked by the system.",
      "Those who choose and use an answer remain responsible for its consequences. Check claims, rights, and professional requirements before others rely on them.",
      "Wind is a metaphor for a relationship with a tool, not a guarantee of any system’s abilities. Human help and a route without AI remain available."
    ],
    covenant: [
      "Let the Wind widen what can be made.",
      "Keep listening for the question beneath the answer."
    ],
    routeLinks: [
      { label: "Set the Wind", href: "/atlas/set-the-wind", description: "Create a bounded Wind agreement and human adoption note.", kind: "primary" },
      { label: "Keep the Sky Open", href: "/parents", description: "Apply the family boundary while retaining unequal adult responsibility.", kind: "cross-path" },
      { label: "Remembering Flight", href: "/adults", description: "Return the tool boundary to a present-life human direction.", kind: "cross-path" },
      { label: "The Return", href: "/atlas/the-return", description: "Meet the effects of an adopted form in a real relationship.", kind: "atlas" },
      { label: "Ground Landing", href: "/atlas/ground-landing", description: "Stop the system and close the cycle without promising another.", kind: "atlas" },
      { label: "Read the Manifesto", href: "/manifesto", description: "See why Wind remains one part of a larger ethical world.", kind: "reference" },
    ],
  },
} as const satisfies Record<PathwayId, PathwayDefinition>;

export const pathwayList = [pathways.parent, pathways.adult, pathways.ai] as const;

export function getPathway(pathwayId: PathwayId): PathwayDefinition {
  return pathways[pathwayId];
}
