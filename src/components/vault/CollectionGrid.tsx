"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Folder } from "lucide-react";

export function CollectionGrid({ collections }: { collections: any[] }) {
  if (!collections || collections.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
        <Folder className="w-8 h-8 text-gray-500 mb-4" />
        <h3 className="font-display text-xl font-bold mb-2">No Collections Yet</h3>
        <p className="text-gray-400 text-sm">Create curated lists of your favorite films to display here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {collections.map((collection, i) => (
        <motion.div 
          key={collection.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="group cursor-pointer"
        >
          <div className="aspect-[4/3] rounded-2xl overflow-hidden relative mb-4 border border-white/10 shadow-lg">
            <Image 
              src={collection.cover_url || collection.coverImage || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"}
              alt={collection.name || "Collection cover"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white border border-white/10">
              {collection.movieCount || 0} Films
            </div>
          </div>
          <h4 className="font-display font-bold text-lg mb-1">{collection.name}</h4>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">{collection.is_public ? 'Public' : 'Private'} Collection</p>
        </motion.div>
      ))}
    </div>
  );
}
