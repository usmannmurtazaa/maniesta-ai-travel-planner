// components/dashboard/TripDashboard.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TripPlan, DayItinerary as DayItineraryType, ActivityItem } from '@/lib/types';
import DayItinerary from '@/components/itinerary/DayItinerary';
import BudgetBreakdown from './BudgetBreakdown';
import OverviewCard from './OverviewCard';
import TravelAssistant from '@/components/assistant/TravelAssistant';
import DestinationDiscovery from '@/components/DestinationDiscovery';
import Button from '@/components/ui/Button';
import { generateId, formatCurrency } from '@/lib/utils';

interface TripDashboardProps {
  trip: TripPlan;
  onSave: (trip: TripPlan) => void;
  onUpdateTrip: (trip: TripPlan) => void;
  onBack: () => void;
  isSaved: boolean;
}

export default function TripDashboard({ trip, onSave, onUpdateTrip, onBack, isSaved }: TripDashboardProps) {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'budget' | 'assistant' | 'discover'>('itinerary');
  const [regeneratingDay, setRegeneratingDay] = useState<number | null>(null);

  const handleEditActivity = (activity: ActivityItem) => {
    const updatedDays = trip.days.map(day => ({
      ...day,
      morning: day.morning.map(a => a.id === activity.id ? activity : a),
      afternoon: day.afternoon.map(a => a.id === activity.id ? activity : a),
      evening: day.evening.map(a => a.id === activity.id ? activity : a),
    }));
    onUpdateTrip({ ...trip, days: updatedDays });
  };

  const handleDeleteActivity = (activity: ActivityItem) => {
    const updatedDays = trip.days.map(day => ({
      ...day,
      morning: day.morning.filter(a => a.id !== activity.id),
      afternoon: day.afternoon.filter(a => a.id !== activity.id),
      evening: day.evening.filter(a => a.id !== activity.id),
    }));
    onUpdateTrip({ ...trip, days: updatedDays });
  };

  const handleRegenerateActivity = async (activity: ActivityItem) => {
    // In a full implementation, call API to regenerate
    const updatedActivity = { ...activity, description: activity.description + ' (Refreshed)' };
    handleEditActivity(updatedActivity);
  };

  const handleRegenerateDay = async (day: DayItineraryType) => {
    setRegeneratingDay(day.dayNumber);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const updatedDays = trip.days.map(d => 
      d.dayNumber === day.dayNumber
        ? { ...d, totalCost: Math.round(d.totalCost * 1.05) }
        : d
    );
    onUpdateTrip({ ...trip, days: updatedDays });
    setRegeneratingDay(null);
  };

  const handleAddActivity = (dayNumber: number, category: 'morning' | 'afternoon' | 'evening') => {
    const newActivity: ActivityItem = {
      id: generateId('activity'),
      time: '10:00',
      title: 'New Activity',
      description: 'Add details about this activity',
      category,
      location: '',
      cost: 0,
      duration: '1 hour',
      transportation: '',
    };
    
    const updatedDays = trip.days.map(day => {
      if (day.dayNumber === dayNumber) {
        return { ...day, [category]: [...day[category], newActivity] };
      }
      return day;
    });
    onUpdateTrip({ ...trip, days: updatedDays });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
              ← Back
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {trip.destinationInfo.name || trip.preferences.destination}
            </h1>
          </div>
          <p className="text-gray-400 mt-1">
            {trip.preferences.startDate} → {trip.preferences.endDate} · {trip.preferences.travelers} traveler{trip.preferences.travelers !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          variant={isSaved ? 'secondary' : 'primary'}
          onClick={() => onSave(trip)}
          icon={isSaved ? '✓' : '💾'}
        >
          {isSaved ? 'Saved' : 'Save Trip'}
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard label="Total Budget" value={formatCurrency(trip.budget.total, trip.preferences.currency)} icon="💰" />
        <OverviewCard label="Days" value={trip.days.length.toString()} icon="📅" />
        <OverviewCard label="Travelers" value={trip.preferences.travelers.toString()} icon="👥" />
        <OverviewCard label="Travel Type" value={trip.preferences.travelType.charAt(0).toUpperCase() + trip.preferences.travelType.slice(1)} icon="🎯" />
      </div>

      {/* Trip Overview */}
      {trip.overview && (
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-2">Trip Overview</h3>
          <p className="text-gray-300">{trip.overview}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
        {[
          { id: 'itinerary', label: '📋 Itinerary' },
          { id: 'budget', label: '💰 Budget' },
          { id: 'assistant', label: '🤖 AI Assistant' },
          { id: 'discover', label: '🔍 Discover' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-violet-500/20 text-white border border-violet-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'itinerary' && (
        <div className="space-y-4">
          {trip.days.map(day => (
            <DayItinerary
              key={day.dayNumber}
              day={day}
              currency={trip.preferences.currency}
              onEditActivity={handleEditActivity}
              onDeleteActivity={handleDeleteActivity}
              onRegenerateActivity={handleRegenerateActivity}
              onRegenerateDay={handleRegenerateDay}
              onAddActivity={handleAddActivity}
              isRegenerating={regeneratingDay === day.dayNumber}
            />
          ))}
        </div>
      )}

      {activeTab === 'budget' && (
        <BudgetBreakdown budget={trip.budget} currency={trip.preferences.currency} />
      )}

      {activeTab === 'assistant' && (
        <TravelAssistant trip={trip} />
      )}

      {activeTab === 'discover' && (
        <DestinationDiscovery destinationInfo={trip.destinationInfo} />
      )}
    </motion.div>
  );
}