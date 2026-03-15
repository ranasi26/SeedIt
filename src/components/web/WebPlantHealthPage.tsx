import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle2, Leaf, Bug, Droplet, Loader2, Info } from 'lucide-react';
import type { UserProfile } from '../../App';
import { saveDiagnosisHistory, getDiagnosisHistory } from '../../service/diagnosisHistory';

interface WebPlantHealthPageProps {
  user: UserProfile;
}

interface PlantHealthResult {
  plantName?: string;
  scientificName?: string;
  probability?: number;
  healthStatus: 'healthy' | 'diseased' | 'unknown';
  diseases?: Array<{
    name: string;
    probability: number;
    description: string;
    treatment: string;
  }>;
  suggestions?: Array<{
    id: string;
    name: string;
    probability: number;
  }>;
}

export function WebPlantHealthPage({ user }: WebPlantHealthPageProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PlantHealthResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Plant.id API configuration
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    async function loadHistory() {
      try {
        console.log('Loading diagnosis history for:', user.email);
        const items = await getDiagnosisHistory(user.email);
        console.log('Diagnosis history loaded:', items);
        setHistory(items);
      } catch (error) {
        console.error('Failed to load diagnosis history:', error);
      }
    }

    if (user?.email) {
      loadHistory();
    }
  }, [user.email]);


  const analyzePlant = async (base64Image: string) => {
    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const base64Data = base64Image.split(',')[1];

      const response = await fetch(`${API_URL}/api/analyze-plant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: base64Data,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      const healthAssessment = data.health_assessment;
      const isHealthy = healthAssessment?.is_healthy;
      const diseases = healthAssessment?.diseases || [];
      const suggestions = data.suggestions || [];

      const parsedResult: PlantHealthResult = {
        healthStatus: isHealthy ? 'healthy' : diseases.length > 0 ? 'diseased' : 'unknown',
        diseases: diseases.map((disease: any) => ({
          name: disease.name,
          probability: disease.probability,
          description: disease.disease_details?.description || 'No description available',
          treatment:
            disease.disease_details?.treatment?.chemical?.join(', ') ||
            disease.disease_details?.treatment?.biological?.join(', ') ||
            'Consult a local plant expert',
        })),
        suggestions: suggestions.slice(0, 3).map((sug: any) => ({
          id: sug.id,
          name: sug.plant_name,
          probability: sug.probability,
        })),
      };

      if (suggestions.length > 0) {
        parsedResult.plantName = suggestions[0].plant_name;
        parsedResult.scientificName = suggestions[0].plant_details?.scientific_name;
        parsedResult.probability = suggestions[0].probability;
      }

      setResult(parsedResult);

      try {
        await saveDiagnosisHistory({
          userEmail: user.email,
          userName: user.name,
          imageUrl: base64Image,
          plantName: parsedResult.plantName || "Unknown Plant",
          scientificName: parsedResult.scientificName || "",
          healthStatus: parsedResult.healthStatus,
          diseases: parsedResult.diseases || [],
        });

        const items = await getDiagnosisHistory(user.email);
        setHistory(items);
      } catch (historyErr) {
        console.error('Failed to save diagnosis history:', historyErr);
      }

    } catch (err: any) {
      console.error('Plant analysis error:', err);
      setError(err.message || 'Failed to analyze the image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setUploadedImage(base64Image);
      setError(null);

      // Analyze the image
      await analyzePlant(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setResult(null);
    setError(null);
    setIsAnalyzing(false);
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">

      {/* Upload Section */}
      {!uploadedImage && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 border border-gray-200">
            <h3 className="text-gray-900 mb-4">Upload Plant Photo</h3>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <div className="space-y-3 mb-6">
              <button
                onClick={handleCameraClick}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                <Camera className="w-6 h-6" />
                <span>Take Photo</span>
              </button>

              <button
                onClick={handleCameraClick}
                className="w-full bg-gray-100 text-gray-700 py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 hover:bg-gray-200 transition-all"
              >
                <Upload className="w-6 h-6" />
                <span>Upload from Computer</span>
              </button>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="text-blue-900 mb-2 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Photography Tips
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Take clear, well-lit photos</li>
                <li>• Show affected areas close-up</li>
                <li>• Include leaves and stems</li>
                <li>• Avoid heavy filters or editing</li>
              </ul>
            </div>
          </div>

          {/* Common Issues Reference */}
          <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 border border-gray-200">
            <h3 className="text-gray-900 mb-4">What We Can Detect</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-900">Plant Identification</p>
                  <p className="text-sm text-green-700">Identify plant species from photos</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                <Bug className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-900">Disease Detection</p>
                  <p className="text-sm text-red-700">Spot fungal infections, pests, and blight</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl">
                <Droplet className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-900">Nutrient Issues</p>
                  <p className="text-sm text-yellow-700">Detect deficiencies and overwatering</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                <Leaf className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-purple-900">Care Recommendations</p>
                  <p className="text-sm text-purple-700">Get treatment and prevention tips</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Diagnosis History</h3>

          <div className="space-y-4">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="border border-gray-200 rounded-2xl p-4"
              >
                <div className="flex gap-4">
                  <img
                    src={entry.imageUrl}
                    alt="Diagnosis history"
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h4 className="text-gray-900">
                          {entry.plantName || 'Unknown Plant'}
                        </h4>
                        {entry.scientificName && (
                          <p className="text-sm text-gray-500 italic">
                            {entry.scientificName}
                          </p>
                        )}
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs ${entry.healthStatus === 'healthy'
                          ? 'bg-green-100 text-green-700'
                          : entry.healthStatus === 'diseased'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                          }`}
                      >
                        {entry.healthStatus}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mb-2">
                      {entry.createdAt?.toLocaleString?.() || ''}
                    </p>

                    {entry.diseases && entry.diseases.length > 0 ? (
                      <div className="space-y-1">
                        {entry.diseases.slice(0, 2).map((disease: any, index: number) => (
                          <p key={index} className="text-sm text-gray-700">
                            {disease.name} ({Math.round(disease.probability * 100)}%)
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-green-700">
                        No significant issues detected.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis in Progress */}
      {uploadedImage && isAnalyzing && (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
          </div>
          <h3 className="text-gray-900 mb-2">Analyzing Your Plant...</h3>
          <p className="text-gray-600">
            Using AI to identify the plant and check for health issues
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-red-900 mb-2">Analysis Failed</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={resetAnalysis}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Display */}
      {uploadedImage && result && !isAnalyzing && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <button
              onClick={resetAnalysis}
              className="px-4 md:px-6 py-2.5 md:py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm md:text-base"
            >
              Analyze Another Photo
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Uploaded Image */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                <img
                  src={uploadedImage}
                  alt="Analyzed plant"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-gray-900 mb-2">Uploaded Image</h3>
                  <p className="text-sm text-gray-600">
                    AI analysis complete
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-4">
              {/* Plant Identification */}
              {result.plantName && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 mb-1">{result.plantName}</h3>
                      {result.scientificName && (
                        <p className="text-gray-600 italic">{result.scientificName}</p>
                      )}
                    </div>
                    {result.probability && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {Math.round(result.probability * 100)}% match
                      </span>
                    )}
                  </div>

                  {result.suggestions && result.suggestions.length > 1 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Other possibilities:</p>
                      <div className="flex flex-wrap gap-2">
                        {result.suggestions.slice(1).map((sug) => (
                          <span key={sug.id} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {sug.name} ({Math.round(sug.probability * 100)}%)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Health Status */}
              <div className={`rounded-2xl p-6 border ${result.healthStatus === 'healthy'
                ? 'bg-green-50 border-green-200'
                : result.healthStatus === 'diseased'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-gray-50 border-gray-200'
                }`}>
                <div className="flex items-center gap-3 mb-4">
                  {result.healthStatus === 'healthy' ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <h3 className="text-green-900">Plant Appears Healthy</h3>
                    </>
                  ) : result.healthStatus === 'diseased' ? (
                    <>
                      <AlertCircle className="w-6 h-6 text-red-600" />
                      <h3 className="text-red-900">Health Issues Detected</h3>
                    </>
                  ) : (
                    <>
                      <Info className="w-6 h-6 text-gray-600" />
                      <h3 className="text-gray-900">Analysis Complete</h3>
                    </>
                  )}
                </div>

                {result.diseases && result.diseases.length > 0 ? (
                  <div className="space-y-4">
                    {result.diseases.map((disease, index) => (
                      <div key={index} className="bg-white rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-gray-900">{disease.name}</h4>
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                            {Math.round(disease.probability * 100)}% likely
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Description:</p>
                            <p className="text-gray-800">{disease.description}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-600 mb-1">Treatment:</p>
                            <p className="text-gray-800">{disease.treatment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-green-800">
                    No significant health issues detected. Continue regular care and monitoring.
                  </p>
                )}
              </div>

              {/* General Care Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h4 className="text-blue-900 mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  General Care Tips
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Monitor your plant daily for changes</li>
                  <li>• Maintain consistent watering schedule</li>
                  <li>• Ensure proper drainage and air circulation</li>
                  <li>• Isolate if disease is detected to prevent spread</li>
                  <li>• Document progress with photos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
