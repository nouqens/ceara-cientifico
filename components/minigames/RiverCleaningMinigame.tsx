
import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty, MinigameResult, MinigameType, TrashItem } from '../../types';

interface RiverCleaningMinigameProps {
  difficulty: Difficulty;
  onComplete: (result: MinigameResult) => void;
}

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);


const initialTrashItems = (count: number): TrashItem[] => {
  const types: {type: TrashItem['type'], name: string, emoji: string}[] = [
    { type: 'plastic', name: 'Garrafa Plástica', emoji: '🧴' },
    { type: 'metal', name: 'Lata Enferrujada', emoji: '🥫' },
    { type: 'glass', name: 'Vidro Quebrado', emoji: '🍾' }, // Using a bottle emoji for glass
    { type: 'chemical', name: 'Barril Vazando', emoji: '☣️' }
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const itemDetails = types[i % types.length];
    return {
      id: `trash-${i}-${Date.now()}`,
      type: itemDetails.type,
      name: itemDetails.name,
      emoji: itemDetails.emoji,
      x: Math.random() * 80 + 10, // %
      y: Math.random() * 60 + 20, // %
    };
  });
};


export const RiverCleaningMinigame: React.FC<RiverCleaningMinigameProps> = ({ difficulty, onComplete }) => {
  const initialTrashCount = difficulty === Difficulty.Easy ? 8 : difficulty === Difficulty.Medium ? 12 : 16;
  const [trashItems, setTrashItems] = useState<TrashItem[]>(initialTrashItems(initialTrashCount));
  const [collectedCount, setCollectedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(difficulty === Difficulty.Easy ? 75 : difficulty === Difficulty.Medium ? 60 : 45);
  const [message, setMessage] = useState("Clique nos itens de lixo para removê-los do rio!");

  const difficultySpeedFactor = difficulty === Difficulty.Easy ? 0.3 : difficulty === Difficulty.Medium ? 0.6 : 0.9;


  const handleCollectTrash = useCallback((itemId: string) => {
    setTrashItems(prevItems => prevItems.filter(item => item.id !== itemId));
    setCollectedCount(prev => prev + 1);
    setMessage("Bom trabalho! 👍 Continue limpando.");
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTrashItems(prevItems =>
        prevItems.map(item => ({
          ...item,
          x: (item.x + difficultySpeedFactor * (Math.random() - 0.5) * 2) % 90 + 5, 
          y: (item.y + difficultySpeedFactor * (Math.random() * 0.3 + 0.1)) % 70 + 15, 
        }))
      );
    }, 500);
    return () => clearInterval(interval);
  }, [timeLeft, difficultySpeedFactor]);


  useEffect(() => {
    if (timeLeft > 0 && trashItems.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft <= 0 || trashItems.length === 0) {
      const scorePercent = (collectedCount / initialTrashCount) * 100;
      if (trashItems.length === 0 && timeLeft > 0) {
        setMessage("Rio Limpo! 🎉");
      } else if (timeLeft <= 0 && trashItems.length > 0) {
        setMessage("Tempo Esgotado! 😥");
      }
      onComplete({ type: MinigameType.RiverCleaning, scorePercent: Math.min(100, scorePercent) });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, trashItems.length, collectedCount, initialTrashCount, onComplete]);

  return (
    <div className="modal-content text-slate-100 p-6 rounded-lg shadow-xl max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center text-sky-300">Purifique as Águas</h2>
      <p className="text-center mb-1 text-slate-300">{message}</p>
      <div className="flex justify-between mb-4 text-lg text-slate-200">
        <span>Tempo Restante: {timeLeft}s</span>
        <span>Coletado: {collectedCount}/{initialTrashCount}</span>
      </div>

      <div className="relative w-full h-96 bg-slate-700 bg-opacity-70 border-4 border-slate-500 rounded-lg overflow-hidden">
        {/* Background water effect */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          {Array.from({length: 10}).map((_, i) => (
            <div key={i} className="absolute bg-sky-300 rounded-full animate-pulse" style={{
              width: `${Math.random()*60+20}px`,
              height: '3px',
              left: `${Math.random()*100}%`,
              top: `${Math.random()*100}%`,
              animationDuration: `${Math.random()*3+3}s`,
              animationDelay: `${Math.random()*2}s`
            }}></div>
          ))}
        </div>

        {trashItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleCollectTrash(item.id)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-sky-400 hover:bg-opacity-30 focus:bg-sky-500 focus:bg-opacity-40 outline-none transition-all duration-100"
            style={{ left: `${item.x}%`, top: `${item.y}%`, transitionProperty: 'left, top', transitionDuration: '0.5s', transitionTimingFunction: 'linear' }}
            title={`Coletar ${item.name}`}
          >
            <span className="text-2xl md:text-3xl" role="img" aria-label={item.name}>
              {item.emoji}
            </span>
          </button>
        ))}
         {trashItems.length === 0 && timeLeft > 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-green-300">Rio Limpo! 🎉</p>
        )}
        {timeLeft <= 0 && trashItems.length > 0 && (
           <p className="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-red-300">Tempo Esgotado! 😥</p>
        )}
      </div>
      <div className="mt-4 p-2 bg-slate-700 rounded text-center">
        <TrashIcon className="w-8 h-8 mx-auto text-slate-400"/>
        <p className="text-sm text-slate-300">Área de Coleta de Lixo</p>
      </div>
    </div>
  );
};
