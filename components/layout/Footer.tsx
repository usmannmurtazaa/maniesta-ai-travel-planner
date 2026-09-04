'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plane } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-brand-navy/80 backdrop-blur-md">
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-brand-teal/10 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-brand-purple/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-8 w-8 text-brand-teal" />
              <span className="font-bold text-xl bg-gradient-to-r from-brand-teal to-brand-indigo bg-clip-text text-transparent">
                Maniesta AI
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Create personalized AI‑powered travel plans and itineraries tailored to your interests, budget, and style.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/planner" className="text-white/60 hover:text-white transition-colors">AI Trip Planner</Link></li>
              <li><Link href="/results" className="text-white/60 hover:text-white transition-colors">Itinerary</Link></li>
              <li><Link href="/dashboard" className="text-white/60 hover:text-white transition-colors">Trip Dashboard</Link></li>
              <li><Link href="/dashboard" className="text-white/60 hover:text-white transition-colors">AI Travel Assistant</Link></li>
              <li><Link href="/dashboard" className="text-white/60 hover:text-white transition-colors">Saved Trips</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="text-white/60 cursor-default">Destinations</span></li>
              <li><span className="text-white/60 cursor-default">Travel Ideas</span></li>
              <li><Link href="/#how-it-works" className="text-white/60 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/#features" className="text-white/60 hover:text-white transition-colors">Features</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="text-white/60 cursor-default">Help</span></li>
              <li><span className="text-white/60 cursor-default">Contact</span></li>
              <li><Link href="/about" className="text-white/60 hover:text-white transition-colors">FAQ</Link></li>
              <li><span className="text-white/60 cursor-default">Feedback</span></li>
            </ul>
          </div>
        </div>

        {/* Legal links */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-sm">
          <span className="text-white/50 cursor-default">Privacy Policy</span>
          <span className="text-white/50 cursor-default">Terms of Service</span>
          <span className="text-white/50 cursor-default">Cookie Policy</span>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {currentYear} Maniesta AI Travel Planner. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Built by{' '}
            <a
              href="https://usmanmurtaza.nelify.app" // ← Replace with your portfolio URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-teal hover:text-white transition-colors"
            >
              Usman Murtaza
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}