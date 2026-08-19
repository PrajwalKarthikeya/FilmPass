import { ExtendedMovieDetails } from "@/lib/tmdb";

interface CrewGridProps {
  movie: ExtendedMovieDetails;
}

export function CrewGrid({ movie }: CrewGridProps) {
  const allCrew = movie.credits?.crew || [];
  
  // Find key roles
  const getCrewByJob = (job: string) => allCrew.find(c => c.job === job)?.name;
  
  const keyCrew = [
    { label: "Director", name: getCrewByJob("Director") },
    { label: "Writer", name: getCrewByJob("Screenplay") || getCrewByJob("Writer") },
    { label: "Composer", name: getCrewByJob("Original Music Composer") || getCrewByJob("Music") },
    { label: "Cinematographer", name: getCrewByJob("Director of Photography") },
    { label: "Editor", name: getCrewByJob("Editor") },
    { label: "Production Design", name: getCrewByJob("Production Design") },
  ].filter(crew => crew.name); // only keep existing roles

  if (keyCrew.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-6">
        Featured Crew
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {keyCrew.map((crew, idx) => (
          <div key={idx} className="flex flex-col">
            <h4 className="font-medium text-white text-base">
              {crew.name}
            </h4>
            <p className="text-sm text-secondary mt-0.5">
              {crew.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
