import { useState } from 'react';
import { X, Image as ImageIcon, Droplet, Sun } from 'lucide-react';
import type { Plant } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AddPlantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (plant: Omit<Plant, 'id'>) => Promise<void>;
}

export function AddPlantDialog({ isOpen, onClose, onAdd }: AddPlantDialogProps) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [waterFrequency, setWaterFrequency] = useState(7);
  const [sunlight, setSunlight] = useState<'low' | 'medium' | 'high'>('medium');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    await onAdd({
      name: name.trim(),
      species: species.trim() || 'Unknown Species',
      image:
        imageUrl.trim() ||
        'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      waterFrequency,
      lastWatered: new Date(),
      sunlight,
      notes: notes.trim(),
      plantedDate: new Date(),
      currentStage: 'seed',
      difficulty: 'easy',
      tags: [],
    });

    setName('');
    setSpecies('');
    setImageUrl('');
    setWaterFrequency(7);
    setSunlight('medium');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-gray-900">Add New Plant</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Plant Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., My Monstera"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Species</label>
            <input
              type="text"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              placeholder="e.g., Monstera Deliciosa"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Image URL</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                />
              </div>
            </div>

            {imageUrl && (
              <div className="mt-2 rounded-xl overflow-hidden h-32">
                <ImageWithFallback
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-blue-500" />
                Water every {waterFrequency} days
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={waterFrequency}
              onChange={(e) => setWaterFrequency(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Daily</span>
              <span>Monthly</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-3">
              <span className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-yellow-500" />
                Sunlight needs
              </span>
            </label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSunlight(level)}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                    sunlight === level
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add care notes, observations, or reminders..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              Add Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}