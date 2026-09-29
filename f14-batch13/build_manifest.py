#!/usr/bin/env python3
"""Merge new {word: 'word-images/slug.png'} pairs into word-images-batch-5.json (idempotent)."""
import json, os, sys

REPO = os.path.expanduser("~/workspace/nyein-sensei-english")
FRAG = f"{REPO}/src/data/word-images-batch-5.json"

def main():
    pairs = {}
    for arg in sys.argv[1:]:
        word, slug = arg.split("|", 1)
        pairs[word.lower()] = f"word-images/{slug}.png"
    frag = {}
    if os.path.exists(FRAG):
        frag = json.load(open(FRAG, encoding="utf-8"))
    added = 0
    for w, v in pairs.items():
        if w not in frag:
            frag[w] = v
            added += 1
    with open(FRAG, "w", encoding="utf-8") as f:
        json.dump(dict(sorted(frag.items())), f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"merged {added} new, fragment now {len(frag)} entries")

if __name__ == "__main__":
    main()
