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

// Consolidated ItineraryActivity with legacy optional fields
export interface ItineraryActivity {
  time: string;
  title: string;
  description: string;
  location?: string;
  cost?: number;
  coordinates?: Coordinates;
  duration?: string;
  id?: string;
  category?: 'morning' | 'afternoon' | 'evening';
}

// Consolidated ItineraryDay with legacy optional fields
export interface ItineraryDay {
  day: number;
  theme: string;
  activities: ItineraryActivity[];
  dayNumber?: number;
  date?: string;
  morning?: ItineraryActivity[];
  afternoon?: ItineraryActivity[];
  evening?: ItineraryActivity[];
  restaurants?: Restaurant[];
  transportation?: string;
  weather?: { icon: string; temperature: number };
  totalCost?: number;
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
  location?: string;
  current: {
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

export interface WeatherInfo {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  description: string;
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
  timestamp?: string;
}

export interface DestinationInfo {
  name: string;
  country?: string;
  description?: string;
  imageUrl?: string;
  coordinates?: Coordinates;
  bestTimeToVisit?: string;
  localTips?: string[];
  attractions?: string[];
  cuisine?: string;
  currency?: string;
  language?: string;
  recommendedPlaces?: string[];
}

// Aliases for legacy components


export type ChatMessage = AssistantMessage;
export type ActivityItem = ItineraryActivity;
export type DayItinerary = ItineraryDay;
export type TravelPlan = Itinerary;

// Additional legacy types
export type TravelType = 'Solo' | 'Couple' | 'Family' | 'Friends' | 'Business';
export type FoodPreference = 'Any' | 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Halal' | 'Kosher';

export interface TripPreferences {
  destination: string;
  startingLocation: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  currency: string;
  travelType: string;            // allow lowercase 'solo', 'couple', etc.
  interests: string[];
  activities: string[];
  foodPreferences: FoodPreference[];  // new field
  accommodation: string;
  transportation: string;
  durationDays: number;          // new field
  budgetLevel: 'budget' | 'moderate' | 'luxury';  // new field
}

export interface Restaurant {
  name: string;
  cuisine?: string;
  priceRange?: string;
  rating?: number;
  address?: string;
  id?: string;
  location?: string;
  priceLevel?: string;
}

export interface TripPlan extends Omit<Itinerary, 'budget'> {
  id: string;
  preferences?: any;
  budget?: any; // legacy budget breakdown object
  overview?: string;
  destinationInfo?: DestinationInfo;
  createdAt?: string;
}