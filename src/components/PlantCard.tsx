import { Droplet, Sun, Calendar } from 'lucide-react';
import type { Plant } from '../App';

interface PlantCardProps {
  plant: Plant;
  daysUntilWater: number;
  onClick: () => void;
}

export function PlantCard({ plant, daysUntilWater, onClick }: PlantCardProps) {
  const needsWater = daysUntilWater <= 1;
  const isOverdue = daysUntilWater < 0;

  const getSunlightLabel = (level: string) => {
    switch (level) {
      case 'low':
        return 'Low light';
      case 'medium':
        return 'Medium light';
      case 'high':
        return 'Bright light';
      default:
        return level;
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="relative h-48">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          {needsWater && (
            <div className={`${
              isOverdue ? 'bg-red-500' : 'bg-blue-500'
            } text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg`}>
              <Droplet className="w-3 h-3" />
              {isOverdue ? 'Overdue' : 'Water soon'}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-gray-900 mb-1">{plant.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{plant.species}</p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Droplet className="w-4 h-4 text-blue-500" />
            <span>{daysUntilWater < 0 ? 'Overdue' : daysUntilWater === 0 ? 'Today' : `${daysUntilWater}d`}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-gray-600">
            <Sun className="w-4 h-4 text-yellow-500" />
            <span>{getSunlightLabel(plant.sunlight)}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Every {plant.waterFrequency}d</span>
          </div>
        </div>
      </div>
    </div>
  );
}
