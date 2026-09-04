'use client';

import { motion } from 'framer-motion';
import { DestinationInfo } from '@/lib/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface DestinationDiscoveryProps {
  destinationInfo: DestinationInfo;
}

export default function DestinationDiscovery({ destinationInfo }: DestinationDiscoveryProps) {
  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌍</span>
          <div>
            <h3 className="text-xl font-semibold text-white">{destinationInfo.name}</h3>
            {destinationInfo.country && (
              <p className="text-gray-400">{destinationInfo.country}</p>
            )}
          </div>
        </div>
        {destinationInfo.description && (
          <p className="text-gray-300">{destinationInfo.description}</p>
        )}
        {destinationInfo.bestTimeToVisit && (
          <div>
            <Badge variant="success">🗓️ Best Time: {destinationInfo.bestTimeToVisit}</Badge>
          </div>
        )}
      </Card>

      {(destinationInfo.localTips?.length ?? 0) > 0 && (
        <Card>
          <h3 className="font-semibold text-white mb-3">💡 Local Tips</h3>
          <ul className="space-y-2">
            {(destinationInfo.localTips || []).map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-300 flex items-start gap-2"
              >
                <span className="text-cyan-400 mt-0.5">●</span>
                {tip}
              </motion.li>
            ))}
          </ul>
        </Card>
      )}

      {(destinationInfo.recommendedPlaces?.length ?? 0) > 0 && (
        <Card>
          <h3 className="font-semibold text-white mb-3">📍 Recommended Places</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             {(destinationInfo.recommendedPlaces || []).map((place, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/[0.04] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <span className="text-white font-medium">{place}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}