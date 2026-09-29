#!/usr/bin/env python3
"""Optimize PNGs: max 320x320, <=60KB. Prints per-file results."""
import os, sys
from PIL import Image

REPO = os.path.expanduser("~/workspace/nyein-sensei-english")
IMGDIR = f"{REPO}/public/word-images"
MAX_KB = 60

def optimize(path):
    im = Image.open(path).convert("RGB")
    im.thumbnail((320, 320), Image.LANCZOS)
    # Pass 1: save PNG
    im.save(path, optimize=True)
    if os.path.getsize(path) <= MAX_KB * 1024:
        return os.path.getsize(path), "ok"
    # Pass 2: quantized palette
    q = im.quantize(colors=64, method=Image.MEDIANCUT).convert("RGB")
    q.thumbnail((320, 320), Image.LANCZOS)
    q.save(path, optimize=True)
    if os.path.getsize(path) <= MAX_KB * 1024:
        return os.path.getsize(path), "quantized-64"
    # Pass 3: smaller
    q.thumbnail((256, 256), Image.LANCZOS)
    q.save(path, optimize=True)
    return os.path.getsize(path), "quantized-64-256"

def main():
    files = sys.argv[1:]
    total, n = 0, 0
    for rel in files:
        path = rel if os.path.isabs(rel) else os.path.join(IMGDIR, rel)
        try:
            size, status = optimize(path)
            n += 1
            total += size
            print(f"{os.path.basename(path)}: {size/1024:.1f}KB [{status}]")
        except Exception as e:
            print(f"{os.path.basename(path)}: ERROR {e}")
    if n:
        print(f"optimized {n}, avg {total/n/1024:.1f}KB")

if __name__ == "__main__":
    main()
