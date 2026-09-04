'use client'

import dynamic from 'next/dynamic'
import { Itinerary } from '@/lib/types'
import WeatherCard from './WeatherCard'
import BudgetBreakdown from './BudgetBreakdown'
import AssistantChat from './AssistantChat'
import ItineraryList from './ItineraryList'

const MapView = dynamic(() => import('./MapView'), { ssr: false })

export default function DashboardContent({ itinerary }: { itinerary: Itinerary }) {
  return (
    <div className="space-y-8">
      {/* Overview header */}
      <div className="glass-card p-6 sm:p-8">
        <h1 className="text-3xl font-bold mb-2">{itinerary.destination}</h1>
        <div className="flex flex-wrap gap-4 text-white/70">
          <span>{itinerary.startDate} - {itinerary.endDate}</span>
          <span>{itinerary.travelers} travelers</span>
          <span>{itinerary.budget} {itinerary.currency}</span>
        </div>
        {itinerary.summary && <p className="mt-4 text-white/80">{itinerary.summary}</p>}
      </div>

      {/* Weather and map side by side on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WeatherCard destination={itinerary.destination} />
        <MapView itinerary={itinerary} />
      </div>

      {/* Itinerary and budget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ItineraryList itinerary={itinerary} />
        </div>
        <div>
          <BudgetBreakdown itinerary={itinerary} />
        </div>
      </div>

      {/* AI Assistant */}
      <AssistantChat itinerary={itinerary} />
    </div>
  )
}