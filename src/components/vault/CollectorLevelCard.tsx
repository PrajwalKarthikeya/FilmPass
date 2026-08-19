"use client";

import { motion } from "framer-motion";
import { Sparkles, Trophy } from "lucide-react";

export function CollectorLevelCard({ profile, stats }: { profile: any, stats: any }) {
  // Simple logic to calculate next rank XP goal based on current XP
  const xp = profile.xp || 0;
  let nextRankXp = 1000;
  if (xp >= 1000) nextRankXp = 5000;
  if (xp >= 5000) nextRankXp = 20000;
  
  const progressPercent = Math.min((xp / nextRankXp) * 100, 100);

  return (
    <div className="glass-panel p-8 rounded-3xl border border-accent/20 relative overflow-hidden h-full flex flex-col justify-center bg-gradient-to-br from-[#D4AF37]/5 to-transparent">
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
            <Trophy className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-mono mb-1">Collector Level</p>
            <h3 className="font-display font-bold text-xl text-[#D4AF37]">{profile.collector_level || "Cinema Newcomer"}</h3>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-bold">{xp}</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Total XP</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-2 font-mono">
          <span>Progress to Next Rank</span>
          <span>{xp} / {nextRankXp} XP</span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37] rounded-full relative"
          >
            <div className="absolute inset-0 bg-white/20 blur-sm" />
          </motion.div>
        </div>
      </div>
      
    </div>
  );
}
