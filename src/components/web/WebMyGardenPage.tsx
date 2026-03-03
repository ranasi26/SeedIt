import { MyGardenTab } from '../tabs/MyGardenTab';
import type { Plant } from '../../App';

interface WebMyGardenPageProps {
  plants: Plant[];
  onUpdatePlant: (plant: Plant) => void;
  onDeletePlant: (id: string) => void;
}

export function WebMyGardenPage({ plants, onUpdatePlant, onDeletePlant }: WebMyGardenPageProps) {
  return <MyGardenTab plants={plants} onUpdatePlant={onUpdatePlant} onDeletePlant={onDeletePlant} />;
}
