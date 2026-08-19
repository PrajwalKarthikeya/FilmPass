"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, Clock, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TMDBMovieDetails, TMDB_IMAGE_URL } from "@/lib/tmdb";

interface HeroProps {
  movies: TMDBMovieDetails[];
}

export function Hero({ movies }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [movies]);

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (!movies || movies.length === 0) return null;

  const movie = movies[currentIndex];
  const year = movie.release_date ? movie.release_date.split("-")[0] : "";
  const backdropUrl = movie.backdrop_path ? `${TMDB_IMAGE_URL}/original${movie.backdrop_path}` : "";

  return (
    <section aria-label="Featured Movies" className="relative w-full h-[100svh] overflow-hidden bg-black flex items-center">
      {/* Backdrop with crossfade and next/image for optimization */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {backdropUrl && (
            <Image
              src={backdropUrl}
              alt={`${movie.title} backdrop`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          )}
          {/* Complex gradient for perfect text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent w-full md:w-2/3" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl space-y-6"
          >
            {/* Metadata tags */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-secondary">
              <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full border border-white/10" aria-label={`Rating: ${movie.vote_average.toFixed(1)} out of 10`}>
                <Star className="w-4 h-4 text-accent" fill="currentColor" aria-hidden="true" />
                <span className="text-white">{movie.vote_average.toFixed(1)}</span>
              </div>
              {year && (
                <div className="flex items-center gap-1.5" aria-label={`Release Year: ${year}`}>
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>{year}</span>
                </div>
              )}
              {movie.runtime > 0 && (
                <div className="flex items-center gap-1.5" aria-label={`Runtime: ${movie.runtime} minutes`}>
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>{movie.runtime} min</span>
                </div>
              )}
              {movie.genres && movie.genres.length > 0 && (
                <div className="hidden md:flex items-center gap-2 border-l border-white/20 pl-4" aria-label="Genres">
                  {movie.genres.slice(0, 3).map((g) => (
                    <span key={g.id} className="uppercase tracking-wider text-xs">{g.name}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-display font-semibold uppercase tracking-tight text-white drop-shadow-lg leading-[0.95] line-clamp-3">
              {movie.title}
            </h1>

            {/* Overview */}
            <p className="text-secondary text-base md:text-xl max-w-2xl leading-relaxed line-clamp-3">
              {movie.overview}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <Button size="lg" className="w-full sm:w-auto gap-2 group" aria-label={`Generate Ticket for ${movie.title}`}>
                Generate Ticket
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
              <Link href={`/movie/${movie.id}`} passHref>
                <Button variant="glass" size="lg" className="w-full sm:w-auto" aria-label={`Explore ${movie.title}`}>
                  Explore Movie
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
