import { useState } from 'react';
import { BookOpen, Sprout, Droplet, Sun, Package, Recycle, ChevronRight, PlayCircle } from 'lucide-react';
import type { UserProfile } from '../../App';
import { GuideDetailDialog } from '../GuideDetailDialog';

interface LearnTabProps {
  user: UserProfile;
}

interface Guide {
  id: string;
  title: string;
  category: 'basics' | 'seeds' | 'care' | 'troubleshooting';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  description: string;
  icon: any;
  steps: {
    title: string;
    content: string;
    tip?: string;
  }[];
}

export function LearnTab({ user }: LearnTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basics' | 'seeds' | 'care'>('all');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const guides: Guide[] = [
    {
      id: 'starting-seeds',
      title: 'Starting from Seeds',
      category: 'seeds',
      difficulty: 'beginner',
      duration: '5 min read',
      description: 'Learn how to save and plant seeds from everyday fruits and vegetables',
      icon: Sprout,
      steps: [
        {
          title: 'Choosing Your Seeds',
          content: 'Start with seeds from organic fruits and vegetables. Tomatoes, peppers, lemons, and avocados are great for beginners. Non-organic produce may have been treated to prevent germination.',
          tip: 'Heirloom varieties produce seeds that grow true to the parent plant, making them ideal for seed saving.'
        },
        {
          title: 'Extracting Seeds',
          content: 'For fleshy fruits (tomatoes, peppers): Scoop out seeds and rinse thoroughly to remove pulp. For citrus: Remove seeds and rinse. For avocados: Clean the pit and remove brown skin.',
          tip: 'Tomato seeds benefit from a fermentation process: leave seeds in water for 2-3 days to remove germination-inhibiting coating.'
        },
        {
          title: 'Drying Seeds',
          content: 'Place cleaned seeds on a paper towel or plate in a warm, dry location. Allow 1-2 weeks for complete drying. Seeds should snap rather than bend when fully dry.',
          tip: 'Label your seeds with the variety and date. Properly dried seeds can be stored for 1-5 years depending on the variety.'
        },
        {
          title: 'Planting Your Seeds',
          content: 'Use seed starting mix (lighter than regular potting soil). Plant seeds at a depth of 2-3 times their width. Keep soil moist but not waterlogged. Most seeds germinate best at 65-75°F.',
          tip: 'Cover pots with plastic wrap to create a greenhouse effect until seeds sprout, then remove covering.'
        }
      ]
    },
    {
      id: 'first-time-planting',
      title: 'Your First Plant: Complete Guide',
      category: 'basics',
      difficulty: 'beginner',
      duration: '8 min read',
      description: 'Step-by-step guide from choosing a container to seeing your first sprout',
      icon: Package,
      steps: [
        {
          title: 'Selecting a Container',
          content: 'Choose pots with drainage holes. Size matters: herbs need 6-8" pots, vegetables need 10-12". Start with plastic or ceramic pots—they retain moisture better than terra cotta.',
          tip: 'Reuse food containers! Yogurt cups, takeout containers, or egg cartons make great seed starters. Just poke drainage holes in the bottom.'
        },
        {
          title: 'Choosing the Right Soil',
          content: 'Never use garden soil for containers—it\'s too heavy. Buy potting mix (not potting soil). Good mix contains peat moss or coco coir, perlite for drainage, and compost for nutrients.',
          tip: 'Moisten soil before filling containers. Dry potting mix can be hard to wet and may repel water initially.'
        },
        {
          title: 'Planting Technique',
          content: 'Fill container to 1" below rim. For seeds: plant at 2-3x seed depth. For seedlings: plant at same depth they were growing. Gently firm soil around plant and water thoroughly.',
          tip: 'Water until it drains from bottom holes. This ensures soil is evenly moist and removes air pockets.'
        },
        {
          title: 'Finding the Right Spot',
          content: 'Most vegetables and herbs need 6+ hours of direct sun. Low-light plants need 2-4 hours. South-facing windows get most light. Rotate plants weekly for even growth.',
          tip: 'If you lack sun, consider grow lights. LED grow lights are energy-efficient and work great for herbs and small vegetables.'
        },
        {
          title: 'Watering Basics',
          content: 'Stick your finger 1-2" into soil. If dry, water. If moist, wait. Overwatering kills more plants than underwatering. Water when top inch is dry, not on a schedule.',
          tip: 'Bottom watering (placing pot in water tray) encourages deep root growth and prevents overwatering.'
        }
      ]
    },
    {
      id: 'understanding-light',
      title: 'Understanding Light Requirements',
      category: 'basics',
      difficulty: 'beginner',
      duration: '4 min read',
      description: 'Match plants to your space\'s lighting conditions',
      icon: Sun,
      steps: [
        {
          title: 'Measuring Your Light',
          content: 'Direct sunlight: Unobstructed sun rays hit the spot. Bright indirect: Bright area but no direct sun rays. Low light: Away from windows or north-facing. Track light over a full day—it changes seasonally.',
          tip: 'Use your hand: Hold it 1 foot from plant spot at noon. Sharp, dark shadow = direct sun. Soft shadow = bright indirect. No shadow = low light.'
        },
        {
          title: 'High Light Plants (6+ hours)',
          content: 'Tomatoes, peppers, basil, citrus trees, succulents. These need south or west-facing windows. Signs of too little light: leggy growth, pale leaves, no flowering.',
          tip: 'Supplement with grow lights if natural light is insufficient. Place 6-12" above plants for 12-16 hours daily.'
        },
        {
          title: 'Medium Light Plants (3-6 hours)',
          content: 'Lettuce, spinach, mint, most herbs, many houseplants. East-facing windows or filtered light from south windows work well.',
          tip: 'These are most forgiving and adapt to varying conditions, making them perfect for beginners.'
        },
        {
          title: 'Low Light Plants (2-3 hours)',
          content: 'Pothos, snake plant, ZZ plant, peace lily. Thrive in north-facing windows or away from windows. Don\'t mistake low light for no light—all plants need some light.',
          tip: 'Even "low light" plants grow better in bright indirect light. They survive in low light but won\'t thrive.'
        }
      ]
    },
    {
      id: 'watering-guide',
      title: 'Watering: When and How Much',
      category: 'care',
      difficulty: 'beginner',
      duration: '6 min read',
      description: 'Master the most important skill in plant care',
      icon: Droplet,
      steps: [
        {
          title: 'The Finger Test',
          content: 'Insert your finger 1-2" into the soil. Dry = water needed. Moist = check tomorrow. Wet = wait several days. This is more reliable than any schedule.',
          tip: 'Different plants have different needs. Learn each plant\'s preference—some like to dry out between waterings, others prefer consistent moisture.'
        },
        {
          title: 'Proper Watering Technique',
          content: 'Water the soil, not the leaves. Use room temperature water. Water slowly until it drains from bottom. Empty drainage tray after 30 minutes to prevent root rot.',
          tip: 'Morning watering is best—gives plants moisture for the day and excess evaporates. Evening watering can promote fungal issues.'
        },
        {
          title: 'Signs of Overwatering',
          content: 'Yellow leaves, mushy stems, mold on soil, constantly wet soil, root rot smell. Overwatering is the #1 killer of indoor plants. When in doubt, wait another day.',
          tip: 'If overwatered, let soil dry completely before watering again. Remove plant from pot to check roots—healthy roots are white or tan, rotted roots are brown and mushy.'
        },
        {
          title: 'Signs of Underwatering',
          content: 'Drooping leaves that perk up after watering, dry crispy leaves, slow growth, soil pulling away from pot edges, extremely light pot weight.',
          tip: 'Set a reminder to check plants every few days. It\'s easier to save an underwatered plant than an overwatered one.'
        },
        {
          title: 'Adjusting for Seasons',
          content: 'Plants need more water in spring/summer (active growth, more light) and less in fall/winter (dormant period, less light). Your home\'s humidity and temperature also affect watering needs.',
          tip: 'Use pot weight as a guide: lift your pot when just watered and when dry. You\'ll learn to tell when plants need water by weight.'
        }
      ]
    },
    {
      id: 'save-citrus-seeds',
      title: 'Growing Citrus from Seeds',
      category: 'seeds',
      difficulty: 'intermediate',
      duration: '6 min read',
      description: 'Turn lemon, orange, or lime seeds into beautiful trees',
      icon: Recycle,
      steps: [
        {
          title: 'Collecting Seeds',
          content: 'Use organic citrus fruits. Extract seeds from ripe, healthy fruits. Choose plump, full seeds—flat or shriveled seeds won\'t germinate. You need several seeds as not all will sprout.',
          tip: 'Fresh seeds germinate best. Plant within a few days of extraction for highest success rate.'
        },
        {
          title: 'Preparing Seeds',
          content: 'Rinse seeds thoroughly to remove all fruit residue and sugars. Carefully remove the outer seed coat (optional but increases germination rate). Soak seeds in warm water overnight.',
          tip: 'The seed coat removal is tricky but worth it. Gently peel it off without damaging the seed inside.'
        },
        {
          title: 'Planting Process',
          content: 'Use well-draining potting mix. Plant seeds 1/2" deep. Keep soil consistently moist but not soggy. Cover pot with plastic wrap to maintain humidity. Place in warm spot (70-80°F).',
          tip: 'Germination takes 2-6 weeks. Be patient! Keep checking for sprouts and maintain consistent moisture.'
        },
        {
          title: 'Caring for Seedlings',
          content: 'Once sprouted, move to bright indirect light. Gradually increase light over 2 weeks. Transplant to larger pot when 4-6 inches tall. Citrus needs 8-12 hours of light daily.',
          tip: 'Citrus from seed takes 3-5 years to fruit, but they make beautiful houseplants with fragrant leaves!'
        },
        {
          title: 'Long-term Care',
          content: 'Feed monthly with diluted fertilizer during growing season. Prune to maintain shape. Watch for pests (spider mites, aphids). Bring indoors if temperatures drop below 50°F.',
          tip: 'Citrus trees like humid environments. Mist leaves regularly or use a pebble tray with water beneath the pot.'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Common Problems & Solutions',
      category: 'troubleshooting',
      difficulty: 'beginner',
      duration: '7 min read',
      description: 'Diagnose and fix issues before they become serious',
      icon: BookOpen,
      steps: [
        {
          title: 'Yellow Leaves',
          content: 'Most common cause: overwatering. Other causes: natural aging (lower leaves), nutrient deficiency, or too much sun. Check soil moisture first—if wet, let dry. If dry soil, could be nutrients.',
          tip: 'Old yellow leaves at bottom are normal. Widespread yellowing indicates a problem that needs addressing.'
        },
        {
          title: 'Brown Leaf Tips',
          content: 'Usually low humidity or salt buildup from tap water. Solutions: increase humidity (mist, pebble tray, humidifier), use filtered or rainwater, flush soil occasionally with fresh water.',
          tip: 'Salt buildup appears as white crust on soil surface. Flush by watering thoroughly until water runs clear from drainage holes.'
        },
        {
          title: 'Leggy Growth',
          content: 'Plant stretching toward light = insufficient light. Solution: move closer to window or add grow lights. Prune leggy growth to encourage bushier plant.',
          tip: 'Rotate plants weekly so all sides receive equal light and plant grows evenly rather than leaning.'
        },
        {
          title: 'No Growth',
          content: 'Possible causes: wrong season (dormancy), root bound, poor light, or nutrient deficiency. Check if roots are circling pot—if so, time to repot. Fertilize during growing season (spring/summer).',
          tip: 'Many plants naturally rest in winter. Reduced growth in fall/winter is normal and healthy.'
        },
        {
          title: 'Pests',
          content: 'Common indoor pests: fungus gnats (from overwatering), spider mites, aphids. Solutions: reduce watering for gnats, spray with diluted neem oil for mites/aphids, isolate affected plants.',
          tip: 'Inspect new plants before bringing home. Quarantine new plants for 2 weeks away from your other plants.'
        }
      ]
    }
  ];

  const filteredGuides = guides.filter(guide => 
    selectedCategory === 'all' || guide.category === selectedCategory
  );

  const categories = [
    { value: 'all', label: 'All Guides', icon: BookOpen },
    { value: 'basics', label: 'Basics', icon: Sprout },
    { value: 'seeds', label: 'Seed Saving', icon: Recycle },
    { value: 'care', label: 'Plant Care', icon: Droplet }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-6 text-white">
        <div className="flex items-start gap-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="mb-2">Learning Center</h2>
            <p className="text-sm text-purple-50">
              Step-by-step guides designed for beginners
            </p>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
        <p className="text-sm text-amber-900">
          <strong>💡 Tip of the Day:</strong> The #1 mistake beginners make is overwatering. Always check soil moisture before watering—when in doubt, wait another day!
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value as any)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === category.value
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Guides List */}
      <div className="space-y-3">
        {filteredGuides.map(guide => {
          const Icon = guide.icon;
          const difficultyColors = {
            beginner: 'bg-green-100 text-green-700',
            intermediate: 'bg-yellow-100 text-yellow-700',
            advanced: 'bg-orange-100 text-orange-700'
          };

          return (
            <button
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl flex-shrink-0">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-gray-900">{guide.title}</h3>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-1 rounded-lg text-xs ${difficultyColors[guide.difficulty]}`}>
                      {guide.difficulty}
                    </span>
                    <span className="px-2 py-1 rounded-lg text-xs bg-gray-100 text-gray-600 flex items-center gap-1">
                      <PlayCircle className="w-3 h-3" />
                      {guide.duration}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Personalized Recommendation */}
      {user.goals.includes('seeds') && selectedCategory === 'all' && (
        <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
          <p className="text-sm text-green-900 mb-2">
            <strong>Recommended for you:</strong>
          </p>
          <p className="text-sm text-green-700">
            Since you're interested in seed saving, check out our guides on "Starting from Seeds" and "Growing Citrus from Seeds"
          </p>
        </div>
      )}

      {selectedGuide && (
        <GuideDetailDialog
          guide={selectedGuide}
          onClose={() => setSelectedGuide(null)}
        />
      )}
    </div>
  );
}
