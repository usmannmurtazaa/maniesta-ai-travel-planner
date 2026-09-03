import { TripPreferences, TripPlan, DayItinerary, ActivityItem, Restaurant } from './types';
import { generateId, generateDateRange, calculateBudgetBreakdown } from './utils';
import { DEMO_ITINERARIES } from './demo-data';

export interface AIProvider {
  generateItinerary(preferences: TripPreferences): Promise<TripPlan>;
  generateAssistantResponse(question: string, tripContext: string): Promise<string>;
  regenerateDay(day: DayItinerary, preferences: TripPreferences): Promise<DayItinerary>;
  regenerateActivity(activity: ActivityItem, preferences: TripPreferences): Promise<ActivityItem>;
}

class OpenAIProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateItinerary(preferences: TripPreferences): Promise<TripPlan> {
    const prompt = this.buildItineraryPrompt(preferences);
    const response = await this.callOpenAI(prompt);
    return this.parseItineraryResponse(response, preferences);
  }

  async generateAssistantResponse(question: string, tripContext: string): Promise<string> {
    const prompt = `You are a helpful AI travel assistant. Here is the user's trip context:\n\n${tripContext}\n\nUser question: ${question}\n\nProvide a helpful, specific answer based on the trip context. Keep it concise (under 200 words).`;
    return await this.callOpenAI(prompt);
  }

  async regenerateDay(day: DayItinerary, preferences: TripPreferences): Promise<DayItinerary> {
    const prompt = `Regenerate a complete day itinerary for day ${day.dayNumber} in ${preferences.destination}. Previous day was:\n${JSON.stringify(day)}\n\nGenerate a new, different set of activities following the same format.`;
    const response = await this.callOpenAI(prompt);
    const parsed = JSON.parse(response);
    return parsed.day || day;
  }

  async regenerateActivity(activity: ActivityItem, preferences: TripPreferences): Promise<ActivityItem> {
    const prompt = `Regenerate a travel activity to replace: ${JSON.stringify(activity)} for destination ${preferences.destination}. Return a single new activity in the same JSON format.`;
    const response = await this.callOpenAI(prompt);
    const parsed = JSON.parse(response);
    return parsed.activity || activity;
  }

  private buildItineraryPrompt(preferences: TripPreferences): string {
    return `You are a travel planning expert. Create a detailed day-by-day itinerary for a trip to ${preferences.destination}.

Trip details:
- Starting from: ${preferences.startingLocation}
- Dates: ${preferences.startDate} to ${preferences.endDate}
- Duration: ${preferences.durationDays} days
- Travelers: ${preferences.travelers}
- Budget: ${preferences.budget} ${preferences.currency}
- Budget level: ${preferences.budgetLevel}
- Travel type: ${preferences.travelType}
- Interests: ${preferences.interests.join(', ')}
- Preferred activities: ${preferences.activities.join(', ')}
- Food preferences: ${preferences.foodPreferences.join(', ')}
- Accommodation: ${preferences.accommodation}
- Transportation: ${preferences.transportation}

Return a JSON object with this exact structure:
{
  "overview": "Brief trip overview paragraph",
  "destinationInfo": {
    "name": "Destination name",
    "country": "Country",
    "description": "2-3 sentence description",
    "bestTimeToVisit": "Best time to visit",
    "localTips": ["tip1", "tip2", "tip3"],
    "recommendedPlaces": ["place1", "place2", "place3", "place4", "place5"]
  },
  "days": [
    {
      "dayNumber": 1,
      "date": "YYYY-MM-DD",
      "morning": [
        {"id": "unique_id", "time": "09:00", "title": "Activity title", "description": "Brief description", "category": "morning", "location": "Location name", "cost": 25, "duration": "2 hours", "transportation": "Walking"}
      ],
      "afternoon": [...similar...],
      "evening": [...similar...],
      "restaurants": [
        {"id": "unique_id", "name": "Restaurant name", "cuisine": "Cuisine type", "priceLevel": "moderate", "location": "Area", "rating": 4.5}
      ],
      "transportation": "Suggested transportation for the day",
      "totalCost": 150
    }
  ]
}

Make the itinerary realistic, specific, and tailored to the user's preferences. Include 2-3 activities for morning, afternoon, and evening each day. Include 2-3 restaurant suggestions per day. Keep costs realistic for the destination and budget level.`;
  }

  private async callOpenAI(prompt: string): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private parseItineraryResponse(response: string, preferences: TripPreferences): TripPlan {
    const parsed = JSON.parse(response);
    const dates = generateDateRange(preferences.startDate, preferences.endDate);
    
    const days: DayItinerary[] = parsed.days.map((day: any, index: number) => ({
      dayNumber: day.dayNumber || index + 1,
      date: dates[index] || preferences.startDate,
      weather: null,
      morning: (day.morning || []).map((a: any) => ({ ...a, id: a.id || generateId('activity'), category: 'morning' })),
      afternoon: (day.afternoon || []).map((a: any) => ({ ...a, id: a.id || generateId('activity'), category: 'afternoon' })),
      evening: (day.evening || []).map((a: any) => ({ ...a, id: a.id || generateId('activity'), category: 'evening' })),
      restaurants: (day.restaurants || []).map((r: any) => ({ ...r, id: r.id || generateId('restaurant') })),
      transportation: day.transportation || '',
      totalCost: day.totalCost || 0,
    }));

    const budget = calculateBudgetBreakdown(days, preferences.budget, preferences.accommodation);

    return {
      id: generateId('trip'),
      preferences,
      days,
      budget,
      overview: parsed.overview || '',
      destinationInfo: parsed.destinationInfo || {
        name: preferences.destination,
        country: '',
        description: '',
        bestTimeToVisit: '',
        localTips: [],
        recommendedPlaces: [],
      },
      createdAt: new Date().toISOString(),
    };
  }
}

