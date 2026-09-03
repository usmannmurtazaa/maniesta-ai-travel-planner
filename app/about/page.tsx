'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How does Maniesta AI work?',
    a: 'We use advanced AI algorithms to analyze your preferences and create personalized travel itineraries in seconds.',
  },
  {
    q: 'Is Maniesta AI free to use?',
    a: 'Yes, you can start planning for free. Premium features may be added in the future.',
  },
  {
    q: 'Can I customize my itinerary?',
    a: 'Absolutely! Our AI generates a base itinerary that you can fully customize to your liking.',
  },
]

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-aurora">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">About Maniesta AI</h1>
        <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
          We're on a mission to make travel planning effortless and enjoyable for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-white/70">
              To democratize travel planning by leveraging AI to create personalized, stress-free experiences.
            </p>
          </div>
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p className="text-white/70">
              A world where everyone can explore the planet with confidence and joy, no matter their budget or experience.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 text-left"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="font-medium">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4 text-white/70">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}