import Link from 'next/link'
import { Plane, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-navy/80 backdrop-blur-md border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-6 w-6 text-brand-teal" />
              <span className="font-bold text-lg">Maniesta AI</span>
            </div>
            <p className="text-white/60 max-w-md">
              Your intelligent travel companion. Plan unforgettable journeys with the power of AI.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/60">
              <li><Link href="/planner" className="hover:text-white">Plan Trip</Link></li>
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-white"><Github className="h-5 w-5" /></a>
              <a href="#" className="text-white/60 hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-white/60 hover:text-white"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          © 2025 Maniesta AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}