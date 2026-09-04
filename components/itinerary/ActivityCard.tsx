// components/itinerary/ActivityCard.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActivityItem } from '@/lib/types';
import Badge from '@/components/ui/Badge';

interface ActivityCardProps {
  activity: ActivityItem;
  onEdit: (activity: ActivityItem) => void;
  onDelete: (activity: ActivityItem) => void;
  onRegenerate: (activity: ActivityItem) => void;
  currency: string;
  isRegenerating?: boolean;
}

export default function ActivityCard({ 
  activity, 
  onEdit, 
  onDelete, 
  onRegenerate, 
  currency,
  isRegenerating = false 
}: ActivityCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...activity });

  const handleSave = () => {
    onEdit(editForm);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white/[0.04] rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all group"
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            className="w-full bg-white/[0.08] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
          />
          <input
            value={editForm.time}
            onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
            className="w-full bg-white/[0.08] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
            placeholder="Time (e.g., 09:00)"
          />
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            className="w-full bg-white/[0.08] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
            rows={2}
          />
          <input
            value={editForm.location}
            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
            className="w-full bg-white/[0.08] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
            placeholder="Location"
          />
          <div className="flex gap-2">
            <input
              value={editForm.cost}
              onChange={(e) => setEditForm({ ...editForm, cost: parseInt(e.target.value) || 0 })}
              type="number"
              className="w-1/3 bg-white/[0.08] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
              placeholder="Cost"
            />
            <input
              value={editForm.duration}
              onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
              className="w-1/3 bg-white/[0.08] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
              placeholder="Duration"
            />
            <button
              onClick={handleSave}
              className="w-1/3 bg-violet-500 text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-violet-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3 flex-1">
              <div className="text-lg font-mono text-cyan-400 mt-0.5 whitespace-nowrap">
                {activity.time}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">{activity.title}</h4>
                {activity.description && (
                  <p className="text-sm text-gray-400 mt-1">{activity.description}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {activity.location && (
                    <Badge variant="info">📍 {activity.location}</Badge>
                  )}
                  {(activity.cost ?? 0) > 0 && (
                    <Badge variant="default">💰 {currency} {activity.cost}</Badge>
                  )}
                  {activity.duration && (
                    <Badge variant="warning">⏱️ {activity.duration}</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(activity)}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              🗑️ Remove
            </button>
            <button
              onClick={() => onRegenerate(activity)}
              disabled={isRegenerating}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors disabled:opacity-50"
            >
              {isRegenerating ? '🔄 Regenerating...' : '✨ Regenerate'}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}