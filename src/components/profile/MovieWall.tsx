"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { mockFavoriteMovies } from "@/lib/mock-profile";

export function MovieWall() {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h3 className="font-display text-3xl font-bold">All-Time Favorites</h3>
        <p className="text-gray-400 text-sm mt-1">The 12 defining films of this profile.</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mockFavoriteMovies.map((movie, i) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/5"
          >
            <Image 
              src={movie.poster} 
              alt={movie.title} 
              fill 
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              loading={i > 5 ? "lazy" : "eager"}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
              <h4 className="font-display font-bold text-sm leading-tight text-white">{movie.title}</h4>
              <p className="text-[10px] text-[#D4AF37] font-mono mt-1">{movie.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
