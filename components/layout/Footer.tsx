'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plane, Github, Twitter, Linkedin, Facebook, Instagram, Send, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      // Reset after a few seconds (just for demo)
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
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-8 w-8 text-brand-teal" />
              <span className="font-bold text-xl bg-gradient-to-r from-brand-teal to-brand-indigo bg-clip-text text-transparent">
                Maniesta AI
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Create personalized AI‑powered travel plans and itineraries tailored to your interests, budget, and style — all in one place.
            </p>
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium text-white/80 mb-2">Get travel inspiration & updates</p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="input-field flex-1"
                  aria-label="Email for travel updates"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-1 px-4 py-2"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-brand-teal mt-2">Thanks for subscribing!</p>
              )}
            </div>
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

          {/* Social / Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {/* Replace with actual URLs when available */}
              <button
                aria-label="Twitter"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button
                aria-label="Facebook"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                aria-label="Instagram"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </button>
              <button
                aria-label="GitHub"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </button>
            </div>
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
          <p className="text-white/40 text-xs flex items-center gap-1">
            Built with <span className="text-brand-teal">AI</span>
          </p>
        </div>
      </div>
    </footer>
  )
}