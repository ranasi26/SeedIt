import { PlantRecommendationsPage } from '../pages/PlantRecommendationsPage';
import type { UserProfile, Plant } from '../../App';

interface WebPlantRecommendationsPageProps {
  user: UserProfile;
  plants: Plant[];
  onAddPlant: (plant: Omit<Plant, 'id'>) => Promise<void>;
}

export function WebPlantRecommendationsPage({ user, plants, onAddPlant }: WebPlantRecommendationsPageProps) {
  return (
    <PlantRecommendationsPage 
      user={user} 
      plants={plants} 
      onAddPlant={onAddPlant}
      onBack={() => {}} 
    />
  );
}
