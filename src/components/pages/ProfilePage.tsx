import { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Home, 
  Sun, 
  Maximize2, 
  Target,
  Heart,
  Calendar,
  TrendingUp,
  Award,
  Sprout
} from 'lucide-react';
import type { UserProfile, Plant } from '../../App';

interface ProfilePageProps {
  user: UserProfile;
  plants: Plant[];
  onBack: () => void;
  onLogout: () => void;
}

export function ProfilePage({ user, plants, onBack, onLogout }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'saved'>('profile');

  // Calculate stats
  const totalPlants = plants.length;
  const maturePlants = plants.filter(p => p.currentStage === 'mature').length;
  const averageAge = plants.length > 0
    ? Math.floor(plants.reduce((sum, p) => {
        const days = Math.floor((Date.now() - p.plantedDate.getTime()) / (1000 * 60 * 60 * 24));
        return sum + days;
      }, 0) / plants.length)
    : 0;

  const oldestPlant = plants.length > 0
    ? plants.reduce((oldest, p) => {
        const days = Math.floor((Date.now() - p.plantedDate.getTime()) / (1000 * 60 * 60 * 24));
        const oldestDays = Math.floor((Date.now() - oldest.plantedDate.getTime()) / (1000 * 60 * 60 * 24));
        return days > oldestDays ? p : oldest;
      })
    : null;

  const getDaysSincePlanted = (plant: Plant) => {
    return Math.floor((Date.now() - plant.plantedDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getSpaceLabel = (type: string, access: string) => {
    if (type === 'apartment' && access === 'balcony') return '🏢 Apartment with Balcony';
    if (type === 'apartment' && access === 'none') return '🏢 Indoor Apartment';
    if (type === 'house' && access === 'yard') return '🏡 House with Yard';
    if (type === 'house' && access === 'patio') return '🏡 House with Patio';
    return `${type} - ${access}`;
  };

  const getSunlightLabel = (hours: string) => {
    switch (hours) {
      case 'low': return '☁️ Low Light (2-4 hours)';
      case 'medium': return '⛅ Medium Light (4-6 hours)';
      case 'high': return '☀️ High Light (6+ hours)';
      default: return hours;
    }
  };

  const getSpaceSizeLabel = (size: string) => {
    switch (size) {
      case 'small': return '📦 Small Space';
      case 'medium': return '📦 Medium Space';
      case 'large': return '📦 Large Space';
      default: return size;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex-shrink-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 text-white/90 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
            <User className="w-12 h-12" />
          </div>
          <div>
            <h2 className="text-white mb-1">{user.name}</h2>
            <p className="text-green-100">{user.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'profile'
                ? 'bg-white text-green-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'stats'
                ? 'bg-white text-green-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'saved'
                ? 'bg-white text-green-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Plants
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'profile' && (
          <div className="space-y-4">
            {/* Growing Space */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="text-gray-900 mb-3">Your Growing Space</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-xl">
                    <Home className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm">Space Type</p>
                    <p className="text-gray-900">{getSpaceLabel(user.spaceType, user.outdoorAccess)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-2 rounded-xl">
                    <Sun className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm">Sunlight</p>
                    <p className="text-gray-900">{getSunlightLabel(user.sunlightHours)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-xl">
                    <Maximize2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm">Space Size</p>
                    <p className="text-gray-900 capitalize">{getSpaceSizeLabel(user.spaceSize)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm">Experience Level</p>
                    <p className="text-gray-900 capitalize">{user.experience}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gardening Goals */}
            {user.goals && user.goals.length > 0 && (
              <div className="bg-white rounded-2xl p-4">
                <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Your Goals
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.goals.map((goal, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 px-3 py-2 rounded-xl text-sm"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4">
              <h3 className="text-green-900 mb-3">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 text-center">
                  <p className="text-2xl text-green-600 mb-1">{totalPlants}</p>
                  <p className="text-xs text-gray-600">Total Plants</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center">
                  <p className="text-2xl text-green-600 mb-1">{maturePlants}</p>
                  <p className="text-xs text-gray-600">Mature</p>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="text-gray-900 mb-3">Account</h3>
              <button
                onClick={onLogout}
                className="w-full bg-red-50 text-red-600 py-3 rounded-xl hover:bg-red-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-4">
            {/* Achievements */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Achievements
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className={`rounded-xl p-4 text-center ${totalPlants >= 1 ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <div className="text-3xl mb-2">🌱</div>
                  <p className={`text-sm ${totalPlants >= 1 ? 'text-green-900' : 'text-gray-500'}`}>
                    First Plant
                  </p>
                </div>

                <div className={`rounded-xl p-4 text-center ${totalPlants >= 5 ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <div className="text-3xl mb-2">🪴</div>
                  <p className={`text-sm ${totalPlants >= 5 ? 'text-green-900' : 'text-gray-500'}`}>
                    5 Plants
                  </p>
                </div>

                <div className={`rounded-xl p-4 text-center ${maturePlants >= 1 ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <div className="text-3xl mb-2">🌳</div>
                  <p className={`text-sm ${maturePlants >= 1 ? 'text-green-900' : 'text-gray-500'}`}>
                    First Mature
                  </p>
                </div>

                <div className={`rounded-xl p-4 text-center ${totalPlants >= 10 ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <div className="text-3xl mb-2">🏆</div>
                  <p className={`text-sm ${totalPlants >= 10 ? 'text-green-900' : 'text-gray-500'}`}>
                    Expert
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Stats */}
            {plants.length > 0 && (
              <div className="bg-white rounded-2xl p-4">
                <h3 className="text-gray-900 mb-4">Garden Statistics</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Average Plant Age</span>
                      <span className="text-gray-900">{averageAge} days</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500"
                        style={{ width: `${Math.min(averageAge, 100)}%` }}
                      />
                    </div>
                  </div>

                  {oldestPlant && (
                    <div className="bg-green-50 rounded-xl p-3">
                      <p className="text-sm text-gray-600 mb-1">Oldest Plant</p>
                      <div className="flex items-center gap-2">
                        <img
                          src={oldestPlant.image}
                          alt={oldestPlant.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-gray-900">{oldestPlant.name}</p>
                          <p className="text-sm text-gray-600">
                            {getDaysSincePlanted(oldestPlant)} days old
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-gray-600 mb-2">Growth Stages</p>
                    <div className="space-y-2">
                      {(['seed', 'seedling', 'growing', 'mature'] as const).map(stage => {
                        const count = plants.filter(p => p.currentStage === stage).length;
                        const percentage = (count / plants.length) * 100;
                        
                        return (
                          <div key={stage}>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600 capitalize">{stage}</span>
                              <span className="text-gray-900">{count}</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {plants.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="bg-gray-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Sprout className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-600">No plants yet</p>
                <p className="text-sm text-gray-500 mt-1">Start your garden to see stats</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="space-y-3">
            {plants.length > 0 ? (
              plants.map(plant => {
                const age = getDaysSincePlanted(plant);
                
                return (
                  <div key={plant.id} className="bg-white rounded-2xl p-4">
                    <div className="flex gap-3">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 mb-1">{plant.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{plant.species}</p>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {age}d old
                          </span>
                          <span className="capitalize px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            {plant.currentStage}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Heart className="w-5 h-5 text-red-500 fill-current" />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="bg-gray-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-600">No saved plants</p>
                <p className="text-sm text-gray-500 mt-1">Plants you add will appear here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
