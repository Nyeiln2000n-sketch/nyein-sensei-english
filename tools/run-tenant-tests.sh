#!/usr/bin/env bash
# FASE 8 tenant unit tests: compile src/lib/tenant.ts with tsc, then run the
# plain-Node test suite against the compiled output. Fails loudly on any
# compile or test failure.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(cd "$SCRIPT_DIR/.." && pwd)"
OUT="/tmp/nse-tenant-test"

rm -rf "$OUT"
mkdir -p "$OUT"

# Shim for import.meta.env: the project's vite/client types are only loaded via
# tsconfig (not used for this single-file compile), and supabase.ts/auth.ts
# (pulled in as type dependencies of the lazy supabaseRest import) reference
# import.meta.env. This shim provides the type without touching repo files.
cat > "$OUT/import-meta-env.d.ts" <<'EOF'
interface ImportMeta {
  readonly env: Record<string, string | undefined>;
}
EOF

cd "$REPO"
npx tsc "$REPO/src/lib/tenant.ts" "$OUT/import-meta-env.d.ts" \
  --outDir "$OUT" \
  --module esnext \
  --target es2020 \
  --moduleResolution bundler \
  --skipLibCheck

cp "$REPO/tools/tenant-unit-tests.mjs" "$OUT/tenant-unit-tests.mjs"

node "$OUT/tenant-unit-tests.mjs"
