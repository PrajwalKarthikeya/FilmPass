"use client";

import { motion } from "framer-motion";

export function SkeletonGrid({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 w-full" aria-label="Loading movies">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="w-full flex flex-col gap-3"
        >
          <div className="w-full aspect-[2/3] rounded-xl bg-surface border border-white/5 animate-pulse overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full animate-shimmer" />
          </div>
          <div className="space-y-2 px-1">
            <div className="h-4 w-3/4 bg-surface rounded animate-pulse" />
            <div className="h-3 w-1/4 bg-surface rounded animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
