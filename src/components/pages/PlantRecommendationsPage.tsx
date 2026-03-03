import { useState } from 'react';
import { Sun, Droplet, Home, Calendar, ArrowLeft, Plus, Check } from 'lucide-react';
import type { UserProfile, Plant } from '../../App';

interface RecommendedPlant {
  name: string;
  species: string;
  image: string;
  difficulty: 'easy' | 'medium' | 'hard';
  sunlight: 'low' | 'medium' | 'high';
  waterFrequency: number;
  spaceNeeded: 'small' | 'medium' | 'large';
  daysToHarvest: number;
  benefits: string[];
  tips: string;
  seedSource: string;
}

interface PlantRecommendationsPageProps {
  user: UserProfile;
  plants: Plant[];
  onAddPlant: (plant: Omit<Plant, 'id'>) => void;
  onBack: () => void;
}

export function PlantRecommendationsPage({ user, plants, onAddPlant, onBack }: PlantRecommendationsPageProps) {
  const [selectedPlant, setSelectedPlant] = useState<RecommendedPlant | null>(null);
  const [addedPlants, setAddedPlants] = useState<Set<string>>(new Set());

  // Recommendations based on user profile
  const allRecommendations: RecommendedPlant[] = [
    {
      name: 'Cherry Tomatoes',
      species: 'Solanum lycopersicum',
      image: 'https://images.unsplash.com/photo-1748432171507-c1d62fe2e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBwbGFudCUyMGdyb3dpbmd8ZW58MXx8fHwxNzY4MzYxMDE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'easy',
      sunlight: 'high',
      waterFrequency: 2,
      spaceNeeded: 'medium',
      daysToHarvest: 60,
      benefits: ['Great for beginners', 'High yield', 'Can save seeds'],
      tips: 'Save seeds from store-bought tomatoes! Dry them on paper towels for a week before planting.',
      seedSource: 'Store-bought tomatoes'
    },
    {
      name: 'Basil',
      species: 'Ocimum basilicum',
      image: 'https://images.unsplash.com/photo-1618343619081-e65a0559a91d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJicyUyMHdpbmRvd3NpbGx8ZW58MXx8fHwxNzY4NDIyMzQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'easy',
      sunlight: 'medium',
      waterFrequency: 1,
      spaceNeeded: 'small',
      daysToHarvest: 30,
      benefits: ['Fast growing', 'Perfect for windowsills', 'Culinary herb'],
      tips: 'Pinch off flowers to encourage leaf growth. Harvest regularly for bushier plants.',
      seedSource: 'Nursery or grocery store'
    },
    {
      name: 'Green Onions',
      species: 'Allium fistulosum',
      image: 'https://images.unsplash.com/photo-1652366358812-6fde6d1f1caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwbGFudHMlMjBhcGFydG1lbnR8ZW58MXx8fHwxNzY4NDIyMzQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'easy',
      sunlight: 'low',
      waterFrequency: 2,
      spaceNeeded: 'small',
      daysToHarvest: 21,
      benefits: ['Regrows from scraps', 'Low maintenance', 'Works in low light'],
      tips: 'Save the white root ends from store-bought green onions and place in water. They\'ll regrow!',
      seedSource: 'Kitchen scraps'
    },
    {
      name: 'Bell Peppers',
      species: 'Capsicum annuum',
      image: 'https://images.unsplash.com/photo-1632819773825-2b801de6c2d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxjb255JTIwZ2FyZGVuJTIwdXJiYW58ZW58MXx8fHwxNzY4NDIyMzQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'medium',
      sunlight: 'high',
      waterFrequency: 2,
      spaceNeeded: 'medium',
      daysToHarvest: 75,
      benefits: ['Colorful produce', 'Can save seeds', 'Nutritious'],
      tips: 'Extract seeds from store-bought peppers. Let them dry completely before planting.',
      seedSource: 'Store-bought peppers'
    },
    {
      name: 'Lettuce',
      species: 'Lactuca sativa',
      image: 'https://images.unsplash.com/photo-1627730327661-9b5efb7d47b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGNhcmUlMjB3YXRlcmluZ3xlbnwxfHx8fDE3Njg0MjIzNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'easy',
      sunlight: 'low',
      waterFrequency: 1,
      spaceNeeded: 'small',
      daysToHarvest: 30,
      benefits: ['Quick harvest', 'Shade tolerant', 'Multiple harvests'],
      tips: 'Lettuce regrows from the stump! Keep the base in water and it will sprout new leaves.',
      seedSource: 'Kitchen scraps or seeds'
    },
    {
      name: 'Mint',
      species: 'Mentha',
      image: 'https://images.unsplash.com/photo-1618343619081-e65a0559a91d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJicyUyMHdpbmRvd3NpbGx8ZW58MXx8fHwxNzY4NDIyMzQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'easy',
      sunlight: 'medium',
      waterFrequency: 2,
      spaceNeeded: 'small',
      daysToHarvest: 21,
      benefits: ['Very hardy', 'Aromatic', 'Multiple uses'],
      tips: 'Mint grows easily from cuttings. Place stems in water until roots form, then plant.',
      seedSource: 'Grocery store cuttings'
    }
  ];

  // Filter based on user's space and sunlight
  const recommendations = allRecommendations.filter(plant => {
    if (user.sunlightHours === 'low' && plant.sunlight === 'high') return false;
    if (user.spaceSize === 'small' && plant.spaceNeeded === 'large') return false;
    return true;
  }).sort((a, b) => {
    // Prioritize easy plants for beginners
    if (user.experience === 'beginner') {
      if (a.difficulty === 'easy' && b.difficulty !== 'easy') return -1;
      if (a.difficulty !== 'easy' && b.difficulty === 'easy') return 1;
    }
    return 0;
  });

  const handleAddPlant = (recommended: RecommendedPlant) => {
    const newPlant: Omit<Plant, 'id'> = {
      name: recommended.name,
      species: recommended.species,
      image: recommended.image,
      waterFrequency: recommended.waterFrequency,
      lastWatered: new Date(),
      sunlight: recommended.sunlight,
      notes: recommended.tips,
      plantedDate: new Date(),
      currentStage: 'seed',
      difficulty: recommended.difficulty,
      tags: []
    };
    
    onAddPlant(newPlant);
    setAddedPlants(new Set(addedPlants).add(recommended.name));
    setSelectedPlant(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSunlightLabel = (sunlight: string) => {
    switch (sunlight) {
      case 'low': return '☁️ Low (2-4hrs)';
      case 'medium': return '⛅ Medium (4-6hrs)';
      case 'high': return '☀️ High (6+hrs)';
      default: return sunlight;
    }
  };

  if (selectedPlant) {
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200">
          <button
            onClick={() => setSelectedPlant(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to list</span>
          </button>
        </div>

        {/* Plant Details */}
        <div className="flex-1 overflow-y-auto pb-24">
          <img
            src={selectedPlant.image}
            alt={selectedPlant.name}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-4 space-y-4">
            <div>
              <h2 className="text-gray-900 mb-1">{selectedPlant.name}</h2>
              <p className="text-gray-600 italic">{selectedPlant.species}</p>
            </div>

            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-sm capitalize ${getDifficultyColor(selectedPlant.difficulty)}`}>
                {selectedPlant.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                {selectedPlant.daysToHarvest} days to harvest
              </span>
            </div>

            {/* Requirements */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <h3 className="text-gray-900">Growing Requirements</h3>
              
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-yellow-500" />
                <div className="flex-1">
                  <p className="text-gray-900">Sunlight</p>
                  <p className="text-sm text-gray-600">{getSunlightLabel(selectedPlant.sunlight)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Droplet className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <p className="text-gray-900">Watering</p>
                  <p className="text-sm text-gray-600">Every {selectedPlant.waterFrequency} day{selectedPlant.waterFrequency > 1 ? 's' : ''}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-gray-900">Space Needed</p>
                  <p className="text-sm text-gray-600 capitalize">{selectedPlant.spaceNeeded}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-500" />
                <div className="flex-1">
                  <p className="text-gray-900">Harvest Time</p>
                  <p className="text-sm text-gray-600">{selectedPlant.daysToHarvest} days</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-gray-900 mb-2">Why Choose This Plant?</h3>
              <div className="space-y-2">
                {selectedPlant.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Growing Tips */}
            <div className="bg-green-50 rounded-2xl p-4">
              <h3 className="text-green-900 mb-2">💡 Beginner Tip</h3>
              <p className="text-green-800">{selectedPlant.tips}</p>
            </div>

            {/* Seed Source */}
            <div className="bg-amber-50 rounded-2xl p-4">
              <h3 className="text-amber-900 mb-2">🌱 Seed Source</h3>
              <p className="text-amber-800">{selectedPlant.seedSource}</p>
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto">
            {addedPlants.has(selectedPlant.name) ? (
              <div className="bg-green-100 text-green-700 py-3 rounded-xl text-center">
                <Check className="w-5 h-5 inline-block mr-2" />
                Added to your garden!
              </div>
            ) : (
              <button
                onClick={() => handleAddPlant(selectedPlant)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add to My Garden
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

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
        <h2 className="text-gray-900">Plant Recommendations</h2>
        <p className="text-gray-600">Perfect for your {user.spaceType} with {user.sunlightHours} sunlight</p>
      </div>

      {/* Recommendations List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {recommendations.map((plant) => {
          const isAdded = addedPlants.has(plant.name);
          
          return (
            <div
              key={plant.name}
              onClick={() => setSelectedPlant(plant)}
              className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex gap-4 p-4">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="text-gray-900">{plant.name}</h3>
                      <p className="text-sm text-gray-500">{plant.species}</p>
                    </div>
                    {isAdded && (
                      <div className="bg-green-500 text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${getDifficultyColor(plant.difficulty)}`}>
                      {plant.difficulty}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 capitalize">
                      {plant.sunlight} light
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2">{plant.tips}</p>
                </div>
              </div>
            </div>
          );
        })}

        {recommendations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No recommendations available for your current settings.</p>
          </div>
        )}
      </div>
    </div>
  );
}
