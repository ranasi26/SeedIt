import { useState } from 'react';
import { ChevronRight, Home, Sun, Target, Sprout, ArrowLeft } from 'lucide-react';
import type { UserProfile } from '../App';

interface OnboardingFlowProps {
  onComplete: (profile: Partial<UserProfile>) => void;
  onExit: () => void;
}

export function OnboardingFlow({ onComplete, onExit }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    spaceType: 'apartment',
    outdoorAccess: 'none',
    sunlightHours: 'medium',
    spaceSize: 'small',
    experience: 'beginner',
    goals: []
  });

  const steps = [
    {
      title: 'Welcome to SeedIt!',
      subtitle: '',
      icon: Sprout,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 text-center">
            We'll ask a few questions to recommend the perfect plants for your space and guide you through every step of growing them.
          </p>
          <div className="bg-green-50 rounded-2xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">1</div>
              <div>
                <p className="text-green-900">Assess Your Space</p>
                <p className="text-sm text-green-600">We'll understand your growing conditions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">2</div>
              <div>
                <p className="text-green-900">Get Recommendations</p>
                <p className="text-sm text-green-600">Plants perfect for your situation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">3</div>
              <div>
                <p className="text-green-900">Learn & Grow</p>
                <p className="text-sm text-green-600">Step-by-step guidance from seed to harvest</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Your Living Space',
      subtitle: '',
      icon: Home,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-3">What type of space do you have?</label>
            <div className="space-y-2">
              {[
                { value: 'apartment', label: 'Apartment', desc: 'Limited space, typically indoors' },
                { value: 'house', label: 'House', desc: 'More room, potential outdoor access' },
                { value: 'shared', label: 'Shared Housing', desc: 'Communal living with shared areas' }
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setProfile({ ...profile, spaceType: option.value as any })}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    profile.spaceType === option.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-3">Do you have outdoor access?</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'none', label: 'None', emoji: '🏠' },
                { value: 'balcony', label: 'Balcony', emoji: '🪴' },
                { value: 'patio', label: 'Patio', emoji: '🌿' },
                { value: 'yard', label: 'Yard', emoji: '🌳' }
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setProfile({ ...profile, outdoorAccess: option.value as any })}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    profile.outdoorAccess === option.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.emoji}</div>
                  <p className="text-sm text-gray-900">{option.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Sunlight Conditions',
      subtitle: '',
      icon: Sun,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-2xl p-4">
            <p className="text-sm text-blue-900">
              <strong>Tip:</strong> Observe your space throughout the day. South-facing windows get the most light. North-facing get the least.
            </p>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-3">How much direct sunlight does your space get?</label>
            <div className="space-y-2">
              {[
                { value: 'low', label: 'Low Light (Under 3 hours)', desc: 'North-facing windows or mostly shade', icon: '🌙' },
                { value: 'medium', label: 'Medium Light (3-6 hours)', desc: 'East or west-facing windows', icon: '⛅' },
                { value: 'high', label: 'Bright Light (6+ hours)', desc: 'South-facing or direct sun', icon: '☀️' }
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setProfile({ ...profile, sunlightHours: option.value as any })}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    profile.sunlightHours === option.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <p className="text-gray-900">{option.label}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{option.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-3">Available space for plants?</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'small', label: 'Small', desc: '1-3 pots' },
                { value: 'medium', label: 'Medium', desc: '4-8 pots' },
                { value: 'large', label: 'Large', desc: '9+ pots' }
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setProfile({ ...profile, spaceSize: option.value as any })}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    profile.spaceSize === option.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="text-gray-900 text-sm">{option.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Your Goals',
      subtitle: '',
      icon: Target,
      content: (
        <div className="space-y-4">
          <label className="block text-sm text-gray-700">Select all that interest you:</label>
          <div className="space-y-2">
            {[
              { value: 'herbs', label: 'Fresh Herbs', desc: 'Basil, mint, cilantro for cooking', icon: '🌿' },
              { value: 'vegetables', label: 'Vegetables', desc: 'Tomatoes, peppers, lettuce', icon: '🥬' },
              { value: 'air', label: 'Air Purification', desc: 'Plants that clean the air', icon: '💨' },
              { value: 'aesthetics', label: 'Beautiful Decor', desc: 'Plants that look great', icon: '🎨' },
              { value: 'learning', label: 'Learning Experience', desc: 'Understand how plants grow', icon: '📚' },
              { value: 'seeds', label: 'Save Seeds', desc: 'Grow from fruit/veggie scraps', icon: '🌱' }
            ].map(option => {
              const isSelected = profile.goals?.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    const currentGoals = profile.goals || [];
                    const newGoals = isSelected
                      ? currentGoals.filter(g => g !== option.value)
                      : [...currentGoals, option.value];
                    setProfile({ ...profile, goals: newGoals });
                  }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div className="flex-1">
                      <p className="text-gray-900">{option.label}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{option.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )
    }
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(profile);
    } else {
      setStep(step + 1);
    }
  };

  
 const handleBack = () => {
  if (step === 0) {
    onExit();           // go back to login page
    return;
  }
  setStep((s) => Math.max(0, s - 1));
};


  return (
    <div className="h-screen bg-gradient-to-b from-green-50 to-emerald-50 flex flex-col">
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 py-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-3">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-gray-900 mb-1">{currentStep.title}</h2>
          </div>

          {currentStep.content}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100">
  <div className="max-w-md mx-auto px-4 py-3 flex gap-3">
    
    {/* Back */}
    <button
      type="button"
      onClick={handleBack}
      disabled={false}
      className="w-14 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      aria-label="Back"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>

    {/* Continue / Get Started */}
    <button
      onClick={handleNext}
      disabled={step === 3 && (!profile.goals || profile.goals.length === 0)}
      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      <span>{isLastStep ? 'Get Started' : 'Continue'}</span>
      <ChevronRight className="w-5 h-5" />
    </button>

  </div>
</div>
    </div>
  );
}