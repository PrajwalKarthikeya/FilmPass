"use client";

import { useRef, useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { TMDBMovie, TMDB_IMAGE_URL } from "@/lib/tmdb";

interface TrendingProps {
  movies: TMDBMovie[];
}

export function Trending({ movies }: TrendingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Optional horizontal parallax effect based on vertical scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  // Mouse drag to scroll implementation
  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const xPos = e.pageX - scrollRef.current.offsetLeft;
    const walk = (xPos - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section ref={containerRef} aria-label="Trending Movies" className="py-32 overflow-hidden bg-[#0A0A0A]">
      <div className="max-w-[100vw]">
        <div className="px-6 md:px-16 mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4">Trending Now</h2>
          <p className="text-secondary max-w-2xl">The most popular movies among cinephiles today. Select any film to start crafting your unique ticket.</p>
        </div>

        <motion.div style={{ x }} className="w-full">
          <div 
            ref={scrollRef}
            className={`flex gap-6 md:gap-8 px-6 md:px-16 pb-12 overflow-x-auto snap-x snap-mandatory ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} hide-scrollbar`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
            role="list"
          >
            {movies.map((movie, idx) => {
              const year = movie.release_date ? movie.release_date.split("-")[0] : "";
              const posterUrl = movie.poster_path ? `${TMDB_IMAGE_URL}/w500${movie.poster_path}` : "";

              return (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group min-w-[260px] md:min-w-[320px] aspect-[2/3] rounded-xl overflow-hidden snap-start transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-white/10"
                  role="listitem"
                >
                  <Link 
                    href={`/movie/${movie.id}`}
                    className="absolute inset-0 w-full h-full text-left cursor-pointer" 
                    aria-label={`Select ${movie.title} to create a ticket`}
                    onClick={(e) => {
                      if (isDragging) e.preventDefault(); // Prevent click if dragging
                    }}
                  >
                    {/* Poster Image */}
                    {posterUrl && (
                      <Image
                        src={posterUrl}
                        alt={`${movie.title} poster`}
                        fill
                        sizes="(max-width: 768px) 260px, 320px"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    
                    {/* Gradient overlay to ensure text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-white/30 rounded-xl transition-all duration-300 pointer-events-none" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {year && (
                          <span className="text-sm font-medium text-white bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md">
                            {year}
                          </span>
                        )}
                        <div className="flex items-center gap-1.5 text-accent font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                          <Star className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true" />
                          <span className="text-sm" aria-label={`Rating: ${movie.vote_average.toFixed(1)}`}>
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-display font-medium text-white leading-tight line-clamp-2">
                        {movie.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
