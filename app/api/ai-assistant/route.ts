import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Itinerary, AssistantMessage } from '@/lib/types';

export const runtime = 'nodejs';

const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, itinerary } = body as { messages: AssistantMessage[]; itinerary: Itinerary };

    if (!messages || !itinerary) {
      return NextResponse.json({ error: 'Missing messages or itinerary' }, { status: 400 });
    }

    if (!API_KEY) {
      return NextResponse.json({ error: 'Server configuration error: missing API key' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    // Build conversation history and system prompt with trip context
    const systemPrompt = `You are a helpful AI travel assistant. You have access to the user's current trip itinerary. Use this context to answer questions accurately and suggest modifications when asked. The itinerary is: ${JSON.stringify(itinerary, null, 2)}. Answer the user's questions concisely and helpfully. If the user asks to modify the itinerary, provide suggestions but do not actually change the stored itinerary (the user can edit manually).`;

    const history = messages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I have the trip context.' }],
        },
        ...history,
      ],
    });

    const lastUserMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastUserMessage);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText }, { status: 200 });
  } catch (error) {
    console.error('Assistant API error:', error);
    return NextResponse.json({ error: 'Failed to get assistant response' }, { status: 500 });
  }
}