// Unit tests for src/lib/tenant.ts (pure helpers + tenant local state).
//
// Run via tools/run-tenant-tests.sh, which compiles tenant.ts with tsc and
// copies this file next to the compiled tenant.js, so './tenant.js' resolves.
//
// Plain Node: node:assert/strict only. Prints PASS lines; exits non-zero on
// any failure.

import { strict as assert } from 'node:assert';

import {
  TENANT_KEY,
  canDeleteOrg,
  canInvite,
  canManageMembers,
  clearActiveTenant,
  describeTenant,
  getActiveTenant,
  isValidInviteToken,
  roleRank,
  setActiveTenant,
  slugifyOrgName,
  tenantScopeParam,
} from './tenant.js';

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`PASS: ${name}`);
  } catch (err) {
    failed += 1;
    console.log(`FAIL: ${name}`);
    console.log(`      ${err instanceof Error ? err.message : String(err)}`);
  }
}

// ---- in-memory localStorage shim (tenant.ts gates on localStorage itself) --
function installShim() {
  const store = new Map();
  globalThis.localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    clear: () => store.clear(),
  };
}

// ---------------- roleRank ----------------
test('roleRank: member=1, admin=2, owner=3', () => {
  assert.equal(roleRank('member'), 1);
  assert.equal(roleRank('admin'), 2);
  assert.equal(roleRank('owner'), 3);
});

test('roleRank: ordering member < admin < owner', () => {
  assert.ok(roleRank('member') < roleRank('admin'));
  assert.ok(roleRank('admin') < roleRank('owner'));
});

test('roleRank: unknown role -> 0', () => {
  assert.equal(roleRank('superadmin'), 0);
  assert.equal(roleRank(''), 0);
  assert.equal(roleRank(undefined), 0);
});

// ---------------- permission matrix ----------------
const MATRIX = {
  member: { manage: false, invite: false, del: false },
  admin: { manage: true, invite: true, del: false },
  owner: { manage: true, invite: true, del: true },
};

for (const role of Object.keys(MATRIX)) {
  const want = MATRIX[role];
  test(`canManageMembers('${role}') = ${want.manage}`, () => {
    assert.equal(canManageMembers(role), want.manage);
  });
  test(`canInvite('${role}') = ${want.invite}`, () => {
    assert.equal(canInvite(role), want.invite);
  });
  test(`canDeleteOrg('${role}') = ${want.del}`, () => {
    assert.equal(canDeleteOrg(role), want.del);
  });
}

test('canInvite is the same permission as canManageMembers', () => {
  for (const role of ['owner', 'admin', 'member', 'bogus']) {
    assert.equal(canInvite(role), canManageMembers(role));
  }
});

// ---------------- slugifyOrgName ----------------
test("slugifyOrgName('My School!') -> 'my-school'", () => {
  assert.equal(slugifyOrgName('My School!'), 'my-school');
});
test("slugifyOrgName('') -> 'org'", () => {
  assert.equal(slugifyOrgName(''), 'org');
});
test("slugifyOrgName('   ') -> 'org'", () => {
  assert.equal(slugifyOrgName('   '), 'org');
});
test("slugifyOrgName('a--b') -> 'a-b'", () => {
  assert.equal(slugifyOrgName('a--b'), 'a-b');
});
test("slugifyOrgName('မြန်မာ') -> 'org' (non-Latin fallback)", () => {
  assert.equal(slugifyOrgName('မြန်မာ'), 'org');
});
test("slugifyOrgName('Café 123') -> 'caf-123'", () => {
  assert.equal(slugifyOrgName('Café 123'), 'caf-123');
});
test("slugifyOrgName('  Hello   World  ') -> 'hello-world'", () => {
  assert.equal(slugifyOrgName('  Hello   World  '), 'hello-world');
});
test("slugifyOrgName('---abc---') -> 'abc'", () => {
  assert.equal(slugifyOrgName('---abc---'), 'abc');
});

