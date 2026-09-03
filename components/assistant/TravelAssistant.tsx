// components/assistant/TravelAssistant.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TripPlan, ChatMessage } from '@/lib/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface TravelAssistantProps {
  trip: TripPlan;
}

export default function TravelAssistant({ trip }: TravelAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hi! I'm your Maniesta AI travel assistant. I can answer questions about your trip to ${trip.destinationInfo.name || trip.preferences.destination}. What would you like to know?`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const buildTripContext = (): string => {
    const daySummaries = trip.days.map(day => 
      `Day ${day.dayNumber} (${day.date}): Morning - ${day.morning.map(a => a.title).join(', ') || 'No activities'}. Afternoon - ${day.afternoon.map(a => a.title).join(', ') || 'No activities'}. Evening - ${day.evening.map(a => a.title).join(', ') || 'No activities'}.`
    ).join('\n');
    
    return `Destination: ${trip.destinationInfo.name || trip.preferences.destination}\nDates: ${trip.preferences.startDate} to ${trip.preferences.endDate}\nTravelers: ${trip.preferences.travelers}\nBudget: ${trip.preferences.budget} ${trip.preferences.currency}\nInterests: ${trip.preferences.interests.join(', ')}\n\nItinerary:\n${daySummaries}`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMessage.content,
          tripContext: buildTripContext(),
        }),
      });

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response || 'Sorry, I couldn\'t answer that. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const fallbackMessage: ChatMessage = {
        role: 'assistant',
        content: 'I\'m having trouble connecting to my knowledge base. Based on your itinerary, I recommend exploring the local culture and trying authentic cuisine. Check your itinerary for specific recommendations!',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[500px]">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🤖</span>
        <div>
          <h3 className="font-semibold text-white">Maniesta AI Assistant</h3>
          <p className="text-sm text-gray-400">Ask me anything about your trip</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-xl ${
                  msg.role === 'user'
                    ? 'bg-violet-500/20 border border-violet-500/30 text-white'
                    : 'bg-white/[0.06] border border-white/10 text-gray-200'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/[0.06] border border-white/10 rounded-xl p-3 text-gray-400">
              <span className="inline-flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>●</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
              </span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about your trip..."
          className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
        />
        <Button onClick={handleSend} loading={isLoading} icon="➤">
          Send
        </Button>
      </div>
    </Card>
  );
}