-- Nyein Sensei English — Supabase schema
-- Run this in the Supabase SQL editor (or via supabase db push).

-- Profiles: one row per learner (linked to auth.users when auth is used;
-- device_id allows anonymous per-device profiles too).
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  device_id text unique,
  display_name text default 'သင်ယူသူ',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Progress: aggregate learner stats (synced from the client).
create table if not exists progress (
  profile_id uuid primary key references profiles(id) on delete cascade,
  xp integer not null default 0,
  streak_days integer not null default 0,
  last_active_date date,
  best_combo integer not null default 0,
  total_correct integer not null default 0,
  total_answered integer not null default 0,
  updated_at timestamptz not null default now()
);

-- Lesson completions: one row per completed lesson attempt.
create table if not exists lesson_completions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  topic_id text not null,
  lesson_index integer not null,
  difficulty integer not null default 1,
  score integer not null default 0,
  total integer not null default 0,
  xp_earned integer not null default 0,
  completed_at timestamptz not null default now()
);
create index if not exists lesson_completions_profile_idx on lesson_completions(profile_id, completed_at desc);

-- Vocabulary stats: spaced-repetition style per-word stats.
create table if not exists vocabulary_stats (
  profile_id uuid not null references profiles(id) on delete cascade,
  word_en text not null,
  seen_count integer not null default 0,
  correct_count integer not null default 0,
  last_seen_at timestamptz,
  primary key (profile_id, word_en)
);

-- Keep updated_at fresh.
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists profiles_touch on profiles;
create trigger profiles_touch before update on profiles
  for each row execute function touch_updated_at();

drop trigger if exists progress_touch on progress;
create trigger progress_touch before update on progress
  for each row execute function touch_updated_at();

-- Row Level Security: a profile's rows are visible only to its owner.
--
-- Two supported setups:
--   1. Authenticated users (recommended): enable Supabase Auth (email/phone)
--      and sign in from the app. Policies match auth.uid() = user_id.
--   2. Anonymous devices: policies ALSO accept a `device_id` JWT claim
--      (current_setting('request.jwt.claims')->>'device_id'). The plain anon
--      key does NOT carry this claim, so anonymous sync requires either a
--      custom JWT minted by your own backend (with the device_id claim) or
--      a Postgres function with SECURITY DEFINER. Until one of these is in
--      place, the app keeps working 100% offline on localStorage — sync calls
--      simply no-op. See README.md ("Supabase setup") for details.
alter table profiles enable row level security;
alter table progress enable row level security;
alter table lesson_completions enable row level security;
alter table vocabulary_stats enable row level security;

create policy "owners can manage their profile"
  on profiles for all
  using (auth.uid() = user_id or device_id = current_setting('request.jwt.claims', true)::json->>'device_id')
  with check (auth.uid() = user_id or device_id = current_setting('request.jwt.claims', true)::json->>'device_id');

create policy "owners can manage their progress"
  on progress for all
  using (exists (
    select 1 from profiles p
    where p.id = progress.profile_id
      and (p.user_id = auth.uid() or p.device_id = current_setting('request.jwt.claims', true)::json->>'device_id')
  ))
  with check (exists (
    select 1 from profiles p
    where p.id = progress.profile_id
      and (p.user_id = auth.uid() or p.device_id = current_setting('request.jwt.claims', true)::json->>'device_id')
  ));

create policy "owners can manage their lesson completions"
  on lesson_completions for all
  using (exists (
    select 1 from profiles p
    where p.id = lesson_completions.profile_id
      and (p.user_id = auth.uid() or p.device_id = current_setting('request.jwt.claims', true)::json->>'device_id')
  ))
  with check (exists (
    select 1 from profiles p
    where p.id = lesson_completions.profile_id
      and (p.user_id = auth.uid() or p.device_id = current_setting('request.jwt.claims', true)::json->>'device_id')
  ));

create policy "owners can manage their vocabulary stats"
  on vocabulary_stats for all
  using (exists (
    select 1 from profiles p
    where p.id = vocabulary_stats.profile_id
      and (p.user_id = auth.uid() or p.device_id = current_setting('request.jwt.claims', true)::json->>'device_id')
  ))
  with check (exists (
    select 1 from profiles p
    where p.id = vocabulary_stats.profile_id
      and (p.user_id = auth.uid() or p.device_id = current_setting('request.jwt.claims', true)::json->>'device_id')
  ));
