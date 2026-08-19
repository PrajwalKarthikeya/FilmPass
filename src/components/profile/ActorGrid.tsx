"use client";

import Image from "next/image";
import { mockFavoriteActors } from "@/lib/mock-profile";

export function ActorGrid() {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h3 className="font-display text-3xl font-bold">Favorite Actors</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mockFavoriteActors.map((actor) => (
          <div key={actor.id} className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
            <Image 
              src={actor.image} 
              alt={actor.name} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-center md:text-left">
              <h4 className="font-display font-bold text-xl md:text-2xl mb-1">{actor.name}</h4>
              <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono mb-3">
                {actor.watched} Films
              </p>
              
              <div className="w-full bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-[9px] uppercase tracking-widest text-gray-300 mb-1">Favorite Performance</p>
                <p className="font-medium text-xs text-white leading-tight">{actor.favoritePerformance}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
