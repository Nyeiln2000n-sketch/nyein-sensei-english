#!/usr/bin/env python3
"""Bulk-register generated word images from worker manifests.

Reads /tmp/img-manifest-*.json, validates each file exists on disk
(320x320, <=60KB target), and merges into src/data/word-images.json once.
Run single-threaded from the repo root.
"""
import json, sys, glob
from pathlib import Path

repo = Path(__file__).resolve().parents[2]
mapping_path = repo / "src" / "data" / "word-images.json"
img_dir = repo / "public" / "word-images"

mapping = json.loads(mapping_path.read_text())
registered, skipped, oversized = 0, 0, []

for mf in sorted(glob.glob("/tmp/img-manifest-*.json")):
    for item in json.loads(open(mf).read()):
        word, slug = item["word"], item["slug"]
        f = img_dir / f"{slug}.png"
        if not f.exists():
            print(f"MISSING FILE: {slug} ({word})", file=sys.stderr)
            skipped += 1
            continue
        kb = f.stat().st_size // 1024
        if kb > 60:
            oversized.append((slug, kb))
        if word in mapping:
            skipped += 1
            continue
        mapping[word] = f"word-images/{slug}.png"
        registered += 1

mapping_path.write_text(json.dumps(mapping, indent=2, ensure_ascii=False) + "\n")
print(f"registered: {registered}, skipped(existing/missing): {skipped}")
if oversized:
    print(f"OVERSIZED (>60KB): {len(oversized)}")
    for slug, kb in oversized[:20]:
        print(f"  {slug}: {kb}KB")
