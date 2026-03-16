import { CareRemindersPage } from '../pages/CareRemindersPage';
import type { Plant, UserProfile } from '../../App';
import { WeatherData } from '../../service/weather';

interface WebCareRemindersPageProps {
  plants: Plant[];
  onUpdatePlant: (plant: Plant) => Promise<void>;
  onDeletePlant: (id: string) => Promise<void>;
  user: UserProfile;
  weather: WeatherData | null;
}

export function WebCareRemindersPage({ plants, onUpdatePlant, onDeletePlant, user, weather }: WebCareRemindersPageProps) {
  return <CareRemindersPage
  plants={plants}
  onUpdatePlant={onUpdatePlant}
  onDeletePlant={onDeletePlant}
  onBack={() => {}}
  user={user}
  weather={weather}
/>;
}

