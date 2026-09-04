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
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });

    const prompt = buildPrompt(formData);
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 4000, // increased to avoid truncation
        temperature: 0.7,
      },
    });
    const response = result.response;
    const text = response.text();

    let itinerary;
    try {
      const jsonText = extractJSON(text);
      itinerary = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      console.error('Raw response:', text);
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

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
          "coordinates": {"lat": number, "lon": number}
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
- For each activity, if the location is well-known, provide approximate coordinates (lat/lon) as numbers. If unknown, omit the coordinates field.
- IMPORTANT: Return only a valid JSON object. No markdown, no extra text, no comments. Ensure all property names are quoted and no trailing commas.
`;
}

function extractJSON(text: string): string {
  // Remove markdown code fences if present
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
  else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  cleaned = cleaned.trim();

  // Find first '{' and last '}'
  const startIndex = cleaned.indexOf('{');
  const endIndex = cleaned.lastIndexOf('}');
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error('No JSON object found in response');
  }
  let jsonStr = cleaned.substring(startIndex, endIndex + 1);

  // Remove trailing commas before } or ]
  jsonStr = jsonStr.replace(/,\s*}/g, '}');
  jsonStr = jsonStr.replace(/,\s*]/g, ']');

  return jsonStr;
}