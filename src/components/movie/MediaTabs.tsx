"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ExtendedMovieDetails, TMDB_IMAGE_URL } from "@/lib/tmdb";

interface MediaTabsProps {
  movie: ExtendedMovieDetails;
}

export function MediaTabs({ movie }: MediaTabsProps) {
  const [activeTab, setActiveTab] = useState<"trailers" | "backdrops" | "posters">("trailers");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const trailers = movie.videos?.results?.filter(v => v.site === "YouTube").slice(0, 10) || [];
  const backdrops = movie.images?.backdrops?.slice(0, 10) || [];
  const posters = movie.images?.posters?.slice(0, 10) || [];

  const tabs = [
    { id: "trailers", label: `Trailers & Videos (${trailers.length})`, count: trailers.length },
    { id: "backdrops", label: `Backdrops (${backdrops.length})`, count: backdrops.length },
    { id: "posters", label: `Posters (${posters.length})`, count: posters.length },
  ];

  if (trailers.length === 0 && backdrops.length === 0 && posters.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      <div className="flex items-center gap-6 border-b border-white/10 mb-6 overflow-x-auto hide-scrollbar pb-1">
        {tabs.map((tab) => {
          if (tab.count === 0) return null;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative pb-3 text-sm font-medium transition-colors whitespace-nowrap ${
                isActive ? "text-white" : "text-secondary hover:text-white"
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="activeMediaTab"
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-accent"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeTab === "trailers" && (
            <motion.div
              key="trailers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {trailers.map((video) => (
                <div key={video.id} className="group cursor-pointer" onClick={() => setActiveVideo(video.key)}>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-surface mb-3 border border-white/5">
                    <Image
                      src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      alt={video.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-accent/90 text-background flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-5 h-5 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-white line-clamp-1 group-hover:text-accent transition-colors">
                    {video.name}
                  </h4>
                  <p className="text-xs text-muted">{video.type}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "backdrops" && (
            <motion.div
              key="backdrops"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {backdrops.map((img, idx) => (
                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden bg-surface border border-white/5">
                  <Image
                    src={`${TMDB_IMAGE_URL}/w780${img.file_path}`}
                    alt="Backdrop"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "posters" && (
            <motion.div
              key="posters"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {posters.map((img, idx) => (
                <div key={idx} className="relative aspect-[2/3] rounded-xl overflow-hidden bg-surface border border-white/5">
                  <Image
                    src={`${TMDB_IMAGE_URL}/w500${img.file_path}`}
                    alt="Poster"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <div className="absolute inset-0" onClick={() => setActiveVideo(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 z-10"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