class DemoProvider implements AIProvider {
  async generateItinerary(preferences: TripPreferences): Promise<TripPlan> {
    const demoData = DEMO_ITINERARIES[preferences.destination.toLowerCase()] || DEMO_ITINERARIES['tokyo'];
    const dates = generateDateRange(preferences.startDate, preferences.endDate);
    
    const days: DayItinerary[] = dates.map((date, index) => {
      const baseDay = demoData.days[index % demoData.days.length];
      return {
        ...baseDay,
        dayNumber: index + 1,
        date,
        weather: null,
        morning: baseDay.morning.map(a => ({ ...a, id: generateId('activity') })),
        afternoon: baseDay.afternoon.map(a => ({ ...a, id: generateId('activity') })),
        evening: baseDay.evening.map(a => ({ ...a, id: generateId('activity') })),
        restaurants: baseDay.restaurants.map(r => ({ ...r, id: generateId('restaurant') })),
      };
    });

    const budget = calculateBudgetBreakdown(days, preferences.budget, preferences.accommodation);

    return {
      id: generateId('trip'),
      preferences,
      days,
      budget,
      overview: demoData.overview,
      destinationInfo: demoData.destinationInfo,
      createdAt: new Date().toISOString(),
    };
  }

  async generateAssistantResponse(question: string, tripContext: string): Promise<string> {
    return `Based on your trip to ${tripContext.split('Destination:')[1]?.split('\n')[0] || 'your destination'}, I'd recommend exploring the local culture and cuisine. Check the weather forecast and pack accordingly. For more specific recommendations, feel free to explore the itinerary suggestions in your trip dashboard.`;
  }

  async regenerateDay(day: DayItinerary, preferences: TripPreferences): Promise<DayItinerary> {
    return { ...day, totalCost: day.totalCost * 1.1 };
  }

  async regenerateActivity(activity: ActivityItem, preferences: TripPreferences): Promise<ActivityItem> {
    return { ...activity, description: activity.description + ' (Updated recommendation)' };
  }
}

export function createAIProvider(): AIProvider {
  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    return new OpenAIProvider(apiKey);
  }
  return new DemoProvider();
}