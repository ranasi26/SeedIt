import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Sprout, Droplets, Sun, Container, Leaf, CheckCircle2 } from 'lucide-react';
import type { Plant } from '../App';
import type { PlantRecommendation } from './PlantRecommendationCard';

interface GuidedPlantingFlowProps {
  onClose: () => void ;
  onComplete: (plant: Omit<Plant, 'id'>) => Promise<void>;
  plant: PlantRecommendation;
}

export function GuidedPlantingFlow({ onClose, onComplete, plant }: GuidedPlantingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [plantingData, setPlantingData] = useState({
    potSize: '',
    soilType: '',
    fertilizer: '',
    location: '',
    notes: ''
  });

  const steps = [
    {
      title: 'Choose Your Pot',
      icon: Container,
      description: 'The right pot size is crucial for healthy growth',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-900 mb-3">
              💡 <strong>Pro Tip:</strong> Choose a pot 2-3 inches larger than the plant's root ball. Make sure it has drainage holes!
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setPlantingData({ ...plantingData, potSize: 'small' })}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                plantingData.potSize === 'small'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Small Pot</p>
                  <p className="text-sm text-gray-600">4-6 inches diameter</p>
                </div>
                {plantingData.potSize === 'small' && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
            </button>

            <button
              onClick={() => setPlantingData({ ...plantingData, potSize: 'medium' })}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                plantingData.potSize === 'medium'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Medium Pot</p>
                  <p className="text-sm text-gray-600">8-10 inches diameter</p>
                </div>
                {plantingData.potSize === 'medium' && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
            </button>

            <button
              onClick={() => setPlantingData({ ...plantingData, potSize: 'large' })}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                plantingData.potSize === 'large'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Large Pot</p>
                  <p className="text-sm text-gray-600">12+ inches diameter</p>
                </div>
                {plantingData.potSize === 'large' && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
            </button>
          </div>
        </div>
      ),
      canProceed: () => plantingData.potSize !== ''
    },
    {
      title: 'Prepare the Soil',
      icon: Leaf,
      description: 'The right soil mix ensures proper drainage and nutrients',
      content: (
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-sm text-amber-900 mb-3">
              🌱 <strong>Soil Recipe:</strong> Mix your soil components in layers for best results
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Base Soil Type</label>
              <div className="space-y-2">
                <button
                  onClick={() => setPlantingData({ ...plantingData, soilType: 'potting-mix' })}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    plantingData.soilType === 'potting-mix'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Potting Mix</p>
                      <p className="text-xs text-gray-600">General purpose, good drainage</p>
                    </div>
                    {plantingData.soilType === 'potting-mix' && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setPlantingData({ ...plantingData, soilType: 'cactus-mix' })}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    plantingData.soilType === 'cactus-mix'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Cactus/Succulent Mix</p>
                      <p className="text-xs text-gray-600">Sandy, excellent drainage</p>
                    </div>
                    {plantingData.soilType === 'cactus-mix' && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setPlantingData({ ...plantingData, soilType: 'seed-starting' })}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    plantingData.soilType === 'seed-starting'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Seed Starting Mix</p>
                      <p className="text-xs text-gray-600">Fine texture, sterile</p>
                    </div>
                    {plantingData.soilType === 'seed-starting' && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Fertilizer (Optional)</label>
              <div className="space-y-2">
                <button
                  onClick={() => setPlantingData({ ...plantingData, fertilizer: 'compost' })}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    plantingData.fertilizer === 'compost'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Organic Compost</p>
                      <p className="text-xs text-gray-600">Slow release, natural nutrients</p>
                    </div>
                    {plantingData.fertilizer === 'compost' && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setPlantingData({ ...plantingData, fertilizer: 'balanced' })}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    plantingData.fertilizer === 'balanced'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Balanced 10-10-10</p>
                      <p className="text-xs text-gray-600">All-purpose fertilizer</p>
                    </div>
                    {plantingData.fertilizer === 'balanced' && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setPlantingData({ ...plantingData, fertilizer: 'none' })}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    plantingData.fertilizer === 'none'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">No Fertilizer</p>
                      <p className="text-xs text-gray-600">I'll add it later</p>
                    </div>
                    {plantingData.fertilizer === 'none' && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
      canProceed: () => plantingData.soilType !== '' && plantingData.fertilizer !== ''
    },
    {
      title: 'Initial Watering',
      icon: Droplets,
      description: 'Proper watering sets your plant up for success',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="text-blue-900 mb-2">Watering Instructions</h4>
            <ol className="text-sm text-blue-900 space-y-2 ml-4 list-decimal">
              <li>Water thoroughly until it drains from the bottom</li>
              <li>Let excess water drain completely</li>
              <li>Never let the pot sit in standing water</li>
              <li>Check soil moisture before next watering</li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Droplets className="w-8 h-8" />
              <div>
                <h4 className="text-white">Watering Schedule</h4>
                <p className="text-sm text-green-50">For {plant.name}</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-sm text-green-50">Water every</p>
              <p className="text-2xl font-medium">{plant.waterFrequency} days</p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-sm text-amber-900">
              💡 <strong>Tip:</strong> Stick your finger 1-2 inches into the soil. If it feels dry, it's time to water!
            </p>
          </div>
        </div>
      ),
      canProceed: () => true
    },
    {
      title: 'Find the Right Spot',
      icon: Sun,
      description: 'Light placement is crucial for plant health',
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 rounded-xl p-4">
            <p className="text-sm text-yellow-900 mb-3">
              ☀️ <strong>Light Requirements:</strong> {plant.name} needs{' '}
              {plant.sunlight === 'low' && 'low to medium indirect light'}
              {plant.sunlight === 'medium' && 'bright indirect light'}
              {plant.sunlight === 'high' && 'bright direct sunlight'}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setPlantingData({ ...plantingData, location: 'windowsill' })}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                plantingData.location === 'windowsill'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Near Window</p>
                  <p className="text-sm text-gray-600">Direct or bright indirect light</p>
                </div>
                {plantingData.location === 'windowsill' && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
            </button>

            <button
              onClick={() => setPlantingData({ ...plantingData, location: 'room-center' })}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                plantingData.location === 'room-center'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Center of Room</p>
                  <p className="text-sm text-gray-600">Medium indirect light</p>
                </div>
                {plantingData.location === 'room-center' && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
            </button>

            <button
              onClick={() => setPlantingData({ ...plantingData, location: 'low-light' })}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                plantingData.location === 'low-light'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Away from Windows</p>
                  <p className="text-sm text-gray-600">Low to medium light</p>
                </div>
                {plantingData.location === 'low-light' && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
            </button>

            <button
              onClick={() => setPlantingData({ ...plantingData, location: 'balcony' })}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                plantingData.location === 'balcony'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Balcony/Patio</p>
                  <p className="text-sm text-gray-600">Outdoor with protection</p>
                </div>
                {plantingData.location === 'balcony' && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
            </button>
          </div>
        </div>
      ),
      canProceed: () => plantingData.location !== ''
    },
    {
      title: 'Add Notes',
      icon: Sprout,
      description: 'Track your planting details for future reference',
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-green-900">
              📝 Record any observations or special details about your planting
            </p>
          </div>

          <textarea
            value={plantingData.notes}
            onChange={(e) => setPlantingData({ ...plantingData, notes: e.target.value })}
            placeholder="e.g., Planted from seed, used terracotta pot, placed on east-facing window..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
            rows={6}
          />

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <h4 className="text-white mb-4">Your Setup Summary</h4>
            <div className="space-y-2 text-sm text-green-50">
              <p>🪴 <strong>Pot:</strong> {plantingData.potSize || 'Not selected'}</p>
              <p>🌱 <strong>Soil:</strong> {plantingData.soilType || 'Not selected'}</p>
              <p>🍃 <strong>Fertilizer:</strong> {plantingData.fertilizer || 'Not selected'}</p>
              <p>📍 <strong>Location:</strong> {plantingData.location || 'Not selected'}</p>
            </div>
          </div>
        </div>
      ),
      canProceed: () => true
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the flow
      const notes = `
Pot: ${plantingData.potSize}
Soil: ${plantingData.soilType}
Fertilizer: ${plantingData.fertilizer}
Location: ${plantingData.location}

${plantingData.notes}
      `.trim();

      onComplete({
        name: plant.name,
        species: plant.species,
        image: plant.image,
        waterFrequency: plant.waterFrequency,
        lastWatered: new Date(),
        sunlight: plant.sunlight,
        notes,
        plantedDate: new Date(),
        currentStage: 'seed',
        difficulty: plant.difficulty,
        tags: plant.tags
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];
  const Icon = step.icon;
  const canProceed = step.canProceed();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full rounded-t-3xl max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 rounded-t-3xl z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-gray-900 mb-1">Planting {plant.name}</h2>
              <p className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2 flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-2xl mb-3">
              <Icon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-gray-900 mb-1">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>

          {step.content}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>{currentStep === steps.length - 1 ? 'Start Growing!' : 'Continue'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}