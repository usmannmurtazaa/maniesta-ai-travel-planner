'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      ghost: 'px-4 py-2 rounded-lg hover:bg-white/10 transition-colors',
    }
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg',
    }
    return (
      <button
        ref={ref}
        className={cn(variants[variant], sizes[size], className, loading && 'opacity-70 cursor-not-allowed')}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner size="sm" />
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

export default Button