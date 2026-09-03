// components/navigation/Navbar.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface NavbarProps {
  onHome: () => void;
  onSavedTrips: () => void;
  savedCount: number;
}

export default function Navbar({ onHome, onSavedTrips, savedCount }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40 bg-gray-950/60 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={onHome} className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">✈️</span>
            <span className="font-bold text-lg bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Maniesta
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onHome}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
            >
              Plan Trip
            </button>
            <button
              onClick={onSavedTrips}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Saved Trips
              {savedCount > 0 && (
                <span className="bg-violet-500 text-white text-xs rounded-full px-2 py-0.5">
                  {savedCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-gray-950/95 backdrop-blur-xl border-b border-white/10"
        >
          <div className="px-4 py-3 space-y-2">
            <button
              onClick={() => { onHome(); setIsMenuOpen(false); }}
              className="block w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Plan Trip
            </button>
            <button
              onClick={() => { onSavedTrips(); setIsMenuOpen(false); }}
              className="block w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Saved Trips ({savedCount})
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}