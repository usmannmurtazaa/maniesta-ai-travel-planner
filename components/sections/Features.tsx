'use client'

import { motion } from 'framer-motion'
import { Sparkles, Map, Users, Wallet, Clock, ShieldCheck } from 'lucide-react'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'

const features = [
  { icon: Sparkles, title: 'AI Recommendations', description: 'Get personalized suggestions based on your preferences.' },
  { icon: Map, title: 'Smart Itineraries', description: 'Optimized day-by-day plans that save you time.' },
  { icon: Users, title: 'Group Planning', description: 'Collaborate with friends and family in real-time.' },
  { icon: Wallet, title: 'Budget Optimization', description: 'Stay within budget without missing out on experiences.' },
  { icon: Clock, title: 'Time Saving', description: 'Plan a full trip in minutes, not hours.' },
  { icon: ShieldCheck, title: 'Trusted Data', description: 'Up-to-date information from reliable sources.' },
]

export default function Features() {
  return (
    <section className="py-20 px-4 bg-brand-navy">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Features"
          title="Everything You Need to Plan Perfectly"
          subtitle="Maniesta AI combines cutting-edge technology with travel expertise to make planning effortless."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <feature.icon className="h-8 w-8 text-brand-teal mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}