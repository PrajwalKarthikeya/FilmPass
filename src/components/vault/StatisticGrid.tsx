"use client";

import { motion } from "framer-motion";

export function StatisticGrid({ stats }: { stats: any }) {
  const displayStats = [
    { label: "Movies Collected", value: stats?.movies_collected || 0, suffix: "" },
    { label: "Tickets Generated", value: stats?.tickets_generated || 0, suffix: "" },
    { label: "Passports Earned", value: stats?.passports_earned || 0, suffix: "" },
    { label: "Total Runtime", value: Math.floor((stats?.total_runtime_minutes || 0) / 60), suffix: "H" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      {displayStats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center hover:border-white/10 transition-colors"
        >
          <div className="flex items-baseline gap-1 mb-2">
            <h4 className="font-display text-4xl font-bold">{stat.value}</h4>
            {stat.suffix && <span className="font-display text-xl text-gray-500 font-bold">{stat.suffix}</span>}
          </div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
