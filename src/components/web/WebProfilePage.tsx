import { ProfilePage } from '../pages/ProfilePage';
import type { UserProfile, Plant } from '../../App';

interface WebProfilePageProps {
  user: UserProfile;
  plants: Plant[];
  onUpdatePlant: (plant: Plant) => Promise<void>;
  onDeletePlant: (id: string) => Promise<void>;
}

export function WebProfilePage({ user, plants, onUpdatePlant, onDeletePlant }: WebProfilePageProps) {
  return <ProfilePage user={user} plants={plants} onBack={() => {}} onLogout={() => {}} onUpdatePlant={onUpdatePlant} onDeletePlant={onDeletePlant} />;
}
