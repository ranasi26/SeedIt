import { ProfilePage } from '../pages/ProfilePage';
import type { UserProfile, Plant } from '../../App';

interface WebProfilePageProps {
  user: UserProfile;
  plants: Plant[];
}

export function WebProfilePage({ user, plants }: WebProfilePageProps) {
  return <ProfilePage user={user} plants={plants} onBack={() => {}} onLogout={() => {}} />;
}
