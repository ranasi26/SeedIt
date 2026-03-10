import { useState } from 'react';
import { Sprout, Droplet, Sun, Clock, Info } from 'lucide-react';
import type { UserProfile, Plant } from '../../App';
import { GuidedPlantingFlow } from '../GuidedPlantingFlow';
import { PlantRecommendationCard, type PlantRecommendation } from '../PlantRecommendationCard';

interface DiscoverTabProps {
  user: UserProfile;
  plants: Plant[];
  onAddPlant: (plant: Omit<Plant, 'id'>) => Promise<void>;
}

export function DiscoverTab({ user, plants, onAddPlant }: DiscoverTabProps) {
  const [showGuidedFlow, setShowGuidedFlow] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<PlantRecommendation | null>(null);

  // Generate recommendations based on user profile
  const allRecommendations: PlantRecommendation[] = [
    // Easy herbs for beginners
    {
      name: 'Basil',
      species: 'Ocimum basilicum',
      image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      difficulty: 'easy',
      sunlight: 'medium',
      waterFrequency: 3,
      growthTime: '6-8 weeks',
      description: 'Perfect for cooking, grows fast and smells amazing',
      whyRecommended: user.goals.includes('herbs') ? 'Great for cooking fresh meals' : 'Easy to grow indoors',
      tags: ['herbs', 'cooking', 'beginner-friendly'],
      spaceNeeded: 'Small pot (6-8 inches)'
    },
    {
      name: 'Mint',
      species: 'Mentha',
      image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      difficulty: 'easy',
      sunlight: 'low',
      waterFrequency: 2,
      growthTime: '4-6 weeks',
      description: 'Grows easily, perfect for teas and mojitos',
      whyRecommended: user.sunlightHours === 'low' ? 'Thrives in low light' : 'Very forgiving for beginners',
      tags: ['herbs', 'low-light', 'fast-growing'],
      spaceNeeded: 'Small pot (6 inches)'
    },
    // Indoor-friendly vegetables
    {
      name: 'Cherry Tomatoes',
      species: 'Solanum lycopersicum',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      difficulty: 'medium',
      sunlight: 'high',
      waterFrequency: 2,
      growthTime: '60-80 days',
      description: 'Fresh tomatoes right from your home',
      whyRecommended: user.sunlightHours === 'high' ? 'Perfect for your sunny spot' : 'Rewarding to grow',
      tags: ['vegetables', 'from-seed', 'productive'],
      spaceNeeded: 'Medium pot (12 inches)'
    },
    {
      name: 'Lettuce',
      species: 'Lactuca sativa',
      image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      difficulty: 'easy',
      sunlight: 'medium',
      waterFrequency: 2,
      growthTime: '30-45 days',
      description: 'Fast-growing salad greens for fresh eating',
      whyRecommended: user.goals.includes('vegetables') ? 'Quick harvest, perfect for salads' : 'Grows quickly indoors',
      tags: ['vegetables', 'fast-growing', 'beginner-friendly'],
      spaceNeeded: 'Shallow container'
    },
    // Seeds from everyday fruits
    {
      name: 'Lemon Tree',
      species: 'Citrus limon',
      image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      difficulty: 'medium',
      sunlight: 'high',
      waterFrequency: 4,
      growthTime: '3-5 years for fruit',
      description: 'Grow from seeds saved from store-bought lemons',
      whyRecommended: user.goals.includes('seeds') ? 'Perfect for seed saving project' : 'Beautiful indoor tree',
      tags: ['from-seed', 'fruit', 'long-term'],
      spaceNeeded: 'Large pot (12-16 inches)'
    },
    {
      name: 'Avocado Tree',
      species: 'Persea americana',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      difficulty: 'easy',
      sunlight: 'medium',
      waterFrequency: 7,
      growthTime: '5-13 years for fruit',
      description: 'Start from an avocado pit - fun and educational',
      whyRecommended: user.goals.includes('learning') ? 'Great learning experience' : 'Easy to start from pit',
      tags: ['from-seed', 'educational', 'decorative'],
      spaceNeeded: 'Medium to large pot'
    },
    {
      name: 'Bell Pepper',
      species: 'Capsicum annuum',
      image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      difficulty: 'medium',
      sunlight: 'high',
      waterFrequency: 3,
      growthTime: '60-90 days',
      description: 'Save seeds from store peppers to grow your own',
      whyRecommended: user.goals.includes('seeds') ? 'Easy to save and replant seeds' : 'Productive container plant',
      tags: ['vegetables', 'from-seed', 'productive'],
      spaceNeeded: 'Medium pot (10-12 inches)'
    },
    // Air purifying plants
    {
      name: 'Snake Plant',
      species: 'Sansevieria',
      image: 'https://images.unsplash.com/photo-1668426231244-1827c29ef8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      difficulty: 'easy',
      sunlight: 'low',
      waterFrequency: 14,
      growthTime: 'Year-round',
      description: 'Purifies air, nearly indestructible',
      whyRecommended: user.goals.includes('air') ? 'Excellent air purifier' : 'Perfect for beginners',
      tags: ['air-purifying', 'low-maintenance', 'low-light'],
      spaceNeeded: 'Small to medium pot'
    },
    {
      name: 'Pothos',
      species: 'Epipremnum aureum',
      image: 'https://images.unsplash.com/photo-1595524147656-eb5d0a63e9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      difficulty: 'easy',
      sunlight: 'low',
      waterFrequency: 7,
      growthTime: 'Fast-growing',
      description: 'Trailing plant that cleans air beautifully',
      whyRecommended: user.goals.includes('air') ? 'Great air purifier' : 'Very forgiving',
      tags: ['air-purifying', 'decorative', 'low-light'],
      spaceNeeded: 'Small hanging pot'
    }
  ];

  // Filter recommendations based on user's conditions
  const filteredRecommendations = allRecommendations.filter(plant => {
    // Filter by sunlight availability
    if (user.sunlightHours === 'low' && plant.sunlight === 'high') return false;
    if (user.sunlightHours === 'high' && plant.sunlight === 'low') {
      // Still show low light plants for high light spaces
    }

    return true;
  });

  // Sort by relevance to user goals and difficulty
  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    const aScore = (
      (a.difficulty === 'easy' ? 10 : a.difficulty === 'medium' ? 5 : 0) +
      (user.goals.some(goal => a.tags.includes(goal)) ? 20 : 0)
    );
    const bScore = (
      (b.difficulty === 'easy' ? 10 : b.difficulty === 'medium' ? 5 : 0) +
      (user.goals.some(goal => b.tags.includes(goal)) ? 20 : 0)
    );
    return bScore - aScore;
  });

  return (
    <div className="p-4 space-y-4">
      {/* Personalized Banner */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-xl">
            <Sprout className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="mb-2">Plants Perfect for You</h2>
            <p className="text-sm text-green-50">
              Based on your {user.spaceType} with {user.sunlightHours} light
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <Sun className="w-4 h-4" />
            <span>{user.sunlightHours} light</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{user.experience}</span>
          </div>
        </div>
      </div>

      {/* Info Card */}
      {user.goals.includes('seeds') && (
        <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900">
              <strong>Seed Saving Tip:</strong> Save seeds from organic fruits and vegetables for best results. Wash and dry seeds before planting.
            </p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="space-y-3">
        {sortedRecommendations.map((plant, index) => (
          <PlantRecommendationCard
            key={index}
            plant={plant}
            onAddPlant={onAddPlant}
            isAlreadyAdded={plants.some(p => p.name === plant.name)}
            onShowGuidedFlow={() => {
              setShowGuidedFlow(true);
              setSelectedPlant(plant);
            }}
          />
        ))}
      </div>

      {sortedRecommendations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No plants match your current settings.</p>
        </div>
      )}

      {/* Guided Planting Flow */}
      {showGuidedFlow && selectedPlant && (
        <GuidedPlantingFlow
          plant={selectedPlant}
          onClose={() => {
            setShowGuidedFlow(false);
            setSelectedPlant(null);
          }}
          onComplete={async (plant) => {
            await onAddPlant(plant);
            setShowGuidedFlow(false);
            setSelectedPlant(null);
          }}
        />
      )}
    </div>
  );
}