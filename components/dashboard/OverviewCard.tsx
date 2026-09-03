// components/dashboard/OverviewCard.tsx
'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

interface OverviewCardProps {
  label: string;
  value: string;
  icon: string;
}

export default function OverviewCard({ label, value, icon }: OverviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="text-center" hover>
        <div className="text-3xl mb-2">{icon}</div>
        <div className="text-lg font-bold text-white">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
      </Card>
    </motion.div>
  );
}