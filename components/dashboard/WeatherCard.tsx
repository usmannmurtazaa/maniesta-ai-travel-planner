'use client'

import { useEffect, useState } from 'react'
import { CloudSun, Wind, Droplets } from 'lucide-react'
import { WeatherData } from '@/lib/types'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import ErrorState from '@/components/shared/ErrorState'

interface WeatherCardProps {
  destination: string
}

export default function WeatherCard({ destination }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData & { location?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/weather?destination=${encodeURIComponent(destination)}`)
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Failed to fetch weather')
        }
        const data = await res.json()
        setWeather(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather')
      } finally {
        setLoading(false)
      }
    }
    fetchWeather()
  }, [destination])

  if (loading) return <LoadingSpinner size="md" />
  if (error) return <ErrorState message={error} />
  if (!weather) return null

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
        <CloudSun className="h-5 w-5 text-brand-teal" />
        Weather in {weather.location}
      </h3>
      <div className="flex items-center gap-6">
        <div>
          <p className="text-4xl font-bold">{Math.round(weather.current.temperature)}°C</p>
          <p className="text-sm text-white/70">
            {weather.current.time}
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4" />
            Wind: {weather.current.windspeed} km/h
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-medium mb-2">7-Day Forecast</h4>
        <div className="grid grid-cols-7 gap-2">
          {weather.daily.time.slice(0, 7).map((date, idx) => (
            <div key={date} className="text-center">
              <p className="text-xs">{new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}</p>
              <p className="text-sm font-medium">{Math.round(weather.daily.temperature_2m_max[idx])}°</p>
              <p className="text-xs text-white/60">{Math.round(weather.daily.temperature_2m_min[idx])}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}