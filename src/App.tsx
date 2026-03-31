import { useState} from 'react';
import { AuthPage } from './components/AuthPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { WebMainApp } from './components/WebMainApp';
import { saveUserProfile, getUserProfile } from './service/users';
import { getUserPlants, saveUserPlant, updateUserPlant, deleteUserPlant } from './service/userPlants';
import { getWeather } from './service/weather';



export interface UserProfile {
  email: string;
  name: string;
  spaceType: 'apartment' | 'house' | 'shared';
  outdoorAccess: 'balcony' | 'patio' | 'yard' | 'none';
  sunlightHours: 'low' | 'medium' | 'high'; // <3hrs, 3-6hrs, 6+hrs
  spaceSize: 'small' | 'medium' | 'large';
  experience: 'beginner' | 'some' | 'experienced';
  goals: string[];
}

export interface Plant {
  id: string;
  name: string;
  species: string;
  image: string;
  waterFrequency: number;
  lastWatered: Date;
  sunlight: 'low' | 'medium' | 'high';
  notes: string;
  plantedDate: Date;
  currentStage: 'seed' | 'seedling' | 'growing' | 'mature';
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [weather, setWeather] = useState<any>(null);
const handleLogin = async (email: string, name: string) => {
  const existingUser = await getUserProfile(email);
  const existingPlants = await getUserPlants(email);

  setPlants(existingPlants);

  if (existingUser && existingUser.hasCompletedOnboarding) {
    setUser(existingUser);
    setIsAuthenticated(true);
    setHasCompletedOnboarding(true);
    return;
  }

  const newUser: UserProfile = {
    email,
    name,
    spaceType: 'apartment',
    outdoorAccess: 'none',
    sunlightHours: 'medium',
    spaceSize: 'small',
    experience: 'beginner',
    goals: []
  };

  setUser(newUser);
  setIsAuthenticated(true);
  setHasCompletedOnboarding(false);
};

  const handleOnboardingComplete = async (profile: Partial<UserProfile>) => {
  if (user) {
    const updatedUser = { ...user, ...profile } as UserProfile;

    setUser(updatedUser);
    setHasCompletedOnboarding(true);

    await saveUserProfile(updatedUser);
  }
};

 const handleExitOnboarding = () => {
  setIsAuthenticated(false);
  setHasCompletedOnboarding(false);
  setUser(null);
};

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsAuthenticated(false);
      setHasCompletedOnboarding(false);
      setUser(null);
    }
  };

  const handleAddPlant = async (plant: Omit<Plant, 'id'>) => {
  if (!user) return;

  const firebaseId = await saveUserPlant({
    userEmail: user.email,
    userName: user.name,
    plantName: plant.name,
    species: plant.species,
    image: plant.image,
    waterFrequency: plant.waterFrequency,
    sunlight: plant.sunlight,
    notes: plant.notes,
    difficulty: plant.difficulty,
  });

  const newPlant: Plant = {
    ...plant,
    id: firebaseId,
  };

  setPlants((prev) => [...prev, newPlant]);
};

const handleUpdatePlant = async (updatedPlant: Plant): Promise<void> => {
  try {
    await updateUserPlant({
      id: updatedPlant.id,
      name: updatedPlant.name,
      species: updatedPlant.species,
      image: updatedPlant.image,
      waterFrequency: updatedPlant.waterFrequency,
      lastWatered: updatedPlant.lastWatered,
      sunlight: updatedPlant.sunlight,
      notes: updatedPlant.notes,
      plantedDate: updatedPlant.plantedDate,
      currentStage: updatedPlant.currentStage,
      difficulty: updatedPlant.difficulty,
      tags: updatedPlant.tags,
    });

    setPlants((prev) =>
      prev.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  } catch (error) {
    console.error("Failed to update plant:", error);
    throw error;
  }
};

const handleDeletePlant = async (id: string) => {
  await deleteUserPlant(id);
  setPlants((prev) => prev.filter((p) => p.id !== id));
};

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  if (!hasCompletedOnboarding) {
    return (
  <OnboardingFlow
    onComplete={handleOnboardingComplete}
    onExit={handleExitOnboarding}
  />
);
  }

  return (
  <WebMainApp
    user={user!}
    plants={plants}
    weather={weather}
    onAddPlant={handleAddPlant}
    onUpdatePlant={handleUpdatePlant}
    onDeletePlant={handleDeletePlant}
    onLogout={handleLogout}
  />
);

}