'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Itinerary } from '@/lib/types'

// Fix default marker icon issue with Leaflet in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

interface MapViewProps {
  itinerary: Itinerary
}

export default function MapView({ itinerary }: MapViewProps) {
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null)
  const [markers, setMarkers] = useState<Array<{ position: [number, number]; title: string }>>([])

  useEffect(() => {
    if (!itinerary) return

    // Use destination coordinates if available, otherwise use first activity coordinates
    let center: [number, number] | null = null
    if (itinerary.destinationCoordinates) {
      center = [itinerary.destinationCoordinates.lat, itinerary.destinationCoordinates.lon]
    } else {
      // Try to find first activity with coordinates
      for (const day of itinerary.days) {
        for (const act of day.activities) {
          if (act.coordinates) {
            center = [act.coordinates.lat, act.coordinates.lon]
            break
          }
        }
        if (center) break
      }
    }

    if (center) {
      setMapCenter(center)
      const allMarkers: Array<{ position: [number, number]; title: string }> = []
      if (itinerary.destinationCoordinates) {
        allMarkers.push({
          position: [itinerary.destinationCoordinates.lat, itinerary.destinationCoordinates.lon],
          title: itinerary.destination,
        })
      }
      itinerary.days.forEach((day) => {
        day.activities.forEach((act) => {
          if (act.coordinates) {
            allMarkers.push({
              position: [act.coordinates.lat, act.coordinates.lon],
              title: act.title,
            })
          }
        })
      })
      setMarkers(allMarkers)
    }
  }, [itinerary])

  if (!mapCenter) {
    return <div className="glass-card p-6 text-center text-white/70">No map data available (coordinates missing).</div>
  }

  return (
    <div className="glass-card p-0 overflow-hidden rounded-2xl h-[400px]">
      <MapContainer center={mapCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.position}>
            <Popup>{marker.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}