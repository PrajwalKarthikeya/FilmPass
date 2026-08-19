"use client";

import Image from "next/image";

export function FavoritesDisplay() {
  const favorites = [
    { label: "Favorite Movie", title: "Interstellar", image: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXjNpeYYC2Bfkvl5p.jpg" },
    { label: "Favorite Director", title: "Christopher Nolan", image: "https://image.tmdb.org/t/p/w500/1XmOl9H7vV03VjSg4Hl5Qf8mN9J.jpg" },
    { label: "Favorite Genre", title: "Science Fiction", image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGjjc94Y.jpg" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {favorites.map((fav) => (
        <div key={fav.label} className="relative aspect-video rounded-2xl overflow-hidden group">
          <Image 
            src={fav.image}
            alt={fav.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <p className="text-[10px] uppercase tracking-widest text-accent font-mono mb-1">{fav.label}</p>
            <h4 className="font-display font-bold text-2xl leading-tight">{fav.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
