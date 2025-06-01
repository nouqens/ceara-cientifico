
import { GamePhase, CharacterSpeaker, ChoiceKarma, StoryData, MinigameType } from './types';

export const storyData: StoryData = {
  [GamePhase.StartScreen]: {
    id: GamePhase.StartScreen,
    dialogue: "This phase is handled by the DifficultySelector component.",
    // No nextPhaseOnClick or autoAdvanceTo, App.tsx handles it via onSelectDifficulty
  },

  // --- Lucio Call Sequence ---
  [GamePhase.LucioCall_P1]: {
    id: GamePhase.LucioCall_P1,
    speaker: CharacterSpeaker.Lucio,
    dialogue: "–Temos um problema, Morvus.",
    nextPhaseOnClick: GamePhase.LucioCall_P2,
  },
  [GamePhase.LucioCall_P2]: {
    id: GamePhase.LucioCall_P2,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "A voz de Lucio Avaron soa abafada do outro lado da linha.",
    nextPhaseOnClick: GamePhase.LucioCall_P3,
  },
  [GamePhase.LucioCall_P3]: {
    id: GamePhase.LucioCall_P3,
    speaker: CharacterSpeaker.Morvus,
    dialogue: "–O que foi agora?",
    nextPhaseOnClick: GamePhase.LucioCall_P4,
  },
  [GamePhase.LucioCall_P4]: {
    id: GamePhase.LucioCall_P4,
    speaker: CharacterSpeaker.Lucio,
    dialogue: "–Oito pessoas estão desaparecidas há semanas. Sumiram mesmo. As famílias já fizeram o boletim de ocorrência, a imprensa tá em cima...",
    nextPhaseOnClick: GamePhase.LucioCall_P5,
  },
  [GamePhase.LucioCall_P5]: {
    id: GamePhase.LucioCall_P5,
    speaker: CharacterSpeaker.Morvus,
    dialogue: "–Vá direto ao ponto, detetive. Não te pago para ser repórter.",
    nextPhaseOnClick: GamePhase.LucioCall_P6,
  },
  [GamePhase.LucioCall_P6]: {
    id: GamePhase.LucioCall_P6,
    speaker: CharacterSpeaker.Lucio,
    dialogue: "–Acontece que essas oito pessoas são todas funcionárias da Zyntek. Todas saíram de casa para ir trabalhar e não voltaram, todos os desaparecimentos aconteceram no mesmo dia. Todas as pistas levam à empresa. Querem abrir um inquérito.",
    nextPhaseOnClick: GamePhase.LucioCall_P7,
  },
  [GamePhase.LucioCall_P7]: {
    id: GamePhase.LucioCall_P7,
    speaker: CharacterSpeaker.Morvus,
    dialogue: "–Lúcio, você prometeu que esse tipo de coisa seria resolvido antes mesmo de chegar até mim.",
    nextPhaseOnClick: GamePhase.LucioCall_P8,
  },
  [GamePhase.LucioCall_P8]: {
    id: GamePhase.LucioCall_P8,
    speaker: CharacterSpeaker.Lucio,
    dialogue: "–E eu segurei até onde deu, senhor. Não cabe a mim a decisão de abrir ou não o inquérito, é a corregedoria que decide. Não há nada que eu possa fazer além de te alertar.",
    nextPhaseOnClick: GamePhase.LucioCall_P9,
  },
  [GamePhase.LucioCall_P9]: {
    id: GamePhase.LucioCall_P9,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "O tom de desespero de Lúcio ainda ecoava na minha cabeça quando bati a porta de meu carro com força.",
    autoAdvanceTo: GamePhase.ZyntekArrival_P1, // Transition to next scene
    advanceDelay: 2000,
  },

  // --- Zyntek Arrival Sequence ---
  [GamePhase.ZyntekArrival_P1]: {
    id: GamePhase.ZyntekArrival_P1,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "Quatro horas depois, eu via os silos da Zyntek rasgando o céu nublado no meio do nada.",
    nextPhaseOnClick: GamePhase.ZyntekArrival_P2,
  },
  [GamePhase.ZyntekArrival_P2]: {
    id: GamePhase.ZyntekArrival_P2,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "O portão de entrada estava aberto. Nenhum guarda, nenhum gerente ansioso, nenhum funcionário correndo para avisar que o patrão havia chegado. Nada.",
    nextPhaseOnClick: GamePhase.ZyntekArrival_P3,
  },
  [GamePhase.ZyntekArrival_P3]: {
    id: GamePhase.ZyntekArrival_P3,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "À frente, guindastes, braços hidráulicos, escavadeiras, tudo em silêncio. As máquinas não estavam desligadas. Estavam... paradas. Abandonadas no meio da operação, como se todos tivessem ido embora às pressas.",
    autoAdvanceTo: GamePhase.TreeDiscovery_P1,
    advanceDelay: 2000,
  },

  // --- Tree Discovery Sequence ---
  [GamePhase.TreeDiscovery_P1]: {
    id: GamePhase.TreeDiscovery_P1,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "Desci do carro e fui a pé até a clareira onde estavam as escavadeiras de extração de solo profundo. Foi quando vi a árvore.",
    nextPhaseOnClick: GamePhase.TreeDiscovery_P2,
  },
  [GamePhase.TreeDiscovery_P2]: {
    id: GamePhase.TreeDiscovery_P2,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "A Árvore Mãe, que havia sobrevivido a gerações de chuva, pragas e mudanças climáticas, agora estava no chão. Uma das escavadeiras estava tombada sobre ela, como se tivesse colidido contra a árvore.",
    nextPhaseOnClick: GamePhase.TreeDiscovery_P3,
  },
  [GamePhase.TreeDiscovery_P3]: {
    id: GamePhase.TreeDiscovery_P3,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "No chão ao redor, havia uma névoa dourada, como nunca tinha visto antes. Era um brilho quente, vibrante, que parecia até ter vida.",
    autoAdvanceTo: GamePhase.MistEncounter_P1,
    advanceDelay: 2000,
  },

  // --- Mist Encounter Sequence ---
  [GamePhase.MistEncounter_P1]: {
    id: GamePhase.MistEncounter_P1,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "E então eu vi. As pessoas. Oito delas. De pé, imóveis. Os uniformes da Zyntek ainda visíveis, mas o corpo era de madeira. Madeira seca, e galhos onde antes havia dedos. Eram estátuas. Vivas ou mortas, eu não sabia. Mas estavam ali.",
    nextPhaseOnClick: GamePhase.MistEncounter_P2,
  },
  [GamePhase.MistEncounter_P2]: {
    id: GamePhase.MistEncounter_P2,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "Me aproximei demais. A névoa dourada tocou minha calça. Um calor estranho subiu pela perna, como formigamento.",
    nextPhaseOnClick: GamePhase.MistEncounter_P3,
  },
  [GamePhase.MistEncounter_P3]: {
    id: GamePhase.MistEncounter_P3,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "Me assustei com a sensação, o que me fez dar dois passos para trás, tropeçando numa raiz arrancada. Ao cair sentado na grama, sinto o mesmo formigamento agora adentrar meu nariz. Tentei levantar, mas meu corpo simplesmente não obedecia meu cérebro, estava enfraquecido demais para seguir qualquer comando. Sentia meus olhos pesarem, tentei lutar contra isso, mas só foi uma tentativa em vão.",
    nextPhaseOnClick: GamePhase.MistEncounter_P4,
  },
  [GamePhase.MistEncounter_P4]: {
    id: GamePhase.MistEncounter_P4,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "Então, no centro da névoa, eu a vi. Alta, magra, primaveril. Uma figura feminina foi tudo que eu vi antes de ceder à escuridão que me chamava.",
    autoAdvanceTo: GamePhase.Awakening_P1,
    advanceDelay: 2000,
  },

  // --- Awakening Sequence ---
  [GamePhase.Awakening_P1]: {
    id: GamePhase.Awakening_P1,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "Acordei com o gosto da terra na boca. O corpo doía como se eu tivesse sido arrastado por quilômetros, mas não havia sinal de sangue ou ferimentos.",
    nextPhaseOnClick: GamePhase.Awakening_P2,
  },
  [GamePhase.Awakening_P2]: {
    id: GamePhase.Awakening_P2,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "Me ergui devagar. As raízes da antiga árvore estavam ao meu redor, e no meio delas, ela. A mulher da névoa.",
    autoAdvanceTo: GamePhase.WomanDialogue_P1,
    advanceDelay: 1500,
  },

  // --- Woman Dialogue Sequence ---
  [GamePhase.WomanDialogue_P1]: {
    id: GamePhase.WomanDialogue_P1,
    speaker: CharacterSpeaker.WomanInMist,
    dialogue: "– Você respirou fundo demais.",
    nextPhaseOnClick: GamePhase.WomanDialogue_P2,
  },
  [GamePhase.WomanDialogue_P2]: {
    id: GamePhase.WomanDialogue_P2,
    speaker: CharacterSpeaker.Morvus,
    dialogue: "– O que aconteceu aqui?",
    nextPhaseOnClick: GamePhase.WomanDialogue_P3,
  },
  [GamePhase.WomanDialogue_P3]: {
    id: GamePhase.WomanDialogue_P3,
    speaker: CharacterSpeaker.WomanInMist,
    dialogue: "– Certas portas não deveriam ser abertas. Há coisas que devem ser mantidas. Aquilo que vocês derrubaram segurava mais do que madeira. Segurava os lamentos dos que partiram, e os segredos dos que ficaram. E agora... não guarda mais nada.",
    nextPhaseOnClick: GamePhase.WomanDialogue_P4,
  },
  [GamePhase.WomanDialogue_P4]: {
    id: GamePhase.WomanDialogue_P4,
    speaker: CharacterSpeaker.Morvus,
    dialogue: "– A névoa... as pessoas... o que está acontecendo?",
    nextPhaseOnClick: GamePhase.WomanDialogue_P5,
  },
  [GamePhase.WomanDialogue_P5]: {
    id: GamePhase.WomanDialogue_P5,
    speaker: CharacterSpeaker.WomanInMist,
    dialogue: "– Agora que a raiz foi cortada, o que ela continha se espalha. Coisas que deveriam descansar e que agora acordaram com sede. Você caiu junto. Mas ainda é homem, ainda pode andar com as próprias pernas.",
    nextPhaseOnClick: GamePhase.WomanDialogue_P6,
  },
  [GamePhase.WomanDialogue_P6]: {
    id: GamePhase.WomanDialogue_P6,
    speaker: CharacterSpeaker.Morvus,
    dialogue: "– Me diga o que fazer.",
    nextPhaseOnClick: GamePhase.WomanDialogue_P7,
  },
  [GamePhase.WomanDialogue_P7]: {
    id: GamePhase.WomanDialogue_P7,
    speaker: CharacterSpeaker.WomanInMist,
    dialogue: "– Há árvores dispostas guardá-los. Mas os que vagam precisam ser acalmados primeiro. Eles estão perdidos. E você... – ela me observou como se visse além da pele – vai ter que ser o guia.",
    nextPhaseOnClick: GamePhase.WomanDialogue_P8,
  },
  [GamePhase.WomanDialogue_P8]: {
    id: GamePhase.WomanDialogue_P8,
    speaker: CharacterSpeaker.Morvus,
    dialogue: "– Como?",
    nextPhaseOnClick: GamePhase.WomanDialogue_P9,
  },
  [GamePhase.WomanDialogue_P9]: {
    id: GamePhase.WomanDialogue_P9,
    speaker: CharacterSpeaker.WomanInMist,
    dialogue: "– Vai encontrá-los. Levá-los até onde elas possam repousar de novo.",
    nextPhaseOnClick: GamePhase.WomanDialogue_P10,
  },
  [GamePhase.WomanDialogue_P10]: {
    id: GamePhase.WomanDialogue_P10,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "Ela desapareceu com o vento. E eu fiquei ali, ouvindo a floresta respirar como se esperasse meu próximo passo.",
    autoAdvanceTo: GamePhase.MeetLumen_P1,
    advanceDelay: 2000,
  },

  // --- Dr. Lumen Path ---
  [GamePhase.MeetLumen_P1]: {
    id: GamePhase.MeetLumen_P1,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "A floresta parecia mais viva do que antes, mas não do jeito bom. Parecia respirar. A névoa dourada me perseguia. A cada passo, os galhos se fechavam atrás de mim, e os sons da mata ficavam mais abafados.",
    nextPhaseOnClick: GamePhase.MeetLumen_P2,
  },
  [GamePhase.MeetLumen_P2]: {
    id: GamePhase.MeetLumen_P2,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "Foi então que o vi, sentado numa clareira entre raízes partidas e folhas úmidas: Dr. Lumen, ou o que restava dele. Ele ainda vestia o jaleco. Seus olhos, castanhos fundos, pareciam ver longe, e também dentro.",
    nextPhaseOnClick: GamePhase.MeetLumen_P3,
  },
  [GamePhase.MeetLumen_P3]: {
    id: GamePhase.MeetLumen_P3,
    speaker: CharacterSpeaker.DrLumen,
    dialogue: "– Senhor Sylvax...",
    nextPhaseOnClick: GamePhase.MeetLumen_P4,
  },
  [GamePhase.MeetLumen_P4]: {
    id: GamePhase.MeetLumen_P4,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "Fiquei em silêncio, relembrando daquele homem que já tinha assinado mais laudos de envenenamento do que qualquer outro cientista da Zyntek.",
    nextPhaseOnClick: GamePhase.MeetLumen_P5,
  },
  [GamePhase.MeetLumen_P5]: {
    id: GamePhase.MeetLumen_P5,
    speaker: CharacterSpeaker.DrLumen,
    dialogue: "– Minhas pesquisas aceleraram o fim... agora sou adubo. E você, o que andou fazendo?",
    nextPhaseOnClick: GamePhase.LumenChoice1, // Lead to choices
  },
  [GamePhase.LumenChoice1]: {
    id: GamePhase.LumenChoice1,
    speaker: CharacterSpeaker.DrLumen, // Speaker repeats question for context if choice is on same screen
    dialogue: "E você, o que andou fazendo?",
    choices: [
      { text: "Fiz escolhas terríveis. E agora não sei o que fazer para consertar isso.", karma: ChoiceKarma.Good, responseText: "A culpa é uma raiz traiçoeira, senhor. Cresce mesmo em quem jura ter o solo limpo.", responseNextPhase: GamePhase.LumenDialogueAfterChoice1_P1, nextPhase: GamePhase.LumenDialogueAfterChoice1_P2 }, // nextPhase is backup if responseNextPhase is not handled as intermediate
      { text: "As coisas saíram do controle. Ninguém imaginava que ia dar nisso.", karma: ChoiceKarma.Neutral, responseText: "A culpa é uma raiz traiçoeira, senhor. Muitos dizem isso quando a colheita é amarga.", responseNextPhase: GamePhase.LumenDialogueAfterChoice1_P1, nextPhase: GamePhase.LumenDialogueAfterChoice1_P2 },
      { text: "Olha, ninguém te forçou a nada. Você sabia onde estava se metendo.", karma: ChoiceKarma.Bad, responseText: "A culpa é uma raiz traiçoeira, senhor. E alguns preferem apontá-la nos outros.", responseNextPhase: GamePhase.LumenDialogueAfterChoice1_P1, nextPhase: GamePhase.LumenDialogueAfterChoice1_P2 },
    ],
  },
  // This phase is to show Lumen's response to the choice
  [GamePhase.LumenDialogueAfterChoice1_P1]: {
      id: GamePhase.LumenDialogueAfterChoice1_P1,
      speaker: CharacterSpeaker.DrLumen,
      dialogue: [], // Dialogue will be populated by choiceResponseMessage in App.tsx/StoryDisplay or rely on it being passed
      nextPhaseOnClick: GamePhase.LumenDialogueAfterChoice1_P2,
      // This assumes App.tsx's choiceResponseMessage is used by StoryDisplay
  },
  [GamePhase.LumenDialogueAfterChoice1_P2]: {
    id: GamePhase.LumenDialogueAfterChoice1_P2,
    speaker: CharacterSpeaker.DrLumen,
    dialogue: ["Ele se levantou devagar. Ouvi dizer que você quer consertar sua burrice. Que vai nos levar para outra árvore. É verdade?"],
    nextPhaseOnClick: GamePhase.LumenChoice2,
  },
  [GamePhase.LumenChoice2]: {
    id: GamePhase.LumenChoice2,
    speaker: CharacterSpeaker.DrLumen,
    dialogue: "É verdade?",
    choices: [
      { text: "É. Não vai desfazer o que eu fiz, mas talvez seja uma forma de acertar as coisas.", karma: ChoiceKarma.Good, nextPhase: GamePhase.LumenMinigameIntro_P1 },
      { text: "Sim. Se é isso que vai resolver tudo, eu vou tentar.", karma: ChoiceKarma.Neutral, nextPhase: GamePhase.LumenMinigameIntro_P1 },
      { text: "Se for isso que vai me tirar desse pesadelo, então sim. Vou fazer.", karma: ChoiceKarma.Bad, nextPhase: GamePhase.LumenMinigameIntro_P1 },
    ],
  },
  [GamePhase.LumenMinigameIntro_P1]: {
    id: GamePhase.LumenMinigameIntro_P1,
    speaker: CharacterSpeaker.DrLumen,
    dialogue: "Entendo, mas comigo... não vai ser só falar. Esse solo aqui está morto. Pior que morto: está radioativo. Destruído por tudo que eu criei.",
    nextPhaseOnClick: GamePhase.LumenMinigameIntro_P2,
  },
  [GamePhase.LumenMinigameIntro_P2]: {
    id: GamePhase.LumenMinigameIntro_P2,
    speaker: CharacterSpeaker.DrLumen,
    dialogue: "Se você quer levar minha alma pra outro lugar, vai ter que mostrar que sabe dar vida a algo de novo.",
    nextPhaseOnClick: GamePhase.LumenMinigameIntro_P3,
  },
  [GamePhase.LumenMinigameIntro_P3]: {
    id: GamePhase.LumenMinigameIntro_P3,
    speaker: CharacterSpeaker.DrLumen,
    dialogue: "Apontou para o chão. Do lado dele, brotou uma caixa de madeira com algumas ferramentas simples. Você vai plantar aqui e vai me ajudar a fazer esse solo respirar de novo. Só assim eu vou confiar em você.",
    nextPhaseOnClick: GamePhase.LumenMinigameIntro_P4,
  },
  [GamePhase.LumenMinigameIntro_P4]: {
    id: GamePhase.LumenMinigameIntro_P4,
    speaker: CharacterSpeaker.DrLumen,
    dialogue: "Uma única planta, crescendo de verdade nesse chão, sem máquinas, sem agrotóxicos, e eu vou com você. Se conseguir, a névoa me leva. Sem contestações. Mas se fracassar...",
    triggersMinigame: MinigameType.Planting,
  },
  [GamePhase.LumenMinigameResultGood]: {
    id: GamePhase.LumenMinigameResultGood,
    speaker: CharacterSpeaker.DrLumen,
    dialogue: [
      "Narrator: O broto cresceu forte. Folhas verdes, vibrantes, e um caule firme que já buscava o sol por instinto. Ao redor, o solo parecia respirar. Tinham até insetos.",
      "Dr. Lumen: – Meu Deus... — sussurrou. — Isso aqui é vida de verdade, num lugar onde só deixei morte.",
      "Ele me olhou como se me visse pela primeira vez.",
      "Dr. Lumen: – Você conseguiu o que eu nunca tentei: dar tempo ao mundo. A ciência... era para ser sobre isso. Eu vou com você. Se há esperança nisso, eu quero ajudar."
    ],
    autoAdvanceTo: GamePhase.MeetJoca_P1, advanceDelay: 4000,
  },
  [GamePhase.LumenMinigameResultMedium]: {
    id: GamePhase.LumenMinigameResultMedium,
    speaker: CharacterSpeaker.DrLumen,
    dialogue: [
      "Narrator: O broto nasceu, mas tímido. As folhas tremiam com o vento, e o solo ao redor ainda carregava manchas cinzentas. Havia vida, mas era frágil. Lumen se aproximou com cuidado e tocou o caule.",
      "Dr. Lumen: – Ela tá tentando crescer.",
      "Ele suspirou. Parte de seu corpo parecia mais leve.",
      "Dr. Lumen: – Você tentou. Não acertou tudo, não curou tudo, mas tentou. Isso já é mais do que muita gente já fez por esse chão.",
      "Ele se levantou, encarando a árvore caída ao longe.",
      "Dr. Lumen: – Eu vou."
    ],
    autoAdvanceTo: GamePhase.MeetJoca_P1, advanceDelay: 4000,
  },
  [GamePhase.LumenMinigameResultBad]: {
    id: GamePhase.LumenMinigameResultBad,
    speaker: CharacterSpeaker.DrLumen,
    dialogue: [
      "Narrator: O broto sequer rompeu o solo. A terra ainda parecia seca, como se recusasse aceitar algo novo. O cheiro de produto químico antigo ainda permanecia no ar.",
      "Lumen encarou o chão por longos segundos. Passou um tempo sem dizer nenhuma palavra.",
      "Depois, virou-se para mim com pesar.",
      "Dr. Lumen: – Ela não nasceu. E eu ainda sou veneno.",
      "Ele se afastou do canteiro, a passos pesados.",
      "Dr. Lumen: – Tenta de novo. Volta aqui e planta de verdade. Quando você parar de pensar com cabeça de empresário e começar pensar com a de humano... aí talvez eu confie o bastante pra ir com você."
    ],
    autoAdvanceTo: GamePhase.LumenRetryOrContinue,
  },
  [GamePhase.LumenRetryOrContinue]: { // This phase uses customComponent set in App.tsx
    id: GamePhase.LumenRetryOrContinue,
    dialogue: [], // Content is via customComponent
  },

  // --- Menino Rio (Joca) Path ---
  [GamePhase.MeetJoca_P1]: {
    id: GamePhase.MeetJoca_P1,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "O caminho seguinte era mais úmido. O som de água correndo me guiava, mas não era um som limpo.",
    nextPhaseOnClick: GamePhase.MeetJoca_P2,
  },
  [GamePhase.MeetJoca_P2]: {
    id: GamePhase.MeetJoca_P2,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "Passei por troncos tombados, garrafas plásticas enroscadas em galhos, um pneu semi-afundado onde antes talvez houvesse peixes.",
    nextPhaseOnClick: GamePhase.MeetJoca_P3,
  },
  [GamePhase.MeetJoca_P3]: {
    id: GamePhase.MeetJoca_P3,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "Então o vi. Ouvi primeiro, na verdade. um riso curto, infantil, mas sem alegria. No meio da água rasa e escura, sentado sobre uma pedra, havia um menino. Tinha o corpo pequeno, eu chutaria que tinha uns 10 anos. A pele parecia molhada o tempo todo, como se fosse feita de água e peixinhos fantasmas nadavam através dele, como se fosse feito de memória.",
    nextPhaseOnClick: GamePhase.MeetJoca_P4,
  },
  [GamePhase.MeetJoca_P4]: {
    id: GamePhase.MeetJoca_P4,
    speaker: CharacterSpeaker.MeninoRio,
    dialogue: "– Ei, moço. Você sabe fazer o rio voltar a brincar?",
    nextPhaseOnClick: GamePhase.MeetJoca_P5,
  },
  [GamePhase.MeetJoca_P5]: {
    id: GamePhase.MeetJoca_P5,
    speaker: CharacterSpeaker.MeninoRio,
    dialogue: "Fiquei em silêncio. Ele apertou a garrafinha contra o peito. Meu nome era Joca, mas agora não importa mais. Agora sou parte da água. Antes ela era minha amiga. A gente pescava, dava risada. Antes eu nadava aqui, agora afogo.",
    nextPhaseOnClick: GamePhase.MeetJoca_P6,
  },
  [GamePhase.MeetJoca_P6]: {
    id: GamePhase.MeetJoca_P6,
    speaker: CharacterSpeaker.MeninoRio,
    dialogue: "Ele se virou lentamente. A gente morava ali, ó. — Apontou pro meio do mato. — Tinha casinha, galinha, e minha mãe gostava de cantar. Mas aí vieram as coisas que vocês jogaram. As que tinham cheiro forte, e nome estranho. Ele abaixou a cabeça. A água me deixou doente. E agora não posso mais voltar. Olhou novamente para mim. E você, moço? Cê sente mesmo alguma coisa? Ou só tá aqui porque tá com medo?",
    nextPhaseOnClick: GamePhase.JocaChoice,
  },
  [GamePhase.JocaChoice]: {
    id: GamePhase.JocaChoice,
    speaker: CharacterSpeaker.MeninoRio,
    dialogue: "E você, moço? Cê sente mesmo alguma coisa? Ou só tá aqui porque tá com medo?",
    choices: [
      { text: "Me desculpa, eu devia ter feito algo antes...", karma: ChoiceKarma.Good, responseText: "Ele ergue a garrafinha e olha pra ela como se tivesse ouvido uma música dentro. – Se cê sente de verdade... a água perdoa. Se quiser minha ajuda... tem que fazer ela voltar a brincar.", responseNextPhase: GamePhase.JocaMinigameIntro_P1, nextPhase: GamePhase.JocaMinigameIntro_P2 },
      { text: "Eu vim entender. Só isso. Não posso mudar o que fiz, mas quero saber o que posso fazer agora.", karma: ChoiceKarma.Neutral, responseText: "O menino franziu a testa e deu de ombros. – É... tem gente que só acorda quando pisa no fundo. Se cê quer mesmo saber o que fazer ajuda o rio a respirar de novo. A água escuta quem tenta, mesmo sem saber como.", responseNextPhase: GamePhase.JocaMinigameIntro_P1, nextPhase: GamePhase.JocaMinigameIntro_P2 },
      { text: "Não tenho por que sentir, ninguém mandou vocês morarem tão perto do rio. Não era minha culpa.", karma: ChoiceKarma.Bad, responseText: "O menino se encolheu. A água ao redor de seus pés escureceu. – Cês sempre falam isso. Eu não vou com você se cê só veio pra apontar dedo. A água não carrega gente que machuca. Faz a água voltar a brincar. Eu duvido, com esse jeito seu. Nunca vai conseguir.", responseNextPhase: GamePhase.JocaMinigameIntro_P1, nextPhase: GamePhase.JocaMinigameIntro_P2 },
    ],
  },
  [GamePhase.JocaMinigameIntro_P1]: {
    id: GamePhase.JocaMinigameIntro_P1,
    speaker: CharacterSpeaker.MeninoRio, // Speaker depends on the choice made
    dialogue: [], // Response text from choice populates this via choiceResponseMessage
    nextPhaseOnClick: GamePhase.JocaMinigameIntro_P2, // Proceed to common minigame trigger
  },
  [GamePhase.JocaMinigameIntro_P2]: {
    id: GamePhase.JocaMinigameIntro_P2,
    speaker: CharacterSpeaker.MeninoRio, // Assuming this line is always from Joca
    dialogue: ["(Regardless of response, the challenge is presented) Então, se quiser minha ajuda, ou se só quer se livrar de mim, faz a água voltar a brincar."], // Simplified lead-in
    triggersMinigame: MinigameType.RiverCleaning,
  },
  [GamePhase.JocaMinigameResultGood]: {
    id: GamePhase.JocaMinigameResultGood,
    speaker: CharacterSpeaker.MeninoRio,
    dialogue: [
      "Narrator: O rio correu. Peixinhos nadaram contra a corrente, e uma borboleta azul pousou no ombro do Menino Rio.",
      "Ele deu uma risadinha abafada. Digna de quem tinha esquecido como era rir. Ele enfiou os pés na água e olhou para mim.",
      "Menino Rio: – Você limpou por dentro e por fora. E isso a água escuta mais que qualquer pedido de desculpa. Eu vou com você. Só não esqueça de cuidar bem dela."
    ],
    autoAdvanceTo: GamePhase.MeetZe_P1, advanceDelay: 4000,
  },
  [GamePhase.JocaMinigameResultMedium]: {
    id: GamePhase.JocaMinigameResultMedium,
    speaker: CharacterSpeaker.MeninoRio,
    dialogue: [
      "Narrator: A água voltou a correr, mas devagar. Ainda tinha manchas. Ainda tremia com o peso de entulhos antigos. Mas o rio respirava. E respirar já era muito.",
      "O Menino Rio observava o curso da água, sério.",
      "Menino Rio: –Tem sujeira que o tempo não tira tão fácil. Mas você tentou. Ela sentiu.",
      "Ele chutou a margem, fazendo espirros de água no ar.",
      "Menino Rio: – A gente nem sempre acerta tudo, né? Mas eu vou com você, moço. Só cuida da água onde passar. Ela carrega muita gente."
    ],
    autoAdvanceTo: GamePhase.MeetZe_P1, advanceDelay: 4000,
  },
  [GamePhase.JocaMinigameResultBad]: {
    id: GamePhase.JocaMinigameResultBad,
    speaker: CharacterSpeaker.MeninoRio,
    dialogue: [
      "Narrator: A água mal se moveu. Continuava turva, pesada. O cheiro de químicos ainda era forte.",
      "Menino Rio: – Você tentou… talvez. Mas tentar não limpa o rio. Nem salva o menino que se afogou tentando brincar.",
      "Ele se afastou da margem, a água escurecendo onde ele pisava.",
      "Menino Rio: – Ainda tem alguma coisa em você que escorre igual veneno. E enquanto isso escorrer, eu não posso ir.",
      "A névoa se aproximou, mas ele a afastou com um sopro suave.",
      "Menino Rio: – Tenta de novo, moço. Mas da próxima vez tenta com o coração."
    ],
    autoAdvanceTo: GamePhase.JocaRetryOrContinue,
  },
  [GamePhase.JocaRetryOrContinue]: {
    id: GamePhase.JocaRetryOrContinue,
    dialogue: [], // Custom component
  },

  // --- Zé Podridão Path ---
  [GamePhase.MeetZe_P1]: {
    id: GamePhase.MeetZe_P1,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "Continuei andando. Agora a floresta parecia uma bagunça. Sacolas plásticas pendiam dos galhos como frutos murchos. O chão estava coberto de lixo cheio de bolor, tinham papéis grudados nas raízes e latas vazias com moscas ao redor. O cheiro era ácido, estragado. Era como se um armário de produtos de limpeza tivesse pegado fogo. Tapei o nariz por reflexo, mas não adiantou.",
    nextPhaseOnClick: GamePhase.MeetZe_P2,
  },
  [GamePhase.MeetZe_P2]: {
    id: GamePhase.MeetZe_P2,
    speaker: CharacterSpeaker.Narrator,
    dialogue: "E, no centro de tudo isso, algo se mexia. Era um homem, ou o que restava de um. Usava um uniforme encardido de gari, tão sujo que parecia ter saído de um túmulo, com um cracha escrito Zé. Remexia montes de sacos rasgados com mãos nuas. As unhas esverdeadas. Os olhos... fundos e amarelados, com uma luz que não era vida.",
    nextPhaseOnClick: GamePhase.MeetZe_P3,
  },
  [GamePhase.MeetZe_P3]: {
    id: GamePhase.MeetZe_P3,
    speaker: CharacterSpeaker.ZePodridao,
    dialogue: "– Ahhh… Finalmente chegou o chefe.",
    nextPhaseOnClick: GamePhase.MeetZe_P4,
  },
  [GamePhase.MeetZe_P4]: {
    id: GamePhase.MeetZe_P4,
    speaker: CharacterSpeaker.ZePodridao,
    dialogue: "Fiquei parado. Não sei se foi medo ou nojo. – Sabe o que me pegou? — Apontou para o lixo e virou o rosto pra mim. Um lado ainda humano, o outro… carcomido. –Isso aqui. Fui limpar um terreno ali perto da mata. Eu, desavisado, encostei no que ninguém devia encostar. E morri igual lixo, igual me trataram a vida toda. Meu estômago revirou. Ele chutou um saco, que estourou numa nuvem de fumaça ácida. Tossi, e senti o gosto de plástico derretido na garganta.",
    nextPhaseOnClick: GamePhase.MeetZe_P5,
  },
  [GamePhase.MeetZe_P5]: {
    id: GamePhase.MeetZe_P5,
    speaker: CharacterSpeaker.ZePodridao,
    dialogue: "–Tava tudo errado, tudo misturado — continuou ele. — Comida com pilha, vidro com sangue, agulhas usadas com papelão... A figura se aproximou, os passos arrastados soando como rodinhas de carrinho quebrado. –Mas me diz, chefia. Em qual lixeira o senhor vai? A qual lata o senhor pertence? O senhor é daqueles que não tá nem ai, ou está aqui porque se importa?",
    nextPhaseOnClick: GamePhase.ZeChoice,
  },
  [GamePhase.ZeChoice]: {
    id: GamePhase.ZeChoice,
    speaker: CharacterSpeaker.ZePodridao,
    dialogue: "O senhor é daqueles que não tá nem ai, ou está aqui porque se importa?",
    choices: [
      { text: "Eu nunca me importei com onde o lixo ia parar, só me importava que sumisse da minha vista. Queria ter feito diferente...", karma: ChoiceKarma.Good, responseText: "Ele abaixou os olhos. – É... a maioria é assim. O pior não é nem jogar fora, sabe? É esquecer que sempre tem alguém para pegar. Por um segundo, ele pareceu... menos podre, menos morto. – Talvez ainda dê tempo de limpar alguma coisa em você.", responseNextPhase: GamePhase.ZeMinigameIntro_P1, nextPhase: GamePhase.ZeMinigameIntro_P2 },
      { text: "Eu posso até ter feito parte disso, mas eu não fui o único. A culpa não é só minha.", karma: ChoiceKarma.Neutral, responseText: "Ele riu. –Tem muitos culpados, de fato. Mas os chefes sempre têm mais bagagem, né? Pelo menos não fingiu que é santo, já é um começo.", responseNextPhase: GamePhase.ZeMinigameIntro_P1, nextPhase: GamePhase.ZeMinigameIntro_P2 },
      { text: "É muito fácil colocar a culpa nos outros. Você morreu porque não seguiu o protocolo, eu não tenho nada a ver com isso.", karma: ChoiceKarma.Bad, responseText: "Ele parou. Me encarou. – Entendi. Para não ser roubado, é só não ter dinheiro, né? Legal. Soltou uma risada áspera, que ardia mais que o fedor do chorume em seus pés. – Cuidado, chefia. Lixo enterrado volta. Mais cedo ou mais tarde, de um jeito ou de outro, ele volta.", responseNextPhase: GamePhase.ZeMinigameIntro_P1, nextPhase: GamePhase.ZeMinigameIntro_P2 },
    ],
  },
  [GamePhase.ZeMinigameIntro_P1]: {
    id: GamePhase.ZeMinigameIntro_P1,
    speaker: CharacterSpeaker.ZePodridao,
    dialogue: [], // Response text here
    nextPhaseOnClick: GamePhase.ZeMinigameIntro_P2,
  },
  [GamePhase.ZeMinigameIntro_P2]: {
    id: GamePhase.ZeMinigameIntro_P2,
    speaker: CharacterSpeaker.ZePodridao,
    dialogue: "Ele me olhou com um sorriso de canto. –Sabe que eu sempre quis ver gente como o senhor botando a mão no lixo igual eu? Imagina o patrão, com esse cabelinho lambido, esse terno caro, catando lixo? Eu vivi para ver isso, ou morri, né? Ele olhou para mim, olhou para o lixo ao nosso redor, depois para mim de novo. –Se a chefia quer me levar, separa esse lixo aí. Eu quero é ver. Se não quiser morrer aqui como a gente, separe. Ou, se preferir, pode virar só um número igual a gente. O senhor escolhe.",
    triggersMinigame: MinigameType.TrashSorting,
  },
  [GamePhase.ZeMinigameResultGood]: {
    id: GamePhase.ZeMinigameResultGood,
    speaker: CharacterSpeaker.ZePodridao,
    dialogue: [
      "Narrator: Quando terminei de separar tudo, minhas mãos estavam cobertas de poeira e chorume. Zé me observava do alto de uma pilha de lixo, de braços cruzados, e uma expressão quase humana.",
      "Ele ergueu as sobrancelhas e riu, impressionado.",
      "Zé: – Olha só… aprendeu direitinho. É, talvez tenha salvação mesmo. Então eu vou com você, promessa é divida, né?"
    ],
    autoAdvanceTo: GamePhase.EndingTransition, advanceDelay: 3000,
  },
  [GamePhase.ZeMinigameResultMedium]: {
    id: GamePhase.ZeMinigameResultMedium,
    speaker: CharacterSpeaker.ZePodridao,
    dialogue: [
      "Zé fez um som entre um grunhido e um “hmm”. Acho que não o convenci, mas pelo menos não o deixei bravo.",
      "Zé: – Tá, não é perfeito… mas também não é o pior que já vi. Enfim, já é um progresso, fazer o que.",
      "Ele pareceu pensar por um momento.",
      "Zé: –Tá bom, eu vou. Levo meu fedor comigo, mas vou."
    ],
    autoAdvanceTo: GamePhase.EndingTransition, advanceDelay: 3000,
  },
  [GamePhase.ZeMinigameResultBad]: {
    id: GamePhase.ZeMinigameResultBad,
    speaker: CharacterSpeaker.ZePodridao,
    dialogue: [
      "Ele desceu da pilha e veio andando devagar. O olhar, dessa vez, estava morto mesmo.",
      "Zé: –É, sabia que a chefia não ia conseguir passar 5 minutos na minha pele. Como promessa é dívida, já que você não cumpriu a sua, eu também não vou cumprir a minha. Boa morte, senhor. Passar mal."
    ],
    autoAdvanceTo: GamePhase.ZeRetryOrContinue,
  },
  [GamePhase.ZeRetryOrContinue]: {
    id: GamePhase.ZeRetryOrContinue,
    dialogue: [], // Custom component
  },

  // --- Endings ---
  [GamePhase.EndingTransition]: {
    id: GamePhase.EndingTransition,
    speaker: CharacterSpeaker.Narrator,
    dialogue: ["A névoa dourada começou a girar ao meu redor. Devagar, depois mais densa. Eu tentei andar, mas meus pés afundaram na terra. Não conseguia mais ver a floresta, só a névoa. O calor era como de um abraço necessitado. E então, escureceu."],
    // Logic in App.tsx will determine actual ending phase from here. This acts as a lead-in.
    // It should auto-advance to the calculated ending by App.tsx; App.tsx handles this transition.
    // For safety, let's add a short delay before App.tsx likely changes phase again.
    advanceDelay: 100, // Short, App.tsx will take over
  },
  [GamePhase.EndingGood]: {
    id: GamePhase.EndingGood,
    isEnding: true,
    speaker: CharacterSpeaker.Narrator, // Initial speaker
    dialogue: [
      "Motorista: – Doutor Sylvax? Doutor, acorda... o senhor tá bem?", // This line's speaker should be Motorista
      "Narrator: Abri os olhos. Vi rosto do meu motorista, assustado. Estávamos dentro da sede, no carro. Olhei ao redor. Tudo... Normal?",
      "Lá ao fundo, a Árvore Mãe se encontrava ainda de pé, viva.",
      "Morvus: – Que dia é hoje?",
      "Motorista: – Hoje é o primeiro dia da derrubada da área velha, senhor...",
      "Narrator: Eu não esperei. Saí do carro, tropeçando na gravidade. Corri por entre os operários, ouvi gritos de aviso, mas não parei. Subi numa das escavadeiras, puxei o cabo de alimentação. Depois derrubei os painéis de controle, joguei ferramentas longe.",
      "Alguém: – O chefe enlouqueceu!",
      "Narrator: Uma a uma, desliguei as máquinas. Quando olhei de novo, a Árvore ainda estava lá. Como se observasse. Minhas mãos estavam sujas, minha camisa rasgada, e o ar, finalmente, limpo.",
      "Morvus: – Dessa vez… eu escutei."
    ],
    // To handle mixed speakers in endings, each line would need to be its own phase, or StoryDisplay needs to parse "Speaker: line"
    // For now, keeping it simple. The above implies a single block.
    // Proper fix would be to break down endings into parts too if strict speaker per phase is desired.
  },
  [GamePhase.EndingMedium]: {
    id: GamePhase.EndingMedium,
    isEnding: true,
    speaker: CharacterSpeaker.Narrator,
    dialogue: [
      "A névoa voltou. Voltou mais lenta dessa vez, como se me conhecesse. Novamente, senti meus olhos pesarem e meus joelhos cederem. Tudo virou dourado.",
      "Quando acordei, a cadeira rangia sob meu peso. Estava no meu escritório, meu relógio de pulso travado em 23:59.",
      "Havia papéis espalhados sobre a mesa. Relatórios ambientais, propostas de expansão, plantas técnicas da nova escavadeira.",
      "Pela janela, consegui ver, lá fora, as máquinas operando ao longe. A obra estava em andamento. Mas, ao seu redor, vi placas.",
      "“PARE A DESTRUIÇÃO” “XINGU VIVE!”",
      "Gente do lado de fora segurando cartazes, olhos firmes, alguns com máscaras no rosto, outros de mãos dadas.",
      "Voltei o olhar para os documentos na minha frente, peguei o contrato principal. Li uma, duas vezes. Minhas mãos tremiam.",
      "Depois, tranquei tudo numa gaveta. Tranquei. Não assinei. Não rasguei. Fiquei ali por uns segundos, olhando pro nada. O relógio ainda marcava o mesmo horário.",
      "Morvus: – Talvez… ainda dê tempo."
    ],
  },
  [GamePhase.EndingBad]: {
    id: GamePhase.EndingBad,
    isEnding: true,
    speaker: CharacterSpeaker.Narrator,
    dialogue: [
      "A névoa voltou, parecia mais feroz do que nunca. Brilhava como jamais havia visto. Parecia determinada.",
      "Não quis pagar para ver que surpresas ela traria. Corri até meus pulmões queimarem. Faltava o ar.",
      "O chão puxava meus pés, as raízes haviam se familiarizado comigo. Cada passo que dei antes agora voltava contra mim.",
      "Senti minhas pernas enrijecerem e meus dedos se alongarem como galhos.",
      "Ao meu redor, pude enxergar outras estátuas. Todas de terno, todas com olhos vazios e relógios quebrados.",
      "Um saco de lixo foi pendurado na minha mão petrificada. Zé. Ele nem olhou na minha cara, só deixou o peso ali.",
      "E o tempo… finalmente parou.",
      "Morvus (ecoando): – Eu… também… ignorei..."
    ],
  },
};
