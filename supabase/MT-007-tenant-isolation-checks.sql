-- ===========================================================================
-- MT-007 — Tenant isolation verification script (FASE 8 multi-tenant)
--
-- WHAT:  runnable, commented verification of the MT-003 RLS tenant isolation:
--        2 orgs x 2 users matrix. User A owns org1, user B owns org2.
--        Checks that A cannot SELECT/INSERT/UPDATE/DELETE org2's learning
--        rows, that non-members cannot read memberships, that the last owner
--        cannot be removed, and that expired/used invites are rejected.
--
-- STATUS: for LATER live use only. Do NOT run against production data you
--        care about. It creates throwaway orgs/rows/invites inside ONE
--        transaction that is ROLLED BACK at the end, so nothing persists —
--        but only if your SQL client honors the explicit transaction
--        (the Supabase SQL editor does). After running, confirm no
--        'mt7-' rows remain in organizations / progress / org_invites.
--
-- HOW TO RUN (Supabase SQL editor, on a STAGING project first):
--   1. Create two throwaway auth users (sign up in the app twice, or
--      Authentication > Users > Add user). Copy their UUIDs.
--   2. Paste the UUIDs into USER_A / USER_B in the params block below.
--   3. Run the WHOLE script at once. Read the PASS/FAIL table at the end.
--   4. The final ROLLBACK discards all test data.
--
-- HOW IT WORKS: the script impersonates each user by spoofing
--        request.jwt.claim.sub / request.jwt.claims (which is what
--        auth.uid() reads) and dropping to the `authenticated` role so that
--        RLS is actually enforced (a superuser session would bypass RLS).
--
-- NOTE: checks 02/03/06/07 specifically validate the MT-003 HARDENING in
--       migrations/20260929_fase8_multitenant.sql (legacy "owners manage own"
--       policies tightened to org_id is null). On the UNHARDENED schema those
--       four checks FAIL (the malicious INSERT/UPDATE succeeds) — which is
--       exactly the gap the hardening closes. Check 16 validates the MT-002b
--       tenant-aware uniqueness (same word as personal + org row coexist).
-- ===========================================================================

begin;

-- ---------------------------------------------------------------------------
-- Params: replace with two real throwaway user UUIDs before running.
-- ---------------------------------------------------------------------------
create temporary table _mt7 (
  user_a uuid,   -- owner of org1
  user_b uuid,   -- owner of org2
  org1   uuid,
  org2   uuid
);
insert into _mt7 values (
  '11111111-1111-1111-1111-111111111111',  -- USER_A: replace me
  '22222222-2222-2222-2222-222222222222',  -- USER_B: replace me
  '0a0a0a0a-0a0a-4a0a-8a0a-0a0a0a0a0a0a',  -- org1 (fixed test id)
  '0b0b0b0b-0b0b-4b0b-8b0b-0b0b0b0b0b0b'   -- org2 (fixed test id)
);

-- Results table: every check below appends one row here.
create temporary table _mt7_results (
  check_name text,
  passed     boolean,
  detail     text
);
-- The checks run as role `authenticated`, so it needs access to the
-- session-local temp tables (temp tables are still permission-checked).
grant all on _mt7, _mt7_results to authenticated;

-- ---------------------------------------------------------------------------
-- Setup (runs as the session superuser, BEFORE we drop privileges).
-- ---------------------------------------------------------------------------
insert into organizations (id, name, slug)
  select org1, 'MT7 Org One', 'mt7-org-one' from _mt7
  union all
  select org2, 'MT7 Org Two', 'mt7-org-two' from _mt7;

insert into memberships (org_id, user_id, role)
  select org1, user_a, 'owner' from _mt7
  union all
  select org2, user_b, 'owner' from _mt7;

-- Seed learning rows: A has a row in org1, B has a row in org2.
insert into progress (user_id, word_key, known, org_id)
  select user_a, 'mt7-apple',  false, org1 from _mt7
  union all
  select user_b, 'mt7-banana', false, org2 from _mt7;

insert into lesson_completions (user_id, lesson_id, score, org_id)
  select user_a, 'mt7-lesson-1', 80, org1 from _mt7
  union all
  select user_b, 'mt7-lesson-2', 90, org2 from _mt7;

insert into vocabulary_stats (user_id, word_key, correct, wrong, org_id)
  select user_a, 'mt7-dog',    5, 0, org1 from _mt7
  union all
  select user_b, 'mt7-cherry', 3, 1, org2 from _mt7;

