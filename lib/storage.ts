import { TripPlan } from './types';

const STORAGE_KEY = 'maniesta_saved_trips';

export function saveTrip(trip: TripPlan): void {
  if (typeof window === 'undefined') return;
  const trips = getSavedTrips();
  const existingIndex = trips.findIndex(t => t.id === trip.id);
  if (existingIndex >= 0) {
    trips[existingIndex] = trip;
  } else {
    trips.unshift(trip);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

export function getSavedTrips(): TripPlan[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as TripPlan[];
  } catch {
    return [];
  }
}

export function getTripById(id: string): TripPlan | null {
  const trips = getSavedTrips();
  return trips.find(t => t.id === id) || null;
}

export function deleteTrip(id: string): void {
  const trips = getSavedTrips();
  const filtered = trips.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function updateTrip(trip: TripPlan): void {
  saveTrip(trip);
}