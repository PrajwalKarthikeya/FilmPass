"use client";

import { motion } from "framer-motion";
import { MovieCard } from "@/components/search/MovieCard";

export function NowShowingCarousel({ movies, colorAccent }: { movies: any[], colorAccent: string }) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative w-full -mx-4 md:-mx-8 lg:-mx-12 px-4 md:px-8 lg:px-12 pb-12 overflow-x-auto no-scrollbar scroll-smooth">
      <div className="flex gap-6 md:gap-8 w-max">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="w-[280px] md:w-[320px] shrink-0"
          >
            <div className="relative group">
              {/* Cinematic Backlight Glow for each poster */}
              <div 
                className="absolute -inset-4 opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: colorAccent }}
              />
              <MovieCard movie={movie} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
