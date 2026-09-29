#!/usr/bin/env python3
"""Extract word list for FASE 14 batch 13 (SCIENCE), filtering already-imaged words."""
import json, os, re, sys

REPO = os.path.expanduser("~/workspace/nyein-sensei-english")
SRC = f"{REPO}/src/data/f14/words-batch-13.ts"
FRAG = f"{REPO}/src/data/word-images-batch-5.json"
MAIN = f"{REPO}/src/data/word-images.json"
OUT = f"{REPO}/f14-batch13/words-todo.json"

def slugify(en):
    s = en.lower().strip()
    s = re.sub(r"[^a-z0-9 ]", "", s)
    s = re.sub(r"\s+", "-", s).strip("-")
    return s

def main():
    with open(SRC, encoding="utf-8") as f:
        text = f.read()
    words = re.findall(r"en:\s*'([^']+)'", text)
    print(f"raw entries: {len(words)}", file=sys.stderr)

    already = set()
    if os.path.exists(MAIN):
        already |= set(json.load(open(MAIN, encoding="utf-8")).keys())
    if os.path.exists(FRAG):
        already |= set(json.load(open(FRAG, encoding="utf-8")).keys())
    print(f"already imaged (main+frag): {len(already)}", file=sys.stderr)

    imgdir = f"{REPO}/public/word-images"
    existing_files = set(os.listdir(imgdir)) if os.path.isdir(imgdir) else set()

    todo, skipped = [], []
    seen = set()
    for w in words:
        wl = w.lower()
        if wl in seen:
            continue
        seen.add(wl)
        if wl in already:
            skipped.append({"word": wl, "reason": "already in word-images.json / batch-5 fragment"})
            continue
        slug = slugify(wl) or f"word-{len(todo)}"
        base, n = slug, 2
        while f"{slug}.png" in existing_files:
            slug = f"{base}-{n}"
            n += 1
        existing_files.add(f"{slug}.png")
        todo.append({"word": wl, "slug": slug})

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump({"todo": todo, "skipped": skipped}, f, indent=1, ensure_ascii=False)
    print(f"todo: {len(todo)}  skipped: {len(skipped)}")
    print(f"wrote {OUT}")

if __name__ == "__main__":
    main()
