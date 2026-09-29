# MT-007 — Tenant Isolation Test Plan

FASE 8 multi-tenant. Covers: what the SQL enforces, what the unit tests
prove, and — explicitly — what still needs **live Supabase + Nyein's
involvement** before tenant isolation can be called verified.

Status key: **done in code** = written/reviewed here; **green** = passing in
this repo; **pending live** = needs a real Supabase project + real accounts.

---

## Part A — Worker A's SQL (supabase/schema.sql, MT-001 / MT-002 / MT-003)

Status: **done in code** (idempotent, safe to run twice). Live application to
the Supabase project is **pending verification** (this worker did not run the
live apply; confirm in the Supabase SQL editor / Table Editor).

### MT-001 — tables + RLS + membership RPCs

Tables (all with RLS enabled):

- `organizations (id uuid pk, name, slug unique, plan default 'free',
  created_by → auth.users, created_at)` — slug generated server-side by
  `create_org`, deduped `org`, `org-2`, …
- `memberships (org_id, user_id) pk, role check in
  ('owner','admin','member'), joined_at` — cascade deletes on both FKs.
- `org_invites (id uuid pk, org_id, email, token unique default
  encode(gen_random_bytes(24),'hex') — 48 lowercase hex chars, role,
  created_by, expires_at default now()+7d, used_at, created_at)` —
  cascade delete on org_id.

Helper functions (SECURITY DEFINER, avoids RLS recursion):
`is_org_member(p_org_id)`, `is_org_admin(p_org_id)`.

RLS policies:

| Table | Policy | Rule |
|---|---|---|
| organizations | org members read org | members can SELECT |
| organizations | authenticated create org | any authenticated INSERT with `created_by = auth.uid()` (real creation happens via the `create_org` RPC) |
| organizations | org admins update org | admins/owners UPDATE |
| organizations | org owners delete org | owners DELETE |
| memberships | org members read memberships | members SELECT — **no insert/update/delete policies**: all writes go through the RPCs |
| org_invites | org admins read/create/update/delete invites | admins/owners only; insert requires `created_by = auth.uid()` |

RPCs (SECURITY DEFINER, the only membership write path):

- `create_org(p_name)` — rejects unauthenticated + empty name; caller becomes
  **owner** of the new org.
- `accept_org_invite(p_token)` — rejects unauthenticated / unknown token /
  already-used / expired; inserts membership with the invited role, marks
  `used_at`. Returns the org id.
- `set_org_member_role(p_org_id, p_user_id, p_role)` — caller must be
  owner/admin; **admins can only change members**; nobody can change their own
  role; the **last owner cannot be demoted**.
- `remove_org_member(p_org_id, p_user_id)` — caller must be owner/admin;
  **admins can only remove members**; the **last owner cannot be removed**.

### MT-002 — tenant column on learning tables

`org_id uuid` (nullable; NULL = personal) added to `progress`,
`lesson_completions`, `vocabulary_stats`, with indexes on `(org_id)` and
`(org_id, user_id)`. On org delete: `set null` (learning rows survive as
personal).

### MT-003 — tenant-aware RLS on the learning tables

Added alongside the existing owner-only policies (PostgREST combines
permissive policies with OR):

- **SELECT**: org members can read org rows (`org_id is not null and
  is_org_member(org_id)`); personal rows (`org_id is null`) stay strictly
  owner-only.
- **INSERT**: personal rows require `user_id = auth.uid()`; org rows require
  `user_id = auth.uid()` **and** membership in that org.
- **UPDATE/DELETE**: org admins only (on org rows).

---

## Part B — Unit tests: src/lib/tenant.ts pure helpers (MT-007 client part)

Status: **done in code, green** — run `npm run test:tenant`.

`tools/tenant-test/run.mjs` compiles `src/lib/tenant.ts` with the repo's own
`typescript` (`npx tsc`) into a temp dir, runs 32 `node:assert` checks against
the compiled module, cleans up the temp dir, and exits non-zero on any compile
or test failure. Verified paths:

- Failure path: a forced wrong assertion → `31 passed, 1 failed`, exit code 1,
  temp dir removed.
- Compile-failure path: `npx tsc` error → `test:tenant failed: Command
  failed…`, exit code 1, temp dir removed.

### Covered

- `roleRank`: member→1, admin→2, owner→3, unknown→0.
- `canManageMembers` / `canInvite`: admin+owner true, member false; `canInvite`
  is the same permission function as `canManageMembers`.
- `canDeleteOrg`: owner only (admin/member false).
- `slugifyOrgName`: `'My School'`→`'my-school'`; `'!!!'`→`'org'`;
  Myanmar text (`'မြန်မာ'`)→`'org'` (non-Latin fallback); empty→`'org'`.
- `isValidInviteToken`: 48 lowercase hex true; 47 chars false; uppercase false;
  non-hex/empty false.
- `tenantScopeParam`: `{kind:'personal'}`→`'is.null'`;
  `{kind:'org', orgId:'org-42'}`→`'eq.org-42'`.
