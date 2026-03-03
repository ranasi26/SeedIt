import { CareRemindersPage } from '../pages/CareRemindersPage';
import type { Plant } from '../../App';

interface WebCareRemindersPageProps {
  plants: Plant[];
  onUpdatePlant: (plant: Plant) => void;
}

export function WebCareRemindersPage({ plants, onUpdatePlant }: WebCareRemindersPageProps) {
  return <CareRemindersPage plants={plants} onUpdatePlant={onUpdatePlant} onBack={() => {}} />;
}
