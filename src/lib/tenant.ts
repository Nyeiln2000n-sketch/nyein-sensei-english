// Multi-tenant client library — organizations, memberships, invites, active tenant.
//
// FASE 8. Talks to the multi-tenant contract via the shared REST helper:
//   Tables: organizations, memberships, org_invites (learning tables carry a
//   nullable org_id; NULL = personal).
//   RPCs: create_org(p_name), accept_org_invite(p_token),
//         set_org_member_role(p_org_id, p_user_id, p_role),
//         remove_org_member(p_org_id, p_user_id).
//
// Conventions (copied from src/lib/supabase.ts + src/lib/auth.ts):
// - REST via supabaseRest(path, init) — returns the raw Response; this module
//   checks res.ok and throws Error with a Myanmar-first message that includes
//   the HTTP status for debuggability.
// - SupabaseNetworkError (offline/DNS) propagates untouched from supabaseRest.
// - Zero new dependencies.
//
// NOTE on the supabaseRest import: it is loaded lazily (dynamic import) so
// this module stays importable in plain Node unit tests — the Supabase
// URL/key globals only exist under Vite, and a static import would also
// break Node ESM resolution (extensionless specifier).

import { t as ti18n } from './i18n';

export type OrgRole = 'owner' | 'admin' | 'member';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: string;
  created_by: string | null;
  created_at: string;
}

export interface Membership {
  org_id: string;
  user_id: string;
  role: OrgRole;
  joined_at: string;
  organization?: Organization;
}

export interface OrgInvite {
  id: string;
  org_id: string;
  email: string;
  token: string;
  role: OrgRole;
  expires_at: string;
  used_at: string | null;
  created_at: string;
}

/** Which scope the app is currently learning in: personal, or one org. */
export type ActiveTenant = { kind: 'personal' } | { kind: 'org'; orgId: string };

// ---------------------------------------------------------------------------
// REST helpers
// ---------------------------------------------------------------------------

/**
 * supabaseRest is loaded lazily so this module stays importable in plain
 * Node unit tests (the Supabase URL/key globals only exist under Vite).
 */
async function rest(path: string, init: RequestInit = {}): Promise<Response> {
  const { supabaseRest } = await import('./supabase');
  return supabaseRest(path, init);
}

/** Build a Myanmar-first error that keeps the HTTP status for debugging. */
async function httpError(res: Response, whatMy: string): Promise<Error> {
  const detail = await res.text().catch(() => '');
  return new Error(
    ti18n('err_tenant.operation_failed_http', {
      what: whatMy,
      status: res.status,
      detail: detail ? ` [${detail.slice(0, 120)}]` : '',
    }),
  );
}

async function readJson<T>(res: Response): Promise<T> {
  return (await res.json()) as T;
}

/** PostgREST may return a single row as an object or a one-element array. */
function firstRow<T>(data: unknown): T | null {
  if (Array.isArray(data)) return (data[0] as T) ?? null;
  if (data && typeof data === 'object') return data as T;
  return null;
}

/**
 * List the organizations the signed-in user belongs to.
 * RLS restricts the rows to member orgs; ordered oldest first.
 */
export async function listMyOrgs(): Promise<Organization[]> {
  const res = await rest('organizations?select=*&order=created_at.asc');
  if (!res.ok) {
    throw await httpError(res, ti18n('err_tenant.try_again'));
  }
  return readJson<Organization[]>(res);
}

/** List the signed-in user's memberships with the org rows embedded. */
export async function listMyMemberships(): Promise<Membership[]> {
  const res = await rest(
    'memberships?select=*,organization:organizations(*)&order=joined_at',
  );
  if (!res.ok) {
    throw await httpError(res, ti18n('err_tenant.list_try_again'));
  }
  return readJson<Membership[]>(res);
}

/**
 * Create an organization via the create_org RPC. The caller becomes owner
 * (server-side). Returns the created organization row.
 */
