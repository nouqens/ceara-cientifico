
import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty, MinigameResult, MinigameType, TrashItem, BinType } from '../../types';

interface TrashSortingMinigameProps {
  difficulty: Difficulty;
  onComplete: (result: MinigameResult) => void;
}

const RecycleBinIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
); // Updated icon for better representation

const BINS: { type: BinType; name: string; color: string, emoji?: string }[] = [
  { type: 'paper', name: 'Papel', color: 'bg-slate-500', emoji: '📰' },
  { type: 'plastic', name: 'Plástico', color: 'bg-sky-600', emoji: '🧴' },
  { type: 'organic', name: 'Orgânico', color: 'bg-green-700', emoji: '🍎' },
  { type: 'metal', name: 'Metal', color: 'bg-gray-600', emoji: '🔩' }, // Changed color for metal
  { type: 'glass', name: 'Vidro', color: 'bg-cyan-700', emoji: '🍾' },
  { type: 'hazardous', name: 'Perigoso', color: 'bg-red-700', emoji: '☣️' },
];

const generateTrashPool = (difficulty: Difficulty): TrashItem[] => {
  const items: Omit<TrashItem, 'id' | 'x' | 'y'>[] = [
    { type: 'paper', name: 'Jornal', emoji: '📰' },
    { type: 'plastic', name: 'Garrafa PET', emoji: '🧴' }, // More specific
    { type: 'organic', name: 'Resto de Maçã', emoji: '🍎' },
    { type: 'metal', name: 'Lata de Alumínio', emoji: '🥫' },
    { type: 'glass', name: 'Pote de Geleia', emoji: '🏺' }, // Using amphora for jar
    { type: 'hazardous', name: 'Pilha Usada', emoji: '🔋' },
    { type: 'paper', name: 'Caixa de Papelão', emoji: '📦' },
    { type: 'plastic', name: 'Sacola de Supermercado', emoji: '🛍️' },
    { type: 'organic', name: 'Casca de Fruta', emoji: '🍌' }, // Banana for fruit peel
    { type: 'hazardous', name: 'Embalagem de Agrotóxico', emoji: '☠️' }, // Skull for agrotoxin
  ];
  if (difficulty !== Difficulty.Easy) {
    items.push({ type: 'metal', name: 'Prego Enferrujado', emoji: '🔩' });
    items.push({ type: 'glass', name: 'Caco de Vidro', emoji: '🧊' }); // Ice cube for broken glass visually
  }
  if (difficulty === Difficulty.Hard) {
    items.push({ type: 'plastic', name: 'Copo Descartável', emoji: '🥤'});
    items.push({ type: 'hazardous', name: 'Lâmpada Fluorescente', emoji: '💡' });
  }
  return items.map((item, i) => ({ ...item, id: `sort-item-${i}-${Date.now()}`, x:0, y:0 }));
};


