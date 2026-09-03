import { Inbox } from 'lucide-react'

export default function EmptyState({ message = 'No data available' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-white/60">
      <Inbox className="h-16 w-16 mb-4" />
      <p className="text-lg">{message}</p>
    </div>
  )
}