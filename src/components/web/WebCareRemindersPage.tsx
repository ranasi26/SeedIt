import { CareRemindersPage } from '../pages/CareRemindersPage';
import type { Plant } from '../../App';

interface WebCareRemindersPageProps {
  plants: Plant[];
  onUpdatePlant: (plant: Plant) => Promise<void>;
  onDeletePlant: (id: string) => Promise<void>;
}

export function WebCareRemindersPage({ plants, onUpdatePlant, onDeletePlant }: WebCareRemindersPageProps) {
  return <CareRemindersPage
  plants={plants}
  onUpdatePlant={onUpdatePlant}
  onDeletePlant={onDeletePlant}
  onBack={() => {}}
/>;
}

