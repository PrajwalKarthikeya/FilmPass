"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import Image from "next/image";
import type { Profile } from "@/types/database";

export function ProfileHero({ profile }: { profile: any }) {
  const joinDate = profile.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown';

  return (
    <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden h-full flex flex-col justify-center">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 flex items-center gap-8">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 shrink-0 shadow-2xl"
        >
          {profile.avatar_url || profile.avatar ? (
            <Image 
              src={profile.avatar_url || profile.avatar} 
              alt="Avatar" 
              fill 
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-500" />
            </div>
          )}
        </motion.div>
        
        <div className="flex-1">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs font-mono uppercase tracking-widest text-gray-400 mb-3 border border-white/5">
              <span>Member Since {joinDate}</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2 tracking-tight">
              {profile.display_name || profile.name}
            </h1>
            <p className="text-gray-400 font-mono text-sm">@{profile.username || "user"}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
