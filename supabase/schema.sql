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

-- ===========================================================================
-- FASE 8 — Multi-tenant (organizations). MT-001 / MT-002 / MT-003.
--
-- Appended 2026-09-29. Everything in this section is idempotent: safe to run
-- twice (create table/index if not exists, drop policy if exists, create or
-- replace function). Nothing above this marker was modified.
-- ===========================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- MT-001 — organizations, memberships, org_invites
-- ---------------------------------------------------------------------------

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  plan text not null default 'free',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists memberships (
  org_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','admin','member')),
  joined_at timestamptz not null default now(),
  primary key (org_id, user_id)
);

create table if not exists org_invites (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  email text not null,
  token text not null unique default encode(gen_random_bytes(24), 'hex'),
  role text not null default 'member' check (role in ('owner','admin','member')),
  created_by uuid references auth.users(id) on delete set null,
  expires_at timestamptz not null default now() + interval '7 days',
  used_at timestamptz,
  created_at timestamptz not null default now()
);

alter table organizations enable row level security;
alter table memberships enable row level security;
alter table org_invites enable row level security;

-- Helpers (SECURITY DEFINER so policies and RPCs can check membership without
-- tripping over RLS recursion).
create or replace function public.is_org_member(p_org_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from memberships
    where org_id = p_org_id
      and user_id = auth.uid()
  );
$$;

create or replace function public.is_org_admin(p_org_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from memberships
    where org_id = p_org_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
  );
$$;

revoke all on function public.is_org_member(uuid) from public;
grant execute on function public.is_org_member(uuid) to anon, authenticated;
revoke all on function public.is_org_admin(uuid) from public;
grant execute on function public.is_org_admin(uuid) to anon, authenticated;

-- Policies: organizations
drop policy if exists "org members read org" on organizations;
create policy "org members read org"
  on organizations for select
  using (public.is_org_member(id));

drop policy if exists "authenticated create org" on organizations;
create policy "authenticated create org"
  on organizations for insert
  to authenticated
  with check (created_by = auth.uid());

drop policy if exists "org admins update org" on organizations;
create policy "org admins update org"
  on organizations for update
  using (public.is_org_admin(id))
  with check (public.is_org_admin(id));

drop policy if exists "org owners delete org" on organizations;
create policy "org owners delete org"
  on organizations for delete
  using (
    exists (
      select 1 from memberships m
      where m.org_id = organizations.id
        and m.user_id = auth.uid()
        and m.role = 'owner'
    )
  );

-- Policies: memberships — read-only via RLS; all writes go through the RPCs
-- below (no insert/update/delete policies = deny by default).
drop policy if exists "org members read memberships" on memberships;
create policy "org members read memberships"
  on memberships for select
  using (public.is_org_member(org_id));

-- Policies: org_invites — org admins only.
drop policy if exists "org admins read invites" on org_invites;
create policy "org admins read invites"
  on org_invites for select
  using (public.is_org_admin(org_id));

drop policy if exists "org admins create invites" on org_invites;
create policy "org admins create invites"
  on org_invites for insert
  to authenticated
  with check (public.is_org_admin(org_id) and created_by = auth.uid());

drop policy if exists "org admins update invites" on org_invites;
create policy "org admins update invites"
  on org_invites for update
  using (public.is_org_admin(org_id))
  with check (public.is_org_admin(org_id));

drop policy if exists "org admins delete invites" on org_invites;
create policy "org admins delete invites"
  on org_invites for delete
  using (public.is_org_admin(org_id));

-- ---------------------------------------------------------------------------
-- MT-001 — membership RPCs (SECURITY DEFINER; the only write path)
-- ---------------------------------------------------------------------------

-- Create an org; caller becomes its owner.
create or replace function public.create_org(p_name text)
returns organizations
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text := btrim(coalesce(p_name, ''));
  v_slug_base text;
  v_slug text;
  v_suffix integer := 2;
  v_org organizations%rowtype;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;
  if v_name = '' then
    raise exception 'org name must not be empty';
  end if;
  -- Slugify: lowercase, non-alphanumeric runs -> '-', trim edge dashes.
  v_slug_base := lower(v_name);
  v_slug_base := regexp_replace(v_slug_base, '[^a-z0-9]+', '-', 'g');
  v_slug_base := btrim(v_slug_base, '-');
  if v_slug_base = '' then
    v_slug_base := 'org';
  end if;
  -- De-duplicate: org, org-2, org-3, ...
  v_slug := v_slug_base;
  while exists (select 1 from organizations where slug = v_slug) loop
    v_slug := v_slug_base || '-' || v_suffix;
    v_suffix := v_suffix + 1;
  end loop;
  insert into organizations (name, slug, created_by)
  values (v_name, v_slug, auth.uid())
  returning * into v_org;
  insert into memberships (org_id, user_id, role)
  values (v_org.id, auth.uid(), 'owner');
  return v_org;
