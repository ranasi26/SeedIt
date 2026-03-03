import { useState, useRef } from 'react';
import { ArrowLeft, Camera, Upload, AlertCircle, CheckCircle2, Leaf, Bug, Droplet, Sun } from 'lucide-react';

interface PlantHealthPageProps {
  onBack: () => void;
}

interface HealthIssue {
  id: string;
  name: string;
  symptoms: string[];
  causes: string[];
  solutions: string[];
  prevention: string[];
  severity: 'low' | 'medium' | 'high';
}

export function PlantHealthPage({ onBack }: PlantHealthPageProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<HealthIssue | null>(null);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const commonIssues: HealthIssue[] = [
    {
      id: 'yellowing',
      name: 'Yellow Leaves',
      symptoms: ['Leaves turning yellow', 'Starting from bottom leaves', 'May include brown tips'],
      causes: ['Overwatering', 'Nutrient deficiency', 'Natural aging', 'Poor drainage'],
      solutions: [
        'Check soil moisture - let top inch dry between waterings',
        'Ensure pot has drainage holes',
        'Add balanced fertilizer if needed',
        'Remove dead/yellow leaves to redirect energy'
      ],
      prevention: [
        'Water only when soil is dry',
        'Use well-draining potting mix',
        'Fertilize monthly during growing season'
      ],
      severity: 'medium'
    },
    {
      id: 'brown-tips',
      name: 'Brown Leaf Tips',
      symptoms: ['Leaf tips turning brown and crispy', 'Edges becoming dry'],
      causes: ['Low humidity', 'Underwatering', 'Over-fertilizing', 'Chlorine in tap water'],
      solutions: [
        'Increase humidity with a pebble tray or misting',
        'Water more consistently',
        'Let tap water sit overnight before using',
        'Trim brown tips with clean scissors'
      ],
      prevention: [
        'Group plants together for humidity',
        'Use filtered or rainwater',
        'Avoid fertilizing in winter'
      ],
      severity: 'low'
    },
    {
      id: 'wilting',
      name: 'Wilting Leaves',
      symptoms: ['Drooping, limp leaves', 'Plant looks sad', 'Soil may be wet or dry'],
      causes: ['Underwatering', 'Overwatering', 'Root rot', 'Too much sun', 'Shock from moving'],
      solutions: [
        'Check soil moisture immediately',
        'If dry: water thoroughly until draining',
        'If wet: let dry out, check for root rot',
        'Move to appropriate light conditions',
        'Give plant time to adjust to new location'
      ],
      prevention: [
        'Establish consistent watering schedule',
        'Ensure proper drainage',
        'Acclimate plants gradually to new spots'
      ],
      severity: 'high'
    },
    {
      id: 'pests',
      name: 'Pest Infestation',
      symptoms: ['Small bugs visible on leaves', 'Sticky residue', 'White cotton-like spots', 'Tiny webs'],
      causes: ['Aphids', 'Spider mites', 'Mealybugs', 'Scale insects', 'Fungus gnats'],
      solutions: [
        'Isolate infected plant immediately',
        'Spray with neem oil solution',
        'Wipe leaves with soapy water',
        'Remove heavily infected leaves',
        'Check all nearby plants'
      ],
      prevention: [
        'Inspect plants weekly',
        'Quarantine new plants for 2 weeks',
        'Avoid overwatering (attracts fungus gnats)',
        'Increase air circulation'
      ],
      severity: 'high'
    },
    {
      id: 'leggy',
      name: 'Leggy Growth',
      symptoms: ['Long stems with few leaves', 'Plant leaning toward window', 'Pale, stretched appearance'],
      causes: ['Insufficient light', 'Overcrowding', 'Too much fertilizer'],
      solutions: [
        'Move to brighter location gradually',
        'Rotate plant weekly for even growth',
        'Prune back to encourage bushier growth',
        'Reduce fertilizer frequency'
      ],
      prevention: [
        'Provide adequate light (use grow light if needed)',
        'Rotate regularly',
        'Prune to encourage branching'
      ],
      severity: 'medium'
    },
    {
      id: 'spots',
      name: 'Leaf Spots (Brown/Black)',
      symptoms: ['Brown or black spots on leaves', 'May have yellow halos', 'Spots spreading'],
      causes: ['Fungal disease', 'Bacterial infection', 'Water on leaves', 'Poor air circulation'],
      solutions: [
        'Remove affected leaves immediately',
        'Improve air circulation around plant',
        'Water soil directly, avoid wetting leaves',
        'Reduce humidity if too high',
        'Apply fungicide if severe'
      ],
      prevention: [
        'Water in morning so leaves dry',
        'Ensure good airflow',
        'Don\'t overcrowd plants',
        'Sterilize tools between plants'
      ],
      severity: 'medium'
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        // Simulate diagnosis delay
        setTimeout(() => setShowResults(true), 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const resetDiagnosis = () => {
    setUploadedImage(null);
    setShowResults(false);
    setSelectedIssue(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle2 className="w-5 h-5" />;
      case 'medium': return <AlertCircle className="w-5 h-5" />;
      case 'high': return <AlertCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  if (selectedIssue) {
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200">
          <button
            onClick={() => setSelectedIssue(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Issue Details */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-gray-900">{selectedIssue.name}</h2>
            <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${getSeverityColor(selectedIssue.severity)}`}>
              {getSeverityIcon(selectedIssue.severity)}
              {selectedIssue.severity}
            </span>
          </div>

          {/* Symptoms */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-gray-600" />
              Symptoms
            </h3>
            <ul className="space-y-2">
              {selectedIssue.symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div className="bg-amber-50 rounded-2xl p-4">
            <h3 className="text-amber-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Common Causes
            </h3>
            <ul className="space-y-2">
              {selectedIssue.causes.map((cause, index) => (
                <li key={index} className="flex items-start gap-2 text-amber-800">
                  <span className="text-amber-400 flex-shrink-0">•</span>
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="bg-blue-50 rounded-2xl p-4">
            <h3 className="text-blue-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              How to Fix It
            </h3>
            <ol className="space-y-3">
              {selectedIssue.solutions.map((solution, index) => (
                <li key={index} className="flex gap-3 text-blue-800">
                  <span className="bg-blue-200 text-blue-900 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                    {index + 1}
                  </span>
                  <span>{solution}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Prevention */}
          <div className="bg-green-50 rounded-2xl p-4">
            <h3 className="text-green-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Prevention Tips
            </h3>
            <ul className="space-y-2">
              {selectedIssue.prevention.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-green-800">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
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
          onClick={uploadedImage ? resetDiagnosis : onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h2 className="text-gray-900">Plant Health Check</h2>
        <p className="text-gray-600">Upload a photo or browse common issues</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!uploadedImage ? (
          <>
            {/* Upload Section */}
            <div className="bg-white rounded-2xl p-6 mb-4">
              <h3 className="text-gray-900 mb-4 text-center">Take or Upload a Photo</h3>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="space-y-3">
                <button
                  onClick={handleCameraClick}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  <Camera className="w-6 h-6" />
                  <span>Take Photo</span>
                </button>

                <button
                  onClick={handleCameraClick}
                  className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-all"
                >
                  <Upload className="w-6 h-6" />
                  <span>Upload from Gallery</span>
                </button>
              </div>

              <div className="mt-4 bg-blue-50 rounded-xl p-3">
                <p className="text-sm text-blue-900 text-center">
                  💡 For best results, take a clear photo showing the affected parts of your plant
                </p>
              </div>
            </div>

            {/* Common Issues */}
            <div>
              <h3 className="text-gray-900 mb-3">Common Plant Problems</h3>
              <div className="space-y-2">
                {commonIssues.map((issue) => (
                  <div
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue)}
                    className="bg-white rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">{issue.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {issue.symptoms[0]}
                        </p>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getSeverityColor(issue.severity)}`}>
                          {getSeverityIcon(issue.severity)}
                          {issue.severity} severity
                        </span>
                      </div>
                      <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4">
              <h3 className="text-green-900 mb-2">Quick Diagnosis Tips</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-start gap-2">
                  <Droplet className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Check soil moisture first - most issues stem from watering</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sun className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Ensure plant is getting appropriate light for its type</span>
                </li>
                <li className="flex items-start gap-2">
                  <Bug className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Inspect both sides of leaves for pests weekly</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* Uploaded Image */}
            <div className="bg-white rounded-2xl overflow-hidden mb-4">
              <img
                src={uploadedImage}
                alt="Plant diagnosis"
                className="w-full h-64 object-cover"
              />
            </div>

            {showResults ? (
              <>
                {/* Diagnosis Results */}
                <div className="bg-white rounded-2xl p-4 mb-4">
                  <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Analysis Complete
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Based on the image, here are the most likely issues affecting your plant:
                  </p>

                  <div className="space-y-2">
                    {commonIssues.slice(0, 3).map((issue, index) => (
                      <div
                        key={issue.id}
                        onClick={() => setSelectedIssue(issue)}
                        className="bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-green-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                                {index + 1}
                              </span>
                              <h4 className="text-gray-900">{issue.name}</h4>
                            </div>
                            <p className="text-sm text-gray-600 ml-8">
                              {issue.symptoms[0]}
                            </p>
                          </div>
                          <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180 flex-shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-4">
                  <p className="text-sm text-amber-900">
                    <strong>Note:</strong> This is an educational tool. For severe plant issues, consult a local nursery or plant expert.
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your plant...</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
