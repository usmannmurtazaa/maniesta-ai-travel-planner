import { WeatherInfo } from './types';
import { getWeatherIcon } from './utils';

export async function getWeatherForLocation(
  latitude: number,
  longitude: number,
  date: string
): Promise<WeatherInfo | null> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability&timezone=auto&start_date=${date}&end_date=${date}`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    if (!data.daily || !data.daily.temperature_2m_max || data.daily.temperature_2m_max.length === 0) {
      return null;
    }

    const weatherCode = data.daily.weathercode?.[0] || 0;
    const condition = getWeatherDescription(weatherCode);
    const temp = data.daily.temperature_2m_max[0];
    const icon = getWeatherIcon(weatherCode);

    return {
      temperature: Math.round(temp),
      condition,
      icon,
      humidity: Math.round(data.daily.precipitation_probability?.[0] || 0),
      windSpeed: Math.round(data.daily.windspeed_10m_max?.[0] || 0),
      description: `${condition}, ${Math.round(temp)}°C`,
    };
  } catch {
    return null;
  }
}

export async function geocodeLocation(location: string): Promise<{ latitude: number; longitude: number; name: string } | null> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    if (!data.results || data.results.length === 0) return null;
    
    const result = data.results[0];
    return {
      latitude: result.latitude,
      longitude: result.longitude,
      name: result.name,
    };
  } catch {
    return null;
  }
}

function getWeatherDescription(code: number): string {
  const conditions: Record<number, string> = {
    0: 'Clear Sky', 1: 'Mostly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Icy Fog', 51: 'Light Drizzle', 53: 'Drizzle',
    55: 'Heavy Drizzle', 61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain',
    71: 'Light Snow', 73: 'Snow', 75: 'Heavy Snow', 80: 'Light Showers',
    81: 'Showers', 82: 'Heavy Showers', 95: 'Thunderstorm', 96: 'Thunderstorm with Hail',
    99: 'Severe Thunderstorm',
  };
  return conditions[code] || 'Unknown';
}