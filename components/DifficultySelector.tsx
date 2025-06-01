
import React from 'react';
import { Difficulty } from '../types';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 bg-opacity-80 text-slate-100">
      <div className="text-center modal-content max-w-lg w-full">
        <h1 className="text-5xl font-bold mb-8 text-sky-400 text-shadow">O Eco do Fim</h1>
        <p className="text-lg mb-10 text-slate-300">
          A Floresta sempre irá se lembrar...
        </p>
        <h2 className="text-3xl font-semibold mb-6 text-sky-300">Escolha Seu Caminho</h2>
        <div className="space-y-4">
          <button
            onClick={() => onSelectDifficulty(Difficulty.Easy)}
            className="btn-primary w-full text-xl"
          >
            Fácil (Uma Brisa Suave)
          </button>
          <button
            onClick={() => onSelectDifficulty(Difficulty.Medium)}
            className="btn-primary w-full text-xl"
          >
            Médio (O Caminho Tortuoso)
          </button>
          <button
            onClick={() => onSelectDifficulty(Difficulty.Hard)}
            className="btn-primary w-full text-xl"
          >
            Difícil (O Matagal Espinhoso)
          </button>
        </div>
        <p className="mt-10 text-sm text-slate-400">
          A dificuldade afeta os desafios dos minigames e as consequências de suas ações.
        </p>
      </div>
    </div>
  );
};