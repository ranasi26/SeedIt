import { useState } from 'react';
import { ArrowLeft, Sprout, CheckCircle2, AlertCircle, Package } from 'lucide-react';
import type { Plant } from '../../App';

interface SeedTutorialPageProps {
  onBack: () => void;
  onGoToGarden: () => void;
  plants: Plant[];
  onAddPlant: (plant: Omit<Plant, 'id'>) => Promise<void>;
}

interface Tutorial {
  id: string;
  name: string;
  fruit: string;
  image: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;

  plantName: string;
  species: string;
  sunlight: 'low' | 'medium' | 'high';
  waterFrequency: number;
  tags: string[];

  materials: string[];

  steps: {
    title: string;
    description: string;
    tips?: string;
  }[];

  warnings?: string[];
}

export function SeedTutorialPage({ onBack, onGoToGarden, plants, onAddPlant }: SeedTutorialPageProps) {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);

  const isAlreadyAdded =
    selectedTutorial
      ? plants.some(
        (p) => p.name.toLowerCase() === selectedTutorial.plantName.toLowerCase()
      )
      : false;

  const handleStartGrowing = async () => {
    if (!selectedTutorial) return;

    const newPlant: Omit<Plant, 'id'> = {
      name: selectedTutorial.plantName,
      species: selectedTutorial.species,
      image: selectedTutorial.image,
      waterFrequency: selectedTutorial.waterFrequency,
      lastWatered: new Date(),
      sunlight: selectedTutorial.sunlight,
      notes: `Started from Seed Guide: ${selectedTutorial.name}`,
      plantedDate: new Date(),
      currentStage: 'seed',
      difficulty: selectedTutorial.difficulty,
      tags: selectedTutorial.tags
    };

    try {
      await onAddPlant(newPlant);
      setSelectedTutorial(null);
      onGoToGarden();
    } catch (error) {
      console.error('Failed to add plant:', error);
      alert('Failed to add plant to My Garden');
    }
  };

  const tutorials: Tutorial[] = [
    {
      id: 'tomato',
      name: 'Tomato Seeds',
      plantName: 'Tomato',
      species: 'Solanum lycopersicum',
      fruit: '🍅',
      image: 'https://images.unsplash.com/photo-1748432171507-c1d62fe2e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBwbGFudCUyMGdyb3dpbmd8ZW58MXx8fHwxNzY4MzYxMDE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'easy',
      duration: '7 days prep + 60-80 days to harvest',
      sunlight: 'high',
      waterFrequency: 2,
      tags: ['vegetables', 'seeds'],
      materials: [
        'Ripe tomato',
        'Knife or spoon',
        'Small bowl',
        'Water',
        'Fine strainer',
        'Paper towel or paper plate',
        'Seed-starting mix',
        'Small pot or tray'
      ],
      steps: [
        {
          title: 'Choose Your Tomato',
          description: 'Select a ripe, healthy tomato from the grocery store. Heirloom varieties work best, but cherry tomatoes are easiest for beginners.',
          tips: 'Look for organic tomatoes when possible - they\'re more likely to produce viable seeds.'
        },
        {
          title: 'Extract the Seeds',
          description: 'Cut the tomato in half and scoop out the seeds and gel into a small bowl. The gel contains germination inhibitors that need to be removed.',
          tips: 'Use a spoon to gently squeeze the seeds out without damaging them.'
        },
        {
          title: 'Fermentation Process',
          description: 'Add a little water to the seeds and let sit for 2-3 days at room temperature. This ferments the gel coating and kills seed-borne diseases.',
          tips: 'You\'ll see mold form on top - this is normal! Just skim it off before the next step.'
        },
        {
          title: 'Rinse and Dry',
          description: 'Rinse the seeds thoroughly in a fine strainer. Spread them on a paper plate or towel to dry completely (about 5-7 days).',
          tips: 'Make sure seeds are completely dry before storing - moisture causes mold.'
        },
        {
          title: 'Store or Plant',
          description: 'Store dried seeds in a paper envelope in a cool, dry place. Or plant immediately in seed-starting mix, 1/4 inch deep.',
          tips: 'Seeds can be stored for up to 4 years if kept dry and cool.'
        },
        {
          title: 'Germination Care',
          description: 'Keep soil moist but not waterlogged. Seeds should germinate in 5-10 days. Once sprouted, provide plenty of light.',
          tips: 'Bottom heat (like on top of a refrigerator) speeds up germination.'
        }
      ],
      warnings: ['Hybrid tomatoes may not grow true to type', 'Needs 6+ hours of sunlight daily']
    },
    {
      id: 'pepper',
      name: 'Bell Pepper Seeds',
      fruit: '🫑',
      image: 'https://images.unsplash.com/photo-1632819773825-2b801de6c2d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxjb255JTIwZ2FyZGVuJTIwdXJiYW58ZW58MXx8fHwxNzY4NDIyMzQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'medium',
      duration: '3 days prep + 75-90 days to harvest',
      plantName: 'Bell Pepper',
      species: 'Capsicum annuum',
      sunlight: 'high',
      waterFrequency: 3,
      tags: ['vegetables', 'seeds'],
      materials: [
        'Fully ripe bell pepper',
        'Knife',
        'Paper towel',
        'Small container or seed tray',
        'Seed-starting mix',
        'Water'
      ],
      steps: [
        {
          title: 'Select a Ripe Pepper',
          description: 'Choose a fully ripe, colorful pepper (red, yellow, or orange work best). Green peppers are unripe and have less viable seeds.',
          tips: 'Organic peppers are more reliable for seed saving.'
        },
        {
          title: 'Extract Seeds',
          description: 'Cut the pepper open and remove the seeds from the core. Discard any small, discolored, or damaged seeds.',
          tips: 'The seeds attached to the core are usually the most viable.'
        },
        {
          title: 'Clean and Dry',
          description: 'Rinse seeds gently and spread on a paper towel. Let dry completely for 3-5 days in a warm, dry location.',
          tips: 'Flip seeds daily to ensure even drying.'
        },
        {
          title: 'Plant the Seeds',
          description: 'Plant seeds 1/4 inch deep in seed-starting mix. Keep warm (75-85°F) and moist.',
          tips: 'Use a heat mat for faster germination - peppers love warmth!'
        },
        {
          title: 'Transplant Seedlings',
          description: 'Once seedlings have 2-3 true leaves and outdoor temps are above 60°F at night, transplant to larger pots.',
          tips: 'Harden off seedlings by gradually exposing them to outdoor conditions.'
        }
      ],
      warnings: ['Needs consistent warmth (70-85°F)', 'Takes longer to germinate than tomatoes (10-21 days)']
    },
    {
      id: 'lettuce',
      name: 'Lettuce Regrowth',
      fruit: '🥬',
      image: 'https://images.unsplash.com/photo-1627730327661-9b5efb7d47b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGNhcmUlMjB3YXRlcmluZ3xlbnwxfHx8fDE3Njg0MjIzNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'easy',
      duration: '3-5 days to sprout + ongoing harvest',
      plantName: 'Lettuce',
      species: 'Lactuca sativa',
      sunlight: 'medium',
      waterFrequency: 2,
      tags: ['vegetables', 'regrowth'],
      materials: [
        'Lettuce base or stump',
        'Shallow bowl',
        'Water',
        'Sunny windowsill',
        'Optional: pot and soil'
      ],
      steps: [
        {
          title: 'Save the Stump',
          description: 'When cutting lettuce for a meal, leave about 2-3 inches of the base intact with the core.',
          tips: 'Romaine lettuce works best for this method.'
        },
        {
          title: 'Water Method',
          description: 'Place the lettuce base in a shallow bowl with about 1/2 inch of water. Keep the core submerged but leaves above water.',
          tips: 'Change the water every 1-2 days to prevent rot.'
        },
        {
          title: 'Provide Light',
          description: 'Place the bowl in a sunny windowsill. You should see new growth within 3-5 days.',
          tips: 'Rotate the bowl daily for even growth.'
        },
        {
          title: 'Watch It Grow',
          description: 'New leaves will sprout from the center. You can harvest leaves as they grow or wait for a fuller head.',
          tips: 'This method gives you 2-3 harvests before the plant is exhausted.'
        },
        {
          title: 'Optional: Plant in Soil',
          description: 'After roots develop (about 7-10 days), you can transplant to soil for longer-term growth.',
          tips: 'Use well-draining potting mix and keep consistently moist.'
        }
      ],
      warnings: ['Not true seed saving - this is vegetative regrowth', 'Limited harvests (2-3 before plant exhausts)']
    },
    {
      id: 'green-onion',
      name: 'Green Onion Regrowth',
      fruit: '🧅',
      image: 'https://images.unsplash.com/photo-1652366358812-6fde6d1f1caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwbGFudHMlMjBhcGFydG1lbnR8ZW58MXx8fHwxNzY4NDIyMzQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'easy',
      duration: '5-7 days to regrow + continuous harvest',
      plantName: 'Green Onion',
      species: 'Allium fistulosum',
      sunlight: 'medium',
      waterFrequency: 2,
      tags: ['vegetables', 'regrowth'],
      materials: [
        'Green onion root ends',
        'Glass or jar',
        'Water',
        'Sunny spot',
        'Optional: pot and soil'
      ],
      steps: [
        {
          title: 'Save the Roots',
          description: 'When using green onions, cut off the green parts but keep the white bulb with roots attached (about 2 inches from the bottom).',
          tips: 'Make sure the roots are intact - they\'re essential for regrowth.'
        },
        {
          title: 'Place in Water',
          description: 'Put the root ends in a glass with about 1 inch of water. The water should cover the roots but not submerge the entire bulb.',
          tips: 'Use a clear glass so you can monitor root growth.'
        },
        {
          title: 'Change Water Regularly',
          description: 'Change the water every 2-3 days to keep it fresh and prevent bacterial growth.',
          tips: 'Room temperature water is best - not too cold or hot.'
        },
        {
          title: 'Wait for Growth',
          description: 'Green shoots will appear in 3-5 days. They grow quickly and can be harvested when they reach your desired length.',
          tips: 'You can harvest multiple times from the same roots.'
        },
        {
          title: 'Optional: Soil Transfer',
          description: 'For longer-term growth, transplant to soil after roots are well-developed (about 1 week).',
          tips: 'Plant 1-2 inches deep in well-draining soil. Keep moist but not soggy.'
        }
      ],
      warnings: ['Change water regularly to avoid rot', 'Can regrow indefinitely in water or soil']
    },
    {
      id: 'basil',
      name: 'Basil from Cuttings',
      fruit: '🌿',
      image: 'https://images.unsplash.com/photo-1618343619081-e65a0559a91d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJicyUyMHdpbmRvd3NpbGx8ZW58MXx8fHwxNzY4NDIyMzQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'easy',
      duration: '7-14 days to root + 30 days to harvest',
      plantName: 'Basil',
      species: 'Ocimum basilicum',
      sunlight: 'medium',
      waterFrequency: 2,
      tags: ['herbs', 'cuttings'],
      materials: [
        'Fresh basil stems',
        'Clean scissors',
        'Glass or jar',
        'Water',
        'Small pot',
        'Potting soil'
      ],
      steps: [
        {
          title: 'Get Fresh Basil',
          description: 'Buy fresh basil from the grocery store. Look for stems that are 4-6 inches long with healthy leaves.',
          tips: 'Choose stems that haven\'t flowered yet - they root better.'
        },
        {
          title: 'Prepare Cuttings',
          description: 'Cut stems just below a leaf node (where leaves attach to stem). Remove lower leaves, keeping only the top 2-3 sets.',
          tips: 'Use clean, sharp scissors or knife to make a clean cut.'
        },
        {
          title: 'Root in Water',
          description: 'Place stems in a glass of water with 2-3 inches of water. Make sure no leaves are submerged.',
          tips: 'Place in a warm, bright spot but not direct harsh sunlight.'
        },
        {
          title: 'Wait for Roots',
          description: 'Change water every 2-3 days. Roots should appear in 7-14 days.',
          tips: 'Roots are ready for planting when they\'re 1-2 inches long.'
        },
        {
          title: 'Plant in Soil',
          description: 'Transfer rooted cuttings to pots with well-draining potting mix. Water gently and keep in bright light.',
          tips: 'Keep soil consistently moist for the first week after planting.'
        },
        {
          title: 'Harvest and Maintain',
          description: 'Pinch off the top leaves to encourage bushy growth. Never take more than 1/3 of the plant at once.',
          tips: 'Remove flower buds to keep the plant producing tasty leaves.'
        }
      ],
      warnings: ['Needs 6+ hours of light daily', 'Sensitive to cold - keep above 50°F']
    }
  ];

  if (selectedTutorial) {
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200">
          <button
            onClick={() => setSelectedTutorial(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to tutorials</span>
          </button>
        </div>

        {/* Tutorial Content */}
        <div className="flex-1 overflow-y-auto pb-4">
          <div className="relative">
            <img
              src={selectedTutorial.image}
              alt={selectedTutorial.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-3xl">
              {selectedTutorial.fruit}
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <h2 className="text-gray-900 mb-1">{selectedTutorial.name}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className={`px-2 py-1 rounded-full ${
                  selectedTutorial.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  selectedTutorial.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedTutorial.difficulty.charAt(0).toUpperCase() + selectedTutorial.difficulty.slice(1)}
                </span>
                <span>•</span>
                <span>{selectedTutorial.duration}</span>
              </div>
            </div>

            {/* Warnings */}
            {selectedTutorial.warnings && selectedTutorial.warnings.length > 0 && (
              <div className="bg-amber-50 rounded-2xl p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-900 mb-2">Important Notes</p>
                    <ul className="space-y-1 text-sm text-amber-800">
                      {selectedTutorial.warnings.map((warning, index) => (
                        <li key={index}>• {warning}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
  <div className="flex items-start gap-3">
    <Package className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
    <div className="flex-1">
      <p className="text-gray-900 mb-3">What You Need</p>
      <div className="space-y-2">
        {selectedTutorial.materials.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
            <p className="text-sm text-gray-700">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

            {/* Steps */}
            <div>
              <h3 className="text-gray-900 mb-3">Step-by-Step Guide</h3>
              <div className="space-y-4">
                {selectedTutorial.steps.map((step, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex gap-3">
                      <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-2">{step.title}</h4>
                        <p className="text-gray-700 mb-3">{step.description}</p>
                        {step.tips && (
                          <div className="bg-green-100 rounded-xl p-3 flex gap-2">
                            <span className="text-green-600 flex-shrink-0">💡</span>
                            <p className="text-sm text-green-800">{step.tips}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Tips */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-900 mb-2">Success Tips</p>
                  <ul className="space-y-1 text-sm text-green-800">
                    <li>• Label everything with the date and plant variety</li>
                    <li>• Be patient - some seeds take longer than others</li>
                    <li>• Keep a gardening journal to track what works</li>
                    <li>• Don't get discouraged if some seeds don't sprout</li>
                  </ul>
                </div>
              </div>
            </div>

<div className="pt-2">
  {isAlreadyAdded ? (
    <div className="w-full py-4 rounded-xl bg-gray-100 text-gray-500 text-center">
      Already in My Garden
    </div>
  ) : (
    <button
      onClick={handleStartGrowing}
      className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-sm"
    >
      Start Growing This Plant
    </button>
  )}
</div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex-shrink-0 bg-white p-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h2 className="text-gray-900">Seed Reuse Tutorials</h2>
        <p className="text-gray-600">Turn kitchen scraps into thriving plants</p>
      </div>

      {/* Tutorial List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              onClick={() => setSelectedTutorial(tutorial)}
              className="bg-white rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <img
                    src={tutorial.image}
                    alt={tutorial.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute -top-1 -right-1 bg-white rounded-full w-8 h-8 flex items-center justify-center text-xl shadow-sm">
                    {tutorial.fruit}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 mb-1">{tutorial.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tutorial.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      tutorial.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{tutorial.steps.length} easy steps</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 text-white">
          <div className="flex gap-3">
            <Sprout className="w-8 h-8 flex-shrink-0" />
            <div>
              <p className="mb-2">Why Save Seeds?</p>
              <p className="text-sm text-green-50">
                Save money, reduce waste, and learn the complete growing cycle. Many grocery store items can become your garden!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
