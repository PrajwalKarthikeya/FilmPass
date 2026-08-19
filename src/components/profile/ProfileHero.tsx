"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import Image from "next/image";

export function ProfileHero({ profile }: { profile?: any }) {
  const isZeroState = !profile || profile.xp === 0;

  return (
    <div className="relative mb-8 rounded-[2rem] overflow-hidden bg-black border border-white/10 h-[500px] flex flex-col justify-end">
      {/* Background Collages / Images */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        <Image 
          src={profile?.banner_url || "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=2000"} 
          alt="Cinematic Banner" 
          fill 
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-20 p-8 md:p-12 flex flex-col md:flex-row items-end gap-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black overflow-hidden relative shadow-2xl shrink-0 bg-[#111]"
        >
          {profile?.avatar_url || profile?.avatar ? (
            <Image src={profile.avatar_url || profile.avatar} alt="Avatar" fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-500" />
            </div>
          )}
        </motion.div>

        <div className="flex-1 pb-2">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-2"
          >
            {profile?.display_name || profile?.name || "Anonymous Cinephile"}
          </motion.h1>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 text-sm font-mono text-gray-400"
          >
            <span className="text-[#D4AF37]">@{profile?.username || "user"}</span>
            <span>•</span>
            <span>{profile?.country || "Earth"}</span>
            <span>•</span>
            <span>Joined {profile?.created_at ? new Date(profile.created_at).getFullYear() : '2024'}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
