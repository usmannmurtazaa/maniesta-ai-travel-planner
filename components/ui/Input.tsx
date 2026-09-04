'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium mb-2">{label}</label>}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">{icon}</span>
          )}
          <input
            ref={ref}
            className={cn(
              'input-field',
              icon && 'pl-10',
              error && 'border-red-500',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export default Input