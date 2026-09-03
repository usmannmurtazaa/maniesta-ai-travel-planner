import { TripFormData } from '@/lib/types'

interface Step3Props {
  formData: TripFormData
  updateFormData: (field: keyof TripFormData, value: any) => void
}

export default function Step3({ formData }: Step3Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Review Your Trip</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/50 mb-1">Destination</p>
            <p className="font-medium">{formData.destination || 'Not set'}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/50 mb-1">Starting Location</p>
            <p className="font-medium">{formData.startingLocation || 'Not set'}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/50 mb-1">Dates</p>
            <p className="font-medium">
              {formData.startDate && formData.endDate
                ? `${formData.startDate} to ${formData.endDate}`
                : 'Not set'}
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/50 mb-1">Travelers</p>
            <p className="font-medium">{formData.travelers}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/50 mb-1">Budget</p>
            <p className="font-medium">{formData.budget} {formData.currency}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/50 mb-1">Travel Type</p>
            <p className="font-medium">{formData.travelType}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/50 mb-1">Interests</p>
            <p className="font-medium">{formData.interests.join(', ') || 'None selected'}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/50 mb-1">Activities</p>
            <p className="font-medium">{formData.activities.join(', ') || 'None selected'}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/50 mb-1">Food Preference</p>
            <p className="font-medium">{formData.foodPreference}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/50 mb-1">Accommodation</p>
            <p className="font-medium">{formData.accommodation}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-white/50 mb-1">Transportation</p>
            <p className="font-medium">{formData.transportation}</p>
          </div>
        </div>
      </div>
    </div>
  )
}