import { 
  Sprout, 
  BookOpen, 
  Camera, 
  Bell,
  Droplet,
  TrendingUp,
  Calendar,
  Sun,
  AlertCircle
} from 'lucide-react';
import type { UserProfile, Plant } from '../../App';

interface WebHomePageProps {
  user: UserProfile;
  plants: Plant[];
  onNavigate: (page: string) => void;
}

export function WebHomePage({ user, plants, onNavigate }: WebHomePageProps) {
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
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
        <h2 className="mb-2">{greeting}, {user.name}! 👋</h2>
        <p className="text-green-50 mb-6">Your urban garden is growing beautifully</p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-3xl mb-1">{plants.length}</p>
            <p className="text-sm text-green-50">Total Plants</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-3xl mb-1">{plantsNeedingCare.length}</p>
            <p className="text-sm text-green-50">Need Care</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-3xl mb-1">{plants.filter(p => p.currentStage === 'mature').length}</p>
            <p className="text-sm text-green-50">Mature</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-3xl mb-1">{upcomingReminders.length}</p>
            <p className="text-sm text-green-50">Upcoming</p>
          </div>
        </div>
      </div>

      {/* Care Alerts */}
      {plantsNeedingCare.length > 0 && (
        <div 
          onClick={() => onNavigate('reminders')}
          className="bg-blue-500 rounded-2xl p-6 text-white cursor-pointer hover:bg-blue-600 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Droplet className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">
                {plantsNeedingCare.length} plant{plantsNeedingCare.length > 1 ? 's' : ''} need attention today
              </h3>
              <p className="text-blue-100 mb-3">
                {plantsNeedingCare.map(p => p.name).join(', ')}
              </p>
              <button className="px-4 py-2 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors">
                View Care Tasks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h3 className="text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('recommendations')}
            className="bg-white rounded-2xl p-6 text-left hover:shadow-lg transition-all border border-gray-200"
          >
            <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Sprout className="w-7 h-7 text-green-600" />
            </div>
            <h4 className="text-gray-900 mb-2">Find Plants</h4>
            <p className="text-sm text-gray-600">Get personalized recommendations for your space</p>
          </button>

          <button
            onClick={() => onNavigate('seed-tutorial')}
            className="bg-white rounded-2xl p-6 text-left hover:shadow-lg transition-all border border-gray-200"
          >
            <div className="bg-amber-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-amber-600" />
            </div>
            <h4 className="text-gray-900 mb-2">Seed Guide</h4>
            <p className="text-sm text-gray-600">Learn to save and reuse seeds from groceries</p>
          </button>

          <button
            onClick={() => onNavigate('health-check')}
            className="bg-white rounded-2xl p-6 text-left hover:shadow-lg transition-all border border-gray-200"
          >
            <div className="bg-rose-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Camera className="w-7 h-7 text-rose-600" />
            </div>
            <h4 className="text-gray-900 mb-2">Health Check</h4>
            <p className="text-sm text-gray-600">AI-powered plant disease detection</p>
          </button>

          <button
            onClick={() => onNavigate('reminders')}
            className="bg-white rounded-2xl p-6 text-left hover:shadow-lg transition-all border border-gray-200 relative"
          >
            {plantsNeedingCare.length > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-sm w-7 h-7 rounded-full flex items-center justify-center">
                {plantsNeedingCare.length}
              </div>
            )}
            <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Bell className="w-7 h-7 text-purple-600" />
            </div>
            <h4 className="text-gray-900 mb-2">Care Reminders</h4>
            <p className="text-sm text-gray-600">Track watering and maintenance tasks</p>
          </button>
        </div>
      </div>

      {/* Recent Plants */}
      {plants.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Your Recent Plants</h3>
            <button 
              onClick={() => onNavigate('garden')}
              className="text-green-600 hover:text-green-700"
            >
              View All →
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plants.slice(0, 6).map(plant => {
              const daysUntilWater = getDaysUntilWater(plant);
              const needsWater = daysUntilWater <= 1;
              
              return (
                <div
                  key={plant.id}
                  className="bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="flex gap-4">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 mb-1">{plant.name}</h4>
                      <p className="text-sm text-gray-600 mb-2 truncate">{plant.species}</p>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <span className="capitalize px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          {plant.currentStage}
                        </span>
                        {needsWater && (
                          <span className="flex items-center gap-1 text-blue-600">
                            <Droplet className="w-3 h-3" />
                            Water {daysUntilWater === 0 ? 'today' : 'overdue'}
                          </span>
                        )}
                      </div>
                    </div>
                    {needsWater && (
                      <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {plants.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Sprout className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Start Your Urban Garden</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Discover plants perfect for your apartment space and begin your gardening journey
          </p>
          <button
            onClick={() => onNavigate('recommendations')}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            Get Plant Recommendations
          </button>
        </div>
      )}

      {/* Daily Tip */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-start gap-4">
            <div className="bg-green-500 text-white p-3 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-green-900 mb-2">Daily Gardening Tip</h4>
              <p className="text-green-800">
                Morning watering is best! Plants can absorb water better before the heat of the day, reducing evaporation and disease risk.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-500 text-white p-3 rounded-xl">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-blue-900 mb-2">Your Growing Conditions</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p>• Space: {user.spaceType} {user.outdoorAccess !== 'none' && `with ${user.outdoorAccess}`}</p>
                <p>• Sunlight: {user.sunlightHours} hours daily</p>
                <p>• Size: {user.spaceSize} growing area</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
