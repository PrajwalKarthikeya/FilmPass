"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ExtendedMovieDetails } from "@/lib/tmdb";
import { Button } from "@/components/ui/button";
import { SeatPicker } from "./SeatPicker";
import { TicketPreview, TicketConfig } from "./TicketPreview";
import { generateTicket } from "@/app/actions/tickets";
import { theatres as definedTheatres } from "@/lib/theatres";
import { Loader2 } from "lucide-react";

interface ScreeningPlannerProps {
  movie: ExtendedMovieDetails;
}

export function ScreeningPlanner({ movie }: ScreeningPlannerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Get next 7 days for the date picker
  const upcomingDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
    }
    return dates;
  }, []);

  const theatresList = definedTheatres.map(t => t.name);
  const times = ["10:30 AM", "1:45 PM", "4:15 PM", "7:30 PM", "10:45 PM"];
  const screens = ["Screen 1", "Screen 2", "Screen 3", "IMAX", "Dolby"];
  const styles = ["Modern", "Vintage", "Luxury", "Retro", "Minimal", "Sci-Fi", "Noir"];

  const [config, setConfig] = useState<TicketConfig>({
    theatre: theatresList[0],
    date: upcomingDates[0],
    time: times[3],
    screen: screens[3],
    seat: "G8",
    style: styles[0],
  });

  // Generate deterministic but "random-looking" serial
  const serialNumber = useMemo(() => {
    const moviePrefix = movie.title.substring(0, 3).toUpperCase().replace(/[^A-Z0-9]/g, 'X');
    const year = movie.release_date ? movie.release_date.split("-")[0] : "0000";
    const theatreCode = config.theatre.substring(0, 3).toUpperCase();
    const screenCode = config.screen.replace("Screen ", "S").substring(0, 3).toUpperCase();
    const timeCode = config.time.replace(/[: PM]/g, "");
    
    // Hash of selections to create a unique hex
    const str = `${movie.id}${config.theatre}${config.date}${config.time}${config.screen}${config.seat}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; 
    }
    const hex = Math.abs(hash).toString(16).toUpperCase().padStart(4, "0").substring(0, 4);

    return `${moviePrefix}-${year}-${theatreCode}-${screenCode}-${config.seat}-${timeCode}-${hex}`;
  }, [movie, config]);

  const handleGenerate = () => {
    startTransition(async () => {
      try {
        await generateTicket(movie, { ...config, serial: serialNumber });
        // Redirect to vault to see the newly generated ticket
        router.push("/vault");
      } catch (error) {
        console.error("Failed to generate ticket:", error);
        alert("Failed to generate ticket. Are you logged in?");
      }
    });
  };

  const updateConfig = (key: keyof TicketConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section id="screening-planner" className="relative my-24 rounded-3xl overflow-hidden glass-panel border border-white/10 p-8 md:p-12 lg:p-16">
      {/* Decorative Lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 mb-12 text-center lg:text-left">
        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-4">
          Your Screening
        </h2>
        <p className="text-lg text-secondary max-w-2xl">
          Plan your perfect movie night before creating your collectible ticket.
        </p>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Side: Controls */}
        <div className="flex-1 space-y-10">
          
          {/* Theatre & Screen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted uppercase tracking-wider">Theatre</label>
              <select 
                value={config.theatre}
                onChange={(e) => updateConfig("theatre", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer"
              >
                {theatresList.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted uppercase tracking-wider">Screen</label>
              <select 
                value={config.screen}
                onChange={(e) => updateConfig("screen", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer"
              >
                {screens.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted uppercase tracking-wider">Date</label>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                {upcomingDates.map(date => (
                  <button
                    key={date}
                    onClick={() => updateConfig("date", date)}
                    className={`shrink-0 px-4 py-2 rounded-lg text-sm transition-colors border ${
                      config.date === date 
                        ? "bg-white text-black border-white font-medium" 
                        : "bg-black/40 text-secondary border-white/10 hover:border-white/30"
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted uppercase tracking-wider">Time</label>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                {times.map(time => (
                  <button
                    key={time}
                    onClick={() => updateConfig("time", time)}
                    className={`shrink-0 px-4 py-2 rounded-lg text-sm transition-colors border ${
                      config.time === time 
                        ? "bg-white text-black border-white font-medium" 
                        : "bg-black/40 text-secondary border-white/10 hover:border-white/30"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Seat Selection */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-sm font-medium text-muted uppercase tracking-wider">Seat Selection</label>
              <span className="text-accent font-mono text-sm">{config.seat}</span>
            </div>
            <SeatPicker selectedSeat={config.seat} onSeatSelect={(s) => updateConfig("seat", s)} />
          </div>

          {/* Ticket Style */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted uppercase tracking-wider">Ticket Style</label>
            <div className="flex flex-wrap gap-2">
              {styles.map(style => (
                <button
                  key={style}
                  onClick={() => updateConfig("style", style)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors border ${
                    config.style === style 
                      ? "bg-accent text-black border-accent font-medium shadow-[0_0_15px_rgba(229,184,105,0.4)]" 
                      : "bg-black/40 text-secondary border-white/10 hover:border-white/30"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 flex flex-col sm:flex-row gap-4 border-t border-white/5">
            <Button disabled={isPending} onClick={handleGenerate} size="lg" className="flex-1 bg-accent text-background hover:bg-white text-base font-display uppercase tracking-widest group relative overflow-hidden shadow-[0_0_40px_rgba(229,184,105,0.2)] hover:shadow-[0_0_60px_rgba(229,184,105,0.4)] transition-shadow">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
              {isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Generate Full Ticket"}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setConfig({ theatre: theatresList[0], date: upcomingDates[0], time: times[3], screen: screens[3], seat: "G8", style: styles[0] })}
            >
              Reset
            </Button>
          </div>

        </div>

        {/* Right Side: Live Preview */}
        <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 flex items-center justify-center lg:sticky lg:top-32 h-fit">
          <TicketPreview movie={movie} config={config} serialNumber={serialNumber} />
        </div>

      </div>
    </section>
  );
}
