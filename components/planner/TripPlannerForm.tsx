// components/planner/TripPlannerForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import { TripPreferences, TravelType, FoodPreference } from '@/lib/types';
import { 
  CURRENCIES, INTEREST_OPTIONS, ACTIVITY_OPTIONS, 
  FOOD_PREFERENCE_OPTIONS, ACCOMMODATION_OPTIONS, TRANSPORTATION_OPTIONS 
} from '@/lib/config';
import { calculateDuration } from '@/lib/utils';

interface TripPlannerFormProps {
  onSubmit: (preferences: TripPreferences) => void;
  loading: boolean;
}

export default function TripPlannerForm({ onSubmit, loading }: TripPlannerFormProps) {
  const [form, setForm] = useState<TripPreferences>({
    destination: '',
    startingLocation: '',
    startDate: '',
    endDate: '',
    durationDays: 3,
    travelers: 1,
    budget: 2000,
    currency: 'USD',
    budgetLevel: 'moderate',
    travelType: 'solo',
    interests: [],
    activities: [],
    foodPreferences: [],
    accommodation: 'hotel',
    transportation: 'public',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: any) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'startDate' || field === 'endDate') {
        if (updated.startDate && updated.endDate) {
          updated.durationDays = calculateDuration(updated.startDate, updated.endDate);
        }
      }
      return updated;
    });
  };

  const toggleArrayItem = (array: string[], item: string): string[] => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    }
    return [...array, item];
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.destination.trim()) newErrors.destination = 'Destination is required';
    if (!form.startingLocation.trim()) newErrors.startingLocation = 'Starting location is required';
    if (!form.startDate) newErrors.startDate = 'Start date is required';
    if (!form.endDate) newErrors.endDate = 'End date is required';
    if (form.travelers < 1) newErrors.travelers = 'At least 1 traveler';
    if (form.budget < 50) newErrors.budget = 'Budget must be at least $50';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info Section */}
      <Card className="space-y-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <span>🗺️</span> Trip Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Destination*"
            placeholder="e.g., Tokyo, Paris, New York"
            value={form.destination}
            onChange={(e) => updateField('destination', e.target.value)}
            error={errors.destination}
            icon="📍"
          />
          <Input
            label="Starting Location*"
            placeholder="e.g., New York, London"
            value={form.startingLocation}
            onChange={(e) => updateField('startingLocation', e.target.value)}
            error={errors.startingLocation}
            icon="🏠"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Start Date*"
            type="date"
            value={form.startDate}
            onChange={(e) => updateField('startDate', e.target.value)}
            error={errors.startDate}
          />
          <Input
            label="End Date*"
            type="date"
            value={form.endDate}
            onChange={(e) => updateField('endDate', e.target.value)}
            error={errors.endDate}
          />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
            <div className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white">
              {form.durationDays} day{form.durationDays !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Number of Travelers"
            type="number"
            min={1}
            max={20}
            value={form.travelers}
            onChange={(e) => updateField('travelers', parseInt(e.target.value) || 1)}
            icon="👥"
          />
          <Input
            label={`Budget (${form.currency})`}
            type="number"
            min={50}
            step={100}
            value={form.budget}
            onChange={(e) => updateField('budget', parseInt(e.target.value) || 0)}
            error={errors.budget}
            icon="💰"
          />
          <Select
            label="Currency"
            value={form.currency}
            onChange={(e) => updateField('currency', e.target.value)}
            options={CURRENCIES.map(c => ({ value: c.code, label: `${c.code} - ${c.name}` }))}
          />
        </div>
      </Card>

      {/* Preferences Section */}
      <Card className="space-y-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <span>🎯</span> Travel Preferences
        </h3>

        {/* Travel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Travel Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: 'solo', label: 'Solo', icon: '🧑' },
              { value: 'couple', label: 'Couple', icon: '💑' },
              { value: 'family', label: 'Family', icon: '👨‍👩‍👧' },
              { value: 'friends', label: 'Friends', icon: '👥' },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateField('travelType', opt.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  form.travelType === opt.value
                    ? 'border-violet-500 bg-violet-500/10 text-white'
                    : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20'
                }`}
              >
                <div className="text-2xl mb-1">{opt.icon}</div>
                <div className="font-medium">{opt.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Budget Level */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Budget Level</label>
          <div className="grid grid-cols-3 gap-3">
            {(['budget', 'moderate', 'luxury'] as const).map(level => (
              <button
                key={level}
                type="button"
                onClick={() => updateField('budgetLevel', level)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  form.budgetLevel === level
                    ? 'border-violet-500 bg-violet-500/10 text-white'
                    : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20'
                }`}
              >
                <div className="font-medium capitalize">{level}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Travel Interests</label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => updateField('interests', toggleArrayItem(form.interests, interest))}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                  form.interests.includes(interest)
                    ? 'bg-violet-500/30 border-violet-500 text-white'
                    : 'bg-white/[0.04] border-white/10 text-gray-400 hover:border-white/30'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Activities</label>
          <div className="flex flex-wrap gap-2">
            {ACTIVITY_OPTIONS.map(activity => (
              <button
                key={activity}
                type="button"
                onClick={() => updateField('activities', toggleArrayItem(form.activities, activity))}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                  form.activities.includes(activity)
                    ? 'bg-cyan-500/30 border-cyan-500 text-white'
                    : 'bg-white/[0.04] border-white/10 text-gray-400 hover:border-white/30'
                }`}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>

        {/* Food Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Food Preferences</label>
          <div className="flex flex-wrap gap-2">
            {FOOD_PREFERENCE_OPTIONS.map(pref => (
              <button
                key={pref}
                type="button"
                onClick={() => updateField('foodPreferences', toggleArrayItem(form.foodPreferences, pref as FoodPreference))}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                  form.foodPreferences.includes(pref as FoodPreference)
                    ? 'bg-emerald-500/30 border-emerald-500 text-white'
                    : 'bg-white/[0.04] border-white/10 text-gray-400 hover:border-white/30'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Accommodation & Transportation */}
      <Card className="space-y-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <span>🏨</span> Accommodation & Transport
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Accommodation Preference</label>
            <div className="space-y-2">
              {ACCOMMODATION_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateField('accommodation', opt.value)}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 ${
                    form.accommodation === opt.value
                      ? 'border-violet-500 bg-violet-500/10 text-white'
                      : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20'
                  }`}
                >
                  <span className="text-xl">{opt.icon}</span>
                  <span className="font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Transportation Preference</label>
            <div className="space-y-2">
              {TRANSPORTATION_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateField('transportation', opt.value)}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 ${
                    form.transportation === opt.value
                      ? 'border-violet-500 bg-violet-500/10 text-white'
                      : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20'
                  }`}
                >
                  <span className="text-xl">{opt.icon}</span>
                  <span className="font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Button
        type="submit"
        size="lg"
        loading={loading}
        className="w-full"
        icon="✨"
      >
        {loading ? 'Generating Your Trip...' : 'Generate AI Trip Plan'}
      </Button>
    </form>
  );
}