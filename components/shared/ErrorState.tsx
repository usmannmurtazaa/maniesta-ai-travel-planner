import { AlertTriangle } from 'lucide-react'

export default function ErrorState({ message = 'Something went wrong' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-red-400">
      <AlertTriangle className="h-16 w-16 mb-4" />
      <p className="text-lg">{message}</p>
    </div>
  )
}