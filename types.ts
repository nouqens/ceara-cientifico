import * as React from 'react';

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

// Adding many new phases for granular dialogue
export enum GamePhase {
  StartScreen = 'START_SCREEN',

  // Lucio Call Sequence
  LucioCall_P1 = 'LUCIO_CALL_P1', // Lucio: –Temos um problema, Morvus.
  LucioCall_P2 = 'LUCIO_CALL_P2', // Narrator: A voz de Lucio Avaron soa abafada...
  LucioCall_P3 = 'LUCIO_CALL_P3', // Morvus: –O que foi agora?
  LucioCall_P4 = 'LUCIO_CALL_P4', // Lucio: –Oito pessoas estão desaparecidas...
  LucioCall_P5 = 'LUCIO_CALL_P5', // Morvus: –Vá direto ao ponto, detetive...
  LucioCall_P6 = 'LUCIO_CALL_P6', // Lucio: –Acontece que essas oito pessoas... (Original had a similar line, refined)
  LucioCall_P7 = 'LUCIO_CALL_P7', // Morvus: –Lúcio, você prometeu...
  LucioCall_P8 = 'LUCIO_CALL_P8', // Lucio: –E eu segurei até onde deu...
  LucioCall_P9 = 'LUCIO_CALL_P9', // Narrator: O tom de desespero de Lúcio...

  // Zyntek Arrival Sequence
  ZyntekArrival_P1 = 'ZYNTEK_ARRIVAL_P1', // Narrator: Quatro horas depois...
  ZyntekArrival_P2 = 'ZYNTEK_ARRIVAL_P2', // Narrator: O portão de entrada estava aberto...
  ZyntekArrival_P3 = 'ZYNTEK_ARRIVAL_P3', // Narrator: À frente, guindastes...

  // Tree Discovery Sequence
  TreeDiscovery_P1 = 'TREE_DISCOVERY_P1', // Narrator: Desci do carro...
  TreeDiscovery_P2 = 'TREE_DISCOVERY_P2', // Narrator: A Árvore Mãe...
  TreeDiscovery_P3 = 'TREE_DISCOVERY_P3', // Narrator: No chão ao redor...

  // Mist Encounter Sequence
  MistEncounter_P1 = 'MIST_ENCOUNTER_P1', // Narrator: E então eu vi. As pessoas...
  MistEncounter_P2 = 'MIST_ENCOUNTER_P2', // Narrator: Me aproximei demais...
  MistEncounter_P3 = 'MIST_ENCOUNTER_P3', // Narrator: Ao cair sentado na grama...
  MistEncounter_P4 = 'MIST_ENCOUNTER_P4', // Narrator: Então, no centro da névoa...

  // Awakening Sequence
  Awakening_P1 = 'AWAKENING_P1', // Narrator: Acordei com o gosto da terra...
  Awakening_P2 = 'AWAKENING_P2', // Narrator: Me ergui devagar...

  // Woman Dialogue Sequence
  WomanDialogue_P1 = 'WOMAN_DIALOGUE_P1', // Woman: – Você respirou fundo demais.
  WomanDialogue_P2 = 'WOMAN_DIALOGUE_P2', // Morvus: – O que aconteceu aqui?
  WomanDialogue_P3 = 'WOMAN_DIALOGUE_P3', // Woman: – Certas portas não deveriam ser abertas...
  WomanDialogue_P4 = 'WOMAN_DIALOGUE_P4', // Morvus: – A névoa... as pessoas...
  WomanDialogue_P5 = 'WOMAN_DIALOGUE_P5', // Woman: – Agora que a raiz foi cortada...
  WomanDialogue_P6 = 'WOMAN_DIALOGUE_P6', // Morvus: – Me diga o que fazer.
  WomanDialogue_P7 = 'WOMAN_DIALOGUE_P7', // Woman: – Há árvores dispostas guardá-los...
  WomanDialogue_P8 = 'WOMAN_DIALOGUE_P8', // Morvus: – Como?
  WomanDialogue_P9 = 'WOMAN_DIALOGUE_P9', // Woman: – Vai encontrá-los...
  WomanDialogue_P10 = 'WOMAN_DIALOGUE_P10', // Narrator: Ela desapareceu com o vento...

