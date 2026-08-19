"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export function AchievementGrid({ achievements }: { achievements?: any[] }) {
  if (!achievements || achievements.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-white/5 h-full flex flex-col items-center justify-center text-center">
        <Trophy className="w-8 h-8 text-gray-500 mb-4" />
        <p className="text-gray-400 text-sm">No achievements unlocked yet. Keep exploring!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {achievements.map((achievement, i) => {
        const Icon = achievement.icon || Trophy;
        return (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col justify-center gap-3 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-colors"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${achievement.color ? `bg-[${achievement.color}]/5` : 'bg-white/5'} rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${achievement.color ? `border-[${achievement.color}]/20 bg-[${achievement.color}]/10 text-[${achievement.color}]` : 'border-white/10 bg-white/5 text-gray-400'}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">{achievement.title}</h4>
              <p className="text-xs text-gray-400">{achievement.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
