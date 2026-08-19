"use client";

import { theatres } from "@/lib/theatres";
import { TheatreCard } from "./TheatreCard";

export function TheatreGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {theatres.map((theatre, index) => (
        <TheatreCard key={theatre.id} theatre={theatre} index={index} />
      ))}
    </div>
  );
}
