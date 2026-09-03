import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-brand-indigo/20 via-brand-purple/20 to-brand-teal/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Start Your Next Adventure?
        </h2>
        <p className="text-white/70 mb-8">
          Let AI handle the planning while you focus on making memories.
        </p>
        <Link href="/planner" className="btn-primary text-lg px-8 py-4">
          Plan Your Trip Now
        </Link>
      </div>
    </section>
  )
}