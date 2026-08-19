"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TMDBMovie, TMDB_IMAGE_URL, getGenres } from "@/lib/tmdb";

interface MovieCardProps {
  movie: TMDBMovie;
  index?: number;
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const year = movie.release_date ? movie.release_date.split("-")[0] : "";
  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_URL}/w500${movie.poster_path}` : "";
  const genres = getGenres(movie.genre_ids || []).slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
      className="group relative h-full flex flex-col"
    >
      <Link href={`/movie/${movie.id}`} className="block relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-surface border border-white/5 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-accent/20 group-hover:-translate-y-2 group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:outline-none">
        
        {/* Poster Image */}
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-muted p-4 text-center text-sm font-medium">
            No Poster
          </div>
        )}

        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] ease-in-out" />
        
        {/* Dark Overlay for Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Glow Ring */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-accent/30 transition-colors duration-300 pointer-events-none" />

        {/* Hover Info Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            {year && (
              <span className="text-xs font-medium text-white bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-sm">
                {year}
              </span>
            )}
            <div className="flex items-center gap-1 text-accent bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-sm">
              <Star className="w-3 h-3" fill="currentColor" />
              <span className="text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mt-1">
            {genres.map(g => (
              <span key={g} className="text-[10px] uppercase tracking-wider text-white/70 border border-white/20 px-1.5 py-0.5 rounded-sm">
                {g}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="mt-3 px-1">
        <h3 className="font-display font-medium text-sm md:text-base text-white line-clamp-1 group-hover:text-accent transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-muted mt-0.5">{year}</p>
      </div>
    </motion.div>
  );
}