- `describeTenant`: personal→`'ကိုယ်ပိုင်'`; known org→its name;
  unknown org id→`'အဖွဲ့အစည်း'` fallback.
- `getActiveTenant` / `setActiveTenant` / `clearActiveTenant` round-trip with
  an in-memory `localStorage` stub: default personal on empty storage; org and
  personal round-trips (raw stored JSON asserted);
  **invalid stored JSON → personal default**; invalid shapes
  (`{"kind":"bogus"}`, empty `orgId`, `'null'`) → personal default;
  `clearActiveTenant` removes the key and returns personal.

### Explicitly NOT covered by the unit tests

Everything that touches the network or Supabase — `listMyOrgs`,
`listMyMemberships`, `createOrganization`, `createInvite`, `listInvites`,
`revokeInvite`, `acceptInvite`, `listMembers`, `setMemberRole`, `removeMember`,
the lazy `./supabase` dynamic import, and every RLS policy / RPC guard in
Part A. Those need the live checks in Part C.

Note: a sibling suite exists at `tools/tenant-unit-tests.mjs` +
`tools/run-tenant-tests.sh` (38 PASS, same helpers). The canonical entry point
for CI is `npm run test:tenant` → `tools/tenant-test/run.mjs`.

---

## Part C — Live checks (need live Supabase + Nyein's involvement)

Status: **all pending live**. Nothing here is verified until these run against
the real project with real accounts.

### Setup (once)

1. Apply `supabase/schema.sql` in the Supabase SQL editor; confirm the three
   tables + RPCs exist and RLS is enabled on all three.
2. Two real accounts (Nyein's + one test account, e.g. hers on another
   device/browser profile). Call them **User A** (owner of Org 1) and
   **User B** (owner of Org 2).

### Check 1 — 2 orgs × 2 users isolation matrix

| # | Action | Expected |
|---|---|---|
| 1.1 | User A `create_org('My School')` | org created; A is owner |
| 1.2 | User B `create_org('Family')` | org created; B is owner |
| 1.3 | A lists organizations (REST) | sees **only** Org 1 — Org 2 invisible |
| 1.4 | B lists organizations (REST) | sees **only** Org 2 — Org 1 invisible |
| 1.5 | A queries `memberships?org_id=eq.<org2>` | empty (RLS: not a member) |
| 1.6 | A writes a personal learning row (`org_id` null), B writes one; each queries their own | each sees only their own; **org members never see personal rows** (insert a second member into Org 1 and re-check) |
| 1.7 | A writes an org learning row for Org 1 | B cannot see it via any REST query |

### Check 2 — invite accept across accounts

| # | Action | Expected |
|---|---|---|
| 2.1 | A creates invite for B's email, role `member`, Org 1 | invite row visible to A; **invisible to B** before accept (B is not an admin of Org 1) |
| 2.2 | B accepts via `accept_org_invite(token)` from **B's own session** | B becomes `member` of Org 1; RPC returns Org 1 id; `used_at` set |
| 2.3 | B accepts the **same token again** | error: invite already used |
| 2.4 | A creates invite, waits past expiry (or manually sets `expires_at` in the past in SQL editor), B accepts | error: invite expired |
| 2.5 | After accept: B lists organizations | sees Org 1 **and** Org 2 |
| 2.6 | B (member) lists invites of Org 1 | empty/denied — invites are admin-only |
| 2.7 | B (member) tries `set_org_member_role` on another member | error: insufficient privileges |
| 2.8 | A promotes B to admin; B creates an invite | works (admins can invite) |
| 2.9 | B (admin) tries to change A's role | error: admins can only change member roles |
| 2.10 | A (owner) demotes B back to member; then A tries to demote self | error: cannot change your own role |
| 2.11 | A tries to remove self (last owner) | error: cannot remove the last owner |
| 2.12 | A (member-role row check): B (member) tries UPDATE on Org 1 name | denied by RLS |
| 2.13 | B (member) tries DELETE on Org 1 | denied by RLS |

### Check 3 — tenant-scoped learning data

| # | Action | Expected |
|---|---|---|
| 3.1 | B (member of Org 1) reads `progress?org_id=eq.<org1>` | sees other members' org rows (members read org rows) |
| 3.2 | B inserts a personal row (`org_id` null, own `user_id`) | succeeds |
| 3.3 | B inserts an org row for Org 2 (B's own org) | succeeds |
| 3.4 | B inserts an org row for Org 1 with **A's** `user_id` | denied (insert requires `user_id = auth.uid()`) |
| 3.5 | B (member, not admin) updates another member's Org 1 row | denied — org rows update/delete are admin-only |
| 3.6 | A (owner) deletes B's Org 1 row | succeeds |

### Sign-off

When every row in Check 1–3 passes on the live project, mark MT-007 **verified
live** (with date + who ran it) and only then tell Nyein tenant isolation is
done. Until then it is **done in code, pending live verification**.
