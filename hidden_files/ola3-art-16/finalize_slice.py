#!/usr/bin/env python3
"""Finalize the next 4 pending todo entries (after generate_image calls).
Usage: finalize_slice.py"""
import json, os, subprocess
REPO = os.path.expanduser("~/workspace/nyein-sensei-english")
STAGE = os.path.join(REPO, "hidden_files/ola3-art-16")
MANIFEST = os.path.join(REPO, "src/data/word-images-batch-8.json")
todo = json.load(open(os.path.join(STAGE, "todo.json"), encoding="utf-8"))
manifest = json.load(open(MANIFEST, encoding="utf-8")) if os.path.exists(MANIFEST) else {}
done = sum(1 for t in todo if t["word"].lower() in manifest)
print(f"progress: {done}/{len(todo)}", flush=True)
slice4 = todo[done:done + 4]
print("finalizing:", [(t["word"], t["slug"]) for t in slice4], flush=True)
for t in slice4:
    subprocess.run(["python3", os.path.join(STAGE, "finalize_one.py"), t["word"], t["slug"]])
m = json.load(open(MANIFEST, encoding="utf-8"))
print("manifest entries:", len(m), flush=True)
done2 = sum(1 for t in todo if t["word"].lower() in m)
rest = todo[done2:done2 + 4]
print("next:", [(t["word"], t["slug"]) for t in rest], flush=True)
