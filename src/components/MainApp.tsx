import { useState } from 'react';
import { Home, Sprout, User as UserIcon, LogOut, Bell } from 'lucide-react';
import type { UserProfile, Plant } from '../App';
import { MyGardenTab } from './tabs/MyGardenTab';
import { DiscoverTab } from './tabs/DiscoverTab';
import { SeedItLogo } from './SeedItLogo';
import { HomePage } from './pages/HomePage';
import { PlantRecommendationsPage } from './pages/PlantRecommendationsPage';
import { SeedTutorialPage } from './pages/SeedTutorialPage';
import { CareRemindersPage } from './pages/CareRemindersPage';
import { PlantHealthPage } from './pages/PlantHealthPage';
import { ProfilePage } from './pages/ProfilePage';

interface MainAppProps {
  user: UserProfile;
  onLogout: () => void;
}

export function MainApp({ user, onLogout }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'garden' | 'profile'>('home');
  const [activePage, setActivePage] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [plants, setPlants] = useState<Plant[]>([]);

  const addPlant = (plant: Omit<Plant, 'id'>) => {
    const newPlant = {
      ...plant,
      id: Date.now().toString()
    };
    setPlants([...plants, newPlant]);
  };

  const updatePlant = (updatedPlant: Plant) => {
    setPlants(plants.map(p => p.id === updatedPlant.id ? updatedPlant : p));
  };

  const deletePlant = (id: string) => {
    setPlants(plants.filter(p => p.id !== id));
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  const handleBack = () => {
    setActivePage(null);
  };

  // Calculate notifications
  const getDaysUntilWater = (plant: Plant) => {
    const daysSinceWatered = Math.floor(
      (Date.now() - plant.lastWatered.getTime()) / (1000 * 60 * 60 * 24)
    );
    return plant.waterFrequency - daysSinceWatered;
  };

  const plantsNeedingCare = plants.filter(p => getDaysUntilWater(p) <= 1);

  // Render active page
  if (activePage) {
    switch (activePage) {
      case 'recommendations':
        return (
          <PlantRecommendationsPage
            user={user}
            plants={plants}
            onAddPlant={addPlant}
            onBack={handleBack}
          />
        );
      case 'seed-tutorial':
        return <SeedTutorialPage onBack={handleBack} />;
      case 'reminders':
        return (
          <CareRemindersPage
            plants={plants}
            onUpdatePlant={updatePlant}
            onBack={handleBack}
          />
        );
      case 'health-check':
        return <PlantHealthPage onBack={handleBack} />;
      case 'garden':
        setActiveTab('garden');
        setActivePage(null);
        break;
    }
  }

  return (
    <div className="h-screen bg-gradient-to-b from-green-50 to-emerald-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm flex-shrink-0">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl">
                <SeedItLogo className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-green-900">SeedIt</h1>
                <p className="text-sm text-gray-600">Urban Gardening</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <button
                onClick={() => handleNavigate('reminders')}
                className="bg-green-100 text-green-700 p-3 rounded-full hover:bg-green-200 transition-colors relative"
              >
                <Bell className="w-6 h-6" />
                {plantsNeedingCare.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {plantsNeedingCare.length}
                  </span>
                )}
              </button>
              
              {/* User Menu */}
              <button
                onClick={() => setActiveTab('profile')}
                className="bg-green-100 text-green-700 p-3 rounded-full hover:bg-green-200 transition-colors"
              >
                <UserIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-md mx-auto h-full">
          {activeTab === 'home' && (
            <HomePage user={user} plants={plants} onNavigate={handleNavigate} />
          )}
          {activeTab === 'garden' && (
            <MyGardenTab plants={plants} onUpdatePlant={updatePlant} onDeletePlant={deletePlant} />
          )}
          {activeTab === 'profile' && (
            <ProfilePage user={user} plants={plants} onBack={() => setActiveTab('home')} onLogout={onLogout} />
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 py-3 px-6 rounded-xl transition-all ${
                activeTab === 'home'
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Home className={`w-7 h-7 ${activeTab === 'home' ? 'fill-current' : ''}`} />
              <span className="text-sm">Home</span>
            </button>

            <button
              onClick={() => setActiveTab('garden')}
              className={`flex flex-col items-center gap-1 py-3 px-6 rounded-xl transition-all relative ${
                activeTab === 'garden'
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {plants.length > 0 && (
                <span className="absolute top-1 right-3 bg-green-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {plants.length}
                </span>
              )}
              <Sprout className={`w-7 h-7 ${activeTab === 'garden' ? 'fill-current' : ''}`} />
              <span className="text-sm">My Garden</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 py-3 px-6 rounded-xl transition-all ${
                activeTab === 'profile'
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <UserIcon className={`w-7 h-7 ${activeTab === 'profile' ? 'fill-current' : ''}`} />
              <span className="text-sm">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}