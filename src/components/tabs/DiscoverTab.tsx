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
      materials: [
  'Small pot (6-8 inches)',
  'Potting soil',
  'Basil seeds or starter plant',
  'Water',
  'Sunny windowsill'
],
steps: [
  {
    title: 'Prepare the pot',
    description: 'Fill a small pot with well-draining potting soil.'
  },
  {
    title: 'Plant basil',
    description: 'Sow basil seeds lightly under the soil or place the starter plant gently in the center.'
  },
  {
    title: 'Water gently',
    description: 'Keep the soil lightly moist but not soggy.'
  },
  {
    title: 'Give medium light',
    description: 'Place the pot where it gets bright indirect light or mild morning sun.'
  },
  {
    title: 'Harvest often',
    description: 'Pinch leaves regularly to encourage bushy growth.'
  }
],
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
      materials: [
  'Small pot (6 inches)',
  'Potting soil',
  'Mint cutting or starter plant',
  'Water',
  'Bright indoor spot'
],
steps: [
  {
    title: 'Prepare the container',
    description: 'Use a small pot with drainage holes and fill it with moist potting soil.'
  },
  {
    title: 'Plant mint',
    description: 'Place the mint cutting or starter plant into the soil and press gently around it.'
  },
  {
    title: 'Water well',
    description: 'Keep the soil evenly moist, especially in the first week.'
  },
  {
    title: 'Place in low to medium light',
    description: 'Mint grows well in bright indirect light and can tolerate lower light than many herbs.'
  },
  {
    title: 'Trim regularly',
    description: 'Cut the tops often to keep the plant full and healthy.'
  }
],
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
      materials: [
  'Medium pot (12 inches)',
  'Rich potting soil',
  'Tomato seeds or seedling',
  'Water',
  'Sunny balcony or window',
  'Small support stick or cage'
],
steps: [
  {
    title: 'Prepare a larger pot',
    description: 'Use a deep container with rich, well-draining soil.'
  },
  {
    title: 'Plant the seed or seedling',
    description: 'Plant tomato seeds shallowly or transplant a seedling carefully into the pot.'
  },
  {
    title: 'Water consistently',
    description: 'Keep soil moist but not waterlogged.'
  },
  {
    title: 'Give full sun',
    description: 'Place the plant where it gets at least 6 hours of sunlight daily.'
  },
  {
    title: 'Support the plant',
    description: 'Use a stick or small cage as the plant grows taller and starts fruiting.'
  }
],
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
      materials: [
  'Shallow container',
  'Potting soil',
  'Lettuce seeds or regrowth base',
  'Water',
  'Bright indoor spot'
],
steps: [
  {
    title: 'Fill a shallow container',
    description: 'Use a wide shallow pot or tray with light potting soil.'
  },
  {
    title: 'Sow seeds or place regrowth base',
    description: 'Scatter lettuce seeds lightly or place the lettuce stump for regrowth.'
  },
  {
    title: 'Keep soil moist',
    description: 'Water gently and keep the top soil from drying out.'
  },
  {
    title: 'Provide medium light',
    description: 'Place it near a bright window but avoid harsh extreme heat.'
  },
  {
    title: 'Harvest outer leaves',
    description: 'Pick the outer leaves first so the center can continue growing.'
  }
],
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
      materials: [
  'Large pot (12-16 inches)',
  'Potting soil',
  'Lemon seeds',
  'Water',
  'Warm sunny place'
],
steps: [
  {
    title: 'Clean the seeds',
    description: 'Remove seeds from a fresh lemon and wash them gently.'
  },
  {
    title: 'Plant seeds in moist soil',
    description: 'Place the seeds just below the soil surface in a pot.'
  },
  {
    title: 'Keep warm and moist',
    description: 'Water lightly and keep the pot in a warm bright area.'
  },
  {
    title: 'Wait for germination',
    description: 'Be patient, as citrus seeds may take time to sprout.'
  },
  {
    title: 'Move to brighter light',
    description: 'Once sprouted, keep the plant where it gets strong sunlight daily.'
  }
],
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
      materials: [
  'Large pot (12-16 inches)',
  'Potting soil',
  'Lemon seeds',
  'Water',
  'Warm sunny place'
],
steps: [
  {
    title: 'Clean the seeds',
    description: 'Remove seeds from a fresh lemon and wash them gently.'
  },
  {
    title: 'Plant seeds in moist soil',
    description: 'Place the seeds just below the soil surface in a pot.'
  },
  {
    title: 'Keep warm and moist',
    description: 'Water lightly and keep the pot in a warm bright area.'
  },
  {
    title: 'Wait for germination',
    description: 'Be patient, as citrus seeds may take time to sprout.'
  },
  {
    title: 'Move to brighter light',
    description: 'Once sprouted, keep the plant where it gets strong sunlight daily.'
  }
],
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
      materials: [
  'Medium pot (10-12 inches)',
  'Potting soil',
  'Bell pepper seeds or seedling',
  'Water',
  'Sunny spot'
],
steps: [
  {
    title: 'Prepare the pot',
    description: 'Fill a medium pot with rich, loose potting soil.'
  },
  {
    title: 'Plant seeds or seedling',
    description: 'Sow pepper seeds shallowly or place the seedling carefully into the soil.'
  },
  {
    title: 'Water gently',
    description: 'Keep soil moist but not soaked.'
  },
  {
    title: 'Place in strong light',
    description: 'Bell peppers need plenty of sunlight to grow and produce fruit.'
  },
  {
    title: 'Support and monitor',
    description: 'As the plant grows, support it if needed and watch for flowers and fruit.'
  }
],
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
      materials: [
  'Small to medium pot',
  'Well-draining soil',
  'Snake plant cutting or starter plant',
  'Water'
],
steps: [
  {
    title: 'Choose a draining pot',
    description: 'Use a pot with drainage holes and cactus-like well-draining soil.'
  },
  {
    title: 'Plant the snake plant',
    description: 'Place the starter plant or rooted cutting in the center of the pot.'
  },
  {
    title: 'Water lightly',
    description: 'Do not overwater. Let the soil dry between waterings.'
  },
  {
    title: 'Place in low to medium light',
    description: 'Snake plants tolerate low light very well.'
  },
  {
    title: 'Keep maintenance low',
    description: 'Only water occasionally and wipe dust from leaves when needed.'
  }
],
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
      materials: [
  'Small hanging pot',
  'Potting soil',
  'Pothos cutting or starter plant',
  'Water',
  'Bright indirect light'
],
steps: [
  {
    title: 'Prepare the pot',
    description: 'Fill a small hanging pot or normal container with well-draining soil.'
  },
  {
    title: 'Plant the pothos',
    description: 'Insert the cutting or starter plant gently into the soil.'
  },
  {
    title: 'Water lightly',
    description: 'Keep soil slightly moist, especially after planting.'
  },
  {
    title: 'Place in low to medium light',
    description: 'Pothos grows well in indirect light and adapts easily indoors.'
  },
  {
    title: 'Trim vines as needed',
    description: 'Prune long vines to keep the plant fuller and healthier.'
  }
],
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
            onShowGuidedFlow={async () => {
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