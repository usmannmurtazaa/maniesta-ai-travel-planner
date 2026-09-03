interface ProgressBarProps {
  currentStep: number
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps = ['Details', 'Preferences', 'Review']
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                index + 1 <= currentStep
                  ? 'bg-brand-teal text-brand-navy'
                  : 'bg-white/10 text-white/50'
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`hidden sm:block ${
                index + 1 <= currentStep ? 'text-white' : 'text-white/50'
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-12 sm:w-24 h-0.5 mx-2 ${
                index + 1 < currentStep ? 'bg-brand-teal' : 'bg-white/20'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}