  // Meet Lumen Sequence
  MeetLumen_P1 = 'MEET_LUMEN_P1', // Narrator: A floresta parecia mais viva...
  MeetLumen_P2 = 'MEET_LUMEN_P2', // Narrator: Foi então que o vi... Dr. Lumen...
  MeetLumen_P3 = 'MEET_LUMEN_P3', // Dr. Lumen: – Senhor Sylvax...
  MeetLumen_P4 = 'MEET_LUMEN_P4', // Narrator: Fiquei em silêncio...
  MeetLumen_P5 = 'MEET_LUMEN_P5', // Dr. Lumen: – Minhas pesquisas aceleraram o fim... E você, o que andou fazendo?
  LumenChoice1 = 'LUMEN_CHOICE_1',
  LumenDialogueAfterChoice1_P1 = 'LUMEN_DIALOGUE_AFTER_CHOICE_1_P1', // Character response text from choice
  LumenDialogueAfterChoice1_P2 = 'LUMEN_DIALOGUE_AFTER_CHOICE_1_P2', // Dr. Lumen: Ele se levantou devagar... É verdade?
  LumenChoice2 = 'LUMEN_CHOICE_2',
  LumenMinigameIntro_P1 = 'LUMEN_MINIGAME_INTRO_P1', // Dr. Lumen: Entendo, mas comigo...
  LumenMinigameIntro_P2 = 'LUMEN_MINIGAME_INTRO_P2', // Dr. Lumen: Se você quer levar minha alma...
  LumenMinigameIntro_P3 = 'LUMEN_MINIGAME_INTRO_P3', // Dr. Lumen: Você vai plantar aqui...
  LumenMinigameIntro_P4 = 'LUMEN_MINIGAME_INTRO_P4', // Dr. Lumen: Uma única planta... Mas se fracassar...
  LumenMinigame = 'LUMEN_MINIGAME', // This phase is now primarily for triggering, the above are intro dialogues
  LumenMinigameResultGood = 'LUMEN_MINIGAME_RESULT_GOOD',
  LumenMinigameResultMedium = 'LUMEN_MINIGAME_RESULT_MEDIUM',
  LumenMinigameResultBad = 'LUMEN_MINIGAME_RESULT_BAD',
  LumenRetryOrContinue = 'LUMEN_RETRY_OR_CONTINUE',

  // Meet Joca Sequence
  MeetJoca_P1 = 'MEET_JOCA_P1', // Narrator: O caminho seguinte era mais úmido...
  MeetJoca_P2 = 'MEET_JOCA_P2', // Narrator: Passei por troncos tombados...
  MeetJoca_P3 = 'MEET_JOCA_P3', // Narrator: Então o vi... havia um menino.
  MeetJoca_P4 = 'MEET_JOCA_P4', // Menino Rio: – Ei, moço...
  MeetJoca_P5 = 'MEET_JOCA_P5', // Menino Rio: Meu nome era Joca...
  MeetJoca_P6 = 'MEET_JOCA_P6', // Menino Rio: A água me deixou doente... E você, moço?
  JocaChoice = 'JOCA_CHOICE',
  JocaMinigameIntro_P1 = 'JOCA_MINIGAME_INTRO_P1', // Response text from choice
  JocaMinigameIntro_P2 = 'JOCA_MINIGAME_INTRO_P2', // Menino Rio: Faz a água voltar a brincar... (if applicable)
  JocaMinigame = 'JOCA_MINIGAME',
  JocaMinigameResultGood = 'JOCA_MINIGAME_RESULT_GOOD',
  JocaMinigameResultMedium = 'JOCA_MINIGAME_RESULT_MEDIUM',
  JocaMinigameResultBad = 'JOCA_MINIGAME_RESULT_BAD',
  JocaRetryOrContinue = 'JOCA_RETRY_OR_CONTINUE',

