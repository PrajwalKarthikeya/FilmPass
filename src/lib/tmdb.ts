export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TMDBMovieDetails extends TMDBMovie {
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  original_language: string;
  homepage: string | null;
  genres: { id: number; name: string }[];
}

export interface ExtendedMovieDetails extends TMDBMovieDetails {
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
      department: string;
      profile_path: string | null;
    }[];
  };
  videos: {
    results: {
      id: string;
      name: string;
      key: string;
      site: string;
      type: string;
    }[];
  };
  images: {
    backdrops: { file_path: string; aspect_ratio: number }[];
    posters: { file_path: string; aspect_ratio: number }[];
  };
  keywords: {
    keywords: { id: number; name: string }[];
  };
  recommendations: {
    results: TMDBMovie[];
  };
  similar: {
    results: TMDBMovie[];
  };
}

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || "https://image.tmdb.org/t/p";

import { trendingMovies as mockTrending, mockExtendedMovieDetails } from "./mock-data";

async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!TMDB_API_KEY) {
    console.warn("TMDB_API_KEY is not defined. Falling back to mock data.");
    return null;
  }

  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    ...params,
  });

  const url = `${TMDB_BASE_URL}${endpoint}?${queryParams.toString()}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      console.warn(`TMDB API returned ${res.status}: ${res.statusText}. Falling back to mock data.`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.warn(`Failed to fetch from TMDB network: ${error}. Falling back to mock data.`);
    return null;
  }
}

export async function getTrendingMovies(): Promise<TMDBMovie[]> {
  const data = await fetchFromTMDB<{ results: TMDBMovie[] }>("/trending/movie/day");
  if (!data || !data.results) {
    // Note: mockTrending uses strict typing matching TMDBMovie but without genres, we cast for now
    return mockTrending as unknown as TMDBMovie[];
  }
  return data.results.slice(0, 10);
}

export async function getTMDBMovies(endpoint: string, params: Record<string, string> = {}): Promise<TMDBMovie[]> {
  const data = await fetchFromTMDB<{ results: TMDBMovie[] }>(endpoint, params);
  if (!data || !data.results) {
    return mockTrending as unknown as TMDBMovie[];
  }
  return data.results;
}

export async function getMovieDetails(id: number): Promise<ExtendedMovieDetails | null> {
  const data = await fetchFromTMDB<ExtendedMovieDetails>(`/movie/${id}`, {
    append_to_response: "credits,videos,images,keywords,recommendations,similar"
  });
  
  if (!data) {
    // Return a mock if fetch fails
    return mockExtendedMovieDetails as unknown as ExtendedMovieDetails;
  }
  return data;
}

export async function getMoviesWithDetails(movies: TMDBMovie[]): Promise<TMDBMovieDetails[]> {
  const detailedMovies = await Promise.all(
    movies.map(async (movie) => {
      const details = await getMovieDetails(movie.id);
      // Fallback if details fetch fails
      if (!details) {
        return {
          ...movie,
          runtime: 120, // mock fallback
          genres: [],
        } as unknown as TMDBMovieDetails;
      }
      return details;
    })
  );
  return detailedMovies;
}

// Genre mapping for simpler usage
const genreMap: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export function getGenres(genreIds: number[]): string[] {
  return genreIds.map((id) => genreMap[id]).filter(Boolean);
}

export async function searchMovies(query: string, page: number = 1): Promise<{ results: TMDBMovie[], total_pages: number, total_results: number } | null> {
  if (!query) return null;
  const data = await fetchFromTMDB<{ results: TMDBMovie[], total_pages: number, total_results: number }>("/search/movie", { query, page: page.toString() });
  if (!data) {
    const filtered = mockTrending.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
    return { results: filtered as unknown as TMDBMovie[], total_pages: 1, total_results: filtered.length };
  }
  return data;
}

export async function discoverMovies(params: Record<string, string>): Promise<{ results: TMDBMovie[], total_pages: number, total_results: number } | null> {
  const data = await fetchFromTMDB<{ results: TMDBMovie[], total_pages: number, total_results: number }>("/discover/movie", params);
  if (!data) {
    return { results: mockTrending as unknown as TMDBMovie[], total_pages: 1, total_results: mockTrending.length };
  }
  return data;
}

export async function getTopRatedMovies(page: number = 1): Promise<TMDBMovie[]> {
  const data = await fetchFromTMDB<{ results: TMDBMovie[] }>("/movie/top_rated", { page: page.toString() });
  return data?.results || (mockTrending as unknown as TMDBMovie[]);
}

export async function getPopularMovies(page: number = 1): Promise<TMDBMovie[]> {
  const data = await fetchFromTMDB<{ results: TMDBMovie[] }>("/movie/popular", { page: page.toString() });
  return data?.results || (mockTrending as unknown as TMDBMovie[]);
}

export async function getUpcomingMovies(page: number = 1): Promise<TMDBMovie[]> {
  const data = await fetchFromTMDB<{ results: TMDBMovie[] }>("/movie/upcoming", { page: page.toString() });
  return data?.results || (mockTrending as unknown as TMDBMovie[]);
}
