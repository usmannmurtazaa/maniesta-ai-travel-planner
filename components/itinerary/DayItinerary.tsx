// components/itinerary/DayItinerary.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayItinerary as DayItineraryType, ActivityItem, Restaurant } from '@/lib/types';
import ActivityCard from './ActivityCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

interface DayItineraryProps {
  day: DayItineraryType;
  currency: string;
  onEditActivity: (activity: ActivityItem) => void;
  onDeleteActivity: (activity: ActivityItem) => void;
  onRegenerateActivity: (activity: ActivityItem) => void;
  onRegenerateDay: (day: DayItineraryType) => void;
  onAddActivity: (dayNumber: number, category: 'morning' | 'afternoon' | 'evening') => void;
  isRegenerating?: boolean;
}

export default function DayItinerary({
  day,
  currency,
  onEditActivity,
  onDeleteActivity,
  onRegenerateActivity,
  onRegenerateDay,
  onAddActivity,
  isRegenerating = false,
}: DayItineraryProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const allActivities = [...day.morning, ...day.afternoon, ...day.evening];

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <motion.span
              animate={{ rotate: isCollapsed ? -90 : 0 }}
              className="inline-block"
            >
              ▼
            </motion.span>
          </button>
          <div>
            <h3 className="font-semibold text-white">Day {day.dayNumber}</h3>
            <p className="text-sm text-gray-400">{day.date}</p>
          </div>
          {day.weather && (
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <span>{day.weather.icon}</span>
              <span>{day.weather.temperature}°C</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info">{currency} {day.totalCost}</Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRegenerateDay(day)}
            loading={isRegenerating}
          >
            🔄 Regenerate
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4"
          >
            {/* Morning */}
            <div>
              <h4 className="text-sm font-semibold text-amber-400 mb-2">🌅 Morning</h4>
              <div className="space-y-2">
                {day.morning.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onEdit={onEditActivity}
                    onDelete={onDeleteActivity}
                    onRegenerate={onRegenerateActivity}
                    currency={currency}
                  />
                ))}
                <button
                  onClick={() => onAddActivity(day.dayNumber, 'morning')}
                  className="w-full p-2 border border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 text-sm transition-all"
                >
                  + Add morning activity
                </button>
              </div>
            </div>

            {/* Afternoon */}
            <div>
              <h4 className="text-sm font-semibold text-sky-400 mb-2">☀️ Afternoon</h4>
              <div className="space-y-2">
                {day.afternoon.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onEdit={onEditActivity}
                    onDelete={onDeleteActivity}
                    onRegenerate={onRegenerateActivity}
                    currency={currency}
                  />
                ))}
                <button
                  onClick={() => onAddActivity(day.dayNumber, 'afternoon')}
                  className="w-full p-2 border border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 text-sm transition-all"
                >
                  + Add afternoon activity
                </button>
              </div>
            </div>

            {/* Evening */}
            <div>
              <h4 className="text-sm font-semibold text-purple-400 mb-2">🌙 Evening</h4>
              <div className="space-y-2">
                {day.evening.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onEdit={onEditActivity}
                    onDelete={onDeleteActivity}
                    onRegenerate={onRegenerateActivity}
                    currency={currency}
                  />
                ))}
                <button
                  onClick={() => onAddActivity(day.dayNumber, 'evening')}
                  className="w-full p-2 border border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 text-sm transition-all"
                >
                  + Add evening activity
                </button>
              </div>
            </div>

            {/* Restaurants */}
            {day.restaurants.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-emerald-400 mb-2">🍽️ Suggested Restaurants</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {day.restaurants.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="bg-white/[0.04] rounded-lg p-3 border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">{restaurant.name}</span>
                        <span className="text-yellow-400 text-sm">★ {restaurant.rating}</span>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {restaurant.cuisine} · {restaurant.location}
                      </div>
                      <Badge variant="default" size="sm">
                        {restaurant.priceLevel}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transportation */}
            {day.transportation && (
              <div className="text-sm text-gray-400">
                🚗 <span className="text-gray-300">{day.transportation}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}