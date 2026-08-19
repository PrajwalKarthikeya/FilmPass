# FilmPass

FilmPass is a premium, immersive digital cinema district. Collect tickets, earn passports, and explore curated movie collections powered by real data from TMDB.

## Features

- **The Virtual Cinema District**: Explore 10 unique, themed virtual theatres with immersive full-screen hero videos and rotating movie selections.
- **Passport Collection**: Unlock digital passports like the "World Cinema Explorer" and "Christopher Nolan Collection". View your cinematic checklist with highly detailed, animated passport visuals and physical-like visa stamps.
- **Ticket Generation**: Plan your screening, select your seat via an interactive seating chart, and generate beautiful, collectible digital tickets that save directly to your Vault.
- **Hybrid Data Engine**: Enjoy immediate visual feedback with rich mock data while securely saving generated tickets and stats to your personal Supabase account.

## Tech Stack

- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- Supabase (Auth & Postgres)
- TMDB API

## Deploy Your Own

Deploying FilmPass is incredibly easy using Vercel. Once you have published this code to your own GitHub repository, click the button below to deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/filmpass&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,TMDB_API_KEY)

### Environment Variables Required
During deployment, Vercel will ask you for three environment variables. You must provide them for the application to function correctly:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `TMDB_API_KEY` (Get one from [The Movie Database](https://www.themoviedb.org/))

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
TMDB_API_KEY=your_tmdb_api_key
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
