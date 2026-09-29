#!/usr/bin/env python3
"""Print the next 4 pending todo entries (word + slug) for generate_image."""
import json, os
REPO = os.path.expanduser("~/workspace/nyein-sensei-english")
STAGE = os.path.join(REPO, "hidden_files/ola3-art-16")
MANIFEST = os.path.join(REPO, "src/data/word-images-batch-8.json")
todo = json.load(open(os.path.join(STAGE, "todo.json"), encoding="utf-8"))
manifest = json.load(open(MANIFEST, encoding="utf-8")) if os.path.exists(MANIFEST) else {}
done = sum(1 for t in todo if t["word"].lower() in manifest)
print(f"progress: {done}/{len(todo)}", flush=True)
for t in todo[done:done + 4]:
    print(f"{t['word']}|{t['slug']}")
