
import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty, GamePhase, GameState, SceneNode, StoryChoice, MinigameType, MinigameResult, ChoiceKarma, CharacterSpeaker } from './types';
import { storyData } from './storyData';
import { DifficultySelector } from './components/DifficultySelector';
import { StoryDisplay } from './components/StoryDisplay';
import { PlantingMinigame } from './components/minigames/PlantingMinigame';
import { RiverCleaningMinigame } from './components/minigames/RiverCleaningMinigame';
import { TrashSortingMinigame } from './components/minigames/TrashSortingMinigame';
import { EndingScreen } from './components/EndingScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentSceneNode, setCurrentSceneNode] = useState<SceneNode | null>(null);
  const [activeMinigame, setActiveMinigame] = useState<MinigameType | null>(null);
  const [choiceResponseMessage, setChoiceResponseMessage] = useState<string | undefined>(undefined);
  const [isLoadingNextScene, setIsLoadingNextScene] = useState<boolean>(false);

  const resetGame = useCallback(() => {
    setGameState(null);
    setCurrentSceneNode(null);
    setActiveMinigame(null);
    setChoiceResponseMessage(undefined);
    setIsLoadingNextScene(false);
  }, []);

  const advanceToPhase = useCallback((phase: GamePhase, choiceResponse?: string) => {
    setIsLoadingNextScene(true);
    setChoiceResponseMessage(choiceResponse); 
    if (choiceResponse && !storyData[phase]?.dialogue.includes(choiceResponse)) {
        setTimeout(() => setChoiceResponseMessage(undefined), 4000); 
    }
    setGameState(prev => prev ? { ...prev, currentPhase: phase } : null);
  }, []);


  useEffect(() => {
    if (gameState && storyData[gameState.currentPhase]) {
      const scene = storyData[gameState.currentPhase]!;
      setCurrentSceneNode(scene);
      setIsLoadingNextScene(false);

      if (scene.autoAdvanceTo && !scene.choices && !scene.customComponent && !scene.nextPhaseOnClick && !activeMinigame && !scene.triggersMinigame) {
        setIsLoadingNextScene(true);
        const delay = scene.advanceDelay !== undefined ? scene.advanceDelay : 2500; 
        const timer = setTimeout(() => {
          setGameState(prev => {
            if (prev && prev.currentPhase === scene.id) {
              return { ...prev, currentPhase: scene.autoAdvanceTo! };
            }
            return prev;
          });
        }, delay);
        return () => clearTimeout(timer);
      }
    }
  }, [gameState?.currentPhase, activeMinigame]);

  const handleSelectDifficulty = useCallback((difficulty: Difficulty) => {
    setGameState({
      currentPhase: GamePhase.LucioCall_P1, 
      difficulty,
      karmaScore: 0,
      savedSouls: { lumen: false, joca: false, ze: false },
      minigameAttempts: {
        [MinigameType.Planting]: 0,
        [MinigameType.RiverCleaning]: 0,
        [MinigameType.TrashSorting]: 0,
      },
    });
  }, []);

  const handleMakeChoice = useCallback((choice: StoryChoice) => {
    if (!gameState) return;
    
    let newKarmaScore = gameState.karmaScore;
    if (choice.karma === ChoiceKarma.Good) newKarmaScore += 1;
    else if (choice.karma === ChoiceKarma.Bad) newKarmaScore -= 1;

    setGameState(prev => prev ? { ...prev, karmaScore: newKarmaScore } : null);

    if (choice.responseText && choice.responseNextPhase) {
        setChoiceResponseMessage(choice.responseText);
        advanceToPhase(choice.responseNextPhase);

    } else {
        advanceToPhase(choice.nextPhase, choice.responseText);
    }

  }, [gameState, advanceToPhase]);
  
  const handleContinue = useCallback(() => {
    if (!gameState || !currentSceneNode) return;
    
    setChoiceResponseMessage(undefined); 

    if (currentSceneNode.nextPhaseOnClick) {
      advanceToPhase(currentSceneNode.nextPhaseOnClick);
    } else if (currentSceneNode.autoAdvanceTo) {
      advanceToPhase(currentSceneNode.autoAdvanceTo);
    } else if (currentSceneNode.triggersMinigame) {
        setActiveMinigame(currentSceneNode.triggersMinigame);
    }
    else {
      console.warn("Continuar clicado em uma cena sem próximo passo definido.");
      setIsLoadingNextScene(false);
    }
  }, [gameState, currentSceneNode, advanceToPhase]);


  const handleStartMinigame = useCallback(() => {
    if (currentSceneNode?.triggersMinigame) {
      setActiveMinigame(currentSceneNode.triggersMinigame);
    }
  }, [currentSceneNode]);

  const handleMinigameComplete = useCallback((result: MinigameResult) => {
    if (!gameState || !currentSceneNode) return;

    const attempts = gameState.minigameAttempts[result.type] + 1;
    let newSavedSouls = { ...gameState.savedSouls };
    let nextPhase: GamePhase | undefined;

    const successThreshold = gameState.difficulty === Difficulty.Easy ? 50 : gameState.difficulty === Difficulty.Medium ? 65 : 80;
    const partialThreshold = gameState.difficulty === Difficulty.Easy ? 30 : gameState.difficulty === Difficulty.Medium ? 45 : 55;
    
    let outcome: 'good' | 'medium' | 'bad' = 'bad';

    if (result.scorePercent >= successThreshold) {
      outcome = 'good';
    } else if (result.scorePercent >= partialThreshold) {
      outcome = 'medium';
    } else {
      outcome = 'bad';
    }
    
    if (result.type === MinigameType.Planting) {
        if (outcome === 'good') { nextPhase = GamePhase.LumenMinigameResultGood; newSavedSouls.lumen = true; }
        else if (outcome === 'medium') { nextPhase = GamePhase.LumenMinigameResultMedium; newSavedSouls.lumen = true; } 
        else { nextPhase = GamePhase.LumenMinigameResultBad; }
    } else if (result.type === MinigameType.RiverCleaning) {
        if (outcome === 'good') { nextPhase = GamePhase.JocaMinigameResultGood; newSavedSouls.joca = true; }
        else if (outcome === 'medium') { nextPhase = GamePhase.JocaMinigameResultMedium; newSavedSouls.joca = true; }
        else { nextPhase = GamePhase.JocaMinigameResultBad; }
    } else if (result.type === MinigameType.TrashSorting) {
        if (outcome === 'good') { nextPhase = GamePhase.ZeMinigameResultGood; newSavedSouls.ze = true; }
        else if (outcome === 'medium') { nextPhase = GamePhase.ZeMinigameResultMedium; newSavedSouls.ze = true; }
        else { nextPhase = GamePhase.ZeMinigameResultBad; }
    }

    setGameState(prev => prev ? {
      ...prev,
      savedSouls: newSavedSouls,
      minigameAttempts: { ...prev.minigameAttempts, [result.type]: attempts },
      currentPhase: nextPhase || prev.currentPhase, 
    } : null);
    setActiveMinigame(null);
    setChoiceResponseMessage(undefined); 
  }, [gameState, currentSceneNode]);

  const handleRetryMinigame = (minigameType: MinigameType) => {
    setChoiceResponseMessage(undefined);
    const introPhaseMap = {
        [MinigameType.Planting]: GamePhase.LumenMinigameIntro_P1,
        [MinigameType.RiverCleaning]: GamePhase.JocaMinigameIntro_P1, 
        [MinigameType.TrashSorting]: GamePhase.ZeMinigameIntro_P1,   
    };
    advanceToPhase(introPhaseMap[minigameType]);
  };

  const handleContinueAfterFail = (minigameType: MinigameType) => {
    setChoiceResponseMessage(undefined);
     const continuePhaseMap = {
        [MinigameType.Planting]: GamePhase.MeetJoca_P1,
        [MinigameType.RiverCleaning]: GamePhase.MeetZe_P1,
        [MinigameType.TrashSorting]: GamePhase.EndingTransition,
    };
    advanceToPhase(continuePhaseMap[minigameType]);
  }

  useEffect(() => {
    if (!gameState) return;

    const assignCustomComponent = (phase: GamePhase, type: MinigameType, message: string) => {
        if (gameState.currentPhase === phase && storyData[phase]) {
            storyData[phase]!.customComponent = (
              <div className="text-center space-y-4">
                <p>{message}</p>
                <button onClick={() => handleRetryMinigame(type)} className="btn-secondary">Tentar Novamente</button>
                <button onClick={() => handleContinueAfterFail(type)} className="btn-secondary">
                    {type === MinigameType.TrashSorting ? "Enfrentar as Consequências" : "Seguir sem sua Alma"}
                </button>
              </div>
            );
        }
    };
    assignCustomComponent(GamePhase.LumenRetryOrContinue, MinigameType.Planting, "Dr. Lumen não encontrou paz com esta tentativa.");
    assignCustomComponent(GamePhase.JocaRetryOrContinue, MinigameType.RiverCleaning, "Joca continua perdido nas águas poluídas.");
    assignCustomComponent(GamePhase.ZeRetryOrContinue, MinigameType.TrashSorting, "Zé Podridão continua preso na sujeira.");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState?.currentPhase, handleRetryMinigame, handleContinueAfterFail]);


  useEffect(() => {
    if (gameState?.currentPhase === GamePhase.EndingTransition) {
      const { karmaScore, savedSouls } = gameState;
      const soulsSavedCount = (savedSouls.lumen ? 1 : 0) + (savedSouls.joca ? 1 : 0) + (savedSouls.ze ? 1 : 0);

      let finalEndingPhase = GamePhase.EndingMedium; 
      if (karmaScore <= -1 && soulsSavedCount < 2) { 
        finalEndingPhase = GamePhase.EndingBad;
      } else if (karmaScore >=1 && soulsSavedCount === 3) {
        finalEndingPhase = GamePhase.EndingGood;
      } else if (soulsSavedCount === 0 && karmaScore < 1) {
         finalEndingPhase = GamePhase.EndingBad;
      }
      else { 
        finalEndingPhase = GamePhase.EndingMedium;
      }
      advanceToPhase(finalEndingPhase);
    }
  }, [gameState?.currentPhase, gameState?.karmaScore, gameState?.savedSouls, advanceToPhase]);


  if (!gameState) {
    return <div className="game-container"><DifficultySelector onSelectDifficulty={handleSelectDifficulty} /></div>;
  }

  if (activeMinigame) {
    let MinigameComponent;
    if (activeMinigame === MinigameType.Planting) MinigameComponent = PlantingMinigame;
    else if (activeMinigame === MinigameType.RiverCleaning) MinigameComponent = RiverCleaningMinigame;
    else if (activeMinigame === MinigameType.TrashSorting) MinigameComponent = TrashSortingMinigame;
    else return <div className="game-container min-h-screen flex items-center justify-center text-white text-xl">Erro: Minijogo desconhecido</div>;

    return (
      <div className="game-container min-h-screen flex items-center justify-center p-4">
        <MinigameComponent difficulty={gameState.difficulty} onComplete={handleMinigameComplete} />
      </div>
    );
  }

  if (currentSceneNode) {
    if (currentSceneNode.isEnding) {
      return <div className="game-container"><EndingScreen endingScene={currentSceneNode} onRestart={resetGame} /></div>;
    }
    return (
      <div className="game-container">
        <StoryDisplay
          scene={currentSceneNode}
          onMakeChoice={handleMakeChoice}
          onContinue={handleContinue} 
          isAwaitingMinigame={!!currentSceneNode.triggersMinigame && !activeMinigame}
          onStartMinigame={handleStartMinigame}
          responseMessage={choiceResponseMessage} 
        />
         {isLoadingNextScene && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out" aria-live="polite" aria-busy="true">
                <p className="text-white text-2xl animate-pulse">Carregando...</p>
            </div>
        )}
      </div>
    );
  }

  return <div className="game-container min-h-screen flex items-center justify-center text-white text-xl">Carregando jogo...</div>;
};

export default App;