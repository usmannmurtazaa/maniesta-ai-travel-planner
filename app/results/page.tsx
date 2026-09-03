'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarDays, Users, Wallet, RefreshCw, Pencil } from 'lucide-react'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import EmptyState from '@/components/shared/EmptyState'
import ErrorState from '@/components/shared/ErrorState'
import { Itinerary, ItineraryActivity } from '@/lib/types'

export default function ResultsPage() {
  const router = useRouter()
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingActivity, setEditingActivity] = useState<{
    dayIndex: number
    activityIndex: number
  } | null>(null)
  const [editForm, setEditForm] = useState<ItineraryActivity | null>(null)
  const [regenerating, setRegenerating] = useState(false)
  const [regeneratingDay, setRegeneratingDay] = useState<number | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('maniesta_current_trip')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Itinerary
        setItinerary(parsed)
      } catch (e) {
        setError('Failed to load saved itinerary')
      }
    }
    setLoading(false)
  }, [])

  const handleRegenerateAll = async () => {
    if (!itinerary) return
    setRegenerating(true)
    setError(null)
    try {
      const res = await fetch('/api/regenerate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itinerary, targetDay: 'all' }),
      })
      if (!res.ok) throw new Error('Regeneration failed')
      const data = await res.json()
      const newItinerary = data.itinerary
      setItinerary(newItinerary)
      localStorage.setItem('maniesta_current_trip', JSON.stringify(newItinerary))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Regeneration failed')
    } finally {
      setRegenerating(false)
    }
  }

  const handleRegenerateDay = async (dayNumber: number) => {
    if (!itinerary) return
    setRegeneratingDay(dayNumber)
    setError(null)
    try {
      const res = await fetch('/api/regenerate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itinerary, targetDay: dayNumber }),
      })
      if (!res.ok) throw new Error('Day regeneration failed')
      const data = await res.json()
      const newDay = data.day
      const updatedDays = itinerary.days.map((d) =>
        d.day === dayNumber ? newDay : d
      )
      const newItinerary = { ...itinerary, days: updatedDays }
      setItinerary(newItinerary)
      localStorage.setItem('maniesta_current_trip', JSON.stringify(newItinerary))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Day regeneration failed')
    } finally {
      setRegeneratingDay(null)
    }
  }

  const startEditing = (dayIndex: number, activityIndex: number) => {
    const activity = itinerary!.days[dayIndex].activities[activityIndex]
    setEditingActivity({ dayIndex, activityIndex })
    setEditForm({ ...activity })
  }

  const cancelEditing = () => {
    setEditingActivity(null)
    setEditForm(null)
  }

  const saveEditing = () => {
    if (!editingActivity || !itinerary || !editForm) return
    const { dayIndex, activityIndex } = editingActivity
    const updatedDays = [...itinerary.days]
    updatedDays[dayIndex].activities[activityIndex] = editForm
    const newItinerary = { ...itinerary, days: updatedDays }
    setItinerary(newItinerary)
    localStorage.setItem('maniesta_current_trip', JSON.stringify(newItinerary))
    cancelEditing()
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

  if (!itinerary) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <EmptyState message="No itinerary generated yet. Start planning your trip!" />
        <div className="text-center mt-6">
          <button onClick={() => router.push('/planner')} className="btn-primary">
            Plan a Trip
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-aurora">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass-card p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{itinerary.destination}</h1>
              <div className="flex flex-wrap gap-4 text-white/70">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {itinerary.startDate} - {itinerary.endDate}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {itinerary.travelers} travelers
                </span>
                <span className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  {itinerary.budget} {itinerary.currency}
                </span>
              </div>
              {itinerary.summary && (
                <p className="mt-4 text-white/80">{itinerary.summary}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRegenerateAll}
                disabled={regenerating}
                className="btn-secondary flex items-center gap-2"
              >
                {regenerating ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Regenerate All
              </button>
            </div>
          </div>
        </div>

        {/* Day cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {itinerary.days.map((day, dayIndex) => (
            <div
              key={day.day}
              className="glass-card p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Day {day.day}</h3>
                <div className="flex gap-2">
                  <span className="text-sm text-brand-teal">{day.theme}</span>
                  <button
                    onClick={() => handleRegenerateDay(day.day)}
                    disabled={regeneratingDay === day.day}
                    className="text-white/60 hover:text-white"
                    title="Regenerate this day"
                  >
                    {regeneratingDay === day.day ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <ul className="space-y-4">
                {day.activities.map((activity, actIndex) => (
                  <li key={actIndex} className="bg-white/5 rounded-lg p-3">
                    {editingActivity &&
                    editingActivity.dayIndex === dayIndex &&
                    editingActivity.activityIndex === actIndex ? (
                      <div className="space-y-2">
                        <input
                          className="input-field"
                          value={editForm?.time || ''}
                          onChange={(e) =>
                            setEditForm({ ...editForm!, time: e.target.value })
                          }
                          placeholder="Time"
                        />
                        <input
                          className="input-field"
                          value={editForm?.title || ''}
                          onChange={(e) =>
                            setEditForm({ ...editForm!, title: e.target.value })
                          }
                          placeholder="Title"
                        />
                        <textarea
                          className="input-field"
                          value={editForm?.description || ''}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm!,
                              description: e.target.value,
                            })
                          }
                          placeholder="Description"
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={saveEditing}
                            className="btn-primary py-1 px-3 text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="btn-secondary py-1 px-3 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="font-medium">
                            {activity.time} - {activity.title}
                          </div>
                          <p className="text-sm text-white/70 mt-1">
                            {activity.description}
                          </p>
                          {activity.location && (
                            <div className="text-xs text-white/50 mt-1">
                              📍 {activity.location}
                            </div>
                          )}
                          {activity.cost !== undefined && (
                            <div className="text-xs text-brand-teal mt-1">
                              💰 {activity.cost} {itinerary.currency}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => startEditing(dayIndex, actIndex)}
                          className="text-white/50 hover:text-white"
                          title="Edit activity"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* AI Travel Assistant placeholder */}
        <div className="mt-12 glass-card p-6">
          <h2 className="text-2xl font-semibold mb-4">AI Travel Assistant</h2>
          <div className="flex gap-4">
            <input
              className="input-field flex-1"
              placeholder="Ask about your trip..."
              disabled
            />
            <button className="btn-primary" disabled>
              Send
            </button>
          </div>
          <p className="text-sm text-white/50 mt-2">
            Assistant functionality coming soon.
          </p>
        </div>
      </div>
    </div>
  )
}