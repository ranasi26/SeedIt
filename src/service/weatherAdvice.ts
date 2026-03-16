import type { UserProfile, Plant } from '../App';
import type { WeatherData } from './weather';

export type WeatherAlert = {
  type: 'rain' | 'heat' | 'wind' | 'cold' | 'humidity' | 'general';
  title: string;
  message: string;
};

export function getWeatherAlerts(
  weather: WeatherData,
  user: UserProfile,
  plants: Plant[]
): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];
  const hasOutdoorPlants = user.outdoorAccess !== 'none';

  if (weather.rain && hasOutdoorPlants) {
    alerts.push({
      type: 'rain',
      title: 'Rain Alert',
      message: 'Rain is expected in your area. Skip watering outdoor plants today and check that pots drain properly.',
    });
  }

  if (weather.temperature >= 33) {
    alerts.push({
      type: 'heat',
      title: 'Heat Warning',
      message: 'Hot weather can dry soil quickly. Check moisture earlier than usual, especially for small pots.',
    });
  }

  if (weather.windSpeed >= 8 && hasOutdoorPlants) {
    alerts.push({
      type: 'wind',
      title: 'Wind Warning',
      message: 'Strong wind may damage stems or tip lightweight pots. Move delicate plants to a more protected spot.',
    });
  }

  if (weather.temperature <= 10) {
    alerts.push({
      type: 'cold',
      title: 'Cold Warning',
      message: 'Cold weather can stress sensitive plants. Bring tender plants indoors or keep them away from drafts.',
    });
  }

  if (weather.humidity >= 85) {
    alerts.push({
      type: 'humidity',
      title: 'High Humidity Alert',
      message: 'High humidity may increase fungal risk. Avoid overwatering and improve air circulation.',
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      type: 'general',
      title: 'Weather Looks Fine',
      message: 'Current weather looks stable. Follow your normal plant care schedule today.',
    });
  }

  return alerts;
}