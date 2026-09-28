-- Nyein Sensei English — Supabase schema (v2: cloud-save contract)
--
-- Run this in the Supabase SQL editor (or via supabase db push).
--
-- v2 replaces the old device_id-based design: login is MANDATORY, every row
-- belongs to auth.users via auth.uid(), and Supabase is the source of truth
-- for signed-in users (localStorage is purely an offline cache + outbox).
--
-- Tables:
--   profiles(id uuid PK = auth.users.id, xp, gems, streak, level, last_active date, updated_at)
--   progress(user_id, word_key, known, reps)
--   lesson_completions(user_id, lesson_id, score, completed_at)
--   vocabulary_stats(user_id, word_key, correct, wrong)

-- Profiles: one row per learner, keyed by the auth user id.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  xp integer not null default 0,
  gems integer not null default 0,
  streak integer not null default 0,
  level integer not null default 1,
  last_active date,
  updated_at timestamptz not null default now()
);

-- Progress: per-word known/reps (favorites / spaced repetition).
create table if not exists progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  word_key text not null,
  known boolean not null default false,
  reps integer not null default 0,
  primary key (user_id, word_key)
);

-- Lesson completions: one row per completed lesson attempt.
create table if not exists lesson_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  score integer not null default 0,
  completed_at timestamptz not null default now()
);
create index if not exists lesson_completions_user_idx on lesson_completions(user_id, completed_at desc);

-- Vocabulary stats: per-word correct/wrong totals.
create table if not exists vocabulary_stats (
  user_id uuid not null references auth.users(id) on delete cascade,
  word_key text not null,
  correct integer not null default 0,
  wrong integer not null default 0,
  primary key (user_id, word_key)
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

-- Row Level Security: every row belongs to its authenticated owner.
alter table profiles enable row level security;
alter table progress enable row level security;
alter table lesson_completions enable row level security;
alter table vocabulary_stats enable row level security;

drop policy if exists "owners manage own profile" on profiles;
create policy "owners manage own profile"
  on profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "owners manage own progress" on progress;
create policy "owners manage own progress"
  on progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "owners manage own lesson completions" on lesson_completions;
create policy "owners manage own lesson completions"
  on lesson_completions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "owners manage own vocabulary stats" on vocabulary_stats;
create policy "owners manage own vocabulary stats"
  on vocabulary_stats for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Signup license-key gate.
--
-- The license key lives ONLY in Supabase Vault as the secret
-- 'signup_license_key' (set it via the Vault UI / SQL editor — it is NEVER
-- stored in client code or in this repo):
--
--   select vault.create_secret('<THE-KEY>', 'signup_license_key');
--
-- The app verifies a user-typed key through this RPC with the anon key:
--   POST /rest/v1/rpc/verify_signup_license   {"input_key": "..."}  → true/false
-- ---------------------------------------------------------------------------

create or replace function public.verify_signup_license(input_key text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  stored text;
begin
  if input_key is null or btrim(input_key) = '' then
    return false;
  end if;
  select decrypted_secret into stored
  from vault.decrypted_secrets
  where name = 'signup_license_key'
  limit 1;
  if stored is null then
    return false;
  end if;
  return stored = btrim(input_key)
     and length(stored) = length(btrim(input_key));
end;
$$;

revoke all on function public.verify_signup_license(text) from public;
grant execute on function public.verify_signup_license(text) to anon, authenticated;
