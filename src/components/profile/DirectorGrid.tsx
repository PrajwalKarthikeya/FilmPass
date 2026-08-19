"use client";

import Image from "next/image";
import { mockFavoriteDirectors } from "@/lib/mock-profile";
import { Film } from "lucide-react";

export function DirectorGrid() {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h3 className="font-display text-3xl font-bold">Favorite Directors</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockFavoriteDirectors.map((director) => (
          <div key={director.id} className="glass-panel p-4 rounded-3xl border border-white/5 flex flex-col items-center group hover:border-[#D4AF37]/30 transition-colors">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative grayscale group-hover:grayscale-0 transition-all duration-500">
              <Image src={director.image} alt={director.name} fill className="object-cover" />
            </div>
            
            <h4 className="font-display font-bold text-xl mb-1 text-center">{director.name}</h4>
            <div className="flex items-center gap-1 text-xs text-[#D4AF37] font-mono mb-4">
              <Film className="w-3 h-3" />
              <span>{director.completed} / {director.total} Watched</span>
            </div>

            <div className="w-full bg-black/40 p-3 rounded-xl border border-white/5 text-center mt-auto">
              <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Favorite Film</p>
              <p className="font-medium text-sm text-gray-200">{director.favoriteFilm}</p>
            </div>
            
            {/* Minimal Progress Bar */}
            <div className="w-full h-1 bg-black/60 rounded-full mt-4 overflow-hidden">
              <div 
                className="h-full bg-[#D4AF37] rounded-full" 
                style={{ width: `${director.completionPercent}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
