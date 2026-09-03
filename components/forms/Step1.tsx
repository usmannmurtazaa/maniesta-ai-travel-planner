import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { TripFormData } from '@/lib/types'
import { currencyOptions } from '@/lib/constants'

interface Step1Props {
  formData: TripFormData
  updateFormData: (field: keyof TripFormData, value: any) => void
}

export default function Step1({ formData, updateFormData }: Step1Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Trip Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Destination"
          placeholder="Where do you want to go?"
          value={formData.destination}
          onChange={(e) => updateFormData('destination', e.target.value)}
          required
        />
        <Input
          label="Starting Location"
          placeholder="Where are you departing from?"
          value={formData.startingLocation}
          onChange={(e) => updateFormData('startingLocation', e.target.value)}
          required
        />
        <Input
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) => updateFormData('startDate', e.target.value)}
          required
        />
        <Input
          label="End Date"
          type="date"
          value={formData.endDate}
          onChange={(e) => updateFormData('endDate', e.target.value)}
          required
        />
        <div>
          <label className="block text-sm font-medium mb-2">Number of Travelers</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => updateFormData('travelers', Math.max(1, formData.travelers - 1))}
              className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-xl"
            >
              -
            </button>
            <span className="text-xl font-semibold">{formData.travelers}</span>
            <button
              type="button"
              onClick={() => updateFormData('travelers', formData.travelers + 1)}
              className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-xl"
            >
              +
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Budget (approx.)</label>
            <input
              type="number"
              min="0"
              value={formData.budget}
              onChange={(e) => updateFormData('budget', parseInt(e.target.value) || 0)}
              className="input-field"
            />
          </div>
          <Select
            label="Currency"
            options={currencyOptions}
            value={formData.currency}
            onChange={(e) => updateFormData('currency', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}