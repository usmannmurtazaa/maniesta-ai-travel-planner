import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'info' | 'warning' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  const variantClasses = {
    success: 'bg-green-500/20 text-green-300 border-green-400/30',
    info: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
    default: 'bg-brand-teal/20 text-brand-teal border-brand-teal/30',
  };

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
  };

  return (
    <span className={cn('rounded-full border', variantClasses[variant], sizeClasses[size], className)}>
      {children}
    </span>
  );
}