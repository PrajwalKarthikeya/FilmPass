"use client";

import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProgressRing } from "@/components/passports/ProgressRing";

export function PassportSummary() {
  return (
    <div className="mb-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h3 className="font-display text-3xl font-bold">Cinema Passport</h3>
          <p className="text-gray-400 text-sm mt-1">Journey through world cinema.</p>
        </div>
        <Link href="/passports" className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors flex items-center gap-2">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Main Stats Card */}
        <div className="glass-panel p-8 rounded-3xl border border-[#D4AF37]/20 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <BookOpen className="w-24 h-24 text-[#D4AF37]" />
          </div>
          <div>
            <h4 className="font-display font-bold text-5xl mb-2 text-white">4</h4>
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono mb-8">Passports Earned</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Movies</p>
              <p className="font-bold text-xl">118</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Countries</p>
              <p className="font-bold text-xl">12</p>
            </div>
          </div>
        </div>

        {/* Current Focus Card */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center hover:border-white/20 transition-colors">
          <ProgressRing progress={12} total={25} size={100} strokeWidth={6} className="mb-6" />
          <h4 className="font-display font-bold text-xl mb-1">World Cinema Explorer</h4>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-mono mb-4">Current Focus</p>
          <button className="px-6 py-2 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors text-xs font-bold uppercase tracking-widest">
            Continue
          </button>
        </div>

        {/* Recently Unlocked Card */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-white/20 transition-colors">
          <div>
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4">
              <span className="text-[#D4AF37]">✨</span>
            </div>
            <h4 className="font-display font-bold text-xl mb-1">Sci-Fi Passport</h4>
            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono mb-4">Recently Unlocked</p>
          </div>
          
          <div className="w-full bg-black/40 p-4 rounded-xl border border-white/5">
            <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Reward Claimed</p>
            <p className="font-medium text-sm text-gray-200">Cybernetic Theme</p>
          </div>
        </div>

      </div>
    </div>
  );
}
