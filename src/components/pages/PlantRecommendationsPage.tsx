import { useEffect, useMemo, useState } from 'react';
import { Sun, Droplet, Home, Calendar, ArrowLeft, Plus, Check } from 'lucide-react';
import type { UserProfile, Plant } from '../../App';
import { getRecommendations } from '../../service/recommendations';
import type { PlantItem } from '../../service/recommendations';


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
  onAddPlant: (plant: Omit<Plant, 'id'>) => Promise<void>;
  onBack: () => void;
}

export function PlantRecommendationsPage({ user, plants, onAddPlant, onBack }: PlantRecommendationsPageProps) {
  const [selectedPlant, setSelectedPlant] = useState<RecommendedPlant | null>(null);
  const [addedPlants, setAddedPlants] = useState<Set<string>>(new Set());

  const [recommendations, setRecommendations] = useState<RecommendedPlant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const prefs = useMemo(() => {

  const sunlightMap: Record<string, "low" | "medium" | "bright"> = {
    low: "low",
    medium: "medium",
    high: "bright",   // UI uses "high", database uses "bright"
  };

  return {
    sunlight: sunlightMap[user.sunlightHours] ?? "medium",
    capacity: user.spaceSize ?? "medium",

    // if user doesn't have these yet we default them
    outdoorAccess: (user as any).outdoorAccess ?? "none",

    goals: (user as any).goals ?? []
  };

}, [user]);


useEffect(() => {
  let cancelled = false;

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const results = await getRecommendations(prefs);

      const mapped: RecommendedPlant[] = results.map((p: PlantItem) => ({
        name: p.name,
        species: p.species ?? "Unknown Species",
        image:
          p.imageUrl ??
          "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        difficulty: (p.difficulty as any) ?? "easy",
        sunlight: p.sun === "bright" ? "high" : (p.sun as any), // convert back for UI
        waterFrequency: p.waterFrequencyDays ?? 7,
        spaceNeeded: p.size,
        daysToHarvest: 30, // optional, add to Firestore later
        benefits: p.goals ?? [],
        tips: "Follow standard care instructions.",
        seedSource: "Seeds or nursery",
      }));

      if (!cancelled) setRecommendations(mapped);
    } catch (e: any) {
      if (!cancelled) setError(e?.message ?? "Failed to load recommendations");
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

  load();
  return () => {
    cancelled = true;
  };
}, [prefs]);

  // Recommendations based on user profile
 

  const handleAddPlant = async (recommended: RecommendedPlant) => {
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

  try {
    await onAddPlant(newPlant);

    setAddedPlants((prev) => new Set(prev).add(recommended.name));
    setSelectedPlant(null);
  } catch (error) {
    console.error("Failed to save plant:", error);
    alert("Failed to save plant to your garden.");
  }
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
            {addedPlants.has(selectedPlant.name) || plants.some((p) => p.name === selectedPlant.name) ? (
              <div className="bg-green-100 text-green-700 py-3 rounded-xl text-center">
                <Check className="w-5 h-5 inline-block mr-2" />
                Added to your garden!
              </div>
            ) : (
              <button
                onClick={() => handleAddPlant(selectedPlant)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 md:py-3 rounded-xl text-sm md:text-base flex items-center justify-center gap-2"
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
      
      {loading && (
  <div className="text-center py-8 text-gray-500">Loading recommendations...</div>
)}

{error && (
  <div className="text-center py-8 text-red-600">{error}</div>
)}
      
        {recommendations.map((plant) => {
          const isAdded =
            addedPlants.has(plant.name) ||
            plants.some((p) => p.name === plant.name);
          
          return (
            <div
              key={plant.name}
              onClick={() => setSelectedPlant(plant)}
              className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex gap-3 md:gap-4 p-3 md:p-4">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover flex-shrink-0"
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
