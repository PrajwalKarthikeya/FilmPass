"use server";

import { searchMovies, discoverMovies } from "@/lib/tmdb";

export async function searchMoviesAction(query: string, page: number = 1) {
  return searchMovies(query, page);
}

export async function discoverMoviesAction(params: Record<string, string>) {
  return discoverMovies(params);
}
