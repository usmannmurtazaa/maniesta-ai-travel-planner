'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import EmptyState from '@/components/shared/EmptyState'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import ErrorState from '@/components/shared/ErrorState'
import { SavedTrip, Itinerary } from '@/lib/types'
import DashboardContent from '@/components/dashboard/DashboardContent'

export default function DashboardPage() {
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([])
  const [currentTrip, setCurrentTrip] = useState<Itinerary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list')
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null)

  useEffect(() => {
    // Load current trip and saved trips from localStorage
    try {
      const current = localStorage.getItem('maniesta_current_trip')
      if (current) {
        const parsed = JSON.parse(current) as Itinerary
        setCurrentTrip(parsed)
        // Optionally automatically show detail if current exists
        setViewMode('detail')
      }
      const saved = localStorage.getItem('maniesta_saved_trips')
      if (saved) {
        const parsed = JSON.parse(saved) as SavedTrip[]
        setSavedTrips(parsed)
      }
    } catch (err) {
      setError('Failed to load saved trips')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSelectTrip = (tripId: string) => {
    const trip = savedTrips.find((t) => t.id === tripId)
    if (trip) {
      setCurrentTrip(trip.itinerary)
      setSelectedTripId(tripId)
      setViewMode('detail')
    }
  }

  const handleNewTrip = () => {
    // Clear current trip and go to planner
    localStorage.removeItem('maniesta_current_trip')
    setCurrentTrip(null)
    setViewMode('list')
    window.location.href = '/planner'
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <ErrorState message={error} />
      </div>
    )
  }

  // Detail view
  if (viewMode === 'detail' && currentTrip) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 bg-aurora">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setViewMode('list')}
            className="btn-secondary mb-6"
          >
            ← Back to Saved Trips
          </button>
          <DashboardContent itinerary={currentTrip} />
        </div>
      </div>
    )
  }

  // List view
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-aurora">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Your Trips</h1>
          <button onClick={handleNewTrip} className="btn-primary flex items-center gap-2">
            <Plus className="h-5 w-5" /> New Trip
          </button>
        </div>

        {savedTrips.length === 0 ? (
          <EmptyState message="No saved trips yet. Start planning your first adventure!" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="glass-card p-6 hover:scale-[1.02] hover:shadow-xl transition-all cursor-pointer"
                onClick={() => handleSelectTrip(trip.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{trip.name}</h3>
                </div>
                <p className="text-white/70 text-sm mb-2">
                  {trip.itinerary.startDate} - {trip.itinerary.endDate}
                </p>
                <p className="text-white/50 text-xs">Created {new Date(trip.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}