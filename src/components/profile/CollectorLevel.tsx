"use client";

import { motion } from "framer-motion";
import { mockUserProfile } from "@/lib/mock-profile";
import { Trophy } from "lucide-react";

export function CollectorLevel() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full glass-panel rounded-3xl p-8 border border-[#D4AF37]/20 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 mb-8"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-transparent opacity-50" />
      
      <div className="w-20 h-20 rounded-full bg-[#1A1A1A] border-2 border-[#D4AF37] flex flex-col items-center justify-center shrink-0 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
        <Trophy className="w-8 h-8 text-[#D4AF37] mb-1" />
        <span className="text-[10px] uppercase font-bold text-[#D4AF37] font-mono leading-none">LVL 42</span>
      </div>
      
      <div className="flex-1 w-full text-center md:text-left relative z-10">
        <div className="flex flex-col md:flex-row justify-between mb-4 gap-2 md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Current Rank</p>
            <h2 className="font-display text-3xl font-bold text-white">{mockUserProfile.rank}</h2>
          </div>
          <div className="text-right">
            <h2 className="font-display text-3xl font-bold text-[#D4AF37]">{mockUserProfile.xp.toLocaleString()}</h2>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Total XP</p>
          </div>
        </div>
        
        <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden border border-white/10 relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${mockUserProfile.progressToNext}%` }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#AA7700] to-[#D4AF37] rounded-full relative overflow-hidden"
          >
            {/* Animated shimmer effect on the bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
          </motion.div>
        </div>
        <div className="flex justify-between text-[10px] uppercase tracking-widest mt-3 text-gray-500 font-bold">
          <span>{mockUserProfile.progressToNext}% to {mockUserProfile.nextMilestone}</span>
          <span>15,000 XP Goal</span>
        </div>
      </div>
    </motion.div>
  );
}
