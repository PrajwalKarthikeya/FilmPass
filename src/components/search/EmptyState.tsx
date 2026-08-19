"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  query?: string;
  onClear?: () => void;
}

export function EmptyState({ query, onClear }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-32 text-center px-4"
    >
      <div className="w-24 h-24 rounded-full bg-surface border border-white/5 flex items-center justify-center mb-6 shadow-inner">
        <SearchX className="w-10 h-10 text-muted" />
      </div>
      
      <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-3">
        No results found
      </h3>
      
      <p className="text-secondary max-w-md mx-auto mb-8">
        {query 
          ? `We couldn't find any cinematic matches for "${query}". Try adjusting your search or exploring our curated collections.`
          : "We couldn't find any movies matching your current filters. Try removing some filters to see more results."}
      </p>
      
      {onClear && (
        <Button onClick={onClear} variant="glass" size="lg">
          Clear Search
        </Button>
      )}
    </motion.div>
  );
}
