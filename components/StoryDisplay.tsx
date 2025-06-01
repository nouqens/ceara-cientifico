
import React from 'react';
import { SceneNode, StoryChoice, CharacterSpeaker } from '../types';

interface StoryDisplayProps {
  scene: SceneNode;
  onMakeChoice: (choice: StoryChoice) => void;
  onContinue: () => void;
  isAwaitingMinigame: boolean;
  onStartMinigame: () => void;
  responseMessage?: string;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({
  scene,
  onMakeChoice,
  onContinue,
  isAwaitingMinigame,
  onStartMinigame,
  responseMessage,
}) => {
  const { speaker, dialogue, choices, customComponent, triggersMinigame, nextPhaseOnClick, autoAdvanceTo } = scene;

  const dialogueArray = Array.isArray(dialogue) ? dialogue : [dialogue];

  const showContinueButton = !choices && !customComponent && (nextPhaseOnClick || autoAdvanceTo) && !triggersMinigame;
  const showMinigameButton = !choices && !customComponent && triggersMinigame && isAwaitingMinigame;

  return (
    <div className="min-h-screen flex items-center justify-center p-4" role="dialog" aria-labelledby="dialogTitle" aria-describedby="dialogDescription">
      <div className="modal-content max-w-3xl w-full text-slate-200">
        {speaker && speaker !== CharacterSpeaker.Narrator && (
          <h2 id="dialogTitle" className="text-2xl font-bold mb-4 text-sky-400">{speaker}</h2>
        )}
        {speaker === CharacterSpeaker.Narrator && !dialogueArray.some(line => line.toLowerCase().includes("narrador:")) && (
          <h2 id="dialogTitle" className="sr-only">Cena Narrativa</h2>
        )}

        {responseMessage && (
            <p className="italic text-sky-200 mb-4 p-3 bg-black bg-opacity-40 rounded-md shadow-inner">{responseMessage}</p>
        )}

        <div id="dialogDescription">
          {dialogueArray.map((line, index) => (
            <p key={index} className="mb-4 text-lg leading-relaxed whitespace-pre-wrap">
              {line}
            </p>
          ))}
        </div>

        {customComponent && <div className="my-6">{customComponent}</div>}

        {choices && !customComponent && (
          <div className="mt-8 space-y-3" role="group" aria-label="Escolha uma opção">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => onMakeChoice(choice)}
                className="btn-choice"
                aria-label={choice.text}
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}

        {(showContinueButton || showMinigameButton) && (
          <div className="mt-8 text-center">
            {showMinigameButton ? (
              <button onClick={onStartMinigame} className="btn-primary text-xl">
                Iniciar Desafio
              </button>
            ) : showContinueButton ? (
              <button onClick={onContinue} className="btn-primary text-xl">
                Continuar...
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};