-- Two invites for org1: one already expired, one fresh. The fresh invite is
-- deliberately addressed to someone else's email: the link-invite design does
-- NOT check email on accept (anyone holding the token joins), so accepting it
-- as user A is EXPECTED to succeed — that is the documented behavior, not a bug.
insert into org_invites (org_id, email, token, expires_at)
  select org1, 'expired@example.com',      'mt7-expired-token', now() - interval '1 day'  from _mt7
  union all
  select org1, 'someone-else@example.com', 'mt7-fresh-token',   now() + interval '7 days' from _mt7;

-- ---------------------------------------------------------------------------
-- Drop to the `authenticated` role from here on: RLS is now enforced and
-- auth.uid() returns whatever we spoof via request.jwt.claim.* below.
-- ---------------------------------------------------------------------------
set local role authenticated;

-- 00 — positive control: A sees exactly their own + org1 rows, nothing else.
do $$
declare v_a uuid; v_cnt int; v_org2_rows int;
begin
  select user_a into v_a from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  select count(*) into v_cnt from progress;                       -- all visible rows
  select count(*) into v_org2_rows from progress p
    join _mt7 m on p.org_id = m.org2;                             -- org2 rows visible
  insert into _mt7_results values (
    '00 A sees only own+org1 progress rows (positive control)',
    v_cnt = 1 and v_org2_rows = 0,
    'visible=' || v_cnt || ', org2-visible=' || v_org2_rows || ' (expect 1 / 0)');
end $$;

-- 01 — A cannot SELECT org2's progress rows.
do $$
declare v_a uuid; v_cnt int;
begin
  select user_a into v_a from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  select count(*) into v_cnt from progress p join _mt7 m on p.org_id = m.org2;
  insert into _mt7_results values (
    '01 A cannot SELECT org2 progress rows',
    v_cnt = 0, 'saw ' || v_cnt || ' rows (expect 0)');
end $$;

-- 02 — A cannot INSERT a progress row tagged with org2 (not a member).
--      HARDENING check: fails on the unhardened schema.
do $$
declare v_a uuid; v_o2 uuid;
begin
  select user_a, org2 into v_a, v_o2 from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  begin
    insert into progress (user_id, word_key, org_id)
    values (v_a, 'mt7-evil', v_o2);
    insert into _mt7_results values (
      '02 A cannot INSERT progress row into org2', false,
      'INSERT unexpectedly SUCCEEDED — tenant isolation gap!');
  exception when others then
    insert into _mt7_results values (
      '02 A cannot INSERT progress row into org2', true,
      'rejected: ' || sqlerrm);
  end;
end $$;

-- 03 — A cannot UPDATE their own row to move it into org2.
--      HARDENING check: fails on the unhardened schema.
do $$
declare v_a uuid; v_o2 uuid;
begin
  select user_a, org2 into v_a, v_o2 from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  begin
    update progress set org_id = v_o2 where user_id = v_a and word_key = 'mt7-apple';
    insert into _mt7_results values (
      '03 A cannot move own row into org2 via UPDATE', false,
      'UPDATE unexpectedly SUCCEEDED — tenant isolation gap!');
  exception when others then
    insert into _mt7_results values (
      '03 A cannot move own row into org2 via UPDATE', true,
      'rejected: ' || sqlerrm);
  end;
end $$;

-- 04 — A cannot UPDATE org2's rows (RLS hides them: 0 rows affected, no error).
do $$
declare v_a uuid; v_n int;
begin
  select user_a into v_a from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  update progress set known = true
    where org_id = (select org2 from _mt7) and word_key = 'mt7-banana';
  get diagnostics v_n = row_count;
  insert into _mt7_results values (
    '04 A UPDATE of org2 row touches 0 rows',
    v_n = 0, 'rows affected=' || v_n || ' (expect 0)');
end $$;

-- 05 — A cannot DELETE org2's rows (same: 0 rows affected).
do $$
declare v_a uuid; v_n int;
begin
  select user_a into v_a from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  delete from progress
    where org_id = (select org2 from _mt7) and word_key = 'mt7-banana';
  get diagnostics v_n = row_count;
  insert into _mt7_results values (
    '05 A DELETE of org2 row touches 0 rows',
    v_n = 0, 'rows affected=' || v_n || ' (expect 0)');
end $$;

