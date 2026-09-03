'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const steps = [
  { number: '01', title: 'Tell Us Your Preferences', description: 'Fill out a quick form about your travel style, interests, and budget.' },
  { number: '02', title: 'AI Generates Itinerary', description: 'Our AI engine creates a personalized plan tailored to your needs.' },
  { number: '03', title: 'Customize & Book', description: 'Adjust any part of the itinerary and book directly through partners.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-aurora">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="How It Works"
          title="Plan in Three Simple Steps"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="glass-card p-8 h-full">
                <span className="text-5xl font-bold text-brand-teal/40">{step.number}</span>
                <h3 className="text-2xl font-semibold mt-4 mb-3">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}