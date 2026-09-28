# Vectorize toolkit — content deduplication for Nyein Sensei English

A Python-3-stdlib-only toolkit that turns every learning item in `src/data`
into a fingerprint + similarity vector, finds exact duplicates and
near-duplicates, and blocks new duplicates from being added.

## What gets indexed

`index.py` walks `src/data/*.ts` and writes `tools/vectorize/content-index.json`:

| Kind | Source files | ID format |
|------|--------------|-----------|
| Word | `words-<topic>.ts` (30 each, 600 total) | `word:<topic>:<slug>` e.g. `word:family:father` |
| Phrase | `phrases-a.ts` + `phrases-b.ts` (160 each, 320 total) | `phrase:<topic>:<nnnn>` e.g. `phrase:family:0007` |
| Topic | `topics.ts` (20) | `topic:<topic>` e.g. `topic:family` |

Each item stores: `en`, `en_norm`, `my_norm`, `fingerprint`,
`vocab_sig`, `template_sig`, `tags` (`[topic, level/kind]`), and
`file`/`line` where it was found.

## Fingerprint rules

1. Take the English text (`en`).
2. Normalize: lowercase → strip accents/diacritics → strip punctuation →
   collapse whitespace.
3. SHA-256 of the normalized text; keep the first 16 hex chars.

Myanmar text is kept as-is (UTF-8) except punctuation/extra spaces —
Myanmar has no case, so no lowercasing is applied.

Two items with the same fingerprint are **exact duplicates**
(e.g. `Apple` vs `apple!`).

## Similarity formula (`vectors.py`)

For two item vectors A and B:

- `vocab_sig`: sorted unique content-words of the English text, minus the
  English stopword list in `vectors.py`.
- `template_sig`: sentence pattern — each content word replaced by `W`,
  stopwords and punctuation kept, e.g. `I love my mother.` → `i love my W .`
- score = **0.7 × (|A∩B| / √(|A|·|B|))** over `vocab_sig` sets
  **+ 0.3 × Jaccard** over `template_sig` token sets.

`cosine_similarity(vec_a, vec_b)` returns `(score, driver)` where `driver`
is `"vocab"` or `"template"` depending on which component scored higher.
`audit.py` reuses this same function — there is exactly one definition.

## Hook rule

**Vectorize any new content through `index.py` + `check.py` BEFORE adding
it to `src/data`.** Do not hand-edit `src/data/*.ts` to add words/phrases
without running the gate:

```bash
# 1. rebuild index + run exact-duplicate gate
python3 tools/vectorize/check.py
# or: npm run dedup-check
# exit 0 -> "OK: no same-kind exact duplicates" — safe to commit
# exit 1 -> printed list of same-kind duplicate groups — rewrite the new entries first
#           (cross-kind collisions like topic "family" vs word "family" are
#           intentional and never fail the gate)
```

## Scripts

All scripts run from the **repo root** and use paths relative to it.

| Script | Purpose |
|--------|---------|
| `python3 tools/vectorize/index.py` | Rebuild `content-index.json` from `src/data/*.ts` (prints item counts) |
| `python3 tools/vectorize/check.py` | Rebuild index, then fail (exit 1) if any SAME-KIND exact-duplicate group exists (word↔word, phrase↔phrase, topic↔topic); cross-kind collisions (topic↔word, phrase↔word) are accepted by design and do not fail the gate; otherwise print `OK: no same-kind exact duplicates` (exit 0) |
| `python3 tools/vectorize/audit.py` | Load index and write `dedup-report.md` + `similar-report.md` (similarity > 0.85, capped at 200 pairs, sorted desc) |
| `vectors.py` | Shared module: normalization, signatures, `cosine_similarity` |

Typical workflow when fixing duplicates (done by the next worker):

```bash
python3 tools/vectorize/index.py   # rebuild
python3 tools/vectorize/audit.py   # refresh reports
# rewrite the duplicate / near-duplicate entries in src/data/*.ts
python3 tools/vectorize/check.py   # gate again until OK
```
