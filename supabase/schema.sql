-- ==============================================================================
-- FILMPASS DATABASE SCHEMA
-- This script sets up the production PostgreSQL architecture for FilmPass.
-- ==============================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- ==============================================================================
-- 2. TABLES
-- ==============================================================================

-- PROFILES TABLE (Publicly readable to support future social features)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  display_name text,
  avatar_url text,
  country text,
  bio text,
  collector_level text default 'Cinema Newcomer',
  xp integer default 0,
  theme_preference text default 'dark',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- USER STATISTICS TABLE (1-to-1 with profiles)
create table public.user_statistics (
  id uuid references public.profiles(id) on delete cascade not null primary key,
  movies_collected integer default 0,
  tickets_generated integer default 0,
  passports_earned integer default 0,
  directors_completed integer default 0,
  total_runtime_minutes integer default 0
);

-- TICKETS TABLE (The core collectible item)
create table public.tickets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  movie_id text not null, -- Can be tmdb_id as string
  tmdb_id integer,
  title text not null,
  poster_url text,
  theatre text,
  screening_date text,
  screening_time text,
  seat text,
  ticket_style text default 'Standard',
  edition_number text,
  serial_number text unique not null,
  image_url text, -- Path to generated PNG in Supabase Storage
  qr_data text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- COLLECTIONS TABLE (User curated lists)
create table public.collections (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text,
  cover_url text,
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- COLLECTION MOVIES TABLE (Many-to-Many mapping)
create table public.collection_movies (
  id uuid default uuid_generate_v4() primary key,
  collection_id uuid references public.collections(id) on delete cascade not null,
  tmdb_id integer not null,
  added_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(collection_id, tmdb_id)
);

-- PASSPORT PROGRESS TABLE
create table public.passport_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  passport_id text not null, -- e.g., 'sci-fi-masterpieces'
  status text default 'in_progress', -- 'in_progress', 'completed'
  progress_count integer default 0,
  completed_at timestamp with time zone,
  unique(user_id, passport_id)
);


-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS)
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.user_statistics enable row level security;
alter table public.tickets enable row level security;
alter table public.collections enable row level security;
alter table public.collection_movies enable row level security;
alter table public.passport_progress enable row level security;

-- PROFILES RLS
-- Anyone can read profiles (Future social ready)
create policy "Public profiles are viewable by everyone." 
on public.profiles for select using ( true );

-- Users can update their own profile
create policy "Users can insert their own profile." 
on public.profiles for insert with check ( auth.uid() = id );

create policy "Users can update own profile." 
on public.profiles for update using ( auth.uid() = id );

-- USER STATISTICS RLS
create policy "Stats are viewable by everyone." 
on public.user_statistics for select using ( true );

create policy "Users can update own stats." 
on public.user_statistics for update using ( auth.uid() = id );

-- TICKETS RLS
create policy "Users can view their own tickets." 
on public.tickets for select using ( auth.uid() = user_id );
-- Future public vault support: or (exists (select 1 from public.profiles where id = user_id and is_public = true))

create policy "Users can insert their own tickets." 
on public.tickets for insert with check ( auth.uid() = user_id );

create policy "Users can update their own tickets." 
on public.tickets for update using ( auth.uid() = user_id );

create policy "Users can delete their own tickets." 
on public.tickets for delete using ( auth.uid() = user_id );

-- COLLECTIONS RLS
create policy "Users can view their own collections or public ones." 
on public.collections for select using ( auth.uid() = user_id or is_public = true );

create policy "Users can insert their own collections." 
on public.collections for insert with check ( auth.uid() = user_id );

create policy "Users can update their own collections." 
on public.collections for update using ( auth.uid() = user_id );

create policy "Users can delete their own collections." 
on public.collections for delete using ( auth.uid() = user_id );

-- COLLECTION MOVIES RLS
-- Viewable if the parent collection is viewable
create policy "Collection movies are viewable if collection is viewable." 
on public.collection_movies for select using (
  exists (
    select 1 from public.collections 
    where id = collection_movies.collection_id 
    and (user_id = auth.uid() or is_public = true)
  )
);

-- Insert/Update/Delete requires owning the parent collection
create policy "Users can manage collection movies if they own the collection." 
on public.collection_movies for all using (
  exists (
    select 1 from public.collections 
    where id = collection_movies.collection_id 
    and user_id = auth.uid()
  )
);

-- PASSPORT PROGRESS RLS
create policy "Users can manage their own passport progress." 
on public.passport_progress for all using ( auth.uid() = user_id );


-- ==============================================================================
-- 4. TRIGGERS (Auto-Profile Creation)
-- ==============================================================================

-- Create a function that automatically creates a profile and stats row upon user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'username', -- If provided during signup
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)), -- Fallback to email prefix
    new.raw_user_meta_data->>'avatar_url'
  );

  insert into public.user_statistics (id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer;

-- Attach the trigger to the Supabase auth.users table
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
