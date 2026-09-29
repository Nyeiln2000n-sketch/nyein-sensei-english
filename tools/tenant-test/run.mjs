// MT-007 client part — unit tests for the pure helpers in src/lib/tenant.ts.
//
// Self-contained: compiles tenant.ts with the repo's own typescript (npx tsc)
// into a temp dir, imports the compiled module, runs node:assert checks,
// cleans up the temp dir, and exits non-zero on any compile or test failure.
//
// Usage:  node tools/tenant-test/run.mjs   (npm run test:tenant)

import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { strict as assert } from 'node:assert';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..', '..');

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

// ---- localStorage shim: plain in-memory Map-backed storage -------------
function installStorage() {
  const data = new Map();
  const shim = {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
    clear: () => data.clear(),
  };
  globalThis.localStorage = shim;
  return shim;
}

async function main() {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'nse-tenant-test-'));
  try {
    // Shim for import.meta.env: typing for the dynamic './supabase' import
    // inside tenant.ts needs import.meta.env to resolve.
    writeFileSync(
      path.join(tmp, 'import-meta-env.d.ts'),
      'interface ImportMeta {\n  readonly env: Record<string, string | undefined>;\n}\n',
    );

    console.log('compiling src/lib/tenant.ts with tsc...');
    execFileSync(
      'npx',
      [
        'tsc',
        path.join(REPO, 'src/lib/tenant.ts'),
        path.join(tmp, 'import-meta-env.d.ts'),
        '--outDir', tmp,
        '--module', 'esnext',
        '--target', 'es2020',
        '--moduleResolution', 'bundler',
        '--lib', 'es2020,dom',
        '--skipLibCheck',
      ],
      { cwd: REPO, stdio: 'inherit' },
    );
    console.log('compile ok\n');

    const {
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
    } = await import(pathToFileURL(path.join(tmp, 'tenant.js')).href);

    // ---------------- roleRank ----------------
    test('roleRank(member) -> 1', () => assert.equal(roleRank('member'), 1));
    test('roleRank(admin) -> 2', () => assert.equal(roleRank('admin'), 2));
    test('roleRank(owner) -> 3', () => assert.equal(roleRank('owner'), 3));
    test('roleRank(unknown) -> 0', () => assert.equal(roleRank('superadmin'), 0));

    // ---------------- canManageMembers / canInvite ----------------
    test("canManageMembers('member') -> false", () =>
      assert.equal(canManageMembers('member'), false));
    test("canManageMembers('admin') -> true", () =>
      assert.equal(canManageMembers('admin'), true));
    test("canManageMembers('owner') -> true", () =>
      assert.equal(canManageMembers('owner'), true));
    test("canInvite('admin') and ('owner') -> true", () => {
      assert.equal(canInvite('admin'), true);
      assert.equal(canInvite('owner'), true);
    });
    test("canInvite('member') -> false", () =>
      assert.equal(canInvite('member'), false));
    test('canInvite is the same permission as canManageMembers', () =>
      assert.equal(canInvite, canManageMembers));

    // ---------------- canDeleteOrg ----------------
    test("canDeleteOrg('owner') -> true", () =>
      assert.equal(canDeleteOrg('owner'), true));
    test("canDeleteOrg('admin') -> false (owner only)", () =>
      assert.equal(canDeleteOrg('admin'), false));
    test("canDeleteOrg('member') -> false", () =>
      assert.equal(canDeleteOrg('member'), false));

    // ---------------- slugifyOrgName ----------------
    test("slugifyOrgName('My School') -> 'my-school'", () =>
      assert.equal(slugifyOrgName('My School'), 'my-school'));
    test("slugifyOrgName('!!!') -> 'org'", () =>
      assert.equal(slugifyOrgName('!!!'), 'org'));
    test("slugifyOrgName('မြန်မာ') -> 'org' (non-Latin fallback)", () =>
      assert.equal(slugifyOrgName('မြန်မာ'), 'org'));
    test("slugifyOrgName('') -> 'org'", () =>
      assert.equal(slugifyOrgName(''), 'org'));

    // ---------------- isValidInviteToken ----------------
    test('isValidInviteToken: 48 lowercase hex -> true', () => {
      assert.equal(isValidInviteToken('a'.repeat(48)), true);
      assert.equal(isValidInviteToken('0123456789abcdef'.repeat(3)), true);
    });
    test('isValidInviteToken: 47 chars -> false', () =>
      assert.equal(isValidInviteToken('a'.repeat(47)), false));
    test('isValidInviteToken: uppercase hex -> false', () =>
      assert.equal(isValidInviteToken('A'.repeat(48)), false));
    test('isValidInviteToken: non-hex / empty -> false', () => {
      assert.equal(isValidInviteToken('g'.repeat(48)), false);
      assert.equal(isValidInviteToken(''), false);
    });

    // ---------------- tenantScopeParam ----------------
    test("tenantScopeParam({personal}) -> 'is.null'", () =>
      assert.equal(tenantScopeParam({ kind: 'personal' }), 'is.null'));
    test("tenantScopeParam({org}) -> 'eq.<id>'", () =>
      assert.equal(
        tenantScopeParam({ kind: 'org', orgId: 'org-42' }),
        'eq.org-42',
      ));

    // ---------------- describeTenant ----------------
    const ORGS = [
      { id: 'o1', name: 'My School', slug: 'my-school', plan: 'free', created_by: null, created_at: '2026-01-01' },
    ];
    test("describeTenant(personal) -> 'ကိုယ်ပိုင်'", () =>
      assert.equal(describeTenant({ kind: 'personal' }, ORGS), 'ကိုယ်ပိုင်'));
    test('describeTenant(known org) -> org name', () =>
      assert.equal(describeTenant({ kind: 'org', orgId: 'o1' }, ORGS), 'My School'));
    test("describeTenant(unknown org) -> 'အဖွဲ့အစည်း' fallback", () => {
      assert.equal(describeTenant({ kind: 'org', orgId: 'nope' }, ORGS), 'အဖွဲ့အစည်း');
      assert.equal(describeTenant({ kind: 'org', orgId: 'o1' }, []), 'အဖွဲ့အစည်း');
    });

    // ---------------- active-tenant local state ----------------
    test('getActiveTenant: defaults to personal with empty storage', () => {
      installStorage();
      assert.deepEqual(getActiveTenant(), { kind: 'personal' });
    });

    test('getActiveTenant/setActiveTenant: org round-trip', () => {
      const store = installStorage();
      setActiveTenant({ kind: 'org', orgId: 'org-42' });
      assert.deepEqual(getActiveTenant(), { kind: 'org', orgId: 'org-42' });
      assert.equal(
        store.getItem(TENANT_KEY),
        '{"kind":"org","orgId":"org-42"}',
      );
    });

    test('getActiveTenant/setActiveTenant: personal round-trip', () => {
      installStorage();
      setActiveTenant({ kind: 'personal' });
      assert.deepEqual(getActiveTenant(), { kind: 'personal' });
    });

    test('getActiveTenant: invalid stored JSON -> personal default', () => {
      const store = installStorage();
      store.setItem(TENANT_KEY, '{not-json');
      assert.deepEqual(getActiveTenant(), { kind: 'personal' });
    });

    test('getActiveTenant: invalid shape -> personal default', () => {
      const store = installStorage();
      store.setItem(TENANT_KEY, '{"kind":"bogus"}');
      assert.deepEqual(getActiveTenant(), { kind: 'personal' });
      store.setItem(TENANT_KEY, '{"kind":"org","orgId":""}');
      assert.deepEqual(getActiveTenant(), { kind: 'personal' });
      store.setItem(TENANT_KEY, 'null');
      assert.deepEqual(getActiveTenant(), { kind: 'personal' });
    });

    test('clearActiveTenant: back to personal', () => {
      const store = installStorage();
      setActiveTenant({ kind: 'org', orgId: 'org-42' });
      clearActiveTenant();
      assert.deepEqual(getActiveTenant(), { kind: 'personal' });
      assert.equal(store.getItem(TENANT_KEY), null);
    });

    console.log(`\n${passed} passed, ${failed} failed`);
  } finally {
    // Always clean up the temp dir, success or failure.
    rmSync(tmp, { recursive: true, force: true });
  }
}

main().then(
  () => process.exit(failed === 0 ? 0 : 1),
  (err) => {
    console.error(
      'test:tenant failed:',
      err instanceof Error ? err.message : String(err),
    );
    process.exit(1);
  },
);
