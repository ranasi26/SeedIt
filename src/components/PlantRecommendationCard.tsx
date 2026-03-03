import { useState } from 'react';
import { Sun, Droplet, Clock, Plus, Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { Plant } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface PlantRecommendation {
  name: string;
  species: string;
  image: string;
  difficulty: 'easy' | 'medium' | 'hard';
  sunlight: 'low' | 'medium' | 'high';
  waterFrequency: number;
  growthTime: string;
  description: string;
  whyRecommended: string;
  tags: string[];
  spaceNeeded: string;
}

interface PlantRecommendationCardProps {
  plant: PlantRecommendation;
  onAddPlant: (plant: Omit<Plant, 'id'>) => void;
  isAlreadyAdded: boolean;
  onShowGuidedFlow: () => void;
}

export function PlantRecommendationCard({ plant, onAddPlant, isAlreadyAdded, onShowGuidedFlow }: PlantRecommendationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-orange-100 text-orange-700'
  };

  const sunlightIcons = {
    low: '🌙',
    medium: '⛅',
    high: '☀️'
  };

  const handleAdd = () => {
    onAddPlant({
      name: plant.name,
      species: plant.species,
      image: plant.image,
      waterFrequency: plant.waterFrequency,
      lastWatered: new Date(),
      sunlight: plant.sunlight,
      notes: '',
      plantedDate: new Date(),
      currentStage: 'seed',
      difficulty: plant.difficulty,
      tags: plant.tags
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          <ImageWithFallback
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute top-1 right-1">
            <span className="text-xl">{sunlightIcons[plant.sunlight]}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className="text-gray-900">{plant.name}</h3>
              <p className="text-sm text-gray-500">{plant.species}</p>
            </div>
            <span className={`px-2 py-1 rounded-lg text-xs ${difficultyColors[plant.difficulty]}`}>
              {plant.difficulty}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{plant.description}</p>

          <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Droplet className="w-3.5 h-3.5 text-blue-500" />
              <span>Every {plant.waterFrequency}d</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{plant.growthTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onShowGuidedFlow}
              disabled={isAlreadyAdded}
              className={`flex-1 py-2 rounded-lg transition-all text-sm flex items-center justify-center gap-1.5 ${
                isAlreadyAdded
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-sm'
              }`}
            >
              {isAlreadyAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Start Planting</span>
                </>
              )}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-4">
          <div className="bg-green-50 rounded-xl p-3">
            <p className="text-xs text-green-600 mb-1">Why we recommend this:</p>
            <p className="text-sm text-green-900">{plant.whyRecommended}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">Space Needed</p>
              <p className="text-sm text-gray-900">{plant.spaceNeeded}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">Sunlight</p>
              <p className="text-sm text-gray-900 capitalize">{plant.sunlight} light</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {plant.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}