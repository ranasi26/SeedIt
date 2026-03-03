import { useState } from 'react';
import { AuthPage } from './components/AuthPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { WebMainApp } from './components/WebMainApp';



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

  const handleLogin = (email: string, name: string) => {
    setUser({
      email,
      name,
      spaceType: 'apartment',
      outdoorAccess: 'none',
      sunlightHours: 'medium',
      spaceSize: 'small',
      experience: 'beginner',
      goals: []
    });
    setIsAuthenticated(true);
  };

  const handleOnboardingComplete = (profile: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...profile });
      setHasCompletedOnboarding(true);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsAuthenticated(false);
      setHasCompletedOnboarding(false);
      setUser(null);
    }
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return <WebMainApp user={user!} onLogout={handleLogout} />;


}