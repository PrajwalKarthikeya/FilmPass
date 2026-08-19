"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { TMDBMovie } from "@/lib/tmdb";
import { MovieCard } from "./MovieCard";

interface DiscoverSectionProps {
  title: string;
  movies: TMDBMovie[];
}

export function DiscoverSection({ title, movies }: DiscoverSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!movies || movies.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-medium text-white">{title}</h2>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div className="relative -mx-6 md:-mx-8 px-6 md:px-8">
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6"
          role="list"
        >
          {movies.map((movie, idx) => (
            <div key={movie.id} className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px] snap-start" role="listitem">
              <MovieCard movie={movie} index={idx} />
            </div>
          ))}
        </div>
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
