'use client'

import { cn } from '@/lib/utils'

interface MultiSelectChipsProps {
  label?: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export default function MultiSelectChips({ label, options, selected, onChange }: MultiSelectChipsProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div>
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => toggleOption(option)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm border transition-all',
              selected.includes(option)
                ? 'bg-brand-teal text-brand-navy border-brand-teal'
                : 'bg-white/10 text-white/70 border-white/20 hover:bg-white/20'
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}