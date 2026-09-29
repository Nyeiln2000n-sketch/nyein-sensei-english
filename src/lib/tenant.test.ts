import { describe, it, expect } from 'vitest';
import {
  roleRank,
  canManageMembers,
  canInvite,
  canDeleteOrg,
  slugifyOrgName,
  isValidInviteToken,
  tenantScopeParam,
  describeTenant,
  type ActiveTenant,
  type Organization,
  type OrgRole,
} from './tenant';

function mkOrg(id: string, name: string): Organization {
  return { id, name, slug: 's', plan: 'free', created_by: null, created_at: '' };
}

describe('roleRank', () => {
  it('ranks member < admin < owner', () => {
    expect(roleRank('member')).toBe(1);
    expect(roleRank('admin')).toBe(2);
    expect(roleRank('owner')).toBe(3);
    expect(roleRank('admin')).toBeGreaterThan(roleRank('member'));
    expect(roleRank('owner')).toBeGreaterThan(roleRank('admin'));
  });

  it('returns 0 for unknown roles', () => {
    expect(roleRank('superuser' as OrgRole)).toBe(0);
  });
});

describe('permissions', () => {
  it('canManageMembers: admin and owner yes, member no', () => {
    expect(canManageMembers('owner')).toBe(true);
    expect(canManageMembers('admin')).toBe(true);
    expect(canManageMembers('member')).toBe(false);
  });

  it('canInvite mirrors canManageMembers', () => {
    expect(canInvite).toBe(canManageMembers);
    expect(canInvite('admin')).toBe(true);
    expect(canInvite('member')).toBe(false);
  });

  it('canDeleteOrg: only the owner', () => {
    expect(canDeleteOrg('owner')).toBe(true);
    expect(canDeleteOrg('admin')).toBe(false);
    expect(canDeleteOrg('member')).toBe(false);
  });
});

describe('slugifyOrgName', () => {
  it('lowercases and converts whitespace to dashes', () => {
    expect(slugifyOrgName('My Awesome Org 123')).toBe('my-awesome-org-123');
  });

  it('strips punctuation, collapses and trims dashes', () => {
    expect(slugifyOrgName('  ---Hello___World!!---  ')).toBe('helloworld');
    expect(slugifyOrgName('a   b')).toBe('a-b');
  });

  it('falls back to "org" when nothing URL-safe survives', () => {
    expect(slugifyOrgName('')).toBe('org');
    expect(slugifyOrgName('   ')).toBe('org');
    expect(slugifyOrgName('မြန်မာအဖွဲ့')).toBe('org'); // non-Latin script
    expect(slugifyOrgName('---')).toBe('org');
  });
});

describe('isValidInviteToken', () => {
  const valid = 'a'.repeat(48);

  it('accepts exactly 48 lowercase hex chars', () => {
    expect(isValidInviteToken(valid)).toBe(true);
    expect(isValidInviteToken('0123456789abcdef'.repeat(3))).toBe(true);
  });

  it('rejects wrong length, uppercase, non-hex and empty', () => {
    expect(isValidInviteToken('a'.repeat(47))).toBe(false);
    expect(isValidInviteToken('a'.repeat(49))).toBe(false);
    expect(isValidInviteToken('A'.repeat(48))).toBe(false);
    expect(isValidInviteToken('g'.repeat(48))).toBe(false);
    expect(isValidInviteToken('')).toBe(false);
    expect(isValidInviteToken('  ' + valid)).toBe(false);
  });
});

describe('tenantScopeParam', () => {
  it('produces the PostgREST null filter for personal', () => {
    const t: ActiveTenant = { kind: 'personal' };
    expect(tenantScopeParam(t)).toBe('is.null');
  });

  it('produces the equality filter for an org', () => {
    const t: ActiveTenant = { kind: 'org', orgId: 'org-uuid-123' };
    expect(tenantScopeParam(t)).toBe('eq.org-uuid-123');
  });
});

describe('describeTenant', () => {
  it('labels personal tenants in Myanmar', () => {
    expect(describeTenant({ kind: 'personal' }, [])).toBe('ကိုယ်ပိုင်');
  });

  it('uses the org name when known, else a generic Myanmar label', () => {
    const orgs = [mkOrg('o1', 'Acme School')];
    expect(describeTenant({ kind: 'org', orgId: 'o1' }, orgs)).toBe('Acme School');
    expect(describeTenant({ kind: 'org', orgId: 'unknown' }, orgs)).toBe('အဖွဲ့အစည်း');
  });
});
