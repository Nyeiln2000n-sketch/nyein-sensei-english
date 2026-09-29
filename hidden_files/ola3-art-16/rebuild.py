#!/usr/bin/env python3
"""Rebuild persistent state after /tmp wipe: todo list, progress, finalize-one.
Saves to hidden_files/ola3-art-16/ (persistent)."""
import json, os, re

REPO = os.path.expanduser("~/workspace/nyein-sensei-english")
STAGE = os.path.join(REPO, "hidden_files/ola3-art-16")
SRC = os.path.join(REPO, "src/data/f14/words-batch-16.ts")
MANIFEST = os.path.join(REPO, "src/data/word-images-batch-8.json")

with open(SRC, encoding="utf-8") as f:
    words = re.findall(r"en:\s*'([^']+)'", f.read())
assert len(words) == 500, f"expected 500, got {len(words)}"

orig = json.load(open(os.path.join(REPO, "src/data/word-images.json"), encoding="utf-8"))
done = json.load(open(MANIFEST, encoding="utf-8")) if os.path.exists(MANIFEST) else {}

existing_files = set(os.listdir(os.path.join(REPO, "public/word-images")))

def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

todo = []
assigned = set()
for w in words:
    key = w.lower()
    if key in orig or key in done:
        continue
    base = slugify(w)
    slug, i = base, 2
    while f"{slug}.png" in existing_files or slug in assigned:
        slug = f"{base}-{i}"
        i += 1
    assigned.add(slug)
    todo.append({"word": w, "slug": slug})

json.dump(todo, open(os.path.join(STAGE, "todo.json"), "w"), ensure_ascii=False)
# verify done ones really have files
ok_done = sum(1 for k in done if os.path.exists(os.path.join(REPO, "public", done[k])))
print(f"words=500 already_mapped_orig={len([w for w in words if w.lower() in orig])} "
      f"done={len(done)} done_files_ok={ok_done} todo_remaining={len(todo)}")
