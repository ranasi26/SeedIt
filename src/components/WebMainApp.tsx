import { useState } from 'react';
import {
  Home,
  Sprout,
  User as UserIcon,
  LogOut,
  Bell,
  BookOpen,
  Camera,
  Calendar,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';

import type { UserProfile, Plant } from '../App';
import { WebHomePage } from './web/WebHomePage';
import { WebPlantRecommendationsPage } from './web/WebPlantRecommendationsPage';
import { WebSeedTutorialPage } from './web/WebSeedTutorialPage';
import { WebCareRemindersPage } from './web/WebCareRemindersPage';
import { WebPlantHealthPage } from './web/WebPlantHealthPage';
import { WebProfilePage } from './web/WebProfilePage';
import { WebMyGardenPage } from './web/WebMyGardenPage';
import { SeedItLogo } from './SeedItLogo';
import { WeatherData } from '../service/weather';

interface WebMainAppProps {
  user: UserProfile;
  plants: Plant[];
  weather: WeatherData | null;
  onAddPlant: (plant: Omit<Plant, 'id'>) => Promise<void>;
  onUpdatePlant: (plant: Plant) => Promise<void>;
  onDeletePlant: (id: string) => Promise<void>;
  onLogout: () => void;
}

export function WebMainApp({
  user,
  plants,
  weather,
  onAddPlant,
  onUpdatePlant,
  onDeletePlant,
  onLogout
}: WebMainAppProps) {

  const [activePage, setActivePage] = useState<string>('home');
const [sidebarOpen, setSidebarOpen] = useState(false);
const [pageHistory, setPageHistory] = useState<string[]>([]);

  const handleNavigate = (page: string) => {
  if (page !== activePage) {
    setPageHistory(prev => [...prev, activePage]);
  }
  setActivePage(page);
  setSidebarOpen(false);
};

const handleBack = () => {
  if (pageHistory.length > 0) {
    const previousPage = pageHistory[pageHistory.length - 1];
    setActivePage(previousPage);
    setPageHistory(prev => prev.slice(0, -1));
  } else {
    setActivePage('home');
  }
};

  const getDaysUntilWater = (plant: Plant) => {
    const daysSinceWatered = Math.floor(
      (Date.now() - plant.lastWatered.getTime()) / (1000 * 60 * 60 * 24)
    );
    return plant.waterFrequency - daysSinceWatered;
  };

  const plantsNeedingCare = plants.filter(p => getDaysUntilWater(p) <= 0);

  const navigationItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'garden', label: 'My Garden', icon: Sprout, badge: plants.length },
    { id: 'recommendations', label: 'Find Plants', icon: Sprout },
    { id: 'health-check', label: 'Health Check', icon: Camera },
    { id: 'seed-tutorial', label: 'Seed Guide', icon: BookOpen },
    { id: 'reminders', label: 'Care Reminders', icon: Calendar, badge: plantsNeedingCare.length },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  const backPages = ['reminders', 'health-check', 'seed-tutorial', 'recommendations', 'garden', 'profile'];
  const showBackButton = backPages.includes(activePage);

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">

      {/* Sidebar */}
      <div
        style={{ width: '320px' }}
        className={`
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0
    fixed lg:static
    inset-y-0 left-0 z-50
    max-lg:w-60
    shrink-0
    bg-white border-r border-gray-200
    flex flex-col
    transition-transform duration-300
  `}

      >

        {/* Logo */}
        <div className="px-4 py-4 max-lg:px-4 max-lg:py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl">
                <SeedItLogo className="w-8 h-8 text-white" />
              </div>

              <div>
                <h1 className="text-xl max-lg:text-lg leading-tight text-green-900">
                  SeedIt
                </h1>
                <p className="text-sm max-lg:text-sm leading-tight text-gray-600 mt-0.5">
                  Urban Gardening
                </p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3
                  px-3 py-3
                  rounded-xl text-base
                  transition-all relative
                  ${isActive
                    ? 'bg-green-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />

                <span className="flex-1 text-left leading-tight">
                  {item.label}
                </span>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs
                    ${isActive
                      ? 'bg-white text-green-600'
                      : 'bg-green-100 text-green-700'}
                  `}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 mb-2">

            <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-base text-gray-900 truncate">{user.name}</p>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
            </div>

          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 max-lg:px-4 py-4 max-lg:py-3 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500"
            >
              <Menu className="w-6 h-6" />
            </button>

            {showBackButton && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm">Back</span>
              </button>
            )}

            <div>
              <h2 className="text-xl max-lg:text-base text-gray-900">
                {navigationItems.find(i => i.id === activePage)?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-600">
                Welcome back, {user.name}!
              </p>
            </div>

          </div>

          {plantsNeedingCare.length > 0 && (
            <button
              onClick={() => handleNavigate('reminders')}
              className="relative flex items-center gap-2 px-3 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            >
              <Bell className="w-5 h-5" />
              <span className="hidden md:inline text-sm">Care</span>

              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {plantsNeedingCare.length}
              </span>
            </button>
          )}

        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 max-lg:p-4">
          <div className="max-w-7xl mx-auto">

            {activePage === 'home' && (
              <WebHomePage
                user={user}
                plants={plants}
                onNavigate={handleNavigate}
                onUpdatePlant={onUpdatePlant}
                onDeletePlant={onDeletePlant}
                weather={weather}
              />
            )}

            {activePage === 'garden' && (
              <WebMyGardenPage
                plants={plants}
                onUpdatePlant={onUpdatePlant}
                onDeletePlant={onDeletePlant}
              />
            )}

            {activePage === 'recommendations' && (
              <WebPlantRecommendationsPage
                user={user}
                plants={plants}
                onAddPlant={onAddPlant}
              />
            )}

            {activePage === 'health-check' && (
              <WebPlantHealthPage
               user={user} 
               plants={plants}
              />
            )}

            {activePage === 'seed-tutorial' && (
              <WebSeedTutorialPage
                plants={plants}
                onAddPlant={onAddPlant}
                onGoToGarden={() => setActivePage('garden')}
              />
            )}

            {activePage === 'reminders' && (
              <WebCareRemindersPage
                plants={plants}
                onUpdatePlant={onUpdatePlant}
                onDeletePlant={onDeletePlant}
                user={user}
                weather={weather}
              />
            )}

            {activePage === 'profile' && (
              <WebProfilePage
                user={user}
                plants={plants}
                onUpdatePlant={onUpdatePlant}
                onDeletePlant={onDeletePlant}
              />
            )}

          </div>
        </div>

      </div>
    </div>
  );
}