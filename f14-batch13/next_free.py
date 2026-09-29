#!/usr/bin/env python3
"""Pop the next N todo words whose target slug file is still free; skip colliders."""
import json, os, sys

REPO = os.path.expanduser("~/workspace/nyein-sensei-english")
N = int(sys.argv[1]) if len(sys.argv) > 1 else 4
imgdir = f"{REPO}/public/word-images"
existing = set(os.listdir(imgdir))

d = json.load(open(f"{REPO}/f14-batch13/words-todo.json"))
todo = d['todo']
failed = set(d.get('failed', []))
done = set(d.get('done', []))
skipped = d.get('skipped', [])

picked = []
for x in todo:
    if len(picked) >= N:
        break
    if f"{x['slug']}.png" in existing:
        skipped.append({"word": x['word'], "reason": f"{x['slug']}.png produced by concurrent wave; skipped to avoid overwrite"})
    else:
        picked.append(x)
d['todo'] = [x for x in todo if x not in picked]
d['skipped'] = skipped
json.dump(d, open(f"{REPO}/f14-batch13/words-todo.json", 'w'), indent=1, ensure_ascii=False)
json.dump(picked, open(f"{REPO}/f14-batch13/next.json", 'w'), indent=1, ensure_ascii=False)
for x in picked:
    print(f"{x['word']} | {x['slug']}")
print(f"picked {len(picked)}, todo left {len(d['todo'])}", file=sys.stderr)
