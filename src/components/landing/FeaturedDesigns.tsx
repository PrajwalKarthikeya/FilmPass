"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TMDBMovieDetails, TMDB_IMAGE_URL } from "@/lib/tmdb";

const ticketStyles = [
  { id: "modern", name: "Modern IMAX", theme: "from-blue-900 to-black border-blue-500/30", rotate: -2 },
  { id: "vintage", name: "Vintage", theme: "from-[#2A2418] to-black border-[#E5B869]/30", rotate: 2 },
  { id: "minimal", name: "Minimalist", theme: "from-zinc-900 to-black border-white/10", rotate: -1 },
];

interface FeaturedDesignsProps {
  movies: TMDBMovieDetails[];
}

export function FeaturedDesigns({ movies }: FeaturedDesignsProps) {
  // Use the first available movie for the featured design preview
  const movie = movies && movies.length > 0 ? movies[0] : null;
  const posterUrl = movie?.poster_path ? `${TMDB_IMAGE_URL}/w500${movie.poster_path}` : "";

  return (
    <section aria-labelledby="featured-designs-heading" className="py-32 bg-[#0A0A0A] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-24">
          <div className="mb-8 md:mb-0">
            <h2 id="featured-designs-heading" className="text-3xl md:text-4xl font-display font-medium text-white mb-4">Meticulously Crafted</h2>
            <p className="text-secondary max-w-lg">Every ticket is procedurally generated with high-resolution textures, dynamic lighting, and cinematic typography.</p>
          </div>
        </div>

        <div className="relative flex justify-center items-center min-h-[500px]">
          {ticketStyles.map((style, idx) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 100, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: style.rotate }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.2, type: "spring" }}
              className={`absolute w-full max-w-xs md:max-w-sm aspect-[1/2] rounded-2xl bg-gradient-to-br ${style.theme} border shadow-2xl overflow-hidden p-6 flex flex-col`}
              style={{ zIndex: ticketStyles.length - idx }}
            >
              <div className="relative h-48 w-full rounded-lg mb-6 shadow-inner overflow-hidden">
                {posterUrl ? (
                  <Image
                    src={posterUrl}
                    alt={movie?.title || "Movie poster"}
                    fill
                    sizes="(max-width: 768px) 320px, 400px"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5" />
                )}
              </div>
              
              <div className="flex-1 border-t border-dashed border-white/20 pt-6">
                <h3 className="text-2xl font-display font-semibold text-white uppercase leading-tight mb-2 line-clamp-2">
                  {movie?.title || "Cinematic Masterpiece"}
                </h3>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Date</p>
                    <p className="text-sm font-medium text-white">Oct 24, 2026</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Time</p>
                    <p className="text-sm font-medium text-white">19:30</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Screen</p>
                    <p className="text-sm font-medium text-white">IMAX 01</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Seat</p>
                    <p className="text-sm font-medium text-white text-accent">K-12</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-6 flex justify-between items-end border-t border-white/10">
                <span className="text-xs font-display text-white/40 tracking-widest">{style.name}</span>
                {/* Mock Barcode */}
                <div className="w-32 h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmZiIiB4PSIwIi8+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZmIiIHg9IjMiLz48cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmYiIgeD0iNiIvPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmZiIiB4PSIxMiIvPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmZiIiB4PSIxNSIvPjxyZWN0IHdpZHRoPSIzIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmZiIiB4PSIxNyIvPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmZiIiB4PSIyMiIvPjxyZWN0IHdpZHRoPSI1IiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmZiIiB4PSIyNiIvPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmZiIiB4PSIzMiIvPjwvc3ZnPg==')] opacity-50 bg-repeat-x" aria-hidden="true" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
