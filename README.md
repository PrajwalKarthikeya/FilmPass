<div align="center">
  <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop" alt="FilmPass Hero" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />
  
  <h1 align="center">FilmPass</h1>
  <p align="center">
    <strong>A Premium, Immersive Digital Cinema District & Collector's Vault</strong>
  </p>
  
  <p align="center">
    <a href="#features">Explore Features</a> · 
    <a href="#tech-stack">Tech Stack</a>
  </p>
</div>

<hr />

## 🎬 About FilmPass

**FilmPass** is not just a movie database; it is a meticulously crafted digital cinema district designed for cinephiles. It reimagines the movie discovery and tracking experience by blending the luxury of premium theaters with the joy of digital collecting. 

Whether you're exploring rotating features in the *IMAX Experience* theatre, earning physical-looking visa stamps in your *World Cinema* passport, or generating highly detailed, printable digital tickets for your Vault—FilmPass makes every movie feel like an event.

Built with an obsession for design, the platform features museum-quality UI, complex 3D CSS transforms, dynamic Framer Motion animations, and a seamless hybrid architecture that bridges mock prototyping with live Supabase data.

---

## ✨ Core Features

### 🏛️ The Virtual Cinema District
Instead of a standard grid of movies, FilmPass invites you into a "Digital Cinema District."
- **10 Unique Theatres:** From the *Director's Hall* to the *Sci-Fi Nexus*, each theatre has its own visual identity, bespoke architecture, and curated genre selection.
- **Dynamic Programming:** Theatres automatically pull rotating selections of trending and highly-rated films directly from the TMDB API.
- **Immersive Hero Banners:** Entering a theatre greets you with a full-screen, cinematic video background and premium typography.

### 🛂 The Digital Passport System
Gamify your cinematic journey with interactive, collector-grade passports.
- **Physical Simulation:** Passports are rendered with procedurally generated leather textures, gold foil embossing, and interactive 3D hover states.
- **Visa Stamps:** Completing a movie in a passport collection permanently marks it with a realistic, slightly rotated, and distressed "Immigration Stamp" featuring your unique collector serial number.
- **100% Unlock Celebrations:** Finishing a collection triggers a gorgeous, screen-takeover celebration unlocking exclusive profile rewards.

### 🎟️ The Ticket Generation Engine
Turn every movie you watch into a permanent digital collectible.
- **Interactive Seat Selection:** Pick your seat in the virtual theatre before generating your ticket.
- **Customized Styles:** Choose between Vintage, Noir, Modern, and Luxury ticket designs.
- **The Vault:** Generated tickets are securely saved to your Supabase account and displayed in your personal Vault alongside your viewing statistics and curated collections.

### 👤 Cinephile Profiles
A dynamic dashboard showcasing your life in film.
- **Data Visualization:** Beautiful Recharts-powered graphs map out your most watched genres.
- **Top Directors & Actors:** Dynamically displays the creators and stars you watch the most.
- **Collector Level:** Watch your status grow from *Enthusiast* to *Auteur* based on the tickets you generate.

---

## 🛠️ Tech Stack & Architecture

FilmPass is built using the latest advancements in the React ecosystem:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL & Row Level Security)
- **Data Provider:** [TMDB API](https://www.themoviedb.org/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Live Deployment

FilmPass is deployed globally on Vercel's Edge Network for maximum performance.

**Live Website:** https://film-pass7.vercel.app/

---

## 💻 Local Development

Want to run FilmPass locally? Follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PrajwalKarthikeya/FilmPass.git
   cd FilmPass
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   TMDB_API_KEY=your_tmdb_api_key
   NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---
*Designed and built with passion for cinema and code.*
