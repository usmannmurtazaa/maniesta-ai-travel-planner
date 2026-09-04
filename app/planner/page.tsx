'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Step1 from '@/components/forms/Step1'
import Step2 from '@/components/forms/Step2'
import Step3 from '@/components/forms/Step3'
import ProgressBar from '@/components/forms/ProgressBar'
import { TripFormData, SavedTrip } from '@/lib/types'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import { useRouter } from 'next/navigation'

export default function PlannerPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<TripFormData>({
    destination: '',
    startingLocation: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: 1000,
    currency: 'USD',
    travelType: 'Solo',
    interests: [],
    activities: [],
    foodPreference: 'Any',
    accommodation: 'Any',
    transportation: 'Any',
  })

  const updateFormData = (field: keyof TripFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      })

      if (!response.ok) {
  const text = await response.text();
  try {
    const errorData = JSON.parse(text);
    throw new Error(errorData.error || 'Failed to generate itinerary');
  } catch {
    throw new Error(`Server error (${response.status})`);
  }
}

      const data = await response.json()
      const itinerary = data.itinerary

      // Save current trip
      localStorage.setItem('maniesta_current_trip', JSON.stringify(itinerary))

      // Add to saved trips list
      const savedTrips = JSON.parse(localStorage.getItem('maniesta_saved_trips') || '[]') as SavedTrip[]
      const newTrip: SavedTrip = {
        id: Date.now().toString(),
        name: itinerary.destination,
        createdAt: new Date().toISOString(),
        itinerary,
      }
      savedTrips.push(newTrip)
      localStorage.setItem('maniesta_saved_trips', JSON.stringify(savedTrips))

      // Navigate to dashboard
      router.push('/dashboard')
    } catch (err) {
      console.error('Submission error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-aurora">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Plan Your Trip</h1>
        <p className="text-white/70 text-center mb-8">
          Tell us your preferences and we&apos;ll craft the perfect itinerary.
        </p>
        <ProgressBar currentStep={step} />
        <div className="glass-card p-6 sm:p-8 mt-8">
          {isSubmitting ? (
            <div className="py-16 flex flex-col items-center gap-4">
              <LoadingSpinner size="lg" />
              <p className="text-white/70">Generating your itinerary...</p>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Step1 formData={formData} updateFormData={updateFormData} />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Step2 formData={formData} updateFormData={updateFormData} />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Step3 formData={formData} updateFormData={updateFormData} />
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button onClick={prevStep} className="btn-secondary">
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button onClick={nextStep} className="btn-primary ml-auto">
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="btn-primary ml-auto"
                    disabled={isSubmitting}
                  >
                    Generate Itinerary
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}