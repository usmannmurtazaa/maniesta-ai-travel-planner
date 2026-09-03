export const APP_CONFIG = {
  name: 'Maniesta AI Travel Planner',
  displayName: 'Maniesta',
  githubRepo: 'maniesta-ai-travel-planner',
  netlifyUrl: 'https://maniestatravel.netlify.app',
  aiProvider: 'openai',
  aiModel: 'gpt-4o-mini',
  weatherApiBase: 'https://api.open-meteo.com/v1',
  geocodingApiBase: 'https://geocoding-api.open-meteo.com/v1',
  maxDays: 30,
  minBudget: 100,
  maxBudget: 100000,
};

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
];

export const INTEREST_OPTIONS = [
  'Culture', 'History', 'Food', 'Nature', 'Adventure',
  'Shopping', 'Beaches', 'Nightlife', 'Art', 'Museums',
  'Photography', 'Relaxation', 'Sports', 'Music', 'Architecture',
  'Local Experience', 'Wellness', 'Wildlife', 'Hiking', 'Water Sports',
];

export const ACTIVITY_OPTIONS = [
  'Sightseeing', 'Tours', 'Museum Visits', 'Local Cuisine Tasting',
  'Shopping', 'Hiking', 'Water Sports', 'Cultural Shows',
  'Photography Spots', 'Spa & Wellness', 'Night Markets',
  'Street Food Exploration', 'Day Trips', 'Boat Tours', 'Wine Tasting',
];

export const FOOD_PREFERENCE_OPTIONS = [
  'Vegetarian', 'Vegan', 'Halal', 'Gluten-Free',
  'Local Food', 'International Cuisine', 'Fine Dining', 'Street Food',
  'No Preference',
];

export const ACCOMMODATION_OPTIONS = [
  { value: 'hotel', label: 'Hotel', icon: '🏨' },
  { value: 'hostel', label: 'Hostel', icon: '🛏️' },
  { value: 'airbnb', label: 'Airbnb/Vacation Rental', icon: '🏠' },
  { value: 'resort', label: 'Resort', icon: '🏖️' },
  { value: 'boutique', label: 'Boutique Hotel', icon: '✨' },
];

export const TRANSPORTATION_OPTIONS = [
  { value: 'public', label: 'Public Transit', icon: '🚇' },
  { value: 'car-rental', label: 'Car Rental', icon: '🚗' },
  { value: 'walking', label: 'Walking', icon: '🚶' },
  { value: 'taxi', label: 'Taxi/Ride-share', icon: '🚕' },
  { value: 'mixed', label: 'Mixed', icon: '🔄' },
];