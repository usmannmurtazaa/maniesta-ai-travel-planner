'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: string[] | { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium mb-2">{label}</label>}
        <select ref={ref} className={cn('input-field', className)} {...props}>
          {options.map((option) => {
            if (typeof option === 'string') {
              return (
                <option key={option} value={option} className="bg-brand-navy">
                  {option}
                </option>
              )
            }
            return (
              <option key={option.value} value={option.value} className="bg-brand-navy">
                {option.label}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
)
Select.displayName = 'Select'

export default Select