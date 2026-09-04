import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Itinerary, ItineraryDay } from '@/lib/types';

export const runtime = 'nodejs';

const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { itinerary, targetDay } = body as { itinerary: Itinerary; targetDay: number | 'all' };

    if (!itinerary || !targetDay) {
      return NextResponse.json({ error: 'Missing itinerary or target day' }, { status: 400 });
    }

    if (!API_KEY) {
      return NextResponse.json({ error: 'Server configuration error: missing API key' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });

    let prompt: string;
    if (targetDay === 'all') {
      prompt = `Regenerate the entire itinerary for ${itinerary.destination} keeping the same overall preferences. Current itinerary: ${JSON.stringify(itinerary, null, 2)}. Return only raw JSON with same structure. Ensure to include coordinates for activities if possible. Keep activities to 2-3 per day and descriptions short. IMPORTANT: Return only valid JSON, no markdown, no extra text, no trailing commas.`;
    } else {
      const dayToRegenerate = itinerary.days.find(d => d.day === targetDay);
      if (!dayToRegenerate) {
        return NextResponse.json({ error: 'Day not found' }, { status: 404 });
      }
      prompt = `Regenerate only day ${targetDay} of the itinerary for ${itinerary.destination}. Current day: ${JSON.stringify(dayToRegenerate, null, 2)}. Keep the day number and theme, but change activities. Return only the day object in JSON with same structure. Include coordinates for activities if possible. Keep 2-3 activities and short descriptions. IMPORTANT: Return only valid JSON, no markdown, no extra text, no trailing commas.`;
    }

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 8000, // increased
        temperature: 0.5,
      },
    });

    const text = result.response.text();
    const jsonText = extractJSON(text);
    const parsed = JSON.parse(jsonText);

    if (targetDay === 'all') {
      const newItinerary = parsed as Itinerary;
      newItinerary.generatedAt = new Date().toISOString();
      return NextResponse.json({ itinerary: newItinerary }, { status: 200 });
    } else {
      const newDay = parsed as ItineraryDay;
      return NextResponse.json({ day: newDay }, { status: 200 });
    }
  } catch (error) {
    console.error('Regeneration error:', error);
    return NextResponse.json({ error: 'Failed to regenerate' }, { status: 500 });
  }
}

function extractJSON(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
  else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  cleaned = cleaned.trim();

  const startIndex = cleaned.indexOf('{');
  const endIndex = cleaned.lastIndexOf('}');
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error('No JSON object found in response');
  }
  let jsonStr = cleaned.substring(startIndex, endIndex + 1);
  jsonStr = jsonStr.replace(/,\s*}/g, '}');
  jsonStr = jsonStr.replace(/,\s*]/g, ']');
  return jsonStr;
}