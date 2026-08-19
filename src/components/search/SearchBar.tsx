"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, Star } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { searchMoviesAction } from "@/app/actions/tmdb";
import { TMDBMovie, TMDB_IMAGE_URL } from "@/lib/tmdb";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 400);
  
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<TMDBMovie[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync with URL changes
  useEffect(() => {
    if (initialQuery !== query) {
      setQuery(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  // Fetch suggestions
  useEffect(() => {
    async function fetchSuggestions() {
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        return;
      }
      setIsFetching(true);
      try {
        const data = await searchMoviesAction(debouncedQuery, 1);
        setSuggestions(data?.results?.slice(0, 5) || []);
      } catch (error) {
        console.error("Failed to fetch suggestions", error);
      } finally {
        setIsFetching(false);
      }
    }
    fetchSuggestions();
  }, [debouncedQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setIsFocused(false);
    if (inputRef.current) inputRef.current.blur();
    
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    } else {
      params.delete("q");
    }
    params.delete("page");
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isFocused || suggestions.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch(query);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => (prev > -1 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          // Navigate directly to movie details
          router.push(`/movie/${suggestions[selectedIndex].id}`);
          setIsFocused(false);
        } else {
          handleSearch(query);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsFocused(false);
        if (inputRef.current) inputRef.current.blur();
        break;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    handleSearch("");
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full z-50">
      {/* Massive Search Input */}
      <div 
        className={`relative flex items-center bg-surface border transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl ${
          isFocused ? "border-accent ring-4 ring-accent/10" : "border-white/10 hover:border-white/20"
        }`}
      >
        <Search className={`w-6 h-6 ml-6 transition-colors ${isFocused ? "text-accent" : "text-muted"}`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
            if (!isFocused) setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search any movie ever made..."
          className="w-full bg-transparent border-none outline-none text-white text-lg md:text-xl py-5 px-4 placeholder:text-muted/70 font-medium"
          aria-label="Search movies"
          aria-expanded={isFocused && suggestions.length > 0}
          role="combobox"
          aria-controls="search-suggestions"
        />
        {query && (
          <button 
            onClick={clearSearch}
            className="p-4 mr-2 text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Glassmorphism Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && query.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-4 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            id="search-suggestions"
            role="listbox"
          >
            {isFetching && suggestions.length === 0 ? (
              <div className="p-6 text-center text-muted text-sm">Searching the archives...</div>
            ) : suggestions.length > 0 ? (
              <ul className="py-2">
                {suggestions.map((movie, index) => {
                  const isSelected = index === selectedIndex;
                  const year = movie.release_date ? movie.release_date.split("-")[0] : "";
                  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_URL}/w92${movie.poster_path}` : "";
                  
                  return (
                    <li key={movie.id} role="option" aria-selected={isSelected}>
                      <button
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={() => {
                          router.push(`/movie/${movie.id}`);
                          setIsFocused(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center gap-4 transition-colors ${
                          isSelected ? "bg-white/10" : "hover:bg-white/5"
                        }`}
                      >
                        <div className="w-10 h-14 bg-surface rounded flex-shrink-0 overflow-hidden relative">
                          {posterUrl ? (
                            <Image src={posterUrl} alt="" fill sizes="40px" className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                              <Star className="w-4 h-4 text-muted" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-base font-medium truncate ${isSelected ? "text-accent" : "text-white"}`}>
                            {movie.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-secondary mt-1">
                            {year && <span>{year}</span>}
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-accent" fill="currentColor" />
                              <span>{movie.vote_average.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="p-6 text-center text-secondary text-sm">
                No exact matches for "{query}". Press Enter to search all.
              </div>
            )}
            
            {/* View all results footer */}
            <div className="bg-white/5 border-t border-white/10 p-3 text-center">
              <button 
                onClick={() => handleSearch(query)}
                className="text-sm font-medium text-white hover:text-accent transition-colors"
              >
                View all results for "{query}"
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
