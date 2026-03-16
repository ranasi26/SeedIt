export type WeatherData = {
  temperature: number;
  condition: string;
  description: string;
  windSpeed: number;
  humidity: number;
  rain: boolean;
  city?: string;
};

export function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error('Location permission denied or unavailable.'));
      }
    );
  });
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('Missing weather API key.');
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  );

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    temperature: data.main?.temp ?? 0,
    condition: data.weather?.[0]?.main?.toLowerCase() ?? 'unknown',
    description: data.weather?.[0]?.description ?? 'Unknown weather',
    windSpeed: data.wind?.speed ?? 0,
    humidity: data.main?.humidity ?? 0,
    rain: !!data.rain,
    city: data.name ?? '',
  };
}