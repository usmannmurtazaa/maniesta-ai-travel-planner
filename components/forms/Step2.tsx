import Select from '@/components/ui/Select'
import MultiSelectChips from '@/components/ui/MultiSelectChips'
import { TripFormData } from '@/lib/types'
import {
  travelTypeOptions,
  interestOptions,
  activityOptions,
  foodPreferenceOptions,
  accommodationOptions,
  transportationOptions,
} from '@/lib/constants'

interface Step2Props {
  formData: TripFormData
  updateFormData: (field: keyof TripFormData, value: any) => void
}

export default function Step2({ formData, updateFormData }: Step2Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Preferences & Interests</h2>
      <div className="space-y-6">
        <Select
          label="Travel Type"
          options={travelTypeOptions}
          value={formData.travelType}
          onChange={(e) => updateFormData('travelType', e.target.value)}
        />
        <MultiSelectChips
          label="Interests"
          options={interestOptions}
          selected={formData.interests}
          onChange={(selected) => updateFormData('interests', selected)}
        />
        <MultiSelectChips
          label="Activities"
          options={activityOptions}
          selected={formData.activities}
          onChange={(selected) => updateFormData('activities', selected)}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select
            label="Food Preference"
            options={foodPreferenceOptions}
            value={formData.foodPreference}
            onChange={(e) => updateFormData('foodPreference', e.target.value)}
          />
          <Select
            label="Accommodation"
            options={accommodationOptions}
            value={formData.accommodation}
            onChange={(e) => updateFormData('accommodation', e.target.value)}
          />
          <Select
            label="Transportation"
            options={transportationOptions}
            value={formData.transportation}
            onChange={(e) => updateFormData('transportation', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}