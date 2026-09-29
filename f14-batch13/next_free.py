#!/usr/bin/env python3
"""Pop the next N todo words whose target slug file is still free; skip colliders.

Fixes (2026-09-29): colliders are now REMOVED from todo as well as recorded in
skipped, and skipped is deduplicated by word so repeated runs can't pile up
duplicate skip records. Picked words are still written to next.json.
"""
import json, os, sys

REPO = os.path.expanduser("~/workspace/nyein-sensei-english")
N = int(sys.argv[1]) if len(sys.argv) > 1 else 4
imgdir = f"{REPO}/public/word-images"
existing = set(os.listdir(imgdir))

d = json.load(open(f"{REPO}/f14-batch13/words-todo.json"))
todo = d['todo']
done = set(d.get('done', []))
skipped = d.get('skipped', [])

skipped_words = {s['word'] if isinstance(s, dict) else s for s in skipped}

picked = []
colliders = []
for x in todo:
    if len(picked) >= N:
        break
    if f"{x['slug']}.png" in existing:
        if x['word'] not in skipped_words:
            skipped.append({"word": x['word'], "reason": f"{x['slug']}.png produced by concurrent wave; skipped to avoid overwrite"})
            skipped_words.add(x['word'])
        colliders.append(x)
    else:
        picked.append(x)

removed = set()
for x in picked + colliders:
    removed.add(json.dumps(x, sort_keys=True, ensure_ascii=False))
d['todo'] = [x for x in todo if json.dumps(x, sort_keys=True, ensure_ascii=False) not in removed]
d['skipped'] = skipped
json.dump(d, open(f"{REPO}/f14-batch13/words-todo.json", 'w'), indent=1, ensure_ascii=False)
json.dump(picked, open(f"{REPO}/f14-batch13/next.json", 'w'), indent=1, ensure_ascii=False)
for x in picked:
    print(f"{x['word']} | {x['slug']}")
print(f"picked {len(picked)}, skipped {len(colliders)} colliders, todo left {len(d['todo'])}", file=sys.stderr)
