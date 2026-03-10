import { useState } from 'react';
import { ArrowLeft, Droplet, Calendar, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { PlantDetailDialog } from '../PlantDetailDialog';
import type { Plant } from '../../App';

interface CareRemindersPageProps {
  plants: Plant[];
  onUpdatePlant: (plant: Plant) => Promise<void>;
  onDeletePlant: (id: string) => Promise<void>;
  onBack: () => void;
}

export function CareRemindersPage({ plants, onUpdatePlant, onDeletePlant, onBack }: CareRemindersPageProps) {
  const [filter, setFilter] = useState<'all' | 'urgent' | 'upcoming'>('all');

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

  const handleWaterPlant = async (plant: Plant) => {
  try {
    const updatedPlant = {
      ...plant,
      lastWatered: new Date()
    };

    await onUpdatePlant(updatedPlant);
  } catch (error) {
    console.error("Failed to mark plant as watered:", error);
    alert("Failed to update watering status.");
  }
};

  // Categorize plants
  const urgentPlants = plants.filter(p => getDaysUntilWater(p) <= 0);
  const todayPlants = plants.filter(p => getDaysUntilWater(p) === 0);
  const upcomingPlants = plants.filter(p => getDaysUntilWater(p) > 0 && getDaysUntilWater(p) <= 2);
  const allGoodPlants = plants.filter(p => getDaysUntilWater(p) > 2);
  

  const filteredPlants = filter === 'urgent' 
    ? [...urgentPlants, ...todayPlants]
    : filter === 'upcoming'
    ? upcomingPlants
    : plants;

  const totalReminders = urgentPlants.length + todayPlants.length + upcomingPlants.length;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex-shrink-0 bg-white p-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h2 className="text-gray-900">Care Reminders</h2>
        <p className="text-gray-600">
          {totalReminders} task{totalReminders !== 1 ? 's' : ''} need{totalReminders === 1 ? 's' : ''} your attention
        </p>
      </div>

      {plants.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">No Plants Yet</h3>
            <p className="text-gray-600">
              Add plants to your garden to start tracking care reminders
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Filter Tabs */}
          <div className="flex-shrink-0 bg-white px-4 py-3 border-b border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  filter === 'all'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({plants.length})
              </button>
              <button
                onClick={() => setFilter('urgent')}
                className={`px-4 py-2 rounded-xl transition-all relative ${
                  filter === 'urgent'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Urgent ({urgentPlants.length + todayPlants.length})
                {(urgentPlants.length + todayPlants.length) > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    !
                  </span>
                )}
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  filter === 'upcoming'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Soon ({upcomingPlants.length})
              </button>
            </div>
          </div>

          {/* Reminders List */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Overdue Section */}
            {urgentPlants.length > 0 && (filter === 'all' || filter === 'urgent') && (
              <div className="mb-4">
                <h3 className="text-red-600 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Overdue
                </h3>
                <div className="space-y-2">
                  {urgentPlants.map(plant => {
                    const daysUntilWater = getDaysUntilWater(plant);
                    const daysSincePlanted = getDaysSincePlanted(plant);
                    
                    return (
                      <div
                        key={plant.id}
                        onClick={() => setSelectedPlant(plant)}
                        className="bg-white rounded-2xl p-4 border-2 border-red-200 cursor-pointer hover:shadow-md transition-all"
                      >
                        <div className="flex gap-3">
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h4 className="text-gray-900">{plant.name}</h4>
                                <p className="text-sm text-gray-500">{plant.species}</p>
                              </div>
                              <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs flex-shrink-0">
                                {Math.abs(daysUntilWater)}d overdue
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                              <Droplet className="w-4 h-4 text-red-500" />
                              <span>Last watered {Math.abs(daysUntilWater) + plant.waterFrequency} days ago</span>
                            </div>

                            <button
                              onClick={(e) => {
                              e.stopPropagation();
                              handleWaterPlant(plant);
                            }}
                              className="w-full bg-red-500 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                            >
                              <Droplet className="w-4 h-4" />
                              Mark as Watered
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Today Section */}
            {todayPlants.length > 0 && (filter === 'all' || filter === 'urgent') && (
              <div className="mb-4">
                <h3 className="text-blue-600 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Due Today
                </h3>
                <div className="space-y-2">
                  {todayPlants.map(plant => {
                    const daysSincePlanted = getDaysSincePlanted(plant);
                    
                    return (
                      <div
                        key={plant.id}
                        onClick={() => setSelectedPlant(plant)}
                        className="bg-white rounded-2xl p-4 border-2 border-blue-200 cursor-pointer hover:shadow-md transition-all"
                      >
                        <div className="flex gap-3">
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h4 className="text-gray-900">{plant.name}</h4>
                                <p className="text-sm text-gray-500">{plant.species}</p>
                              </div>
                              <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex-shrink-0">
                                Today
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                              <Droplet className="w-4 h-4 text-blue-500" />
                              <span>Water every {plant.waterFrequency} day{plant.waterFrequency > 1 ? 's' : ''}</span>
                            </div>

                            <button
                               onClick={(e) => {
                               e.stopPropagation();
                              handleWaterPlant(plant);
                            }}
                              className="w-full bg-blue-500 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                            >
                              <Droplet className="w-4 h-4" />
                              Mark as Watered
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Upcoming Section */}
            {upcomingPlants.length > 0 && (filter === 'all' || filter === 'upcoming') && (
              <div className="mb-4">
                <h3 className="text-gray-700 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Coming Up
                </h3>
                <div className="space-y-2">
                  {upcomingPlants.map(plant => {
                    const daysUntilWater = getDaysUntilWater(plant);
                    
                    return (
                      <div
                        key={plant.id}
                        onClick={() => setSelectedPlant(plant)}
                        className="bg-white rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all"
                      >
                        <div className="flex gap-3">
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h4 className="text-gray-900">{plant.name}</h4>
                                <p className="text-sm text-gray-500">{plant.species}</p>
                              </div>
                              <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex-shrink-0">
                                In {daysUntilWater} day{daysUntilWater > 1 ? 's' : ''}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Droplet className="w-4 h-4" />
                                <span>Water in {daysUntilWater}d</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{getDaysSincePlanted(plant)}d old</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All Good Section */}
            {allGoodPlants.length > 0 && filter === 'all' && (
              <div>
                <h3 className="text-green-600 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  All Good
                </h3>
                <div className="space-y-2">
                  {allGoodPlants.map(plant => {
                    const daysUntilWater = getDaysUntilWater(plant);
                    
                    return (
                      <div
                        key={plant.id}
                        onClick={() => setSelectedPlant(plant)}
                        className="bg-white rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-gray-900">{plant.name}</h4>
                            <p className="text-sm text-gray-600">
                              Water in {daysUntilWater} day{daysUntilWater > 1 ? 's' : ''}
                            </p>
                          </div>
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {filteredPlants.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-3" />
                <h3 className="text-gray-900 mb-2">All Caught Up!</h3>
                <p className="text-gray-600">No tasks in this category</p>
              </div>
            )}
          </div>
        </>
      )}

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
