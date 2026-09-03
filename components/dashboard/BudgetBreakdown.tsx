'use client'

import { Itinerary } from '@/lib/types'

export default function BudgetBreakdown({ itinerary }: { itinerary: Itinerary }) {
  const totalCost = itinerary.days.reduce((sum, day) => {
    return sum + day.activities.reduce((s, act) => s + (act.cost || 0), 0)
  }, 0)
  const remaining = itinerary.budget - totalCost

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold mb-4">Budget Breakdown</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Total Budget</span>
          <span>{itinerary.budget} {itinerary.currency}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Activities Cost</span>
          <span>{totalCost} {itinerary.currency}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Remaining</span>
          <span>{remaining} {itinerary.currency}</span>
        </div>
      </div>
    </div>
  )
}