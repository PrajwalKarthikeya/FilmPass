"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Clock, Star, CheckCircle, Ticket } from "lucide-react";
import { PassportMovie } from "@/lib/mock-passports";
import { ImmigrationStamp } from "./ImmigrationStamp";

export function MovieChecklist({ movies }: { movies: PassportMovie[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "remaining">("all");

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          movie.director.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "completed") return matchesSearch && movie.isCompleted;
    if (filter === "remaining") return matchesSearch && !movie.isCompleted;
    return matchesSearch;
  });

  return (
    <div className="w-full flex flex-col h-full bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Sticky Header with Search and Filters */}
      <div className="sticky top-0 z-30 p-6 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <h3 className="font-display text-2xl font-bold mb-6">Cinematic Journey</h3>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search passport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>All</FilterPill>
            <FilterPill active={filter === "completed"} onClick={() => setFilter("completed")}>Completed</FilterPill>
            <FilterPill active={filter === "remaining"} onClick={() => setFilter("remaining")}>Remaining</FilterPill>
          </div>
        </div>
      </div>

      {/* Movie List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
        {filteredMovies.map((movie, index) => (
          <div 
            key={index} 
            className={`relative flex flex-col md:flex-row gap-6 p-4 md:p-6 rounded-2xl border transition-all duration-300 ${
              movie.isCompleted 
                ? "bg-white/5 border-white/10" 
                : "bg-transparent border-white/5 opacity-70 hover:opacity-100 hover:bg-white/5"
            }`}
          >
            {/* Poster */}
            <div className="relative w-24 h-36 md:w-32 md:h-48 shrink-0 rounded-xl overflow-hidden shadow-lg">
              <Image 
                src={movie.posterUrl} 
                alt={movie.title} 
                fill 
                className={`object-cover ${!movie.isCompleted && "grayscale opacity-80"}`} 
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 flex flex-col justify-between py-2 z-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-display text-xl md:text-2xl font-bold tracking-tight">{movie.title}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-white/20 text-gray-400">
                    {movie.year}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">Directed by {movie.director}</p>
                
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-6 md:mb-0">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {movie.runtime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#D4AF37]" /> {movie.rating.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* Action / Status */}
              <div>
                {movie.isCompleted ? (
                  <div className="flex items-center gap-2 text-green-500 font-mono text-xs uppercase tracking-widest">
                    <CheckCircle className="w-4 h-4" /> Completed
                  </div>
                ) : (
                  <Link 
                    href={`/search`} // In real app, route to specific movie if ID is known
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-colors"
                  >
                    <Ticket className="w-4 h-4" />
                    Generate Ticket
                  </Link>
                )}
              </div>
            </div>

            {/* Immigration Stamp Overlay for completed movies */}
            {movie.isCompleted && (
              <ImmigrationStamp movie={movie} index={index} />
            )}
          </div>
        ))}

        {filteredMovies.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-mono text-sm uppercase tracking-widest">
            No movies found.
          </div>
        )}
      </div>
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-colors ${
        active ? "bg-[#D4AF37] text-black font-bold" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