// ---------------- isValidInviteToken ----------------
test('isValidInviteToken: 48 lowercase hex -> true', () => {
  assert.equal(isValidInviteToken('a'.repeat(48)), true);
  assert.equal(
    isValidInviteToken('0123456789abcdef'.repeat(3)),
    true,
  );
});
test('isValidInviteToken: 47 chars -> false', () => {
  assert.equal(isValidInviteToken('a'.repeat(47)), false);
});
test('isValidInviteToken: 49 chars -> false', () => {
  assert.equal(isValidInviteToken('a'.repeat(49)), false);
});
test('isValidInviteToken: uppercase hex -> false', () => {
  assert.equal(isValidInviteToken('A'.repeat(48)), false);
});
test('isValidInviteToken: empty -> false', () => {
  assert.equal(isValidInviteToken(''), false);
});
test('isValidInviteToken: non-hex chars -> false', () => {
  assert.equal(isValidInviteToken('g'.repeat(48)), false);
  assert.equal(isValidInviteToken('z'.repeat(48)), false);
});

// ---------------- tenantScopeParam ----------------
test("tenantScopeParam(personal) -> 'is.null'", () => {
  assert.equal(tenantScopeParam({ kind: 'personal' }), 'is.null');
});
test("tenantScopeParam(org) -> 'eq.<orgId>'", () => {
  assert.equal(
    tenantScopeParam({ kind: 'org', orgId: 'abc-123' }),
    'eq.abc-123',
  );
});

// ---------------- describeTenant ----------------
const ORGS = [
  { id: 'o1', name: 'My School', slug: 'my-school', plan: 'free', created_by: null, created_at: '2026-01-01' },
  { id: 'o2', name: 'Family', slug: 'family', plan: 'free', created_by: null, created_at: '2026-01-02' },
];

test("describeTenant(personal) -> 'ကိုယ်ပိုင်'", () => {
  assert.equal(describeTenant({ kind: 'personal' }, ORGS), 'ကိုယ်ပိုင်');
});
test('describeTenant(org) -> org name lookup', () => {
  assert.equal(describeTenant({ kind: 'org', orgId: 'o2' }, ORGS), 'Family');
});
test("describeTenant(unknown org) -> 'အဖွဲ့အစည်း' fallback", () => {
  assert.equal(describeTenant({ kind: 'org', orgId: 'nope' }, ORGS), 'အဖွဲ့အစည်း');
  assert.equal(describeTenant({ kind: 'org', orgId: 'o1' }, []), 'အဖွဲ့အစည်း');
});

// ---------------- active-tenant local state ----------------
test('getActiveTenant: defaults to personal with empty storage', () => {
  installShim();
  globalThis.localStorage.clear();
  assert.deepEqual(getActiveTenant(), { kind: 'personal' });
});

test('getActiveTenant/setActiveTenant: org round-trip', () => {
  installShim();
  setActiveTenant({ kind: 'org', orgId: 'org-42' });
  assert.deepEqual(getActiveTenant(), { kind: 'org', orgId: 'org-42' });
  assert.equal(globalThis.localStorage.getItem(TENANT_KEY), '{"kind":"org","orgId":"org-42"}');
});

test('setActiveTenant: personal round-trip', () => {
  installShim();
  setActiveTenant({ kind: 'personal' });
  assert.deepEqual(getActiveTenant(), { kind: 'personal' });
});

test('getActiveTenant: corrupt JSON falls back to personal', () => {
  installShim();
  globalThis.localStorage.setItem(TENANT_KEY, '{not-json');
  assert.deepEqual(getActiveTenant(), { kind: 'personal' });
});

test('getActiveTenant: invalid shape falls back to personal', () => {
  installShim();
  globalThis.localStorage.setItem(TENANT_KEY, '{"kind":"bogus"}');
  assert.deepEqual(getActiveTenant(), { kind: 'personal' });
  globalThis.localStorage.setItem(TENANT_KEY, '{"kind":"org","orgId":""}');
  assert.deepEqual(getActiveTenant(), { kind: 'personal' });
  globalThis.localStorage.setItem(TENANT_KEY, 'null');
  assert.deepEqual(getActiveTenant(), { kind: 'personal' });
});

test('clearActiveTenant: back to personal', () => {
  installShim();
  setActiveTenant({ kind: 'org', orgId: 'org-42' });
  clearActiveTenant();
  assert.deepEqual(getActiveTenant(), { kind: 'personal' });
  assert.equal(globalThis.localStorage.getItem(TENANT_KEY), null);
});

// ---------------- summary ----------------
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
