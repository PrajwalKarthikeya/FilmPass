import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { MovieCard } from "@/components/search/MovieCard";
import { EmptyState } from "@/components/search/EmptyState";
import { DiscoverSection } from "@/components/search/DiscoverSection";
import { 
  searchMovies, 
  discoverMovies, 
  getTrendingMovies, 
  getPopularMovies, 
  getUpcomingMovies,
  TMDBMovie
} from "@/lib/tmdb";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const genre = typeof searchParams.genre === "string" ? searchParams.genre : undefined;
  const year = typeof searchParams.year === "string" ? searchParams.year : undefined;
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "popularity.desc";

  const isSearchMode = !!q;
  const isDiscoverMode = !q && (!!genre || !!year || sort !== "popularity.desc");
  const isDefaultMode = !isSearchMode && !isDiscoverMode;

  let results: TMDBMovie[] = [];

  // Fetch Logic
  if (isSearchMode) {
    const data = await searchMovies(q);
    if (data && data.results) {
      results = data.results;
      // Client-side filtering workaround for TMDB limitations
      if (genre) {
        results = results.filter(movie => movie.genre_ids?.includes(parseInt(genre)));
      }
      if (year) {
        // Year filter is a decade (e.g. "2020", "2010")
        const decadeStart = parseInt(year);
        const decadeEnd = decadeStart + 9;
        results = results.filter(movie => {
          if (!movie.release_date) return false;
          const movieYear = parseInt(movie.release_date.split("-")[0]);
          return movieYear >= decadeStart && movieYear <= decadeEnd;
        });
      }
      // Basic sorting for search results if requested
      if (sort === "vote_average.desc") {
        results.sort((a, b) => b.vote_average - a.vote_average);
      } else if (sort === "primary_release_date.desc") {
        results.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
      } else if (sort === "original_title.asc") {
        results.sort((a, b) => a.title.localeCompare(b.title));
      }
    }
  } else if (isDiscoverMode) {
    // TMDB Discover API params mapping
    const params: Record<string, string> = { sort_by: sort };
    if (genre) params.with_genres = genre;
    if (year) {
      // Map decade to release dates
      const decadeStart = parseInt(year);
      const decadeEnd = decadeStart + 9;
      params["primary_release_date.gte"] = `${decadeStart}-01-01`;
      params["primary_release_date.lte"] = `${decadeEnd}-12-31`;
    }
    
    const data = await discoverMovies(params);
    if (data && data.results) {
      results = data.results;
    }
  }

  // Default mode fetches for Discover Sections
  let trending: TMDBMovie[] = [];
  let popular: TMDBMovie[] = [];
  let upcoming: TMDBMovie[] = [];
  
  if (isDefaultMode) {
    [trending, popular, upcoming] = await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getUpcomingMovies()
    ]);
  }

  return (
    <main className="flex-1 w-full min-h-screen bg-[#0A0A0A] flex flex-col pt-24">
      <Navbar />
      
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pb-32">
        {!process.env.TMDB_API_KEY && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-6 rounded-xl text-center mb-8 mx-auto max-w-2xl font-mono text-sm">
            ⚠️ <strong>Missing Environment Variable:</strong> The <code>TMDB_API_KEY</code> is not defined in your Vercel project settings. You must add it and redeploy for movies to load.
          </div>
        )}

        {/* Header & Search Bar */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-8">
            Digital Cinema Archive
          </h1>
          <SearchBar />
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
          {/* Sidebar */}
          <div className="hidden md:block">
            <FilterSidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {isDefaultMode ? (
              <div className="space-y-8 animate-in fade-in duration-1000">
                <DiscoverSection title="Trending Today" movies={trending} />
                <DiscoverSection title="Popular This Week" movies={popular} />
                <DiscoverSection title="Upcoming Releases" movies={upcoming} />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-display font-medium text-white">
                    {isSearchMode ? `Results for "${q}"` : "Discover Movies"}
                  </h2>
                  <span className="text-muted text-sm">{results.length} movies</span>
                </div>

                {results.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8" role="list">
                    {results.map((movie, idx) => (
                      <div key={movie.id} role="listitem">
                        <MovieCard movie={movie} index={idx} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState query={q} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
