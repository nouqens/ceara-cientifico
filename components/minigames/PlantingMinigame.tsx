
import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty, MinigameResult, MinigameType, PlantState } from '../../types';

interface PlantingMinigameProps {
  difficulty: Difficulty;
  onComplete: (result: MinigameResult) => void;
}

const WateringCanIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3.5C7.86 3.5 4.5 6.86 4.5 11H6.5C6.5 7.97 8.97 5.5 12 5.5C15.03 5.5 17.5 7.97 17.5 11H19.5C19.5 6.86 16.14 3.5 12 3.5ZM3 12V14H4V12H3ZM12 7C10.34 7 9 8.34 9 10H15C15 8.34 13.66 7 12 7ZM6 12V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V12H6Z" />
  </svg>
);

const SeedIcon: React.FC<{ className?: string }> = ({ className }) => (
  // Using a plant seed emoji directly might be better, but an icon is fine too.
  // Let's use an emoji for consistency if the main plant is an emoji.
  // For now, keeping SVG if it's for a button, but the main display will be emoji.
  // This SeedIcon is for the button, not the plant itself. The placeholder emoji is used for the "seed" in the pot.
 <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
);


export const PlantingMinigame: React.FC<PlantingMinigameProps> = ({ difficulty, onComplete }) => {
  const [plant, setPlant] = useState<PlantState>({ growth: 0, health: 70, waterLevel: 50, soilNutrients: 50 });
  const [timeLeft, setTimeLeft] = useState(difficulty === Difficulty.Easy ? 90 : difficulty === Difficulty.Medium ? 75 : 60);
  const [hasSeed, setHasSeed] = useState(true); // Represents if the initial seed object is available to be planted
  const [isPlanted, setIsPlanted] = useState(false);
  const [message, setMessage] = useState("Clique no local para plantar a semente. 🌱");

  const difficultyFactor = difficulty === Difficulty.Easy ? 0.8 : difficulty === Difficulty.Medium ? 1 : 1.2;

  const handlePlantSeed = () => {
    if (hasSeed) {
      setIsPlanted(true);
      setHasSeed(false); // Seed is now planted, no longer available as a separate object
      setMessage("Semente plantada! 🌱 Regue e cuide dela.");
      setPlant(prev => ({ ...prev, growth: 5, health: 80 }));
    }
  };

  const handleWater = useCallback(() => {
    if (!isPlanted) { setMessage("Plante a semente primeiro!"); return; }
    setPlant(prev => ({ ...prev, waterLevel: Math.min(100, prev.waterLevel + 25 / difficultyFactor) }));
    setMessage("Planta regada! 💧");
  }, [isPlanted, difficultyFactor]);

  const handleNurture = useCallback(() => { 
    if (!isPlanted) { setMessage("Plante a semente primeiro!"); return; }
    setPlant(prev => ({ ...prev, soilNutrients: Math.min(100, prev.soilNutrients + 20 / difficultyFactor) }));
    setMessage("Solo nutrido! ✨");
  }, [isPlanted, difficultyFactor]);

  useEffect(() => {
    if (!isPlanted || timeLeft <= 0 || plant.growth >= 100 || plant.health <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      setPlant(prev => {
        let newHealth = prev.health;
        let newGrowth = prev.growth;

        const waterConsumption = 1.5 * difficultyFactor;
        const nutrientConsumption = 1 * difficultyFactor;
        let newWaterLevel = Math.max(0, prev.waterLevel - waterConsumption);
        let newSoilNutrients = Math.max(0, prev.soilNutrients - nutrientConsumption);

        if (newWaterLevel < 20 || newWaterLevel > 90) newHealth -= 1.5 * difficultyFactor;
        else if (newWaterLevel > 30 && newWaterLevel < 80) newHealth += 0.5 / difficultyFactor;

        if (newSoilNutrients < 25 || newSoilNutrients > 85) newHealth -= 1 * difficultyFactor;
        else if (newSoilNutrients > 35 && newSoilNutrients < 75) newHealth += 0.4 / difficultyFactor;
        
        newHealth = Math.max(0, Math.min(100, newHealth));

        if (newHealth > 50 && newWaterLevel > 30 && newWaterLevel < 80 && newSoilNutrients > 35 && newSoilNutrients < 75) {
          newGrowth += (1.5 + (difficulty === Difficulty.Easy ? 0.5 : 0) - (difficulty === Difficulty.Hard ? 0.5 : 0));
        }
        newGrowth = Math.min(100, newGrowth);

        return { growth: newGrowth, health: newHealth, waterLevel: newWaterLevel, soilNutrients: newSoilNutrients };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlanted, timeLeft, plant.growth, plant.health, difficultyFactor, difficulty]);


  useEffect(() => {
    if (timeLeft <= 0 || plant.growth >= 100 || plant.health <= 0) {
      if (!isPlanted && timeLeft > 0 && !hasSeed) return; // If seed was never planted but timer is still running.
      if (hasSeed && !isPlanted) { // Seed available but never planted and time ran out.
         onComplete({ type: MinigameType.Planting, scorePercent: 0 });
         return;
      }
      
      let scorePercent = 0;
      if (isPlanted) { // Only calculate score if a seed was planted
        scorePercent = (plant.growth * 0.6) + (plant.health * 0.4);
        scorePercent = Math.max(0, Math.min(100, scorePercent));
      } else {
         scorePercent = 0; 
      }
      
      onComplete({ type: MinigameType.Planting, scorePercent });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, plant.growth, plant.health, isPlanted, hasSeed, onComplete]);


  const getBarColor = (value: number) => {
    if (value > 70) return 'bg-green-500'; 
    if (value > 30) return 'bg-yellow-500'; 
    return 'bg-red-500'; 
  };
  
  const getPlantRepresentation = () => {
    if (!isPlanted) return '🕳️'; // Empty pot/hole or placeholder for seed
    if (plant.health <= 0) return '🥀'; // Wilted flower / dead plant
    if (plant.growth < 30) return '🌱'; // Seedling
    if (plant.growth < 70) return '🪴'; // Potted plant / small plant
    return '🌳'; // Grown tree / healthy plant
  };


  return (
    <div className="modal-content text-slate-100 p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-sky-300">Revitalize o Solo</h2>
      <p className="text-center mb-1 text-slate-300">{message}</p>
      <p className="text-center mb-4 text-slate-300">Tempo Restante: {timeLeft}s</p>

      <div className="flex flex-col items-center space-y-6">
        <div 
          className="relative w-40 h-40 bg-yellow-700 bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-600 cursor-pointer hover:bg-opacity-30 transition-colors"
          onClick={!isPlanted && hasSeed ? handlePlantSeed : undefined}
          title={!isPlanted && hasSeed ? "Clique para plantar a semente" : "Planta"}
        >
          <span className="text-7xl select-none" role="img" aria-label="Representação da planta">
            {getPlantRepresentation()}
          </span>
        </div>

        {isPlanted && (
          <div className="w-full space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-300">Crescimento: {plant.growth.toFixed(0)}%</label>
              <div className="w-full bg-slate-600 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-out" style={{ width: `${plant.growth}%` }}></div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Saúde: {plant.health.toFixed(0)}%</label>
              <div className="w-full bg-slate-600 rounded-full h-4">
                <div className={`${getBarColor(plant.health)} h-4 rounded-full transition-all duration-500 ease-out`} style={{ width: `${plant.health}%` }}></div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Nível de Água: {plant.waterLevel.toFixed(0)}%</label>
              <div className="w-full bg-slate-600 rounded-full h-4">
                <div className={`${getBarColor(plant.waterLevel)} h-4 rounded-full transition-all duration-500 ease-out`} style={{ width: `${plant.waterLevel}%` }}></div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">Nutrientes do Solo: {plant.soilNutrients.toFixed(0)}%</label>
              <div className="w-full bg-slate-600 rounded-full h-4">
                <div className={`${getBarColor(plant.soilNutrients)} h-4 rounded-full transition-all duration-500 ease-out`} style={{ width: `${plant.soilNutrients}%` }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex space-x-4 mt-4">
          <button onClick={handleWater} disabled={!isPlanted || timeLeft <=0 || plant.health <=0} className="btn-secondary flex items-center space-x-2 px-4 py-2">
            <WateringCanIcon className="w-5 h-5"/>
            <span>Regar</span>
          </button>
          <button onClick={handleNurture} disabled={!isPlanted || timeLeft <=0 || plant.health <=0} className="btn-secondary flex items-center space-x-2 px-4 py-2">
            <SeedIcon className="w-5 h-5"/> 
            <span>Nutrir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
