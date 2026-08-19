"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Clock, Calendar, Ticket, Play, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExtendedMovieDetails, TMDB_IMAGE_URL } from "@/lib/tmdb";

interface HeroSectionProps {
  movie: ExtendedMovieDetails;
}

export function HeroSection({ movie }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const backdropUrl = movie.backdrop_path ? `${TMDB_IMAGE_URL}/original${movie.backdrop_path}` : "";
  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_URL}/w500${movie.poster_path}` : "";
  const year = movie.release_date ? movie.release_date.split("-")[0] : "";
  const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
  
  // Find official trailer
  const trailer = movie.videos?.results?.find(v => v.type === "Trailer" && v.site === "YouTube");

  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Parallax Backdrop */}
      {backdropUrl && (
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y, opacity }}
        >
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-40"
          />
          {/* Complex Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)] mix-blend-multiply" />
        </motion.div>
      )}

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center md:items-end gap-12 lg:gap-20">
        
        {/* Floating Poster */}
        <motion.div 
          initial={{ opacity: 0, y: 50, rotateY: 15 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="w-2/3 max-w-[300px] md:w-1/3 md:max-w-[400px] shrink-0 group perspective-1000"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 glass-panel"
          >
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                priority
                sizes="(max-width: 768px) 66vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                <span className="text-muted">No Poster</span>
              </div>
            )}
            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Metadata & Actions */}
        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4 text-sm font-medium"
          >
            {year && (
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 text-white">
                {year}
              </span>
            )}
            {movie.runtime > 0 && (
              <span className="flex items-center gap-1.5 text-secondary">
                <Clock className="w-4 h-4" />
                {runtime}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-accent bg-accent/10 px-3 py-1 rounded-full">
              <Star className="w-4 h-4" fill="currentColor" />
              {movie.vote_average.toFixed(1)}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-medium text-white mb-6 leading-tight drop-shadow-2xl"
          >
            {movie.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-8"
          >
            {movie.genres.map(genre => (
              <span key={genre.id} className="text-sm text-secondary uppercase tracking-wider border border-white/10 px-3 py-1 rounded-sm">
                {genre.name}
              </span>
            ))}
          </motion.div>

          {movie.tagline && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-accent font-display italic mb-6"
            >
              "{movie.tagline}"
            </motion.p>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4"
          >
            <Link href="#screening-planner" passHref>
              <Button size="lg" className="w-full sm:w-auto bg-accent text-background hover:bg-white gap-2 font-display uppercase tracking-wider text-sm px-8 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <Ticket className="w-5 h-5" />
                Generate Ticket
              </Button>
            </Link>
            
            {trailer && (
              <Button size="lg" variant="glass" className="w-full sm:w-auto gap-2">
                <Play className="w-5 h-5" />
                Watch Trailer
              </Button>
            )}
            
            <Button size="lg" variant="ghost" className="w-full sm:w-auto gap-2 text-secondary hover:text-white">
              <BookmarkPlus className="w-5 h-5" />
              <span className="sm:hidden">Add to Collection</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
