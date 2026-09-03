'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const benefits = [
  'Save hours of research',
  'Discover hidden gems',
  'Avoid tourist traps',
  'Optimize your budget',
  'Get real-time updates',
  'Plan with friends',
]

export default function Benefits() {
  return (
    <section className="py-20 px-4 bg-brand-navy">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Why Travelers Love Maniesta
          </h2>
          <p className="text-white/70 mb-10">
            Join thousands of happy travelers who have transformed the way they plan trips.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 bg-white/5 rounded-xl p-4"
            >
              <Check className="h-5 w-5 text-brand-teal flex-shrink-0" />
              <span>{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}