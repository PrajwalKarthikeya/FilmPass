"use client";

import { motion } from "framer-motion";
import { Passport } from "@/lib/mock-passports";
import { Download, Share2, User } from "lucide-react";
import Link from "next/link";

export function UnlockCelebration({ passport }: { passport: Passport }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
    >
      {/* Background Gold Light effect */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 2, opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute w-[50vh] h-[50vh] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: passport.color }}
      />
      
      <div className="relative z-10 max-w-lg w-full bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[2rem] p-8 md:p-12 text-center shadow-[0_0_100px_rgba(212,175,55,0.2)]">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, delay: 0.2 }}
          className="w-24 h-24 mx-auto bg-gradient-to-br from-[#D4AF37] to-yellow-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(212,175,55,0.5)]"
        >
          <svg className="w-12 h-12 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-2">Congratulations</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">You have completed the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white">{passport.title}</span></h2>
          <p className="text-gray-400 mb-10 text-sm leading-relaxed">
            Your cinematic journey through this collection is officially complete. The {passport.reward} has been unlocked for your profile.
          </p>
          
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white transition-colors">
              <Download className="w-4 h-4" />
              Download Certificate
            </button>
            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <Link href="/profile" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-white/10 transition-colors">
                <User className="w-4 h-4" />
                Profile
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
