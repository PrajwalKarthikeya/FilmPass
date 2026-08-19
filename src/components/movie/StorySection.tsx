import { ExtendedMovieDetails } from "@/lib/tmdb";

interface StorySectionProps {
  movie: ExtendedMovieDetails;
}

export function StorySection({ movie }: StorySectionProps) {
  const keywords = movie.keywords?.keywords || [];

  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-6">
        Story
      </h2>
      
      <div className="prose prose-invert prose-lg max-w-none mb-8 text-secondary leading-relaxed">
        <p>{movie.overview}</p>
      </div>

      {keywords.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
            Themes & Elements
          </h3>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span 
                key={keyword.id} 
                className="text-xs px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 text-secondary capitalize hover:text-white transition-colors cursor-default"
              >
                {keyword.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
