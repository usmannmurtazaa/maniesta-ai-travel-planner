interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      {eyebrow && (
        <span className="inline-block text-brand-teal font-semibold tracking-widest text-sm uppercase mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-white/70 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}