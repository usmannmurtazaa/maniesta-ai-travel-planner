import { NextRequest, NextResponse } from 'next/server';
import { WeatherData } from '@/lib/types';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const destination = searchParams.get('destination');
  if (!destination) {
    return NextResponse.json({ error: 'Missing destination' }, { status: 400 });
  }

  try {
    // Step 1: Geocode destination using Open-Meteo geocoding API
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(destination)}&count=1&language=en&format=json`;
    const geocodingResponse = await fetch(geocodingUrl);
    if (!geocodingResponse.ok) {
      throw new Error('Geocoding failed');
    }
    const geocodingData = await geocodingResponse.json();
    if (!geocodingData.results || geocodingData.results.length === 0) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }
    const { latitude, longitude, name, country } = geocodingData.results[0];

    // Step 2: Fetch weather forecast
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
      throw new Error('Weather fetch failed');
    }
    const weatherData = await weatherResponse.json();

    const result: WeatherData & { location: string } = {
      location: `${name}, ${country || ''}`,
      current: {
        temperature: weatherData.current.temperature_2m,
        windspeed: weatherData.current.wind_speed_10m,
        weathercode: weatherData.current.weather_code,
        time: weatherData.current.time,
      },
      daily: {
        time: weatherData.daily.time,
        temperature_2m_max: weatherData.daily.temperature_2m_max,
        temperature_2m_min: weatherData.daily.temperature_2m_min,
        weathercode: weatherData.daily.weather_code,
      },
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
  }
}