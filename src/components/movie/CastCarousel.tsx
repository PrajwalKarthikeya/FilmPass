"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { ExtendedMovieDetails, TMDB_IMAGE_URL } from "@/lib/tmdb";

interface CastCarouselProps {
  movie: ExtendedMovieDetails;
}

export function CastCarousel({ movie }: CastCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Limit to top 15 cast members
  const cast = movie.credits?.cast?.slice(0, 15) || [];

  if (cast.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-6">
        Top Cast
      </h2>
      
      <div className="relative -mx-6 md:-mx-8 px-6 md:px-8">
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6"
        >
          {cast.map((actor) => (
            <Link 
              key={actor.id} 
              href="#" // Future actor page
              className="min-w-[140px] w-[140px] md:min-w-[160px] md:w-[160px] snap-start group"
            >
              <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-surface border border-white/5 mb-3">
                {actor.profile_path ? (
                  <Image
                    src={`${TMDB_IMAGE_URL}/w185${actor.profile_path}`}
                    alt={actor.name}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted">
                    <User className="w-8 h-8 mb-2 opacity-50" />
                  </div>
                )}
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <h4 className="font-medium text-sm text-white line-clamp-1 group-hover:text-accent transition-colors">
                {actor.name}
              </h4>
              <p className="text-xs text-secondary line-clamp-2 mt-0.5">
                {actor.character}
              </p>
            </Link>
          ))}
        </div>
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
