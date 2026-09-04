import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TripFormData } from '@/lib/types';

export const runtime = 'nodejs';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('GEMINI_API_KEY is not set. AI generation will fail.');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const formData: TripFormData = body.formData;

    if (!formData) {
      return NextResponse.json({ error: 'Missing form data' }, { status: 400 });
    }

    if (!API_KEY) {
      return NextResponse.json({ error: 'Server configuration error: missing API key' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = buildPrompt(formData);
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    let itinerary;
    try {
      const jsonText = extractJSON(text);
      itinerary = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    // Ensure destinationCoordinates exists; if not, we'll add later via geocoding on client
    itinerary.generatedAt = new Date().toISOString();

    return NextResponse.json({ itinerary }, { status: 200 });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json({ error: 'Failed to generate itinerary' }, { status: 500 });
  }
}

function buildPrompt(formData: TripFormData): string {
  const {
    destination,
    startingLocation,
    startDate,
    endDate,
    travelers,
    budget,
    currency,
    travelType,
    interests,
    activities,
    foodPreference,
    accommodation,
    transportation,
  } = formData;

  return `
You are an expert travel planner AI. Generate a detailed day-by-day itinerary for a trip based on the following parameters:

Destination: ${destination}
Starting location: ${startingLocation}
Travel dates: ${startDate} to ${endDate}
Number of travelers: ${travelers}
Budget: ${budget} ${currency}
Travel type: ${travelType}
Interests: ${interests.join(', ') || 'General'}
Preferred activities: ${activities.join(', ') || 'Any'}
Food preference: ${foodPreference}
Accommodation preference: ${accommodation}
Transportation preference: ${transportation}

Generate a complete itinerary in JSON format with the following structure:
{
  "destination": "string",
  "summary": "brief overall trip summary",
  "days": [
    {
      "day": 1,
      "theme": "day theme",
      "activities": [
        {
          "time": "9:00 AM",
          "title": "Activity name",
          "description": "Short description",
          "location": "Place or address (optional)",
          "cost": estimated cost in ${currency} (number, optional),
          "coordinates": {"lat": number, "lon": number} // approximate latitude and longitude if location is known; otherwise omit this field
        }
      ]
    }
  ]
}

Requirements:
- Include exactly the number of days from start to end date.
- Distribute activities throughout each day (2-5 activities per day).
- Consider travel type, interests, budget, and preferences.
- Provide realistic times and locations.
- For each activity, if the location is a well-known place or city, provide approximate coordinates (lat/lon) as numbers. If unknown, omit the coordinates field.
- Do not include any additional text, explanations, or markdown code fences. Only raw JSON.
`;
}

function extractJSON(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();
  return cleaned;
}