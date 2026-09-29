-- ===========================================================================
-- Migration: 20260929_fase8_multitenant.sql
--
-- FASE 8 - Multi-tenant (organizations): MT-001 / MT-002 / MT-003,
-- plus MT-003 RLS hardening (legacy owner-policy tightening, MT-007 SQL part).
--
-- STATUS: code only - NOT applied to the live Supabase database.
--         Do NOT run this against production until the MT-007 verification
--         script (supabase/MT-007-tenant-isolation-checks.sql) passes on a
--         staging project.
-- APPLY ORDER: run AFTER supabase/schema.sql (the base schema). This file
--         assumes the base tables/policies from schema.sql already exist.
-- IDEMPOTENT: safe to run multiple times (create table/index if not exists,
--         drop policy if exists, create or replace function throughout).
--
-- Contents:
--   1. FASE 8 section extracted VERBATIM from supabase/schema.sql
--      (from the "FASE 8 - Multi-tenant" banner through "-- End of FASE 8").
--   2. MT-003 hardening (appended 2026-09-29): tightens the three legacy
--      "owners manage own ..." policies on progress / lesson_completions /
--      vocabulary_stats to personal rows only (org_id is null), closing the
--      tenant-isolation gap found in the FASE 8 static review. Without this,
--      a user could INSERT/UPDATE rows tagged with another org's org_id
--      because permissive RLS policies combine with OR.
--   3. MT-002b (appended 2026-09-29, Worker B finding): replaces the
--      (user_id, word_key) primary keys on progress / vocabulary_stats with
--      tenant-aware unique constraints on (user_id, word_key, org_key),
--      where org_key is a generated COALESCE(org_id, zero-uuid) column, so
--      per-tenant word rows upsert independently. Client upserts must use
--      on_conflict=user_id,word_key,org_key (see section for the contract).
-- ===========================================================================

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

-- ---------------------------------------------------------------------------
-- MT-003 hardening (part of this migration) - closes the tenant-isolation
-- gap left by the pre-existing owner-only policies from the base schema.
--
-- GAP (found in static review, 2026-09-29): the original
-- "owners manage own ..." FOR ALL policies only checked auth.uid() = user_id
-- and ignored org_id. RLS combines permissive policies with OR, so a user
-- could:
--   * INSERT a row with org_id of an org they are NOT a member of
--     (old WITH CHECK passed on auth.uid() = user_id alone), and
--   * UPDATE one of their rows to move it into a foreign org.
-- The new tenant policies alone do not block this because the old policy
-- already permits it.
--
-- FIX: restrict the legacy owner policies to personal rows (org_id is null).
-- Org rows (org_id not null) are then governed EXCLUSIVELY by the tenant
-- policies above (member read / member own-insert / admin update+delete).
-- The profiles policy is untouched (profiles has no org_id column).
-- Idempotent: drop-if-exists + recreate.
-- ---------------------------------------------------------------------------

drop policy if exists "owners manage own progress" on progress;
create policy "owners manage own progress"
  on progress for all
  using (auth.uid() = user_id and org_id is null)
  with check (auth.uid() = user_id and org_id is null);

drop policy if exists "owners manage own lesson completions" on lesson_completions;
create policy "owners manage own lesson completions"
  on lesson_completions for all
  using (auth.uid() = user_id and org_id is null)
  with check (auth.uid() = user_id and org_id is null);

drop policy if exists "owners manage own vocabulary stats" on vocabulary_stats;
create policy "owners manage own vocabulary stats"
  on vocabulary_stats for all
  using (auth.uid() = user_id and org_id is null)
  with check (auth.uid() = user_id and org_id is null);

-- End of MT-003 hardening.

-- ---------------------------------------------------------------------------
-- MT-002b -- tenant-aware uniqueness for word-keyed tables (Worker B finding,
-- appended 2026-09-29).
--
-- FINDING: progress and vocabulary_stats carried PRIMARY KEY (user_id, word_key)
-- with no org_id. A tenant-scoped upsert (PostgREST on_conflict=user_id,word_key)
-- for a word under an org would collide with the same user's PERSONAL row for
-- that word and UPDATE it (even flipping its org_id) instead of creating a
-- separate per-tenant row. True per-tenant word rows need a tenant-aware
-- conflict target.
--
-- FIX: replace the (user_id, word_key) primary keys with a tenant-aware unique
-- constraint over (user_id, word_key, org_key), where org_key is a STORED
-- generated column = COALESCE(org_id, <zero-uuid sentinel>). Plain columns
-- only -- deliberately NOT an expression index or partial indexes, because
-- PostgREST on_conflict can only name plain columns; an expression index
-- could not serve as the client's upsert conflict target.
--
-- CLIENT CONTRACT (for cloudSync.ts integration): upserts on progress and
-- vocabulary_stats must use:
--     on_conflict=user_id,word_key,org_key
-- (replacing the old on_conflict=user_id,word_key). The client does NOT send
-- org_key -- it is generated server-side from org_id; it appears ONLY in the
-- conflict target. Personal rows (org_id NULL) map to the zero-uuid sentinel,
-- so "one personal row per (user, word)" is still enforced exactly as before.
--
-- Idempotent: add-column-if-not-exists, guarded PK drop, drop-constraint-if-
-- exists + add. Safe on existing data: the old PK already guaranteed
-- (user_id, word_key) uniqueness, so the finer tenant key cannot collide.
-- lesson_completions is untouched (its PK is a surrogate id; no word-keyed
-- upsert conflict exists there).
-- ---------------------------------------------------------------------------

-- progress
alter table progress
  add column if not exists org_key uuid
  generated always as (coalesce(org_id, '00000000-0000-0000-0000-000000000000'::uuid)) stored;

do $$
begin
  if exists (
    select 1 from pg_constraint
    where conname = 'progress_pkey'
      and conrelid = 'progress'::regclass
      and contype = 'p'
  ) then
    alter table progress drop constraint progress_pkey;
  end if;
end $$;

alter table progress drop constraint if exists progress_user_word_org_uniq;
alter table progress
  add constraint progress_user_word_org_uniq
  unique (user_id, word_key, org_key);

-- vocabulary_stats
alter table vocabulary_stats
  add column if not exists org_key uuid
  generated always as (coalesce(org_id, '00000000-0000-0000-0000-000000000000'::uuid)) stored;

do $$
begin
  if exists (
    select 1 from pg_constraint
    where conname = 'vocabulary_stats_pkey'
      and conrelid = 'vocabulary_stats'::regclass
      and contype = 'p'
  ) then
    alter table vocabulary_stats drop constraint vocabulary_stats_pkey;
  end if;
end $$;

alter table vocabulary_stats drop constraint if exists vocabulary_stats_user_word_org_uniq;
alter table vocabulary_stats
  add constraint vocabulary_stats_user_word_org_uniq
  unique (user_id, word_key, org_key);

-- Let PostgREST pick up the new columns/constraints without a restart
-- (no-op if nothing is listening).
notify pgrst, 'reload schema';

-- End of MT-002b.
