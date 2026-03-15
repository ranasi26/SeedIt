import { X, Droplet, Sun, Calendar, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import type { Plant } from '../App';

interface PlantDetailDialogProps {
  plant: Plant;
  onClose: () => void;
  onUpdate: (plant: Plant) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  daysUntilWater: number;
}

export function PlantDetailDialog({ plant, onClose, onUpdate, onDelete, daysUntilWater }: PlantDetailDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(plant.notes);
  const [currentNotes, setCurrentNotes] = useState(plant.notes);
  const [currentStage, setCurrentStage] = useState(plant.currentStage);
  const stages: Plant['currentStage'][] = ['seed', 'seedling', 'growing', 'mature'];

  const handleWater = async () => {
  try {
    const updatedPlant = {
      ...plant,
      lastWatered: new Date()
    };

    await onUpdate(updatedPlant);
    onClose();
  } catch (error) {
    console.error("Failed to mark plant as watered:", error);
    alert("Failed to update watering status.");
  }
};

  const handleStageChange = async (stage: Plant['currentStage']) => {
  setCurrentStage(stage); // update UI immediately

  try {
    await onUpdate({
      ...plant,
      currentStage: stage
    });
  } catch (error) {
    console.error("Failed to update plant stage:", error);
    alert("Failed to update plant stage.");
  }
};

  const handleSaveNotes = async () => {
  try {
    await onUpdate({
      ...plant,
      notes: editedNotes
    });
    setCurrentNotes(editedNotes);
    setIsEditing(false);
  } catch (error) {
    console.error("Failed to save notes:", error);
    alert("Failed to save notes.");
  }
};

  const handleDelete = async () => {
  if (!window.confirm(`Are you sure you want to delete ${plant.name}?`)) return;

  try {
    await onDelete(plant.id);
    onClose();
  } catch (error) {
    console.error("Failed to delete plant:", error);
    alert("Failed to delete plant.");
  }
};


  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const needsWater = daysUntilWater <= 0;
  const isOverdue = daysUntilWater < 0;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full transition-colors shadow-lg"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
          
          {needsWater && (
            <div className={`absolute top-4 left-4 ${
              isOverdue ? 'bg-red-500' : 'bg-blue-500'
            } text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg`}>
              <Droplet className="w-4 h-4" />
              <span>{isOverdue ? 'Needs water!' : 'Water soon'}</span>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div>
            <h2 className="text-gray-900 mb-1">{plant.name}</h2>
            <p className="text-gray-500">{plant.species}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <Droplet className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600 mb-1">Next water</p>
              <p className="text-blue-700">
                {isOverdue ? 'Overdue' : daysUntilWater === 0 ? 'Today' : `${daysUntilWater}d`}
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <Sun className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600 mb-1">Sunlight</p>
              <p className="text-yellow-700">{plant.sunlight.charAt(0).toUpperCase() + plant.sunlight.slice(1)}</p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 text-center">
              <Calendar className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-xs text-gray-600 mb-1">Frequency</p>
              <p className="text-green-700">{plant.waterFrequency}d</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Last watered</p>
            <p className="text-gray-900">{formatDate(plant.lastWatered)}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-3">Growth Stage</p>
            <div className="grid grid-cols-2 gap-2">
              {stages.map((stage) => {
                const isActive = currentStage === stage;

                return (
                  <button
                    key={stage}
                    onClick={() => handleStageChange(stage)}
                    className={`py-2 rounded-lg border text-sm capitalize transition-colors transition-all duration-150 ${isActive
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                  >
                    {stage}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-700">Notes</p>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
                  rows={4}
                  placeholder="Add care notes, observations, or reminders..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditedNotes(currentNotes);
                      setIsEditing(false);
                    }}
                    className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNotes}
                    className="flex-1 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4">
                {currentNotes || 'No notes yet. Tap the edit icon to add care notes!'}
              </p>
            )}
          </div>

          <div className="space-y-3 pt-2">
            {needsWater ? (
              <button
                onClick={handleWater}
                className="w-full py-3 md:py-4 rounded-xl text-sm md:text-base bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Droplet className="w-5 h-5" />
                <span>{isOverdue ? 'Water Now' : 'Mark as Watered'}</span>
              </button>
            ) : (
              <div className="w-full py-3 md:py-4 rounded-xl bg-gray-100 text-gray-500 flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center gap-2">
                    <Droplet className="w-5 h-5" />
                    <span>Water not needed yet</span>
                  </div>
                  <span className="text-sm">
                    Next watering in {daysUntilWater} day{daysUntilWater !== 1 ? 's' : ''}
                  </span>
                </div>
            )}

            <button
              onClick={handleDelete}
              className="w-full py-3 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Plant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
