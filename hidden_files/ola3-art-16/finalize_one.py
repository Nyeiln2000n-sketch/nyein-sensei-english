#!/usr/bin/env python3
"""Finalize one generated image from staging -> public/word-images/<slug>.png
(<=320x320, <=60KB), register in word-images-batch-8.json.
Usage: finalize_one.py <word> <slug>"""
import glob, json, os, sys
from PIL import Image

REPO = os.path.expanduser("~/workspace/nyein-sensei-english")
STAGING = os.path.join(REPO, "hidden_files/ola3-art-16")
IMGDIR = os.path.join(REPO, "public/word-images")
MANIFEST = os.path.join(REPO, "src/data/word-images-batch-8.json")

def finalize(word, slug):
    cands = sorted(glob.glob(os.path.join(STAGING, f"media-generation-{slug}-*.png")))
    if not cands:
        cands = sorted(glob.glob(os.path.join(IMGDIR, f"media-generation-{slug}-*.png")))
    if not cands:
        print(f"MISSING source for {slug}", flush=True)
        return False
    src = cands[0]
    dest = os.path.join(IMGDIR, f"{slug}.png")
    img = Image.open(src).convert("RGB")
    img.thumbnail((320, 320), Image.LANCZOS)
    img.save(dest, optimize=True)
    size = os.path.getsize(dest)
    if size > 60 * 1024:
        img.quantize(colors=128, method=Image.MEDIANCUT).save(dest, optimize=True)
        size = os.path.getsize(dest)
    if size > 60 * 1024:
        small = img.copy()
        small.thumbnail((256, 256), Image.LANCZOS)
        small.quantize(colors=128, method=Image.MEDIANCUT).save(dest, optimize=True)
        size = os.path.getsize(dest)
    dims = Image.open(dest).size
    ok = dims[0] <= 320 and dims[1] <= 320 and size <= 60 * 1024
    if ok:
        manifest = {}
        if os.path.exists(MANIFEST):
            with open(MANIFEST, encoding="utf-8") as f:
                manifest = json.load(f)
        manifest[word.lower()] = f"word-images/{slug}.png"
        with open(MANIFEST, "w", encoding="utf-8") as f:
            json.dump(manifest, f, ensure_ascii=False, indent=2)
        os.remove(src)
        for mj in glob.glob(os.path.join(os.path.dirname(src), "media-generation-" + slug + "-*.json")):
            try:
                os.remove(mj)
            except OSError:
                pass
    else:
        print(f"OVERSIZE {slug}: {dims} {size//1024}KB", flush=True)
    print(f"{slug}: {dims[0]}x{dims[1]} {size//1024}KB ok={ok}", flush=True)
    return ok

if __name__ == "__main__":
    finalize(sys.argv[1], sys.argv[2])
