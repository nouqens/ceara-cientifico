
import React from 'react';
import { SceneNode } from '../types';

interface EndingScreenProps {
  endingScene: SceneNode;
  onRestart: () => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({ endingScene, onRestart }) => {
  const dialogueArray = Array.isArray(endingScene.dialogue) ? endingScene.dialogue : [endingScene.dialogue];
  let title = "O Ciclo Continua";
  if (endingScene.id.includes("Good")) title = "Um Novo Amanhecer";
  if (endingScene.id.includes("Bad")) title = "Silêncio Petrificado";
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 bg-opacity-90 text-slate-100">
      <div className="modal-content max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-sky-400">{title}</h1>
        {dialogueArray.map((line, index) => (
          <p key={index} className="mb-3 text-lg text-slate-300 leading-relaxed whitespace-pre-wrap">
            {line}
          </p>
        ))}
        <div className="mt-10 text-center">
          <button
            onClick={onRestart}
            className="btn-primary text-xl px-8 py-3"
          >
            Jogar Novamente
          </button>
        </div>
      </div>
       <footer className="mt-8 text-sm text-slate-500">
          <p>O eco do fim - Um Conto de Escolhas</p>
        </footer>
    </div>
  );
};