-- 06 — A cannot INSERT a lesson_completions row into org2. HARDENING check.
do $$
declare v_a uuid; v_o2 uuid;
begin
  select user_a, org2 into v_a, v_o2 from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  begin
    insert into lesson_completions (user_id, lesson_id, org_id)
    values (v_a, 'mt7-evil-lesson', v_o2);
    insert into _mt7_results values (
      '06 A cannot INSERT lesson_completions row into org2', false,
      'INSERT unexpectedly SUCCEEDED — tenant isolation gap!');
  exception when others then
    insert into _mt7_results values (
      '06 A cannot INSERT lesson_completions row into org2', true,
      'rejected: ' || sqlerrm);
  end;
end $$;

-- 07 — A cannot INSERT a vocabulary_stats row into org2. HARDENING check.
do $$
declare v_a uuid; v_o2 uuid;
begin
  select user_a, org2 into v_a, v_o2 from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  begin
    insert into vocabulary_stats (user_id, word_key, org_id)
    values (v_a, 'mt7-evil-word', v_o2);
    insert into _mt7_results values (
      '07 A cannot INSERT vocabulary_stats row into org2', false,
      'INSERT unexpectedly SUCCEEDED — tenant isolation gap!');
  exception when others then
    insert into _mt7_results values (
      '07 A cannot INSERT vocabulary_stats row into org2', true,
      'rejected: ' || sqlerrm);
  end;
end $$;

-- 08 — B (not a member of org1) cannot read org1's memberships.
do $$
declare v_b uuid; v_cnt int;
begin
  select user_b into v_b from _mt7;
  perform set_config('request.jwt.claim.sub', v_b::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_b::text, 'role', 'authenticated')::text, true);
  select count(*) into v_cnt from memberships m
    where m.org_id = (select org1 from _mt7);
  insert into _mt7_results values (
    '08 non-member B cannot read org1 memberships',
    v_cnt = 0, 'saw ' || v_cnt || ' rows (expect 0)');
end $$;

-- 09 — A cannot write memberships directly (no insert/update/delete policies).
do $$
declare v_a uuid; v_o2 uuid;
begin
  select user_a, org2 into v_a, v_o2 from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  begin
    insert into memberships (org_id, user_id, role)
    values (v_o2, v_a, 'member');
    insert into _mt7_results values (
      '09 A cannot INSERT into memberships directly', false,
      'INSERT unexpectedly SUCCEEDED — membership writes must go via RPCs!');
  exception when others then
    insert into _mt7_results values (
      '09 A cannot INSERT into memberships directly', true,
      'rejected: ' || sqlerrm);
  end;
end $$;

-- 10 — B cannot read org1's invites (admin-only SELECT); A (owner) can.
do $$
declare v_b uuid; v_cnt_b int; v_cnt_a int; v_a uuid;
begin
  select user_b into v_b from _mt7;
  perform set_config('request.jwt.claim.sub', v_b::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_b::text, 'role', 'authenticated')::text, true);
  select count(*) into v_cnt_b from org_invites i
    where i.org_id = (select org1 from _mt7);
  select user_a into v_a from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  select count(*) into v_cnt_a from org_invites i
    where i.org_id = (select org1 from _mt7);
  insert into _mt7_results values (
    '10 invite SELECT: non-admin B sees 0, owner A sees invites',
    v_cnt_b = 0 and v_cnt_a >= 1,
    'B saw ' || v_cnt_b || ', A saw ' || v_cnt_a || ' (expect 0 / >=1)');
end $$;

-- 11 — expired invite is rejected.
do $$
declare v_a uuid; v_oid uuid;
begin
  select user_a into v_a from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  begin
    select public.accept_org_invite('mt7-expired-token') into v_oid;
    insert into _mt7_results values (
      '11 expired invite rejected', false,
      'accept unexpectedly SUCCEEDED');
  exception when others then
    insert into _mt7_results values (
      '11 expired invite rejected',
      sqlerrm like '%expired%',
      'got: ' || sqlerrm);
  end;
end $$;

-- 12 — fresh invite CAN be accepted by A even though it is addressed to
--      someone-else@example.com. EXPECTED SUCCESS: the link-invite design
--      intentionally does not check email (token is the bearer credential).
do $$
declare v_a uuid; v_oid uuid; v_o1 uuid;
begin
  select user_a, org1 into v_a, v_o1 from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  begin
    select public.accept_org_invite('mt7-fresh-token') into v_oid;
    insert into _mt7_results values (
      '12 fresh invite accepted without email check (link-invite design)',
      v_oid = v_o1,
      'returned org matches org1: ' || (v_oid = v_o1)::text);
  exception when others then
    insert into _mt7_results values (
      '12 fresh invite accepted without email check (link-invite design)',
      false, 'unexpected failure: ' || sqlerrm);
  end;