end;
$$;

revoke all on function public.create_org(text) from public;
grant execute on function public.create_org(text) to authenticated;

-- Accept an invite token; caller joins the org with the invited role.
create or replace function public.accept_org_invite(p_token text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_invite org_invites%rowtype;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;
  select * into v_invite
  from org_invites
  where token = btrim(coalesce(p_token, ''))
  for update;
  if not found then
    raise exception 'invite not found';
  end if;
  if v_invite.used_at is not null then
    raise exception 'invite already used';
  end if;
  if v_invite.expires_at < now() then
    raise exception 'invite expired';
  end if;
  insert into memberships (org_id, user_id, role)
  values (v_invite.org_id, auth.uid(), v_invite.role)
  on conflict do nothing;
  update org_invites set used_at = now() where id = v_invite.id;
  return v_invite.org_id;
end;
$$;

revoke all on function public.accept_org_invite(text) from public;
grant execute on function public.accept_org_invite(text) to authenticated;

-- Change a member's role. Owner can do anything; admin can only change
-- members. Never change your own role; never leave the org with zero owners.
create or replace function public.set_org_member_role(p_org_id uuid, p_user_id uuid, p_role text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_caller_role text;
  v_target_role text;
  v_owner_count integer;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;
  if p_role is null or p_role not in ('owner', 'admin', 'member') then
    raise exception 'invalid role';
  end if;
  select role into v_caller_role
  from memberships
  where org_id = p_org_id and user_id = auth.uid();
  if v_caller_role is null then
    raise exception 'not an org member';
  end if;
  if v_caller_role not in ('owner', 'admin') then
    raise exception 'insufficient privileges';
  end if;
  if p_user_id = auth.uid() then
    raise exception 'cannot change your own role';
  end if;
  select role into v_target_role
  from memberships
  where org_id = p_org_id and user_id = p_user_id;
  if v_target_role is null then
    raise exception 'target is not an org member';
  end if;
  if v_caller_role = 'admin' and v_target_role <> 'member' then
    raise exception 'admins can only change member roles';
  end if;
  if v_target_role = 'owner' and p_role <> 'owner' then
    select count(*) into v_owner_count
    from memberships
    where org_id = p_org_id and role = 'owner';
    if v_owner_count <= 1 then
      raise exception 'cannot demote the last owner';
    end if;
  end if;
  update memberships
  set role = p_role
  where org_id = p_org_id and user_id = p_user_id;
  return true;
end;
$$;

revoke all on function public.set_org_member_role(uuid, uuid, text) from public;
grant execute on function public.set_org_member_role(uuid, uuid, text) to authenticated;

-- Remove a member. Owner can remove anyone except the last owner; admin can
-- only remove members.
create or replace function public.remove_org_member(p_org_id uuid, p_user_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_caller_role text;
  v_target_role text;
  v_owner_count integer;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;
  select role into v_caller_role
  from memberships
  where org_id = p_org_id and user_id = auth.uid();
  if v_caller_role is null then
    raise exception 'not an org member';
  end if;
  if v_caller_role not in ('owner', 'admin') then
    raise exception 'insufficient privileges';
  end if;
  select role into v_target_role
  from memberships
  where org_id = p_org_id and user_id = p_user_id;
  if v_target_role is null then
    raise exception 'target is not an org member';
  end if;
  if v_caller_role = 'admin' and v_target_role <> 'member' then
    raise exception 'admins can only remove members';
  end if;
  if v_target_role = 'owner' then
    select count(*) into v_owner_count
    from memberships
    where org_id = p_org_id and role = 'owner';
    if v_owner_count <= 1 then
      raise exception 'cannot remove the last owner';
    end if;
  end if;
  delete from memberships
  where org_id = p_org_id and user_id = p_user_id;
  return true;
end;
$$;

revoke all on function public.remove_org_member(uuid, uuid) from public;
grant execute on function public.remove_org_member(uuid, uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- MT-002 — org_id on the learning tables (nullable; personal rows keep NULL)
-- ---------------------------------------------------------------------------

alter table progress add column if not exists org_id uuid references organizations(id) on delete set null;
alter table lesson_completions add column if not exists org_id uuid references organizations(id) on delete set null;
alter table vocabulary_stats add column if not exists org_id uuid references organizations(id) on delete set null;

create index if not exists progress_org_idx on progress(org_id);
create index if not exists progress_org_user_idx on progress(org_id, user_id);
create index if not exists lesson_completions_org_idx on lesson_completions(org_id);
create index if not exists lesson_completions_org_user_idx on lesson_completions(org_id, user_id);
create index if not exists vocabulary_stats_org_idx on vocabulary_stats(org_id);
create index if not exists vocabulary_stats_org_user_idx on vocabulary_stats(org_id, user_id);

-- ---------------------------------------------------------------------------
-- MT-003 — tenant-aware RLS on progress / lesson_completions / vocabulary_stats
--
-- These policies are ADDED alongside the existing owner-only policies; the
-- existing "owners manage own ..." policies are NOT dropped. PostgREST
-- combines permissive policies with OR, so personal rows (org_id is null)
-- stay strictly owner-only while org rows gain member read / admin write.
-- ---------------------------------------------------------------------------

-- progress
drop policy if exists "tenant members read org rows" on progress;
create policy "tenant members read org rows"
  on progress for select
  using (org_id is not null and public.is_org_member(org_id));

drop policy if exists "tenant members insert own org rows" on progress;
create policy "tenant members insert own org rows"
  on progress for insert
  with check (
    (org_id is null and auth.uid() = user_id)
    or (org_id is not null and auth.uid() = user_id and public.is_org_member(org_id))
  );

drop policy if exists "tenant admins manage org rows" on progress;
create policy "tenant admins manage org rows"
  on progress for update
  using (org_id is not null and public.is_org_admin(org_id))
  with check (org_id is not null and public.is_org_admin(org_id));

drop policy if exists "tenant admins delete org rows" on progress;
create policy "tenant admins delete org rows"
  on progress for delete
  using (org_id is not null and public.is_org_admin(org_id));

-- lesson_completions
drop policy if exists "tenant members read org rows" on lesson_completions;
create policy "tenant members read org rows"
  on lesson_completions for select
  using (org_id is not null and public.is_org_member(org_id));

drop policy if exists "tenant members insert own org rows" on lesson_completions;
create policy "tenant members insert own org rows"
  on lesson_completions for insert
  with check (
    (org_id is null and auth.uid() = user_id)
    or (org_id is not null and auth.uid() = user_id and public.is_org_member(org_id))
  );

drop policy if exists "tenant admins manage org rows" on lesson_completions;
create policy "tenant admins manage org rows"
  on lesson_completions for update
  using (org_id is not null and public.is_org_admin(org_id))
  with check (org_id is not null and public.is_org_admin(org_id));

drop policy if exists "tenant admins delete org rows" on lesson_completions;
create policy "tenant admins delete org rows"
  on lesson_completions for delete
  using (org_id is not null and public.is_org_admin(org_id));

-- vocabulary_stats
drop policy if exists "tenant members read org rows" on vocabulary_stats;
create policy "tenant members read org rows"
  on vocabulary_stats for select
  using (org_id is not null and public.is_org_member(org_id));

drop policy if exists "tenant members insert own org rows" on vocabulary_stats;
create policy "tenant members insert own org rows"
  on vocabulary_stats for insert
  with check (
    (org_id is null and auth.uid() = user_id)
    or (org_id is not null and auth.uid() = user_id and public.is_org_member(org_id))
  );

drop policy if exists "tenant admins manage org rows" on vocabulary_stats;
create policy "tenant admins manage org rows"
  on vocabulary_stats for update
  using (org_id is not null and public.is_org_admin(org_id))
  with check (org_id is not null and public.is_org_admin(org_id));

drop policy if exists "tenant admins delete org rows" on vocabulary_stats;
create policy "tenant admins delete org rows"
  on vocabulary_stats for delete
  using (org_id is not null and public.is_org_admin(org_id));

-- End of FASE 8 — Multi-tenant (organizations).
