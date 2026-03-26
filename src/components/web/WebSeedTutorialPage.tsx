import { SeedTutorialPage } from '../pages/SeedTutorialPage';
import type { Plant } from '../../App';

interface WebSeedTutorialPageProps {
  plants: Plant[];
  onAddPlant: (plant: Omit<Plant, 'id'>) => Promise<void>;
  onGoToGarden: () => void;
}

export function WebSeedTutorialPage({ plants, onAddPlant, onGoToGarden }: WebSeedTutorialPageProps) {
  return (
    <SeedTutorialPage
      plants={plants}
      onAddPlant={onAddPlant}
      onGoToGarden={onGoToGarden}
    />
  );
}