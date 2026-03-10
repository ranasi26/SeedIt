import { useState } from 'react';
import { Droplet, Sprout, Calendar, Plus } from 'lucide-react';
import type { Plant } from '../../App';
import { PlantDetailDialog } from '../PlantDetailDialog';

interface MyGardenTabProps {
  plants: Plant[];
  onUpdatePlant: (plant: Plant) => Promise<void>;
  onDeletePlant: (id: string) => Promise<void>;
}

export function MyGardenTab({ plants, onUpdatePlant, onDeletePlant }: MyGardenTabProps) {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const getDaysUntilWater = (plant: Plant) => {
    const daysSinceWatered = Math.floor(
      (Date.now() - plant.lastWatered.getTime()) / (1000 * 60 * 60 * 24)
    );
    return plant.waterFrequency - daysSinceWatered;
  };

  const getDaysSincePlanted = (plant: Plant) => {
    return Math.floor(
      (Date.now() - plant.plantedDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const plantsNeedingWater = plants.filter(p => getDaysUntilWater(p) <= 0);

  const getStageEmoji = (stage: string) => {
    switch (stage) {
      case 'seed': return '🌱';
      case 'seedling': return '🌿';
      case 'growing': return '🪴';
      case 'mature': return '🌳';
      default: return '🌱';
    }
  };

  if (plants.length === 0) {
    return (
      <div className="p-4">
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Sprout className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-2">Your Garden Awaits</h2>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto">
            Start your gardening journey by adding plants from the Discover tab
          </p>
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-auto">
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">1</div>
                <div>
                  <p className="text-gray-900">Browse recommendations</p>
                  <p className="text-sm text-gray-500">Plants matched to your space</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">2</div>
                <div>
                  <p className="text-gray-900">Add to your garden</p>
                  <p className="text-sm text-gray-500">Track growth and care</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">3</div>
                <div>
                  <p className="text-gray-900">Follow step-by-step guides</p>
                  <p className="text-sm text-gray-500">Learn as you grow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Water Alert */}
      {plantsNeedingWater.length > 0 && (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
          <div className="flex items-start gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Droplet className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="mb-1">
                {plantsNeedingWater.length} plant{plantsNeedingWater.length > 1 ? 's' : ''} need{plantsNeedingWater.length === 1 ? 's' : ''} water
              </p>
              <p className="text-sm text-blue-100">
                {plantsNeedingWater.map(p => p.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 text-center">
          <p className="text-2xl mb-1">{plants.length}</p>
          <p className="text-xs text-gray-600">Plants</p>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center">
          <p className="text-2xl mb-1">{plants.filter(p => p.currentStage === 'mature').length}</p>
          <p className="text-xs text-gray-600">Mature</p>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center">
          <p className="text-2xl mb-1">{plantsNeedingWater.length}</p>
          <p className="text-xs text-gray-600">Need Care</p>
        </div>
      </div>

      {/* Plants List */}
      <div>
        <h3 className="text-gray-900 mb-3 px-1">Your Plants</h3>
        <div className="space-y-3">
          {plants.map(plant => {
            const daysUntilWater = getDaysUntilWater(plant);
            const daysSincePlanted = getDaysSincePlanted(plant);
            const needsWater = daysUntilWater <= 0;
            const isOverdue = daysUntilWater < 0;

            return (
              <div
                key={plant.id}
                onClick={() => setSelectedPlant(plant)}
                className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex gap-4 p-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    {needsWater && (
                      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                        isOverdue ? 'bg-red-500' : 'bg-blue-500'
                      }`}>
                        <Droplet className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-gray-900">{plant.name}</h4>
                        <p className="text-sm text-gray-500">{plant.species}</p>
                      </div>
                      <span className="text-2xl">{getStageEmoji(plant.currentStage)}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{daysSincePlanted}d old</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplet className={`w-3.5 h-3.5 ${needsWater ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className={needsWater ? 'text-blue-600' : ''}>
                          {isOverdue ? 'Overdue!' : daysUntilWater === 0 ? 'Today' : `${daysUntilWater}d`}
                        </span>
                      </div>
                    </div>

                    {/* Progress bar for growth stage */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span className="capitalize">{plant.currentStage}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all"
                          style={{ 
                            width: plant.currentStage === 'seed' ? '25%' : 
                                   plant.currentStage === 'seedling' ? '50%' :
                                   plant.currentStage === 'growing' ? '75%' : '100%'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedPlant && (
        <PlantDetailDialog
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
          onUpdate={onUpdatePlant}
          onDelete={onDeletePlant}
          daysUntilWater={getDaysUntilWater(selectedPlant)}
        />
      )}
    </div>
  );
}
