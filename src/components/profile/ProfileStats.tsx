"use client";

import { motion } from "framer-motion";

export function ProfileStats({ stats }: { stats?: any }) {
  const displayStats = [
    { label: "Movies Logged", value: stats?.movies_collected || 0 },
    { label: "Unique Directors", value: stats?.directors_completed || 0 },
    { label: "Passports Earned", value: stats?.passports_earned || 0 },
    { label: "Hours Watched", value: Math.floor((stats?.total_runtime_minutes || 0) / 60) },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      {displayStats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
          className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center hover:border-white/20 transition-colors"
        >
          <h4 className="font-display text-4xl font-bold mb-2">{stat.value}</h4>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
