"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, PlayCircle, Clock, Calendar } from "lucide-react";
import { Passport } from "@/lib/mock-passports";
import { PassportVisual } from "@/components/passports/PassportVisual";
import { MovieChecklist } from "@/components/passports/MovieChecklist";
import { UnlockCelebration } from "@/components/passports/UnlockCelebration";

export function PassportDetailClient({ passport }: { passport: Passport }) {
  const isCompleted = passport.progress === passport.total;
  const percentage = Math.round((passport.progress / passport.total) * 100);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
      
      {/* Navigation Back */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Link href="/passports" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-mono">
          <ArrowLeft className="w-4 h-4" />
          Back to Collections
        </Link>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Column: The Passport Visual */}
        <div className="w-full lg:w-[450px] shrink-0">
          <div className="sticky top-32">
            <PassportVisual passport={passport} />
            
            {/* Quick Stats Box under Passport */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">Passport Details</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-sm">Difficulty</span>
                  <span className={`text-sm font-bold ${
                    passport.difficulty === 'Master' ? 'text-purple-400' :
                    passport.difficulty === 'Hard' ? 'text-red-400' :
                    passport.difficulty === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                  }`}>{passport.difficulty}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-sm">Collector Reward</span>
                  <span className="text-sm font-bold text-[#D4AF37] text-right">{passport.reward}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Status</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-white">{passport.status.replace('-', ' ')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Information & Checklist */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Header Info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-4">{passport.title}</h1>
            <p className="text-xl text-gray-400 font-light max-w-3xl mb-12">{passport.description}</p>
            
            {/* Progress Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex items-center gap-6 shadow-xl">
                {/* Circular Progress */}
                <div className="relative w-16 h-16 shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" 
                            strokeDasharray="175" strokeDashoffset={175 - (175 * percentage) / 100}
                            className="text-[#D4AF37] transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">
                    {percentage}%
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold">{passport.progress}<span className="text-gray-500 text-lg">/{passport.total}</span></div>
                  <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Movies Completed</div>
                </div>
              </div>
              
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col justify-center shadow-xl">
                <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-2xl font-display font-bold">{passport.estimatedRuntimeRemaining}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Estimated Runtime</div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col justify-center shadow-xl relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="flex items-center gap-2 mb-2 text-[#4A90E2]">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <div className="text-xl font-display font-bold line-clamp-1">{passport.suggestedNextMovie}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Suggested Next Watch</div>
              </div>
            </div>
          </motion.div>

          {/* Checklist */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex-1"
          >
            {passport.requiredMovies && passport.requiredMovies.length > 0 ? (
              <MovieChecklist movies={passport.requiredMovies} />
            ) : (
              <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-display font-bold mb-2">Checklist Generating...</h3>
                <p className="text-gray-400">This passport's movie list is currently being indexed by the FilmPass engine.</p>
              </div>
            )}
          </motion.div>

        </div>
      </div>

      {isCompleted && <UnlockCelebration passport={passport} />}
    </div>
  );
}