  // Meet Zé Sequence
  MeetZe_P1 = 'MEET_ZE_P1', // Narrator: Agora a floresta parecia uma bagunça...
  MeetZe_P2 = 'MEET_ZE_P2', // Narrator: No centro de tudo isso... Zé.
  MeetZe_P3 = 'MEET_ZE_P3', // Zé: – Ahhh… Finalmente chegou o chefe.
  MeetZe_P4 = 'MEET_ZE_P4', // Zé: Sabe o que me pegou?... E morri igual lixo...
  MeetZe_P5 = 'MEET_ZE_P5', // Zé: Mas me diz, chefia... porque se importa?
  ZeChoice = 'ZE_CHOICE',
  ZeMinigameIntro_P1 = 'ZE_MINIGAME_INTRO_P1', // Response text from choice
  ZeMinigameIntro_P2 = 'ZE_MINIGAME_INTRO_P2', // Zé: Sabe que eu sempre quis ver... (if applicable)
  ZeMinigame = 'ZE_MINIGAME',
  ZeMinigameResultGood = 'ZE_MINIGAME_RESULT_GOOD',
  ZeMinigameResultMedium = 'ZE_MINIGAME_RESULT_MEDIUM',
  ZeMinigameResultBad = 'ZE_MINIGAME_RESULT_BAD',
  ZeRetryOrContinue = 'ZE_RETRY_OR_CONTINUE',

  EndingTransition = 'ENDING_TRANSITION',
  EndingGood = 'ENDING_GOOD',
  EndingMedium = 'ENDING_MEDIUM',
  EndingBad = 'ENDING_BAD',
}


export enum CharacterSpeaker {
  Narrator = 'Narrador',
  Morvus = 'Morvus',
  Lucio = 'Lucio Avaron',
  WomanInMist = 'Mulher da Névoa',
  DrLumen = 'Dr. Lumen',
  MeninoRio = 'Menino Rio (Joca)',
  ZePodridao = 'Zé Podridão',
  Motorista = 'Motorista',
  Alguem = 'Alguém',
}

export enum ChoiceKarma {
  Good = 'good',
  Neutral = 'neutral',
  Bad = 'bad',
}

export interface StoryChoice {
  text: string;
  karma: ChoiceKarma;
  nextPhase: GamePhase;
  responseTextFile?: string; 
  responseText?: string; 
  responseNextPhase?: GamePhase; 
}

export interface SceneNode {
  id: GamePhase;
  speaker?: CharacterSpeaker;
  dialogue: string | string[];
  choices?: StoryChoice[];
  nextPhaseOnClick?: GamePhase; 
  autoAdvanceTo?: GamePhase;    
  advanceDelay?: number; 
  triggersMinigame?: MinigameType;
  minigameSuccessPhase?: GamePhase; 
  minigamePartialPhase?: GamePhase; 
  minigameFailPhase?: GamePhase;    
  isEnding?: boolean;
  customComponent?: React.ReactNode;
}

export type StoryData = Partial<Record<GamePhase, SceneNode>>;

export enum MinigameType {
  Planting = 'PLANTING',
  RiverCleaning = 'RIVER_CLEANING',
  TrashSorting = 'TRASH_SORTING',
}

export interface MinigameResult {
  type: MinigameType;
  scorePercent: number; // 0-100
}

export interface GameState {
  currentPhase: GamePhase;
  difficulty: Difficulty;
  karmaScore: number;
  savedSouls: {
    lumen: boolean;
    joca: boolean;
    ze: boolean;
  };
  minigameAttempts: {
    [MinigameType.Planting]: number;
    [MinigameType.RiverCleaning]: number;
    [MinigameType.TrashSorting]: number;
  };
}

// Minigame specific types
export interface PlantState {
  growth: number; // 0-100
  health: number; // 0-100
  waterLevel: number; // 0-100
  soilNutrients: number; // 0-100
}

export interface TrashItem {
  id: string;
  type: 'plastic' | 'metal' | 'glass' | 'organic' | 'paper' | 'chemical' | 'hazardous';
  name: string;
  image?: string; // URL or path - now optional
  emoji?: string; // Emoji representation
  x: number; // position for river game
  y: number; // position for river game
}

export type BinType = 'plastic' | 'metal' | 'glass' | 'organic' | 'paper' | 'hazardous';