end $$;

-- 13 — the same token cannot be used twice.
do $$
declare v_a uuid;
begin
  select user_a into v_a from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  begin
    perform public.accept_org_invite('mt7-fresh-token');
    insert into _mt7_results values (
      '13 used invite rejected on second accept', false,
      'second accept unexpectedly SUCCEEDED');
  exception when others then
    insert into _mt7_results values (
      '13 used invite rejected on second accept',
      sqlerrm like '%already used%',
      'got: ' || sqlerrm);
  end;
end $$;

-- 14 — the last owner cannot be removed (A is org1's only owner; A tries to
--      remove themself and must be stopped by the RPC guard).
do $$
declare v_a uuid; v_o1 uuid;
begin
  select user_a, org1 into v_a, v_o1 from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  begin
    perform public.remove_org_member(v_o1, v_a);
    insert into _mt7_results values (
      '14 last owner cannot be removed', false,
      'remove unexpectedly SUCCEEDED — org would be ownerless!');
  exception when others then
    insert into _mt7_results values (
      '14 last owner cannot be removed',
      sqlerrm like '%last owner%',
      'got: ' || sqlerrm);
  end;
end $$;

-- 15 — positive control: A CAN insert their own row into org1 (member write path).
do $$
declare v_a uuid; v_o1 uuid;
begin
  select user_a, org1 into v_a, v_o1 from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  begin
    insert into progress (user_id, word_key, org_id)
    values (v_a, 'mt7-legit', v_o1);
    insert into _mt7_results values (
      '15 A CAN insert own row into org1 (positive control)', true,
      'insert succeeded as expected');
  exception when others then
    insert into _mt7_results values (
      '15 A CAN insert own row into org1 (positive control)', false,
      'unexpected failure: ' || sqlerrm);
  end;
end $$;

-- 16 — tenant-aware upsert (MT-002b): the same word as a personal row AND as
--      an org row must coexist as TWO rows; the org upsert must not clobber
--      the personal row. Uses the same conflict target the client will use:
--      (user_id, word_key, org_key).
do $$
declare v_a uuid; v_o1 uuid; v_cnt int;
begin
  select user_a, org1 into v_a, v_o1 from _mt7;
  perform set_config('request.jwt.claim.sub', v_a::text, true);
  perform set_config('request.jwt.claims',
    json_build_object('sub', v_a::text, 'role', 'authenticated')::text, true);
  begin
    -- personal row (org_id null)
    insert into progress (user_id, word_key, known, org_id)
    values (v_a, 'mt7-dup-word', false, null)
    on conflict (user_id, word_key, org_key)
    do update set known = excluded.known;
    -- same word, org row: must INSERT a second row, not touch the personal one
    insert into progress (user_id, word_key, known, org_id)
    values (v_a, 'mt7-dup-word', true, v_o1)
    on conflict (user_id, word_key, org_key)
    do update set known = excluded.known;
    select count(*) into v_cnt from progress
      where user_id = v_a and word_key = 'mt7-dup-word';
    insert into _mt7_results values (
      '16 tenant-aware upsert keeps personal + org rows separate',
      v_cnt = 2,
      'rows for (A, mt7-dup-word)=' || v_cnt || ' (expect 2)');
  exception when others then
    insert into _mt7_results values (
      '16 tenant-aware upsert keeps personal + org rows separate',
      false, 'unexpected failure: ' || sqlerrm);
  end;
end $$;

-- ---------------------------------------------------------------------------
-- Report, then roll everything back.
-- ---------------------------------------------------------------------------select check_name,
       case when passed then 'PASS' else 'FAIL' end as result,
       detail
from _mt7_results
order by check_name;

select count(*) filter (where passed)  as passed,
       count(*) filter (where not passed) as failed,
       count(*) as total
from _mt7_results;

rollback;
-- End of MT-007. If you see this, the transaction was rolled back and no
-- test data persists. Double-check: no 'mt7-' rows should remain in
-- organizations / progress / lesson_completions / vocabulary_stats /
-- org_invites / memberships.
