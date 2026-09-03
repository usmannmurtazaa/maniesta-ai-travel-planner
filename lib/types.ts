export interface Coordinates {
  lat: number;
  lon: number;
}

export interface TripFormData {
  destination: string;
  startingLocation: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  currency: string;
  travelType: string;
  interests: string[];
  activities: string[];
  foodPreference: string;
  accommodation: string;
  transportation: string;
}

export interface ItineraryActivity {
  time: string;
  title: string;
  description: string;
  location?: string;
  cost?: number;
  coordinates?: Coordinates;
}

export interface ItineraryDay {
  day: number;
  theme: string;
  activities: ItineraryActivity[];
}

export interface Itinerary {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  currency: string;
  days: ItineraryDay[];
  summary: string;
  generatedAt: string;
  destinationCoordinates?: Coordinates;
}

export interface WeatherData {
  current: {
    location?: string;
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
}

export interface SavedTrip {
  id: string;
  name: string;
  createdAt: string;
  itinerary: Itinerary;
}

export interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface DestinationInfo {
  name: string;
  country?: string;
  description?: string;
  imageUrl?: string;
  coordinates?: Coordinates;
}