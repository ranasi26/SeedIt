import { useState } from 'react';
import { 
  Bell, 
  Camera, 
  Sprout, 
  BookOpen, 
  Heart,
  Droplet,
  Sun,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import type { UserProfile, Plant } from '../../App';

interface HomePageProps {
  user: UserProfile;
  plants: Plant[];
  onNavigate: (page: string) => void;
}

export function HomePage({ user, plants, onNavigate }: HomePageProps) {
  const today = new Date();
  const greeting = today.getHours() < 12 ? 'Good Morning' : today.getHours() < 18 ? 'Good Afternoon' : 'Good Evening';

  // Calculate care reminders
  const getDaysUntilWater = (plant: Plant) => {
    const daysSinceWatered = Math.floor(
      (Date.now() - plant.lastWatered.getTime()) / (1000 * 60 * 60 * 24)
    );
    return plant.waterFrequency - daysSinceWatered;
  };

  const plantsNeedingCare = plants.filter(p => getDaysUntilWater(p) <= 1);
  const upcomingReminders = plants.filter(p => getDaysUntilWater(p) > 1 && getDaysUntilWater(p) <= 3);

  return (
    <div className="h-full overflow-y-auto pb-4">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-b-3xl p-6 text-white mb-4">
        <h2>{greeting}, {user.name}! 👋</h2>
        <p className="text-green-50 mb-4">Your urban garden is growing</p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-2xl mb-1">{plants.length}</p>
            <p className="text-xs text-green-50">Plants</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-2xl mb-1">{plantsNeedingCare.length}</p>
            <p className="text-xs text-green-50">Need Care</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-2xl mb-1">{plants.filter(p => p.currentStage === 'mature').length}</p>
            <p className="text-xs text-green-50">Mature</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Care Alerts */}
        {plantsNeedingCare.length > 0 && (
          <div 
            onClick={() => onNavigate('reminders')}
            className="bg-blue-500 rounded-2xl p-4 text-white cursor-pointer hover:bg-blue-600 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Droplet className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="mb-1">
                  {plantsNeedingCare.length} plant{plantsNeedingCare.length > 1 ? 's' : ''} need attention
                </p>
                <p className="text-sm text-blue-100">Tap to view care reminders</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h3 className="text-gray-900 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('recommendations')}
              className="bg-white rounded-2xl p-4 text-left hover:shadow-md transition-all"
            >
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <Sprout className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-gray-900 mb-1">Find Plants</p>
              <p className="text-xs text-gray-500">Get recommendations</p>
            </button>

            <button
              onClick={() => onNavigate('seed-tutorial')}
              className="bg-white rounded-2xl p-4 text-left hover:shadow-md transition-all"
            >
              <div className="bg-amber-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-gray-900 mb-1">Seed Guide</p>
              <p className="text-xs text-gray-500">Reuse food seeds</p>
            </button>

            <button
              onClick={() => onNavigate('health-check')}
              className="bg-white rounded-2xl p-4 text-left hover:shadow-md transition-all"
            >
              <div className="bg-rose-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <Camera className="w-6 h-6 text-rose-600" />
              </div>
              <p className="text-gray-900 mb-1">Health Check</p>
              <p className="text-xs text-gray-500">Diagnose issues</p>
            </button>

            <button
              onClick={() => onNavigate('reminders')}
              className="bg-white rounded-2xl p-4 text-left hover:shadow-md transition-all relative"
            >
              {plantsNeedingCare.length > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {plantsNeedingCare.length}
                </div>
              )}
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-gray-900 mb-1">Reminders</p>
              <p className="text-xs text-gray-500">Track care tasks</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        {plants.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-900">Your Plants</h3>
              <button 
                onClick={() => onNavigate('garden')}
                className="text-green-600 text-sm"
              >
                View All
              </button>
            </div>
            <div className="space-y-2">
              {plants.slice(0, 3).map(plant => {
                const daysUntilWater = getDaysUntilWater(plant);
                const needsWater = daysUntilWater <= 1;
                
                return (
                  <div
                    key={plant.id}
                    className="bg-white rounded-2xl p-3 flex items-center gap-3"
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900">{plant.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="capitalize">{plant.currentStage}</span>
                        {needsWater && (
                          <span className="flex items-center gap-1 text-blue-600">
                            <Droplet className="w-3 h-3" />
                            Needs water
                          </span>
                        )}
                      </div>
                    </div>
                    {needsWater && (
                      <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Beginner Tips */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-500 text-white p-2 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-gray-900 mb-1">Daily Tip</p>
              <p className="text-sm text-gray-700">
                Morning watering is best! Plants can absorb water better before the heat of the day.
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {plants.length === 0 && (
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Start Your Garden</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Discover plants perfect for your apartment space
            </p>
            <button
              onClick={() => onNavigate('recommendations')}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl"
            >
              Get Recommendations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
