import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Trending } from "@/components/landing/Trending";
import { Collections } from "@/components/landing/Collections";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturedDesigns } from "@/components/landing/FeaturedDesigns";
import { getTrendingMovies, getMoviesWithDetails } from "@/lib/tmdb";

// Force dynamic rendering to ensure fresh TMDB data and bypass build-time static generation network issues
export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch real data from TMDB on the server securely
  const trendingMoviesData = await getTrendingMovies();
  // Fetch details to get runtime and exact genres for the hero section
  const detailedMovies = await getMoviesWithDetails(trendingMoviesData.slice(0, 5));

  return (
    <main className="flex-1 w-full relative">
      <Navbar />
      <Hero movies={detailedMovies} />
      <Trending movies={trendingMoviesData} />
      <Collections />
      <HowItWorks />
      <FeaturedDesigns movies={detailedMovies} />
      <Footer />
    </main>
  );
}