export const TrashSortingMinigame: React.FC<TrashSortingMinigameProps> = ({ difficulty, onComplete }) => {
  const trashPool = React.useMemo(() => generateTrashPool(difficulty), [difficulty]);
  const [currentItem, setCurrentItem] = useState<TrashItem | null>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [itemsProcessed, setItemsProcessed] = useState(0);
  const totalItemsToProcess = difficulty === Difficulty.Easy ? 10 : difficulty === Difficulty.Medium ? 15 : 20;
  const maxMistakes = difficulty === Difficulty.Easy ? 5 : difficulty === Difficulty.Medium ? 4 : 3;
  const itemInterval = difficulty === Difficulty.Easy ? 4000 : difficulty === Difficulty.Medium ? 3500 : 3000; // Slightly increased interval
  const [message, setMessage] = useState("Arraste o lixo para a lixeira correta!");

  const [draggedItem, setDraggedItem] = useState<TrashItem | null>(null);

  const spawnNewItem = useCallback(() => {
    if (itemsProcessed >= totalItemsToProcess || mistakes >= maxMistakes) return;
    const randomIndex = Math.floor(Math.random() * trashPool.length);
    setCurrentItem(trashPool[randomIndex]);
  }, [itemsProcessed, totalItemsToProcess, mistakes, maxMistakes, trashPool]);

  useEffect(() => {
    spawnNewItem();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsProcessed]); 


  useEffect(() => {
    if (itemsProcessed >= totalItemsToProcess || mistakes >= maxMistakes) {
      const scorePercent = itemsProcessed > 0 ? (score / itemsProcessed) * 100 : 0;
      onComplete({ type: MinigameType.TrashSorting, scorePercent: Math.max(0, Math.min(100, scorePercent)) });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsProcessed, mistakes, totalItemsToProcess, maxMistakes, score, onComplete]);

  useEffect(() => {
    let timer: number; 
    if (currentItem) {
      timer = window.setTimeout(() => { 
        if(currentItem) { 
          setMessage(`Perdeu! ${currentItem.name} (${currentItem.emoji}) não foi separado. 😟`);
          setMistakes(prev => prev + 1);
          setItemsProcessed(prev => prev + 1);
          setCurrentItem(null); 
        }
      }, itemInterval + 500); // slightly longer to allow animation if any
    }
    return () => window.clearTimeout(timer); 
  }, [currentItem, itemInterval]);


  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: TrashItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    // Optional: For better visual feedback during drag
    // e.dataTransfer.setData('text/plain', item.id); // Not strictly needed for this logic
  };

  const handleDrop = (binType: BinType) => {
    if (draggedItem) {
      // 'chemical' type trash goes into 'hazardous' bin
      const isCorrectBin = draggedItem.type === binType || (draggedItem.type === 'chemical' && binType === 'hazardous');

      if (isCorrectBin) {
        setScore(prev => prev + 1);
        setMessage(`Correto! ${draggedItem.name} (${draggedItem.emoji}) separado. ✅`);
      } else {
        setMistakes(prev => prev + 1);
        setMessage(`Lixeira errada para ${draggedItem.name} (${draggedItem.emoji})! É ${draggedItem.type}. ❌`);
      }
      setItemsProcessed(prev => prev + 1);
      setCurrentItem(null); 
      setDraggedItem(null); 
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  if (itemsProcessed >= totalItemsToProcess || mistakes >= maxMistakes) {
    const finalScorePercent = itemsProcessed > 0 ? (score / itemsProcessed) * 100 : 0;
    const resultMessage = finalScorePercent >= (difficulty === Difficulty.Easy ? 50 : difficulty === Difficulty.Medium ? 65 : 80) 
      ? "Bom trabalho na separação! 👍" 
      : "A separação precisa melhorar. 😟";

    return (
      <div className="modal-content text-slate-100 p-6 rounded-lg shadow-xl max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-sky-300">Separação Concluída!</h2>
        <p className="text-xl mb-2">Pontuação Final: {score} / {itemsProcessed}</p>
        <p className="text-xl mb-4">Erros: {mistakes}</p>
        <p className="text-lg mb-6">{resultMessage}</p>
        {/* The onComplete is called in useEffect, this is just display */}
        <p className="text-slate-400">Aguarde para continuar...</p>
      </div>
    );
  }


  return (
    <div className="modal-content text-slate-100 p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center text-sky-300">Separe os Detritos</h2>
      <p className="text-center mb-1 text-slate-300 h-6">{message}</p> {/* Fixed height for message bar */}
      <div className="flex justify-between mb-4 text-lg text-slate-200">
        <span>Pontuação: {score}</span>
        <span>Itens: {itemsProcessed}/{totalItemsToProcess}</span>
        <span>Erros: {mistakes}/{maxMistakes}</span>
      </div>

      {/* Conveyor Belt */}
      <div className="h-36 bg-slate-700 my-6 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-600 p-2">
        {/* Static background lines for conveyor illusion */}
        <div className="absolute inset-0 flex opacity-20 pointer-events-none">
            {Array.from({length:10}).map((_,i) => (
                <div key={i} className="h-full w-1/10 bg-slate-500 border-r border-slate-400"></div>
            ))}
        </div>

        {currentItem && (
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, currentItem)}
            className="p-3 bg-slate-800 border border-slate-500 rounded-lg shadow-lg cursor-grab z-10 transition-all duration-300 hover:scale-105 flex flex-col items-center"
            title={`Arraste para separar: ${currentItem.name}`}
          >
            <span className="text-4xl select-none" role="img" aria-label={currentItem.name}>
              {currentItem.emoji}
            </span>
            <p className="text-xs text-center mt-1 text-slate-300">{currentItem.name}</p>
          </div>
        )}
        {!currentItem && itemsProcessed < totalItemsToProcess && mistakes < maxMistakes && (
            <p className="text-slate-400 text-lg z-10">Aguardando próximo item...</p>
        )}
      </div>

      {/* Bins */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {BINS.map(bin => (
          <div
            key={bin.type}
            onDrop={() => handleDrop(bin.type)}
            onDragOver={handleDragOver}
            className={`p-3 rounded-lg text-center ${bin.color} text-white font-semibold min-h-[7rem] flex flex-col justify-center items-center transition-all hover:brightness-125 active:brightness-150 ${draggedItem ? 'border-2 border-dashed border-yellow-300 opacity-90' : 'border-2 border-transparent'}`}
          >
            {/* Using bin emoji if available, else icon */}
            {bin.emoji ? 
              <span className="text-2xl mb-1" role="img" aria-label={bin.name}>{bin.emoji}</span> : 
              <RecycleBinIcon className="w-7 h-7 mb-1"/>
            }
            <span className="text-sm sm:text-base">{bin.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
