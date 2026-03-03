import { X, CheckCircle2, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface Guide {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  duration: string;
  description: string;
  icon: any;
  steps: {
    title: string;
    content: string;
    tip?: string;
  }[];
}

interface GuideDetailDialogProps {
  guide: Guide;
  onClose: () => void;
}

export function GuideDetailDialog({ guide, onClose }: GuideDetailDialogProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  const progress = (completedSteps.size / guide.steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-gray-900 mb-1">{guide.title}</h2>
              <p className="text-sm text-gray-600">{guide.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{completedSteps.size} of {guide.steps.length}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-4">
          {guide.steps.map((step, index) => {
            const isCompleted = completedSteps.has(index);
            
            return (
              <div
                key={index}
                className={`rounded-2xl border-2 overflow-hidden transition-all ${
                  isCompleted 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <button
                  onClick={() => toggleStep(index)}
                  className="w-full p-4 text-left flex items-start gap-3"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-sm">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`mb-2 ${isCompleted ? 'text-green-900' : 'text-gray-900'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                      {step.content}
                    </p>
                  </div>
                </button>

                {step.tip && (
                  <div className={`px-4 pb-4 ${isCompleted ? 'block' : 'block'}`}>
                    <div className={`rounded-xl p-3 flex items-start gap-2 ${
                      isCompleted ? 'bg-green-100' : 'bg-blue-50'
                    }`}>
                      <Lightbulb className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        isCompleted ? 'text-green-600' : 'text-blue-600'
                      }`} />
                      <div>
                        <p className={`text-xs mb-0.5 ${
                          isCompleted ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          Pro Tip
                        </p>
                        <p className={`text-sm ${
                          isCompleted ? 'text-green-700' : 'text-blue-900'
                        }`}>
                          {step.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {completedSteps.size === guide.steps.length && (
          <div className="p-6 pt-0">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white text-center">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="mb-2">Guide Complete!</h3>
              <p className="text-sm text-green-50">
                Great job! You're now ready to put this knowledge into practice.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
