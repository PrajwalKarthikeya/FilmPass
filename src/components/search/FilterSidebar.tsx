"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Highest Rated", value: "vote_average.desc" },
  { label: "Newest Releases", value: "primary_release_date.desc" },
  { label: "Alphabetical", value: "original_title.asc" },
];

const GENRE_OPTIONS = [
  { label: "Action", value: "28" },
  { label: "Adventure", value: "12" },
  { label: "Animation", value: "16" },
  { label: "Comedy", value: "35" },
  { label: "Crime", value: "80" },
  { label: "Documentary", value: "99" },
  { label: "Drama", value: "18" },
  { label: "Fantasy", value: "14" },
  { label: "Horror", value: "27" },
  { label: "Sci-Fi", value: "878" },
  { label: "Thriller", value: "53" },
];

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "popularity.desc";
  const currentGenre = searchParams.get("genre");
  const currentYear = searchParams.get("year");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      // Reset page when filters change
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (key: string, value: string) => {
    // If clicking the active filter, toggle it off
    const newValue = searchParams.get(key) === value ? "" : value;
    router.push(`/search?${createQueryString(key, newValue)}`, { scroll: false });
  };

  const handleClearAll = () => {
    router.push("/search", { scroll: false });
  };

  const hasFilters = currentSort !== "popularity.desc" || currentGenre || currentYear;

  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-medium text-white flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h2>
        {hasFilters && (
          <button 
            onClick={handleClearAll}
            className="text-xs font-medium text-accent hover:text-white transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Sort By */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted uppercase tracking-wider">Sort By</h3>
        <div className="flex flex-col gap-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange("sort", option.value)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-all ${
                currentSort === option.value
                  ? "bg-white/10 text-white font-medium"
                  : "text-secondary hover:bg-white/5 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Genres */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted uppercase tracking-wider">Genres</h3>
        <div className="flex flex-wrap gap-2">
          {GENRE_OPTIONS.map((genre) => (
            <button
              key={genre.value}
              onClick={() => handleFilterChange("genre", genre.value)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                currentGenre === genre.value
                  ? "border-accent bg-accent/10 text-accent font-medium"
                  : "border-white/10 text-secondary hover:border-white/30 hover:text-white"
              }`}
            >
              {genre.label}
            </button>
          ))}
        </div>
      </div>

      {/* Year */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted uppercase tracking-wider">Decade</h3>
        <div className="grid grid-cols-2 gap-2">
          {["2020s", "2010s", "2000s", "1990s"].map((decade) => {
            const yearValue = decade.replace("s", ""); // simple mapping for UI
            return (
              <button
                key={decade}
                onClick={() => handleFilterChange("year", yearValue)}
                className={`text-sm py-2 rounded-lg border transition-all ${
                  currentYear === yearValue
                    ? "border-accent bg-accent/10 text-accent font-medium"
                    : "border-white/10 text-secondary hover:bg-white/5 hover:text-white"
                }`}
              >
                {decade}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