export async function createOrganization(name: string): Promise<Organization> {
  const res = await rest('rpc/create_org', {
    method: 'POST',
    body: JSON.stringify({ p_name: name }),
  });
  if (!res.ok) {
    throw await httpError(res, ti18n('err_tenant.organization_try_again'));
  }
  const row = firstRow<Organization>(await readJson<unknown>(res));
  if (!row) {
    throw new Error(ti18n('err_tenant.organization_response'));
  }
  return row;
}

/**
 * Create an invite for an org (admin/owner only, enforced by RLS).
 * Returns the created invite row (includes the token).
 */
export async function createInvite(
  orgId: string,
  email: string,
  role: OrgRole,
): Promise<OrgInvite> {
  const res = await rest('org_invites', {
    method: 'POST',
    body: JSON.stringify({ org_id: orgId, email, role }),
  });
  if (!res.ok) {
    throw await httpError(res, ti18n('err_tenant.invite_create_failed'));
  }
  const row = firstRow<OrgInvite>(await readJson<unknown>(res));
  if (!row) {
    throw new Error(ti18n('err_tenant.invitation_response'));
  }
  return row;
}

/** List pending (unused) invites for an org, newest first (admin/owner only). */
export async function listInvites(orgId: string): Promise<OrgInvite[]> {
  const res = await rest(
    `org_invites?org_id=eq.${orgId}&used_at=is.null&order=created_at.desc`,
  );
  if (!res.ok) {
    throw await httpError(res, ti18n('err_tenant.invite_list_try_again'));
  }
  return readJson<OrgInvite[]>(res);
}

/** Revoke (delete) an invite by id. Expects 200/204. */
export async function revokeInvite(inviteId: string): Promise<void> {
  const res = await rest(`org_invites?id=eq.${inviteId}`, { method: 'DELETE' });
  if (!res.ok) {
    throw await httpError(res, ti18n('err_tenant.invitation_try_again'));
  }
}

/**
 * Shareable invite link for a token. Falls back to a bare hash route when
 * there is no browser location (SSR / tests).
 */
export function inviteLink(token: string): string {
  if (typeof location !== 'undefined' && location.origin) {
    return `${location.origin}${location.pathname}#/invite/${token}`;
  }
  return `#/invite/${token}`;
}

/**
 * Accept an invite via the accept_org_invite RPC. Returns the org id
 * (uuid string) the invite granted membership to.
 */
export async function acceptInvite(token: string): Promise<string> {
  const res = await rest('rpc/accept_org_invite', {
    method: 'POST',
    body: JSON.stringify({ p_token: token }),
  });
  if (!res.ok) {
    throw await httpError(res, ti18n('err_tenant.invitation_check'));
  }
  const raw = (await res.text()).trim();
  let val: unknown = raw;
  try {
    val = JSON.parse(raw);
  } catch {
    /* plain-text response — use as-is */
  }
  const id = String(Array.isArray(val) ? (val[0] ?? '') : (val ?? '')).replace(
    /^"|"$/g,
    '',
  );
  if (!id) {
    throw new Error(ti18n('err_tenant.invite_accept_bad_response'));
  }
  return id;
}

/** List an org's members with basic org info embedded (admin/owner only). */
export async function listMembers(orgId: string): Promise<Membership[]> {
  const res = await rest(
    `memberships?org_id=eq.${orgId}&select=*,organization:organizations(id,name)&order=joined_at`,
  );
  if (!res.ok) {
    throw await httpError(res, ti18n('err_tenant.members_list_try_again'));
  }
  return readJson<Membership[]>(res);
}

/**
 * Change a member's role via the set_org_member_role RPC.
 * Returns true when the server confirmed the change.
 */
export async function setMemberRole(
  orgId: string,
  userId: string,
  role: OrgRole,
): Promise<boolean> {
  const res = await rest('rpc/set_org_member_role', {
    method: 'POST',
    body: JSON.stringify({ p_org_id: orgId, p_user_id: userId, p_role: role }),
  });
  if (!res.ok) {
    throw await httpError(res, ti18n('err_tenant.role_try_again'));
  }
  return (await readJson<unknown>(res)) === true;
}

