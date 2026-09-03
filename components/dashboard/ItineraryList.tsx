'use client'

import { Itinerary } from '@/lib/types'

export default function ItineraryList({ itinerary }: { itinerary: Itinerary }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Daily Itinerary</h2>
      {itinerary.days.map((day) => (
        <div key={day.day} className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Day {day.day}</h3>
            <span className="text-brand-teal">{day.theme}</span>
          </div>
          <ul className="space-y-3">
            {day.activities.map((act, idx) => (
              <li key={idx} className="bg-white/5 rounded-lg p-3">
                <div className="font-medium">{act.time} - {act.title}</div>
                <p className="text-sm text-white/70">{act.description}</p>
                {act.location && <div className="text-xs text-white/50">📍 {act.location}</div>}
                {act.cost !== undefined && <div className="text-xs text-brand-teal">💰 {act.cost} {itinerary.currency}</div>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}