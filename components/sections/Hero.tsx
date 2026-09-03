'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plane, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-aurora animate-aurora-shift" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-teal/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-brand-teal" />
            <span className="text-sm text-white/80">AI-Powered Travel Planning</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Plan Your Perfect Trip with{' '}
            <span className="bg-gradient-to-r from-brand-teal via-brand-indigo to-brand-purple bg-clip-text text-transparent">
              Maniesta AI
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Discover personalized itineraries, smart recommendations, and seamless travel planning — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/planner" className="btn-primary text-lg px-8 py-4">
              Start Planning Free
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 rounded-xl border border-white/30 text-white hover:bg-white/10 transition-colors text-lg"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 right-10 hidden lg:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Plane className="h-16 w-16 text-brand-teal/50" />
      </motion.div>
    </section>
  )
}