/** Remove a member from an org via the remove_org_member RPC. */
export async function removeMember(orgId: string, userId: string): Promise<void> {
  const res = await rest('rpc/remove_org_member', {
    method: 'POST',
    body: JSON.stringify({ p_org_id: orgId, p_user_id: userId }),
  });
  if (!res.ok) {
    throw await httpError(res, ti18n('err_tenant.member_try_again'));
  }
}

// ---------------------------------------------------------------------------
// Active-tenant local state (which scope the app learns in)
// ---------------------------------------------------------------------------

export const TENANT_KEY = 'nse-active-tenant';

/**
 * localStorage when available, else null. Gates on localStorage itself
 * (rather than window) so SSR is safe and tests can stub an in-memory shim.
 */
function storage(): Storage | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

function isActiveTenant(v: unknown): v is ActiveTenant {
  if (!v || typeof v !== 'object') return false;
  const t = v as { kind?: unknown; orgId?: unknown };
  if (t.kind === 'personal') return true;
  return t.kind === 'org' && typeof t.orgId === 'string' && t.orgId.length > 0;
}

/** The active learning scope; defaults to personal on any problem. */
export function getActiveTenant(): ActiveTenant {
  try {
    const raw = storage()?.getItem(TENANT_KEY);
    if (!raw) return { kind: 'personal' };
    const parsed: unknown = JSON.parse(raw);
    return isActiveTenant(parsed) ? parsed : { kind: 'personal' };
  } catch {
    return { kind: 'personal' };
  }
}

/** Persist the active learning scope. */
export function setActiveTenant(t: ActiveTenant): void {
  try {
    storage()?.setItem(TENANT_KEY, JSON.stringify(t));
  } catch {
    /* ignore storage errors */
  }
}

/** Clear the active scope (back to personal). */
export function clearActiveTenant(): void {
  try {
    storage()?.removeItem(TENANT_KEY);
  } catch {
    /* ignore storage errors */
  }
}

// ---------------------------------------------------------------------------
// Pure helpers — zero imports, fully unit-tested
// ---------------------------------------------------------------------------

/** Permission rank: member 1, admin 2, owner 3; unknown → 0. */
export function roleRank(r: OrgRole): number {
  switch (r) {
    case 'member':
      return 1;
    case 'admin':
      return 2;
    case 'owner':
      return 3;
    default:
      return 0;
  }
}

/** Admins and owners can manage members (invite, change roles, remove). */
export function canManageMembers(r: OrgRole): boolean {
  return roleRank(r) >= 2;
}

/** Inviting uses the same permission as managing members. */
export const canInvite: (r: OrgRole) => boolean = canManageMembers;

/** Only the owner can delete the organization. */
export function canDeleteOrg(r: OrgRole): boolean {
  return r === 'owner';
}

/**
 * Turn an org name into a URL-safe slug. Lowercase, whitespace → dash,
 * strip anything outside [a-z0-9-], collapse dashes, trim edge dashes.
 * Falls back to 'org' when nothing survives (empty, non-Latin, ...).
 */
export function slugifyOrgName(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'org';
}

/** Invite tokens are 48 lowercase hex chars. */
export function isValidInviteToken(t: string): boolean {
  return /^[0-9a-f]{48}$/.test(t);
}

/**
 * PostgREST filter fragment for learning-table queries under a tenant:
 * personal → `org_id=is.null`, org → `org_id=eq.<orgId>`.
 */
export function tenantScopeParam(t: ActiveTenant): string {
  return t.kind === 'org' ? `eq.${t.orgId}` : 'is.null';
}

/** Myanmar-first label for a tenant: personal → 'ကိုယ်ပိုင်', else org name. */
export function describeTenant(t: ActiveTenant, orgs: Organization[]): string {
  if (t.kind === 'personal') return ti18n('org.personal');
  return orgs.find((o) => o.id === t.orgId)?.name ?? ti18n('plan.organization');
}
